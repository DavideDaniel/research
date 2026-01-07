# CLAUDE.md - Research Repository Context

## Project Overview

This is a technical research repository hosting comprehensive research papers on software development frameworks, AI-powered development, and modern engineering practices. The repository uses VitePress to publish professional documentation at https://davidedaniel.github.io/research/.

## Repository Purpose

**Primary Goal:** Publish in-depth technical research papers for software architects, development team leads, and engineering professionals.

**Content Focus Areas:**
- Software development frameworks and methodologies
- AI-powered development tools and practices
- Specification-driven development (SDD)
- Software architecture patterns
- DevOps and automation
- Engineering best practices

**Target Audience:** Professional software engineers, architects, team leads, and technical decision-makers evaluating modern development practices for enterprise adoption.

## Current State

### Published Papers
1. **Spec-Driven Development Frameworks** (January 2026)
   - Location: `docs/papers/sdd-frameworks/`
   - Content: ~29,000 words
   - Sections: Getting Started, Framework Comparison, Foundational Theory, Adjacent Technologies
   - Frameworks covered: BMAD, SpecKit, OpenSpec
   - Related technologies: MetaGPT, Momentic, Pact, Cucumber, BDD frameworks

### Repository Structure
```
research/
├── .github/workflows/deploy.yml    # GitHub Pages deployment
├── docs/
│   ├── .vitepress/config.js        # VitePress configuration
│   ├── index.md                    # Landing page
│   ├── papers/
│   │   ├── index.md                # Papers listing
│   │   └── sdd-frameworks/         # First research paper
│   │       ├── index.md
│   │       ├── getting-started.md
│   │       ├── frameworks-comparison.md
│   │       ├── foundational-theory.md
│   │       └── adjacent-technologies.md
├── package.json
└── README.md
```

## Writing Style and Guidelines

### Tone and Voice
- **Professional yet accessible** - Technical without being overly academic
- **Practical focus** - Implementation guidance over pure theory
- **No emojis or icons** - Clean, professional presentation
- **No em dashes** - Use commas, semicolons, colons, or parentheses instead
- **Evidence-based** - Back claims with examples and patterns
- **Balanced perspective** - Present multiple viewpoints fairly

### Content Requirements
- Comprehensive analysis with specific examples
- Decision matrices and comparison tables when needed
- Verified real-world implementation patterns
- Code examples where relevant
- Clear navigation and cross-referencing
- Proper attribution for frameworks and sources

### Disclaimer Format
Every paper ends with:
```
---
*This analysis was created with AI assistance. [Specific frameworks/sources referenced]. [Data currency note].*
```

## Technical Stack

**Documentation Framework:** VitePress 1.0+
**Deployment:** GitHub Pages via GitHub Actions
**Languages:** Markdown with YAML frontmatter
**Features:** 
- Full-text search
- Responsive navigation
- Dark mode support
- Mobile-friendly design

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Adding New Papers

### Process for New Research Paper

1. **Create paper directory:**
   ```bash
   mkdir -p docs/papers/[paper-name]/
   ```

2. **Required files:**
   - `index.md` - Paper overview and navigation
   - `[section-name].md` - Individual sections
   - At least 3-5 substantial sections

3. **Update navigation:**
   - Edit `docs/.vitepress/config.js` to add sidebar entries
   - Update `docs/papers/index.md` to list new paper

4. **Content requirements:**
   - Minimum 15,000 words total
   - Professional technical writing
   - Code examples and patterns
   - Comparison matrices where applicable
   - Proper attribution and disclaimers

### Paper Structure Template

```markdown
# [Paper Title]

## Overview
Brief introduction to the topic, why it matters, what will be covered.

## Target Audience
Who should read this paper.

## Content Organization
List of sections with brief descriptions.

## Key Takeaways
What readers will learn.

---

*Disclaimer with AI assistance note and sources.*
```

## GitHub Integration

### Branches
- `main` - Production branch, auto-deploys to GitHub Pages
- `draft/[paper-name]` - Work-in-progress papers
- Feature branches for updates

### Pull Request Process
1. Create branch from `main`
2. Add/update content
3. Test locally with `npm run docs:dev`
4. Create PR with description
5. Review and merge to `main`
6. Auto-deployment triggers

### Deployment
- Automatic via GitHub Actions on push to `main`
- Workflow: `.github/workflows/deploy.yml`
- Live site: https://davidedaniel.github.io/research/
- Build time: 2-3 minutes

## Content Guidelines for AI Assistants

When working on this repository:

1. **Maintain consistency** with existing paper structure and tone
2. **No GitHub stars metrics** - Focus on maturity, capabilities, adoption
3. **Professional tone** - No emojis, minimal formatting, prose over bullets
4. **Comprehensive analysis** - Deep dives, not surface-level overviews
5. **Practical examples** - Code snippets, workflows, decision matrices
6. **Proper attribution** - Always note frameworks and sources researched
7. **Cross-reference** - Link between related sections and papers

## Future Paper Ideas

Potential topics for expansion:
- AI-powered code review and quality assurance
- Modern software architecture patterns for AI systems
- DevOps automation and infrastructure as code
- Large language model integration in development workflows
- Testing strategies for AI-powered applications
- Contract testing at scale
- Multi-agent orchestration patterns
- Engineering team productivity tools

## Maintenance

### Regular Updates
- Review and update framework versions quarterly
- Add new enterprise adoption patterns as they emerge
- Refresh examples and code snippets
- Update ecosystem integration patterns

### Quality Checks
- All links functional
- Search functionality working
- Mobile responsiveness verified
- Build completes without errors
- Navigation paths correct

## Contact and Contribution

**Repository Owner:** David Daniel  
**GitHub:** https://github.com/DavideDaniel/research

**Contributions Welcome:**
- Issue reports for corrections
- Pull requests for improvements
- Discussions for new paper topics
- Enterprise adoption stories

## Current Tasks and Next Steps

### Immediate (Now)
- [ ] Push repository to GitHub
- [ ] Enable GitHub Pages
- [ ] Verify deployment successful
- [ ] Test all navigation links
- [ ] Confirm search functionality

### Short-term (This Month)
- [ ] Add paper navigation improvements
- [ ] Create paper templates
- [ ] Begin research for second paper
- [ ] Gather community feedback

### Long-term (This Quarter)
- [ ] Publish second research paper
- [ ] Add advanced search features
- [ ] Create visual diagrams for frameworks
- [ ] Build paper recommendation system

## Notes for Claude Code Integration

When using Claude Code to work on this repository:

1. **Initialize git first:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: VitePress documentation with SDD frameworks paper"
   ```

2. **Connect to GitHub:**
   ```bash
   git remote add origin https://github.com/DavideDaniel/research.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Repository Settings → Pages → Source: GitHub Actions

4. **Development workflow:**
   - Use `npm run docs:dev` for live preview
   - Test changes locally before committing
   - Push to main triggers auto-deployment

5. **Common tasks:**
   - Adding papers: Follow "Adding New Papers" section above
   - Updating content: Edit markdown files directly
   - Navigation changes: Update `docs/.vitepress/config.js`
   - Styling: VitePress default theme (minimal customization needed)

---

**Last Updated:** January 7, 2026  
**Repository Status:** Ready for initial deployment  
**Current Papers:** 1 (SDD Frameworks)