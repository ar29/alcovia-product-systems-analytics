# Original assignment — what Alcovia asked, and why this prototype exists

> **Source and provenance.** This is a **faithful, condensed and annotated summary**, not a verbatim reproduction, of Alcovia's original “Pre-Process | Product, Systems & Analytics Lead” practical assessment shared on 15 October 2026. The source document is [Alcovia's original assignment brief](https://docs.google.com/document/d/17kkwvL2XYFA7ft6-kqrwaZNxFj1OETb5X-0FehDsJEE/edit?usp=sharing), supplied by Alcovia via its assessment email. Access may be restricted. Test credentials, private contact details and app access tokens are deliberately excluded here. **“Asked”** below refers to the employer's brief; **“Response/why”** refers to the candidate's interpretation, not to an Alcovia-approved decision.

## The setup: what was the exercise?

Alcovia described four **unordered, real-world-style business problems** rather than a narrow coding ticket. The candidate was to join hypothetically on **1 November 2026**, plan the work within a team of **three** (the candidate as Product, Systems & Analytics Lead, **one full-stack engineer**, **one process/systems designer**), choose sensible task ownership and timeboxes, and explain how to build reliable structures that do not break. The assessment allowed **72 hours for submission**.

The supplied environment included **ClickUp** for sales/CRM and parent conversations, **n8n** for automation and **Smallest.ai** for automated calling/scheduling. The student app was provided for evaluation through test access, which is intentionally not stored in this repository.

The assessment asked for practical prioritization, not all four full production systems completed within 72 hours. Alcovia explicitly described AI as an **enabler**, not a substitute for original judgment.

## What was asked → why it matters → what this repository demonstrates

| Original business problem (asked) | What made it important in the brief (asked) | Response here (candidate-selected/proposed) |
| --- | --- | --- |
| **1. Improve student app adoption.** App usage averaged around **2.15 minutes**, versus an aspirational **30-minute** average. There were ~25 features but little repeated academic use. | In a 45-day snapshot, **20** students used the app; **13** tried Realm, **11** tried Focus Timer but only **5** used it regularly; study-planning features had weak recent use. More engagement was desired but its cause was unknown. | Challenge minutes-as-success. Prioritize **meaningful weekly learning actions and voluntary return**, with a proposed **Resume My Study Plan → evidenced practice** pilot. The app prototype simulates this interaction; it does **not** establish real adoption lift. |
| **2. Build a GTM, revenue and campaign tracker.** | Management needed target-versus-achievement, trial/full-program/workshop revenues, ₹3,999 workshop seats via Razorpay, unpaid invoices, renewals, the Meta-ads lead→qualified→discovery→ambition interview→architect session funnel, CPQL, conversion, campaign creative performance, ad frequency, and landing-page health. They asked for **time-window filters and dummy data** demonstrating useful visuals. | Build a **synthetic-data** interactive GTM/revenue/funnel dashboard with explicit metric definitions and SQL query examples; separate conversion cohort measures from activity counts. No real CRM, ads or Razorpay connection is claimed. |
| **3. Define a dependable product/systems delivery operating model.** | Alcovia wanted every new OKR or feature to be scoped, released and maintained with high usefulness, visibility and low cognitive load, while leading the two technical contributors. | Provide a **72-hour plan**, a **10-week rollout plan**, delivery playbook, owners, acceptance criteria, testing/incident gates, reconciliation and n8n workflow templates. These are proposals, not operating processes deployed at Alcovia. |
| **4. Create a student-progress dashboard with minimal manual entry.** | Advisors had information dispersed across documents/ClickUp. Alcovia described daily planning, quizzes, focus and wearables; weekly academic roadmaps and chapter readiness; monthly workshops, mentoring and peer activities; quarterly projects and experiences. It asked to measure **quantity delivered**, **student-reported quality**, and **student performance** separately. | Provide a synthetic student-outcomes dashboard, KPI dictionary, SQL entity/metric examples, and proposed advisor review/automation workflows. Distinguish evidence of task participation from verified mastery. No production student data or integrations are used. |

### What the provided adoption numbers do **not** establish

The source numbers are **Alcovia-provided aggregates**, not independently measured evidence. They do not establish that the next assignment is hard to find, that students want rewards, that screen time causes academic progress, or that a proposed interface change will improve retention. The dashboard's simulated students are **not** the original 20 students.

The brief described the student app as stable; this repository does not claim to contradict that production-wide assertion based on an isolated walkthrough. Any observation from a limited app recording should be presented as a **single observed instance**, not a prevalence estimate.

## Why these choices rather than four full builds?

1. **Outcome over proxy.** A thirty-minute target measures time in an app, which could reflect learning, friction or entertainment. A meaningful action and voluntary return are closer to the purpose of an education product, although they still do not prove mastery.
2. **Discovery before prescription.** The Resume My Study Plan and verified-practice reward are **hypotheses**. First observe real learner and advisor journeys and validate the issue; if discoverability is not the bottleneck, change the proposed experiment.
3. **Decision-ready measurement over decorative dashboards.** Revenue, funnel and learning metrics need denominators, sources, date basis, responsible owners and caveats. A polished chart without data contracts risks false confidence.
4. **Scope to the available people and time.** One lead, one engineer and one process/systems designer cannot reliably rebuild every workflow at once. The plans sequence discovery, data definitions, a reversible pilot, reconciliation and operational hardening.
5. **Protect students and data quality.** Learners are teenagers. Sensitive records, wearable/health-related information and reward systems require permission boundaries, informed stakeholder review, idempotent events and suitable privacy protections.

## What is actually implemented versus proposed?

| Item | Status |
| --- | --- |
| Interactive GTM, revenue, campaign and student dashboard views | **Implemented as static frontend prototypes**, using deterministic synthetic data |
| “Resume My Study Plan” and practice/reward journey | **Simulated user experience only**; not real authentication or backend reward verification |
| Metrics code and unit tests | **Implemented as demonstrative code/tests**, not production metric reconciliation |
| PostgreSQL schema and SQL metric queries | **Reference designs**, not executed against Alcovia production |
| n8n workflows | **Importable templates, not connected** to company accounts |
| 72-hour task plan, ten-week rollout, operating playbook and KPI definitions | **Written proposals** requiring stakeholder validation |
| Live adoption improvements, learning outcomes, integrated CRM/payment sync or deployed student tracking | **Not claimed or demonstrated** |

## Where should a product reviewer start?

1. [Executive writeup](EXECUTIVE_WRITEUP.md) — candidate's framing, priorities and limitations.
2. [Product priority and measurement contract](PRODUCT_PRIORITY_METRICS.md) — why meaningful learning actions were selected; metric definitions and safeguards.
3. [72-hour work plan](72_HOUR_PLAN.md) and [delivery playbook](PRODUCT_DELIVERY_PLAYBOOK.md) — resource allocation and how proposed work would be shipped.
4. [Student KPI dictionary](STUDENT_KPI_DICTIONARY.md) — separate quantity, quality and performance.
5. [Decision log](DECISION_LOG.md) — source evidence versus explicit candidate choices and speculative recommendations.
6. [Repository README](../README.md) — how to run the synthetic prototype, inspect code and understand implementation limits.

**Source hierarchy:** Alcovia's original linked Google Doc and assessment email define the employer's ask. This document summarizes the task for convenient review; the repository's executive writeup and prototypes represent the response. In the event of a discrepancy, prefer the original assignment.
