# Product decisions and evidence boundary

*This log separates the candidate's chosen priorities, brief-provided aggregates, and one 168.9-second supplied mobile-app screen recording reviewed on 15 October 2026. The recording was visually inspected, not operated in an emulator; no student interviews, production telemetry, or privileged Alcovia system access are claimed.*

| Area | Direction | Decision status | Basis / validation |
|---|---|---|---|
| Primary product priority | Weekly meaningful learning actions and returning students, rather than optimising screen time alone | **My selection** | Brief reports 2.15 min mean usage and weak repeat adoption of Study features. Determine denominator and learning-action evidence with student-success team. |
| First product experiment | A simple **Resume My Study Plan** entry point plus a reward tied to verifiable completed practice, not to app opening | **My selection** | Home and Realm appear popular in supplied aggregates. The supplied recording shows Home task count/planning totals, but no specific next task in the inspected Home view. This is a directional clue, not proof of other students' needs. |
| Incentive rules | A small, auditable reward after accepted practice; zero for merely opening app, tapping Resume, starting timer or replaying one event | **Implementation proposal** | Check effect on effort quality and pressure on teens. Ten demo coins are fictional, not a production policy. |
| Existing workflow | Keep ClickUp and n8n initially; build read-only reporting and validate data definitions before changing systems | **Implementation proposal** | Existing tools named in brief; real data contracts, roles, consent and error recovery need inspection. |
| First cohort | Observe five students and two advisors; pilot a reversible flow with willing participants before broad rollout | **Implementation proposal** | Only 20 active students in supplied 45-day window, so a conventional A/B significance claim is inappropriate. |
| Other scope | Defer wearable expansion, new CRM, full app redesign and coercive device-locking | **Implementation proposal** | Prioritise small testable changes, platform feasibility and safeguarding for minors. |

## What the brief supports

- Alcovia reports 20 app users over 45 days, 13 Realm users, 11 Focus Timer trials but 5 regular users, and one syllabus user in the most recent week.
- The brief describes a fragmented advisor documentation process and an existing ClickUp / n8n workflow.
- These counts do not prove the next-task journey is confusing, that coins motivate learning, or that app minutes improve academic outcomes.
- In the [separate supplied video review](RECORDED_APP_WALKTHROUGH.md), Realm showed one “Couldn't enter” error and prolonged retry; Home showed four pending tasks without the specific next task in the inspected view; the worksheet had a separate existing score and status buttons; Focus Mode imposed a visible -50-coin Give Up penalty. These are one-session observations, not prevalence or outcome claims.

## Next observation plan (following one supplied app recording)

1. Ask five consenting students to navigate from Home or Realm to their next agreed study task. Record each step, time to locate the task, whether the task is realistic, and whether they can find appropriate practice.
2. Review two advisors' real progress-meeting workflows with permission. Record duplicate data entry and where missing evidence forces manual follow-up.
3. Validate eligible-learner cohort definitions and independently assessed readiness before attaching rewards to submitted work.
4. Treat the first rollout as a product-discovery pilot, not evidence of uplift. Maintain an explicit keep/change/stop decision based on task discovery, voluntary participation, quality and wellbeing.

## Metrics and guardrails to propose

- Primary: weekly meaningful learning coverage = eligible learners with ≥1 server-accepted evidence-backed learning action / all eligible enrolled learners for the week.
- Supporting: week-on-week meaningful return, shown alongside the numerator/denominator for both periods.
- Learning quality: attempted questions, practice accuracy and independently evaluated chapter readiness, reported separately from engagement.
- Guardrails: student opt-in feedback and stress, advisor time, data completeness, rejected or replayed reward events, privacy/security incidents.
- Time in app: a diagnostic, not a standalone success measure.

## Explicit limitations

The dashboard is populated only with **synthetic records** and simulated browser interactions. The 3-question practice checkpoint does not verify identity or issue real rewards. The associated SQL demonstrates one way to enforce server-side idempotency; it is not installed in Alcovia's systems. The recording supplies **limited, firsthand interface evidence** about one logged-in session, not a device run by the reviewer. It did not include an end-to-end new practice submission, backend verification, student feedback or quantified adoption impact. Those are the next points to validate with consent and access.