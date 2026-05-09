// @ts-check
const {themes} = require('prism-react-renderer');

const config = {
  title: 'FDE 学习中心',
  tagline: 'AI 前沿部署工程师 — 从入门到面试的系统学习路径',
  favicon: 'img/favicon.ico',
  url: 'https://your-username.github.io',
  baseUrl: '/',
  organizationName: 'your-username',
  projectName: 'fde-learning',
  trailingSlash: false,
  onBrokenLinks: 'throw',
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
          sidebarPath: './sidebars.js',
          editUrl: undefined,
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
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
            href: 'https://github.com/your-username/fde-learning',
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
              {label: '入门篇 — 基础认知', to: '/docs/01-basics/01-what-is-fde'},
              {label: '进阶篇 — 核心技术', to: '/docs/02-transformer-basics/transformer-overview'},
              {label: '实战篇 — 生产部署', to: '/docs/07-deployment/deployment-architecture'},
              {label: '面试篇 — 答题框架', to: '/docs/10-interview/interview-framework'},
            ],
          },
          {
            title: '进阶',
            items: [
              {label: '推理引擎', to: '/docs/03-inference-engines/engine-overview'},
              {label: '模型量化', to: '/docs/04-quantization/quantization-basics'},
              {label: 'GPU 基础', to: '/docs/05-gpu-basics/gpu-overview'},
              {label: '成本优化', to: '/docs/08-cost/cost-breakdown'},
            ],
          },
          {
            title: '管理',
            items: [
              {label: '团队建设', to: '/docs/11-team-building/team-culture'},
              {label: '培养体系', to: '/docs/11-team-building/growth-path'},
            ],
          },
        ],
        copyright: `Built with Docusaurus`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),
};

module.exports = config;
