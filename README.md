<!-- learn-with-phoebe hub banner -->
> ### 📚 Part of [**Learn with Phoebe**](https://phoebefu6.github.io/learn-with-phoebe/)
> The shelf of 161 free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**
<!-- /learn-with-phoebe hub banner -->

# Learn Time Management with Phoebe

Time and stress management as an operating skill: six 45-minute sessions on protecting attention
and energy by planning against the capacity you really have. Urgent against important (with the
famous line traced to its 1954 source), why estimates run optimistic, why slack is not waste,
a calendar bench, what interruptions cost, and saying no with a weekly plan you keep. The running
case is constructed: Dara, an invented new analyst on a busy data team.

Workload and planning, not medical advice.

**Live site:** https://phoebefu6.github.io/learn-time-management-with-phoebe/

| # | Session | Signature thing |
|---|---|---|
| 1 | Busy is not the same as important | What Eisenhower said in 1954 and what Covey added; one list; stress as load against capacity |
| 2 | Estimates are optimistic by default | Buehler, Griffin and Ross's planning fallacy studies read at source; what the outside view fixes and what it does not |
| 3 | Slack is not waste | Utilisation and the queueing curve; buffers; Parkinson's law as satire |
| 4 | The calendar bench | Eight weeks of Dara's work queued in the browser: four plans, an anti-lever and a break button |
| 5 | Interruptions and the cost of switching | What the switching studies measured, where "40 percent" and "23 minutes" come from, and batching |
| 6 | Saying no, and the plan you keep | Handing work back, renegotiating early, recovery as capacity, a one-page weekly plan |

The bench in session 4 (`assets/tm-live.js`) is a seeded queue of 40 working days, modelled and
labelled so on the widget: requests of four kinds with estimates and deadlines, true durations
drawn from an overrun table where 30 percent finish within estimate, 6 focus hours a day, quick
interruptions with a resume overhead, and a weekly intake cap by estimate. Booking every hour,
Dara plans 92.8 percent of focus hours, runs a real load of 125.0 percent and misses 31.8 percent
of deadlines; planning to 70 percent, she plans 68.3 percent, runs at 93.8 percent and misses 3.3
percent; adding a protected focus block brings that to 1.1 percent. The anti-lever, "say yes to
every ask", sends rung 4 to 42.2 percent missed; the break button, one urgent interrupt a day,
sends rung 4 to 7.6 percent and rung 1 to 55.5 percent. A long first-come-first-served run of the
same task mix agrees with Kingman's approximation within 0.4 hours of waiting up to 91 percent
load. The Python reference (`python3 materials/tm_reference.py --json`) and the browser engine
(`node materials/tm-node.js`) print identical numbers.

Facts from Buehler, Griffin and Ross (1994), Mark and colleagues (2005, 2008), Rubinstein, Meyer
and Evans (2001), Karasek (1979), Sonnentag and Fritz (2007) and the American Presidency Project
were read at source; the queueing formulas were read in university lecture notes; claims that
could not be read at source are tiered on each page.

By Phoebe Fu.
