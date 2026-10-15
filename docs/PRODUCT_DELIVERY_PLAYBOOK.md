# Operating model: from business request to measurable outcome

**Team:** Product/Analytics Lead (PL), Full-stack Engineer (ENG), Process/Systems Designer (SYS). Assumption: three people total, not three additional hires. One owner is accountable for each decision; no parallel platform rewrites.

## Intake → validate → instrument → pilot → rollout → learn

| Gate | Exact question | PL | ENG | SYS | Exit / rejected when |
|---|---|---|---|---|---|
| G0 Intake (0.5 day) | Who has the problem? Why now? | Accountable; speak to requester | Feasibility estimate | Map affected teams | Named beneficiary, incident urgency, proposed metric |
| G1 Evidence (1–3 days) | What is the observed baseline, not opinion? | 5 interviews / walk-through as needed | Check event coverage | Review ClickUp field fill-rates | Current journey, baseline, data quality known |
| G2 Contract (0.5–1 day) | What does good mean numerically? | Approve metric + guardrail | Define event payload + tests | Define required human input | Formula, cohort, window, owner, source, guardrail signed off |
| G3 Slice (1 day) | What's the smallest reversible intervention? | Prioritise and kill scope | API, UX & instrumentation tasks | New SOP and training | Bounded 1–2-week scope with rejection threshold |
| G4 Release (1–2 weeks) | Can it work safely for a small group? | Pilot design, acceptance | Tests, feature flag, rollback | Advisor coaching | Usability, access controls, instrumentation pass |
| G5 Evaluate (one + four weeks) | Did behaviour change and at what cost? | Interview + compare outcomes | Reliability/latency review | Time saved and exception count | Keep/iterate/stop written in ClickUp |

### Default service-level gates for prototype (candidate to amend)

- **Data coverage:** no launch decision unless ≥95% expected event instrumentation is received for a pilot week; dashboard shows freshness and sample size, not only KPI value.
- **Correctness:** no double-counted payment events; compare raw Razorpay captured events to finance totals daily; exceptions owned by finance. Target reconciliation difference: zero unexplained rupees in the pilot.
- **Security:** no production teen data in public dashboards; role access tested before wider sharing; every admin/advisor action auditable.
- **Adoption:** short qualitative observation with at least five willing students is more informative than a significance claim based on 20 users.
- **Workload:** advisor reporting burden must not increase even when new features appear.

These thresholds are **proposed defaults**, not Alcovia policy. The candidate must accept/modify/reject them.

## Weekly rhythm and responsibility

Monday (30 min) is the KPI + source-quality review: PL signs off the trend, SYS notes missing data and workflow failures, ENG owns sync backlog. Tuesday/Thursday (15 min each) unblock the critical path. Wednesday (30 min) is a user observation or advisor ride-along. Friday (30 min) is demo + acceptance + keep/iterate/stop. Incidents interrupt the plan when money, data privacy or access is at risk.

For every ClickUp delivery item, maintain: `requester`, `affected_actor`, `observed_problem`, `baseline`, `metric_contract`, `success_threshold`, `guardrail`, `owner`, `data_owner`, `rollout_flag`, `rollback`, `pilot_findings`, `final_decision`, `date`. SYS owns completeness; ENG owns event-spec accuracy; PL owns prioritisation and go/no-go.

## Prioritising one person per function

Use **value × confidence / effort** as a discussion aid, not an automated ranking. Value considers students helped, advisor hours saved, revenue leakage reduced and risk. Confidence includes whether the evidence is observed versus assumed. Effort reflects both software and ongoing manual burden.

**Candidate-selected first product outcome (15 Oct):** meaningful weekly learning actions and returning students, with time-spent as a supporting diagnostic. The first product learning cycle is therefore (1) define the qualifying event and enrolled denominator, (2) observe the Focus / Realm → learning-action path, (3) run a small reversible pilot, and (4) review coverage, week-on-week return and independently assessed learning quality. Basic payment-source reconciliation and privacy safeguards proceed in parallel as **non-negotiable system integrity work**, not as competing product north stars. Advisor reporting simplification follows the first workflow review. Critical security or payment-integrity risks can interrupt either workstream. This proposed sequencing still needs app evidence and the candidate’s approval.

## Example OKR walk-through: improve focus-to-study action

**Ask:** Students spend more time in the app. **Rewrite:** Students who try Focus Timer rarely return (11 trials vs five regular users in the brief), and we don't know why. **Evidence:** explore five actual user journeys, event funnels, diary interviews. **Outcome hypothesis:** easier resumption of a study task increases week-two study completion; avoid making time-spent the only goal. **Small slice:** resume latest syllabus task from the post-focus screen behind a flag; no new gamification module. **Guardrails:** students report no new pressure; voluntary engagement, errors and crashes remain acceptable. **Decision rule:** keep only if usage and observed student experience improve; otherwise revert and record reasons. Candidate chooses numeric threshold after baseline data.

## Operational resilience

1. Source-first: ClickUp for lead/advisor workflow, Razorpay for payments, Meta for ads, app/backend for student activity; reporting DB is derivative.
2. Idempotent ingests, source IDs and sync timestamps; reconcile a sample every day during launch.
3. n8n alerts have an outbox, replay path and visible failure owner; never trust a green dashboard without a freshness signal.
4. Roles: growth sees aggregates, assigned advisor sees only assigned children, admin sees audited exceptions, student sees own data. Parenting consent/retention review before any health or mood tracking.
5. One-click rollback or flag-off for product experiments; documented manual fallback for dashboard/API outage.