// @ts-check
// sidebars/opensource.js — 源码解读教程侧边栏
const sidebars = {
  opensourceSidebar: [
    {
      type: 'html',
      value: '<div class="sidebar-stage">推理引擎</div>',
    },
    {
      type: 'category',
      label: 'nanoGPT',
      link: { type: 'doc', id: 'nanogpt' },
      items: ['nanogpt'],
    },
    {
      type: 'category',
      label: 'llm.c',
      link: { type: 'doc', id: 'llm-c' },
      items: ['llm-c'],
    },
    {
      type: 'category',
      label: 'llama.cpp',
      link: { type: 'doc', id: 'llama-cpp' },
      items: ['llama-cpp'],
    },
    {
      type: 'category',
      label: 'vLLM',
      link: { type: 'doc', id: 'vllm' },
      items: ['vllm'],
    },
    {
      type: 'category',
      label: 'SGLang',
      link: { type: 'doc', id: 'sglang' },
      items: ['sglang'],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">Claude Code 源码解读</div>',
    },
    {
      type: 'category',
      label: '文档导航',
      link: { type: 'doc', id: 'claude-code/00-文档导航' },
      items: ['claude-code/00-文档导航'],
    },
    {
      type: 'category',
      label: '启动流程',
      items: [
        'claude-code/01-启动流程/01-应用入口',
        'claude-code/01-启动流程/02-初始化状态',
      ],
    },
    {
      type: 'category',
      label: 'Prompt 系统',
      items: [
        'claude-code/02-Prompt系统/01-Prompt规范',
        'claude-code/02-Prompt系统/02-动态Prompt',
        'claude-code/02-Prompt系统/03-上下文注入',
      ],
    },
    {
      type: 'category',
      label: '核心引擎',
      items: [
        'claude-code/03-核心引擎/01-查询编排',
        'claude-code/03-核心引擎/02-引擎循环',
        'claude-code/03-核心引擎/03-Token预算',
      ],
    },
    {
      type: 'category',
      label: '工具系统',
      items: [
        'claude-code/04-工具系统/01-工具基类',
        'claude-code/04-工具系统/02-工具注册',
        'claude-code/04-工具系统/03-Bash工具',
        'claude-code/04-工具系统/04-文件工具',
        'claude-code/04-工具系统/05-Agent工具',
        'claude-code/04-工具系统/06-权限系统',
      ],
    },
    {
      type: 'category',
      label: '记忆系统',
      items: [
        'claude-code/05-记忆系统/01-记忆概述',
        'claude-code/05-记忆系统/02-记忆写入',
        'claude-code/05-记忆系统/03-记忆读取',
      ],
    },
    {
      type: 'category',
      label: '状态管理',
      items: [
        'claude-code/06-状态管理/01-状态存储',
      ],
    },
    {
      type: 'category',
      label: 'UI 渲染',
      items: [
        'claude-code/07-UI渲染/01-Ink引擎',
        'claude-code/07-UI渲染/02-组件系统',
        'claude-code/07-UI渲染/03-Hooks系统',
      ],
    },
    {
      type: 'category',
      label: '服务集成',
      items: [
        'claude-code/08-服务集成/01-MCP协议',
        'claude-code/08-服务集成/02-LSP集成',
        'claude-code/08-服务集成/03-OAuth认证',
      ],
    },
    {
      type: 'category',
      label: '扩展系统',
      items: [
        'claude-code/09-扩展系统/01-Skills系统',
        'claude-code/09-扩展系统/02-Plugins系统',
        'claude-code/09-扩展系统/03-命令系统',
      ],
    },
    {
      type: 'category',
      label: '安全系统',
      items: [
        'claude-code/10-安全系统/01-Bash安全',
        'claude-code/10-安全系统/02-权限控制',
        'claude-code/10-安全系统/03-路径验证',
        'claude-code/10-安全系统/04-策略限制',
      ],
    },
    {
      type: 'category',
      label: '对比与附录',
      items: [
        'claude-code/70-记忆系统对比',
      ],
    },
  ],
};

module.exports = sidebars;
