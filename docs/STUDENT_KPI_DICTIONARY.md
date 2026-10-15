# Student outcome metric contracts and collection plan

Metrics below follow the brief's **quantity, quality, student performance** split. Definitions are proposals for validation with Alcovia. Never infer “didn't like” from missing feedback.

| Programme item / cadence | Quantity: delivered? | Quality: did they like it? | Performance: what changed? | Low-touch data source / owner |
|---|---|---|---|---|
| Daily timetable | Timetables shared; planned blocks | Student-rated realism (optional weekly pulse) | Task finish rate; estimation error; deadline misses | App task timestamps; advisor checks exceptions |
| 8 PM quiz daily | Quizzes offered and attempted | Optional interest rating | Accuracy by topic; improvement over prior quizzes | In-app quiz events / quiz owner |
| Focus Timer daily | Sessions, opt-in minutes | Was session helpful (short voluntary signal) | Planned study task completed afterward | Server-backed session events / app owner |
| Physical activity / recovery daily | Sync coverage ONLY when opted in | Student value assessment | **Do not assign scores based on medical/wearable data** | Explicit consent; otherwise out of scope |
| Weekly subject plan | Plans approved with student/parent | Was plan realistic? | Adherence; monthly chapter readiness | Student tasks + weekly advisor review |
| Chapter completion weekly | Reading, notes, practice, timed paper steps | Student confidence and feedback | Practice >=70%, timed readiness >=80%, verified by relevant assessments | App assessment events; advisor ensures process not mastery |
| Academic sessions 2 per week | Session scheduled/delivered | Student-rated usefulness | Agreed next-step completion | Calendar + post-session 1-click rating |
| Career workshops 2 per month | Sessions delivered/attendance | Session feedback with response N | Simple pre/post understanding or documented simulation artifact | Check-in link, optional prompt + facilitator rubric |
| Pods/peer sessions monthly | Sessions delivered and attendance | Perceived psychological safety (voluntary) | Self-set follow-up tasks, not emotion scoring | Facilitator record, student feedback |
| Mentor calls monthly | Calls completed | Usefulness score | Career question answered / follow-up action | Scheduling + student post-call form |
| Personal branding monthly | Asset created/reviewed | Student agency/consent satisfaction | Student-chosen distribution milestone | Asset approval workflow, not raw social reach |
| Quarterly podcasts/competitions | Activity completed | Experience feedback | Skills demonstration or benchmark with human assessor | Artefact record and assessor note |
| Parent-child workshop quarterly | Held/attended | Opt-in joint feedback | Joint goal/action follow-through | Calendar + voluntary short review |
| Out-of-city experience quarterly | Conducted/attendance | Safety and enjoyment feedback | Student reflection (optional) | Consent/check-in + facilitator form |
| Quarterly social work / entrepreneurship | Project or milestone delivered | Student feedback | Artefact + reviewed learning objectives | Projects and review rubric |

## Scoring chapter readiness safely

Stage 0: no evidence. Stage 1: subject chapter read. Stage 2: reading plus notes/recall approach. Stage 3: independent practice >=70%. Stage 4: timed-paper attempt recorded, below 80% accuracy. Stage 5: timed-paper accuracy >=80%, with prior stages met. A real product must preserve attempts/timestamps and allow a human override with audit trail. **The app demo simplifies the rubric.** Avoid using this alone for high-stakes academic decisions.

## Data and permission boundaries

The assessment's sample data are fictitious. A real dashboard needs roles and access segmentation; no identifiable data in growth or public demos, no raw health data, consent processes proportionate to minors, encrypted storage, access logging and retention/deletion policies. An advisor should refer subject tutoring gaps to qualified teachers rather than pretend to grade technical correctness.

## Human effort and automations

Auto-capture timestamped attendance, app tasks, quizzes, focus start/end and payment/booking events. Ask advisors to fill only missing qualitative context in a short weekly exception form. Trigger n8n reminders for missed data or upcoming commitments; leave high-stakes outreach decisions to assigned adults with context. Show `source_updated_at`, missing-rate and manual-overrides next to each KPI before expanding the rollout.