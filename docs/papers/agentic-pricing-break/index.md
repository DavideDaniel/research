---
title: "When the Loop Never Stops: How Long-Running Agents Broke Seat-Based Pricing and Created the AI Value Problem"
date: 2026-06-05
author: David Daniel
description: "How long-running agents multiplied token consumption, broke seat-based pricing, exhausted enterprise AI budgets, and triggered the May 2026 cost reckoning."
---

# When the Loop Never Stops: How Long-Running Agents Broke Seat-Based Pricing and Created the AI Value Problem

*From the Scaling Agentic Development for Enterprise Teams research series*

**Published:** June 2026 | **Author:** David Daniel

**Target Audience:** Engineering leaders, platform owners, and finance partners responsible for AI tooling budgets and vendor contracts

---

## Abstract

Between the start of 2026 and June 2026, AI coding tools crossed a threshold their pricing models were never designed to survive. The shift from the inline copilot to the long-running agent (a loop that runs for minutes or hours, taking many turns per task and re-reading a growing context at every step) is not only an architectural change. It is mechanically a cost change.

A multi-hour autonomous session can consume orders of magnitude more tokens than a quick completion. That single fact propagated through the industry's economics in a tight, datable chain. More turns per task meant open-ended token consumption. Open-ended consumption broke flat per-seat licensing. Metered bills burned through enterprise budgets. And the burned budgets set off the public ROI reckoning of late May 2026.

This paper traces that chain link by link using the cleanest dated proof points of the window. GitHub Copilot switched to usage-based billing on April 27, 2026, effective June 1. Uber exhausted its 2026 AI coding-tools budget in four months. Microsoft canceled Claude Code licenses in its largest product division on May 14, 2026. The concentrated "tokenmaxxing is dead" news cycle ran May 23–28, 2026.

This paper argues that long-running agents *are* the cost driver, not merely a coincident one. Price cuts alone cannot neutralize a cost that is structural to the architecture: cheaper tokens attack the per-token rate while leaving the turn count untouched.

The paper deliberately stops at establishing the cost mechanism and its consequences. How enterprises should measure whether agentic spend bought value, and how they should govern it, is handed to companion work on instrumenting agentic value. Figures that are vendor self-reported, secondhand, forecast-based, or derived are flagged inline.

The spine of the argument rests on a first-party vendor announcement (GitHub), a public analyst forecast (Goldman Sachs Research), reputable press (Fortune, TechCrunch, CNBC, The Verge, Tom's Hardware, The Decoder), independent benchmarking (Artificial Analysis), and academic work on agent token economics (arXiv/Stanford).

## Introduction

Earlier work in this research series examined the architecture of long-running agents. The paper [Always-On Enterprise Agents](/papers/always-on-agents/) (April 2026) provided a taxonomy of persistent agent patterns (durable sessions, asynchronous continuation, identity-bound governance), and the article [The Autonomous Agents Loop](/articles/autonomous-agents-loop/) argued that autonomous execution loops outperform interactive assistance. Both pieces treated the long-running agent as an architectural and governance problem. Neither touched billing.

That omission was deliberate at the time and is no longer tenable. In the two months since the Always-On paper was published, the economics of long-running agents became the dominant industry story.

This paper is the bridge between those halves. The first half established *what long-running agents are*: loops that persist, accumulate context, and act through tools across hours of wall-clock time. The second half asks *whether they are worth it*: how to measure, attribute, and govern the value they produce.

The bridge claim is that the same property that makes long-running agents valuable is mechanically what made them expensive. Agents work by iterating, and every iteration is a billed model call. After April 2026, tokens are increasingly the unit of billing.

The argument proceeds in six steps, each anchored to dated, publicly verifiable evidence:

1. **The token multiplier.** Agentic architecture multiplies token consumption per task independently of per-token price, because each turn re-reads a growing context. This is the mechanism.

2. **The seat-to-token pivot.** GitHub Copilot's April 27, 2026 move to usage-based billing is the cleanest first-party admission that flat per-seat pricing could not survive multi-hour autonomous sessions.

3. **Budget burn.** Uber's exhaustion of its 2026 AI coding-tools budget in roughly four months is the demand-side mirror of the supply-side pivot. Microsoft's cancellation of Claude Code licenses in its largest product division shows the same pressure reaching the deepest-pocketed buyer.

4. **The sentiment flip.** The "tokenmaxxing is dead" news cycle of May 23–28, 2026 reversed, almost metric for metric, the earlier framing of token volume as adoption momentum.

5. **The counter-pressure.** The DeepSeek-led price war is real but structurally insufficient, because price cuts do not reduce turn counts.

6. **The blast-radius tax.** Autonomy carries an implicit, unbudgeted risk cost beyond the token bill, presented strictly as a forward-looking risk pattern, not a logged incident.

This is a causal survey of a fast-moving news window, and the evidence base is journalistic and vendor-published rather than peer-reviewed, so sourcing is marked inline. First-party announcements are distinguished from press reporting, and press reporting from the secondhand accounts it carries. Vendor demos are marked as self-reported. Arithmetic computed from published figures is marked as derived. Claims that could not be verified against an accessible public source are either dropped or kept qualitative, with that status stated. A consolidated limitations section near the end lists every such flag in one place.

## The Token Multiplier: How Agentic Turns Turn Architecture into Cost

### Turns, not tokens per turn

The cost story begins not with prices but with *turns*. An inline copilot answers a question and stops: one prompt in, one completion out. A long-running agent runs a loop: it reads context, takes an action, observes the result, and re-reads the now-larger context to decide the next action, repeating this for many iterations within a single task. Two consequences follow directly from that loop shape.

First, the number of model calls per task is no longer one or a handful. It is however many iterations the task demands, which for long-horizon work can be dozens or hundreds. Second, because each iteration's prompt includes the accumulated history (prior actions, tool outputs, file contents, error messages), the input side of each call grows as the task proceeds.

Input tokens, not output tokens, become the dominant cost driver. The per-task token bill scales with the number of turns rather than with the size of the final answer. This mechanism (repeated re-reads of an ever-larger context making agentic work input-dominated) is described in academic work on agent token economics: the arXiv paper ["How Do AI Agents Spend Your Money?"](https://arxiv.org/abs/2604.22750) and the accompanying [Stanford Digital Economy Lab analysis](https://digitaleconomy.stanford.edu/news/how-are-ai-agents-spending-your-tokens/) both examine how agentic task structure drives token consumption far beyond chat-style usage.

The decisive point is that the multiplier is *independent of price per token*. Even holding the rate flat, more turns means more tokens means a larger bill. The multiplier is architectural: it lives in the loop, not in the rate card.

### The measured decomposition: Gemini 3.5 Flash

The cleanest measured illustration of architecture-as-cost comes from [Artificial Analysis](https://artificialanalysis.ai/articles/gemini-3-5-flash-everything-you-need-to-know), an independent benchmarking outlet (analysis published May 19, 2026). Its evaluation found that running Gemini 3.5 Flash through its Intelligence Index costs about 5.5x more than running Gemini 3 Flash ($1,552 versus the prior model's total).

Decomposing that figure: Google's list pricing rose from $0.50/$3.00 to $1.50/$9.00 per million input/output tokens, a 3x increase, as Artificial Analysis itself notes. The remainder of the 5.5x (roughly a further 1.8x, computed here from those figures) comes from the newer model consuming significantly more input tokens to complete the same evaluations, which Artificial Analysis attributes as "driven primarily by an increase in the number of turns in agentic evaluations."

That decomposition (part price, part turn count) is the empirical heart of the argument. A buyer who responds to the 3x price increase by routing to a cheaper model addresses only the first term. The second term, the turn count, travels with the agentic workload itself.

### Magnitude estimates and their limits

Two magnitude figures circulated widely in the May 2026 window. Both come with bounds.

The headline figure ("agentic AI eats up to 1000x more tokens than standard AI") ran in [Tom's Hardware on May 23, 2026](https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-cost-crisis-hits-tech-giants-as-employee-tokenmaxxing-backfires-agentic-ai-eats-up-to-1000x-more-tokens-than-standard-ai-sparks-corporate-pullback-at-microsoft-meta-and-amazon), but it originates in the [arXiv study cited above](https://arxiv.org/abs/2604.22750), whose abstract reports that "agentic tasks are uniquely expensive, consuming 1000x more tokens than code reasoning and code chat, with input tokens rather than output tokens driving the overall cost."

The figure was measured on agentic *coding* tasks (SWE-bench Verified trajectories) against code-reasoning and code-chat baselines, not across all workloads. The same study finds token usage highly variable: runs on the same task can differ by up to 30x. It is a measured ceiling for long-horizon agentic work, not a universal multiplier.

The aggregate figure is smaller, differently shaped, and a forecast rather than a measurement. [Goldman Sachs Research's May 20, 2026 analysis](https://www.goldmansachs.com/insights/articles/ai-agents-forecast-to-boost-tech-cash-flow-as-usage-soars) (senior equity analyst Jim Schneider) projects that, with consumers and enterprises adopting AI agents, token consumption will multiply roughly 24 times between 2026 and 2030, reaching about 120 quadrillion tokens per month. Schneider describes agentic work as "like taking a simple chatbot request and blowing it up 10-fold, 20-fold, 50-fold." The figure circulated through the May cost-reckoning press via [Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-costs-begin-to-bite-as-agents-may-increase-token-demand-by-24-times-says-goldman-sachs-report-uber-and-microsoft-among-companies-feeling-the-bite-of-tokenized-billing) and [Fortune](https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/).

The two numbers are complementary rather than contradictory. 1000x describes what a single long-horizon agentic task can do relative to a single chat-style exchange. The ~24x is what Goldman expects agent adoption to do to aggregate token consumption, across consumer and enterprise use combined, over the rest of the decade.

### Cadence: a hypothesized lever, carried qualitatively

A second structural lever is hypothesized, not sourced. In multi-agent and always-on configurations, agents do not only take turns when a human asks something. They poll, heartbeat, and re-check work on a schedule. The hypothesis (the author's reasoned inference, not a sourced finding or practitioner consensus) is that this cadence governs how many turns accrue per unit of wall-clock time, making it a first-order spend variable in long-running systems.

The practitioner discussion in which this claim originated contained an arithmetic error flagged during source collection. No numeric cadence figure is reproduced here, and no claim is made that cadence is the *largest* lever.

What is verifiable is the adjacent pricing mechanism. [Anthropic's prompt-caching pricing](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) discounts re-reads of cached context relative to uncached input. The inference (again the author's) is that as caching makes any single re-read cheap, the marginal cost of a long-running system shifts away from the size of any one prompt and toward how *often* the loop turns over.

An always-on agent that re-checks its work every minute accrues sixty times the turns of one that re-checks hourly, whatever each turn costs. No public primary source quantifies this effect across systems. It is a pattern to instrument, not a benchmark.

### What long-horizon work costs in practice

Two concrete data points make the per-task token scale tangible.

[Artificial Analysis's Qwen3.7 Max page](https://artificialanalysis.ai/models/qwen3-7-max) reports that "it cost $1202.49 to evaluate Qwen3.7 Max on the Intelligence Index," with the evaluation generating roughly 97 million output tokens. That figure is the *total* across the full Intelligence Index evaluation suite, not the cost of a single long-horizon run. A longer-horizon framing that circulated alongside it (a single 35-hour run with on the order of 1,580 tool calls) could not be verified against the accessible source and is not asserted here.

Even with that constraint, the verified figure is instructive. A current frontier-class model, exercised across an agentic evaluation suite, generates tokens in the tens of millions and costs in the thousands of dollars per full pass.

The second data point is a vendor's own demo. [MiniMax's own M3 model page](https://www.minimax.io/models/text/m3) states that in a CUDA-kernel optimization demo, "M3 completed 147 benchmark submissions and 1,959 tool calls" over roughly 24 hours. This is the model maker's published account, not an independently audited run. It is cited only for the shape it illustrates: a single task, run autonomously for a day, producing nearly two thousand tool calls, each one a billed turn over a growing context.

The mechanism, the decomposition, the magnitude estimates, and the concrete runs all point the same way. The companion article [More Turns, Bigger Bill](/articles/token-multiplier/) isolates that argument into a single empirical claim: the agentic token multiplier is structural and survives any per-token price.

## The Seat-to-Token Pivot: GitHub Copilot and the End of Predictable Licenses

### The announcement, dated

If the token multiplier is the mechanism, the pricing pivot is the consequence, and it has a date. On April 27, 2026, GitHub announced that [Copilot is moving to usage-based billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/), abandoning the flat-fee "premium request" unit model in favor of token-metered pricing, effective June 1, 2026.

GitHub named the cause in its own words: "a quick chat question and a multi-hour autonomous coding session can cost the user the same amount," and therefore "the current premium request model is no longer sustainable."

This is the single cleanest first-party admission in this paper's chain. It covers the pricing link specifically, not the whole chain. The vendor that operates the most widely deployed AI coding assistant stated, in an official announcement, that the spread between its cheapest and most expensive uses had grown too wide for a flat unit to price. That spread was created specifically by multi-hour autonomous sessions.

The long-running agent broke the flat fee, and the vendor said so. The rest of the chain, from architecture through budget burn to the value reckoning, is press-documented and author-argued, not vendor-admitted.

### Why the pivot is structural, not commercial

The significance is structural, not merely a price change. A per-seat license has one defining property for the buyer: predictability. The bill is known in advance, it appears as a fixed line item, and it does not move with usage. That property is what made AI coding assistants easy to procure: a seat is a seat, budgeted like any other SaaS seat.

A token-metered bill inverts the property. The bill floats with how hard each seat's agent runs. Under the architecture described in the previous section, "how hard the agent runs" is open-ended: it scales with task length, loop iterations, and context size, none of which the procurement contract caps.

The pivot changes the *type* of the cost, not just the number: from fixed to variable, from forecastable to demand-coupled. For light users, this can mean paying less. For the heavy agentic users who drove the change, it means the predictable license is gone.

The prediction embedded in the April announcement resolved on schedule. Usage-based billing (GitHub AI Credits) went live on June 1, 2026 across Copilot plans, with base subscription prices unchanged. GitHub's announcement carved out existing annual Pro and Pro+ subscribers, who stay on the prior model until renewal.

The developer reaction was immediate. [TechCrunch reported on May 30, 2026](https://techcrunch.com/2026/05/30/what-a-joke-github-copilots-new-token-based-billing-spurs-consternation-among-devs/), as the activation date approached, on public developer backlash, including examples of heavy agentic users projecting bills rising from roughly $29 per month toward $750 per month once metered usage was counted. That example implies a multiple of about 26x (computed from the reported figures). The broader "10x–50x" range that circulated in commentary around the change is an extrapolation from individual anecdotes of this kind. There is no published distribution of Copilot bills, and the range should not be read as statistically representative.

What the reporting does establish directly is the structural point: under metered billing, heavy agentic use produces bills an order of magnitude or more above the old flat fee, and developers noticed.

The companion article [The Day Copilot Started Charging by the Token](/articles/copilot-token-billing/) tells this pivot as a standalone narrative, pairing the supply-side announcement with the demand-side burn covered in the next section.

### The pivot reaches the model tier: Claude Fable 5

The pattern GitHub set did not stay at the coding-assistant layer, and the freshest dated proof point here arrived while the paper was being finalized. On June 9, 2026, Anthropic released [Claude Fable 5](https://www.anthropic.com/news/claude-fable-5-mythos-5), a "Mythos-class" model positioned above its Opus line and aimed at long-running agentic work. It is listed at $10 per million input tokens and $50 per million output tokens: double the $5/$25 rate of Claude Opus 4.8 on [Anthropic's own price sheet](https://platform.claude.com/docs/en/about-claude/pricing) (the 2x multiple is computed from those published rates, as listed in June 2026).

The access model is the telling part. Fable 5 is included in paid subscription plans only from June 9 through June 22, after which, per the announcement, using it "will require usage credits." Anthropic frames the gating as staged capacity management ("We expect demand for Fable 5 to be very high, and difficult to predict") and says it aims to "restore Fable 5 as a standard part of subscription plans" when capacity permits. Every characterization in this paragraph is from the vendor's own announcement.

The launch is the seat-to-token concession repeating one level down. GitHub conceded in April that a flat subscription could not price the spread between a chat question and a multi-hour session. In June, the vendor of the most agentic model tier on the market declined to leave that tier inside flat subscriptions at all beyond a two-week window.

The capacity framing is Anthropic's. The structural reading (that a model built to run long cannot be sold flat, whatever the stated rationale) is this paper's analysis, and it is the same reading the rest of the chain supports.

### The "dual cost model" framing, bounded

Analyst and vendor commentary in this window described enterprises as facing a "dual cost model" (a fixed per-seat license sitting alongside open-ended cloud and API token billing) and argued this forces a "FinOps for AI" discipline. The kernel is supportable. The [FinOps Foundation Framework](https://www.finops.org/framework/) recognizes AI as an emerging cost-management domain and centers exactly the variable-spend governance problem that token billing creates.

But the "dual cost model" formulation itself is vendor/analyst framing, not a documented industry standard, and the Foundation does not assert it. An anecdote that circulated with this framing (claims of 1,000–10,000% Azure spend growth) is unverified vendor marketing and is deliberately not used as data here. The adjacent piece [FinOps for Agents](/articles/finops-for-agents/) takes up the governance practice. The point here is only that the pivot created the category of problem that practice exists to manage.

## Budget Burn in the Wild: Uber, Microsoft, and the Demand-Side Mirror

The supply-side pivot has a demand-side mirror: enterprises spending faster than they budgeted. The canonical example of the window is Uber.

Per [Fortune's May 26, 2026 reporting](https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/), Uber exhausted its 2026 AI coding-tools budget in roughly four months, amid heavy use of Claude Code. The company had incentivized adoption through an internal leaderboard ranking teams by total AI tool usage. The Information first reported the four-month exhaustion in April 2026, citing Uber CTO Praveen Neppalli Naga, and Fortune's May coverage carries and extends it. The Information's original is paywalled and was not independently reviewed for this paper.

A budget sized at the start of the year for twelve months of spend was gone by roughly the end of April. That places the exhaustion in the same weeks as GitHub's pivot announcement.

The exhaustion also reveals the billing model, and the timing that follows from it. A flat seat cannot burn through an annual budget ahead of schedule; the line item does not move. Only metered spend can do that, which means Uber was already paying for agentic tooling by consumption, under a budget negotiated before anyone knew what long-running agents would draw. Enterprises in that position met usage-based pricing a full budget cycle before the pivot carried it to the seat-priced mainstream.

No specific dollar amount is disclosed in the verified reporting. A "$3.4B budget" number that circulated in some retellings is unverified and is not used here, in the brief, or in any companion piece. The facts that matter are the four-month exhaustion and what came with it.

What came with it is the more important half, because it previews the value problem the companion work takes up. The same Fortune reporting records Uber COO Andrew Macdonald's skepticism about what the spend bought. On the link between AI usage statistics and shipped consumer value, Macdonald said the link "is not there yet," and that it is "very hard to draw a line" between token-spend metrics and shipping roughly 25% more useful features. The budget is gone, the usage metrics are spectacular, and the operating chief cannot trace the one to business outcomes the company can bank.

Nor was the pattern Uber's alone. [CNBC's May 29, 2026 piece "Tokens or humans?"](https://www.cnbc.com/2026/05/29/-tokens-or-humans-the-new-corporate-trade-off.html) framed AI token spend as a corporate trade-off against headcount. "Companies are telling us that their AI budgets are getting exhausted in one month or two months, and these are annual budgets," Glean CEO Arvind Jain told CNBC. Jain also said that successive frontier-model generations, arriving at roughly double the per-token cost, had put enterprise AI spending on what he called an unsustainable path.

(CNBC's page could not be fetched directly for this paper, and archive services were inaccessible from this environment. The headline framing, Jain's quote, and these reported details were verified against accessible search-indexed excerpts of the piece's body text on June 9, 2026. CNBC is corroboration of the wider pattern. The central budget-burn case, Uber, is sourced via Fortune.) Uber's dollar amount, meanwhile, remained undisclosed in all of this coverage.

Uber is the canonical case, but it is not the most telling one. That distinction belongs to Microsoft, the buyer with the deepest pockets in the industry and, uniquely, billing leverage over its own AI supply chain. On May 14, 2026, [The Verge reported](https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad) that Microsoft had begun canceling Claude Code licenses in its Experiences + Devices division (the organization behind Windows, Microsoft 365, Teams, and Surface). Engineers were required to move to GitHub Copilot CLI by June 30, 2026, the end of Microsoft's fiscal year ([Windows Central carries corroborating coverage](https://www.windowscentral.com/microsoft/microsoft-cancels-claude-code-licenses-shifting-developers-to-github-copilot-cli-a-move-likely-driven-by-financial-motives)).

What makes this a cost-reckoning data point is the reversal it represents. Microsoft had itself opened Claude Code access to thousands of employees (developers, project managers, and designers) beginning in December 2025, explicitly to run both tools comparatively ([The Verge, January 2026](https://www.theverge.com/tech/865689/microsoft-claude-code-anthropic-partnership-notepad); corroborated in [Fortune's May 22 account](https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/) of the roughly six-month experiment). The reporting describes engineers as having come to prefer and rely on the tool.

[Fortune's May 22, 2026 coverage](https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/) folded the cancellation directly into the broader agentic cost story: "The tech became popular fast. Perhaps too popular. The scale at which employees use it is now prompting the firm to reverse course on a tool its own engineers had come to rely on."

The cost reading is partly inferential. Microsoft has not said that cost drove the decision. Its on-record rationale, given by EVP Rajesh Jha to The Verge, is standardization: consolidating on "a product we can help shape directly with GitHub for Microsoft's repos, workflows, security expectations, and engineering needs." The reporting points to fiscal-year cost pressure as a factor *alongside* that stated rationale, not in place of it.

The move is division-scoped, not company-wide. Nor is it an Anthropic rupture: Claude models remain available inside Copilot products, and the Foundry arrangement (up to $5B in investment and a $30B Azure commitment) is unaffected ([Fortune, May 22, 2026](https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/)). [The Next Web's May 25 analysis](https://thenextweb.com/news/microsoft-claude-code-retreat-ai-cost) (an opinion piece) supplied the sharper gloss: "What changed was not the strategic logic. What changed was the bill."

What the episode shows (this paper's analysis, not a sourced finding) is the shape of the response. Even the vendor with the deepest pockets and its own billing leverage, confronted with open-ended internal agentic consumption, consolidated onto the tool whose costs it controls. That is a demand-side echo of the same pressure that broke seat pricing.

Uber's exhaustion, Microsoft's consolidation, and Copilot's billing switch are faces of the same break. The vendor side could no longer absorb open-ended inference at a flat price. The buyer side could no longer predict its bill (or, in Microsoft's case, chose to own the meter rather than keep paying someone else's). All three are downstream of the token multiplier established in the first section, a synthesis the sources themselves do not assert. All three surfaced within roughly a month of one another.

A tempting inference is that the way out of the meter is to build your own tooling. The record does not support it. Amazon tried: a November 2025 internal memo pushed its in-house Kiro over third-party tools ("we do not plan to support additional third party, AI development tools," per [Futurism's reporting](https://futurism.com/artificial-intelligence/amazon-kiro-coding)). Engineers pushed back in numbers, and by May 2026 the company had opened Claude Code and Codex to its developers via AWS Bedrock ([The New Stack](https://thenewstack.io/amazon-coding-agents-developers/)).

The companion paper [Harness Engineering](/papers/harness-engineering/) treats that case in full as evidence of what engineers actually chose. Here it serves as the cost-side caution. Gartner, for its part, [predicts that more than 40% of agentic AI projects will be canceled by the end of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), citing escalating costs, unclear business value, and inadequate risk controls (an analyst forecast).

Microsoft's consolidation onto Copilot CLI is not a counterexample so much as a special case. It consolidated onto a product it ships with GitHub, not a greenfield build. The general lesson is narrower than either case: meter pressure is real, but the record surveyed here does not support treating an in-house build as the escape from it.

## Tokenmaxxing Is Dead: The Dated Sentiment Flip

### The baseline: token volume as virtue

The third link in the chain is a sentiment flip, and it too is datable, but to see the flip, you need the baseline it reversed.

In earlier coverage of the enterprise AI buildout, "tokenmaxxing" (maximizing token throughput) was framed *positively*, as evidence of adoption momentum. [SDxCentral's reporting on DeepSeek's API price cuts](https://www.sdxcentral.com/news/deepseek-slashes-api-prices-by-90-as-ai-mad-enterprises-embrace-tokenmaxxing/) described "AI-mad enterprises" embracing tokenmaxxing, noting that Visa processed 1.9 trillion tokens in a single month (March, in that reporting) and that Disney engineers were using Claude around 51,000 times per day. The numbers were presented neutral-to-positively: token volume as a proxy for how thoroughly a company had adopted AI.

Token volume is an *input* measure: it counts model usage, not outcomes. As long as bills were flat or small relative to the perceived upside, an input measure could stand in for progress. The architecture of the long-running agent multiplied the input measure without any necessary change in outcomes, and that is what broke the proxy.

### The flip: May 23–28, 2026

The reversal ran as a concentrated news cycle over roughly six days. It opened with [Tom's Hardware on May 23, 2026](https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-cost-crisis-hits-tech-giants-as-employee-tokenmaxxing-backfires-agentic-ai-eats-up-to-1000x-more-tokens-than-standard-ai-sparks-corporate-pullback-at-microsoft-meta-and-amazon), which reported an "AI cost crisis" at major tech companies, employee tokenmaxxing "backfiring," and corporate pullback at Microsoft, Meta, and Amazon. It culminated in [Fortune's May 28, 2026 piece "Tokenmaxxing is over"](https://fortune.com/2026/05/28/tokenmaxxing-is-dead-companies-didnt-get-the-roi-from-ai-they-wanted-to-see/), reporting that token usage had proven a poor proxy for ROI, that companies had gotten "sticker shock" from their AI bills, and that the days of tokenmaxxing were over.

The sharpest cost formulation in the cycle belongs to [Fortune's May 22 reporting](https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/), whose headline put it bluntly: using the tech was proving more expensive than paying human employees. That is a headline-level generalization. Its on-record anchor is one executive's team, Nvidia VP Bryan Catanzaro stating that for his team "the cost of compute is far beyond the costs of the employees."

The specific corporate examples in the Fortune tokenmaxxing piece carry their own sourcing chains. Fortune attributes the report that Microsoft cancelled Claude Code subscriptions in several key product divisions to The Verge. It attributes to the Financial Times the account of Amazon employees spinning up agents for meaningless or unnecessary tasks purely to keep their token-usage stats up. And it reports that Meta took down the informal tokenmaxxing leaderboard its employees had created.

The Microsoft cancellation is examined, with corroboration, in the budget-burn section above. The Financial Times original was not independently reviewed, so the Amazon example is cited only as Fortune's attributed reporting. Tom's Hardware's May 23 piece corroborates the same three-company pullback narrative from a second outlet. (An Axios piece in the same window, "AI sticker shock hits corporate America," May 28, carried a corroborating headline on enterprise AI spending and ROI, but its body is paywalled and it is not relied on as a source here.)

The Meta detail is the clearest. A leaderboard (even an informal, employee-created one) exists to celebrate a metric. Taking it down is an institutional statement that the metric no longer measures what the institution wants. The exact quantity that the baseline coverage presented as adoption, raw token volume, had become, by late May, the symbol of unexamined spend.

### The widening: from news cycle to narrative

Within days the cycle had widened from a cost story into a value story. Derek Thompson's May 29, 2026 essay ["The AI Boom Has Entered Its 'Wait, Is This Worth It?' Phase"](https://www.derekthompson.org/p/the-great-ai-cost-panic-of-2026) (subtitled "The great AI cost panic of 2026 is upon us") argued that "the center of gravity of the AI discourse has shifted from concerns about demand, to worries about supply, to a freakout over *value*". Thompson framed the episode as the third act of the AI-bubble debate rather than a billing dispute. The same day, CNBC's ["Tokens or humans?"](https://www.cnbc.com/2026/05/29/-tokens-or-humans-the-new-corporate-trade-off.html) framing made the trade-off explicit at the level of corporate resource allocation.

The dates carry one more structural fact. The cycle ran and closed before June 1, the day Copilot's usage-based billing took effect. The companies in the pullback coverage were not reacting to the pivot's first bills, which had not yet been issued. They were the early adopters whose negotiated budgets had already collapsed under metered agentic spend: the enterprises that experienced usage-based pricing before the moment arrived for the broader market. Their blown commitments were circulating as cautionary tales while the seat-priced mainstream was still waiting for its first metered invoice, and that pre-loading is part of why the flip read as panic rather than as a price adjustment.

The sentiment flip posed, rather than resolved, the question of what replaces token volume as a proxy for value. The conclusion argues the question itself needs reframing before anyone answers it. That work is where this paper stops and the companion measurement work begins.

## The Counter-Pressure: Why the Price War Cannot Close the Gap

If costs are structural, the obvious escape is cheaper tokens, and the window did deliver a price war.

[The Decoder reported on May 23, 2026](https://the-decoder.com/deepseek-makes-its-75-percent-discount-permanent-pricing-output-tokens-at-least-34x-below-gpt-5-5/) that DeepSeek made its 75% price cut on V4-Pro permanent, pricing output tokens at roughly $0.87 per million against GPT-5.5's roughly $30, a gap The Decoder characterizes as at least 34x (about 34.5x on its arithmetic; prices as of late May 2026). The discount had originally been set to expire on May 31, 2026. Announcing it permanent in the same week the tokenmaxxing cycle peaked reads as a deliberate bid for the suddenly cost-conscious enterprise buyer.

(The comparison is The Decoder's. Its figures cite the vendors' published pricing pages, which were not separately archived for this paper.) The same deflationary pressure appears in the baseline section's SDxCentral reporting: DeepSeek's earlier 90% API price slashing was the news hook for the original tokenmaxxing coverage. Price deflation bookends the entire window.

But the counter-pressure is where the thesis sharpens, and the logic follows from the first section's decomposition. A per-task agentic bill is, to first approximation, rate × tokens, and tokens scale with turns. Price cuts attack the rate term. They do nothing to the turn term.

The Gemini 3.5 Flash result shows the turn term moving *against* the buyer even within a single vendor's product line: a 5.5x cost increase of which only 3x was price. The 1000x-class per-task figure and the ~24x aggregate-consumption forecast (with the bounds given earlier) describe the token base ballooning with autonomy regardless of what any token costs. As illustrative arithmetic, not a forecast: a 34x cheaper rate fully absorbed by a 24x larger token base nets out close to even. Absorbed by a workload trending toward long-horizon agentic tasks, it can net out worse.

The window's most consequential second-order effect (this paper's analysis, not a sourced finding) is that the rational enterprise response to the price war is not relief but *scrutiny of the rate card itself*. Once a buyer understands that a frontier model's premium rate gets multiplied by an open-ended turn count, the question stops being "can we afford the frontier model?" and becomes "which turns of which loops actually need it?" A 34x spread between frontier and discount pricing makes routine agentic work at frontier rates a choice that must be justified, not a default.

The price war is real, and it matters. It cannot, by itself, close a gap that is architectural. Its main effect on sophisticated buyers is to convert cost anxiety into per-workload routing and measurement questions, which the companion work takes up.

## The Blast-Radius Tax: The Cost That Never Appears on an Invoice

The final cost in the chain is implicit: the risk that an autonomous agent does something expensive. It belongs in a paper about agentic cost because no budget line captures it, yet every organization running long-running agents is carrying it.

The cleanest available illustration comes from OpenAI's own data platform. [ByteByteGo's June 3, 2026 account of how OpenAI built its data agent](https://blog.bytebytego.com/p/how-openai-built-its-data-agent), relaying Emma Tang, OpenAI's head of data platform engineering, describes the risk created when AI-amplified users ship un-reviewed, AI-generated work into production data infrastructure built on Kafka and Flink faster than the platform team can validate it. In the account's words, this is the scenario where "a bad Flink job lands on the cluster and brings it down," and the user who shipped it can only reply, "I don't know, I don't know how Flink works, it's vibe-coded. Can you help fix it?"

The account describes platform-side agents as the team's planned response: machinery "designed to triage incoming code, validate it before it runs, and absorb the deluge from AI-amplified users", built to catch exactly this class of failure before it reaches the cluster.

This is a *forward-looking risk pattern* (in the account's own words, "the next problem the data platform team plans to work on"), not a logged production outage. Neither the ByteByteGo account nor any other source verified for this paper documents a confirmed historical incident of an agent or vibe-coded job taking down OpenAI's cluster. None is asserted here. (Parallel press coverage of the same data-agent story exists but is paywall-blocked and is not relied on here.)

Read as a risk pattern, though, it completes the cost picture. The token bill is the *visible* cost of autonomy, and it arrives metered and itemized. The blast radius is the *invisible* cost: the expected value of incidents that autonomous write-access makes possible, plus the cost of the validation machinery built to prevent them. The mitigation itself is more agents (validation agents reviewing producer agents), so the mitigation itself consumes tokens.

The architecture of the mitigation belongs to the earlier work in this series ([Always-On Enterprise Agents](/papers/always-on-agents/) treats approval gates and bounded execution at length). For cost purposes, the point is that the true cost of the loop is the token bill plus a risk premium, and the invoice shows only the token bill.

## The Chain, Restated

Each link in the causal chain now has a dated proof point and an evidence status:

| Link | Proof point | Date | Evidence status |
|---|---|---|---|
| Agentic turns multiply tokens independent of price | Artificial Analysis Gemini 3.5 Flash decomposition (5.5x = 3x price + turn-driven consumption) | May 19, 2026; figures stable as of June 2026 | independent benchmark |
| Per-task multiplier can be extreme | "1000x more tokens than code reasoning and code chat" (arXiv 2604.22750; popularized by Tom's Hardware) | study submitted April 24, 2026; press cycle May 23, 2026 | academic study figure; agentic-coding-specific, not cross-workload |
| Aggregate token consumption multiplies | Goldman Sachs Research ~24x forecast, 2026 to 2030 (~120 quadrillion tokens/month) | published May 20, 2026 | public analyst forecast (consumer + enterprise combined), not a measurement |
| Flat per-seat pricing becomes unsustainable | GitHub Copilot usage-based billing announcement | April 27, 2026 (effective June 1, 2026) | first-party vendor announcement |
| Buyers lose bill predictability | Copilot billing backlash; the ~$29 to ~$750/mo example | May 30, 2026 | reported anecdotes; ranges derived, not measured |
| Metered access reaches the model tier | Claude Fable 5: subscription inclusion ends June 22, then usage credits; listed at 2x the Opus 4.8 rate | June 9, 2026 | first-party vendor announcement; 2x multiple derived from Anthropic's published price sheet; capacity framing is the vendor's |
| Budgets exhaust ahead of plan | Uber four-month burn + COO ROI skepticism | first reported April 2026 (The Information); Fortune May 26, 2026 | reputable press (original paywalled, carried via Fortune); dollar figure undisclosed |
| Cost pressure reaches the deepest-pocketed buyer | Microsoft cancels Claude Code licenses in Experiences + Devices; Copilot CLI migration by fiscal-year end (June 30) | May 14, 2026 | reputable press (primary scoop + corroboration); cost role inferred; Microsoft's stated rationale is standardization |
| Sentiment flips on the same metric | "Tokenmaxxing is dead" cycle | May 23–28, 2026 | multi-outlet press, some items attributed secondhand |
| Price cuts cannot close the gap | DeepSeek permanent 75% cut (~34x below GPT-5.5, prices as of late May 2026) | reported May 23, 2026; permanent past May 31, 2026 | press comparison + author analysis |
| Autonomy adds an unbudgeted risk tax | OpenAI data-platform blast-radius pattern | published June 3, 2026 | practitioner account; risk pattern, not incident |

The long-running agent is not incidentally expensive. It is mechanically the cost driver.

## Limitations and Evidence Quality

The paper's claims are only as strong as the evidence notes they carry, so the notes are consolidated here.

- **Domain-bound study figure.** The 1000x per-task multiplier comes from the arXiv study's abstract, measured on agentic *coding* tasks against code-reasoning and code-chat baselines. It is not a cross-workload benchmark. The same study reports up-to-30x run-to-run variance on identical tasks, and the press shorthand ("up to 1000x more than standard AI") generalizes beyond the study's scope.

- **Forecast, not measurement.** The ~24x figure is Goldman Sachs Research's published forecast of token-consumption growth between 2026 and 2030, consumer and enterprise adoption combined. It was verified against Goldman's own public article. It remains a model-based projection, not observed demand, and it is not specific to enterprise coding workloads.

- **Secondhand corporate examples.** Within Fortune's tokenmaxxing reporting, the Amazon item (via the Financial Times) rests on Fortune's account; the original was not independently reviewed. The Uber four-month burn originates with The Information (April 2026, also paywalled and not independently reviewed) and reaches this paper via Fortune. The Microsoft cancellation is sourced to The Verge's May 14, 2026 report. The Verge's pages could not be fetched directly for this pass, so its details are verified through Windows Central's and Fortune's readable corroboration, including the Rajesh Jha statement.

- **Stated rationale vs. cost inference.** Microsoft has not said cost drove the Claude Code license cancellation. Its on-record rationale is standardization on GitHub Copilot CLI. The cost-pressure reading is reporting-plus-inference, the move is division-scoped rather than company-wide, and the Anthropic relationship (Claude in Copilot products; the Foundry deal) is unaffected. The Next Web piece carrying the sharpest cost framing is an opinion piece and is cited only as opinion.

- **Vendor self-report.** The MiniMax M3 24-hour demo (147 benchmark submissions, 1,959 tool calls) is the vendor's own published account.

- **Eval total, not a single run.** The Qwen3.7 Max figure ($1,202.49, ~97M tokens) is the full Intelligence Index evaluation total. A single-run framing that circulated with it is unverified and not used.

- **Derived arithmetic.** The ~1.8x turn-driven residual in the Gemini decomposition and the ~26x multiple in the Copilot billing anecdote are computed from published figures. The "10x–50x" bill-jump range is an extrapolation from anecdotes, not a measured distribution.

- **Undisclosed figure excluded.** Uber's dollar budget is undisclosed in verified reporting. The circulated "$3.4B" figure is unverified and excluded.

- **Qualitative-only claim.** The cadence-as-spend-lever claim is the author's inference. Its originating practitioner source contained an arithmetic error, so no number is used and no superlative ("largest lever") is asserted.

- **Risk pattern, not incident.** The OpenAI blast-radius scenario is a forward-looking risk pattern with platform-side mitigation described as planned, not a confirmed outage.

- **Quote audit.** Every quoted snippet, from GitHub, Artificial Analysis, ByteByteGo, Fortune, TechCrunch, MiniMax, Goldman Sachs Research, CNBC (via excerpts), Derek Thompson, and The Next Web, plus the Rajesh Jha statement (via Windows Central), was checked verbatim against accessible source text on June 9, 2026. The ByteByteGo and Goldman Sachs quotes were re-checked against full article bodies in a second pass the same day.

- **Framing boundaries.** The "dual cost model" formulation is analyst/vendor framing. The FinOps Foundation supports the variable-cost-management category but does not assert that model. The DeepSeek/GPT-5.5 price comparison is The Decoder's, which cites the vendors' pricing pages; the figures are dated as of late May 2026 and may have moved since. Paywalled or fetch-blocked corroboration (Axios, The Information, the Financial Times, press coverage of the OpenAI data agent) is noted but not relied on. CNBC's "Tokens or humans?" body was verified from accessible search-indexed excerpts rather than a direct fetch (the direct fetch returned empty and archive services were inaccessible from the drafting environment, June 9, 2026). It is corroboration, not the central budget-burn case. Derek Thompson's essay is a partially paywalled post whose cited framing appears in its free portion. Volatile pricing/billing sources could not be snapshot-archived from this environment for the same reason, so access dates are stated inline instead.

- **Window dependence.** This is an account of a specific news window (roughly late April through early June 2026). The causal chain is argued from mechanism plus dated events, not from a controlled study. Subsequent reporting could revise individual proof points without, in the author's judgment, breaking the chain. That judgment is dated June 2026.

## Conclusion

The pricing break of mid-2026 was not a surprise that happened *to* the AI coding-tools market. It was a property of the architecture the market had just adopted, arriving on schedule.

The moment tools shifted from answering questions to running loops, per-task cost stopped being bounded by the size of an answer. It became bounded by nothing in particular: however many turns a task demands, over however many hours it runs. Flat per-seat pricing could price the answer but not the loop.

Every subsequent event in the window follows from that mismatch, and each carries a date. GitHub stated it plainly in the April 27 announcement: a quick question and a multi-hour autonomous session cannot cost the same. Uber's twelve-month budget lasted four.

By the last week of May, token volume, the metric enterprises had celebrated in the adoption phase, had become the emblem of spend that could not be traced to value. The executives quoted in the reckoning coverage were not complaining about price. They were saying they could not draw the line from spend to outcomes. The price war, real as it is, addresses the term of the bill that was never the problem.

A cost problem and a value problem are different problems. The cost mechanism is now established and dated, and the evidence comes in three registers that should not be flattened into one. The pricing pivot is vendor-admitted: GitHub said in its own announcement that the flat unit could not survive the multi-hour session. The budget burn, the consolidation, and the sentiment flip are press-documented, some of it secondhand and marked that way. The chain that connects them (architecture to turns to tokens to the broken seat to the burned budget) is this paper's synthesis, argued from those parts rather than admitted by anyone.

That layered claim is what this paper set out to establish, and where it deliberately stops. What the burned budgets and the flipped sentiment created is the harder question: enterprises now spend variably, on an architecture whose consumption is open-ended, with input metrics they no longer trust as proxies. One more caution belongs in that handoff, about the question itself. "What value did the token spend create" prices the new way of working with the old way of measuring. A long-running agent changes the unit of work: it delivers a finished change in hours of wall-clock time that used to take a team weeks. Token spend is an input meter, and input meters make poor productivity measures. The SPACE research made that case before agents existed ([Forsgren et al., 2021](https://cacm.acm.org/practice/the-space-of-developer-productivity/)), and the METR trial showed how far perceived speed can sit from measured time ([Becker et al., arXiv:2507.09089](https://arxiv.org/abs/2507.09089)). The earlier paper in this series made the architectural version of the same argument: the productivity case for persistent agents rests on cycle-time reduction, not task speed ([Always-On Enterprise Agents](/papers/always-on-agents/)). The apples-to-apples comparison is the value of work delivered per unit of time, set against what that delivery used to cost and how long it used to take. That is the comparison leaders need, and the question the companion work should answer.

Proving whether the spend bought value, and governing the loop so the question stays answerable, is the subject of the companion measurement-and-governance work in this series. <!-- TODO: link the measuring-agentic-value paper ("Proving the Loop Paid Off") here when it is published --> The loop will not stop on its own. The instrumentation has to catch up to it.

---

## References

### Pricing and Billing

- GitHub. "GitHub Copilot is moving to usage-based billing." April 27, 2026. https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
- TechCrunch. "'What a joke': GitHub Copilot's new token-based billing spurs consternation among devs." May 30, 2026. https://techcrunch.com/2026/05/30/what-a-joke-github-copilots-new-token-based-billing-spurs-consternation-among-devs/
- The Decoder. "Deepseek makes its 75 percent discount permanent, pricing output tokens at least 34x below GPT-5.5." May 23, 2026. https://the-decoder.com/deepseek-makes-its-75-percent-discount-permanent-pricing-output-tokens-at-least-34x-below-gpt-5-5/
- SDxCentral. "DeepSeek slashes API prices by 90% as AI-mad enterprises embrace tokenmaxxing." https://www.sdxcentral.com/news/deepseek-slashes-api-prices-by-90-as-ai-mad-enterprises-embrace-tokenmaxxing/
- Anthropic. "Prompt caching." https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
- Anthropic. "Claude Fable 5 and Mythos 5." June 9, 2026. https://www.anthropic.com/news/claude-fable-5-mythos-5
- Anthropic. "Pricing" (model price sheet). https://platform.claude.com/docs/en/about-claude/pricing
- FinOps Foundation. "FinOps Framework." https://www.finops.org/framework/

### Cost Mechanism and Benchmarks

- Goldman Sachs Research. "AI Agents Forecast to Boost Tech Cash Flow as Usage Soars." May 20, 2026. https://www.goldmansachs.com/insights/articles/ai-agents-forecast-to-boost-tech-cash-flow-as-usage-soars
- Tom's Hardware. "AI cost crisis hits tech giants as employee 'tokenmaxxing' backfires, sparking corporate pullback at Microsoft, Meta, and Amazon — agentic AI eats up to 1000x more tokens than standard AI." May 23, 2026. https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-cost-crisis-hits-tech-giants-as-employee-tokenmaxxing-backfires-agentic-ai-eats-up-to-1000x-more-tokens-than-standard-ai-sparks-corporate-pullback-at-microsoft-meta-and-amazon
- Tom's Hardware. "AI costs begin to bite as agents may increase token demand by 24 times, says Goldman Sachs report." May 2026. https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-costs-begin-to-bite-as-agents-may-increase-token-demand-by-24-times-says-goldman-sachs-report-uber-and-microsoft-among-companies-feeling-the-bite-of-tokenized-billing
- Bai, Longju, et al. "How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks." arXiv:2604.22750, submitted April 24, 2026. https://arxiv.org/abs/2604.22750
- Stanford Digital Economy Lab. "How are AI agents spending your tokens?" https://digitaleconomy.stanford.edu/news/how-are-ai-agents-spending-your-tokens/
- Forsgren, Nicole, et al. "The SPACE of Developer Productivity." ACM Queue / Communications of the ACM, 2021. https://cacm.acm.org/practice/the-space-of-developer-productivity/
- Becker et al. "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity." METR, arXiv:2507.09089, July 2025. https://arxiv.org/abs/2507.09089
- Artificial Analysis. "Gemini 3.5 Flash: The new leader in intelligence versus speed." May 19, 2026. https://artificialanalysis.ai/articles/gemini-3-5-flash-everything-you-need-to-know
- Artificial Analysis. "Qwen3.7 Max." https://artificialanalysis.ai/models/qwen3-7-max
- MiniMax. "M3" (vendor model page; self-reported demo). https://www.minimax.io/models/text/m3

### Enterprise Spend and Sentiment

- The Verge. Report on Microsoft encouraging employees to install Claude Code under the Anthropic partnership. January 2026. https://www.theverge.com/tech/865689/microsoft-claude-code-anthropic-partnership-notepad
- The Verge. Report on Microsoft canceling Claude Code licenses in its Experiences + Devices division. May 14, 2026. https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad
- Windows Central. "Microsoft cancels Claude Code licenses, shifting developers to GitHub Copilot CLI — a move likely driven by financial motives" (corroboration of The Verge's scoop). May 15, 2026. https://www.windowscentral.com/microsoft/microsoft-cancels-claude-code-licenses-shifting-developers-to-github-copilot-cli-a-move-likely-driven-by-financial-motives
- Fortune. "Microsoft reports are exposing AI's real cost problem: Using the tech is more expensive than paying human employees." May 22, 2026. https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/
- Fortune. "Uber burned through its entire 2026 AI budget in four months. Now its COO is questioning whether it's worth it." May 26, 2026. https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/
- The Information. Report that Uber's CTO said the company had burned through its 2026 AI coding budget in four months (original scoop; paywalled, not independently reviewed; carried via Fortune). April 2026. https://www.theinformation.com/newsletters/applied-ai/uber-cto-shows-claude-code-can-blow-ai-budgets
- Fortune. "Tokenmaxxing is over. That's because it never measured what really counts to see ROI from AI." May 28, 2026. https://fortune.com/2026/05/28/tokenmaxxing-is-dead-companies-didnt-get-the-roi-from-ai-they-wanted-to-see/
- CNBC. "Tokens or humans? The new corporate trade-off." May 29, 2026. https://www.cnbc.com/2026/05/29/-tokens-or-humans-the-new-corporate-trade-off.html
- Derek Thompson. "The AI Boom Has Entered Its 'Wait, Is This Worth It?' Phase" (subtitle: "The great AI cost panic of 2026 is upon us"; partially paywalled). May 29, 2026. https://www.derekthompson.org/p/the-great-ai-cost-panic-of-2026
- The Next Web. "Microsoft's quiet Claude Code retreat and the real cost of enterprise AI" (opinion piece; cited as such). May 25, 2026. https://thenextweb.com/news/microsoft-claude-code-retreat-ai-cost
- Futurism. "Amazon pushes Kiro coding tool" (memo quote; May 2026 Bedrock reopening). https://futurism.com/artificial-intelligence/amazon-kiro-coding
- The New Stack. "Amazon opens coding agents to developers." https://thenewstack.io/amazon-coding-agents-developers/
- Gartner. "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027." June 25, 2025. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027

### Autonomy Risk

- ByteByteGo. "How OpenAI Built Its Data Agent." June 3, 2026. https://blog.bytebytego.com/p/how-openai-built-its-data-agent

### Related Research on This Site

- [Harness Engineering: How Claude Code and Codex Became Long-Running Agentic-Engineering Systems](/papers/harness-engineering/), the architectural half of this two-paper sequence
- [Always-On Enterprise Agents: Persistent Architecture, Delegated Identity, and the Productivity Hypothesis](/papers/always-on-agents/)
- [The Autonomous Agents Loop](/articles/autonomous-agents-loop/)
- [The Specification Layer](/articles/specification-layer/)

## Citation

If citing this research in academic or professional work:

```
Daniel, David (2026). When the Loop Never Stops: How Long-Running Agents
Broke Seat-Based Pricing and Created the AI Value Problem.
Retrieved from https://daviddaniel.tech/research/papers/agentic-pricing-break/
```

---

*This paper bridges the architecture of long-running agents to the economics of their value. It is accompanied by two practitioner articles: [The Day Copilot Started Charging by the Token](/articles/copilot-token-billing/), a news-hook anatomy of the seat-to-token pricing break, and [More Turns, Bigger Bill](/articles/token-multiplier/), a deep-dive on the token-multiplier mechanism. The adjacent piece [FinOps for Agents](/articles/finops-for-agents/) covers the cost-governance practice this paper's findings make necessary. For the architectural half of the argument, see the published paper [Always-On Enterprise Agents](/papers/always-on-agents/).*

*This paper is part of an ongoing research project tracking AI tooling, software engineering practices, and cross-functional workflows at [daviddaniel.tech/research](https://daviddaniel.tech/research).*

---

*This paper was created with AI assistance. Sources include first-party vendor announcements and documentation (GitHub, Anthropic including the Claude Fable 5 announcement and price sheet, MiniMax, FinOps Foundation), public analyst forecasts (Goldman Sachs Research; Gartner), reputable press (Fortune, TechCrunch, CNBC, Tom's Hardware, The Verge, Windows Central, The Decoder, SDxCentral, Futurism, The New Stack), commentary cited as such (The Next Web; Derek Thompson), independent benchmarking (Artificial Analysis), academic work on agent token economics (arXiv:2604.22750; Stanford Digital Economy Lab), developer-productivity measurement research (SPACE; the METR trial), and practitioner accounts (ByteByteGo). Vendor self-reported, secondhand, forecast-based, and derived figures are labeled inline; paywalled originals (The Information, Financial Times, Axios) are noted and not relied on directly. Data as of mid-June 2026.*
