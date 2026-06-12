---
title: "Harness vs Framework: Why 'Just Use LangChain' Stopped Being the Answer"
date: 2026-06-05
author: David Daniel
description: "Why teams now adopt pre-wired agent harnesses like Claude Code instead of assembling frameworks like LangChain, and how to tell which side of the fork you are on."
---

# Harness vs Framework: Why 'Just Use LangChain' Stopped Being the Answer

**Published:** June 2026 | **Author:** David Daniel

> _Companion to the paper **["Harness Engineering"](/papers/harness-engineering/)**. The paper develops the full discipline. This article takes one section of it (the harness-versus-framework taxonomy) and expands it into a standalone orientation for practitioners deciding what to build versus what to adopt._

## The question changed underneath the answer

For roughly two years, the reflexive answer to "how do I build an agent" was a library. Just use LangChain. Wire up the loop, register the tools, glue the prompts together. The answer was so standard it barely registered as a decision.

By mid-2026, the answer practitioners give each other has shifted. The thing teams increasingly reach for first is not an assemblable framework but a **harness**: a pre-wired agent runtime where the loop, the tool registry, the context management, and the permission layer already exist. You bring the model and the task.

That is a thesis, not a measurement. Nobody has published survey data on what "most teams" build with. What the public record does support is more useful than a market-share claim: the practitioner literature has converged on a vocabulary that splits the old question in two.

"How do I build an agent" contains two different questions: *what runs the agent* and *who builds the thing that runs it*. The harness/framework distinction is the line between them. The point of this article is to name that line before you write any code.

The frame the public write-ups have settled on is **Agent = Model + Harness**, where the harness is "every piece of code, configuration, and execution logic that isn't the model itself." Both the equation and the definition come from [LangChain's "The Anatomy of an Agent Harness"](https://langchain-blog.ghost.io/the-anatomy-of-an-agent-harness/) by Vivek Trivedy (March 10, 2026), which states them in exactly those words. The [O'Reilly Radar write-up on agent harness engineering](https://www.oreilly.com/radar/agent-harness-engineering/) by Addy Osmani (May 15, 2026) quotes Trivedy's one-liner directly and credits him with coining the term "harness engineering". That a second outlet reached for the same formulation is part of the evidence the framing has traveled.

The reframing carries the whole argument. If the agent is the model plus everything around it, then build-versus-adopt is really a question about that *everything*. A framework gives you parts for it. A harness gives you a running version of it. The shift from one default to the other is the story here.

## What a harness actually is

Strip an agent to its skeleton and you find a loop: call the model, execute the tools it asks for, feed the results back, repeat until the task is done. The [MindStudio write-up on production agent harnesses](https://www.mindstudio.ai/blog/9-components-production-agent-harness) treats that while-loop as the foundation: a loop engine at the core, a registry of tools and skills around it, a permissions layer enclosing it. Everything arrives pre-wired rather than left to the developer to assemble.

The same write-up carries a three-phase framing of the field's trajectory, credited to practitioner Akshay Pachaar: from competing on model weights, to context engineering, to **harness engineering**. Each stage widens what the practitioner is responsible for shaping: the model itself, then the model's working set, then the entire runtime around the model.

A harness, then, is that runtime shipped as a product. The products usually named as examples (Claude Code, OpenAI's Codex, Cursor, Windsurf) arrive with the loop already running, the tool registry already populated, the permission prompts already designed. (For the same distinction drawn from the evaluation and observability side, see [Arize AI's explainer on agent harnesses](https://arize.com/blog/what-is-an-agent-harness/).) You configure a harness; you do not construct it.

A framework (LangChain and its descendants, AutoGen, CrewAI) sits on the other side of the line. "Assemblable" does not mean empty. Modern framework stacks ship real abstractions (agent classes, graph runtimes, memory primitives, integrations), and a team that wants them can build a production agent on top. The difference is not capability. You can build the same loop in LangChain that Claude Code ships with.

The difference is **ownership of the hard parts**. In a framework, the loop, the failure handling, the context management, and the permission boundary are yours. You choose them, wire them, and maintain them as models, tool protocols, and safety expectations change underneath you. The maintenance is the part that compounds.

In a harness, those subsystems ship as defaults, and you inherit a vendor's opinions about how an agent should behave. That trade, flexibility surrendered for a working opinionated runtime, is the actual content of the harness/framework distinction. Everything else is detail.

## The nine subsystems you would otherwise have to build

The distinction is consequential rather than academic because of the surface area it covers. [MindStudio's write-up](https://www.mindstudio.ai/blog/9-components-production-agent-harness), crediting the breakdown to practitioner @engineerprompt, lists **nine components**: the while-loop itself (the loop engine), context management and compaction, a skills-and-tools registry, sub-agent management, built-in skills, session persistence, dynamic system-prompt assembly, lifecycle hooks, and a permissions and safety layer. (Arize AI's independently written explainer converges on essentially the same nine.) The taxonomy is theirs. The practical reading that follows is mine.

The list functions as a build-versus-adopt checklist. Each item is a subsystem with real engineering depth behind it:

- **Context management and compaction** keeps a long-running agent from drowning in its own history. Without it, the loop degrades as it runs.
- **Session persistence** lets a crashed or interrupted run resume instead of starting over.
- **Lifecycle hooks** are the interception points: the difference between an agent you can govern and one you can only watch.
- **The permissions and safety layer** is the line between an agent that asks before it acts and one that quietly does whatever the model suggests.

A team that adopts a harness inherits a vendor's answer to each of these problems on day one. Which of the nine any given product implements, and how well, varies. The enumeration is a map of the surface area, not a feature matrix for any specific tool.

The asymmetry it exposes is the load-bearing point. On one side of the fork, nine subsystems arrive pre-built and pre-integrated. On the other, nine subsystems go on your team's roadmap and stay there for the life of the system. That asymmetry, not any deficiency in the libraries, is why "just use LangChain" faded as the default answer (my reading). The libraries did not get worse. The checklist got visible.

## The strongest public evidence the harness side is real

The distinction would be a curiosity if it had stayed blog vocabulary. What moved it past that is a vendor putting first-party weight behind it.

OpenAI published a first-party essay, ["Harness engineering: leveraging Codex in an agent-first world,"](https://openai.com/index/harness-engineering/) by Ryan Lopopolo, an MTS on OpenAI's Frontier team, describing harness engineering as a practiced discipline inside the company. The essay reports an internal product of over a million lines of code built with **zero human-written code**. That figure is OpenAI's own number for its own internal project, not an independently audited one.

The operational details come from a separate source. The [Latent Space discussion of the work](https://www.latent.space/p/harness-eng) describes the project's code as shipping **without human review before merge**. It puts the spend at **roughly $2,000–3,000 per day at around one billion output tokens per day**, explicitly correcting the ~$1,000/day figure that circulated in some retellings. Those numbers come from a conversation, not an audit: an order-of-magnitude sketch of what a serious harness-built project costs, not a benchmark.

What survives the qualifications is the directional point: a frontier vendor is building real internal software on the harness model and publishing the practice under a name. Reading that as the moment a term became a category is my call, not OpenAI's claim. But it is hard to read the episode any other way.

The vocabulary has also traveled beyond OpenAI. As of June 2026 the term is used independently by [LangChain](https://langchain-blog.ghost.io/the-anatomy-of-an-agent-harness/) (a framework vendor), [O'Reilly Radar](https://www.oreilly.com/radar/agent-harness-engineering/) (technical press), and [Arize AI](https://arize.com/blog/what-is-an-agent-harness/) (an evaluation and observability vendor). Each develops the harness/framework distinction in its own terms rather than echoing OpenAI's framing. When sources with no stake in each other's positioning reach for the same word and draw the same line, the taxonomy has stabilized enough to build decisions on.

## Which side of the fork are you on

The harness/framework line is the first architectural fork an agent project hits. It shapes nearly everything downstream: who maintains the loop, where the permission boundary lives, how much of the vendor's worldview you absorb, and what your team is signing up to operate in year two. What follows is decision guidance: author judgment drawn from the taxonomy above, not benchmark data.

**You are probably on the harness side if** the work is shaped like the work harnesses were built for: agentic coding and adjacent tasks against files, repositories, and shells. The vendor's opinions about permissions, compaction, and session handling also have to be opinions you can live with. The deal is straightforward: you give up architectural control over nine subsystems you were unlikely to build better, and you get an operationally mature runtime now instead of after a roadmap.

**You are probably on the framework side if** the agent is a component of your own product rather than a tool your team uses. Same if the loop you need is shaped differently from anything a coding-agent vendor imagined, or if compliance, data-handling, or governance constraints mean you must own the permission boundary outright rather than inherit it. Then the framework's flexibility is the requirement, not a tax, and the nine-subsystem to-do list is the cost of meeting it.

The expensive failures live in the conflations. A team that needed a framework's freedom but adopted a harness spends its time fighting the vendor's opinions at every hook and permission prompt. A team that needed a harness but reached for a framework spends its time rebuilding a worse version of one, re-deriving compaction, persistence, and safety boundaries it could have inherited, before it writes a line of the thing it set out to build.

Neither choice is wrong in general. They are different decisions, and the only reliable way to make the right one is to name the fork before you build.

## The third path: owning an open harness

The fork is no longer strictly binary. As of mid-2026 a third option has taken recognizable shape: open-source, deliberately minimal harnesses. You adopt one the way you adopt a vendor product, then own it outright the way you own framework code.

The cleanest statement of the idea is the homepage tagline of **pi** ([pi.dev](https://pi.dev)): "There are many agent harnesses, but this one is yours." pi is an MIT-licensed, terminal-based harness that is minimal on purpose. Its homepage lists what it deliberately left out as the pitch: "No MCP," "No sub-agents," "No permission popups," "No plan mode". The [launch post](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/) by creator Mario Zechner (the libGDX author) explains the philosophy: four default tools, a system prompt and tool definitions that together come in under a thousand tokens, and 15+ model providers per the homepage.

One omission stands out under a taxonomy that treats the permission layer as a core harness subsystem: pi ships **no built-in permission system at all**. The [repository](https://github.com/earendil-works/pi) is explicit about it, and points users who need boundaries to containers and sandboxes instead.

Zechner [joined Earendil](https://lucumr.pocoo.org/2026/4/8/mario-and-earendil/), the company co-founded by Armin Ronacher, in April 2026, and the project [moved to the earendil-works organization](https://pi.dev/news/2026/5/7/pi-has-a-new-home) that May. The repository sits at 61.3k GitHub stars as of June 9, 2026. The evidence here is vendor self-description plus two recognized open-source authors' own blogs, with no major-press validation behind it yet.

The bigger entry is **OpenCode** ([opencode.ai](https://opencode.ai)), an MIT-licensed open-source coding agent from Anomaly (the SST team), at roughly 169k GitHub stars on its [repository](https://github.com/anomalyco/opencode) as of June 9, 2026. Its positioning is flexibility and no lock-in (vendor self-description, but a consistent one).

The at-cost [Zen model gateway](https://opencode.ai/docs/zen/) has a stated goal of passing price drops along "by selling at cost," and a [$10/month plan](https://opencode.ai/docs/go/) ($5 the first month) covers open-weight coding models (Qwen, DeepSeek, Kimi, and others). OpenCode also reuses subscriptions you already pay for: under an official GitHub partnership, paid Copilot subscribers authenticate into it with "no additional AI license needed" ([GitHub Changelog, Jan 16, 2026](https://github.blog/changelog/2026-01-16-github-copilot-now-supports-opencode/)).

The community shorthand for why teams pick this path is "it's cheaper". That is not what the on-record sources say, and neither project's official pitch is a price war. There is no independent reporting of a billing-driven enterprise migration wave to open harnesses, so treat any cost framing as unproven. The stated motivation is lock-in and control.

Austin Vance of Focused Labs puts it bluntly: "The agent harness is the new lock-in layer. Better to own it on purpose" ([Focused Labs, Jun 4, 2026](https://focused.io/lab/the-agent-harness-is-the-new-lock-in-layer), a consultancy blog, with the positioning interest that implies). Kai Waehner, Confluent's Global Field CTO, makes the structural version of the argument on his own blog: agentic lock-in "accumulates at multiple layers simultaneously" ([Apr 6, 2026](https://www.kai-waehner.de/blog/2026/04/06/enterprise-agentic-ai-landscape-2026-trust-flexibility-and-vendor-lock-in/), a named-expert blog, not press).

One enterprise deployment at scale is well documented. Cloudflare's internal AI engineering stack uses OpenCode as the primary engineer-facing tool, routed through Cloudflare's own AI Gateway for cost tracking and data-retention policy ([Cloudflare engineering blog, Apr 20, 2026](https://blog.cloudflare.com/internal-ai-engineering-stack/)).

Cloudflare's AI coding tools reached 3,683 internal users between Feb 5 and Apr 15, 2026, and OpenCode carried 27.08 million of their messages. Windsurf, the next tool in the table, carried under half a million. Cloudflare's stated motives are governance, flexibility, and dogfooding its own gateway, with cost as one factor among several, not the headline.

Two cautions before treating the third path as a free lunch. Both are inferences from documented events, not anyone's official warning. First, the BYO-subscription lever belongs to the model vendor, and the vendor can revoke it. Over early 2026 Anthropic moved in stages to block Claude Pro/Max subscriptions from third-party harnesses, OpenCode included. It clarified the prohibition in its terms in February ([The Register, Feb 20, 2026](https://www.theregister.com/2026/02/20/anthropic_clarifies_ban_third_party_claude_access/)) and enforced the cutoff that April.

Second, owning the harness at enterprise scale carries a mandate-backfire risk. Amazon pushed its engineers to prioritize its in-house Kiro for production code, then reversed course within months, approving Claude Code, with Codex to follow, after internal pushback ([The New Stack, May 5, 2026](https://thenewstack.io/amazon-coding-agents-developers/)). For the full case, see [the Harness Engineering paper](/papers/harness-engineering/).

Owning the harness removes the vendor's opinions from your loop. It does not remove the model vendor from your dependency graph, or organizational physics from your rollout.

Cost pressure makes that discipline more urgent, not less. The pricing turbulence of mid-2026 (metered billing, premium agentic model tiers) tempts leaders toward the build path as an escape from vendor pricing. The instinct deserves the same scrutiny "just use LangChain" once escaped.

Gartner [predicts that more than 40% of agentic AI projects will be canceled by the end of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), citing escalating costs, unclear business value, and inadequate risk controls. That is an analyst forecast, but it is aimed squarely at builds undertaken without a workflow-level case.

Practitioner decision frameworks have converged on the same advice: work the choice per workflow, not as a company-wide posture. Nate B. Jones's [Build-Buy-Hire-Wait matrix](https://natesnewsletter.substack.com/p/build-buy-hire-wait-ai-matrix) is a representative public example. The Amazon arc above is the enterprise-scale version of the lesson. The question is not whether your organization could build a harness, but whether owning one is a decision your workflows justify, made deliberately at the fork.

## Where this article stops and the paper begins

This article has carried exactly one distinction. A harness is a pre-wired agent runtime you adopt. A framework is a kit of parts you assemble. The open harnesses split the difference for teams that need to adopt and own at once. Which one you need is the first question of any agent project, not an implementation detail to defer. The fork is where the article stops.

**["Harness Engineering"](/papers/harness-engineering/)** is where you walk down it. The paper develops the full discipline the term now names: the nine components in engineering depth, the invariants that govern long-running loops, and the operational patterns that production harnesses encode. Once you know which side of the fork you are on, the paper is the map of the territory on the other side.

---

_Companion to: **["Harness Engineering"](/papers/harness-engineering/)**, harness-vs-framework taxonomy section._

_Sources: LangChain (Vivek Trivedy), O'Reilly Radar (Addy Osmani), MindStudio, Arize AI, OpenAI, Latent Space, pi.dev and the blogs of Mario Zechner and Armin Ronacher, OpenCode docs, GitHub Changelog, Cloudflare engineering blog, Focused Labs (consultancy), Kai Waehner (named-expert blog), Gartner (analyst forecast), Nate B. Jones (practitioner newsletter), The Register, and The New Stack. Vendor-reported metrics are labeled as self-report inline; GitHub star counts and pricing are snapshots verified June 9, 2026. Drafted with AI assistance; all sources verified and final judgments are the author's._

_This article is part of an ongoing research project tracking AI tooling and software engineering practices at [daviddaniel.tech/research](https://daviddaniel.tech/research)._
