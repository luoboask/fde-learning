// @ts-check
// sidebars/agentic-ai.js — Agentic AI 系统学习侧边栏
const sidebars = {
  agenticAiSidebar: [
    {
      type: 'doc',
      id: 'index',
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">L1 基础</div>',
    },
    {
      type: 'category',
      label: 'Python 工程基础',
      link: { type: 'doc', id: '01-python-fundamentals' },
      items: [],
    },
    {
      type: 'category',
      label: 'LLM 基础',
      link: { type: 'doc', id: '02-llm-basics' },
      items: [],
    },
    {
      type: 'category',
      label: 'Prompt 与 Context Engineering',
      link: { type: 'doc', id: '03-context-engineering' },
      items: [],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">L2 单智能体</div>',
    },
    {
      type: 'category',
      label: 'Harness 工程',
      link: { type: 'doc', id: '04-harness-engineering' },
      items: [],
    },
    {
      type: 'category',
      label: '框架与工具',
      link: { type: 'doc', id: '05-frameworks-tools' },
      items: [],
    },
    {
      type: 'category',
      label: 'RAG 系统',
      link: { type: 'doc', id: '06-rag-system' },
      items: [],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">L3 多智能体</div>',
    },
    {
      type: 'category',
      label: 'Agent 记忆',
      link: { type: 'doc', id: '07-agent-memory' },
      items: [],
    },
    {
      type: 'category',
      label: '多智能体编排',
      link: { type: 'doc', id: '08-multi-agent' },
      items: [],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">L4 生产</div>',
    },
    {
      type: 'category',
      label: '安全与 Guardrails',
      link: { type: 'doc', id: '09-safety-guardrails' },
      items: [],
    },
    {
      type: 'category',
      label: '生产部署',
      link: { type: 'doc', id: '10-production' },
      items: [],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">L5 面试</div>',
    },
    {
      type: 'category',
      label: '检查清单与面试',
      link: { type: 'doc', id: '11-checklist-interview' },
      items: [],
    },
    {
      type: 'category',
      label: '评估与可观测性',
      link: { type: 'doc', id: '12-evaluation-observability' },
      items: [],
    },
    {
      type: 'category',
      label: 'Agent 设计模式',
      link: { type: 'doc', id: '13-agent-design-patterns' },
      items: [],
    },
  ],
};

module.exports = sidebars;
