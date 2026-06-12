---
title: "Harness Engineering: How Claude Code and Codex Became Long-Running Agentic-Engineering Systems"
date: 2026-06-05
author: David Daniel
description: "How Claude Code and Codex became long-running agentic systems: harness anatomy, separation patterns, the memory substrate, and the copilot-to-operator shift."
---

# Harness Engineering: How Claude Code and Codex Became Long-Running Agentic-Engineering Systems

**Published:** June 2026 | **Author:** David Daniel

**Target Audience:** Software architects, platform engineers, and practitioners evaluating or building long-running agentic coding systems

---

## Abstract

Between January and June 2026 the unit of AI engineering shifted. The inline copilot (a model that completes the line you are typing) gave way to the *harness*: a pre-wired while-loop around a tool and skill registry, a permission layer, durable session state, and separation patterns. That apparatus lets a model run sustained, multi-session engineering work without a human in every turn.

This paper surveys the shift under the name the field itself has adopted, "harness engineering," and argues one central claim: during this period the harness, not the underlying model, became the most productive locus of capability gains in agentic software work.

The paper proceeds in six moves. First it locates the discipline's emergence and adopts, with credit, a borrowed nine-component anatomy of a production harness as its organizing frame (MindStudio's codification of a practitioner taxonomy, independently mirrored by Arize). Second it draws the now-hardened line between a *harness* (Claude Code, Codex: pre-wired loops shipped as products) and an *assemblable framework* (LangChain, AutoGen, CrewAI: kits you wire yourself). Third it catalogs three separation patterns that recur in long-running loops (planner/executor, writer/reviewer, and initializer/coder) and keeps them apart, because conflating them produces bad architecture advice.

Fourth it proposes a mapping, the author's synthesis, from the CoALA cognitive-architecture memory taxonomy onto the working artifacts of today's harnesses: the context window, `CLAUDE.md`, `SKILL.md`, and persisted session records. Fifth it surveys the crossover from copilot to autonomous operator of real production systems, across three vendors. Sixth it covers parallel and multi-agent orchestration. The paper stops at the architecture boundary. The cost consequences of the never-stopping loop are the subject of a [companion bridge paper](/papers/agentic-pricing-break/).

A note on evidence runs throughout and is consolidated in a dedicated section: several of the most vivid data points in this space are vendor self-reports or unaudited practitioner estimates. Each is labeled inline rather than treated as established fact.

## Introduction

In early 2026, the most consequential changes in agentic coding tools did not come from new model weights. They came from the apparatus around the model: how the loop is driven, how context is compacted, how progress is persisted across sessions, how permissions gate unattended action, and how one agent checks another's output.

The vendors themselves now describe their work this way. OpenAI published a first-party essay titled ["Harness engineering: leveraging Codex in an agent-first world"](https://openai.com/index/harness-engineering/). Anthropic published engineering guidance on ["effective harnesses for long-running agents"](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents). Independent practitioner outlets began codifying the same vocabulary.

This paper's thesis is that this vocabulary marks a real shift in where capability comes from. If what a system can accomplish unattended depends on its loop engine, its compaction strategy, its permission layer, and its memory substrate, then improving any of those components raises capability *without touching the model*.

The sections that follow support this with cases where the observable jump in what agents could do arrived as a harness change, not a model release. The cases include agents holding operational roles on a production data platform, opening pull requests from a chat mention, and fanning out hundreds of self-checking subagents.

Three scoping notes frame what follows.

**First, on contribution.** This paper's contribution is organizational, not empirical, and it is not the only survey-shaped treatment of its subject. By mid-2026 the academic literature had taken the agent harness up as a research object in its own right. One formal survey, [Agent Harness for Large Language Model Agents: A Survey](https://www.preprints.org/manuscript/202604.0428/v1), proposes a seven-layer architectural taxonomy across 170+ open-source projects. A unified review of memory, skills, and externalization in harness engineering appears at [arXiv:2604.08224](https://arxiv.org/abs/2604.08224), among other preprints. The paper therefore makes no "net-new" claim for the territory.

The borrowed parts are named where they appear. The nine-component anatomy in Section 1 is a practitioner taxonomy: MindStudio's codification of a breakdown it credits to the practitioner channel @engineerprompt, with Arize independently publishing a near-identical nine-part architecture. The harness/framework distinction in Section 2 is stated directly by Arize and synthesized from O'Reilly Radar and MindStudio. The CoALA memory mapping in Section 4 is the author's synthesis of an academic taxonomy onto vendor artifacts. None of the vendor or practitioner sources cited here draws that mapping itself.

What the paper adds, against both the practitioner write-ups and the academic surveys, is narrower. It is a single evidence-labeled account connecting the named discipline, its anatomy, its separation patterns, its memory substrate, its operator-mode case studies, and the Amazon and Microsoft episodes. The evidence status of each claim is made explicit. The paper does not claim the underlying components are novel, and it flags where its framing goes beyond what any single source states.

**Second, on evidence.** The strongest claims in this space come from the vendors describing their own systems. Some circulate one further step removed, through interviews and practitioner write-ups of vendor accounts. OpenAI's accounts of Codex working on its own data platform are vendor-sourced. The most-quoted formulation about platform-side code-triage agents turns out, on tracing, to describe a *stated plan* relayed through a practitioner interview, not a deployed system. Section 5 handles that distinction.

Uber's test-coverage figures are internal estimates with no external audit. One widely discussed case, Anthropic's leaked "Kairos" agent, is an unconfirmed roadmap leak, not a shipped feature. Section 7 consolidates these labels in one table so the reader can weigh the argument against the quality of its inputs.

**Third, on scope.** Every orchestration choice surveyed here has a price, and that price dominated industry coverage in the same window. The cost story (token economics, pricing-model strain, the loop that never stops) is deliberately excluded. The paper covers the architecture. The [companion bridge paper](/papers/agentic-pricing-break/) covers the cost.

Two companion articles accompany this paper: [Harness vs Framework](/articles/harness-vs-framework/), which expands Section 2 into a standalone decision-framing piece, and Writer/Reviewer Separation, which turns Section 3's invariants into an implementation pattern. <!-- TODO: link Writer/Reviewer Separation (/articles/writer-reviewer-separation/) when that article is published -->

## From Prompt to Context to Harness: A Discipline Gets a Name

The clearest signal that "harness engineering" had crystallized as a discipline is that a frontier lab put its name on it. OpenAI gave the term first-party institutional weight in an essay published February 11, 2026, ["Harness engineering: leveraging Codex in an agent-first world"](https://openai.com/index/harness-engineering/), by OpenAI's Ryan Lopopolo. The essay describes an internal product, built over five months, with "0 lines of manually-written code" (its words) and a repository "on the order of a million lines of code."

On review the essay is more precise than its billing. It states that "Humans may review pull requests, but aren't required to," with "almost all review effort" pushed to agent-to-agent review. In the accompanying [Latent Space interview](https://www.latent.space/p/harness-eng), Lopopolo adds that "most of the human review is post merge at this point," the basis for the episode's "0% human code, 0% human review" billing.

The paper reports that billing without adopting it as fact: the public record supports human review being *optional and largely post-merge*, not absent, and supports no universal zero-pre-merge-review operating model. All of these characterizations are OpenAI's own description of its own process, not independently audited.

What gives the essay its disciplinary weight is its framing: the engineering work has migrated from writing code to building and tuning the loop that writes the code.

The vocabulary did not stay a single vendor's property. By June 2026 it was in use by writers with no stake in Codex. O'Reilly Radar's Addy Osmani, in ["Agent Harness Engineering"](https://www.oreilly.com/radar/agent-harness-engineering/) (May 15, 2026), defines the harness as "every piece of code, configuration, and execution logic that isn't the model itself," crediting the practitioner Viv Trivedy with the term and quoting his one-liner "Agent = Model + Harness". Arize AI publishes ["What is an agent harness?"](https://arize.com/blog/what-is-an-agent-harness/) (April 24, 2026) as a standalone explainer.

On origin, the credit is split between OpenAI's first-party use and Osmani's practitioner attribution, so the paper asserts no single coiner. A quarter of cross-publication usage is evidence of momentum, not a settled field. What matters for the survey is what the shared vocabulary covers. By mid-2026 a frontier lab, an O'Reilly columnist, and an observability vendor had each found the same concept worth explaining on its own terms. The rest of the section maps the apparatus the term names.

The discipline succeeds an earlier two-step that practitioners will recognize. The community first focused on *prompt engineering*: how you phrase a single request. It then moved to *context engineering*: what you put in the window (retrieval, summarization, instruction files). Harness engineering is the third step, and it subsumes the first two: the engineering target is the entire apparatus around the model, of which the prompt and the context are components among nine.

### The nine-component anatomy (a borrowed taxonomy)

That apparatus has converged on a recognizable anatomy. The taxonomy below is not the paper's own. It comes from MindStudio's ["The 9 Components Every Production Agent Harness Needs"](https://www.mindstudio.ai/blog/9-components-production-agent-harness) (May 1, 2026), which itself opens by crediting "@engineerprompt's breakdown of agent harness architecture". What is borrowed, then, is a practitioner taxonomy as codified by MindStudio. The convergence is real rather than single-sourced: Arize's explainer independently enumerates a near-identical nine-part "harness 1.0 architecture" (iteration loop, context management, skills/tools, subagents, built-in skills, session persistence, system prompt assembly, lifecycle hooks, permissions).

The taxonomy earns its place as a shared map of what ships inside Claude Code, Codex, and their peers. The component list is borrowed. The gloss after each item is the author's analysis of why the component matters for long-running operation specifically.

1. **Loop engine.** The while-loop that drives think/act/observe cycles until a stop condition. This is what converts a model into an agent: everything else in the list exists to keep the loop running longer, safer, or in parallel.
2. **Context management and compaction.** Summarizing or pruning history so long sessions fit the window. For multi-hour runs this is a survival mechanism: without it the loop degrades as it accumulates its own history.
3. **Skills and tools registry.** The catalog of callable capabilities the model selects from. The registry is also the harness's extension point: capability arrives by registering a tool, with no change to the loop or the model.
4. **Sub-agent management.** Spawning and coordinating child agents, the base that Section 6's orchestration patterns are built on.
5. **Built-in skills.** First-party capabilities shipped with the harness, which set the floor of what the agent can do before any configuration.
6. **Session persistence.** Durable state that survives across turns and restarts. It makes "multi-session" a meaningful word, and it is where Section 4's memory substrate lives.
7. **Dynamic system-prompt assembly.** Composing the instruction set per turn from current state rather than from a static prompt. The system prompt becomes a build artifact.
8. **Lifecycle hooks.** Interception points before and after tool calls and turns: the seam where teams attach policy, logging, and custom gating without forking the harness.
9. **Permissions and safety.** The gate that decides what the agent may do unattended. For long-running operation this component carries the most weight: the longer the loop runs without a human, the more the permission layer *is* the supervision.

A note on provenance: the nine-component model and the prompt-to-context-to-harness narrative were popularized in practitioner video tutorials, and MindStudio names the source it codifies as @engineerprompt. Because video is a poor citation target, the citations here go to the public write-ups that codify the identical material rather than the videos themselves. MindStudio and Arize carry the anatomy, and O'Reilly Radar carries the discipline framing.

The thesis of the section, and of the paper, follows directly from the anatomy. If capability depends on the loop engine, the compaction strategy, the permission layer, and the memory substrate, then improving any of those nine components raises what the system can do without touching the model weights. The harness is the lever. The rest of the paper is an inventory of where that lever has visibly been pulled.

### Revealed preference: two natural experiments

The thesis makes a testable prediction. If the harness, not the model, is where capability lives, then organizations choosing between agentic tools that run *the same frontier models* should treat the choice as consequential. The contest should be over the apparatus, not the weights.

Between late 2025 and May 2026, two of the industry's largest engineering organizations ran roughly this experiment on themselves, in public view. Neither produced a benchmark. What both produced is a record of choices: large populations of working engineers picking between harnesses while the model layer was held constant or remained available either way.

The first case is Amazon. Its in-house agentic IDE, Kiro, [launched in preview on July 14, 2025](https://venturebeat.com/programming-development/amazon-launches-kiro-its-own-claude-powered-challenger-to-windsurf-and-codex), built on Code OSS and using Anthropic's Claude Sonnet 3.7 and 4.0 as its default model backends from day one. At [general availability on November 17, 2025](https://kiro.dev/blog/general-availability/), the Kiro CLI ran Claude Sonnet 4.5 and Haiku 4.5. That same month, an internal memo [reported by Reuters](https://www.reuters.com/business/retail-consumer/amazon-pushes-in-house-ai-coding-tool-kiro-over-competitors-memo-shows-2025-11-25/) pushed Kiro over outside alternatives: "While we continue to support existing tools in use today, we do not plan to support additional third party, AI development tools" (quote corroborated by [Futurism](https://futurism.com/artificial-intelligence/amazon-kiro-coding)).

The engineers pushed back. In February 2026, roughly 1,500 employees endorsed a formal request to adopt Claude Code in a single internal forum thread, per Business Insider, as summarized by [Slashdot](https://developers.slashdot.org/story/26/02/12/1530202/amazon-engineers-want-claude-code-but-the-company-keeps-pushing-its-own-tool) and [Inc.](https://www.inc.com/ava-levinson/amazon-anthropic-no-claude/91301306). Amazon responded that there was no explicit ban on Claude Code, only stricter requirements for production use. It also said roughly 70% of its software engineers had used Kiro at least once in January (a vendor-reported figure).

By [May 2026, Amazon reversed](https://thenewstack.io/amazon-coding-agents-developers/): it opened Claude Code access to its developers (with Codex to follow), approved it for production use, and ran both on AWS via Bedrock, per VP of Software Builder Experience Jim Haughwout.

What makes the Amazon case unusually clean is that Kiro ran frontier Claude models from its first day (this reading is the author's, not any cited source's). When Amazon's engineers lobbied for Claude Code, they were not asking for a better model. They already had it. They were choosing between harnesses with the model held constant, the closest thing to a controlled comparison the industry has produced. The usage figures are vendor-reported, and the engineers' preference comes from press accounts of internal forums, not from any benchmark.

The second case is Microsoft, which ran the comparison deliberately. In December 2025 and January 2026, Microsoft [encouraged thousands of employees](https://www.theverge.com/tech/865689/microsoft-claude-code-anthropic-partnership-notepad) in its CoreAI and Experiences + Devices organizations to install Claude Code. Engineers were expected to use both Claude Code and GitHub Copilot and give comparative feedback.

On May 14, 2026, [The Verge reported](https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad) that Microsoft had begun canceling Claude Code licenses in the Experiences + Devices division (Windows, M365, Teams, Surface). Engineers were told to transition to GitHub Copilot CLI by the end of June, the close of Microsoft's fiscal year.

The decision is division-scoped, not company-wide. The Verge's Tom Warren wrote that Claude Code had "undermined Microsoft's new GitHub Copilot CLI coding tool" and that staffers "seemingly preferred" Claude Code for feature reasons ([Windows Central's account](https://www.windowscentral.com/microsoft/microsoft-cancels-claude-code-licenses-shifting-developers-to-github-copilot-cli-a-move-likely-driven-by-financial-motives) carries both lines). That is *reported* preference, not a benchmark, and the paper asserts no claim of either tool's superiority as fact.

Microsoft has not said cost drove the decision. [Fortune's reporting](https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/) places it within a broader fiscal-year reckoning over agentic token costs, as *a* factor. Nor is this a Microsoft–Anthropic rupture: Fortune notes the Foundry arrangement (up to $5B of Microsoft investment, against Anthropic's $30B Azure commitment) is unaffected, and Claude models remain available inside Copilot products.

The on-record rationale, from EVP Rajesh Jha to The Verge: "When we began offering both Copilot CLI and Claude Code, our goal was to learn quickly, benchmark the tools in real engineering workflows, and understand what best supported our teams. Claude Code was an important part of that learning… at the same time, Copilot CLI has given us something especially important: a product we can help shape directly with GitHub for Microsoft's repos, workflows, security expectations, and engineering needs."

The two cases show the same preference from opposite directions (this synthesis is the paper's, not any source's). In both companies, the model layer was either identical across the contested tools (Amazon) or remained licensed and available regardless of the outcome (Microsoft). The variable being lobbied for, memo-restricted, license-canceled, and finally reversed on was the harness. Amazon's resolution was to adopt the competing harness while keeping the models on its own cloud. Microsoft's resolution was to consolidate on the harness it can shape.

Jha's stated reason, a product "we can help shape directly" for Microsoft's "repos, workflows, security expectations, and engineering needs," is a harness-engineering rationale in nearly so many words. The value worth owning is not the weights, which both companies rent without controversy, but the loop, the permission layer, and the integration surface around them.

Neither episode measures capability. Both record what thousands of engineers, and the organizations managing them, behaved as if they believed about where capability lives. The episodes are corroborative, not load-bearing: the thesis is argued from the architecture surveyed in Sections 2 through 6 and would stand without either case. They corroborate where the industry located the contest. They do not prove that the harness explains capability.

## Harness versus Framework: Pre-Wired Loops and Assemblable Kits

The discipline's sharpest distinction is between a harness and a framework, and getting it right is the orientation an engineer needs before any deeper architectural choice. The distinction has three citable anchors, kept separate here. [MindStudio](https://www.mindstudio.ai/blog/9-components-production-agent-harness) supplies the structural one-liner: every production coding harness (Claude Code, Codex, Cursor) "is, at its core, a while-loop with a tool registry and a permission layer." [Osmani](https://www.oreilly.com/radar/agent-harness-engineering/), quoting Viv Trivedy's "Agent = Model + Harness," defines the harness as everything around the model.

[Arize](https://arize.com/blog/what-is-an-agent-harness/) states the boundary most bluntly, naming names: "LangChain is not a harness. LangGraph is not a harness" (those are "frameworks designed for humans to build agents"), whereas "a harness works out of the box," with "no assembly step."

Composed into one definition: a **harness** is a pre-wired agentic loop (the while-loop, the tool registry, the permission layer, all assembled and opinionated) shipped as a product you point at a task. Claude Code and Codex are the canonical examples, and Arize groups Cursor and Windsurf with them. A **framework** (LangChain, AutoGen, CrewAI) is an assemblable kit: it hands you the components and you wire the loop, the tool dispatch, and the permission checks yourself.

The distinction matters because the two artifacts answer different questions. A framework answers "what parts do I build my agent from?" A harness answers "what runs my task?" For most of 2023–2025, teams asking the second question were handed the first answer ("just use LangChain"). That answer carried an unpriced obligation: building the loop yourself means re-solving turn management, compaction, retry semantics, and permission gating, the same problem domain the harness vendors now solve with opinionated defaults.

The nine-component anatomy makes the size of that obligation plain. A team that wires its own loop is signing up to build or approximate all nine components. A team that adopts a harness inherits them and spends its effort on the parts that are genuinely specific to its task: skills, instruction files, permission policy.

This is not a claim that frameworks are obsolete. Frameworks remain the right substrate when the loop itself is the product: a custom orchestration topology, a bespoke permission model, or an agent embedded inside a larger application rather than a standalone worker. (Uber's AutoCover, surveyed in Section 6, is a LangGraph-based system: a framework, deliberately chosen, at enterprise scale.)

The claim is narrower: the *default* moved. Where "agent" once implied "assemble one," by mid-2026 it implies "configure one," and the burden of proof shifted to the team that wants to build the loop from parts.

The companion article [Harness vs Framework](/articles/harness-vs-framework/) develops this distinction into a practitioner decision framing; here it serves as the boundary of the survey. Everything that follows is about what happens inside the pre-wired loop.

## The Long-Running Loop: Three Separation Patterns, Kept Distinct

Once the loop runs for hours instead of turns, a family of separation patterns recurs across independent shops. The literature and the discourse frequently blur them into one another, and the blur produces bad advice: a team that thinks Anthropic's quickstart demonstrates writer/reviewer separation will build the wrong thing. So the section's contribution is partly negative. There are *three* patterns here, from three sources, and they are not interchangeable.

### Planner/executor separation: the PIV loop

Cole Medin's Plan-Implement-Validate (PIV) loop, documented in his [ai-transformation-workshop](https://github.com/coleam00/ai-transformation-workshop) repository, separates planning from implementation *in time and in context*. The context window is deliberately reset between the Plan and Implement phases, so implementation starts fresh with only the plan as input. The design rationale is context hygiene: a single continuous context that both designs and builds accumulates bias and bloat. The plan document becomes the clean interface between the two phases. A standalone [explainer](https://www.mindstudio.ai/blog/agentic-coding-workflow-piv-loop-explained) walks through the cadence.

This is a practitioner methodology with a public workshop repository behind it, not an audited or benchmarked result. Its significance here is that it makes the plan a *durable artifact* rather than a transient thought, a theme all three patterns share.

### Writer/reviewer separation: the OpenAI pattern, stated at the strength of its source

The second pattern separates the agent that writes code from an agent that reviews it. The cleanest open evidence is first-party. OpenAI's [harness-engineering essay](https://openai.com/index/harness-engineering/) describes the team's PR workflow as instructing Codex to "review its own changes locally, request additional specific agent reviews both locally and in the cloud," and "iterate in a loop until all agent reviewers are satisfied". The essay notes explicitly that "humans may review pull requests, but aren't required to."

In the accompanying [Latent Space interview](https://www.latent.space/p/harness-eng), Lopopolo describes the roles as genuinely distinct and occasionally adversarial. Review agents fire when a PR synchronizes. The authoring agent initially "was willing to be bullied by the PR reviewer," and both sides' prompts had to be tuned so the loop converged. Press corroboration exists at company scale: per information OpenAI shared with [VentureBeat](https://venturebeat.com/orchestration/openais-ai-data-agent-built-by-two-engineers-now-serves-4-000-employees-and), Codex is used by 95% of OpenAI's engineers and "reviews all pull requests before they're merged" (a vendor-supplied review-coverage figure, not a claim about merge-gating enforcement).

Two formulations circulated more widely than these sources support, and both need flags. First, a vivid line about platform-side agents that "triage incoming code, validate it before it runs" has been attributed to OpenAI's data-agent post. It does not appear there. Its actual source is a [ByteByteGo interview](https://blog.bytebytego.com/p/how-openai-built-its-data-agent) with OpenAI's Emma Tang (June 3, 2026), and in context it describes a *plan* ("the next problem the data platform team plans to work on"), not a deployed system. Section 5 treats it as a direction signal, not as evidence of an operating reviewer gate.

Second, a rationale that the agent writing code should not also be trusted to police all of a platform's invariants traces to paywalled press. It could not be confirmed on any openly readable page, and it is not relied on here. The pattern's documentation rests on the first-party essay above. At that strength the architectural point stands: review is a separate agent role from generation, enforced within the team's own PR loop.

Each OpenAI claim stands on its own citation, and none is offered as evidence for another. The writer/reviewer pattern's evidence is the pull-request review gate in the first-party essay, and only that. The unattended release agent is a distinct, interview-relayed claim (Section 5, layer two). The platform-side triage agents are a distinct stated plan (Section 5, layer three). The invariant-policing rationale is relied on nowhere.

The first-party essay describes review enforcement within its team's own repository workflow. No source here supports a company-wide writer/reviewer *enforcement model*. The closest company-scale statement is the figure OpenAI supplied to VentureBeat (that Codex "reviews all pull requests before they're merged"). That is a press-relayed claim about how widely Codex review is used, not evidence that agent review gates merges across OpenAI.

### Initializer/coder: Anthropic's quickstart, which is neither of the above

It is tempting to file Anthropic's autonomous-coding quickstart under writer/reviewer, and some commentary has done so. That is a conflation; the quickstart's own README contradicts it. The [autonomous-coding quickstart](https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding) ships an **initializer + coding-agent** design. An initializer agent reads the input spec (`app_spec.txt`) and produces `feature_list.json`: over 200 spec-derived feature checks, per Anthropic's engineering note, each initially marked failing. A coding agent then works through the list across multiple sessions, resuming from git commits when each fresh-context session begins.

The critical structural fact: the *same* coding agent tests its own work against the feature list. There is no separate reviewer. The separation here is between *setup* and *execution*. The initializer runs once to externalize the goal state. The coder runs repeatedly against that externalized state. Anthropic's engineering note ["Effective harnesses for long-running agents"](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) provides the background framing: long-running work is a sequence of discrete sessions, each beginning without memory of the last, bridged by artifacts.

### The shared lesson: durable progress as the precondition for multi-session work

Three patterns, three sources, three different cuts: plan vs. implementation, writer vs. reviewer, initializer vs. coder. What they share is more instructive than what separates them. Each one externalizes state into a durable artifact that survives a context reset. Medin's plan document, OpenAI's reviewer agents working the durable PR stream, Anthropic's `feature_list.json` and git history: in every case, the loop is given a place to stand when its context is cleared. This is the architectural precondition for multi-session autonomy: not a bigger window, but a substrate outside the window.

Section 4 gives that substrate a theory. The companion article Writer/Reviewer Separation develops the second pattern (and its distinctness from the third) into an implementation guide. <!-- TODO: link Writer/Reviewer Separation (/articles/writer-reviewer-separation/) when that article is published -->

## The Memory Substrate: Mapping CoALA onto the Harness's Files

A long-running loop needs memory that outlives the context window, and by mid-2026 every serious harness had accumulated a pile of files that serve that need: instruction files, skill folders, progress logs, commit histories. The pile looks ad hoc. This section argues it is not: that it instantiates, file by file, a memory taxonomy the academic literature defined before the harnesses existed.

The taxonomy comes from the CoALA framework, ["Cognitive Architectures for Language Agents"](https://arxiv.org/abs/2309.02427) (Sumers, Yao, Narasimhan, and Griffiths, Princeton; arXiv:2309.02427). Section 4.1 of that paper defines a four-part memory model for language agents: **working memory** plus three long-term stores, **episodic** memory (past experiences), **semantic** memory (facts about the world), and **procedural** memory (how to do things).

The mapping that follows is the author's synthesis. Neither CoALA nor any vendor source cited here draws it: CoALA predates the artifacts, and the vendors do not cite CoALA. It is proposed because the fit is close:

- **Working memory** is the live context window: the loop's transient state, managed by the harness's compaction component (anatomy item 2).
- **Semantic memory** is the project's `CLAUDE.md` and its equivalents (`AGENTS.md` and kin): durable facts about the codebase (conventions, architecture, constraints) that the agent should always know, loaded at session start rather than rediscovered.
- **Procedural memory** is the `SKILL.md` format: packaged, reusable how-to procedures. Anthropic's ["Agent Skills"](https://claude.com/blog/skills) post describes skills as packaged instructions an agent loads when relevant, in a format Anthropic positions as an open standard. An open format is what would let procedural memory travel across harnesses rather than stay locked to one vendor.
- **Episodic memory** is the persisted session record: the commits, progress logs, and artifacts like the quickstart's `feature_list.json` that let an agent recall what it already tried. Section 3's durable-progress lesson is, in CoALA's terms, an episodic-memory requirement.

The mapping earns its place by what it lets you do. First, it converts a pile of dotfiles into a principled substrate. Each file type has a memory role, and the roles are exhaustive, so a harness's memory design can be *assessed* by asking whether all four types are served, and where. A harness with rich semantic memory but no episodic store will re-attempt failed approaches. One with procedural memory but weak semantic memory will execute skills fluently against a codebase it misunderstands.

Second, the mapping explains why the three separation patterns of Section 3 work: each one is a discipline for writing to long-term memory before working memory is destroyed. Third, it connects a 2026 engineering practice to a research lineage, which matters for where the practice goes next. The open questions in harness memory (consolidation, forgetting, retrieval policy) are questions the cognitive-architecture literature has vocabulary for.

The claim here is bounded in two directions. The paper does not claim harness designers read CoALA, or that the correspondence is intentional. It claims no priority over the academic literature either: by 2026, preprints were reviewing memory and skill externalization in harness engineering as a general topic (e.g., the unified review at [arXiv:2604.08224](https://arxiv.org/abs/2604.08224)). The author has not exhaustively checked that no such work draws this specific file-level correspondence.

The claim is narrower: the mapping is real, useful, and not drawn in any of the vendor or practitioner sources cited here. It is the author's synthesis.

## Copilot to Autonomous Operator: Agents Running Production Systems

The discipline's most consequential development is that harnessed agents crossed from *suggesting* code to *operating* systems. This section surveys three cases at three evidence levels: a vendor-documented production deployment, a shipped and publicly verifiable product feature, and an unconfirmed leak. It closes with a coda on how the model layer itself is converging on the same long-running shape.

### OpenAI's data platform: the vendor-documented case, with its layers kept apart

The most consequential documented case is OpenAI's own data platform. Its evidence comes in three layers of decreasing directness, kept apart below.

**Layer one: the official post.** OpenAI's ["Inside our in-house data agent"](https://openai.com/index/inside-our-in-house-data-agent/) (January 29, 2026, by Bonnie Xu, Aravind Suresh, and Emma Tang) describes an internal data agent powered by GPT-5.2 with Codex-derived table knowledge. The agent operates over a platform of more than 600 petabytes and 70,000 datasets serving over 3,500 internal users, and it can talk to platform systems including Airflow and Spark.

That is what the official page supports: an *analysis* agent with live operational access, not an agent operating the platform's infrastructure. The post does not mention Kafka or Flink.

**Layer two: interview-relayed operational cases.** The infrastructure detail and the stronger operator claims come from practitioner interviews with the team, chiefly [ByteByteGo's writeup](https://blog.bytebytego.com/p/how-openai-built-its-data-agent) (June 3, 2026) based on an interview with Emma Tang, OpenAI's head of data platform engineering (VentureBeat styles her role as head of data infrastructure).

Per that interview, the platform "runs on more than a dozen open-source tools, including Spark, Kafka, and Flink". A Codex-powered release agent has validated, diagnosed, and rolled open-source patches "all the way to production" and has "been running end to end for three to four months without human involvement and without a single incident". And Codex generated most of the code changes for a 90,000-table cross-cloud migration completed in roughly two months.

These are vendor claims relayed through a practitioner outlet: not audited, and one step further from the source than an official post. Even so, the release-agent case is the most operator-shaped claim in the section. Openable press corroboration of the data agent's reach exists in [VentureBeat's interview report](https://venturebeat.com/orchestration/openais-ai-data-agent-built-by-two-engineers-now-serves-4-000-employees-and) (built by two engineers; Tang: of roughly 5,000 employees, "over 4,000 use data tools that our team provides"), which likewise derives from OpenAI's own account.

**Layer three: the stated plan.** The widely quoted line about platform-side agents that "triage incoming code, validate it before it runs, and absorb the deluge from AI-amplified users" is from the same ByteByteGo interview. In context it is explicitly *future work*: "the next problem the data platform team plans to work on." It is a direction signal, not a deployed system, and no architecture conclusion here depends on it existing.

The whole case is vendor-sourced, with the strongest operational claims carried by interview rather than by the official post. Even at that strength, the architectural fact is significant: a frontier lab states that agents built on its harness hold operational roles on the platform that carries its production data. Analysis with live platform access is on the official record. Unattended release management is on the interview record.

The scale of the underlying usage is also reported, and the two figures have different owners. The **~1 billion tokens per day** figure is Lopopolo's own characterization of his team's Codex usage, via the [Latent Space episode](https://www.latent.space/p/harness-eng): vendor self-report, unaudited. The **roughly $2,000–3,000 per day** figure is *not* OpenAI's: it is Latent Space's editorial estimate of what that token volume costs, "based on market rates and caching assumptions." Neither figure appears in OpenAI's essay itself, and the pairing supersedes a lower figure (~$1,000/day) that circulated in some retellings.

### Cursor 1.1: the shipped, verifiable case (and why this is a field, not a duopoly)

The second case is shipped, publicly documented, and reproducible by any reader with a Slack workspace, which makes it the strongest-verified item in the section. Cursor's 1.1 release added **background agents triggered from Slack** ([Cursor 1.1 changelog](https://cursor.com/changelog/1-1); [Slack Marketplace listing](https://slack.com/marketplace/A08SKDT6QUW-cursor)). Mention `@Cursor` in a channel and the agent launches in an isolated cloud VM, reads the thread's context, writes code, and opens a GitHub pull request. The developer's machine does not need to stay active.

The structural shift is identical to the Codex case: the unit of work is no longer a keystroke completion but an autonomous, session-spanning run that terminates in a reviewable artifact.

The Cursor case also carries a framing point the paper depends on. The copilot-to-operator shift is not confined to Claude Code and Codex. A third vendor shipped into the same long-running-agent territory, which is why harness engineering is treated here as a field-wide convergence rather than a two-vendor story. Claude Code and Codex headline the title because they carry the strongest-evidenced operator cases, not because the discipline is theirs alone. Those cases are Codex's operational roles on OpenAI's production data platform and Claude Code's parallel self-checking workflows in Section 6.

### Kairos: the unconfirmed case, handled as such

A widely discussed third case is not a case at all in the evidentiary sense: it is a leak. On March 31–April 1, 2026, a packaging error in Claude Code's npm distribution shipped a source map that exposed internal source code. [InfoQ](https://www.infoq.com/news/2026/04/claude-code-source-leak/) confirms the leak mechanism, and [VentureBeat's leak coverage](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know) carries Anthropic's confirmation that the release "included some internal source code" via packaging error. Among the exposed material, per [The Week](https://www.theweek.in/news/sci-tech/2026/04/01/always-on-agent-and-ai-pet-buddy-anthropics-claude-source-code-leak-reveals-hidden-features.html), was an always-on background agent codenamed "Kairos," designed to observe, consolidate memory, and act proactively.

The status update matters as much as the leak. The leaked code reportedly referenced a May 2026 launch. As of this writing in June 2026, Anthropic has neither confirmed nor shipped Kairos and has announced no timeline. Third-party trackers [report it as unannounced](https://kingy.ai/ai/kairos-everything-we-know-about-anthropics-secret-always-on-ai-daemon/), and the predicted launch window passed without an announcement. (The tracker is weighted only for absence of announcement, which is independently checkable. The leak facts rest on InfoQ, VentureBeat, and The Week.)

Kairos is therefore exactly what the evidence supports: an unconfirmed, unshipped roadmap leak. It cannot be cited as a feature that exists, and any architecture argument that depends on it existing is unsound.

It still belongs in the survey as a *signal of direction*, consistent with everything else in the section. An always-on, memory-consolidating, proactive operator is the natural extrapolation of the trajectory the two verified cases are on. That the leak's contents struck observers as plausible rather than fantastical says something about where the field believes it is headed.

### A coda: the model layer converges on the same shape

The newest evidence in the survey is not a harness release but two model releases, and they belong here as a boundary marker for the thesis. OpenAI's GPT-5.5, [announced April 23, 2026](https://openai.com/index/introducing-gpt-5-5/), is positioned for exactly the work surveyed here: multi-step, tool-using tasks an agent plans, executes, and checks with minimal supervision. The launch coverage echoed that positioning ([TechCrunch, April 23, 2026](https://techcrunch.com/2026/04/23/openai-chatgpt-gpt-5-5-ai-model-superapp/)).

Anthropic's Claude Fable 5, [announced June 9, 2026](https://www.anthropic.com/news/claude-fable-5-mythos-5) as a "Mythos-class" model, carries launch evidence that is operator-shaped. Anthropic reports that in "a 50-million-line Ruby codebase, the model performed a codebase-wide migration in a day that would otherwise have taken a whole team over two months by hand." Both characterizations are the vendors' own announcements (vendor self-report, unaudited).

These releases do not weaken the paper's thesis. They bound it in time. The capability jumps surveyed above were delivered as harness changes against a stable model layer.

The spring 2026 flagships show the model layer responding to the workload the harness created: both frontier vendors now shape their headline models around the sustained, multi-session loop rather than the single completion. The harness made long-running work the unit of engineering, and the models are being rebuilt for that unit. The pricing consequences of that convergence (Fable 5 listed at twice the per-token rate of Anthropic's Opus tier, and moved to metered access at launch) are excluded and taken up by the [companion bridge paper](/papers/agentic-pricing-break/).

## Parallel and Multi-Agent Orchestration: The Loop That Writes Loops

The final dimension of the survey is breadth: running many agents at once, under a harness that coordinates them. This is anatomy item 4, sub-agent management, promoted from component to headline capability.

The dated proof point is Claude Code's **dynamic workflows**, announced May 28, 2026, initially as a research preview. In Anthropic's [description](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code), Claude dynamically writes orchestration scripts that run "tens to hundreds of parallel subagents in a single session, checking its work before anything reaches you." The status has since strengthened rather than slipped: as of June 2026 the announcement page carries an update note stating that dynamic workflows are now generally available.

Two details in the quoted sentence matter. The orchestration script is *written by the agent*: the harness's loop engine is generating further loop topology at runtime, a qualitative step beyond a fixed fan-out primitive. And the clause "checking its work before anything reaches you" is the self-checking gate of Section 3's separation patterns, now applied at fan-out scale.

A practitioner-scale data point comes from Uber. AutoCover, a LangGraph-based test-generation agent, is described in the [ZenML LLMOps writeup](https://www.zenml.io/llmops-database/building-ai-developer-tools-using-langgraph-for-large-scale-software-development) of Uber's GitHub Universe / LangChain talk. Uber reports roughly 21,000 developer-hours saved via an approximately 10% coverage lift across roughly 5,000 engineers, with runs spinning up as many as 100 parallel test iterations per large file. It also claims 2–3x better coverage in half the time versus other agentic test tools. Every figure here is an unaudited Uber estimate from a talk writeup, and the 2–3x comparison has no named benchmark or baseline.

The case is cited not for its numbers but for its shape. An enterprise found parallel fan-out valuable enough to wire 100-way parallelism around a single file's test generation, and did so on a framework (LangGraph) rather than a harness. The orchestration pattern is bigger than the harness products that popularized it.

Around the fan-out core, a supporting toolkit recurs in practice (practitioner convention, with no single citable source). Parallel runs are isolated so agents do not trample shared state; git worktrees are the common mechanism in coding workloads. Model effort is tiered, with cheaper models doing breadth work and stronger models holding the review gate. And runs get observability, because a hundred parallel loops without traces cannot be audited. Each element of that toolkit is, once again, a harness-layer improvement.

The orchestration story closes the paper's architectural arc. The harness began, in Section 1's anatomy, as a single while-loop with eight components attached. By mid-2026 it is a loop that writes other loops, gates their output through separated reviewer roles, persists their progress in a CoALA-shaped substrate, and runs them by the hundred. None of that required a change to the model weights. That is the thesis, restated as a trajectory.

## Evidence Status: What This Survey Rests On

The argument above mixes evidence of very different grades. The table consolidates the labels applied inline.

| Claim | Source | Source type | Status label |
|---|---|---|---|
| "Harness engineering" given first-party weight by OpenAI essay (Feb 11, 2026); >1M-LOC internal product, "0 lines of manually-written code"; humans may review PRs but aren't required to, review pushed agent-to-agent | [OpenAI](https://openai.com/index/harness-engineering/), [Latent Space](https://www.latent.space/p/harness-eng) | Official announcement + interview | Vendor self-report; process characterizations are OpenAI's own; "0% human code, 0% human review" is the podcast's billing, reported but not adopted as fact. Coinage contested: Osmani credits practitioner Viv Trivedy with the term |
| Internal Codex usage ~1B tokens/day (Lopopolo self-report); ~$2–3k/day cost (Latent Space's market-rate estimate, not an OpenAI figure) | [Latent Space](https://www.latent.space/p/harness-eng) | Interview + outlet estimate | Token figure self-reported, unaudited; dollar figure third-party estimate; supersedes lower (~$1k/day) retellings |
| Nine-component harness anatomy | [MindStudio](https://www.mindstudio.ai/blog/9-components-production-agent-harness) (crediting @engineerprompt), [Arize](https://arize.com/blog/what-is-an-agent-harness/) | Practitioner | Borrowed taxonomy, adopted with attribution; independently mirrored by Arize's nine-part "harness 1.0 architecture" |
| Harness = "a while-loop with a tool registry and a permission layer" (MindStudio, verbatim); harness/framework distinction stated directly by Arize; "Agent = Model + Harness" (Trivedy, via Osmani) | [MindStudio](https://www.mindstudio.ai/blog/9-components-production-agent-harness), [Arize](https://arize.com/blog/what-is-an-agent-harness/), [O'Reilly Radar](https://www.oreilly.com/radar/agent-harness-engineering/) | Practitioner / reputable press | Quotes verified at source; composition into one definition is this paper's |
| OpenAI data agent (GPT-5.2 + Codex enrichment) over 600PB/70k datasets, 3.5k+ internal users; talks to Airflow and Spark | [OpenAI](https://openai.com/index/inside-our-in-house-data-agent/), [VentureBeat](https://venturebeat.com/orchestration/openais-ai-data-agent-built-by-two-engineers-now-serves-4-000-employees-and) | Official + press | Vendor-sourced; press corroboration derives from vendor account; official post does not mention Kafka/Flink |
| Kafka/Flink/Spark in OpenAI's data platform; Codex release agent unattended 3–4 months; 90k-table cross-cloud migration in ~2 months | [ByteByteGo](https://blog.bytebytego.com/p/how-openai-built-its-data-agent) (Emma Tang interview) | Practitioner interview | Vendor claims relayed via interview; unaudited |
| Platform-side agents to "triage incoming code, validate it before it runs" | [ByteByteGo](https://blog.bytebytego.com/p/how-openai-built-its-data-agent) | Practitioner interview | Stated plan ("plans to work on"), not a deployed system; previously misattributed to OpenAI's official post |
| Writer/reviewer separation at OpenAI: the team's PR loop iterates "in a loop until all agent reviewers are satisfied"; Codex "reviews all pull requests before they're merged" | [OpenAI essay](https://openai.com/index/harness-engineering/), [Latent Space](https://www.latent.space/p/harness-eng), [VentureBeat](https://venturebeat.com/orchestration/openais-ai-data-agent-built-by-two-engineers-now-serves-4-000-employees-and) | Official + interview + press | First-party quotes verified; the essay documents the team's own workflow, not a company-wide merge gate; the "reviews all pull requests" figure is OpenAI-supplied via press and speaks to review coverage, not gating enforcement. The "police platform invariants" rationale remains unverified paywalled press and is not relied on |
| PIV loop resets context between Plan and Implement | [Medin workshop repo](https://github.com/coleam00/ai-transformation-workshop), [explainer](https://www.mindstudio.ai/blog/agentic-coding-workflow-piv-loop-explained) | Practitioner | Methodology, not an audited result |
| Anthropic quickstart: initializer + coder, `feature_list.json` (over 200 spec-derived feature checks), git-persisted sessions | [Quickstart repo](https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding), [engineering note](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | Official docs | Verified; distinct from writer/reviewer |
| CoALA four-type memory taxonomy (Section 4.1) | [arXiv:2309.02427](https://arxiv.org/abs/2309.02427) | Peer-reviewed | Verified; mapping to CLAUDE.md/SKILL.md is this paper's synthesis |
| Cursor 1.1: Slack-triggered background agents → isolated VM → GitHub PR | [Changelog](https://cursor.com/changelog/1-1), [Slack Marketplace](https://slack.com/marketplace/A08SKDT6QUW-cursor) | Official docs | Shipped and publicly verifiable |
| Kairos always-on agent | [The Week](https://www.theweek.in/news/sci-tech/2026/04/01/always-on-agent-and-ai-pet-buddy-anthropics-claude-source-code-leak-reveals-hidden-features.html), [InfoQ](https://www.infoq.com/news/2026/04/claude-code-source-leak/), [VentureBeat](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know) | Press (leak coverage) | Unconfirmed, unshipped roadmap leak; no announced timeline as of June 2026 |
| Claude Code dynamic workflows: "tens to hundreds of parallel subagents in a single session, checking its work before anything reaches you" | [Anthropic](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code) | Official announcement | Announced May 28, 2026 as research preview; page updated to generally available as of June 2026; quote verified verbatim |
| Uber AutoCover: ~21k dev-hours, ~10% coverage lift, ~5k engineers, 100-way parallelism, 2–3x comparator | [ZenML writeup](https://www.zenml.io/llmops-database/building-ai-developer-tools-using-langgraph-for-large-scale-software-development) | Practitioner | Unaudited internal estimates; comparator unbenchmarked |
| GPT-5.5 (Apr 23, 2026) and Claude Fable 5 (Jun 9, 2026) positioned for long-horizon autonomous work; Fable 5 codebase-wide migration of a 50M-line Ruby codebase in a day | [OpenAI](https://openai.com/index/introducing-gpt-5-5/), [Anthropic](https://www.anthropic.com/news/claude-fable-5-mythos-5), [TechCrunch](https://techcrunch.com/2026/04/23/openai-chatgpt-gpt-5-5-ai-model-superapp/) | Official announcements + press | Vendor positioning and self-reported demo figures, unaudited; carried as boundary evidence, not load-bearing for the thesis |
| Kiro: Claude Sonnet 3.7/4.0 default backends at July 2025 preview; Sonnet 4.5/Haiku 4.5 in Kiro CLI at Nov 17, 2025 GA | [VentureBeat](https://venturebeat.com/programming-development/amazon-launches-kiro-its-own-claude-powered-challenger-to-windsurf-and-codex), [Kiro blog](https://kiro.dev/blog/general-availability/) | Press + official | Verified product facts |
| Amazon memo restricting additional third-party AI dev tools (Nov 2025); ~1,500-employee Claude Code endorsement and ~70% Kiro usage (Feb 2026) | [Reuters](https://www.reuters.com/business/retail-consumer/amazon-pushes-in-house-ai-coding-tool-kiro-over-competitors-memo-shows-2025-11-25/); Business Insider via [Slashdot](https://developers.slashdot.org/story/26/02/12/1530202/amazon-engineers-want-claude-code-but-the-company-keeps-pushing-its-own-tool) / [Inc.](https://www.inc.com/ava-levinson/amazon-anthropic-no-claude/91301306) | Press / press summary of paywalled report | Memo quote press-verified; usage figure vendor-reported; engineer preference reported, not benchmarked |
| Amazon opens Claude Code to developers, production-approved on AWS/Bedrock (May 2026; Codex to follow) | [The New Stack](https://thenewstack.io/amazon-coding-agents-developers/) | Press | Reported; on-record via VP Jim Haughwout |
| Microsoft dual-tool comparative trial (Dec 2025–Jan 2026), then E+D-division Claude Code license cancellations with Copilot CLI transition by end of June 2026 | [The Verge](https://www.theverge.com/tech/865689/microsoft-claude-code-anthropic-partnership-notepad), [The Verge](https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad), [Windows Central](https://www.windowscentral.com/microsoft/microsoft-cancels-claude-code-licenses-shifting-developers-to-github-copilot-cli-a-move-likely-driven-by-financial-motives), [Fortune](https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/) | Press | Division-scoped, not company-wide; engineer preference reported; cost-as-factor is reporting's inference, not Microsoft's statement. Both revealed-preference cases (Amazon and Microsoft) are corroborative behavioral evidence, not load-bearing for the thesis |

Four limitations follow from the table. First, the operator-mode evidence is dominated by vendors describing themselves. The strongest operator claims (the release agent, the migration) arrive through a practitioner interview rather than an official post, one step further from the source. No independent audit of any production-operator deployment surveyed here exists as of June 2026, and the thesis should be read with that asymmetry in mind.

Second, the paper's central claim, that capability gains in this window came from the harness rather than the model, is an argument from architecture and from the timing of harness-delivered capability changes, not from a controlled comparison. No source cited here isolates harness contribution experimentally. Section 1's cases come closest, but they record reported preference under a constant model layer, not measured capability.

Third, the survey is not alone in its territory: 2026 academic preprints survey agent harness engineering formally, and the claim here is to an evidence-labeled practitioner synthesis, not to priority. Fourth, the freshest claims (Kairos's status, dynamic workflows' general availability, and the Claude Fable 5 launch coda) are time-stamped to mid-June 2026 and should be re-verified at publication.

## Conclusion: Where This Paper Stops

This paper has argued that between January and June 2026, agentic software engineering acquired a discipline with a name, an anatomy, and a set of recurring patterns. The discipline's existence is itself the evidence for its thesis. Harness engineering is a coherent field of work because the harness is where the work pays off. The loop engine, the compaction strategy, the separation patterns, the memory substrate, the permission gate, and the orchestration layer are all places where capability was visibly added in this window without a model release.

The survey assembled the discipline's vocabulary (Section 1, on a borrowed practitioner taxonomy), its boundary (Section 2), its invariants (Section 3, kept plural), its theory of memory (Section 4, the author's synthesis), its operator-mode case studies (Section 5, evidence-labeled and source-layered), and its orchestration endgame (Section 6).

Every orchestration choice in that endgame has a price. Hundreds of parallel subagents, always-on ambitions, and loops that never stop consume tokens at rates that strained the pricing models these tools were sold under. That story is real and central, and it is deliberately left out. The argument here is the architecture: what the harness is, why it became the locus of capability, and how its parts fit. The cost consequences of the loop that never stops are the subject of the companion bridge paper.

---

## References

### Vendor and Official Sources

- OpenAI. "Harness engineering: leveraging Codex in an agent-first world." https://openai.com/index/harness-engineering/
- OpenAI. "Inside our in-house data agent." https://openai.com/index/inside-our-in-house-data-agent/
- Anthropic. "Effective harnesses for long-running agents." https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic. claude-quickstarts: autonomous-coding. https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding
- Anthropic. "Agent Skills." https://claude.com/blog/skills
- Anthropic. "Introducing dynamic workflows in Claude Code." https://claude.com/blog/introducing-dynamic-workflows-in-claude-code
- Anthropic. "Claude Fable 5 and Mythos 5." https://www.anthropic.com/news/claude-fable-5-mythos-5
- OpenAI. "Introducing GPT-5.5." https://openai.com/index/introducing-gpt-5-5/
- Cursor (Anysphere). Changelog 1.1: Background Agents in Slack. https://cursor.com/changelog/1-1
- Cursor (Anysphere). Slack Marketplace listing. https://slack.com/marketplace/A08SKDT6QUW-cursor
- Kiro (Amazon). "Kiro is now generally available." https://kiro.dev/blog/general-availability/

### Press, Practitioner, and Academic Sources

- TechCrunch. "OpenAI releases GPT-5.5, bringing company one step closer to an AI 'super app'." April 23, 2026. https://techcrunch.com/2026/04/23/openai-chatgpt-gpt-5-5-ai-model-superapp/
- Osmani, Addy. "Agent Harness Engineering." O'Reilly Radar. https://www.oreilly.com/radar/agent-harness-engineering/
- Arize AI. "What is an agent harness?" https://arize.com/blog/what-is-an-agent-harness/
- MindStudio. "The 9 Components Every Production Agent Harness Needs." https://www.mindstudio.ai/blog/9-components-production-agent-harness
- MindStudio. "Agentic Coding Workflow: the PIV Loop Explained." https://www.mindstudio.ai/blog/agentic-coding-workflow-piv-loop-explained
- Medin, Cole. ai-transformation-workshop. https://github.com/coleam00/ai-transformation-workshop
- Sumers, Theodore, Shunyu Yao, Karthik Narasimhan, and Thomas Griffiths. "Cognitive Architectures for Language Agents." arXiv:2309.02427. https://arxiv.org/abs/2309.02427
- "Agent Harness for Large Language Model Agents: A Survey." Preprints.org, 202604.0428 (2026, adjacent literature acknowledged in the contribution note). https://www.preprints.org/manuscript/202604.0428/v1
- "Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering." arXiv:2604.08224 (2026, adjacent literature). https://arxiv.org/abs/2604.08224
- Latent Space. "Extreme Harness Engineering for Token Billionaires" (Ryan Lopopolo episode + transcript). https://www.latent.space/p/harness-eng
- ByteByteGo Newsletter. "How OpenAI Built Its Data Agent" (Emma Tang interview, June 3, 2026). https://blog.bytebytego.com/p/how-openai-built-its-data-agent
- VentureBeat. "OpenAI's AI data agent, built by two engineers, now serves 4,000 employees." https://venturebeat.com/orchestration/openais-ai-data-agent-built-by-two-engineers-now-serves-4-000-employees-and
- VentureBeat. "Claude Code's source code appears to have leaked: here's what we know." https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know
- The Week. "Always-on agent and AI pet buddy: Anthropic's Claude source code leak reveals hidden features." https://www.theweek.in/news/sci-tech/2026/04/01/always-on-agent-and-ai-pet-buddy-anthropics-claude-source-code-leak-reveals-hidden-features.html
- InfoQ. "Claude Code source leak." https://www.infoq.com/news/2026/04/claude-code-source-leak/
- Kingy.ai. "Kairos: everything we know about Anthropic's secret always-on AI daemon." https://kingy.ai/ai/kairos-everything-we-know-about-anthropics-secret-always-on-ai-daemon/
- ZenML LLMOps Database. "Building AI developer tools using LangGraph for large-scale software development" (Uber AutoCover). https://www.zenml.io/llmops-database/building-ai-developer-tools-using-langgraph-for-large-scale-software-development
- VentureBeat. "Amazon launches Kiro, its own Claude-powered challenger to Windsurf and Codex." https://venturebeat.com/programming-development/amazon-launches-kiro-its-own-claude-powered-challenger-to-windsurf-and-codex
- Reuters. "Amazon pushes in-house AI coding tool Kiro over competitors, memo shows." https://www.reuters.com/business/retail-consumer/amazon-pushes-in-house-ai-coding-tool-kiro-over-competitors-memo-shows-2025-11-25/
- Futurism. "Amazon pushes Kiro coding tool." https://futurism.com/artificial-intelligence/amazon-kiro-coding
- Slashdot (summarizing Business Insider). "Amazon Engineers Want Claude Code, But the Company Keeps Pushing Its Own Tool." https://developers.slashdot.org/story/26/02/12/1530202/amazon-engineers-want-claude-code-but-the-company-keeps-pushing-its-own-tool
- Levinson, Ava (summarizing Business Insider). Inc. https://www.inc.com/ava-levinson/amazon-anthropic-no-claude/91301306
- The New Stack. "Amazon opens coding agents to developers." https://thenewstack.io/amazon-coding-agents-developers/
- Warren, Tom. "Microsoft encourages employees to use Claude Code." The Verge. https://www.theverge.com/tech/865689/microsoft-claude-code-anthropic-partnership-notepad
- Warren, Tom. "Microsoft cancels Claude Code licenses in Experiences + Devices." The Verge. https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad
- Windows Central. "Microsoft cancels Claude Code licenses, shifting developers to GitHub Copilot CLI." https://www.windowscentral.com/microsoft/microsoft-cancels-claude-code-licenses-shifting-developers-to-github-copilot-cli-a-move-likely-driven-by-financial-motives
- Fortune. "Microsoft's AI cost problem: tokens and agents." https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/

### Related Research on This Site

- [When the Loop Never Stops: How Long-Running Agents Broke Seat-Based Pricing and Created the AI Value Problem](/papers/agentic-pricing-break/), the companion bridge paper on the cost side
- [Harness vs Framework: Why "Just Use LangChain" Stopped Being the Answer](/articles/harness-vs-framework/), companion article expanding Section 2
- Writer/Reviewer Separation as an Engineering Invariant, companion article expanding Section 3 <!-- TODO: link /articles/writer-reviewer-separation/ when that article is published -->

## Citation

If citing this research in academic or professional work:

```
Daniel, David (2026). Harness Engineering: How Claude Code and Codex
Became Long-Running Agentic-Engineering Systems.
Retrieved from https://daviddaniel.tech/research/papers/harness-engineering/
```

---

*This paper is the architectural half of a two-paper sequence: what the harness is and why it became the locus of capability. The companion bridge paper, [When the Loop Never Stops](/papers/agentic-pricing-break/), takes up the cost consequences of the never-stopping loop. Two practitioner articles accompany this paper: [Harness vs Framework](/articles/harness-vs-framework/) on the harness/framework decision boundary, and Writer/Reviewer Separation on implementing the separation invariants.* <!-- TODO: link Writer/Reviewer Separation (/articles/writer-reviewer-separation/) when that article is published -->

*This paper is part of an ongoing research project tracking AI tooling, software engineering practices, and cross-functional workflows at [daviddaniel.tech/research](https://daviddaniel.tech/research).*

---

*This paper was created with AI assistance. Sources include first-party material from OpenAI (harness engineering essay, in-house data agent post, GPT-5.5 announcement) and Anthropic (long-running harness engineering note, autonomous-coding quickstart, Agent Skills, dynamic workflows announcement, Claude Fable 5 announcement); interview and practitioner material from Latent Space (Ryan Lopopolo episode) and ByteByteGo (Emma Tang interview); practitioner and press codifications from O'Reilly Radar (Addy Osmani, crediting Viv Trivedy), MindStudio (crediting @engineerprompt), Arize AI, VentureBeat (data-agent interview and Claude Code leak coverage), The Week, InfoQ, and the ZenML LLMOps database; press reporting on the Amazon/Kiro and Microsoft tooling decisions from Reuters, The Verge (Tom Warren), The New Stack, Fortune, Windows Central, Futurism, and Business Insider (as summarized by Slashdot and Inc.), plus the official Kiro blog; the CoALA cognitive-architecture paper (Sumers et al., arXiv:2309.02427) and adjacent 2026 harness-survey preprints (Preprints.org 202604.0428; arXiv:2604.08224), acknowledged for scope; and Cursor's official changelog and Slack Marketplace listing. Vendor self-reported, interview-relayed, and unaudited practitioner figures are labeled inline and in the evidence-status table. Data as of June 2026.*
