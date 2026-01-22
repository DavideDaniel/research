import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const siteUrl = 'https://davidedaniel.github.io/research'
const siteTitle = 'Research Papers'
const siteDescription = 'In-depth technical analysis on software development frameworks, AI-powered development tools, and engineering practices for software architects and engineering professionals.'

export default withMermaid(
  defineConfig({
    title: siteTitle,
    description: siteDescription,
    base: '/research/',
    lang: 'en-US',
    lastUpdated: true,

    sitemap: {
      hostname: siteUrl
    },

    head: [
      ['meta', { charset: 'utf-8' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      ['meta', { name: 'author', content: 'David Daniel' }],
      ['meta', { name: 'keywords', content: 'spec-driven development, software architecture, development frameworks, BDD, contract testing, agentic tools, Claude Code, AI development' }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['link', { rel: 'canonical', href: siteUrl }],
      // Open Graph
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:locale', content: 'en_US' }],
      ['meta', { property: 'og:site_name', content: siteTitle }],
      ['meta', { property: 'og:title', content: siteTitle }],
      ['meta', { property: 'og:description', content: siteDescription }],
      ['meta', { property: 'og:url', content: siteUrl }],
      // Twitter Card
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: siteTitle }],
      ['meta', { name: 'twitter:description', content: siteDescription }],
    ],

    transformPageData(pageData) {
      const canonicalUrl = `${siteUrl}/${pageData.relativePath}`
        .replace(/index\.md$/, '')
        .replace(/\.md$/, '.html')

      pageData.frontmatter.head ??= []
      pageData.frontmatter.head.push(
        ['link', { rel: 'canonical', href: canonicalUrl }],
        ['meta', { property: 'og:url', content: canonicalUrl }]
      )

      if (pageData.frontmatter.description) {
        pageData.frontmatter.head.push(
          ['meta', { property: 'og:description', content: pageData.frontmatter.description }],
          ['meta', { name: 'twitter:description', content: pageData.frontmatter.description }]
        )
      }

      if (pageData.title) {
        const fullTitle = `${pageData.title} | ${siteTitle}`
        pageData.frontmatter.head.push(
          ['meta', { property: 'og:title', content: fullTitle }],
          ['meta', { name: 'twitter:title', content: fullTitle }]
        )
      }
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
    }
  })
)
