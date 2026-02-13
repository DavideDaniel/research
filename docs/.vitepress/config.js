import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { RssPlugin } from 'vitepress-plugin-rss'

const siteHostname = 'https://daviddaniel.tech'
const siteBase = '/research'
const siteUrl = `${siteHostname}${siteBase}`
const siteName = 'Research Papers'
const siteDescription = 'In-depth technical analysis on software development frameworks, AI-powered development, and engineering practices'

const rssOptions = {
  title: 'Research Papers - Technical Analysis on Software Development',
  baseUrl: siteHostname,
  description: siteDescription,
  copyright: 'Copyright (c) 2026, David Daniel',
  author: {
    name: 'David Daniel',
    link: 'https://github.com/DavideDaniel'
  },
  filename: 'feed.rss',
  ignoreHome: true,
  log: true
}

export default withMermaid(
  defineConfig({
    title: siteName,
    description: siteDescription,
    base: '/research/',

    // Sitemap configuration
    sitemap: {
      hostname: siteHostname,
      transformItems: (items) => {
        return items.map(item => {
          // Prepend base path if not already present
          const url = item.url.startsWith(siteBase) ? item.url : `${siteBase}${item.url.startsWith('/') ? '' : '/'}${item.url}`
          return {
            ...item,
            url,
            changefreq: 'monthly',
            priority: item.url === '' || item.url === '/' ? 1.0 : item.url.includes('papers/') ? 0.8 : 0.6
          }
        })
      }
    },

    // Enable last updated timestamps for sitemap
    lastUpdated: true,

    // Clean URLs without .html extension
    cleanUrls: true,

    // Ignore dead links to companion articles not yet published
    ignoreDeadLinks: [
      /\/articles\//
    ],

    // Global head configuration
    head: [
      // Basic meta tags
      ['meta', { name: 'author', content: 'David Daniel' }],
      ['meta', { name: 'keywords', content: 'spec-driven development, software architecture, development frameworks, BDD, contract testing, agentic tools, AI development, Claude Code, Cursor' }],
      ['meta', { name: 'robots', content: 'index, follow' }],

      // Canonical base (pages will override with specific URLs)
      ['link', { rel: 'canonical', href: `${siteUrl}/` }],

      // Open Graph base tags
      ['meta', { property: 'og:site_name', content: siteName }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:locale', content: 'en_US' }],

      // Twitter card base tags
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:site', content: '@davidedaniel' }],

      // Theme color
      ['meta', { name: 'theme-color', content: '#3eaf7c' }],

      // RSS autodiscovery
      ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/research/feed.rss' }]
    ],

    // Dynamic head tags based on page content
    transformPageData(pageData) {
      const canonicalUrl = `${siteUrl}/${pageData.relativePath}`
        .replace(/index\.md$/, '')
        .replace(/\.md$/, '')

      // Build page-specific head tags
      const head = pageData.frontmatter.head || []

      // Add canonical URL
      head.push(['link', { rel: 'canonical', href: canonicalUrl }])

      // Add Open Graph tags
      const title = pageData.frontmatter.title || pageData.title || siteName
      const description = pageData.frontmatter.description || siteDescription

      head.push(['meta', { property: 'og:title', content: title }])
      head.push(['meta', { property: 'og:description', content: description }])
      head.push(['meta', { property: 'og:url', content: canonicalUrl }])

      // Twitter card tags
      head.push(['meta', { name: 'twitter:title', content: title }])
      head.push(['meta', { name: 'twitter:description', content: description }])

      // Add structured data for paper pages
      if (pageData.relativePath.includes('papers/') && !pageData.relativePath.endsWith('papers/index.md')) {
        const structuredData = {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: title,
          description: description,
          author: {
            '@type': 'Person',
            name: 'David Daniel'
          },
          publisher: {
            '@type': 'Person',
            name: 'David Daniel'
          },
          url: canonicalUrl,
          datePublished: '2026-01-01',
          dateModified: new Date().toISOString().split('T')[0]
        }

        head.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify(structuredData)
        ])
      }

      pageData.frontmatter.head = head
    },

    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Papers', link: '/papers/' }
      ],

      sidebar: {
        '/papers/sdd-frameworks/': [
          {
            text: 'Spec-Driven Development Framework Patterns',
            items: [
              { text: 'Overview', link: '/papers/sdd-frameworks/' },
              { text: 'Getting Started', link: '/papers/sdd-frameworks/getting-started' },
              { text: 'Framework Comparison', link: '/papers/sdd-frameworks/frameworks-comparison' },
              { text: 'Foundational Theory', link: '/papers/sdd-frameworks/foundational-theory' },
              { text: 'Adjacent Technologies', link: '/papers/sdd-frameworks/adjacent-technologies' }
            ]
          }
        ],
        '/papers/agentic-tools/': [
          {
            text: 'Agentic Development Tools',
            items: [
              { text: 'Overview', link: '/papers/agentic-tools/' },
              { text: 'Terminology & Taxonomy', link: '/papers/agentic-tools/terminology-taxonomy' },
              { text: 'Tool Analysis', link: '/papers/agentic-tools/tool-analysis' },
              { text: 'Comparative Analysis', link: '/papers/agentic-tools/comparative-analysis' },
              { text: 'References & Resources', link: '/papers/agentic-tools/references' }
            ]
          }
        ],
        '/papers/autonomous-agents/': [
          {
            text: 'Autonomous AI Agents: Execution Loops vs Interactive Assistance',
            items: [
              { text: 'Overview', link: '/papers/autonomous-agents/' },
              { text: 'SWE-bench & Multi-Agent Execution', link: '/papers/autonomous-agents/benchmarks' },
              { text: 'Developer Productivity Evidence', link: '/papers/autonomous-agents/productivity-evidence' },
              { text: 'Adjacent Domains & Mechanisms', link: '/papers/autonomous-agents/adjacent-domains' },
              { text: 'Conclusions & References', link: '/papers/autonomous-agents/conclusions' }
            ]
          }
        ]
      },

      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2026 David Daniel'
      },

      search: {
        provider: 'local'
      },

      lastUpdated: {
        text: 'Updated at',
        formatOptions: {
          dateStyle: 'full',
          timeStyle: 'medium'
        }
      }
    },

    markdown: {
      lineNumbers: true
    },

    vite: {
      plugins: [RssPlugin(rssOptions)]
    }
  })
)
