import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Technical Documentation',
  description: 'In-depth technical analysis on software development frameworks and engineering practices',
  base: '/research/',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/papers/' },
      { text: 'GitHub', link: 'https://github.com/DavideDaniel/research' }
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DavideDaniel/research' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 David Daniel'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/DavideDaniel/research/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  },

  head: [
    ['meta', { name: 'author', content: 'David Daniel' }],
    ['meta', { name: 'keywords', content: 'spec-driven development, software architecture, development frameworks, BDD, contract testing' }]
  ],

  markdown: {
    lineNumbers: true
  }
})
