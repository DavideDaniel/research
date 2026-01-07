# Terminology and Taxonomy

## Introduction

Before analyzing specific tools, it is essential to establish clear terminology and a taxonomy for categorizing agentic development tools. The terms used in marketing materials often conflate distinct architectural approaches, making objective comparison difficult.

This section defines key terms as used throughout this paper and presents a taxonomy that groups tools by their fundamental execution models rather than surface features.

## Key Terminology

### Agent

A system capable of planning and executing multi-step actions using tools, while maintaining state across steps. Agents differ from simple completion systems in their ability to:

- Decompose complex tasks into subtasks
- Select and invoke appropriate tools
- Evaluate results and adjust approach
- Maintain context across multiple interactions

### Assistive AI

A system that responds to user prompts or actions but does not independently initiate or complete tasks. Assistive systems enhance human workflows without autonomous decision-making. Examples include inline code completion, chat-based explanations, and suggestion systems that require explicit user acceptance.

### Autonomy Boundary

The scope of actions an agent may perform without explicit user approval. Autonomy boundaries vary across several dimensions:

**File operations:** Can the agent create, modify, or delete files?
**Command execution:** Can the agent run shell commands or scripts?
**Remote operations:** Can the agent interact with external services, APIs, or repositories?
**Scope expansion:** Can the agent extend its work beyond the initially specified task?

### Execution Substrate

The environment in which agent actions occur. Common substrates include:

**Local machine:** Agent runs on the developer's workstation with direct filesystem and command access
**IDE process:** Agent operates within an IDE's sandboxed or semi-sandboxed environment
**Remote/managed CI:** Agent executes in a platform-controlled environment with defined boundaries

The execution substrate has significant implications for reproducibility, governance, and operational risk.

### Multi-Context Delegation

An architectural pattern in which a primary agent delegates subtasks to separate agent contexts, each with its own instructions and memory, and later integrates results. This pattern addresses context window limitations and enables role specialization.

Key characteristics:
- Explicit separation of concerns between contexts
- Context isolation prevents contamination
- Results aggregation by coordinating agent
- Potential for parallel execution

### Parallel Attempts

Multiple isolated executions of the same task performed independently, typically to select the best outcome, without coordination between executions. This differs from multi-agent orchestration in that:

- Each attempt operates independently
- No communication between parallel executions
- Selection rather than collaboration as the integration strategy
- Useful for exploring solution space, not for task decomposition

### Multi-Agent Orchestration

Coordination among multiple agents with distinct roles and isolated contexts, where agents collaboratively decompose and solve a task. Orchestration implies:

- Defined roles and responsibilities
- Communication protocols between agents
- Coordinated rather than competitive execution
- Shared understanding of overall objective

This paper distinguishes orchestration from parallel attempts, though some tools combine both patterns.

### Recipe

A reusable workflow configuration that packages prompts, settings, extensions, and instructions into a shareable unit for consistent execution. Recipes enable:

- Workflow standardization across teams
- Version control of agent configurations
- Reproducible execution patterns
- Knowledge capture and sharing

### Subrecipe

A subordinate recipe invoked by a parent recipe to handle specific subtasks, enabling workflow decomposition and specialization. Subrecipes represent an explicit approach to multi-context delegation where the delegation structure is defined declaratively rather than determined at runtime.

## Taxonomy of Agentic Development Tools

Modern AI development tools can be grouped into four architectural classes based on their execution models and autonomy patterns.

### Class 1: Assistive AI

**Characteristics:**
- Responds to explicit user requests
- No autonomous task execution
- Human remains in direct control
- Suggestions require explicit acceptance

**Execution Model:**
- User initiates interaction
- System generates response or suggestion
- User evaluates and accepts/rejects
- No persistent state between interactions

**Examples:**
- Traditional code completion (IntelliSense, TabNine)
- Chat-based code explanation
- Documentation lookup assistants

**Governance implications:**
- Low risk, high control
- Changes only occur through explicit user action
- Audit trail is user's edit history

### Class 2: IDE-Native Autonomous Agents

**Characteristics:**
- Perform multi-step tasks within local environment
- Edit multiple files without per-file approval
- Run commands and iterate on results
- Operate as single agent with broad access

**Execution Model:**
- User provides high-level task
- Agent plans and executes steps
- Local filesystem and command access
- Results visible in IDE workspace

**Examples:**
- Cursor Agent mode
- Windsurf Cascade
- IDE-integrated agentic features

**Governance implications:**
- High autonomy within local environment
- Governance depends on local practices
- Changes captured in version control
- Command execution may have side effects

### Class 3: Platform-Embedded Workflow Agents

**Characteristics:**
- Operate within managed execution environment
- Triggered by structured inputs (issues, tasks)
- Produce artifacts (pull requests, branches)
- Constrained by platform rules and permissions

**Execution Model:**
- Structured input triggers execution
- Agent runs in platform-controlled environment
- Output is reviewable artifact
- Platform enforces approval workflows

**Examples:**
- GitHub Copilot coding agent
- Platform-integrated development bots
- CI/CD-embedded automation

**Governance implications:**
- Platform enforces checkpoints
- Audit logs maintained by platform
- Permissions managed through platform
- Review workflow is architectural requirement

### Class 4: Multi-Context Agent Systems

**Characteristics:**
- Explicitly decompose work across multiple agent contexts
- Each context has distinct role and isolated memory
- Coordinating agent delegates and integrates
- Addresses context limits and cognitive overload

**Execution Model:**
- Primary agent receives task
- Task decomposed into subtasks
- Subtasks delegated to specialized contexts
- Results aggregated by coordinator

**Examples:**
- Claude Code with subagents
- Goose with recipes and subrecipes
- Custom multi-agent architectures

**Governance implications:**
- Complexity in debugging multi-context failures
- Potential for coordination conflicts
- More explicit about delegation decisions
- Tool permissions can be scoped per context

## Architectural Tradeoffs

Each architectural class involves tradeoffs that organizations should evaluate against their constraints.

| Class | Control | Autonomy | Governance | Complexity |
|-------|---------|----------|------------|------------|
| Assistive AI | Highest | Lowest | Minimal overhead | Simple |
| IDE-Native Agent | Medium | High | Policy-dependent | Moderate |
| Platform-Embedded | Medium-High | Medium | Platform-enforced | Moderate |
| Multi-Context | Variable | High | Configurable | Highest |

### Control vs. Autonomy

Higher autonomy enables faster task completion but requires trust in agent decisions. Organizations with strict change control may prefer assistive or platform-embedded tools.

### Governance Burden

Local tools place governance responsibility on teams and developers. Platform tools externalize governance to infrastructure but may reduce flexibility.

### Debugging Complexity

Single-context systems have simpler failure modes. Multi-context systems provide better context isolation but require understanding coordination patterns.

## Implications for Tool Selection

When selecting tools, consider:

**Compliance requirements:** Platform-embedded tools may provide required audit trails
**Team discipline:** Local autonomous tools require established practices
**Task complexity:** Simple tasks may not benefit from multi-context overhead
**Integration needs:** Consider how tools interact with existing workflows

The following sections analyze specific tools within this taxonomic framework.

---

*This analysis was created with AI assistance. Terminology derived from academic multi-agent systems literature and tool documentation. Data as of January 2026.*
