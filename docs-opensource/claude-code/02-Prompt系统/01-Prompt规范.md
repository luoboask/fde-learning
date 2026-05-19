# Prompt 规范

> 源码: `constants/prompts.ts` | `constants/systemPromptSections.ts`

## 1. System Prompt 构建

Claude Code 的 System Prompt 不是静态字符串，而是由多个动态段落组合而成。核心文件是 `constants/prompts.ts`。

```typescript
// source/src/constants/prompts.ts
export function getSystemPrompt(tools: Tools, commands: Command[]): string {
  const sections: (string | null)[] = [
    getIdentitySection(),
    getCapabilitiesSection(tools),
    getRulesSection(),
    getToolUsageSection(tools),
    getOutputStyleSection(),
    getMemorySection(),
    getMCPServersSection(),
    getSkillsSection(),
    // ... 更多动态段落
  ]
  return sections.filter(Boolean).join('\n\n')
}
```

## 2. System Prompt 段落类型

源码定义了两类段落：

| 类型 | 方法 | 缓存行为 | 场景 |
|------|------|---------|------|
| **缓存段落** | `systemPromptSection()` | 计算一次，`/clear` 清除 | 身份、规则、工具说明 |
| **动态段落** | `DANGEROUS_uncachedSystemPromptSection()` | 每轮重新计算 | 当前工作目录、Git 状态 |

```typescript
// 缓存段落 - 只计算一次
systemPromptSection('identity', () => `你是 Claude Code, Anthropic 官方的 CLI...`)

// 动态段落 - 每轮重新计算
DANGEROUS_uncachedSystemPromptSection(
  'working-directory',
  () => `当前目录: ${getCwd()}`,
  '工作目录可能随时改变'
)
```

## 3. Prompt 规范要点

### 3.1 身份定义

```
你是 Claude Code，Anthropic 官方的 CLI 工具。
你通过自然语言与用户交互，通过工具执行实际操作。
```

### 3.2 工具使用规则

- 每次只能调用一个工具
- 等待工具执行完成后再决定下一步
- 使用 `<antThinking>` 标签进行推理（对最终输出不可见）
- 推理后输出用户可见的响应

### 3.3 输出格式

```
<antThinking>
用户无法看到的内部推理
</antThinking>

用户可见的响应内容
```

### 3.4 XML 标签约定

| 标签 | 用途 |
|------|------|
| `<antThinking>` | 内部推理（用户不可见） |
| `<antArtifact>` | 生成的文件/代码块 |
| `<antCall>` | 工具调用 |

## 4. Prompt 的动态注入

System Prompt 会根据运行时状态动态注入信息：

```typescript
// 当前工作目录
`当前目录: ${getCwd()}`

// Git 状态
`Git 分支: ${getBranch()}`

// 模型信息
`使用模型: ${getMarketingNameForModel()}`

// 记忆内容
`${loadMemoryPrompt()}`

// MCP 服务器信息
`${getMCPServersPrompt()}`

// 技能列表
`${getSkillToolCommands()}`
```

## 5. 关键源码文件

| 文件 | 职责 |
|------|------|
| `constants/prompts.ts` | System Prompt 主构建器 |
| `constants/systemPromptSections.ts` | 段落类型定义与缓存机制 |
| `constants/outputStyles.ts` | 输出风格配置 |
| `constants/xml.ts` | XML 标签常量 |
| `context.ts` | 上下文收集与注入 |

---

*上一节：[01 启动流程](../01-启动流程/02-初始化状态.md) | 下一节：[动态 Prompt](./02-动态Prompt.md)*
