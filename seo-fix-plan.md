# SEO Fix Plan: Addressing Audit Gaps

## Audit vs. Reality: Triage Summary

After building the site and inspecting the rendered HTML output, many audit findings are **already resolved in code**. The audit appears to have been conducted against a cached or pre-deployment state. Here's what's actually needed:

### Already Implemented (No Action Required)

| Audit Item | Status | Evidence |
|---|---|---|
| 1.1 No Sitemap | **DONE** | Built-in VitePress sitemap generates 20 URLs at `/research/sitemap.xml` with correct hostname |
| 1.2 No robots.txt | **DONE** | Exists at `docs/public/robots.txt` with sitemap directive (deploys to `/research/robots.txt`) |
| 2.1 No Meta Descriptions | **DONE** | All 20 markdown files have `description` frontmatter; renders as `<meta name="description">` in HTML |
| 2.2 No OG/Twitter Tags | **DONE** | Global + per-page OG/Twitter tags via `transformPageData` in config.js |
| 2.3 No Canonical URLs | **DONE** | Per-page `<link rel="canonical">` with correct `daviddaniel.tech/research/` prefix; no duplicates |
| 2.4 No Structured Data | **DONE** | JSON-LD `TechArticle` schema on all paper/article pages with datePublished/dateModified |
| 3.3 No Publication Dates | **DONE** | `date` frontmatter on all pages; `lastUpdated: true` enabled in config |

### Actual Remaining Gaps (Action Required)

---

## Fix 1: OG Image Format (P1 - Social Sharing Broken)

**Problem:** The OG image (`docs/public/og-image.svg`) is SVG format. Facebook, LinkedIn, Twitter/X, and Slack **do not render SVG** as OG preview images. Social shares currently show no image preview.

**Fix:** Convert the SVG to PNG format (1200x630px) and update the reference in config.js.

**Files:**
- `docs/public/og-image.png` (new - generated from existing SVG design)
- `docs/.vitepress/config.js` lines 74-75: change `og-image.svg` to `og-image.png`

---

## Fix 2: README Update (P1 - Incomplete Content Listing)

**Problem:** README only lists 1 of 3 papers and 0 of 2 articles. Missing content:
- Paper: Agentic Development Tools (Jan 2026)
- Paper: Autonomous AI Agents (Feb 2026)
- Article: The Specification Layer (Feb 2026)
- Article: The Autonomous Agents Loop (Feb 2026)

**Fix:** Update README.md to list all published research with descriptions and links.

**Files:**
- `README.md` - Add all papers and articles, add build status badge

---

## Fix 3: BreadcrumbList Structured Data (P2 - SERP Enhancement)

**Problem:** No `BreadcrumbList` schema exists. Google uses this for breadcrumb navigation display in search results (e.g., "Research > Papers > SDD Frameworks").

**Fix:** Add BreadcrumbList JSON-LD in the `transformPageData` hook, generated dynamically from the page's `relativePath`.

**Files:**
- `docs/.vitepress/config.js` - Add BreadcrumbList schema generation in `transformPageData`

---

## Fix 4: WebSite Schema on Homepage (P2 - Search Feature Visibility)

**Problem:** No `WebSite` schema with `SearchAction` on the homepage. This can enable a sitelinks search box in Google results.

**Fix:** Add WebSite JSON-LD on the homepage (detected via `relativePath === 'index.md'`) in `transformPageData`.

**Files:**
- `docs/.vitepress/config.js` - Add WebSite schema for homepage

---

## Fix 5: About/Author Page (P2 - E-E-A-T Signals)

**Problem:** No author bio page. Google's quality guidelines emphasize author credibility for technical content. No `Person` schema links the author to articles.

**Fix:** Create `docs/about.md` with author bio, professional links, and `Person` schema. Add to nav.

**Files:**
- `docs/about.md` (new)
- `docs/.vitepress/config.js` - Add "About" to nav bar

---

## Fix 6: CLAUDE.md SEO Rules Enhancement (P2 - Regression Prevention)

**Problem:** The CLAUDE.md has an SEO section but is missing rules the audit recommends: URL slug preservation, cross-link requirements, build validation.

**Fix:** Add specific SEO guard rails to CLAUDE.md per audit section 7.1.

**Files:**
- `CLAUDE.md` - Enhance SEO Requirements section

---

## Out of Scope (Manual Steps for David)

These items from the audit require manual action outside of code:

| Item | Action | Where |
|---|---|---|
| 1.3 Google Search Console | Verify domain ownership, submit sitemap | [search.google.com/search-console](https://search.google.com/search-console) |
| 6.1 GitHub Topics | Add: `claude-code`, `cursor`, `agentic-coding`, `sdd`, `bmad-method` | GitHub repo Settings |
| 6.3 Social Preview | Upload a 1280x640px repo social preview image | GitHub repo Settings |
| robots.txt at domain root | The file deploys to `/research/robots.txt` not the domain root; would need separate hosting config | Domain/hosting config |

## Out of Scope (Content Changes - Per User Request)

These audit items involve modifying article/paper body content:

| Item | Why Excluded |
|---|---|
| 3.1 Cross-links between papers | Requires modifying article content |
| 4.3 New content (Decision Guide, Glossary, etc.) | New articles, not SEO infrastructure |

---

## Implementation Order

1. Fix 1: OG Image (most impactful for social sharing)
2. Fix 2: README (quick win, improves GitHub discoverability)
3. Fix 3: BreadcrumbList Schema (improves SERP display)
4. Fix 4: WebSite Schema (improves homepage SERP)
5. Fix 5: About Page (E-E-A-T, adds new page to sitemap)
6. Fix 6: CLAUDE.md Enhancement (prevents regressions)

All fixes are additive (no content modifications, no URL changes) and can be shipped in a single PR.
