# Agent 工具

> 源码: `tools/AgentTool/`

## 1. 子代理

Agent 工具允许 Claude Code 启动子代理，在隔离的上下文中执行复杂任务。

## 2. 内置 Agent

| Agent | 用途 |
|-------|------|
| ExploreAgent | 代码库探索 |
| VerificationAgent | 验证和测试 |
| Fork Subagent | 并行任务执行 |

## 3. Task 系统

`TaskCreate`, `TaskGet`, `TaskList`, `TaskOutput`, `TaskStop`, `TaskUpdate` 提供后台任务管理。

---

*上一节：[文件工具](./04-文件工具.md) | 下一节：[权限系统](./06-权限系统.md)*
