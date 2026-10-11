#!/usr/bin/env python3
"""Independent Python reference for the calendar bench (assets/tm-live.js).

Written from the model description in tm-live.js's header, then run against the node engine:
    python3 materials/tm_reference.py --json  >  py.json
    node materials/tm-node.js                 >  js.json
    diff py.json js.json                      (must print nothing)
Dara is constructed and the simulation is modelled. Minutes are integers throughout; the only
floating point is in the Kingman check, where both sides do the same operations in the same order.
"""
import json
import math
import sys

M32 = 0xFFFFFFFF
EXPQ = [16, 48, 81, 116, 152, 189, 227, 267, 309, 352, 398, 445, 495, 548, 604, 662, 725, 792,
        863, 940, 1023, 1114, 1214, 1326, 1451, 1594, 1761, 1962, 2213, 2549, 3060, 4159]

D = dict(
    seed=20261010, days=40, dayMin=360, focusEnd=180, otCap=120,
    meanGap=125, quickGap=120, quickDur=[5, 5, 10], urgentDur=[30, 45, 60], resume=10,
    types=[
        dict(k="pull", w=40, est=[30, 45, 60, 90], lead=1),
        dict(k="fix", w=30, est=[60, 90, 120, 180], lead=2),
        dict(k="analysis", w=15, est=[240, 360, 480], lead=5),
        dict(k="review", w=15, est=[30, 60], lead=1),
    ],
    ratio=[80, 85, 90, 95, 100, 100, 105, 105, 105, 110, 110, 110, 115, 115, 120, 120, 125, 130, 140, 165],
    sweepRho=[50, 60, 70, 75, 80, 85, 90, 95], sweepN=100000,
)
RUNGS = [(1, 100, False), (2, 85, False), (3, 70, False), (4, 70, True)]


def imul(a, b):
    return ((a & M32) * (b & M32)) & M32


def mulberry32(seed):
    st = [seed & M32]

    def nxt():
        st[0] = (st[0] + 0x6D2B79F5) & M32
        a = st[0]
        t = imul(a ^ (a >> 15), 1 | a)
        t = ((t + imul(t ^ (t >> 7), 61 | t)) & M32) ^ t
        return ((t ^ (t >> 14)) & M32) / 4294967296.0
    return nxt


def ri(r, n):
    return int(math.floor(r() * n))


def rdiv(a, b):
    return (2 * a + b) // (2 * b)


def js_round(x):
    return math.floor(x + 0.5)


def draw_task(p, r):
    x, acc, ti = ri(r, 100), 0, len(p["types"]) - 1
    for i, ty in enumerate(p["types"]):
        acc += ty["w"]
        if x < acc:
            ti = i
            break
    ty = p["types"][ti]
    est = ty["est"][ri(r, len(ty["est"]))]
    ratio = p["ratio"][ri(r, len(p["ratio"]))]
    return dict(ti=ti, est=est, ratio=ratio, dur=max(5, (est * ratio + 50) // 100))


def arrivals(p):
    H = p["days"] * p["dayMin"]
    req, quick, urgent = [], [], []
    r, t, n = mulberry32(p["seed"]), 0, 0
    while True:
        t += (p["meanGap"] * EXPQ[ri(r, 32)] + 500) // 1000
        if t >= H:
            break
        tk = draw_task(p, r)
        tk.update(id=n, at=t, due=t // p["dayMin"] + p["types"][tk["ti"]]["lead"])
        n += 1
        req.append(tk)
    q, t = mulberry32(p["seed"] + 1), 0
    while True:
        t += (p["quickGap"] * EXPQ[ri(q, 32)] + 500) // 1000
        if t >= H:
            break
        quick.append(dict(at=t, dur=p["quickDur"][ri(q, len(p["quickDur"]))]))
    u = mulberry32(p["seed"] + 2)
    for d in range(p["days"]):
        m = 30 + ri(u, 300)
        urgent.append(dict(at=d * p["dayMin"] + m, dur=p["urgentDur"][ri(u, len(p["urgentDur"]))]))
    return req, quick, urgent


class Sim:
    """Minute-by-minute single worker: interrupts first, then a resume overhead, then planned work."""

    def __init__(self, p, plan, focus, anti, brk):
        self.p, self.plan, self.focus, self.anti, self.brk = p, plan, focus, anti, brk

    def take_next(self):
        if not self.queue:
            return None
        best = min(range(len(self.queue)), key=lambda i: (self.queue[i]["due"], self.queue[i]["at"], i))
        return self.queue.pop(best)

    def run(self):
        p = self.p
        H, day = p["days"] * p["dayMin"], p["dayMin"]
        cap = self.plan * 5 * day // 100
        req, quick, urgent = arrivals(p)
        by_req, by_quick, by_urg = {}, {}, {}
        for x in req:
            by_req.setdefault(x["at"], []).append(x)
        for x in quick:
            by_quick.setdefault(x["at"], []).append(x)
        for x in urgent:
            by_urg.setdefault(x["at"], []).append(x)
        self.queue, cur, inter, held, resume_left = [], None, [], [], 0
        week_est, accepted, declined = {}, [], 0
        busy_h = over = ot40 = 0
        backlog = []
        c = 0
        guard = (p["days"] + 400) * day
        while c < guard:
            d, m = divmod(c, day)
            for src in by_req.get(c, []):
                w = d // 5
                used = week_est.get(w, 0)
                if self.anti or used + src["est"] <= cap:
                    week_est[w] = used + src["est"]
                    tk = dict(src, left=src["dur"], done=-1, interrupted=False)
                    accepted.append(tk)
                    self.queue.append(tk)
                else:
                    declined += 1
            if self.brk:
                for u in by_urg.get(c, []):
                    inter.insert(0, [u["dur"]])
            for qa in by_quick.get(c, []):
                (held if self.focus and m < p["focusEnd"] else inter).append([qa["dur"]])
            if self.focus and m == p["focusEnd"] and held:
                inter.extend(held)
                held = []

            busy = True
            if inter:
                if cur is not None and cur["left"] < cur["dur"]:
                    cur["interrupted"] = True
                inter[0][0] -= 1
                if inter[0][0] == 0:
                    inter.pop(0)
            else:
                if cur is not None and cur["interrupted"]:
                    cur["interrupted"] = False
                    resume_left = p["resume"]
                if resume_left > 0:
                    resume_left -= 1
                    over += 1
                else:
                    if cur is None:
                        cur = self.take_next()
                    if cur is not None:
                        cur["left"] -= 1
                        if cur["left"] == 0:
                            cur["done"] = c + 1
                            cur = None
                    else:
                        busy = False
            if busy and c < H:
                busy_h += 1

            if m == day - 1:
                budget, end_t = p["otCap"], (d + 1) * day
                while budget > 0:
                    if cur is None:
                        if not self.queue:
                            break
                        nx = self.take_next()
                        if nx["due"] > d:
                            self.queue.append(nx)
                            break
                        cur = nx
                    if cur["due"] > d:
                        break
                    if cur["interrupted"]:
                        cur["interrupted"] = False
                        resume_left = p["resume"]
                    if resume_left > 0:
                        spend = min(budget, resume_left)
                        resume_left -= spend
                        over += spend
                    else:
                        spend = min(budget, cur["left"])
                        cur["left"] -= spend
                        if cur["left"] == 0:
                            cur["done"] = end_t
                            cur = None
                    budget -= spend
                    if d < p["days"]:
                        ot40 += spend
                if d < p["days"]:
                    backlog.append((cur["left"] if cur else 0) + sum(t["left"] for t in self.queue))
            c += 1
            if (c >= H and not self.queue and cur is None and not inter and not held
                    and resume_left == 0 and all(x["at"] < c for x in req)):
                break

        n = len(accepted)
        leads = sorted(t["done"] - t["at"] for t in accepted)
        missed = sum(1 for t in accepted if t["done"] > (t["due"] + 1) * day)
        true_acc = sum(t["dur"] for t in accepted)
        quick_sum = sum(x["dur"] for x in quick)
        urg_sum = sum(x["dur"] for x in urgent) if self.brk else 0
        p90 = leads[max(0, math.ceil(0.9 * n) - 1)] if n else 0
        return dict(
            offered=len(req), accepted=n, declined=declined,
            doneIn8=sum(1 for t in accepted if t["done"] <= H),
            utilPermil=rdiv(busy_h * 1000, H),
            rhoPermil=rdiv((true_acc + quick_sum + urg_sum + over) * 1000, H),
            meanLeadT=rdiv(sum(leads), 6 * n) if n else 0,
            p90LeadT=rdiv(p90, 6),
            missedPermil=rdiv(missed * 1000, n) if n else 0, missed=missed,
            otT=rdiv(ot40, 6), overheadT=rdiv(over, 6),
            backlogEndT=rdiv(backlog[p["days"] - 1] if len(backlog) >= p["days"] else 0, 6),
            estAcceptedT=rdiv(sum(t["est"] for t in accepted), 6), trueAcceptedT=rdiv(true_acc, 6),
            planPermil=rdiv(sum(t["est"] for t in accepted) * 1000, H),
        )


def run(rung, anti, brk):
    _, plan, focus = RUNGS[rung - 1]
    return Sim(D, plan, focus, anti, brk).run()


def service_moments(p):
    s1 = s2 = wsum = 0.0
    for ty in p["types"]:
        for e in ty["est"]:
            for rt in p["ratio"]:
                dur = max(5, (e * rt + 50) // 100)
                wgt = ty["w"] / (len(ty["est"]) * len(p["ratio"]))
                s1 += wgt * dur
                s2 += wgt * dur * dur
                wsum += wgt
    mean = s1 / wsum
    v = s2 / wsum - mean * mean
    return mean, v / (mean * mean)


def sweep(p):
    mean, cs2 = service_moments(p)
    es_num = js_round(mean * 1000)
    pts = []
    for k, rho in enumerate(p["sweepRho"]):
        gaps = [(es_num * 100 * q + 500 * rho * 1000) // (rho * 1000 * 1000) for q in EXPQ]
        ga = gb = 0
        for g in gaps:
            ga += g
            gb += g * g
        ma = ga / len(gaps)
        ca2 = (gb / len(gaps) - ma * ma) / (ma * ma)
        r = mulberry32(p["seed"] + 100 + k)
        W = sum_w = sum_s = prev_s = 0
        for i in range(p["sweepN"]):
            a = gaps[ri(r, 32)]
            tk = draw_task(p, r)
            if i > 0:
                W = max(0, W + prev_s - a)
            sum_w += W
            sum_s += tk["dur"]
            prev_s = tk["dur"]
        rho_real = sum_s / p["sweepN"] / ma
        king = (rho_real / (1 - rho_real)) * ((ca2 + cs2) / 2) * mean
        pts.append(dict(rho=rho, rhoRealPermil=js_round(rho_real * 1000), simWqT=rdiv(sum_w, 6 * p["sweepN"]),
                        kingWqT=js_round(king / 6), ca2=js_round(ca2 * 1000) / 1000, cs2=js_round(cs2 * 1000) / 1000))
    return dict(meanServiceT=js_round(mean / 6), points=pts)


def canon():
    out = dict(rungs=[], anti=[], brk=[], sweep=sweep(D))
    for rid, _, _ in RUNGS:
        out["rungs"].append(run(rid, False, False))
        out["anti"].append(run(rid, True, False))
        out["brk"].append(run(rid, False, True))
    return out


def jsonify(o):
    """Match JSON.stringify for numbers: integral floats print without a decimal point."""
    if isinstance(o, dict):
        return {k: jsonify(v) for k, v in o.items()}
    if isinstance(o, list):
        return [jsonify(v) for v in o]
    if isinstance(o, float) and o.is_integer():
        return int(o)
    return o


if __name__ == "__main__":
    c = jsonify(canon())
    if "--json" in sys.argv:
        sys.stdout.write(json.dumps(c, indent=1))
    else:
        for name in ("rungs", "anti", "brk"):
            print(name)
            for x in c[name]:
                print("  rho %.1f%% miss %.1f%% lead %.1fh p90 %.1fh ot %.1fh declined %d" % (
                    x["rhoPermil"] / 10, x["missedPermil"] / 10, x["meanLeadT"] / 10, x["p90LeadT"] / 10, x["otT"] / 10, x["declined"]))
        print(json.dumps(c["sweep"]))
