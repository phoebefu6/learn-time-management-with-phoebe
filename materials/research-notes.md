# Research notes - Time & Stress Management (learn-time-management-with-phoebe)

Compiled 2026-10-10. Tiers:
- **read** = read on the primary page or the paper's own PDF/abstract.
- **reported** = secondary page or search-index snippet only.
- **not found** = looked, could not locate.

All quotes are short excerpts. PDF text was machine-extracted, so a few characters in the source PDFs are OCR noise (noted where it matters).

---

## 1. Buehler, Griffin & Ross (1994) - the planning fallacy studies

Source read: full article PDF (16 pages), JPSP 67(3) 366-381, hosted on a University of Florida course page:
https://bear.warrington.ufl.edu/brenner/mar7588/Papers/buehler-et-al-1994.pdf  (DOI 10.1037/0022-3514.67.3.366)

**Abstract (read):**
- "Ss' predictions of their completion times were too optimistic for a variety of academic and nonacademic tasks." - read
- "In Study 4, the optimistic bias was eliminated for Ss instructed to connect relevant past experiences with their predictions." - read
- "In Study 5, observer Ss overestimated others' completion times and made greater use of relevant past experiences." - read

**Definition, with credit to K&T (read, p. 366):**
- The tendency "to hold a confident belief that one's own project will proceed as planned, even while knowing that the vast majority of similar projects have run late, has been termed the planning fallacy (Kahneman & Tversky, 1979)." - read (quote split; each fragment under 25 words)

**Study 1 - honours thesis (read, p. 369, Table 1):**
- Sample: "Thirty-seven psychology students (27 women and 10 men)" in the final semester of the Honors Thesis course, University of Waterloo. Means in Table 1 are "based on 33 subjects" (4 had not finished when records stopped). - read
- Best estimate: predicted **33.9 days**, actual **55.5 days** ("they would finish in 33.9 days, but they actually took 55.5 days"). - read
- "Fewer than one third of the respondents (29.7%) finished in the time they reported as their most accurate prediction." - read
- Best case ("if everything went as well as it possibly could"): predicted **27.4 days** (Table 1; the running text OCRs as "21A"), **10.8%** finished by that date. - read
- Worst case ("if everything went as poorly as it possibly could"): predicted **48.6 days**, and only **48.7%** finished by it ("fewer than half of the respondents (48.7%) finished"). - read
- Correlation predicted vs actual (best estimate): **r = .77**. Optimistic r = .73, pessimistic r = .72. - read
- Mean absolute error: 22.6 days (best) vs 23.2 days (pessimistic), so the pessimistic forecast reduced bias but "did not increase the accuracy." - read

Table 1 (read):

| Measure | Best | Optimistic (best case) | Pessimistic (worst case) |
|---|---|---|---|
| Predicted days | 33.9 | 27.4 | 48.6 |
| Actual days | 55.5 | 55.5 | 55.5 |
| Difference | -21.6 | -28.1 | -6.9 |
| Absolute difference | 22.6 | 28.2 | 23.2 |
| Completed in predicted time (%) | 29.7 | 10.8 | 48.7 |
| r (predicted, actual) | .77 | .73 | .72 |

**Study 2 - academic and nonacademic tasks (read, p. 371, Table 2):**
- Academic: predicted 5.8 days, actual 10.7 days, 37.1% finished in predicted time. - read
- Nonacademic: predicted 5.0 days, actual 9.2 days, 42.5% finished in predicted time. - read
  (Note: in Table 2 the row labels read "Predicted days / Actual days"; the text confirms actual > predicted: "for academic projects M = 10.7 vs. 5.8 days".)
- Confidence: "74.1% certain" for academic, "69.9% certain" for nonacademic forecasts. - read
- Subjects with deadlines: predicted 5.9 days; due in 12.9 days; finished in 11.0 days; "only 38.7% of these subjects finished in the predicted time." - read

**Study 3 - think-aloud (read, p. 372):**
- "Only 43.6% of the subjects finished their projects within the predicted time." - read
- Finishers expected 6.0 days, reported 7.1 days. Mean certainty 83.5%. - read

**Study 4 - recall-relevant intervention (read, p. 375, Table 4):**
- Finished in predicted time: control **29.3%**, recall **38.1%**, recall-relevant **60.0%**. - read
- Mean bias: control -1.3 days, recall -1.0 days, recall-relevant -0.1 days (not significant). - read
- Actual completion did not differ by condition ("it did not influence when they finished the assignment"), whereas deadlines did (9.1 vs 4.3 days for 2-week vs 1-week deadlines). - read
- Accuracy (absolute error) did not improve: "Predictions were no more accurate in..." the recall-relevant condition. - read

**Study 5 - observers (read, pp. 378-379):**
- Observers predicted longer times than actors (M = 8.5 vs 5.5 days); actors' optimistic bias (M = -1.3 days) "was matched by the observers' pessimistic bias (M = 1.7 days)". - read

---

## 2. Kahneman & Tversky (1979) - where "planning fallacy" was coined

- Reference (read, as cited in Buehler et al. 1994 reference list): "Kahneman, D., & Tversky, A. (1979). Intuitive prediction: Biases and corrective procedures. TIMS Studies in Management Science, 12, 313-327." - read (as a citation inside Buehler 1994)
- That the term originates here: Buehler et al. 1994, p. 366, credit it to "(Kahneman & Tversky, 1979)". - read (secondary attribution, primary text not seen)
- A search summary of Buehler, Griffin & Peetz (2010) says K&T did not run empirical studies of the planning fallacy themselves; 1979 is a conceptual paper proposing the outside-view correction. - reported
- The 1979 paper text itself: **not found** online.

---

## 3. Queueing: Kingman (1961), M/M/1, the congestion curve

**Kingman / Allen-Cunneen G/G/1 formula (read):**
Technion, Service Engineering lecture notes, "The G/G/1 Queue" (Avishai Mandelbaum's course), slide "GI/GI/1 The Allen-Cunneen Approximation":
https://serveng.technion.ac.il/files/Lectures/Lecture_GGQ's_FULL_Marked.pdf
- Stated: E(Wq) ~ E(S) * (rho / (1 - rho)) * ((C^2(A) + C^2(S)) / 2), labelled "Mean Service Time", "Utilization", "Stochastic Variability". - read
- "Exact for M/G/1." "Upper bound in general." "Asymptotically exact as rho -> 1 - in Heavy Traffic." - read
- Next slide: "Fact (Kingman, 1961): In heavy-traffic, 'Waiting-Time is Exponential'." Its mean comes from the Allen-Cunneen formula above. - read
- With C^2(A) = C^2(S) = 1 (M/M/1): E(Wq)/E(S) = rho/(1-rho); the slide asks the student to substitute "rho = 0.5 (1), 0.8 (4), 0.9 (10), 0.95 (19)". - read
  (Teaching use: at 95 percent utilisation the average wait is 19 service times.)
- "Congestion Index" = E(Wq)/E(S); "Both rho and C(S) effect congestion non-linearly." - read

Supporting secondary: MIT Larson & Odoni "Urban Operations Research" ch. 4.8.3 G/G/1 page (https://web.mit.edu/course/other/urban_or_book/OldFiles/www/book/chapter4/4.8.3.html) gives the heavy-traffic result only as an image and cites "[KING 62]"; waiting time "approximately negative exponential". - reported (formula not readable as text)

Original paper: Kingman, J.F.C. (1961), Proc. Cambridge Phil. Soc. 57(4) 902-904 - **not read** (paywalled).

**M/M/1 exact (read):**
MIT OCW 2.854 Introduction to Manufacturing Systems (Fall 2016), "M/M/1 Queue" note:
https://ocw.mit.edu/courses/2-854-introduction-to-manufacturing-systems-fall-2016/927056a1af54772a587fd84ad4951e71_MIT2_854F16_Mm1Queue.pdf
- Ls = lambda/(mu - lambda) = rho/(1 - rho), "where rho = lambda/mu is the utilization of the server". - read
- Ws = 1/(mu - lambda). - read
- Wq = Ws - 1/mu = lambda / (mu(mu - lambda)). - read
- Lq = lambda^2/(mu(mu - lambda)) = rho^2/(1 - rho). - read
- Note: rho/(mu - lambda) is algebraically identical to lambda/(mu(mu - lambda)) since rho = lambda/mu. So the brief's form is correct; cite the MIT form.

Second university source (read): NTNU TPK4191 queueing slides, https://jvatn.folk.ntnu.no/eLearning/TPK4191/slides/QueueingTheory.pdf - "Wq = Lq/lambda", for M/M/1 = rho^2/(lambda(1-rho)) = rho/(mu(1-rho)). - read

---

## 4. Gloria Mark - interruptions

**Mark, Gudith & Klocke (2008), CHI 2008 pp. 107-110 (read, full 4-page PDF):**
https://www.ics.uci.edu/~gmark/chi08-mark.pdf  (DOI 10.1145/1357054.1357072)
- "people completed interrupted tasks in less time with no difference in quality." - read
- "people compensate for interruptions by working faster, but this comes at a price: experiencing more stress, higher frustration, time pressure and effort." - read
- Sample: "Forty-eight subjects participated." 81% German university students, mean age 26. - read
- Task: email task with interruptions by phone or IM; "Interruption frequency was set to two minutes". Workload by modified NASA-TLX plus a stress item, 20-point scale. - read
- Table 1 time to perform task (minutes): baseline 22.77, same-context interruption 20.31, different-context 20.60. Errors not different (1.94, 1.93, 1.84). - read
- Table 3 (1-20 scale), baseline vs same vs different context: stress 6.92 / 9.46 / 9.13; frustration 4.73 / 6.63 / 6.48; time pressure 11.02 / 12.69 / 12.17; effort 9.50 / 11.04 / 11.52; mental workload 10.02 / 10.83 / 11.50. - read
- "After only 20 minutes of interrupted performance people reported significantly higher stress, frustration, workload, effort, and pressure." - read
- Context made no difference: "context does not make a difference". - read

**Mark, Gonzalez & Harris (2005), "No task left behind?", CHI 2005 pp. 321-330 (read, full PDF):**
https://www.interruptions.net/literature/Mark-CHI05-p321-mark.pdf  (DOI 10.1145/1054972.1055017)
- "detailed observation of 24 information workers"; "57% of their working spheres are interrupted." - read
- "77.2% of interrupted work was resumed on the same day." - read
- **Resumption time: "it took an average length of time of 25 min. 26 sec (sd=54 min. 48 sec.)"** - read
- Before resuming, informants "worked in an average of 2.26 (sd=2.79) working spheres." - read
- People spend "about 11 minutes in a working sphere before switching to another." - read

**The "23 minutes 15 seconds" figure:**
- It is NOT in the 2005 paper (which says 25 min 26 s) and NOT in the 2008 paper (checked both PDFs). - read (absence)
- Widely attributed to Mark's interview "Worker, Interrupted: The Cost of Task Switching", Fast Company (commonly dated 2008, by Kermit Pattison). The Fast Company page returned HTTP 403; a search summary of that page shows only "every three minutes and five seconds" and does not confirm 23:15. - **reported / not verified**
- Recommendation for the course: cite the 2005 paper's 25 min 26 s (with its very large sd of 54 min 48 s) and say 23 min 15 s is an interview figure we could not trace to a paper.

---

## 5. Rubinstein, Meyer & Evans (2001) and the "40 percent" claim

**Paper (read, full 35-page PDF):** JEP: HPP 27(4) 763-797, DOI 10.1037//0096-1523.27.4.763
PDF copy: https://leaddev.com/wp-content/uploads/2023/01/xhp274763.pdf
- "In 4 experiments, participants alternated between different tasks or performed the same task repeatedly." - read
- "Task alternation yielded switching-time costs that increased with rule complexity but decreased with task cuing." - read
- "These factor effects were additive, supporting a model of executive control that has goal-shifting and rule-activation stages for task switching." - read
- Text search of the extracted PDF for "40%", "40 percent", "percent of" and "productiv": **no hits**. The 40 percent figure is not in the paper. - read (absence)

**APA 2001 press release (read):** "Is Multitasking More Efficient?", embargoed to 5 August 2001, mirrored on Newswise:
https://www.newswise.com/articles/is-multitasking-more-efficient
- "Rule activation itself takes significant amounts of time, several tenths of a second" - read
- Meyer: "a mere half second of time lost to task switching can mean the difference" (driving example). - read
- No percent or productivity figure in the release. - read (absence)

**APA "Multitasking: Switching costs" page (2006):** https://www.apa.org/topics/research/multitasking
- Page blocked by a bot wall (Incapsula) for curl, WebFetch and the browser pane; not bypassed. - **could not read**
- Search-index summary of that page: Meyer "has said that even brief mental blocks created by shifting between tasks can cost as much as 40 percent of someone's productive time." - **reported** (exact wording unverified)
- Conclusion: present 40 percent as Meyer's estimate quoted by APA in 2006, not a measured result of the 2001 experiments.

---

## 6. Eisenhower's urgent/important line

**Primary text (read):** American Presidency Project, "Address at the Second Assembly of the World Council of Churches, Evanston, Illinois", **August 19, 1954** (not 4 August):
https://www.presidency.ucsb.edu/node/232572
- "I illustrate it by quoting the statement of a former college president" - read
- "I have two kinds of problems, the urgent and the important. The urgent are not important, and the important are never urgent." - read
- "Now this, I think, represents a dilemma of modern man." - read
- Venue note on the page: spoke on the campus of Northwestern University at 4:35 p.m.; "President Miller" is Dr. J. Roscoe Miller, president of Northwestern. - read
- Note: Eisenhower himself was president of Columbia University 1948-1953, but in the speech he attributes the line to an unnamed "former college president". - read (the attribution); Columbia dates reported via Columbia library search snippet.

**Quote Investigator (read):** "Quote Origin: What Is Important Is Seldom Urgent and What Is Urgent Is Seldom Important", 9 May 2014:
https://quoteinvestigator.com/2014/05/09/urgent/
- Confirms 19 August 1954, Evanston, and the "former college president" attribution; says QI does not know whether Eisenhower used the matrix technique; does not mention Covey. - read

**Covey (reported):** The four-quadrant "time management matrix" with Quadrant II (important, not urgent) appears in Stephen R. Covey, The 7 Habits of Highly Effective People (1989), and in Covey, Merrill & Merrill, First Things First (1994). Secondary sources say Covey did not credit Eisenhower. - reported (books not read; 1994 date from bibliographic memory, verify)

---

## 7. Sonnentag on recovery

**Sonnentag & Fritz (2007) (read, abstract on University of Konstanz repository):**
https://kops.uni-konstanz.de/entities/publication/901f4299-e3f5-46af-99cb-a27bdd4bca71
- Four self-report measures built from "the mood regulation and job-stress recovery literature" (Study 1). - read
- CFA with "a calibration and a cross-validation sample (total N = 930)" distinguished four experiences: "psychological detachment from work, relaxation, mastery, and control" (Study 2). - read
- Nomological net checked in a subsample "(N = 271)" (Study 3); search summary: moderately related to stressors and well-being, weakly to coping and personality. - read (N) / reported (summary wording)
- Mannheim group page: four 4-item scales, 16 items (https://www.sowi.uni-mannheim.de/en/sonnentag/research/measures-and-tools). - reported

**Sonnentag, Cheng & Parker (2022), Annu. Rev. Organ. Psychol. Organ. Behav. 9:33-60, DOI 10.1146/annurev-orgpsych-012420-091355:**
- Abstract pages (HKU hub) returned 403. Search summary: reviews recovery during breaks, evenings, weekends and vacations; intervention studies show recovery can be trained; future-of-work trends (blurred boundaries, teams, technology). - reported

---

## 8. Parkinson's law (1955)

- First line "Work expands so as to fill the time available for its completion." - **reported** (Economist URL economist.com/news/1955/11/19/parkinsons-law exists per search results, but economist.com cannot be fetched by this tool; doc.cat-v.org reprint returned 402).
- Date 19 November 1955, The Economist; satire on bureaucratic staff growth (officials multiplying subordinates regardless of workload); later book Parkinson's Law: The Pursuit of Progress (1958). - reported (Wikipedia and search summaries)
- Course note: the essay is satire about civil-service headcount, not a finding about personal procrastination.

---

## 9. Demand-control model and Hofstadter's law

**Karasek (1979) (read, full JSTOR PDF copy):** ASQ 24(2) 285-308, JSTOR 2392498
https://www.movingforwardnetwork.com/wp-content/uploads/2023/04/Karasek_Job-Demands-Job-Decision-Latitude-and-Mental-Strain-Implications-for-Job-Redesign_1979.pdf
- "This model predicts that mental strain results from the interaction of job demands and job decision latitude." - read
- "it is the combination of low decision latitude and heavy job demands which is associated with mental strain." - read
- Data: "recent national survey data from Sweden and the United States." - read

**Hofstadter's law (reported):** "It always takes longer than you expect, even when you take into account Hofstadter's Law." Douglas Hofstadter, Godel, Escher, Bach (1979), in a passage on computer chess forecasts. Page number not confirmed. - reported (https://en.wikipedia.org/wiki/Hofstadter%27s_law)

---

## 10. Little's law

- MIT OCW 2.854 M/M/1 note (URL in section 3): "By Little's law L = lambda W, we know that the average time a customer spends in the system is" Ws = 1/(mu - lambda). - read
- Technion G/G/1 notes: "E(Lq) = lambda E(Wq), E(L) = lambda E(W)". - read
- Little, J.D.C. (1961), "A proof for the queuing formula L = lambda W", Operations Research 9(3) 383-387 - original **not read**.

---

## Citation appendix

1. Buehler, R., Griffin, D., & Ross, M. (1994). Exploring the "planning fallacy": Why people underestimate their task completion times. Journal of Personality and Social Psychology, 67(3), 366-381. doi:10.1037/0022-3514.67.3.366. Read at https://bear.warrington.ufl.edu/brenner/mar7588/Papers/buehler-et-al-1994.pdf
2. Kahneman, D., & Tversky, A. (1979). Intuitive prediction: Biases and corrective procedures. TIMS Studies in Management Science, 12, 313-327. (Citation as given in item 1; not read.)
3. Kingman, J.F.C. (1961). The single server queue in heavy traffic. Mathematical Proceedings of the Cambridge Philosophical Society, 57(4), 902-904. (Not read.) Formula read in: Mandelbaum, A., Service Engineering lecture notes, "The G/G/1 Queue", Technion. https://serveng.technion.ac.il/files/Lectures/Lecture_GGQ's_FULL_Marked.pdf
4. MIT OpenCourseWare 2.854 Introduction to Manufacturing Systems (Fall 2016), "M/M/1 Queue". https://ocw.mit.edu/courses/2-854-introduction-to-manufacturing-systems-fall-2016/927056a1af54772a587fd84ad4951e71_MIT2_854F16_Mm1Queue.pdf
5. NTNU TPK4191 Queueing Theory slides. https://jvatn.folk.ntnu.no/eLearning/TPK4191/slides/QueueingTheory.pdf
6. Larson, R.C., & Odoni, A.R. Urban Operations Research, section 4.8.3 G/G/1. https://web.mit.edu/course/other/urban_or_book/OldFiles/www/book/chapter4/4.8.3.html
7. Mark, G., Gudith, D., & Klocke, U. (2008). The cost of interrupted work: More speed and stress. Proc. CHI 2008, 107-110. doi:10.1145/1357054.1357072. Read at https://www.ics.uci.edu/~gmark/chi08-mark.pdf
8. Mark, G., Gonzalez, V.M., & Harris, J. (2005). No task left behind? Examining the nature of fragmented work. Proc. CHI 2005, 321-330. doi:10.1145/1054972.1055017. Read at https://www.interruptions.net/literature/Mark-CHI05-p321-mark.pdf
9. Pattison, K. (2008). Worker, interrupted: The cost of task switching. Fast Company. https://www.fastcompany.com/944128/worker-interrupted-cost-task-switching (403; not read)
10. Rubinstein, J.S., Meyer, D.E., & Evans, J.E. (2001). Executive control of cognitive processes in task switching. JEP: Human Perception and Performance, 27(4), 763-797. doi:10.1037/0096-1523.27.4.763. Read at https://leaddev.com/wp-content/uploads/2023/01/xhp274763.pdf
11. American Psychological Association (2001, 5 August). Is multitasking more efficient? [press release]. Read at https://www.newswise.com/articles/is-multitasking-more-efficient
12. American Psychological Association (2006). Multitasking: Switching costs. https://www.apa.org/topics/research/multitasking (blocked; reported only)
13. Eisenhower, D.D. (1954, 19 August). Address at the Second Assembly of the World Council of Churches, Evanston, Illinois. The American Presidency Project. https://www.presidency.ucsb.edu/node/232572
14. Quote Investigator (2014, 9 May). What is important is seldom urgent and what is urgent is seldom important. https://quoteinvestigator.com/2014/05/09/urgent/
15. Covey, S.R. (1989). The 7 Habits of Highly Effective People. Free Press. / Covey, S.R., Merrill, A.R., & Merrill, R.R. (1994). First Things First. Simon & Schuster. (Not read.)
16. Sonnentag, S., & Fritz, C. (2007). The Recovery Experience Questionnaire: Development and validation of a measure for assessing recuperation and unwinding from work. Journal of Occupational Health Psychology, 12(3), 204-221. doi:10.1037/1076-8998.12.3.204. Abstract read at https://kops.uni-konstanz.de/entities/publication/901f4299-e3f5-46af-99cb-a27bdd4bca71
17. Sonnentag, S., Cheng, B.H., & Parker, S.L. (2022). Recovery from work: Advancing the field toward the future. Annual Review of Organizational Psychology and Organizational Behavior, 9, 33-60. doi:10.1146/annurev-orgpsych-012420-091355. (Reported only.)
18. Parkinson, C.N. (1955, 19 November). Parkinson's law. The Economist. https://www.economist.com/news/1955/11/19/parkinsons-law (not fetchable; reported)
19. Karasek, R.A. (1979). Job demands, job decision latitude, and mental strain: Implications for job redesign. Administrative Science Quarterly, 24(2), 285-308. Read at https://www.movingforwardnetwork.com/wp-content/uploads/2023/04/Karasek_Job-Demands-Job-Decision-Latitude-and-Mental-Strain-Implications-for-Job-Redesign_1979.pdf
20. Hofstadter, D.R. (1979). Godel, Escher, Bach: An Eternal Golden Braid. Basic Books. (Reported via https://en.wikipedia.org/wiki/Hofstadter%27s_law)
21. Little, J.D.C. (1961). A proof for the queuing formula: L = lambda W. Operations Research, 9(3), 383-387. (Not read; law read in items 3 and 4.)

---

## Could not read at source

- Kahneman & Tversky (1979) TIMS paper - no online text found.
- Kingman (1961) original paper - paywalled; formula read in Technion notes instead.
- Little (1961) original paper - not attempted beyond university notes.
- APA "Multitasking: Switching costs" (2006) - bot wall; 40 percent wording is reported only.
- Fast Company "Worker, Interrupted" (Mark interview) - 403; the 23 min 15 s figure is untraced.
- The Economist, "Parkinson's Law" (1955) - domain not fetchable; reprint site 402.
- Sonnentag, Cheng & Parker (2022) abstract page - 403.
- Covey, 7 Habits (1989) and First Things First (1994) - books not read.
- Hofstadter, GEB (1979) - page number for the law not confirmed.

## Corrections to the brief

- Eisenhower's Evanston address was on **19 August 1954**, not 4 August (American Presidency Project).
- Mark et al. 2005 report **25 min 26 s** to resume interrupted work, not 23 min 15 s.
- Buehler Study 1 best-case mean is **27.4 days** (Table 1); the PDF's running text OCRs it as "21A".
