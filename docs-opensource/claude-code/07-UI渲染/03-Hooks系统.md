# Hooks 系统

> 源码: `hooks/` 目录（87 个 React Hooks）

## 1. Hooks 架构

`hooks/` 目录包含 87 个 React Hooks，是连接状态存储和业务逻辑的桥梁：

```
AppStateStore (状态存储)
    │
    ↓ (subscribe)
useAppState (基础 Hook)
    │
    ↓
├── useMessages (消息相关)
├── useToolCalls (工具调用)
├── useModel (模型信息)
├── useSettings (设置)
├── useCost (成本追踪)
└── usePermissions (权限)
```

## 2. 基础订阅 Hook

```typescript
// 订阅 AppStateStore 的基础 Hook
function useAppState() {
  const [state, setState] = useState(
    AppStateStore.getState()
  )

  useEffect(() => {
    const unsubscribe = AppStateStore.subscribe(() => {
      setState(AppStateStore.getState())
    })
    return unsubscribe
  }, [])

  return state
}
```

模式：
1. 初始化时读取当前状态
2. 订阅状态变化
3. 状态更新时触发重新渲染
4. 组件卸载时取消订阅

## 3. 消息相关 Hooks

```typescript
function useMessages() {
  const state = useAppState()
  return state.messages
}

function useLastMessage() {
  const messages = useMessages()
  return messages[messages.length - 1]
}
```

## 4. 工具调用 Hooks

```typescript
function useToolCalls() {
  const state = useAppState()
  return state.toolCalls
}

function useActiveToolCalls() {
  const calls = useToolCalls()
  return calls.filter(c => c.status === 'running')
}
```

## 5. 模型相关 Hooks

```typescript
function useModel() {
  const state = useAppState()
  return state.model
}

function useModelCapabilities() {
  const model = useModel()
  return {
    supportsVision: model.family.includes('opus'),
    supportsToolUse: true,
    maxTokens: model.maxTokens,
  }
}
```

## 6. 成本追踪 Hooks

```typescript
function useCost() {
  const state = useAppState()
  return {
    totalCost: state.cost.total,
    tokenUsage: state.cost.tokens,
    costPerToken: state.cost.rates,
  }
}
```

## 7. 设置 Hooks

```typescript
function useSettings() {
  const state = useAppState()
  return {
    model: state.settings.model,
    maxTokens: state.settings.maxTokens,
    permissionMode: state.settings.permissionMode,
    allowedTools: state.settings.allowedTools,
  }
}
```

## 8. Hooks 分类

| 类别 | Hook 数 | 示例 |
|------|---------|------|
| 状态订阅 | 20 | useAppState, useMessages |
| UI 控制 | 15 | useTheme, useLayout |
| 工具调用 | 10 | useToolCalls, useActiveTools |
| 模型配置 | 8 | useModel, useCapabilities |
| 成本追踪 | 5 | useCost, useTokenBudget |
| 权限控制 | 10 | usePermissions, useAllowedTools |
| 输入处理 | 12 | useInput, useCommandHistory |
| 其他 | 7 | 辅助工具 |

## 9. 性能优化

关键 Hooks 使用 `useMemo` 和 `useCallback` 避免不必要的重新渲染：

```typescript
function useMessageCount() {
  const messages = useMessages()
  return useMemo(() => messages.length, [messages])
}
```

---

*上一节：[组件系统](./02-组件系统.md) | 下一节：[08 服务集成](../08-服务集成/01-MCP协议.md)*
