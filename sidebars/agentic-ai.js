// @ts-check
// sidebars/agentic-ai.js — Agentic AI 工程师教程侧边栏
const sidebars = {
  agenticAiSidebar: [
    {
      type: 'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: '第 0 层：基础（2-4 周）',
      items: [
        '01-python-fundamentals',
        '02-llm-basics',
        '03-context-engineering',
      ],
    },
    {
      type: 'category',
      label: '第 1 层：单智能体（4-6 周）',
      items: [
        '04-frameworks-tools',
        '05-rag-system',
      ],
    },
    {
      type: 'category',
      label: '第 2 层：多智能体与记忆（4-6 周）',
      items: [
        '06-agent-memory',
        '07-multi-agent',
      ],
    },
    {
      type: 'category',
      label: '第 3 层：生产与安全（4-6 周）',
      items: [
        '08-safety-guardrails',
        '09-production',
      ],
    },
    {
      type: 'category',
      label: '第 4 层：面试与项目',
      items: [
        '10-checklist-interview',
        '11-evaluation-observability',
      ],
    },
  ],
};

module.exports = sidebars;
