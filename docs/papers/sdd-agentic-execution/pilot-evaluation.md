# Pilot Design and Evaluation

The purpose of a pilot is not to test whether agents can write code. It is to test whether **specifications survive contact with autonomous execution**. This section provides guidance on designing pilots that surface meaningful friction and evaluating results appropriately.

## Pilot Purpose

Effective pilots answer specific questions:

- Where do our specifications fail under autonomous execution?
- What implicit assumptions do our teams rely on?
- How does specification quality vary across artifact types?
- Which task categories are ready for increased autonomy?
- What governance changes are needed before broader adoption?

Pilots that measure only productivity ("did the agent complete the task faster?") miss the point. Speed gains are easy to observe and easy to misinterpret. Friction points are harder to observe but more valuable.

## Pilot Scope

A well-scoped pilot includes:

### Repository Selection
- Two to three repositories representing different maturity levels
- At least one repository with mature specifications
- At least one repository with typical (imperfect) specifications
- Exclusion of production-critical paths during initial evaluation

### Change Type Definition
- Clearly defined categories of changes to evaluate
- Mix of task complexity (simple bug fixes, moderate features, complex refactors)
- Explicit list of what is in scope and what is excluded

### Artifact Inventory
- Explicit list of authoritative artifacts for each repository
- Documentation of artifact relationships and precedence
- Assessment of current artifact quality and consistency

### Timebound Execution
- Fixed pilot duration with clear checkpoints
- Defined success criteria for pilot continuation or expansion
- Exit criteria for early termination if fundamental issues emerge

## Artifact Selection

Choose artifacts that matter for the pilot:

### Minimum Artifact Set
- One PRD or proposal document
- One architecture document or design doc
- One implementation-level spec or story

Treat these as immutable inputs during the pilot. Do not allow specifications to be modified to "fix" agent failures—the point is to understand how existing specifications behave.

### Artifact Quality Assessment

Before the pilot, assess each artifact:

| Dimension | Questions |
|-----------|-----------|
| Completeness | Are success criteria explicit? Are non-goals stated? |
| Consistency | Does this artifact conflict with related artifacts? |
| Currency | When was this last updated? Does it reflect current reality? |
| Specificity | Are requirements precise enough to verify? |
| Authority | What is this artifact's precedence relative to others? |

This assessment provides baseline expectations. Artifacts rated poorly should be expected to produce more friction.

## Execution Pattern

For each task in the pilot:

### 1. Manual Baseline
Execute the task manually without agents. Document:
- How specifications were interpreted
- What implicit assumptions were applied
- Where clarification was sought
- Total effort and time

### 2. Assisted Execution
Execute with assistive AI (suggestions, completions, but not autonomous). Document:
- Where AI suggestions aligned with specifications
- Where AI suggestions conflicted with specifications
- How conflicts were resolved
- Effort difference from manual baseline

### 3. Agentic Delegation
Execute with full agentic delegation. Document:
- How the agent interpreted specifications
- Where the agent asked for clarification vs. proceeded independently
- What output was produced
- How output aligned with specifications

### Comparison Focus
Compare outcomes against specifications, not against intent. The question is not "did the agent do what we wanted?" but "did the agent follow the specifications we provided?"

If the specification was insufficient, that is specification feedback, not agent failure.

## Signals That Matter More Than Speed

Speed gains are easy to observe and easy to misinterpret. More meaningful signals include:

### Specification Rewrite Frequency

How often must specifications be rewritten to be "agent-legible"?

High rewrite frequency indicates specifications rely heavily on human interpretation. This is not necessarily bad—it surfaces where that reliance exists.

Questions to ask:
- What types of content required rewriting?
- Were rewrites clarifications or corrections?
- Do rewritten specifications also work better for human readers?

### Clarification Surface Area

Whether agents ask questions or silently proceed.

Agents that ask questions about ambiguity are safer than agents that proceed confidently with incorrect interpretations. However, excessive questioning indicates specifications are not supporting autonomous execution.

Questions to ask:
- What topics triggered clarification requests?
- Were requests about specification content or execution mechanics?
- Could clarifications have been anticipated and pre-documented?

### Review Confidence

Whether reviewers trust outputs enough to skim or feel compelled to deeply inspect.

Low review confidence after agentic execution indicates the agent is not trustworthy on these task types. High confidence may indicate appropriate trust or dangerous overconfidence.

Questions to ask:
- How does review depth compare to human-authored code?
- Are reviewers catching specification violations?
- Are reviewers trusting outputs they should inspect more carefully?

### Divergence Detection

How quickly mismatches between specification and implementation are discovered.

Late divergence detection (at integration or in production) is expensive. Early detection (during execution or review) is cheap.

Questions to ask:
- When were specification violations detected?
- What detection mechanisms caught violations?
- What violations were not caught until later stages?

### Trust Calibration

Whether teams become appropriately cautious or falsely confident.

Teams may over-trust ("the agent handled it, must be fine") or under-trust ("we need to review everything twice"). Neither is optimal.

Questions to ask:
- How is team confidence evolving over the pilot?
- Is confidence calibrated to actual output quality?
- Are there task types where confidence is miscalibrated?

### Silent Success Warning

Silent success is more dangerous than visible failure.

When agents produce correct-looking output without friction, examine closely:
- Was the specification actually followed, or was it ignored in favor of plausible completion?
- Would a specification violation have been visible in the output?
- Is review depth appropriate for the risk level?

## Interpreting Results Without Premature Commitment

A successful pilot does not imply adoption. Valid outcomes include:

### Restrict to Specific Task Classes
Some task types are ready for agentic execution; others are not. The pilot may reveal that bug fixes are ready but new feature development is not, or that CRUD operations are ready but integrations are not.

### Layer Architectures by Purpose
Different execution architectures serve different needs. The pilot may suggest using local agents for exploration and prototyping while using platform agents for production changes. This hybrid approach is often optimal.

### Improve Specifications Before Expanding Autonomy
If specification quality is the primary friction source, the right response may be specification improvement rather than agent adoption. This is valuable learning, not pilot failure.

### Decide Not to Proceed
Governance constraints, cost considerations, or risk tolerance may make agentic execution inappropriate regardless of pilot success. This is a valid outcome.

### Mixed Usage Is Normal
Different teams, different repositories, and different task types may warrant different levels of autonomy. Attempting to standardize on a single approach is often counterproductive.

## Pilot Anti-Patterns

Common mistakes in pilot design and evaluation:

### Measuring Only Speed
Speed is the most visible metric and the least informative. Fast incorrect output is worse than slow correct output.

### Fixing Specifications Mid-Pilot
If specifications are modified to make agents succeed, the pilot measures specification improvement, not agent capability on real specifications.

### Selecting Only Best Artifacts
If the pilot uses only the highest-quality specifications, results will not generalize to typical specification quality.

### Ignoring Silent Failures
Correct-looking output may hide specification violations. Pilots should include deliberate verification of specification compliance.

### Projecting Success to All Task Types
Success on pilot task types does not predict success on other task types. Avoid generalizing from limited evidence.

### Commitment Before Understanding
The goal is understanding, not standardization. Premature commitment to specific tools or workflows closes off valuable options.

---

*Next section: [Conclusion](./conclusion)*
