// @ts-check
// sidebars/tools.js — 工具教程侧边栏
const sidebars = {
  toolsSidebar: [
    {
      type: 'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: '2026 Agentic AI 工程师学习路线',
      link: { type: 'doc', id: 'agentic-ai/index' },
      items: [
        'agentic-ai/01-python-fundamentals',
        'agentic-ai/02-llm-basics',
        'agentic-ai/03-framework-selection',
        'agentic-ai/04-advanced-concepts',
        'agentic-ai/05-tools-and-rag',
        'agentic-ai/06-production-deployment',
        'agentic-ai/07-checklist-interview',
      ],
    },
  ],
};

module.exports = sidebars;
