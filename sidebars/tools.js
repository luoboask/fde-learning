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
        // 第 0 层：基础
        'agentic-ai/01-python-fundamentals',
        'agentic-ai/02-llm-basics',
        'agentic-ai/03-context-engineering',
        // 第 1 层：单智能体
        'agentic-ai/04-frameworks-tools',
        'agentic-ai/05-rag-system',
        // 第 2 层：多智能体与记忆
        'agentic-ai/06-agent-memory',
        'agentic-ai/07-multi-agent',
        // 第 3 层：生产与安全
        'agentic-ai/08-safety-guardrails',
        'agentic-ai/09-production',
        // 第 4 层：面试与项目
        'agentic-ai/10-checklist-interview',
        // 第 5 层：可观测性（补充）
        'agentic-ai/11-evaluation-observability',
      ],
    },
  ],
};

module.exports = sidebars;
