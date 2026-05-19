# 动态 Prompt

> 源码: `constants/systemPromptSections.ts` | `constants/prompts.ts`

## 1. 段落解析机制

System Prompt 按段落组织，每个段落是一个 `SystemPromptSection`：

```typescript
// source/src/constants/systemPromptSections.ts
type SystemPromptSection = {
  name: string          // 段落名称（用于缓存键）
  compute: () => string | null | Promise<string | null>  // 计算函数
  cacheBreak: boolean   // 是否破坏缓存
}
```

## 2. 缓存机制

```
┌──────────────────────────────────────┐
│  Session 开始                         │
│      ↓                                │
│  首次 compute() → 结果存入 cache      │
│      ↓                                │
│  后续调用 → 直接返回缓存值            │
│      ↓                                │
│  /clear 或 /compact → 清空 cache      │
│      ↓                                │
│  重新 compute() 所有段落              │
└──────────────────────────────────────┘
```

## 3. 段落类型对比

| 段落 | 缓存 | 内容 |
|------|------|------|
| 身份定义 | 缓存 | "你是 Claude Code..." |
| 工具说明 | 缓存 | 每个工具的用途和参数 |
| 工作目录 | 不缓存 | 当前路径 |
| Git 分支 | 不缓存 | 当前分支名 |
| 记忆内容 | 不缓存 | 从记忆目录读取 |

## 4. 动态注入的上下文

运行时动态注入的信息：

- 当前工作目录
- Git 分支和状态
- 活跃的工作树会话
- 模型名称（Opus/Sonnet/Haiku）
- 已启用的 Beta 功能
- MCP 服务器连接状态
- 已注册的 Skills
- 记忆内容摘要

## 5. 输出风格

`constants/outputStyles.ts` 定义了不同的输出风格配置：

```typescript
const outputStyles = {
  default: { /* 标准输出 */ },
  verbose: { /* 详细输出 */ },
  compact: { /* 精简输出 */ },
}
```

---

*上一节：[Prompt 规范](./01-Prompt规范.md) | 下一节：[上下文注入](./03-上下文注入.md)*
