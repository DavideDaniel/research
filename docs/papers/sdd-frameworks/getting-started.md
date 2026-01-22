---
title: Getting Started with Spec-Driven Development
description: Practical guide for implementing BMAD, SpecKit, and OpenSpec frameworks. Includes quick-start instructions, core concepts, and framework selection guidance.
---

# Getting Started with Spec-Driven Development

## Introduction

This guide provides practical, hands-on instructions for getting started with specification-driven development (SDD) and the three major frameworks covered in this research: BMAD, SpecKit, and OpenSpec.

Whether you're implementing SDD for the first time or evaluating frameworks for your organization, this guide will help you move from theory to practice.

## Core Concepts Quick Reference

Before diving into specific frameworks, ensure you understand these fundamental concepts:

### Specification vs. Documentation

**Traditional Documentation:**
- Written after implementation
- Often becomes outdated
- Not executable or verifiable
- Separate from development workflow

**SDD Specification:**
- Written before or alongside implementation
- Automatically synchronized with code
- Executable and continuously verified
- Central to development workflow

### Specification Formats

**Natural Language (BDD-style):**
```gherkin
Feature: User Authentication
  Scenario: Successful login
    Given a registered user exists
    When the user provides valid credentials
    Then the user is authenticated
    And the user is redirected to dashboard
```

**Structured (YAML):**
```yaml
specification:
  name: user_authentication
  behaviors:
    - scenario: successful_login
      preconditions:
        - user_registered: true
      actions:
        - provide_credentials: valid
      postconditions:
        - user_authenticated: true
        - redirect_to: dashboard
```

**API Contract:**
```json
{
  "request": {
    "method": "POST",
    "path": "/auth/login",
    "body": {
      "email": "string",
      "password": "string"
    }
  },
  "response": {
    "status": 200,
    "body": {
      "token": "string",
      "user": "object"
    }
  }
}
```

### Verification Levels

**Unit Level:**
- Individual function/method specifications
- Fast execution (milliseconds)
- High volume

**Integration Level:**
- Component interaction specifications
- Medium execution (seconds)
- Moderate volume

**End-to-End Level:**
- Complete user scenario specifications
- Slow execution (minutes)
- Low volume

## Choosing Your Framework

### Quick Decision Guide

Answer these questions to narrow your framework choice:

**1. Project Type?**
- Greenfield (new project) → Consider BMAD or SpecKit
- Brownfield (existing code) → Consider OpenSpec
- Mixed → Consider OpenSpec or SpecKit

**2. Team Size?**
- Small (2-10) → OpenSpec
- Medium (10-50) → Any framework
- Large (50+) → SpecKit or BMAD

**3. GitHub Native?**
- Yes → SpecKit (best integration)
- No → BMAD or OpenSpec

**4. Governance Requirements?**
- High (regulated industry) → SpecKit
- Medium → Any framework
- Low → OpenSpec

**5. Automation Preference?**
- Maximum automation → BMAD
- Balanced → SpecKit
- Developer control → OpenSpec

### Framework Selection Matrix

| Criteria | BMAD | SpecKit | OpenSpec |
|----------|------|---------|----------|
| Greenfield | Excellent | Excellent | Good |
| Brownfield | Fair | Good | Excellent |
| GitHub Integration | Good | Excellent | Good |
| Automation Level | Very High | High | Medium |
| Learning Curve | Steep | Medium | Gentle |
| Resource Needs | High | Medium | Low |

## Getting Started with BMAD

### Prerequisites

- Python 3.9+
- Node.js 16+ (for certain agents)
- Docker (recommended for agent isolation)
- 8GB+ RAM (16GB recommended)
- GitHub account

### Installation

```bash
# Install BMAD CLI
pip install bmad-framework

# Verify installation
bmad --version

# Initialize project
bmad init my-project
cd my-project
```

### Project Structure

```
my-project/
├── bmad.config.yaml       # BMAD configuration
├── specs/                 # Specification directory
│   ├── features/          # Feature specifications
│   ├── api/              # API specifications
│   └── components/       # Component specifications
├── agents/               # Custom agent configurations
└── output/              # Generated code and reports
```

### First Specification

Create `specs/features/user-registration.yaml`:

```yaml
specification:
  name: user_registration
  description: User registration workflow
  
  agents:
    - product_manager
    - architect
    - backend_developer
    - qa_engineer
  
  requirements:
    - id: REQ-001
      description: Users can register with email and password
      priority: high
      
  behaviors:
    - scenario: successful_registration
      given:
        - email_format_valid: true
        - email_not_registered: true
        - password_meets_requirements: true
      when:
        - user_submits_registration_form
      then:
        - user_account_created: true
        - confirmation_email_sent: true
        - user_redirected_to_welcome_page: true
        
    - scenario: duplicate_email_registration
      given:
        - email_already_registered: true
      when:
        - user_submits_registration_form
      then:
        - error_message_displayed: "Email already registered"
        - user_account_not_created: true
```

### Running BMAD

```bash
# Analyze specifications
bmad analyze specs/features/user-registration.yaml

# Generate implementation plan
bmad plan specs/features/user-registration.yaml

# Execute with agents
bmad execute specs/features/user-registration.yaml --agents=all

# Verify implementation
bmad verify specs/features/user-registration.yaml
```

### BMAD Agent Monitoring

```bash
# View agent activity
bmad agents status

# Monitor specific agent
bmad agents logs backend_developer

# Agent performance metrics
bmad agents metrics
```

### Next Steps with BMAD

1. Review generated code in `output/` directory
2. Customize agent behaviors in `agents/` directory
3. Add integration tests: `bmad test --level=integration`
4. Set up CI/CD: `bmad ci-config generate`

## Getting Started with SpecKit

### Prerequisites

- GitHub account and repository
- GitHub Actions enabled
- Git 2.30+
- Node.js 16+ or Python 3.8+ (language-dependent)

### Installation

```bash
# Install SpecKit CLI
npm install -g @github/speckit

# Or via Homebrew
brew install github/tap/speckit

# Verify installation
speckit --version

# Initialize in repository
cd your-repo
speckit init
```

### Project Structure

```
your-repo/
├── .speckit/
│   ├── constitution.yaml    # Governance rules
│   ├── quality-gates.yaml   # Pass/fail criteria
│   └── templates/           # Specification templates
├── specifications/
│   ├── features/
│   ├── apis/
│   └── components/
└── .github/
    └── workflows/
        └── speckit-verify.yml
```

### First Constitution

Create `.speckit/constitution.yaml`:

```yaml
constitution:
  name: Development Constitution
  version: 1.0.0
  
  standards:
    specification-format:
      rule: All specifications must use Markdown with YAML frontmatter
      enforcement: blocking
      
    completeness:
      rule: Specifications must include Given-When-Then scenarios
      enforcement: blocking
      
    review:
      rule: Specifications require review from architect
      enforcement: blocking
      reviewers:
        - architect-team
  
  quality-gates:
    coverage:
      rule: Minimum 80% specification coverage
      enforcement: warning
      
    verification:
      rule: All specifications must have passing tests
      enforcement: blocking
      
  change-governance:
    breaking-changes:
      rule: Breaking specification changes require approval
      enforcement: blocking
      approvers:
        - tech-lead
        - product-owner
```

### First Specification

Create `specifications/features/user-login.md`:

```markdown
---
id: SPEC-001
title: User Login
status: draft
owner: auth-team
reviewers: [architect-team, security-team]
---

# User Login Specification

## Overview
Users authenticate with email and password to access the application.

## Scenarios

### Scenario: Successful Login
**Given:** A registered user exists with email "user@example.com"  
**And:** The user's account is active  
**When:** The user provides correct email and password  
**Then:** The user is authenticated  
**And:** A session token is generated  
**And:** The user is redirected to their dashboard

### Scenario: Invalid Credentials
**Given:** A registered user exists  
**When:** The user provides incorrect password  
**Then:** An error message is displayed  
**And:** The user is not authenticated  
**And:** No session token is generated

## API Contract

```yaml
endpoint: POST /auth/login
request:
  body:
    email: string (required)
    password: string (required)
response:
  success:
    status: 200
    body:
      token: string
      user:
        id: number
        email: string
  error:
    status: 401
    body:
      error: string
```

## Acceptance Criteria
- [ ] Email validation follows RFC 5322
- [ ] Password is encrypted in transit and at rest
- [ ] Failed login attempts are rate-limited
- [ ] Account lockout after 5 failed attempts
```

### Running SpecKit

```bash
# Verify specifications against constitution
speckit verify

# Check specific specification
speckit verify specifications/features/user-login.md

# Generate coverage report
speckit coverage

# Create new specification from template
speckit new feature user-logout
```

### GitHub Actions Integration

Create `.github/workflows/speckit-verify.yml`:

```yaml
name: SpecKit Verification

on:
  pull_request:
    paths:
      - 'specifications/**'
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install SpecKit
        run: npm install -g @github/speckit
      
      - name: Verify Constitutional Compliance
        run: speckit verify --constitution .speckit/constitution.yaml
      
      - name: Check Coverage
        run: speckit coverage --min 80
      
      - name: Generate Report
        run: speckit report --format html --output report.html
      
      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: speckit-report
          path: report.html
```

### Next Steps with SpecKit

1. Customize constitution for your organization
2. Create specification templates
3. Set up automated reviews
4. Configure quality gates
5. Train team on specification authoring

## Getting Started with OpenSpec

### Prerequisites

- Python 3.8+ or Node.js 14+
- Existing codebase (brownfield focus)
- Git repository

### Installation

```bash
# Python installation
pip install openspec

# Node.js installation
npm install -g openspec

# Verify installation
openspec --version

# Initialize in existing project
cd your-project
openspec init --detect
```

### Project Structure

```
your-project/
├── openspec.config.yaml    # Configuration
├── .openspec/
│   ├── specs/             # Specifications
│   ├── coverage/          # Coverage data
│   └── reports/           # Verification reports
└── (your existing code structure)
```

### Discovery and Extraction

```bash
# Discover existing patterns
openspec discover --path ./src

# Extract specifications from code
openspec extract --input ./src --output .openspec/specs

# Extract from tests
openspec extract-tests --test-dir ./tests

# Generate API specifications
openspec extract-api --openapi ./swagger.json
```

### Example Extracted Specification

OpenSpec generates specifications from your code. Example output in `.openspec/specs/user_service.yaml`:

```yaml
# Auto-generated by OpenSpec from existing code
specification:
  name: user_service
  source: src/services/user_service.py
  extracted: 2026-01-07
  confidence: high
  
  functions:
    - name: create_user
      specification:
        inputs:
          email: string
          password: string
        outputs:
          user: User
        behaviors:
          - validates_email_format
          - hashes_password
          - creates_database_record
          - sends_confirmation_email
      verification:
        tests:
          - test_create_user_success
          - test_create_user_duplicate_email
          - test_create_user_invalid_email
        coverage: 85%
```

### Refining Specifications

```bash
# Edit extracted specification
openspec edit .openspec/specs/user_service.yaml

# Validate refined specification
openspec validate .openspec/specs/user_service.yaml

# Run verification
openspec verify .openspec/specs/user_service.yaml
```

### Manual Specification Enhancement

Edit `.openspec/specs/user_service.yaml`:

```yaml
specification:
  name: user_service
  
  # Enhanced with business context
  business_rules:
    - Email must be unique across system
    - Password must meet complexity requirements
    - New users start in pending status
    
  # Enhanced scenarios
  scenarios:
    - name: create_user_success
      given:
        - email_not_in_use: true
        - password_meets_requirements: true
      when:
        - create_user_called
      then:
        - user_created_in_database: true
        - confirmation_email_sent: true
        - user_status: pending
      
  # Define verification strategy
  verification:
    unit_tests: required
    integration_tests: required
    contract_tests: optional
```

### Continuous Verification

```bash
# Set up pre-commit hook
openspec hooks install

# Run verification
openspec verify --all

# Generate coverage report
openspec coverage --format html

# Incremental verification (only changed specs)
openspec verify --changed
```

### CI/CD Integration

Add to your existing CI pipeline (e.g., `.github/workflows/ci.yml`):

```yaml
- name: OpenSpec Verification
  run: |
    pip install openspec
    openspec verify --all
    openspec coverage --min 75 --fail-under
```

### Next Steps with OpenSpec

1. Review and refine auto-generated specifications
2. Gradually increase specification coverage
3. Add specifications for new features
4. Configure enforcement levels
5. Train team on specification refinement

## Common Workflows

### Workflow 1: Adding a New Feature

**With BMAD:**
```bash
1. bmad spec create feature/new-checkout-flow
2. Edit specification in editor
3. bmad execute feature/new-checkout-flow
4. bmad verify feature/new-checkout-flow
5. Review and merge
```

**With SpecKit:**
```bash
1. speckit new feature checkout-flow
2. Edit specification in editor
3. git add specifications/features/checkout-flow.md
4. git commit -m "Add checkout flow specification"
5. Create PR (automatic verification runs)
6. Review and merge
```

**With OpenSpec:**
```bash
1. Write specification in .openspec/specs/checkout.yaml
2. openspec validate specs/checkout.yaml
3. Implement feature
4. openspec verify specs/checkout.yaml
5. Review and merge
```

### Workflow 2: Refactoring Existing Code

**With BMAD:**
```bash
1. bmad analyze existing-component
2. Review specification gaps
3. bmad refactor existing-component --preserve-behavior
4. bmad verify existing-component
```

**With SpecKit:**
```bash
1. speckit extract existing-component
2. Review and enhance extracted specification
3. Implement refactoring
4. speckit verify (ensures behavior preserved)
```

**With OpenSpec:**
```bash
1. openspec extract --input ./src/component
2. openspec verify --baseline (capture current behavior)
3. Implement refactoring
4. openspec verify (compare against baseline)
```

### Workflow 3: API Contract Changes

**With BMAD:**
```bash
1. Update API specification
2. bmad impact-analysis api-spec
3. bmad verify-contracts --all-consumers
4. Deploy with versioning
```

**With SpecKit:**
```bash
1. Update API specification
2. Constitution validates breaking changes
3. Request approval from governance
4. speckit verify-contracts
5. Merge and deploy
```

**With OpenSpec:**
```bash
1. Update API specification
2. openspec contract-check --consumers
3. openspec generate-migration-guide
4. Coordinate with consumer teams
```

## Integration with Existing Tools

### IDE Integration

**VS Code:**
- BMAD: Install "BMAD Framework" extension
- SpecKit: Install "GitHub SpecKit" extension
- OpenSpec: Install "OpenSpec" extension

**IntelliJ/PyCharm:**
- BMAD: Plugin available in JetBrains marketplace
- SpecKit: Limited support, use CLI
- OpenSpec: Plugin available

### Git Hooks

**Pre-commit:**
```bash
# BMAD
bmad hooks install

# SpecKit
speckit hooks install

# OpenSpec
openspec hooks install
```

**Pre-push:**
```bash
# Run full verification before pushing
git config core.hooksPath .git-hooks
```

### CI/CD Platforms

**GitHub Actions:** All frameworks have official actions
**GitLab CI:** CLI-based integration
**Jenkins:** Plugin available for SpecKit, CLI for others
**CircleCI:** CLI-based integration

## Troubleshooting

### Common Issues

**BMAD Agent Failures:**
```bash
# Check agent logs
bmad agents logs <agent-name>

# Reset agent state
bmad agents reset <agent-name>

# Verify agent configuration
bmad agents validate
```

**SpecKit Constitutional Violations:**
```bash
# Show violation details
speckit verify --verbose

# Temporarily disable rule
speckit verify --ignore-rule <rule-name>

# Request constitution override
speckit override-request <specification-id>
```

**OpenSpec Extraction Issues:**
```bash
# Increase extraction confidence threshold
openspec extract --confidence 0.7

# Manual specification
openspec new --template manual

# Debug extraction
openspec extract --debug --verbose
```

## Learning Resources

### Official Documentation
- BMAD: docs.bmad-framework.io
- SpecKit: docs.github.com/speckit
- OpenSpec: openspec.dev

### Community
- BMAD: GitHub Discussions, Discord server
- SpecKit: GitHub Discussions, Slack channel
- OpenSpec: GitHub Discussions, Community forum

### Training
- BMAD: Official certification course
- SpecKit: GitHub Skills course
- OpenSpec: Community tutorials

## Next Steps

After completing this getting started guide:

1. **Read Framework Comparison** to understand deeper differences
2. **Study Foundational Theory** to understand the "why"
3. **Explore Adjacent Technologies** to enhance your SDD practice
4. **Join Community** discussions and share your experience
5. **Contribute** to frameworks and documentation

## Conclusion

Getting started with specification-driven development is an investment in code quality, team collaboration, and development velocity. Choose the framework that best fits your context, start small, and incrementally expand your specification coverage.

Remember:
- Start with high-value components
- Get team buy-in early
- Iterate on specification quality
- Automate verification continuously
- Share successes and learnings

---

*This guide was created with AI assistance. Installation instructions and commands based on BMAD, SpecKit, and OpenSpec official documentation as of January 2026.*
