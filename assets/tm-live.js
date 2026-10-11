/* tm-live.js - the calendar bench for learn-time-management-with-phoebe
 *
 * MODELLED, end to end. Dara is a constructed new analyst on a busy data team; no row here is a
 * real person's week. The page runs a seeded queue of Dara's work over 8 weeks (40 working days)
 * in the browser, one working minute at a time, with integer minutes throughout, so the browser
 * and the Python reference (materials/tm_reference.py) agree exactly.
 *
 * The model, in plain words:
 *   - Dara has 6 focus hours a day (360 minutes); the rest of the day is meetings and admin.
 *   - Requests arrive during the day from a seeded stream (four types, each with an estimate, a
 *     deadline a fixed number of days after arrival, and a TRUE duration = estimate x a seeded
 *     overrun ratio drawn from a skewed table: most tasks take longer than estimated).
 *   - Intake: Dara plans each week by ESTIMATES. A request is accepted if the estimates already
 *     accepted this week plus this one stay within the plan level (100, 85 or 70 percent of the
 *     week's focus minutes). Otherwise it is handed back to the team lead to re-plan. The plan
 *     ignores last week's carry-over, as plans usually do.
 *   - Order: earliest deadline first, never pre-empting another planned task.
 *   - Quick asks (5-10 minutes) arrive through the day and interrupt at once. Going back to the
 *     interrupted task costs a resume overhead (modelled; the literature gives no single number).
 *   - Protected focus block (rung 4): quick asks that arrive in the first 3 focus hours are held
 *     and answered as one batch when the block ends, so one resume overhead covers the batch.
 *   - Overtime: at the end of a day, Dara keeps going on work due that day or overdue, up to
 *     2 hours.
 * Anti-lever "say yes to every ask": no intake cap at all.
 * Break button "one urgent interrupt a day": a 30-60 minute urgent job arrives at a seeded
 *   minute each day and jumps every queue, focus block included.
 * Kingman check: a separate long run of a plain first-come-first-served single queue with the
 *   same task mix, at set utilisations, against Kingman's (1961) heavy-traffic approximation.
 */
(function (root) {
  "use strict";

  var EXPQ = [16, 48, 81, 116, 152, 189, 227, 267, 309, 352, 398, 445, 495, 548, 604, 662, 725, 792, 863, 940, 1023, 1114, 1214, 1326, 1451, 1594, 1761, 1962, 2213, 2549, 3060, 4159];

  var D = {
    seed: 20261010, days: 40, dayMin: 360, focusEnd: 180, otCap: 120,
    meanGap: 125,                  /* mean working minutes between requests */
    quickGap: 120, quickDur: [5, 5, 10],
    urgentDur: [30, 45, 60],
    resume: 10,                    /* resume overhead in minutes after an interruption */
    types: [
      { k: "pull", name: "data pull", w: 40, est: [30, 45, 60, 90], lead: 1 },
      { k: "fix", name: "dashboard fix", w: 30, est: [60, 90, 120, 180], lead: 2 },
      { k: "analysis", name: "analysis", w: 15, est: [240, 360, 480], lead: 5 },
      { k: "review", name: "review", w: 15, est: [30, 60], lead: 1 }
    ],
    /* true duration = estimate x ratio / 100; 20 equally likely ratios */
    ratio: [80, 85, 90, 95, 100, 100, 105, 105, 105, 110, 110, 110, 115, 115, 120, 120, 125, 130, 140, 165],
    sweepRho: [50, 60, 70, 75, 80, 85, 90, 95], sweepN: 100000
  };

  var RUNGS = [
    { id: 1, label: "Book every hour", plan: 100, focus: false },
    { id: 2, label: "Plan to 85 percent", plan: 85, focus: false },
    { id: 3, label: "Plan to 70 percent", plan: 70, focus: false },
    { id: 4, label: "70 percent + a protected focus block", plan: 70, focus: true }
  ];

  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function ri(r, n) { return Math.floor(r() * n); }
  function idiv(a, b) { return Math.floor(a / b); }          /* integer division, both >= 0 */
  function rdiv(a, b) { return Math.floor((2 * a + b) / (2 * b)); } /* round half up, a,b >= 0 */

  function pickType(p, r) {
    var x = ri(r, 100), acc = 0;
    for (var i = 0; i < p.types.length; i++) { acc += p.types[i].w; if (x < acc) return i; }
    return p.types.length - 1;
  }
  function drawTask(p, r) {
    var ti = pickType(p, r), ty = p.types[ti];
    var est = ty.est[ri(r, ty.est.length)];
    var ratio = p.ratio[ri(r, p.ratio.length)];
    return { ti: ti, est: est, ratio: ratio, dur: Math.max(5, idiv(est * ratio + 50, 100)) };
  }

  /* The arrivals are drawn once, the same for every rung and toggle (three separate streams). */
  function arrivals(p) {
    var H = p.days * p.dayMin, out = { req: [], quick: [], urgent: [] };
    var r = mulberry32(p.seed), t = 0, id = 0;
    for (;;) {
      t += idiv(p.meanGap * EXPQ[ri(r, 32)] + 500, 1000);
      if (t >= H) break;
      var tk = drawTask(p, r);
      tk.id = id++; tk.at = t; tk.due = idiv(t, p.dayMin) + p.types[tk.ti].lead;
      out.req.push(tk);
    }
    var q = mulberry32(p.seed + 1); t = 0;
    for (;;) {
      t += idiv(p.quickGap * EXPQ[ri(q, 32)] + 500, 1000);
      if (t >= H) break;
      out.quick.push({ at: t, dur: p.quickDur[ri(q, p.quickDur.length)] });
    }
    var u = mulberry32(p.seed + 2);
    for (var d = 0; d < p.days; d++) {
      var m = 30 + ri(u, 300);
      out.urgent.push({ at: d * p.dayMin + m, dur: p.urgentDur[ri(u, p.urgentDur.length)] });
    }
    return out;
  }

  function simulate(p, arr, cfg) {
    var H = p.days * p.dayMin, cap = idiv(p.plan * 5 * p.dayMin, 100);
    var qi = 0, ui = 0, ri0 = 0;
    var queue = [], cur = null, inter = [], held = [], resumeLeft = 0;
    var weekEst = {}, accepted = [], declined = 0;
    var busyH = 0, workT = 0, interT = 0, overT = 0, ot40 = 0, overAll = 0;
    var backlogByDay = [], done = 0;

    function pickNext() {
      if (!queue.length) return null;
      var bi = 0;
      for (var i = 1; i < queue.length; i++) {
        var a = queue[i], b = queue[bi];
        if (a.due < b.due || (a.due === b.due && a.at < b.at)) bi = i;
      }
      return queue.splice(bi, 1)[0];
    }
    function finish(tk, when) { tk.doneAt = when; done++; }
    function remaining() {
      var s = cur ? cur.left : 0;
      for (var i = 0; i < queue.length; i++) s += queue[i].left;
      return s;
    }

    var c = 0, guard = (p.days + 400) * p.dayMin;
    while (c < guard) {
      var d = idiv(c, p.dayMin), m = c - d * p.dayMin;
      /* arrivals at minute c */
      while (ri0 < arr.req.length && arr.req[ri0].at === c) {
        var src = arr.req[ri0++], w = idiv(d, 5), used = weekEst[w] || 0;
        if (cfg.anti || used + src.est <= cap) {
          weekEst[w] = used + src.est;
          var tk = { id: src.id, ti: src.ti, at: src.at, due: src.due, est: src.est, dur: src.dur, left: src.dur, doneAt: -1 };
          accepted.push(tk); queue.push(tk);
        } else declined++;
      }
      if (cfg.brk) while (ui < arr.urgent.length && arr.urgent[ui].at === c) { inter.unshift({ left: arr.urgent[ui].dur }); ui++; }
      while (qi < arr.quick.length && arr.quick[qi].at === c) {
        var qa = { left: arr.quick[qi].dur }; qi++;
        if (cfg.focus && m < p.focusEnd) held.push(qa); else inter.push(qa);
      }
      if (cfg.focus && m === p.focusEnd && held.length) { inter = inter.concat(held); held = []; }

      /* one minute of work */
      var busy = true;
      if (inter.length) {
        if (cur && cur.left < cur.dur) cur.interrupted = true;
        inter[0].left--; interT++;
        if (inter[0].left === 0) inter.shift();
      } else {
        if (cur && cur.interrupted) { cur.interrupted = false; resumeLeft = p.resume; }
        if (resumeLeft > 0) { resumeLeft--; overT++; }
        else {
          if (!cur) cur = pickNext();
          if (cur) {
            cur.left--; workT++;
            if (cur.left === 0) { finish(cur, c + 1); cur = null; }
          } else busy = false;
        }
      }
      if (busy && c < H) busyH++;

      /* end of the day: overtime on work due today or overdue */
      if (m === p.dayMin - 1) {
        var budget = p.otCap, endT = (d + 1) * p.dayMin;
        while (budget > 0) {
          if (!cur) {
            if (!queue.length) break;
            var nx = pickNext();
            if (nx.due > d) { queue.push(nx); break; }
            cur = nx;
          }
          if (cur.due > d) break;
          if (cur.interrupted) { cur.interrupted = false; resumeLeft = p.resume; }
          var spend;
          if (resumeLeft > 0) { spend = Math.min(budget, resumeLeft); resumeLeft -= spend; overT += spend; }
          else {
            spend = Math.min(budget, cur.left); cur.left -= spend; workT += spend;
            if (cur.left === 0) { finish(cur, endT); cur = null; }
          }
          budget -= spend; overAll += spend; if (d < p.days) ot40 += spend;
        }
        if (d < p.days) backlogByDay.push(remaining());
      }
      c++;
      if (c >= H && ri0 >= arr.req.length && !queue.length && !cur && !inter.length && !held.length && resumeLeft === 0) break;
    }

    /* metrics, integers only */
    var n = accepted.length, sumLead = 0, missed = 0, leads = [], trueAcc = 0, doneIn8 = 0, quickSum = 0, urgSum = 0, i;
    for (i = 0; i < n; i++) {
      var a = accepted[i], lead = a.doneAt - a.at;
      sumLead += lead; leads.push(lead); trueAcc += a.dur;
      if (a.doneAt > (a.due + 1) * p.dayMin) missed++;
      if (a.doneAt <= H) doneIn8++;
    }
    leads.sort(function (x, y) { return x - y; });
    for (i = 0; i < arr.quick.length; i++) quickSum += arr.quick[i].dur;
    if (cfg.brk) for (i = 0; i < arr.urgent.length; i++) urgSum += arr.urgent[i].dur;
    var p90 = n ? leads[Math.max(0, Math.ceil(0.9 * n) - 1)] : 0;
    return {
      offered: arr.req.length, accepted: n, declined: declined, doneIn8: doneIn8,
      utilPermil: rdiv(busyH * 1000, H),
      rhoPermil: rdiv((trueAcc + quickSum + urgSum + overT) * 1000, H),
      meanLeadT: n ? rdiv(sumLead, 6 * n) : 0,      /* tenths of an hour */
      p90LeadT: rdiv(p90, 6),                        /* tenths of an hour */
      missedPermil: n ? rdiv(missed * 1000, n) : 0, missed: missed,
      otT: rdiv(ot40, 6),                            /* tenths of an hour, first 8 weeks */
      overheadT: rdiv(overT, 6),
      backlogEndT: rdiv(backlogByDay[p.days - 1] || 0, 6),
      estAcceptedT: rdiv(sumEst(accepted), 6), trueAcceptedT: rdiv(trueAcc, 6),
      planPermil: rdiv(sumEst(accepted) * 1000, H),
      backlogByDay: backlogByDay
    };
  }
  function sumEst(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i].est; return s; }

  function params(over) { var p = {}, k; for (k in D) p[k] = D[k]; if (over) for (k in over) p[k] = over[k]; return p; }

  function run(rungId, anti, brk, over) {
    var g = RUNGS[rungId - 1], p = params(over); p.plan = g.plan;
    var arr = arrivals(p);
    return simulate(p, arr, { focus: g.focus, anti: !!anti, brk: !!brk });
  }

  /* ---- Kingman check: plain FIFO single queue, Lindley recursion, integer minutes ---- */
  function serviceMoments(p) {
    /* exact mean and variance of the true duration over the task mix (equally likely est, ratio) */
    var s1 = 0, s2 = 0, wsum = 0;
    p.types.forEach(function (ty) {
      ty.est.forEach(function (e) {
        p.ratio.forEach(function (rt) {
          var dur = Math.max(5, idiv(e * rt + 50, 100)), wgt = ty.w / (ty.est.length * p.ratio.length);
          s1 += wgt * dur; s2 += wgt * dur * dur; wsum += wgt;
        });
      });
    });
    var mean = s1 / wsum, v = s2 / wsum - mean * mean;
    return { mean: mean, cs2: v / (mean * mean) };
  }
  function sweep(over) {
    var p = params(over), sm = serviceMoments(p), out = [];
    var esNum = Math.round(sm.mean * 1000);   /* mean service in thousandths of a minute */
    p.sweepRho.forEach(function (rho, k) {
      /* interarrival values for this rho: gap = round(ES * 100/rho * q/1000) */
      var gaps = EXPQ.map(function (q) { return idiv(esNum * 100 * q + 500 * rho * 1000, rho * 1000 * 1000); });
      var ga = 0, gb = 0; gaps.forEach(function (g) { ga += g; gb += g * g; });
      var ma = ga / gaps.length, ca2 = (gb / gaps.length - ma * ma) / (ma * ma);
      var r = mulberry32(p.seed + 100 + k), W = 0, sumW = 0, sumS = 0, sumA = 0, prevS = 0;
      for (var i = 0; i < p.sweepN; i++) {
        var a = gaps[ri(r, 32)], tk = drawTask(p, r);
        if (i > 0) { W = Math.max(0, W + prevS - a); sumA += a; }
        sumW += W; sumS += tk.dur; prevS = tk.dur;
      }
      var rhoReal = sumS / p.sweepN / ma;
      var king = (rhoReal / (1 - rhoReal)) * ((ca2 + sm.cs2) / 2) * sm.mean;
      out.push({ rho: rho, rhoRealPermil: Math.round(rhoReal * 1000), simWqT: rdiv(sumW, 6 * p.sweepN), kingWqT: Math.round(king / 6), ca2: Math.round(ca2 * 1000) / 1000, cs2: Math.round(sm.cs2 * 1000) / 1000 });
    });
    return { meanServiceT: Math.round(sm.mean / 6), points: out };
  }

  function canon(over) {
    var out = { rungs: [], anti: [], brk: [], sweep: sweep(over) };
    RUNGS.forEach(function (g) {
      var strip = function (x) { var y = {}; for (var k in x) if (k !== "backlogByDay") y[k] = x[k]; return y; };
      out.rungs.push(strip(run(g.id, false, false, over)));
      out.anti.push(strip(run(g.id, true, false, over)));
      out.brk.push(strip(run(g.id, false, true, over)));
    });
    return out;
  }

  /* ------------------------------------------------------------------ UI (browser only) */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function t1(x) { return (x / 10).toFixed(1); }

  var rootEl, els = {}, sweepCache = null, state = { rung: 1, anti: false, brk: false, resume: D.resume };

  function backlogChart(r) {
    var W = 420, H = 196, x0 = 40, y0 = 14, ph = 130, pt = 9, bw = 6, maxH = 100;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Hours of accepted work still waiting at the end of each of the 40 working days">';
    [0, 25, 50, 75, 100].forEach(function (t) {
      var y = y0 + ph - ph * t / maxH;
      s += '<line class="tm-grid" x1="' + x0 + '" y1="' + y.toFixed(1) + '" x2="' + (x0 + 40 * pt) + '" y2="' + y.toFixed(1) + '"/>';
      s += '<text class="tm-tick" x="' + (x0 - 6) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end">' + t + '</text>';
    });
    r.backlogByDay.forEach(function (mins, i) {
      var hh = mins / 60, clip = hh > maxH, bh = ph * Math.min(hh, maxH) / maxH;
      s += '<rect class="tm-bar' + (clip ? ' is-over' : '') + '" x="' + (x0 + i * pt + 1.5).toFixed(1) + '" y="' + (y0 + ph - bh).toFixed(1) + '" width="' + bw + '" height="' + Math.max(bh, 0.6).toFixed(1) + '" rx="1"/>';
    });
    for (var w = 1; w < 8; w++) {
      var wx = x0 + w * 5 * pt;
      s += '<line class="tm-wk" x1="' + wx + '" y1="' + (y0 + ph) + '" x2="' + wx + '" y2="' + (y0 + ph + 5) + '"/>';
    }
    s += '<text class="tm-tick" x="' + x0 + '" y="' + (y0 + ph + 20) + '">week 1</text>';
    s += '<text class="tm-tick" x="' + (x0 + 40 * pt) + '" y="' + (y0 + ph + 20) + '" text-anchor="end">week 8</text>';
    s += '<text class="tm-tick" x="' + (x0 + 20 * pt) + '" y="' + (y0 + ph + 40) + '" text-anchor="middle">hours of work waiting at the end of each day</text>';
    return s + '</svg>';
  }

  function curveChart(sw, rho) {
    var W = 420, H = 214, x0 = 44, x1 = 396, y0 = 14, ph = 150, maxY = 50;
    function X(r) { return x0 + (x1 - x0) * (r - 0.5) / 0.5; }
    function Y(h) { return y0 + ph - ph * Math.min(h, maxY) / maxY; }
    var p0 = sw.points[0], mean = sw.meanServiceT / 10;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Average wait in the queue against utilisation: Kingman approximation as a line, long-run simulation of the same task mix as dots, and a marker at Dara\'s current real load">';
    [0, 10, 20, 30, 40, 50].forEach(function (t) {
      s += '<line class="tm-grid" x1="' + x0 + '" y1="' + Y(t).toFixed(1) + '" x2="' + x1 + '" y2="' + Y(t).toFixed(1) + '"/>';
      s += '<text class="tm-tick" x="' + (x0 - 6) + '" y="' + (Y(t) + 4).toFixed(1) + '" text-anchor="end">' + t + '</text>';
    });
    [50, 60, 70, 80, 90, 100].forEach(function (t) {
      s += '<text class="tm-tick" x="' + X(t / 100).toFixed(1) + '" y="' + (y0 + ph + 16) + '" text-anchor="middle">' + t + '%</text>';
    });
    var d = "", first = true;
    for (var r = 0.5; r <= 0.981; r += 0.005) {
      var k = (r / (1 - r)) * ((p0.ca2 + p0.cs2) / 2) * (sw.meanServiceRaw / 60);
      if (k > maxY) break;
      d += (first ? "M" : " L") + X(r).toFixed(1) + " " + Y(k).toFixed(1); first = false;
    }
    s += '<path class="tm-king" d="' + d + '"/>';
    sw.points.forEach(function (pt) {
      s += '<circle class="tm-dot" cx="' + X(pt.rhoRealPermil / 1000).toFixed(1) + '" cy="' + Y(pt.simWqT / 10).toFixed(1) + '" r="3.6"/>';
    });
    var over = rho >= 1000, mx = over ? x1 : X(Math.max(rho, 500) / 1000);
    s += '<line class="tm-now" x1="' + mx.toFixed(1) + '" y1="' + y0 + '" x2="' + mx.toFixed(1) + '" y2="' + (y0 + ph) + '"/>';
    var ly = rho >= 850 ? (y0 + ph - 8) : (y0 + 12);   /* the curve is high on the right, low on the left */
    s += '<text class="tm-nowl" x="' + (mx - 6).toFixed(1) + '" y="' + ly + '" text-anchor="end">Dara now: ' + t1(rho) + '%' + (over ? ', off the curve' : '') + '</text>';
    s += '<text class="tm-tick" x="' + ((x0 + x1) / 2) + '" y="' + (y0 + ph + 36) + '" text-anchor="middle">real load: true work ÷ focus hours</text>';
    return s + '</svg>';
  }

  function run2(rung, anti, brk) { return run(rung, anti, brk, { resume: state.resume }); }

  function render() {
    var r = run2(state.rung, state.anti, state.brk), ref = run2(state.rung, false, false);
    els.rungs.forEach(function (l, i) { l.classList.toggle("is-on", i + 1 === state.rung); l.querySelector("input").checked = i + 1 === state.rung; });
    els.anti.classList.toggle("is-on", state.anti); els.brk.classList.toggle("is-on", state.brk);
    els.resOut.textContent = state.resume + " min";
    var g = RUNGS[state.rung - 1], v, cls;
    if (state.anti || state.brk) {
      var what = state.anti && state.brk ? "Saying yes to every ask, plus one urgent job a day" : state.anti ? "Saying yes to every ask" : "One urgent job a day jumping the queue";
      v = "Modelled " + (state.anti ? "anti-lever" : "break") + (state.anti && state.brk ? " and break" : "") + ", rung " + state.rung + ". " + what + ": deadlines missed " + t1(ref.missedPermil) + "% → " + t1(r.missedPermil) + "%, mean wait " + t1(ref.meanLeadT) + " h → " + t1(r.meanLeadT) + " h, overtime " + t1(ref.otT) + " h → " + t1(r.otT) + " h." +
        (state.anti ? " Tasks finished inside the 8 weeks: " + ref.doneIn8 + " → " + r.doneIn8 + "." + (state.rung < 4 ? " With no cap, rungs 1 to 3 become the same week." : "") : "");
      cls = "is-bad";
    } else {
      v = "Modelled. Rung " + state.rung + ", " + g.label.toLowerCase() + ": Dara takes on " + r.accepted + " of " + r.offered + " asks and hands back " + r.declined + ". Real load " + t1(r.rhoPermil) + "% of her focus hours; " + t1(r.missedPermil) + "% of deadlines missed; mean wait " + t1(r.meanLeadT) + " h from ask to done.";
      cls = r.rhoPermil >= 1000 ? "is-bad" : "is-good";
    }
    els.verdict.className = "mb-verdict " + cls; els.verdict.textContent = v;
    function metric(label, val, unit) {
      return '<div class="mb-metric"><span class="mb-mkind is-heuristic">modelled</span><span class="mb-mlabel">' + esc(label) + '</span><span class="mb-mvalue">' + esc(val) + '</span><span class="mb-munit">' + esc(unit) + '</span></div>';
    }
    els.metrics.innerHTML =
      metric("Real load", t1(r.rhoPermil) + "%", "true work ÷ focus hours; planned " + t1(r.planPermil) + "% by estimate") +
      metric("Busy share of focus hours", t1(r.utilPermil) + "%", "minutes working, first 8 weeks") +
      metric("Finished inside 8 weeks", String(r.doneIn8), "of " + r.accepted + " accepted asks") +
      metric("Asks handed back", String(r.declined), "re-planned with the team lead") +
      metric("Mean wait, ask to done", t1(r.meanLeadT) + " h", "focus hours; 6 h is one day") +
      metric("90th percentile wait", t1(r.p90LeadT) + " h", "1 in 10 asks waits longer") +
      metric("Deadlines missed", t1(r.missedPermil) + "%", r.missed + " of " + r.accepted + " accepted") +
      metric("Overtime", t1(r.otT) + " h", "past the focus day, 8 weeks") +
      metric("Resume overhead", t1(r.overheadT) + " h", "getting back into interrupted work") +
      metric("Backlog at end of week 8", t1(r.backlogEndT) + " h", "accepted work not yet done");
    els.chart1.innerHTML = backlogChart(r);
    els.chart2.innerHTML = curveChart(sweepCache, r.rhoPermil);
  }

  function buildUI() {
    rootEl.innerHTML = "";
    var panel = document.createElement("div"); panel.className = "mb-presets"; els.rungs = [];
    var notes = ["Accept asks until the week's estimates fill 100% of focus hours.", "Stop accepting at 85% of the week's focus hours, by estimate.", "Stop accepting at 70%; the rest is slack for overruns and asks.", "Same 70%, and quick asks in the first 3 focus hours wait for one batch."];
    RUNGS.forEach(function (g, i) {
      var l = document.createElement("label"); l.className = "mb-preset";
      l.innerHTML = '<input type="radio" name="tm-rung" value="' + g.id + '"><span class="mb-pname">' + g.id + " · " + esc(g.label) + '</span><span class="mb-pnote">' + esc(notes[i]) + "</span>";
      l.querySelector("input").addEventListener("change", function () { state.rung = g.id; render(); });
      panel.appendChild(l); els.rungs.push(l);
    });
    rootEl.appendChild(panel);
    var toggles = document.createElement("div"); toggles.className = "mb-presets";
    function tog(id, name, note, key) {
      var l = document.createElement("label"); l.className = "mb-preset is-anti";
      l.innerHTML = '<input type="checkbox" id="' + id + '"><span class="mb-pname">' + esc(name) + '</span><span class="mb-pnote">' + esc(note) + "</span>";
      l.querySelector("input").addEventListener("change", function (e) { state[key] = e.target.checked; render(); });
      toggles.appendChild(l); return l;
    }
    els.anti = tog("tm-anti", "Say yes to every ask (anti-lever)", "No intake cap at all: every ask is accepted, whatever the week already holds.", "anti");
    els.brk = tog("tm-brk", "One urgent interrupt a day (break)", "A 30 to 60 minute urgent job arrives each day and jumps every queue, focus block included.", "brk");
    rootEl.appendChild(toggles);
    var row = document.createElement("div"); row.className = "ab-caprow";
    row.innerHTML = '<label for="tm-res">Resume overhead after an interruption</label><input type="range" id="tm-res" min="0" max="20" step="1" value="' + state.resume + '"><output id="tm-resout"></output>';
    rootEl.appendChild(row);
    els.resOut = row.querySelector("#tm-resout");
    row.querySelector("#tm-res").addEventListener("input", function (e) { state.resume = +e.target.value; render(); });
    els.verdict = document.createElement("p"); rootEl.appendChild(els.verdict);
    els.metrics = document.createElement("div"); els.metrics.className = "mb-metrics"; rootEl.appendChild(els.metrics);
    var grid = document.createElement("div"); grid.className = "tm-charts";
    var c1 = document.createElement("div"); c1.className = "ab-card";
    c1.innerHTML = '<h4>Dara\'s backlog, day by day <span class="mb-mkind is-heuristic">modelled</span></h4>';
    els.chart1 = document.createElement("div"); els.chart1.className = "tm-stage"; c1.appendChild(els.chart1);
    var c2 = document.createElement("div"); c2.className = "ab-card";
    c2.innerHTML = '<h4>Wait against load, model and theory <span class="mb-mkind is-heuristic">modelled</span></h4>';
    els.chart2 = document.createElement("div"); els.chart2.className = "tm-stage"; c2.appendChild(els.chart2);
    var key = document.createElement("div"); key.className = "tm-key";
    var rows = sweepCache.points.map(function (pt) { return "<tr><td>" + t1(pt.rhoRealPermil) + "%</td><td>" + t1(pt.simWqT) + " h</td><td>" + t1(pt.kingWqT) + " h</td></tr>"; }).join("");
    key.innerHTML = '<p><span class="tm-key-line"></span> Kingman (1961) approximation &nbsp; <span class="tm-key-dot"></span> the same task mix, first come first served, ' + D.sweepN.toLocaleString("en-US") + ' tasks per load. Mean task time ' + t1(sweepCache.meanServiceT) + ' h. Vertical axis: hours waiting before work starts.</p>' +
      '<table class="clean tm-ktab"><tr><th>Load</th><th>Model</th><th>Kingman</th></tr>' + rows + '</table>';
    c2.appendChild(key);
    grid.appendChild(c1); grid.appendChild(c2); rootEl.appendChild(grid);
    var hint = document.createElement("p"); hint.className = "mb-hint";
    var a0 = arrivals(params()), e0 = 0, t0 = 0, w0 = 0;
    a0.req.forEach(function (x) { e0 += x.est; t0 += x.dur; if (x.dur <= x.est) w0++; });
    hint.textContent = "Modelled, not measured: Dara is constructed, and every ask is a seeded draw (seed " + D.seed + "), the same on every rung. " +
      "This draw: " + a0.req.length + " asks, " + Math.round(e0 / 60) + " h by estimate and " + Math.round(t0 / 60) + " h of true work, " + w0 + " of them at or under estimate; " + a0.quick.length + " quick asks. " +
      "6 focus hours a day for 40 working days; four kinds of ask with deadlines 1 to 5 days out; true time = estimate × an overrun drawn from a table where 30% of tasks finish within their estimate (Buehler, Griffin and Ross found 29.7% in their thesis study, on far bigger projects). " +
      "Quick asks of 5 to 10 minutes interrupt about 3 times a day; the resume overhead is an assumption, set by the slider. Overtime is capped at 2 hours a day. The Python reference in the repository reproduces every default number exactly.";
    rootEl.appendChild(hint);
    render();
  }

  function init() {
    rootEl = document.getElementById("calendar-bench");
    if (!rootEl) return;
    sweepCache = sweep();
    sweepCache.meanServiceRaw = serviceMoments(params()).mean;
    buildUI();
    root.TM_LIVE = {
      set: function (rung, anti, brk) {
        state.rung = rung; state.anti = !!anti; state.brk = !!brk;
        var a = document.getElementById("tm-anti"), b = document.getElementById("tm-brk"); if (a) a.checked = state.anti; if (b) b.checked = state.brk; render();
      },
      state: state, sweep: sweepCache, run: run2
    };
  }

  var api = { D: D, RUNGS: RUNGS, EXPQ: EXPQ, mulberry32: mulberry32, arrivals: arrivals, simulate: simulate, run: run, sweep: sweep, canon: canon };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.TM_ENGINE = api;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})(typeof window !== "undefined" ? window : this);
