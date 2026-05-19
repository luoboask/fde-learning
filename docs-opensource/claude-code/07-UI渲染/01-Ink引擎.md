# Ink 引擎

> 源码: `components/` | `cli/` | Ink 3.x (react for terminal)

## 1. Ink 框架基础

Claude Code 使用 [Ink](https://github.com/vadimdemedes/ink) 构建终端 UI。Ink 是 React 的渲染器，将 React 组件渲染到终端而不是浏览器 DOM。

```
React Components (Ink)
       │
       ↓
┌──────────────────┐
│  Terminal Output  │  ← stdout
│  ┌──────────────┐ │
│  │ 消息列表      │ │
│  │ 工具调用状态  │ │
│  │ 输入提示符    │ │
│  └──────────────┘ │
└──────────────────┘
       │
       ↓
┌──────────────────┐
│  Terminal Input   │  ← stdin
│  (键盘事件)       │
└──────────────────┘
```

## 2. 主应用组件

`cli.tsx` 是入口组件，负责组装整个 UI：

```typescript
// 主应用组件
function App() {
  // 1. 订阅 AppStateStore 状态变化
  // 2. 渲染消息列表
  // 3. 渲染工具调用状态
  // 4. 渲染输入提示符
  return (
    <Box flexDirection="column" height="100%">
      <Messages />
      <ToolCalls />
      <InputPrompt />
    </Box>
  )
}
```

## 3. 终端渲染

Ink 使用 `render()` 将 React 树渲染为终端输出：

```typescript
import { render } from 'ink'

const { unmount } = render(
  <App />,
  {
    patchConsole: true,  // 拦截 console.log
    exitOnCtrlC: true,   // Ctrl+C 退出
  }
)
```

## 4. 流式输出处理

LLM 响应是流式的，Ink 需要高效处理频繁更新：

```typescript
// 流式文本组件
function StreamingText({ text }: { text: string }) {
  return <Text wrap="wrap">{text}</Text>
}
```

关键优化：
- Ink 只重新渲染变化的部分（React reconciliation）
- 文本流式追加时不重绘整个屏幕
- 使用 `Box` 的 `flexGrow` 实现自适应高度

## 5. 交互模式

```typescript
// 用户输入组件
function InputPrompt() {
  const [input, setInput] = useState('')
  const { stdin } = useStdin()

  // 处理 Enter 提交
  // 处理 Tab 补全
  // 处理 Ctrl+C 中断
}
```

支持的交互：
- 多行输入（Shift+Enter 换行）
- 命令补全（Tab）
- 历史导航（上下箭头）
- 中断当前请求（Ctrl+C）

---

*上一节：[06 状态管理](../06-状态管理/01-状态存储.md) | 下一节：[组件系统](./02-组件系统.md)*
