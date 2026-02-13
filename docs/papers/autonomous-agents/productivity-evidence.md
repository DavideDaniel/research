---
title: Developer Productivity Evidence
description: Analysis of the METR RCT, Faros AI telemetry, Stack Overflow survey data, and DORA reports on real-world developer productivity with AI tools.
---

# Developer Productivity Evidence

## 3. Randomized Controlled Evidence on Developer Productivity

The strongest causal evidence comes from the METR randomized controlled trial.

Sixteen experienced open-source developers completed 246 real tasks in large repositories averaging 22,000+ stars and 1 million+ lines of code. With AI assistance enabled (Cursor Pro with Claude 3.5/3.7 Sonnet), developers were 19 percent slower. The effect was statistically significant.

Importantly, participants predicted speedups in advance and continued to believe they were faster after completion. External experts also predicted large gains. All were directionally incorrect. Despite the measured slowdown, 69 percent of developers continued using AI tooling after the study ended.

A follow-up evaluation examined autonomous agent pull requests. Automated test evaluation yielded a 38 percent success rate (METR, August 2025). However, none of the reviewed pull requests were mergeable without modification (METR, August 2025). The average estimated human repair time was 42 minutes (METR, August 2025).

This establishes two critical findings:

1. Interactive assistance can impose overhead for experienced developers in complex repositories.
2. Autonomous output that passes automated tests may still fail human code review standards.

The study authors note that results may not generalize to greenfield environments or junior developers, which leaves room for autonomous-loop advantages in alternative settings.

**Sources:** Becker et al., arXiv:2507.09089, July 2025. METR follow-up, August 2025.

---

## 4. Industry Telemetry and Survey Data

Observational industry data presents mixed signals.

Faros AI analyzed telemetry from 10,000+ developers across 1,255 teams. High AI adoption teams completed 21 percent more tasks and merged 98 percent more pull requests, but PR review time increased by 91 percent, PR size grew by 154 percent, and bugs per developer rose by 9 percent. No measurable organizational-level improvement was observed (Faros AI, "The AI Productivity Paradox Research Report," July 2025, faros.ai/blog/ai-software-engineering). (Vendor-sponsored: Faros AI is a developer analytics platform.)

Anthropic reports a 67 percent increase in merged PRs per engineer per day after adopting Claude Code internally, with 70 to 90 percent of code written with Claude Code assistance. A team of four built Cowork in 10 days. (Vendor self-reported data from the company building the product.)

Stack Overflow's 2025 Developer Survey (n=49,009) documented the first-ever decline in developer favorability toward AI tools: positive sentiment dropped from 70+ percent in 2023-2024 to 60 percent. Trust in AI accuracy fell from 43 percent in 2024 to 29 percent in 2025. Two-thirds of developers say AI solutions are "almost right, but not quite." Notably, 72 percent say "vibe coding" is not part of their professional work.

DORA reports show that AI adoption correlates negatively with delivery stability. Throughput correlations vary by year and context. The 2025 report found that AI tends to amplify existing team dynamics rather than compensate for dysfunction (Google Cloud, "Announcing the 2025 DORA Report," September 2025).

The ISBSG 2026 study (13,100+ projects, releases, and agile sprints) found post-2023 projects show 10 to 25 percent lower project delivery rates (hours per function point) in AI-conducive environments compared to pre-2023 baselines, though the study does not collect AI usage flags and relies entirely on temporal proxies (ISBSG, isbsg.org/wp-content/uploads/2026/02/Short-Paper-2026-02-Impact-of-AI-Assisted-Development-on-Productivity-and-Delivery-Speed.pdf).

These findings suggest that agent effectiveness is highly environment-dependent, and that the specification and governance infrastructure around agents may matter as much as the agents themselves. For analysis of that infrastructure, see [Spec-Driven Development Framework Patterns](/papers/sdd-frameworks/).

**Sources:** Faros AI, "The AI Productivity Paradox Research Report," July 2025, faros.ai/blog/ai-software-engineering. Anthropic, "How AI is transforming work at Anthropic," December 2025. Stack Overflow 2025 Developer Survey, survey.stackoverflow.co/2025/ai. DORA 2024 Report, Google Cloud. DORA 2025 Report, Google Cloud, cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report. ISBSG, "Impact of AI-Assisted Development on Software Productivity and Delivery Speed," February 2026, isbsg.org/wp-content/uploads/2026/02/Short-Paper-2026-02-Impact-of-AI-Assisted-Development-on-Productivity-and-Delivery-Speed.pdf.

---

*This analysis was created with AI assistance. Sources include peer-reviewed studies, industry surveys, and vendor publications as detailed above. Data as of February 2026.*
