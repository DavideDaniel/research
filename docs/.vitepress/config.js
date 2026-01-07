import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Research Papers',
  description: 'Technical research on software development frameworks and engineering practices',
  base: '/research/',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Papers', link: '/papers/' },
      { text: 'GitHub', link: 'https://github.com/DavideDaniel/research' }
    ],

    sidebar: {
      '/papers/sdd-frameworks/': [
        {
          text: 'Spec-Driven Development Frameworks',
          items: [
            { text: 'Overview', link: '/papers/sdd-frameworks/' },
            { text: 'Getting Started', link: '/papers/sdd-frameworks/getting-started' },
            { text: 'Framework Comparison', link: '/papers/sdd-frameworks/frameworks-comparison' },
            { text: 'Foundational Theory', link: '/papers/sdd-frameworks/foundational-theory' },
            { text: 'Adjacent Technologies', link: '/papers/sdd-frameworks/adjacent-technologies' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/DavideDaniel/research' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Davide Daniel'
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
    ['meta', { name: 'author', content: 'Davide Daniel' }],
    ['meta', { name: 'keywords', content: 'spec-driven development, software architecture, development frameworks, BDD, contract testing' }]
  ],

  markdown: {
    lineNumbers: true
  }
})
