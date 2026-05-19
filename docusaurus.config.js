// @ts-check
const {themes} = require('prism-react-renderer');

const config = {
  title: 'FDE 学习中心',
  tagline: 'AI 前沿部署工程师 — 从入门到实战的一条龙平台',
  favicon: 'img/favicon.ico',
  url: 'https://luoboask.github.io',
  baseUrl: '/fde-learning/',
  organizationName: 'luoboask',
  projectName: 'fde-learning',
  trailingSlash: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: 'learn',
          path: 'docs',
          sidebarPath: './sidebars/learn.js',
          editUrl: 'https://github.com/luoboask/fde-learning/edit/master/',
          routeBasePath: '/',
          numberPrefixParser: false,
          sidebarCollapsed: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'opensource',
        path: 'docs-opensource',
        routeBasePath: 'opensource',
        tagsBasePath: 'tags',
        sidebarPath: './sidebars/opensource.js',
        editUrl: 'https://github.com/luoboask/fde-learning/edit/master/',
        numberPrefixParser: false,
        sidebarCollapsed: true,
        includeCurrentVersion: true,
        versions: {},
        exclude: ['**/_*.{js,jsx,ts,tsx}', '**/_*.json', '**/__tests__/**', '**/node_modules/**'],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tools',
        path: 'docs-tools',
        routeBasePath: 'tools',
        tagsBasePath: 'tags',
        sidebarPath: './sidebars/tools.js',
        editUrl: 'https://github.com/luoboask/fde-learning/edit/master/',
        numberPrefixParser: false,
        sidebarCollapsed: true,
        includeCurrentVersion: true,
        versions: {},
        exclude: ['**/_*.{js,jsx,ts,tsx}', '**/_*.json', '**/__tests__/**', '**/node_modules/**'],
      },
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'FDE 学习中心',
        logo: {
          alt: 'FDE Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            docsPluginId: 'learn',
            sidebarId: 'learnSidebar',
            position: 'left',
            label: '系统学习',
          },
          {
            type: 'dropdown',
            label: '源码解读',
            position: 'left',
            items: [
              { to: '/opensource/', label: '导航图' },
              { to: '/opensource/nanogpt', label: 'nanoGPT' },
              { to: '/opensource/llm-c', label: 'llm.c' },
              { to: '/opensource/llama-cpp', label: 'llama.cpp' },
              { to: '/opensource/vllm', label: 'vLLM' },
              { to: '/opensource/sglang', label: 'SGLang' },
            ],
          },
          {
            type: 'dropdown',
            label: '工具教程',
            position: 'left',
            items: [
              { to: '/tools/', label: '全部工具' },
            ],
          },
          {
            type: 'dropdown',
            label: '趋势与招聘',
            position: 'left',
            items: [
              { to: '/trends/', label: 'AI 行业趋势' },
              { to: '/jobs/', label: 'FDE 招聘动态' },
            ],
          },
          {
            href: 'https://github.com/luoboask/fde-learning',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '系统学习',
            items: [
              {label: '入门：什么是 FDE', to: '/01-basics/01-what-is-fde'},
              {label: '模型架构', to: '/02-model-architecture/transformer-overview'},
              {label: '推理引擎', to: '/04-inference-optimization/engine-overview'},
              {label: '生产部署', to: '/07-production-deployment/deployment-architecture'},
              {label: '面试答题框架', to: '/12-interview/interview-framework'},
            ],
          },
          {
            title: '实战',
            items: [
              {label: '源码解读教程', to: '/opensource/'},
              {label: '工具教程', to: '/tools/'},
              {label: '动手实验', to: '/09-labs/'},
              {label: '成本运营', to: '/08-cost-operations/cost-breakdown'},
            ],
          },
          {
            title: '更多',
            items: [
              {label: 'AI 行业趋势', to: '/trends/'},
              {label: 'FDE 招聘动态', to: '/jobs/'},
              {label: '团队建设', to: '/14-team-building/'},
            ],
          },
        ],
        copyright: `FDE Learning Center`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
    }),
};

module.exports = config;
