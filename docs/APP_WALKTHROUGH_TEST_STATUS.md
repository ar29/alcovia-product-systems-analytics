# Mobile app walkthrough — evidence status (15 October 2026)

## Scope and result

**The Alcovia Android application has NOT been executed or tested.** The Google Drive link was inspected and resolved to an APK named `application-60b82459-5ebf-446d-80be-95fe62551dbc.apk`, but attempts to download the binary to the test environment failed due to network restrictions. That environment has no Android SDK, emulator, or connected device. The TestFlight link resolves to an Alcovia beta invitation; no iOS device test was performed.

**Do not describe any of the following questions as observed in-app findings.** The assessment brief's feature summary is not equivalent to a firsthand walkthrough.

## Six unanswered mobile UX questions

| Question | Direct observation | What the brief actually supports | To verify |
| --- | --- | --- | --- |
| Is the next planned study task immediately identifiable on Home? | Not tested | Home has dashboard cards and Tasks is a tab, but visibility of a specific next action is undocumented | Start at Home, record screenshot and count taps to next assigned study task |
| Does Realm link directly back to study? | Not tested | Realm involves a 3D territory/dragon game and Focus can hatch eggs; no direct deep-link back to planned practice is confirmed | Enter Realm, finish one activity, record available next actions and path to planned task |
| How many steps to start and complete practice? | Not tested | Syllabus supports chapters, worksheets, revisions and scores; tap count is unknown | Time and count taps from Home to actual practice submission |
| Does Focus Timer record outcomes beyond minutes? | Not tested | Timer starts focus sessions, contributes to game rewards and focus indicators; verified study outcomes aren't documented | Complete timer session; inspect result, task linkage and persisted evidence |
| Is verified practice different from tapping Done? | Not tested | Brief defines academic readiness thresholds, but doesn't establish a production practice-evidence validation rule | Submit incomplete/incorrect/complete answers, try marking task done and compare app responses |
| Can a student independently see academic progress? | Not tested | Syllabus, grades, goals, exams and Home cards exist in feature map; clarity and completeness unknown | Locate chapter readiness, subject trajectory and advisor-linked targets without assistance |

## Independently browser-tested: candidate dashboard, not Alcovia mobile app

Public prototype: https://alcovia-product-systems-analytics-a.vercel.app/

- Production deployment confirmed READY on Vercel at commit `cc22b058`.
- GTM & Revenue, Student Outcomes and Delivery System navigation worked.
- Revenue windows of 7, 30 and 90 days recalculated KPIs.
- Advisor A filtering recalculated student participation metrics and narrowed the drill-down list.
- Student drill-down displayed task, chapter, quiz and session KPIs.
- The **simulated** Resume My Study Plan action opened a practice checkpoint and awarded *no* coins for resuming alone.
- An incomplete practice attempt was rejected; submitting all three answers issued **one** demo reward of 10 coins.
- All 14 local metric unit tests passed.

Every KPI shown in the public prototype uses **synthetic** data. Browser-side practice 'verification' is illustrative and is not secure evidence of student learning.

## Candidate-selected product hypothesis, not app finding

Test a prominent **Resume My Study Plan** action linking an existing advisor-approved task to a verifiable practice attempt, with non-coercive recognition only for a completed evidenced attempt. Primary outcomes proposed for validation: weekly meaningful learning coverage and eligible prior-week learners returning for another meaningful action. Guardrails: academic accuracy/readiness, time burden, student feedback, advisor workload, event integrity and duplicated rewards.

## Required next evidence

Run the six steps using the provided Alcovia test account on an approved Android or iOS device. Record the date, app build/version, start screen, exact tap sequence, observed message and screenshots (with minor/student information redacted). Replace this evidence-status note only with actual observations. Never commit test-account credentials, screenshots of real student profiles, or exported student records to public GitHub.
