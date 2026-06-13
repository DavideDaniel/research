---
title: "Measure the Work, Not the Meter"
date: 2026-06-12
author: David Daniel
description: "Token billing itemized the cost of AI work and measures none of its value. The answerable question is cost and cycle time per delivered change, against a baseline."
---

# Measure the Work, Not the Meter

**Published:** June 2026 | **Author:** David Daniel

> *Continues the cost-and-value arc of [FinOps for Agents](/articles/finops-for-agents/) and [When the Loop Never Stops](/papers/agentic-pricing-break/), which covered controlling agentic spend and how token pricing broke seat-based budgeting. This article is a companion to the forthcoming paper* Proving the Loop Paid Off *(named in full at the close). It takes up the reaction that followed those first two pieces: the demand that every token justify itself. The short version: that demand asks the wrong question, and there is a right one, with a setup window that is open right now.* <!-- TODO: link the measuring-agentic-value paper ("Proving the Loop Paid Off") here when it is published -->

## The Panic Is About Visibility, Not Waste

Here is what actually changed when AI tooling moved from seats to tokens: nothing about the value of the work, and everything about the visibility of the cost.

A seat license was a fixed line item that borrowed its legitimacy from headcount. Nobody asked a $19-per-month license to prove its ROI each quarter, for the same reason nobody asks the spreadsheet software to. The cost was flat, predictable, and bundled into the accepted overhead of employing a person.

The work those tools produced was exactly as hard to value then as agent-produced work is now. The uncertainty was always there. It just wasn't itemized.

Token billing itemized it. [GitHub's move of Copilot to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) (April 27, 2026) is the clearest single marker of the shift: a flat seat replaced by a meter. And meters get audited.

Uber reportedly exhausted its planned 2026 budget for agentic coding tools within four months and responded with hard per-employee caps ([second-hand press via Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/uber-stock-drops-reportedly-caps-190100595.html), citing The Information and Bloomberg). Individual developers hit credit walls within days of Copilot's meter going live ([Visual Studio Magazine, June 4, 2026](https://visualstudiomagazine.com/articles/2026/06/04/copilot-billing-shock-hits-developers.aspx)).

The enterprises that adopted agentic tools at scale were already confronting metered spend, on budgets set before anyone knew what long-running agents would draw. An annual budget exhausted in four months points to a spend line that moves with usage, not with seat count. Those companies lived with usage-based pricing a full budget cycle before the Copilot pivot brought it to everyone else. Their blown budgets were already circulating as cautionary tales when the meter reached the broader market. The panic arrived pre-loaded.

Those are real operational problems, and the [FinOps playbook](/articles/finops-for-agents/) covers the levers that contain them: caps, caching, gateways, routing. Contained is not solved. The savings are unbenchmarked until you measure them on your own workload, and the routing half increasingly ships from the model vendors themselves, not as something you build. But a second reaction is spreading alongside the operational one: the demand that token spend be traced, line by line, to business value. **"What value did these tokens create"** is becoming a standing question in budget reviews.

It feels rigorous. In practice it prices the new way of working with the old way of measuring, and it will not produce an answer, because it is an input question. Inputs were never how we measured knowledge work, for AI or for the humans before it.

## We Never Measured Humans This Way Either

Strip the AI framing away and the question becomes obviously strange. No organization asks what value an engineer's keystrokes created, or audits a team's output per hour of meeting time consumed. The software industry tried the input-metric route once, with lines of code, and spent decades unwinding the damage. Inputs are easy to count and nearly meaningless, which is precisely the combination that makes them dangerous as targets.

That trap is reappearing in the agent era, not just history. Cursor's platform telemetry reports lines added per pull request up roughly 2.5× year-over-year. Only about 36% of those changes are accepted without a manual review step ([Cursor *Developer Habits Report*](https://cursor.com/insights), Spring 2026, the vendor's own telemetry). More volume past the same human gate is exactly the signal-versus-substance gap that made lines of code treacherous the first time.

The research record on this predates agents entirely. The SPACE framework ([Forsgren et al., 2021](https://cacm.acm.org/practice/the-space-of-developer-productivity/)) exists because its authors found that no single metric (and especially no activity metric) captures developer productivity. It takes five dimensions, most of which have nothing to do with volume of activity. That paper was a published admission, from researchers at GitHub and Microsoft among others, that counting what developers *do* tells you very little about what they *deliver*.

And the gap between activity and outcome can point in the wrong direction. METR's randomized controlled trial (Becker et al., [arXiv:2507.09089](https://arxiv.org/abs/2507.09089)) had experienced open-source developers complete 246 tasks with AI use randomly allowed or disallowed. Developers forecast AI would make them 24% faster. Afterward, they believed it had made them 20% faster. Measured completion time was 19% *slower*.

That is a single study of early-2025 tools in one setting, not a verdict on AI coding. But it is direct evidence that perceived productivity and activity-side signals can sit on the opposite side of zero from measured reality. An organization auditing token consumption is auditing exactly the kind of signal that study showed to be unreliable.

And it is not only controlled trials. Field telemetry points the same way. Faros AI analyzed more than 10,000 developers across 1,255 enterprise engineering teams ([Faros AI](https://www.faros.ai/research), 2025, the vendor's own engineering telemetry). Individual output jumped on high-AI-adoption teams: roughly 21% more tasks completed and 98% more pull requests merged. Team-level DORA delivery metrics stayed essentially flat. Activity rose sharply. Delivered throughput did not. A token meter would have recorded only the half that moved.

Token spend is an input meter. It tells you the agent was *busy*. A long-running agent re-reads its context on every turn of every loop. An agent that burns five times the tokens running verification passes before shipping looks wasteful on the meter, and it is doing the most valuable work in the pipeline. The meter cannot tell those apart. Nothing built on top of the meter can either.

## The Question That Does Have an Answer

There is a version of the value question that is answerable, and it is the one the panic is crowding out:

**What did a unit of delivered work cost, and how long did it take, compared to what that same delivery used to cost and take?**

This is the comparison agents actually change. The unit of work shifts: a persistent agent delivers a finished, verified change in hours of wall-clock time that used to take a team days or weeks.

The honest productivity case rests on *cycle time of delivered work* (time from request to shipped, verified change), not on tokens consumed and not on how fast any individual step felt. Cost per delivered change and cycle time per delivered change are both measurable, both comparable to a baseline, and both denominated in the thing the business actually buys: finished work.

At least one tooling vendor already publishes average **cost per task** as the headline axis of a public benchmark. Cursor's [CursorBench](https://cursor.com/cursorbench) plots model success rate against dollars spent per task (a vendor benchmark, the vendor's own figures).

In its current run, a cheaper in-house model scores 63.2% at $0.55 per task against a frontier model's 58.4% at $4.41. That is comparable quality at roughly one-eighth the cost per task. Whatever one makes of the specific models, the *denominator* is the point: cost measured per task, not per token. It is the same idea as cost per delivered change. That is the shift, already in the wild.

This framing deliberately gives up one thing: it does not promise to measure the *business value* of each change (whether this feature mattered more than that one). Nobody has ever measured that, for human teams or any other kind, and pretending tokens make it suddenly tractable is how organizations end up with ROI theater.

What it promises instead is rigorous *delivery economics*: the cost and speed of producing finished work. Quality is held constant by the verification you already run: tests, review, evals. That is more measurement than knowledge work has ever actually had. Take all of it, and stop demanding the part that has never existed.

The setup work depends on how far into adoption you already are.

## If You're Early: Snapshot the Baseline Now

The comparison above has a denominator (*what delivery used to cost and take*), and that denominator can only be captured before agents change the work. If your organization is still early in agent adoption, one measurement move costs almost nothing and becomes unavailable once agents change the work:

**Snapshot your current delivery economics, this quarter, before the transition blurs them.**

Concretely, for each team or workflow you expect agents to touch, capture cycle time from request to shipped change. Your ticketing and version-control history already contain this. Capture cost per delivered change: loaded team cost over a period, divided by changes shipped (coarse is fine, consistent is what matters). And capture rework rate: changes reopened, reverted, or fixed post-release.

None of this requires new tooling. It requires deciding, now, that these numbers are the baseline, writing down how they were computed, and storing them where next year's budget review can find them.

Every ROI claim your organization will ever want to make about agents divides by this baseline. Teams that capture it will be able to say "delivery is 40% faster at 70% of the cost, at constant quality" with receipts. Teams that don't will be arguing from anecdote against an itemized token invoice, and the invoice will win the argument it shouldn't.

## If You're Past That Point: Don't Reconstruct. Instrument Forward.

Many organizations are already deep into adoption with no clean baseline, and the tempting move is archaeology: reconstruct what delivery used to cost from old data, then justify the token spend against it. Resist that.

Retroactive baselines are built from records that weren't designed to be baselines, contaminated by everything else that changed in the same period. Every assumption in the reconstruction becomes a soft spot in a number that is supposed to settle arguments. A contested baseline is worse than none.

The better move is to stop trying to grade the past and set up to measure the future:

**Draw the measurement start line at today's date, and instrument forward from it.** The infrastructure is the same gateway layer the FinOps playbook already argued for, with one addition. Where agent traffic flows through infrastructure you control, tag it with task identity, so token spend joins to the delivered change it produced: the pull request, the ticket, the shipped artifact.

How far that tagging reaches depends on where your agents run. Agents you operate yourself (internal builds on API keys, CI and cloud sessions, CLI harnesses routed through your gateway) can carry task identity in the request path. Claude Code, for example, supports enterprise gateway routing and sends a session identifier on every request so a proxy can attribute cost without parsing request bodies ([LLM gateway configuration](https://code.claude.com/docs/en/llm-gateway), official docs). Vendor-hosted tools like Cursor give you no such path. Their traffic terminates at the vendor, and what comes back is admin usage reporting: spend per user or team over a billing period.

That difference changes the resolution, not the metric. Joining the work to the tokens turns the input meter into **cost per delivered change**. That number is a ratio. A ratio survives coarse inputs: take the team's spend for the month and divide by the changes the team delivered. The spend comes from gateway logs where you have them and vendor usage exports where you don't.

Where the request path is yours, tagging sharpens the join to the individual change. Track cycle time per delivered change and rework rate alongside it, all from the same start date.

Six months of forward data beats any reconstruction of the past. The trend line (is delivery getting faster and cheaper per finished change, at constant quality?) is the answer leaders are actually asking for when they ask whether the spend is worth it. And it has a property the token audit never will: it improves the longer you run it.

## One Warning Label

A caution for any organization that takes the measurement advice and runs with it: do not turn token efficiency into a target. The moment "value per token" becomes a KPI, teams will optimize it (routing to cheaper models, skipping verification passes, trimming the context that makes agents reliable). The legible number will improve while the work quietly degrades. This is Goodhart's law with a meter attached.

This is not a retraction of the tiered routing advocated in the [FinOps playbook](/articles/finops-for-agents/). The same action lives under two different control loops, and only one of them is dangerous.

Routing measured by **cost per completed task at constant quality** (Lever 3's framing rule) is closed-loop and self-correcting. If a downgraded model degrades output, verification catches it, retries fire, and the metric itself punishes the downgrade.

Routing driven by a token-reduction target is open-loop. The number improves precisely when verification gets skipped and context gets trimmed, because quality was never in the metric. Same lever, opposite objective functions. The first is engineering. The second is the misuse worth heading off.

Tokens are a cost to be *governed* (that is the FinOps layer) and a denominator to be *ignored* in productivity conversations. The only ratio worth managing is delivered work over time and cost, quality constant.

## What to Tell the Budget Meeting

The compressed version, for the meeting itself:

The token bill is a cost-control problem, and cost control is a solved playbook: caps, caching, gateways, routing, deployable now. It is not a value-measurement instrument, and auditing it as one measures the wrong thing; in the one randomized trial on record, that kind of activity signal pointed the opposite way from measured reality. The value question has an answerable form: cost and cycle time per delivered change, against a baseline.

If you can still capture that baseline, capture it this quarter. If you can't, draw the start line today and instrument forward (join spend to shipped work, per change or per team as the tagging allows) and let the trend answer. Govern the meter. Measure the work.

The fuller treatment is the subject of the companion paper, the forthcoming *Proving the Loop Paid Off: Measuring and Governing the Value of Agentic AI Spend*, in preparation and publishing later in this series. That paper covers why single-metric ROI misleads for agentic work, the confounders in cycle-time comparisons, and how to build value attribution that survives a hostile review. <!-- TODO: link the measuring-agentic-value paper when it is published -->

---

***Sources and AI assistance.** This article was drafted with AI assistance and verified by the author; every claim the argument depends on maps to a public source. Source pack: Becker et al., "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity," arXiv:2507.09089 (RCT, forecast +24%, post-hoc belief +20%, measured −19%, figures from the abstract) · Forsgren et al., "The SPACE of Developer Productivity," ACM Queue, 2021 · GitHub, "GitHub Copilot is moving to usage-based billing" (official, Apr 27, 2026) · Yahoo Finance syndicated reporting on Uber's AI-tool budget exhaustion and caps, citing The Information and Bloomberg (press, second-hand) · Visual Studio Magazine, "Copilot Billing Shock Hits Developers" (trade press, Jun 4, 2026) · Faros AI engineering-telemetry analysis (10,000+ developers across 1,255 teams, individual output up ~21% tasks / ~98% PRs while team DORA delivery metrics stayed flat, faros.ai/research, vendor telemetry, self-reported) · Cursor *Developer Habits Report* (lines/PR up ~2.5× YoY, ~36% of changes accepted without manual review, cursor.com/insights, vendor telemetry) · CursorBench (public cost-per-task benchmark, cursor.com/cursorbench, vendor benchmark, self-reported figures) · Claude Code LLM gateway configuration documentation (official docs: gateway routing and session-identifier attribution, verified June 2026) · This series: "FinOps for Agents" and "When the Loop Never Stops" (internal). The lines-of-code history is offered as common professional knowledge, not a sourced claim; the fuller historical argument (Drucker, the productivity paradox) is reserved for the companion paper with proper citations.*
