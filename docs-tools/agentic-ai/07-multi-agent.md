---
sidebar_position: 17
sidebar_label: 第七阶段 多智能体
---

# 第七阶段：多智能体编排——让多个 Agent 协作

> 2026 年，行业正从"单一智能 Agent"转向**分布式、可互操作的多智能体生态系统**。掌握 6 大编排模式和 A2A 协议是进阶关键。

## 选型决策树

```
任务是否可以单步完成？
  ├── 是 → 单智能体 + 工具（优先！）
  └── 否 → 任务是否需要专业知识分工？
              ├── 否 → 单智能体 + 多个工具
              └── 是 → 多智能体
```

> **核心原则**：只在任务确实需要分解、单智能体无法完成时，再考虑多智能体。

## 6 大多智能体编排模式

### 1. 链式（Chaining）

```
Agent A ─→ Agent B ─→ Agent C ─→ 输出
```

最简单、成本最低。适合固定流程。

```python
# LangGraph 链式
graph.add_edge("researcher", "writer")
graph.add_edge("writer", "reviewer")
```

### 2. 路由（Routing）

```
用户 ─→ 分类 Agent ─→ 技术 Agent
                  └→ 业务 Agent
                  └→ HR Agent
```

分类 Agent 决定将任务分发给哪个专业 Agent。

```python
def router(state: AgentState):
    if "技术" in state["query"]:
        return "tech_agent"
    elif "业务" in state["query"]:
        return "business_agent"
    else:
        return "hr_agent"
```

### 3. 并行（Parallelization）

```
用户 ─→ Agent A ─┐
            └→ Agent B ─→ 合并
            └→ Agent C ─┘
```

多个 Agent 同时工作，适合需要多角度分析的任务。

### 4. 编排者-工人（Orchestrator-Worker）

```
用户 ─→ 编排者 ─→ 工人 A
            └→ 工人 B
            └→ 工人 C
            └─→ 汇总
```

中央调度器分配任务给专业工人。

### 5. 评估-优化（Evaluator-Optimizer）

```
用户 ─→ 生成者 ─→ 评估者 ─→ 反馈 ─→ 生成者 ─→ ... ─→ 最终输出
```

一个 Agent 生成，另一个批评和优化。

### 6. 群体/辩论（Swarm/Debate）

```
Agent A ──辩论──→ Agent B ──辩论──→ Agent C
              └────── 共识 ──────┘
```

多个 Agent 无中心协作，适合创造性任务。

## LangGraph 多智能体实现

### Supervisor 模式

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Literal

class TeamState(TypedDict):
    query: str
    next: str  # 下一步该哪个 Agent
    result: str

def supervisor(state: TeamState) -> dict:
    """监督者决定下一步由谁执行。"""
    # 用 LLM 决定下一步
    decision = llm_decide_next(state["query"])
    return {"next": decision}

def researcher(state: TeamState) -> dict:
    return {"result": search_and_summarize(state["query"])}

def writer(state: TeamState) -> dict:
    return {"result": write_report(state["result"])}

def router(state: TeamState) -> Literal["researcher", "writer", "END"]:
    if state["next"] == "research":
        return "researcher"
    elif state["next"] == "write":
        return "writer"
    return "END"

# 构建监督者图
graph = StateGraph(TeamState)
graph.add_node("supervisor", supervisor)
graph.add_node("researcher", researcher)
graph.add_node("writer", writer)

graph.set_entry_point("supervisor")
graph.add_conditional_edges("supervisor", router)
graph.add_edge("researcher", "supervisor")
graph.add_edge("writer", "supervisor")

app = graph.compile()
```

### Handoff 模式（Agent 交接）

```python
# Agent A 将控制权移交给 Agent B
def handoff_to_specialist(state: TeamState) -> dict:
    """将复杂技术问题移交给专家 Agent。"""
    return {
        "next": "specialist",
        "context": f"用户问题：{state['query']}"
    }
```

## A2A 协议（Agent-to-Agent）

Google 推出的**多智能体互操作协议**，已被 50+ 公司支持。

### 为什么需要 A2A

| 不用 A2A | 用 A2A |
|----------|--------|
| Agent 之间硬编码连接 | 标准化通信 |
| 跨系统不兼容 | 任何 A2A Agent 可以互操作 |
| 难以扩展 | 即插即用 |

### A2A 架构

```
Agent A ─→ A2A Protocol ─→ Agent B
                               ↑
Agent C ─→ A2A Protocol ──────┘
```

```python
# 伪代码：A2A 通信
from a2a import AgentClient

client = AgentClient("http://agent-b.example.com/a2a")
result = await client.send_task({
    "task": "analyze_market",
    "params": {"sector": "AI", "region": "China"}
})
```

## 2026 框架对比

| 模式 | 推荐框架 | 场景 |
|------|----------|------|
| Supervisor | LangGraph | 需要精细控制的多智能体 |
| Handoff | LangGraph + OpenAI Agent SDK | Agent 交接场景 |
| 角色团队 | CrewAI | 定义明确的角色分工 |
| 辩论 | AutoGen | 多角度分析、研究 |
| 跨系统互操作 | A2A 协议 | 不同系统的 Agent 协作 |

## 阶段实战

**目标**：构建一个包含 3 个 Agent 的协作系统

- [ ] 实现 Supervisor 模式（监督者 + 2 个工人）
- [ ] 实现 Handoff 模式（Agent A → Agent B）
- [ ] 实现评估-优化模式（生成 → 批评 → 优化）
- [ ] 对比单智能体 vs 多智能体的效果和成本差异

## 阶段检查清单

- [ ] 知道何时该用/不该用多智能体
- [ ] 掌握 6 大编排模式
- [ ] 能用 LangGraph 实现 Supervisor 模式
- [ ] 理解 A2A 协议的概念和用途
- [ ] 能对比单智能体 vs 多智能体的效果

---

[上一阶段：← 记忆工程](/tools/agentic-ai/06-agent-memory) | [下一阶段：安全与 Guardrails →](/tools/agentic-ai/08-safety-guardrails)
