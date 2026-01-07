# Failure Modes in Practice

Most failures in specification-driven agentic execution are not caused by agent behavior, but by specification assumptions that no longer hold under autonomy. This section catalogs common failure modes and their manifestations across execution architectures.

## Common Failure Modes

### Implicit Human Assumptions

Specifications often omit details humans consider obvious:

- Default behaviors ("of course we paginate large lists")
- Error handling expectations ("obviously we log errors")
- Non-goals ("we wouldn't modify the database schema for this")

Agents treat these omissions as permission to invent.

**Manifestation:** The agent produces output that is technically correct but violates unwritten team norms. Code passes review when reviewers assume the obvious constraints were followed, only to cause problems in production.

**Example:** A specification says "add an endpoint to list users." The agent implements the endpoint without pagination, without rate limiting, and with verbose error messages that leak implementation details. Each omission was an implicit constraint never stated.

**Mitigation:** Explicitly document defaults, constraints, and non-goals. Treat "obvious" requirements as specification debt.

### Conflicting Artifacts

PRDs, architecture docs, and code comments often drift out of alignment. Humans reconcile conflicts intuitively. Agents do not.

Without explicit precedence rules, agents choose whichever artifact is most salient—typically the one most recently referenced or closest in context.

**Manifestation:** Different executions produce inconsistent results depending on which artifact was most salient at execution time. The same task may be implemented differently on different runs.

**Example:** The PRD says "use REST for all APIs," but the architecture document mentions a new GraphQL initiative. Code comments reference both patterns inconsistently. The agent chooses GraphQL for some endpoints and REST for others based on proximity to each artifact.

**Mitigation:** Establish explicit precedence rules. When artifacts conflict, the specification should state which takes priority. Audit artifacts for consistency before agentic execution.

### Over-Specification

Highly detailed specs can freeze incorrect assumptions in place. Agents follow them precisely, even when code reality has changed.

**Manifestation:** The agent produces output that exactly matches the specification but is incompatible with the current state of the codebase. The specification was correct when written but is now stale.

**Example:** A specification describes the exact function signature and location for a new feature. The codebase was refactored since the specification was written. The agent creates a function with the specified signature in a module that no longer exists, then creates the module to hold it, introducing duplicate code and inconsistent patterns.

**Mitigation:** Specifications should focus on intent and constraints rather than prescriptive implementation details. When details are necessary, include verification steps ("confirm the target module still exists").

### Under-Specification

Vague specs invite hallucinated intent. Agents optimize for plausibility rather than correctness.

**Manifestation:** The agent produces output that seems reasonable but reflects invented requirements. Reviewers may not catch the invention because the output looks professional and coherent.

**Example:** A specification says "improve the user experience of the settings page." The agent redesigns the page with new features, removes existing functionality it deemed unnecessary, and restructures the data model to support its vision. None of this was requested.

**Mitigation:** Specifications should be specific enough that success criteria are verifiable. "Improve user experience" is not specific. "Reduce time to complete settings change from 5 clicks to 3" is specific.

### Spec Drift After Refactors

Agent-driven refactors often update code faster than specs. Once drift occurs, future agent executions compound the divergence.

**Manifestation:** Specifications become progressively less accurate over time. New agent executions reference increasingly stale specifications, making decisions based on outdated context.

**Example:** An agent refactors the authentication module based on the current specification. The specification is not updated. The next agent execution references the original specification and attempts changes that conflict with the refactored structure, causing merge conflicts or silent inconsistencies.

**Mitigation:** Include specification updates as part of the definition of done. Treat specification drift as a form of technical debt.

## Architecture-Specific Failure Patterns

While the failure modes above are architecture-agnostic, their impact varies by execution model.

### Single-Agent Local Failures

Primary failure pattern: **Silent constraint violation**

The agent drops constraints from context and proceeds without them. Output looks correct but violates specifications that were present but not salient.

Warning signs:
- Agent does not reference specification content in reasoning
- Output addresses immediate task but ignores cross-cutting concerns
- Review catches issues that should have been prevented by specification

### Multi-Context Failures

Primary failure pattern: **Coordination drift**

Different contexts develop divergent understandings. Planning and implementation produce inconsistent results.

Warning signs:
- Planning context produces work breakdown that implementation cannot follow
- Implementation context makes decisions inconsistent with planning assumptions
- Validation context cannot trace output back to specification intent

### Workflow Orchestration Failures

Primary failure pattern: **Deterministic stage failure**

Mis-specified stages fail consistently. The workflow cannot proceed until specifications are corrected.

Warning signs:
- Stages fail repeatedly with similar errors
- Workflow progress blocks on specification ambiguity
- Workarounds accumulate to bypass strict stage requirements

### Platform-Embedded Failures

Primary failure pattern: **Async misinterpretation**

Agents interpret specifications in isolation, without ability to clarify. Misinterpretations are discovered only at review time.

Warning signs:
- PRs require multiple revision cycles
- Agents confidently implement incorrect interpretations
- Review feedback patterns repeat across similar tasks

## Failure Detection Timing

Failures can be detected at different points in the development lifecycle:

| Detection Point | Cost to Fix | Examples |
|----------------|-------------|----------|
| During execution | Low | Agent asks clarifying questions, halts on ambiguity |
| At review | Medium | Reviewer catches specification violations, requests changes |
| At integration | High | CI failures, merge conflicts, test failures |
| In production | Very high | Runtime errors, data corruption, security issues |
| Post-incident | Extreme | Customer impact, compliance violations, trust damage |

The goal of specification improvement is to shift detection left—catching failures during execution or review rather than in production.

## Compounding Failures

Individual failure modes can compound in dangerous ways:

**Under-specification + Silent violation:** The agent invents intent and proceeds without flagging uncertainty. Review does not catch the invention because the output looks professional.

**Conflicting artifacts + Coordination drift:** Different contexts see different artifacts and develop incompatible interpretations. The final output reflects multiple contradictory decisions.

**Over-specification + Spec drift:** The agent follows a detailed but stale specification precisely, producing correct-but-wrong output that is difficult to distinguish from correct-and-right output.

**Implicit assumptions + Async execution:** Platform-embedded agents cannot ask for clarification on implicit assumptions. They proceed with confident misinterpretations.

These compound failures are more difficult to detect and diagnose than simple failures. They often require tracing decisions across multiple execution steps and specification artifacts.

## Failure as Information

Failures under agentic execution are information about specification quality.

A specification that works for human teams but fails under agentic execution is not a bad specification—it is a specification that relies on implicit context humans provide. The failure surfaces that implicit context.

This reframing is important: the goal is not to make specifications "agent-proof" but to understand where specifications rely on human interpretation and whether that reliance is acceptable given the chosen execution architecture.

Some specifications should remain human-interpreted. Highly ambiguous requirements, politically sensitive decisions, and novel architectural choices may be inappropriate for autonomous execution regardless of specification quality.

---

*Next section: [Pilot Design and Evaluation](./pilot-evaluation)*
