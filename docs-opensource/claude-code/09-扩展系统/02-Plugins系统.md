# Plugins 系统

> 源码: `plugins/` 目录

## 1. Plugin 架构

Plugin 系统允许第三方扩展 Claude Code 的功能。与 Skill 不同，Plugin 可以注册新工具、新命令和新的 UI 组件。

```
Plugin Manager
    │
    ├── loadPlugins()      # 加载所有插件
    ├── registerPlugin()   # 注册单个插件
    ├── getPluginTools()   # 获取插件提供的工具
    └── getPluginCommands()# 获取插件注册的命令
```

## 2. Plugin 接口

```typescript
interface Plugin {
  // 基本信息
  name: string
  version: string
  description: string

  // 生命周期
  initialize(ctx: PluginContext): Promise<void>
  destroy?(): Promise<void>

  // 扩展点
  tools?: () => Tool[]          // 注册新工具
  commands?: () => Command[]    // 注册新命令
  hooks?: Record<string, Hook>  // 生命周期钩子
}
```

## 3. 插件加载流程

```
启动时
    │
    ↓
扫描 ~/.claude/plugins/ 目录
    │
    ↓
读取每个插件的 package.json
    │
    ↓
require() 加载插件入口
    │
    ↓
调用 plugin.initialize(ctx)
    │
    ↓
注册插件的工具和命令到全局
```

## 4. Plugin Context

插件通过上下文与 Claude Code 交互：

```typescript
interface PluginContext {
  // 访问应用状态
  appState: AppState

  // 注册工具
  registerTool(tool: Tool): void

  // 注册命令
  registerCommand(cmd: Command): void

  // 日志
  logger: Logger

  // 配置
  config: Readonly<Config>
}
```

## 5. 示例：自定义插件

```typescript
// ~/.claude/plugins/my-plugin/index.ts
export default {
  name: 'my-plugin',
  version: '1.0.0',
  description: 'My custom plugin',

  initialize(ctx) {
    ctx.registerTool({
      name: 'myTool',
      description: 'Does something useful',
      inputSchema: { ... },
      call: async (input) => {
        return { content: [{ type: 'text', text: 'Done!' }] }
      }
    })

    ctx.registerCommand({
      name: 'mycommand',
      handler: (args) => {
        console.log('Running mycommand')
      }
    })
  }
}
```

## 6. 插件安全

插件运行在与内置工具相同的权限模型下：
- 插件工具受权限系统约束
- 插件无权访问敏感配置（如 API key）
- 插件执行受 Bash 安全策略限制

---

*上一节：[Skills 系统](./01-Skills系统.md) | 下一节：[命令系统](./03-命令系统.md)*
