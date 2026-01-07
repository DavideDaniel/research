# Repository Setup Instructions

This document provides step-by-step instructions for setting up the GitHub repository and deploying the VitePress documentation site.

## Prerequisites

- GitHub account (username: DavideDaniel)
- Git installed locally
- Node.js 20+ installed locally

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Set repository name: `research`
3. Set description: "Technical research papers and documentation on software development frameworks, AI-powered development, and engineering practices"
4. Set visibility: Public
5. Check "Add a README file"
6. Add .gitignore: Node
7. Click "Create repository"

## Step 2: Clone and Set Up Repository Locally

```bash
# Clone the repository
git clone https://github.com/DavideDaniel/research.git
cd research

# Copy all files from this research-repo directory
# (Use the files created in /home/claude/research-repo)

# Remove the default README if it exists
rm README.md

# Copy all files
cp -r /path/to/research-repo/* .
cp -r /path/to/research-repo/.github .
cp /path/to/research-repo/.gitignore .

# Install dependencies
npm install

# Test locally
npm run docs:dev
# Visit http://localhost:5173 to preview

# Commit all files
git add .
git commit -m "Initial commit: VitePress documentation with SDD frameworks paper"
git push origin main
```

## Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section (left sidebar)
3. Under "Build and deployment":
   - Source: GitHub Actions
4. The GitHub Actions workflow will automatically run on the next push

## Step 4: Verify Deployment

1. Go to repository Actions tab
2. Wait for "Deploy VitePress site to Pages" workflow to complete
3. Once complete, visit: https://davidedaniel.github.io/research/

## Step 5: Update Repository Settings (Optional)

1. Go to repository Settings
2. Add topics: `research`, `documentation`, `spec-driven-development`, `software-architecture`
3. Set website URL: https://davidedaniel.github.io/research/
4. Add description and tags as needed

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## File Structure

```
research/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── docs/
│   ├── .vitepress/
│   │   └── config.js          # VitePress configuration
│   ├── index.md               # Landing page
│   ├── papers/
│   │   ├── index.md           # Papers listing
│   │   └── sdd-frameworks/
│   │       ├── index.md       # Paper overview
│   │       ├── getting-started.md
│   │       ├── frameworks-comparison.md
│   │       ├── foundational-theory.md
│   │       └── adjacent-technologies.md
├── .gitignore
├── package.json
└── README.md
```

## Troubleshooting

### Build Fails
- Check Node.js version (requires 20+)
- Run `npm install` to ensure dependencies are installed
- Check for syntax errors in markdown files

### Pages Not Deploying
- Verify GitHub Actions workflow has write permissions
- Check Actions tab for error messages
- Ensure Pages is set to "GitHub Actions" source

### 404 on Deployment
- Verify base URL in docs/.vitepress/config.js is set to '/research/'
- Clear browser cache
- Check that workflow completed successfully

## Updating Content

### Adding a New Paper

1. Create new directory: `docs/papers/new-paper-name/`
2. Add paper files (index.md, sections, etc.)
3. Update `docs/.vitepress/config.js` sidebar configuration
4. Update `docs/papers/index.md` to list new paper
5. Commit and push changes

### Updating Existing Paper

1. Edit markdown files in `docs/papers/sdd-frameworks/`
2. Test locally with `npm run docs:dev`
3. Commit and push changes
4. GitHub Actions will automatically rebuild and deploy

## Next Steps

After setup is complete:

1. Review live site at https://davidedaniel.github.io/research/
2. Test all navigation links
3. Verify search functionality works
4. Check mobile responsiveness
5. Share with team for feedback

## Support

For issues or questions:
- Open an issue in the GitHub repository
- Check VitePress documentation: https://vitepress.dev
- Review GitHub Pages documentation: https://docs.github.com/pages
