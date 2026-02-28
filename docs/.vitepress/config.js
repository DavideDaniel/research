import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { RssPlugin } from 'vitepress-plugin-rss'

const siteHostname = 'https://daviddaniel.tech'
const siteBase = '/research'
const siteUrl = `${siteHostname}${siteBase}`
const siteName = 'Research'
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
    titleTemplate: ':title | David Daniel Research',
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
            priority: item.url === '' || item.url === '/' ? 1.0 : (item.url.includes('papers/') || item.url.includes('articles/')) ? 0.8 : 0.6
          }
        })
      }
    },

    // Enable last updated timestamps for sitemap
    lastUpdated: true,

    // Clean URLs without .html extension
    cleanUrls: true,

    // Ignore dead links to external anchor targets that may not resolve at build time
    ignoreDeadLinks: [],

    // Global head configuration
    head: [
      // Basic meta tags
      ['meta', { name: 'author', content: 'David Daniel' }],
      ['meta', { name: 'keywords', content: 'spec-driven development, software architecture, development frameworks, BDD, contract testing, agentic tools, AI development, Claude Code, Cursor' }],
      ['meta', { name: 'robots', content: 'index, follow' }],

      // Open Graph base tags
      ['meta', { property: 'og:site_name', content: 'David Daniel Research' }],
      ['meta', { property: 'og:locale', content: 'en_US' }],

      // Twitter card base tags
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:site', content: '@davidedaniel' }],

      // Default OG image
      ['meta', { property: 'og:image', content: 'https://daviddaniel.tech/research/og-image.svg' }],
      ['meta', { name: 'twitter:image', content: 'https://daviddaniel.tech/research/og-image.svg' }],

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

      // Page metadata
      const title = pageData.frontmatter.title || pageData.title || siteName
      const description = pageData.frontmatter.description || siteDescription

      // Determine page type
      const isPaperPage = pageData.relativePath.includes('papers/') && !pageData.relativePath.endsWith('papers/index.md')
      const isArticlePage = pageData.relativePath.includes('articles/') && !pageData.relativePath.endsWith('articles/index.md')
      const isContentPage = isPaperPage || isArticlePage

      // Open Graph tags (og:type is dynamic: 'article' for individual papers/articles, 'website' for listing/index pages)
      head.push(['meta', { property: 'og:title', content: title }])
      head.push(['meta', { property: 'og:description', content: description }])
      head.push(['meta', { property: 'og:url', content: canonicalUrl }])
      head.push(['meta', { property: 'og:type', content: isContentPage ? 'article' : 'website' }])

      // Twitter card tags
      head.push(['meta', { name: 'twitter:title', content: title }])
      head.push(['meta', { name: 'twitter:description', content: description }])

      // Structured data: TechArticle for individual paper and article pages
      if (isPaperPage || isArticlePage) {
        const structuredData = {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: title,
          description: description,
          author: {
            '@type': 'Person',
            name: 'David Daniel',
            url: 'https://daviddaniel.tech'
          },
          publisher: {
            '@type': 'Person',
            name: 'David Daniel'
          },
          url: canonicalUrl,
          datePublished: pageData.frontmatter.date
            ? new Date(pageData.frontmatter.date).toISOString().split('T')[0]
            : '2026-01-01',
          dateModified: pageData.lastUpdated
            ? new Date(pageData.lastUpdated).toISOString().split('T')[0]
            : (pageData.frontmatter.date
              ? new Date(pageData.frontmatter.date).toISOString().split('T')[0]
              : '2026-01-01')
        }

        head.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify(structuredData)
        ])
      }

      // Structured data: WebPage for index and listing pages
      if (pageData.relativePath === 'index.md' || pageData.relativePath === 'papers/index.md' || pageData.relativePath === 'articles/index.md') {
        head.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description: description,
            url: canonicalUrl,
            author: {
              '@type': 'Person',
              name: 'David Daniel',
              url: 'https://daviddaniel.tech'
            }
          })
        ])
      }

      // Structured data: BreadcrumbList for navigation
      const breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://daviddaniel.tech'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Research',
          item: `${siteUrl}/`
        }
      ]

      if (isContentPage) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: canonicalUrl
        })
      }

      head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems
        })
      ])

      pageData.frontmatter.head = head
    },

    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Articles', link: '/articles/' },
        { text: 'Papers', link: '/papers/' }
      ],

      sidebar: {
        '/articles/specification-layer/': [
          {
            text: 'Scaling Agentic Development',
            items: [
              { text: 'The Specification Layer', link: '/articles/specification-layer/' },
              { text: 'The Autonomous Agents Loop', link: '/articles/autonomous-agents-loop/' }
            ]
          }
        ],
        '/articles/autonomous-agents-loop/': [
          {
            text: 'Scaling Agentic Development',
            items: [
              { text: 'The Specification Layer', link: '/articles/specification-layer/' },
              { text: 'The Autonomous Agents Loop', link: '/articles/autonomous-agents-loop/' }
            ]
          }
        ],
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
