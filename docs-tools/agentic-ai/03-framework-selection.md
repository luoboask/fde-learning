---
sidebar_position: 13
sidebar_label: 第三阶段 框架
---

# 第三阶段：框架选择——工具为我所用，架构才是核心

> 面对 LangChain/LangGraph、CrewAI、AutoGen 等五花八门的 Agent 框架，很多小白会陷入"选择困难症"，甚至盲目复制 Demo 代码，最终只学会了表面操作，无法灵活运用。记住：工具是仆从，架构才是主人。

## 主流框架对比

| 框架 | 定位 | 适合场景 | 学习曲线 |
|------|------|----------|----------|
| **LangGraph** | 图式工作流 | 生产级、长流程、复杂分支 | 中等 |
| LangChain | 链式组合 | 简单问答、快速原型 | 低 |
| CrewAI | 多智能体协作 | 角色分工的团队模式 | 低 |
| AutoGen | 对话式多智能体 | 研究探索、多轮协商 | 中等 |
| LlamaIndex | 数据 + 检索 | RAG 密集型应用 | 低 |

## LangGraph 的生产级优势（重点推荐）

对于想要落地生产的程序员来说，LangGraph 是首选框架之一。

### 核心概念：显式状态图

LangGraph 将智能体的行为建模为**显式的状态图**（包含节点、边、条件分支）：

```
                    ┌──────────┐
         ┌──────────│  Router   │──────────┐
         │          └──────────┘          │
         ▼                                ▼
  ┌─────────────┐                 ┌─────────────┐
  │  Search Node │                 │  Code Node  │
  └─────────────┘                 └─────────────┘
         │                                │
         ▼                                ▼
  ┌─────────────┐                 ┌─────────────┐
  │  Synthesize  │                 │  Execute    │
  └─────────────┘                 └─────────────┘
         │                                │
         └────────┐              ┌─────────┘
                  ▼              ▼
           ┌─────────────────────┐
           │     Final Answer     │
           └─────────────────────┘
```

### 为什么 LangGraph 适合生产环境

| 优势 | 说明 |
|------|------|
| **可观测性** | 每个节点、每条边的执行都有日志记录 |
| **可恢复性** | 支持检查点，任务中断后可以从断点恢复 |
| **可控性** | 显式的条件分支，避免死循环、任务中断 |
| **可测试性** | 每个节点可以独立测试 |

### 代码示例：LangGraph 智能体

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    """定义智能体的状态。"""
    query: str
    results: list
    answer: str
    # Annotated 用于合并多个节点的结果
    history: Annotated[list, operator.add]

# 定义节点函数
def retrieve(state: AgentState):
    """检索节点——从知识库搜索相关信息。"""
    results = search_database(state["query"])
    return {"results": results, "history": [f"检索: {state['query']}"]}

def synthesize(state: AgentState):
    """综合节点——用 LLM 基于检索结果生成答案。"""
    answer = llm_answer(state["query"], state["results"])
    return {"answer": answer, "history": [f"生成答案"]}

def router(state: AgentState):
    """路由函数——根据结果决定下一步。"""
    if state["results"]:
        return "synthesize"  # 有结果 → 生成答案
    else:
        return "end"         # 无结果 → 结束

# 构建图
graph = StateGraph(AgentState)

# 添加节点
graph.add_node("retrieve", retrieve)
graph.add_node("synthesize", synthesize)

# 添加边
graph.set_entry_point("retrieve")
graph.add_conditional_edges(
    "retrieve",
    router,
    {"synthesize": "synthesize", "end": END}
)
graph.add_edge("synthesize", END)

# 编译
app = graph.compile()

# 运行
result = app.invoke({"query": "什么是 RAG？", "results": [], "answer": "", "history": []})
print(result["answer"])
```

## 警惕框架反模式

最危险的陷阱就是"复制粘贴 Demo 代码"，误把框架的用法当作核心架构。

### 反模式 vs 正确做法

| 反模式 | 正确做法 |
|--------|----------|
| 复制 Demo 代码，不改架构 | 先设计自己的状态模型，再用框架实现 |
| 框架就是核心 | 框架只是工具，核心是你定义的工具边界和安全规则 |
| 硬编码 LLM 调用 | 封装接口层，保持业务逻辑独立 |
| 所有逻辑写在一个节点 | 拆分为可测试的独立节点 |

## 抽象与防锁定

将 LLM 调用、向量库操作等核心逻辑封装在接口层内，保持业务逻辑的独立性。

```python
# 好的抽象——替换 LLM 只需要改实现
class LLMProvider(Protocol):
    def chat(self, messages: list[Message], tools: list[dict]) -> Response:
        ...

class OpenAIProvider(LLMProvider):
    def chat(self, messages, tools):
        return openai_client.chat.completions.create(...)

class BailianProvider(LLMProvider):
    def chat(self, messages, tools):
        return dashscope_client.chat.completions.create(...)

# 业务逻辑不依赖具体实现
class Agent:
    def __init__(self, llm: LLMProvider):
        self.llm = llm  # 注入依赖
```

**好处**：后续无论是替换底层 LLM（如从 OpenAI 切换到国内模型），还是更换向量库，都能快速适配，避免被单一框架"锁定"。

## 阶段实战：用 LangGraph 构建一个问答 Agent

**目标**：完成一个基于 LangGraph 的问答智能体：

- [ ] 定义 AgentState（包含查询、结果、答案、历史）
- [ ] 实现检索节点
- [ ] 实现综合节点（调用 LLM）
- [ ] 实现路由函数（有结果 → 回答，无结果 → 道歉）
- [ ] 编译并运行，测试多种查询场景

## 阶段检查清单

- [ ] 了解主流 Agent 框架的定位和差异
- [ ] 能用 LangGraph 构建包含 3+ 节点的状态图
- [ ] 理解 Router 的概念，能根据条件路由到不同节点
- [ ] 知道框架反模式，不会盲目复制 Demo
- [ ] 能将核心逻辑封装为接口层，避免框架锁定

---

[上一阶段：← LLM 基础](/tools/agentic-ai/02-llm-basics) | [下一阶段：高级概念 →](/tools/agentic-ai/04-advanced-concepts)
