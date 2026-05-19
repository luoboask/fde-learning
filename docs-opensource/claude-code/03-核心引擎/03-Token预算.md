# Token 预算

> 源码: `query/tokenBudget.ts` | `cost-tracker.ts`

## 1. Token 预算系统

Claude Code 使用 Token 预算来控制单次查询的资源消耗：

```typescript
// source/src/query/tokenBudget.ts
class TokenBudget {
  private totalBudget: number    // 总预算
  private used: number           // 已使用
  private warningThreshold: number // 警告阈值

  canSpend(amount: number): boolean
  spend(amount: number): void
  isNearLimit(): boolean
}
```

## 2. 成本追踪

`cost-tracker.ts` 负责追踪整个会话的 Token 成本和费用：

```
Token 使用量 → 乘以模型单价 → 累计成本
                    ↓
              成本阈值检查
                    ↓
          超过阈值时弹出警告对话框
```

## 3. 成本展示

- 终端底部状态栏显示当前成本
- 超过预设阈值时弹出 `CostThresholdDialog`
- 支持按会话统计

---

*上一节：[引擎循环](./02-引擎循环.md) | 下一节：[04 工具系统](../04-工具系统/01-工具基类.md)*
