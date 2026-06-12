---
title: "More Turns, Bigger Bill: Why Agentic Architecture Is a Token Multiplier Independent of Price"
date: 2026-06-05
author: David Daniel
description: "Why agentic architecture multiplies token costs independent of price: autonomous loops take more turns per task, so bills rise even as per-token rates fall."
---

# More Turns, Bigger Bill: Why Agentic Architecture Is a Token Multiplier Independent of Price

**Published:** June 2026 | **Author:** David Daniel

> _Companion to the paper **["When the Loop Never Stops"](/papers/agentic-pricing-break/)**. This article isolates one argument from the paper's token-multiplier section and sharpens it to a single empirical point: agentic workflows multiply token consumption through **turns**, not just price. The paper situates this inside the larger always-on-agent cost reckoning; this piece exists to make the architecture-as-cost mechanism impossible to wave away._

## The bill went up, but the price didn't have to

The common explanation for the 2026 agent-cost spike is that tokens got more expensive. That story is incomplete, and the incompleteness matters because it points people at the wrong fix.

If the problem were price, the remedy would be obvious: route to a cheaper model, negotiate volume discounts, wait for the deflation curve that has reliably pushed per-token rates down year over year. Teams are doing all three and watching their bills climb anyway.

The variable those remedies don't touch is volume: specifically, how many tokens an autonomous workflow burns to finish a task. A single-shot completion is one prompt and one response. An agent that plans, calls tools, reads the results, re-plans, and repeats across dozens of turns consumes a multiple of that. Every turn re-submits context and generates new output, and every tool result becomes input to the next turn.

The per-token rate could stay flat (could even fall) and the bill for the same nominal task would still rise with the turn count. That is the entire argument, stated up front: **agentic architecture is a token multiplier, and the multiplier operates independently of price.**

## GitHub's billing change: the supply side names the problem

The clearest market admission comes from GitHub. On April 27, 2026, it announced that Copilot was [moving from flat-fee "premium request" units to usage-based token billing](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/), effective June 1.

The stated reason was not that GitHub's input costs per token had risen. It was that the flat unit no longer mapped to what users actually consume. In GitHub's words: "a quick chat question and a multi-hour autonomous coding session can cost the user the same amount... the current premium request model is no longer sustainable."

A billing unit designed for the chat era priced a question and an autonomous session identically. The spread in underlying consumption between those two things grew large enough to break the unit. GitHub does not quantify the spread, and no number is offered here. But a pricing model does not get publicly abandoned over a small one.

The thing that widened the spread is the architecture: multi-hour autonomous sessions exist now, chat-length interactions still exist, and one flat fee cannot price both.

The reaction confirmed who the change was really about. In the days between the announcement and the June 1 effective date, developer backlash built. TechCrunch's May 30 coverage led with one developer's verdict, ["what a joke"](https://techcrunch.com/2026/05/30/what-a-joke-github-copilots-new-token-based-billing-spurs-consternation-among-devs/).

The projected increases in that pre-launch coverage were dramatic. One developer quoted by TechCrunch paid around $29 a month and projected nearly $750 under the new rates, roughly a 26x jump. That multiple is arithmetic on the reported dollar figures, not a number TechCrunch states. Another shared a screenshot that appeared to show costs going from around $50 to some $3,000 (roughly 60x, by the same arithmetic).

Those figures are user-reported estimates of what existing usage would cost under the announced rates, published before the billing change took effect, not audited post-launch bills. They are anecdotes from the hardest-hit users, not a measured distribution. And the coverage itself records pushback: other users argued the extreme bills reflected iteration-heavy "vibe coding" rather than typical workloads.

A broader "10x to 50x" range circulated in commentary around the change. It is an extrapolation from anecdotes of exactly this kind, and nothing here relies on it.

But the direction is exactly what the multiplier argument predicts. The discussion TechCrunch quotes draws the line to architecture itself, with one user describing premium requests "that could churn for hours or even days while spawning dozens or even hundreds of sub-agents." Light chat users barely move, while turn-heavy users move by multiples, on the same product, the same models, and the same nominal rates.

## The decomposition: where 5.5x comes from

The most useful single datapoint is one that separates the price effect from the volume effect, because the two are usually tangled together in any real bill. Independent benchmarking outlet Artificial Analysis provides it. In its analysis of Google's model line, it found that [Gemini 3.5 Flash costs roughly 5.5x more to run than Gemini 3 Flash](https://artificialanalysis.ai/articles/gemini-3-5-flash-everything-you-need-to-know) across its evaluation suite, and decomposed why.

Part of the increase is price: per-token rates rose from $0.50/$3.00 to $1.50/$9.00 per million input/output tokens, a 3x increase (that ratio is simple arithmetic on the published prices). But 3x in price does not produce 5.5x in cost on its own. The remainder comes from volume.

Artificial Analysis reports that input token usage "increases significantly, driven primarily by an increase in the number of turns in agentic evaluations." The newer model takes more turns per evaluation task, each turn carries context, and the extra turns multiply the token count on top of the higher rate.

This is a benchmark-suite decomposition, not a controlled experiment. Artificial Analysis ran both models through its evaluation suite and attributed the cost gap to its two observed components. It did not hold every variable fixed and vary turns in isolation.

The decomposition into "about 3x from price, the remainder from token volume driven by turns" is the source's reported finding plus arithmetic on its published numbers. It is the cleanest public separation of the two effects on record.

What it shows is the multiplier operating in the open. The "just route to a cheaper model" reflex assumes the bill is a price problem you can shop away.

But if a meaningful share of cost growth is turn count, a cheaper model that takes the same number of turns saves you less than the price gap suggests. A more capable model that takes *more* turns can cost more in total even at a lower headline rate. Price and volume multiply. Optimizing one factor while the other grows is how teams end up surprised.

## Why price deflation alone doesn't settle the budget

Per-token prices are, in fact, falling hard on one end of the market. That makes the rising-bill phenomenon more puzzling under the price story and entirely unsurprising under the turns story.

The sharpest public datapoint: DeepSeek [made its 75% discount permanent on V4 Pro](https://the-decoder.com/deepseek-makes-its-75-percent-discount-permanent-pricing-output-tokens-at-least-34x-below-gpt-5-5/), pricing output tokens at roughly $0.87 per million. The Decoder frames that as at least 34x below GPT-5.5's roughly $30 per million output tokens. That figure is an output-token *price* gap between two specific models, not a measured total-cost-of-workload comparison, and not a recommendation to switch.

A 34x per-token spread is enormous, and it is real. But it sits on only one side of a multiplication. Total cost is rate times volume, and a workflow's turn structure sets the volume. With deliberately round numbers: a token priced 34x cheaper but consumed 50x more often yields a *higher* bill, not a lower one. That 50x is a mathematical illustration, not an observed DeepSeek workload statistic.

The point it illustrates is not hypothetical, though. The Gemini decomposition above shows turn-driven volume growth large enough to outrun a 3x price change within a single vendor's own model line. Nothing in the arithmetic stops volume growth from outrunning bigger spreads when the workload is agentic enough.

This is the precise failure mode of price-shopping as a complete strategy. It treats the rate card as the budget. The budget is the rate card times everything your architecture does with it.

A second structural feature of the rate card belongs next to the deflation point: providers bill input and output separately, and output carries a steep per-token premium, typically three to five times the input rate. On [Anthropic's published price sheet](https://platform.claude.com/docs/en/about-claude/pricing) (June 2026 rates), every current tier prices output at five times input.

That includes [Claude Fable 5](https://www.anthropic.com/news/claude-fable-5-mythos-5), the premium agentic-tier model Anthropic shipped on June 9, 2026. It lists at $10 per million input tokens and $50 per million output, exactly twice the corresponding Opus 4.8 rates (both multiples are arithmetic on the same published sheet, not a finding).

The DeepSeek gap quoted above is specifically an output-token price gap. None of this changes the argument. It compounds it. The "price" of an agentic workload is at least two rates multiplied by two volumes, with both volumes set by the loop's turn structure. That is one more reason no single cheaper headline number can settle a budget on its own.

## The demand side: Uber's four-month burn

The supply side changed its billing. The demand side blew through its budgets. Fortune reported in late May that [Uber ran through the budget it had set aside for AI coding tools for all of 2026 in roughly four months](https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/), with Claude Code among the tools in heavy use. Fortune names Claude Code specifically, and [a Yahoo Finance syndication of Bloomberg and The Information reporting](https://finance.yahoo.com/markets/stocks/articles/uber-stock-drops-reportedly-caps-190100595.html) names Cursor alongside it.

No specific dollar figure was disclosed, and none is supplied here. What's on the record is the timeline: a budget sized for a year, gone by spring.

Just as notable is what Uber's COO, Andrew Macdonald, said about the other side of the ledger. On whether token spend connects to shipped consumer value: "That link is not there yet." He added that it is "very hard to draw a line" between AI usage statistics and the roughly 25% more useful features the company wants to ship.

That is a demand-side executive describing both halves of the problem at once: consumption that outran the plan, and value attribution that hasn't caught up with the consumption.

Fortune reports the burn, the tools involved, and the COO's skepticism. It does *not* attribute the burn to turn multiplication.

The example did travel beyond Fortune: CNBC's May 29 piece, ["Tokens or humans? The new corporate trade-off"](https://www.cnbc.com/2026/05/29/-tokens-or-humans-the-new-corporate-trade-off.html), carried the four-month burn into its coverage of the broader corporate tokens-versus-headcount trade-off. A verification note on that citation: the CNBC page resisted automated retrieval during source checks, so it is cited here only for the pickup. Its existence, date, framing, and use of the Uber example were confirmed via search indexing and secondary coverage, and no mechanism claim rests on it.

The mechanism reading is mine: autonomous coding agents are the most turn-intensive workloads in common enterprise use, and Uber's named tools are agentic coding tools. A budget presumably sized on earlier, less agentic usage patterns, consumed in a third of the expected time, is what the turns multiplier predicts a budget would do. That is analysis consistent with the reporting, not a fact the reporting establishes.

What the sourced record does establish is enough for the argument here: a sophisticated buyer, using agentic tools heavily, consumed a year of budget in four months. Its leadership describes the spend-to-value link as not yet demonstrated.

## Where the turns come from: cadence and horizon

If turns are the multiplier, the operative question becomes what governs the number of turns. Two mechanisms matter: cadence, which the public record supports only qualitatively, and horizon, which comes with concrete (if qualified) public numbers.

**Cadence.** Long-running and multi-agent setups have a rhythm: how often agents poll for new work, heartbeat to signal liveness, check shared state, or re-read context to stay current. Every one of those cycles is at least one turn, and every turn re-submits context as billable input. An always-on agent ticks around the clock whether or not anything useful happens on a given tick.

No public primary source quantifies cadence's share of agent spend. An earlier circulated claim that cadence is "the top lever" traced back to a source with an arithmetic error, so no numbers and no ranking are carried here.

What the public record does support is the mechanism's economics. Anthropic's [prompt-caching pricing](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) charges cache reads at a fraction of the fresh-input rate precisely because re-submitted context is the recurring cost in multi-turn workloads. Caching exists to blunt the cost of paying for the same context again and again.

One inference follows: in an always-on agent, the *frequency* of context re-reads is a first-order spend variable, plausibly mattering more than the size of any single context. That is analysis of the pricing structure, not a sourced ranking. Treat the direction as sound and the magnitude as unestablished.

**Horizon.** The second mechanism is how long the loop runs before a task is done. Public long-horizon numbers give a sense of scale. Artificial Analysis reports that evaluating Qwen3.7 Max on its full Intelligence Index [generated about 97 million tokens at a cost of $1,202](https://artificialanalysis.ai/models/qwen3-7-max). That figure is the total across the entire evaluation suite (many tasks, not one autonomous run): a measure of what sustained agentic-style workloads accumulate to, not the price of a single task.

And in a vendor demo (not independently audited), MiniMax describes its [M3 model running roughly 24 hours on a CUDA-kernel task, completing 147 benchmark submissions and 1,959 tool calls](https://www.minimax.io/models/text/m3). Neither figure proves the thesis on its own (one is a benchmark aggregate, the other a vendor showcase), which is why nothing rests on either one. Both are here as illustrations of shape: when the horizon extends, one "task" decomposes into hundreds or thousands of billable steps, and every step is turns.

Cadence sets how often the loop fires. Horizon sets how long it keeps firing. Together they determine the turn count, and the turn count, multiplied by the rate card, is the bill.

## What this argument does and doesn't claim

The argument does not claim that per-token prices are irrelevant. The Gemini decomposition itself attributes about 3x of the 5.5x to price. Rates matter. They're a factor in the multiplication.

Nor does it claim a universal multiplier. How many extra turns agentic workflows take varies by task, model, scaffold, and configuration, and the public record doesn't support a general number. The Gemini case quantifies one model transition on one evaluation suite. The GitHub and Uber episodes show the phenomenon's footprint without measuring its size.

It also doesn't claim the turns are waste. The companion paper's whole subject is that some loops earn their tokens and some don't. The value question is left open here. The cost mechanism is the subject.

What it does claim: token consumption per task is an architectural property, set by turn count, and it scales independently of the rate card. Any cost analysis that models price and ignores turns will misprice agentic work. And any cost strategy that consists entirely of routing to cheaper models is optimizing one factor of a two-factor product.

## The takeaway, handed back to the paper

The single point of this companion is narrow on purpose: **agentic architecture is a token multiplier independent of price.** If the diagnosis is right, the fix is not only cheaper tokens. It is governing turns: cadence, horizons, loop termination, and what each cycle of the loop actually delivers.

A caution on how to ask that last question. "Did the tokens pay for themselves" prices an input. The useful comparison is what the work delivered and how long it took, set against what the same delivery used to cost and take. That framing, and the measurement it requires, is where **["When the Loop Never Stops"](/papers/agentic-pricing-break/)** takes over. This companion exists to make the paper's token-multiplier premise unambiguous before the paper builds on it.

_Companion to: ["When the Loop Never Stops"](/papers/agentic-pricing-break/), token-multiplier section._

---

*This article is part of an ongoing research project tracking AI tooling, software engineering practices, and cross-functional workflows at [daviddaniel.tech/research](https://daviddaniel.tech/research).*

*This article was created with AI assistance. Sources include: GitHub Blog billing announcement (April 2026), TechCrunch developer-reaction coverage (May 2026), Artificial Analysis Gemini 3.5 Flash analysis and Qwen3.7 Max evaluation data, Fortune and CNBC reporting on Uber's AI tooling spend (May 2026), The Decoder on DeepSeek V4 Pro pricing, Anthropic prompt-caching documentation, Anthropic's published model price sheet and Claude Fable 5 announcement (June 9, 2026), and MiniMax's M3 model page (vendor self-reported). Data as of mid-June 2026. Illustrative arithmetic and analytical inferences are labeled as such inline.*
