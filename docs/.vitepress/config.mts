import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'GitWyrm',
  description: 'Documentation for GitWyrm, a fast, focused Git client for Windows and Linux.',
  lang: 'en-US',

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#121212' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'GitWyrm' }],
  ],

  themeConfig: {
    siteTitle: 'GitWyrm',
    logo: '/logo.png',

    nav: [
      { text: 'GitWyrm.com', link: 'https://gitwyrm.com' },
      { text: 'Guide', link: '/guide/getting-started' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Install on Linux', link: '/guide/install-linux' },
        ],
      },
      {
        text: 'Deployment',
        items: [{ text: 'Enterprise Deployment', link: '/guide/enterprise-deployment' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/Wutname1/GitWyrm' }],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/Wutname1/GitWyrm-Docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
})
