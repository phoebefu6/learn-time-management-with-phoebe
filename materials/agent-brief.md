# Agent brief - shared by every fan-out page of learn-time-management-with-phoebe

Filled from course-builder/references/agent-brief.template.md on 2026-10-10. Internal build
document: never link it from an audience page.

You are writing ONE static HTML session page. No servers, no npm. **If your target file already
exists on disk, do not write it; report that and stop.** Write the file, return its path and one
line of coverage. No HTML in your reply.

## Read first, in this order

1. The template page. Copy its structure, classes, SVG grammar and quiz markup EXACTLY, including
   how many options each question has (4, lettered "A · ", "B · ", ...):
   `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-time-management-with-phoebe/courses/01-busy-is-not-important.html`
   For rhythm only, also skim the bench page:
   `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-time-management-with-phoebe/courses/04-the-calendar-bench.html`
2. The source map: every verified number, its evidence tier, per-session coverage, the seams. Use
   ONLY its numbers; never invent a statistic; if a fact is missing, teach the uncertainty.
   `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-time-management-with-phoebe/materials/official-course-map.md`
   The primary research notes (exact quotes, URLs) are in `materials/research-notes.md` next to it.
3. The stylesheet `:root` block for the palette tokens:
   `/Users/phoebe.fu/Documents/claude_work/github_repo/learn-time-management-with-phoebe/assets/style.css` (first 30 lines)

## Page skeleton (keep every component)

toolbar (crumb EXACTLY `<a href="../index.html">learn-time-management-with-phoebe</a> / Session N of 6`, #toggle-all, #zoom-toggle) · masthead (eyebrow
"Learn Time Management with Phoebe · Session N of 6", h1 with one `<span class="accent">`, .sub, .chip-row with the level chip
(🟡 Core for sessions 2 and 3, 🟠 Deeper for sessions 5 and 6) then two `.chip.audience` and `.chip.time` "45 min", .agenda a1-a4) · main.wrap · section#intro (Part 0: kicker, .lede, .legend pills,
.callout.win "★ What you walk out with tonight") · 3 Parts, each `section.section#part-N` with
section-kicker (klabel "Part N · covers ...", h2, `.tag.concept "N min live"`), a `.lede`, ONE
figure, `details.card` accordions (summary: `.mode.live` or `.mode.self`, title, `.mini`,
`.caret ▶`), at least one `.callout.example` with `span.ex-pill` "Real world" on the page ·
section#demo-1 Build-along (kicker `.tag.demo "★ 22 min · everyone builds"`, .lede, ONE figure,
`.steps > .step`, each with a `.prompt-box.good` carrying a `span.label`; 5 or 6 steps on Dara's case and the learner's own week)
· section#exercise Homework (ol, 4 items) · section#quiz (3 x `.quiz-q data-answer="0-based"`,
`p.qtext`, `button.qopt` "A · ..." as in your template, `p.qwhy`; one `p.quiz-score` after the
last) · section#official, h2 EXACTLY "What this session teaches, and where it came from",
`.covered > .covered-row` (pill solid ✓ / light ◐ + name + note), then the `.mono` line EXACTLY
"Every fact on this page, and its verification tier, is recorded in the course's source map." ·
section.cheat#cheatsheet (h3 "Session N cheat sheet <span>· pin this</span>", .grid-2 of six
.cheat-item) · `.callout.next` with `.nx-pill` "Next session" · footer.pagefoot ·
`<script src="../assets/app.js?v=4">`.

Head: the template's social meta block with this page's own title/description/url;
`<title>Session N · <Title> - learn time management with phoebe</title>`; `<link rel="stylesheet" href="../assets/style.css?v=4">`.
Nothing else external.

First `details.card` in the FIRST Part is `open`; no other. Sentence case headings. Warm
practitioner voice, concrete, never dry. Inside prompt-boxes escape `&` `<` `>`. 450 to 650 lines
is guidance about depth, never a target: never collapse whitespace, dissolve a list into a
paragraph, or drop a component to fit.

## Hard rules (a violation is rework)

- NEVER an em dash or en dash, anywhere (prose, code, aria-labels, comments). Hyphen only.
- No meta text: never "this course", "in this course", "the course teaches", "banned here". State
  the professional norm directly with its reason. The two exact estate phrases above are the only
  self-references; "session 5" cross-references are fine.
- Attribution "by Phoebe Fu". Never "built with" a tool.
- Every number comes from the map or is labelled constructed. For constructed data print "your
  numbers will differ", never invented outputs as if run. Bench numbers you quote must be in the map's bench canon exactly (they are printed by the widget on session 4).
- Contested or missing evidence: teach the disagreement; never resolve what the literature has not.
- Citations in the exact form of the map's appendix; anything marked reported is "reported" on the page, anything untraced is "could not be traced to a paper".
- NEVER "lottery" or "lotteries"; say the mechanism ("decided by row order", "arbitrary", "a
  random draw"). A verbatim quoted title in curly quotes is the only exception.
- Default to the English word. A Chinese term that is genuinely a name carries its English in
  brackets right after it, every occurrence.
- Titles, widget ids and class names must not collide with siblings. Banned titles: "A system you keep", "The one-page marketing plan", "Is it worth the time?", "Where your week actually goes" (that one is AI Productivity's: link it, never use it as a heading), plus anything in learn-performance-management, learn-ai-leadership, learn-okr, learn-ai-hr, learn-ai-productivity. Use only the session titles below.
- Stress is workload and planning, never medical or clinical advice. Do not repeat the not-medical disclaimer (it lives on the landing page and session 1); never give breathing, sleep or physiology advice; point to the hub for the body side.
- Quiz answer letters: use the data-answer pattern given in your file outline exactly (it varies the correct letter across pages).
- No named real employers, no salary or pay figures, no "hire me" advice.
- Do not write "Eisenhower matrix" as fact: the line is Eisenhower's quotation (1954), the matrix is Covey's (reported).

## Figure grammar (hand-drawn, every figure)

Palette, ONLY these hexes (no invented greys): ink `#2A1C26` · muted `#6B5A66` · primary `#7A3B69` · deep `#4E2343` · mid `#66305A` · soft `#E8CFE0` · 50-tint `#F8EEF4` · faint `#DCCCD6` · hairline `#EEE3EA` · mint contrast `#2A7362` · mint ink `#1D5446` · mint tint `#E3F3EE` · `#FFFFFF` · universal reds
`#991B1B` `#FEF2F2` `#FCA5A5` only for a wrong-way panel.

- `<figure class="zoomable">` > `<svg viewBox="0 0 880 H" role="img" aria-label="the data, not the
  shape">` > `<defs>` + `<style>` + content, then `<figcaption>🔍 Click to zoom - takeaway</figcaption>`.
  Grow H, never W.
- Prefix unique per figure, used for every class and id: `s<session><letter>`, e.g. s2a, s2b, s2c, s2d (session 2), s3a..., s5a..., s6a....
- `<defs>` holds three things with the figure prefix P: a wobble filter `id="PSk"`
(`feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="<int>"` +
`feDisplacementMap scale="2.4" xChannelSelector="R" yChannelSelector="G"`, `x="-3%" y="-3%"
width="106%" height="106%"`), a hachure pattern `id="PHc"` (7x7 userSpaceOnUse, rotate(-38), one
accent line, opacity .5) when needed, an open arrowhead `id="PAr"` (path `M1 1 L9 5 L1 9`, fill none, ink stroke
1.6). ALL shapes sit inside ONE `<g filter="url(#PSk)" fill="none" stroke="#2A1C26" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round">`; rects carry a tiny rotation (-4 to 4 degrees for
hand-placed items, under 1 for panels). Fills: white, the 50-tint, the hachure for "the pile" or "the
data", and the mint contrast ONLY for the one thing the figure is about. One doodle anchor per
figure, simple strokes, never a mascot. Text classes: `.PH` 800 12px ink heading · `.PL` 600 12px
ink label · `.PS` 400 11px muted · `.PB` 800 11px mint-ink · `.PV` 800 16-20px deep value · `.PW` 800 12px white on a fill · `.PA` 700 11px primary axis caption · `.PN` 400 12px muted
note. Hand-stacked items must not overlap as painted rects (the gate flags a pile).
- ALL `<text>` outside any filtered group, sans stack, never below 10.5px.
- Fit: max chars ≈ (box width - 20) / 7 at 12px, 6.4px/char at 11px; full-width note under 110 chars; 40px between neighbouring point labels; bottom
  note 22px below the last row, H clears it by 8px. When in doubt, shorten.
- No line, arrow, gridline or curve may cross or touch a text label (the gate scans for line-through-text and text-out-of-box). Route arrows around labels; keep 6px clear.
- Floor: one figure per Part plus one in the build-along (4 figures). Draw the MECHANISM (where the time goes, what the overrun eats, which path an interruption takes, what a buffer absorbs),
  never a metaphor literally, never decoration.

## Voice and honesty

Every Part gets a real-world story (a recognisable workplace pattern, told without naming any real company or person beyond the cited researchers). The running case is constructed and the page says "constructed" at least once: Dara, a constructed new analyst on a busy data team, and the team lead (unnamed or "the team lead"). Dara's established facts from session 1: about 6 focus hours a day; recurring reports take 2 h a day; 23 lines on the first list; 41 hours of agreed work due in two weeks against about 40 focus hours before quick asks; the quarterly churn analysis (about 6 h estimate) is the important-not-urgent item. Keep consistent with these.

## Cross-links (absolute URLs)

- Time audit, AI triage, follow-ups: https://phoebefu6.github.io/learn-ai-productivity-with-phoebe/
- Automation: https://phoebefu6.github.io/learn-automation-with-phoebe/
- Project planning: https://phoebefu6.github.io/learn-data-pmo-with-phoebe/ and https://phoebefu6.github.io/learn-tech-project-pmo-with-phoebe/
- Meetings that eat the day: https://phoebefu6.github.io/learn-facilitation-with-phoebe/
- Hub (body side of stress, planned courses): https://phoebefu6.github.io/learn-with-phoebe/

## Footer chain and session titles

1 01-busy-is-not-important.html "Busy is not the same as important" · 2 02-estimates-are-optimistic.html "Estimates are optimistic by default" · 3 03-slack-is-not-waste.html "Slack is not waste" · 4 04-the-calendar-bench.html "The calendar bench" · 5 05-interruptions-and-switching.html "Interruptions and the cost of switching" · 6 06-saying-no-and-the-plan.html "Saying no, and the plan you keep".
Footer left: "Session N of 6 · learn-time-management-with-phoebe · by Phoebe Fu &nbsp;·&nbsp; 📚 <a href="https://phoebefu6.github.io/learn-with-phoebe/">Learn with Phoebe ↗</a>"
Footer right: `<a href="0X-....html">← Prev: <title></a> &nbsp;·&nbsp; <a href="0Y-....html">Next: <title> →</a>` (session 6: "← Prev: Interruptions and the cost of switching" and `<a href="../index.html">Course home</a>`).
