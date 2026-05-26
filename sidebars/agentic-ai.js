// @ts-check
// sidebars/agentic-ai.js — Agentic AI 系统学习侧边栏
const sidebars = {
  agenticAiSidebar: [
    {
      type: 'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: '基础',
      items: [
        '01-python-fundamentals',
        '02-llm-basics',
        '03-context-engineering',
      ],
    },
    {
      type: 'category',
      label: '单智能体',
      items: [
        '04-harness-engineering',
        '05-frameworks-tools',
        '06-rag-system',
      ],
    },
    {
      type: 'category',
      label: '多智能体与记忆',
      items: [
        '07-agent-memory',
        '08-multi-agent',
      ],
    },
    {
      type: 'category',
      label: '生产与安全',
      items: [
        '09-safety-guardrails',
        '10-production',
      ],
    },
    {
      type: 'category',
      label: '面试与项目',
      items: [
        '11-checklist-interview',
        '12-evaluation-observability',
      ],
    },
  ],
};

module.exports = sidebars;
