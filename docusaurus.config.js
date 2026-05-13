// @ts-check
const {themes} = require('prism-react-renderer');

const config = {
  title: 'FDE 学习中心',
  tagline: 'AI 前沿部署工程师 — 从入门到面试的系统学习路径',
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
          path: 'docs',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/luoboask/fde-learning/edit/master/',
          routeBasePath: '/',
          numberPrefixParser: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
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
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '学习路径',
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
            title: '学习路径',
            items: [
              {label: 'AI 基础认知', to: '/01-ai-basics/01-what-is-fde'},
              {label: '模型架构', to: '/02-model-architecture/transformer-overview'},
              {label: '生产部署', to: '/06-production-deployment/deployment-architecture'},
              {label: '面试答题框架', to: '/10-interview/interview-framework'},
            ],
          },
          {
            title: '进阶',
            items: [
              {label: '推理优化', to: '/04-inference-optimization/engine-overview'},
              {label: '模型量化', to: '/04-inference-optimization/quantization-basics'},
              {label: 'GPU 基础', to: '/03-gpu-basics/gpu-overview'},
              {label: '成本运营', to: '/08-cost-operations/cost-breakdown'},
            ],
          },
          {
            title: '管理',
            items: [
              {label: '团队建设', to: '/11-team-building/team-culture'},
              {label: '开源解读', to: '/17-open-source-deep-dive'},
            ],
          },
        ],
        copyright: `FDE Learning Center`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),
};

module.exports = config;
