---
sidebar_position: 14
sidebar_label: 第四阶段 框架与工具
---

# 第四阶段：框架与工具调用——框架为用，架构为主

> 面对 LangGraph、PydanticAI、CrewAI、SmolAgents 等框架，记住：工具是仆从，架构才是主人。2026 年还要掌握 MCP 协议——Agent 连接工具的标准。

## 2026 框架全景

| 框架 | 定位 | 适合场景 | 学习曲线 | 生产排名 |
|------|------|----------|----------|----------|
| **LangGraph** | 图式工作流 | 生产级、多智能体、状态管理 | 中等 | **#1** |
| **PydanticAI** | 类型安全 Agent | 单智能体、最佳 DX | 低 | Top 3 |
| **SmolAgents** | 轻量代码 Agent | 快速原型、代码驱动 | 低 | Top 5 |
| CrewAI | 角色团队 | 多智能体角色分工 | 低 | 中等 |
| AutoGen | 多智能体对话 | 研究、辩论模式 | 中等 | 中等 |

### 选型决策树

```
需要多智能体编排？
  ├── 是，且需要精细控制 → LangGraph
  ├── 是，但角色分工明确 → CrewAI
  └── 否 → 需要类型安全？
              ├── 是 → PydanticAI
              └── 否，要快速原型 → SmolAgents
```

## LangGraph 详解（生产首选）

### 核心概念：显式状态图

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class AgentState(TypedDict):
    query: str
    results: list
    answer: str
    history: list

# 定义节点
def retrieve(state: AgentState):
    results = search_database(state["query"])
    return {"results": results, "history": [...]}

def synthesize(state: AgentState):
    answer = llm_answer(state["query"], state["results"])
    return {"answer": answer}

# 构建图
graph = StateGraph(AgentState)
graph.add_node("retrieve", retrieve)
graph.add_node("synthesize", synthesize)
graph.set_entry_point("retrieve")
graph.add_conditional_edges("retrieve", router, {"synthesize": "synthesize", "end": END})
graph.add_edge("synthesize", END)

app = graph.compile()
result = app.invoke({"query": "什么是 RAG？", "results": [], "answer": "", "history": []})
```

### 为什么 LangGraph 适合生产

| 优势 | 说明 |
|------|------|
| **可观测性** | 每个节点、每条边的执行都有日志记录 |
| **可恢复性** | 支持检查点，任务中断后可以从断点恢复 |
| **可控性** | 显式条件分支，避免死循环、任务中断 |
| **多智能体** | 原生支持 supervisor、handoff 等多智能体模式 |

## PydanticAI 详解（最佳开发者体验）

```python
from pydantic_ai import Agent, RunContext

# 定义工具
@agent.tool
async def get_weather(ctx: RunContext[None], city: str) -> str:
    """获取指定城市的天气。"""
    return f"{city}今天晴天，25°C"

# 运行
result = agent.run_sync("北京今天天气怎么样？")
```

**优势**：
- FastAPI 风格的类型安全
- Pydantic 原生集成
- 输出自动验证

**限制**：仅支持单智能体，多智能体需搭配 LangGraph。

## MCP 协议（Model Context Protocol）

**2026 年最重要的 Agent 协议**——Anthropic 推出的标准化 Agent-Tool 连接层。

### MCP 是什么

```
Agent ─→ MCP Client ─→ MCP Server (工具/资源)
```

MCP 创建了 Agent 和工具之间的标准化层，就像 USB 之于外设。

### 为什么需要 MCP

| 不用 MCP | 用 MCP |
|----------|--------|
| 每个工具需要单独写集成代码 | 标准协议，即插即用 |
| 工具发现困难 | 自动发现可用工具 |
| 跨模型不兼容 | 一次实现，多模型通用 |

### 运行 MCP Server

```python
# 用 FastMCP 创建 MCP Server
from fastmcp import FastMCP

mcp = FastMCP("My Agent Tools")

@mcp.tool()
def search_knowledge(query: str) -> str:
    """搜索内部知识库。"""
    return knowledge_base.search(query)

@mcp.tool()
def get_current_time() -> str:
    """获取当前时间。"""
    return datetime.now().isoformat()

if __name__ == "__main__":
    mcp.run()
```

### Agent 连接 MCP Server

```python
from langchain_mcp import MCPClient

client = MCPClient("http://localhost:8080/mcp")
tools = client.get_tools()  # 自动发现所有工具

# 将 MCP 工具接入 Agent
agent = create_agent(tools=tools)
```

## 智能体友好型工具设计

### 4 大设计原则

| 原则 | 说明 | 示例 |
|------|------|------|
| **命名清晰** | 让模型一眼知道用途 | `search_knowledge_base` 而非 `fn1` |
| **目的单一** | 一个工具只做一件事 | 搜索和写入分为两个工具 |
| **输入输出结构化** | 方便模型识别 | 使用 Pydantic Schema |
| **失败快速** | 遇到错误及时返回 | 超时返回错误信息 |

### 有副作用操作的安全闸门

```python
def send_email(input: EmailInput) -> EmailOutput:
    """发送邮件——有副作用，需要确认闸门。"""
    # 1. 权限检查
    if not check_permission(user_id, "send_email"):
        return EmailOutput(error="无权限")
    # 2. 确认闸门
    # 3. 执行
```

## 阶段实战

**目标**：用 LangGraph + MCP 构建一个带工具调用的 Agent

- [ ] 实现 2-3 个工具函数
- [ ] 用 FastMCP 创建 MCP Server
- [ ] 用 LangGraph 构建包含检索、综合两个节点的图
- [ ] Agent 能通过 MCP 调用工具
- [ ] 测试多种查询场景

## 阶段检查清单

- [ ] 了解主流框架的定位和差异，能根据需求选型
- [ ] 能用 LangGraph 构建包含 3+ 节点的状态图
- [ ] 理解 MCP 协议的概念和架构
- [ ] 能创建 MCP Server 并连接 Agent
- [ ] 掌握工具设计的 4 大原则
- [ ] 能为有副作用的操作添加确认闸门

---

[上一阶段：← Context Engineering](/tools/agentic-ai/03-context-engineering) | [下一阶段：RAG 系统 →](/tools/agentic-ai/05-rag-system)
