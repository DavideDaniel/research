# Execution Architectures and Specification Consumption

Different agentic execution models consume and interpret specifications in materially different ways. This section examines four primary architectural patterns and their implications for specification design.

For detailed architectural analysis of specific tools, see the companion paper [Agentic Development Tools and Execution Architectures](/papers/agentic-tools/).

## Single-Agent Local Execution

In single-agent local systems, specifications compete with code context, recent prompts, and execution feedback for attention in a single context window.

### Consumption Pattern

The agent receives:
- User prompts and instructions
- Code from the current file and related files
- Tool outputs and execution feedback
- Specification documents (if provided)

All of these compete for limited context. The agent must balance specification fidelity against immediate task context.

### Common Behaviors

- **Long specs are summarized or partially ignored:** Context limits force the agent to compress or drop specification content. The sections that survive are often those most recently referenced or most salient.

- **Earlier constraints are overshadowed by nearby code:** When specification constraints conflict with patterns visible in surrounding code, agents often follow the code. Recency and proximity bias are strong.

- **Agents optimize for task completion rather than fidelity:** The immediate goal (complete the task) tends to override secondary goals (follow the specification exactly). This is especially true when specifications are verbose or contain low-signal content.

### When This Model Works

Single-agent local execution works best when:

- Specs are concise and concrete
- Tasks are narrowly scoped (single file, single function)
- Humans actively supervise and redirect
- The specification content fits comfortably in context alongside code

### When This Model Fails

This model fails quietly when:

- Specs are large, layered, or contain conflicting guidance
- The agent silently fills gaps with assumptions
- Tasks span multiple files or require architectural consistency
- Review processes assume the agent followed specifications that were actually dropped from context

The failure mode is typically silent: the agent produces reasonable-looking output that subtly violates specifications that were not salient at execution time.

## Multi-Context Execution

Multi-context systems decompose work across specialized contexts. Different contexts handle planning, exploration, implementation, and review.

### Consumption Pattern

Specifications may be:
- Fed to a planning context that produces a work breakdown
- Referenced by an exploration context that gathers information
- Filtered for implementation contexts that execute specific tasks
- Validated by review contexts that check output against requirements

Each context sees a subset of the full specification, tailored to its role.

### Benefits

- **Specs can be reasoned about separately from code:** A planning context can deeply analyze a PRD without the distraction of implementation details.

- **Role-specific constraints can be enforced:** An architecture context can enforce structural constraints without needing to understand implementation specifics.

- **Cognitive load is reduced per context:** Each context can be optimized for its specific role, with appropriate specification content.

### Risks

- **Different contexts may interpret specs differently:** Without careful coordination, the planning context and implementation context may develop divergent understandings of the same specification.

- **Coordination failures introduce inconsistencies:** Information lost in handoffs between contexts can lead to implementations that satisfy local specifications but violate global constraints.

- **Debugging requires tracing decisions across contexts:** When output is incorrect, understanding why requires reconstructing the specification interpretation across multiple execution contexts.

### Alignment with SDD

This model aligns well with role-based SDD approaches where different specification artifacts serve different purposes. A PRD can be consumed by planning contexts; an architecture document by design contexts; implementation specs by coding contexts.

However, this alignment demands stronger artifact discipline. Inconsistencies between specification levels that humans would resolve intuitively become coordination failures in multi-context systems.

## Explicit Workflow Orchestration

Workflow-oriented systems treat specifications as inputs to explicit stages. Each stage has defined inputs, outputs, and transitions.

### Consumption Pattern

Specifications are consumed as:
- Stage inputs that define what a stage should accomplish
- Transition conditions that determine when stages complete
- Validation criteria that verify stage outputs

The workflow itself may be specification-derived, with the specification defining both what to do and how to sequence it.

### Benefits

- **Reproducibility:** The same specification produces the same workflow, which produces consistent execution patterns.

- **Clear phase boundaries:** It is unambiguous when each phase begins and ends, making progress trackable and auditable.

- **Shareable and versioned workflows:** Workflows can be stored, shared, and version-controlled alongside specifications.

### Costs

- **Specs must be more complete upfront:** Workflow stages need to be fully defined before execution begins. Iterative clarification during execution is difficult or impossible.

- **Iterative clarification becomes expensive:** Each clarification may require workflow modification, re-specification, and re-execution.

- **Mis-specified stages fail deterministically:** If a specification is wrong, the corresponding workflow stage will fail consistently. This is both a benefit (failures are reproducible) and a cost (there is no graceful degradation).

### Specification Quality Amplification

Workflow orchestration amplifies specification quality in both directions:

- Strong specifications produce reliable, repeatable execution
- Weak specifications produce reliable, repeatable failures

This model rewards mature SDD practices and exposes weak ones quickly. Organizations with ad-hoc specification practices often find workflow orchestration unforgiving.

## Platform-Embedded Execution

Platform-embedded agents consume specifications primarily through structured inputs such as issues, pull request descriptions, or form-based prompts.

### Consumption Pattern

Specifications reach the agent through:
- Issue descriptions and structured fields
- Pull request templates and descriptions
- Repository-level configuration and rules
- Platform-enforced workflows and gates

The platform mediates between specification and execution, often imposing its own structure.

### Benefits

- **Strong enforcement of review gates:** Platform governance ensures that outputs pass through defined review processes. Agents cannot bypass these gates.

- **Clear audit trails:** Platform logging captures what specifications were provided, what outputs were produced, and what review decisions were made.

- **Limited blast radius:** Platform sandboxing and permission models limit what agents can affect, reducing the impact of specification failures.

### Costs

- **Reduced interactivity:** Agents operate asynchronously, with limited ability for iterative clarification during execution.

- **Front-loaded specification burden:** All necessary specification content must be provided upfront. There is no opportunity to clarify mid-execution.

- **Slower iteration on unclear requirements:** Each iteration requires a new issue or PR, with associated review overhead.

### Specification Structure Requirements

Platform-embedded execution often requires more structured specifications:

- Acceptance criteria must be explicit and checkable
- Scope must be defined precisely enough for async execution
- Edge cases must be anticipated rather than discovered interactively

This model is forgiving of over-specification but punishes ambiguity. Vague specifications produce confident but incorrect outputs that then require review cycles to correct.

## Architecture Selection Implications

The choice of execution architecture has direct implications for specification design:

| Architecture | Specification Requirements | Failure Mode |
|-------------|---------------------------|--------------|
| Single-Agent Local | Concise, high-signal, minimal conflict | Silent constraint violation |
| Multi-Context | Consistent across levels, clear handoffs | Coordination drift |
| Workflow Orchestration | Complete upfront, stage-aligned | Deterministic stage failure |
| Platform-Embedded | Structured, explicit acceptance criteria | Async misinterpretation |

Organizations should evaluate their specification maturity against the requirements of their chosen (or desired) execution architecture. A mismatch between specification quality and architecture expectations produces predictable friction.

## Hybrid Approaches

In practice, many organizations use multiple execution architectures for different purposes:

- Single-agent local for exploration and prototyping
- Multi-context for complex implementation tasks
- Workflow orchestration for well-defined repeatable processes
- Platform-embedded for production changes and governance-heavy contexts

This hybrid approach is reasonable and often desirable. However, it requires specifications that can be consumed effectively by multiple architectures, or explicit translation layers between specification formats and architecture expectations.

---

*Next section: [Failure Modes in Practice](./failure-modes)*
