---
sidebar_position: 16
sidebar_label: LangGraph 深度指南
---

# LangGraph 实战：从 0 到 1 构建智能工单处理系统

> 别学概念了，直接动手。用一个工单处理系统，把 LangGraph 的核心能力一个个解锁。

## 系统需求

我们要构建一个**智能工单处理系统**（Ticket Agent），需求如下：

- 用户提交工单（文字描述问题）
- AI 自动分类（运维/账单/产品/安全）
- 简单问题自动回答（查知识库）
- 复杂问题生成工单，人工审批后派单处理
- 支持多轮对话（追问、补充信息）
- 支持流式输出（用户看到回答逐字出现）
- 所有操作可观测（谁做了什么，花了多长时间）

这个系统会从最简单的分类 Agent 开始，每一步都在前一步基础上增量添加功能。你会看到代码"长出来"的过程。

```mermaid
flowchart TD
    A["用户提交工单"] --> B["分类 Agent\n判断问题类型"]
    B --> C{问题类型?}
    C -->|"运维"| D["查运维知识库"]
    C -->|"账单"| E["查账单系统"]
    C -->|"产品"| F["查产品文档"]
    C -->|"安全"| G["安全团队介入"]
    D --> H{能自动解决?}
    E --> H
    F --> H
    H -->|"是"| I["自动回答用户"]
    H -->|"否"| J["生成工单\n等待人工审批"]
    J --> K["人工审批"]
    K -->|"批准"| L["派单处理"]
    K -->|"拒绝"| M["退回补充信息"]
    L --> N["处理完成\n通知用户"]

    style A fill:#42b883,color:#fff
    style B fill:#646cff,color:#fff
    style C fill:#f59e0b
    style H fill:#f59e0b
    style J fill:#ef4444,color:#fff
    style K fill:#a855f7,color:#fff
    style N fill:#42b883,color:#fff
```

## 为什么选择 LangGraph 而不是 OpenClaw？

你可能会问：既然 OpenClaw、AutoGPT、ChatDev 这些现成工具能快速搭建 Agent，为什么还要学 LangGraph？

### 框架光谱：从「开箱即用」到「完全可控」

```
开箱即用 ←──────────────────────────────────────────────→ 完全可控
AutoGPT     ChatDev     CrewAI     LangGraph     手写状态机
  ↑           ↑           ↑           ↑              ↑
零代码       角色模板     多智能体     显式状态图     全手写
低可控       低可控       中可控      高可控         高可控
适合原型     适合演示     适合中      适合生产       适合底层
            不适合定制   度定制
```

### 为什么不直接用 OpenClaw？

| 维度 | OpenClaw / 现成工具 | LangGraph |
|------|---------------------|-----------|
| **学习成本** | 低，配置即用 | 中，需理解状态图 |
| **灵活性** | 受限于内置功能 | 无上限，任何逻辑都能写 |
| **可控性** | 黑盒，内部决策不可见 | 每个节点/边完全透明 |
| **定制业务逻辑** | 困难，只能改配置 | 原生 Python，任意复杂逻辑 |
| **与企业系统集成** | 需要适配层 | 直接调 Python SDK |
| **生产可控性** | 低，LLM 驱动决策不可预测 | 高，路径确定性由开发者定义 |
| **调试难度** | 高，出了问题不知道在哪 | 每个节点输入输出可观测 |

### 核心差异：可控性 vs 灵活性

**OpenClaw 类工具**适合快速验证想法、做原型演示。但当你需要：

- 把工单分类路径**固定**为 4 种（运维/账单/产品/安全），不允许 LLM 自由发挥
- 在某个环节**强制人工审批**，不能跳过
- 外部 API 挂了要有**熔断降级**，而不是让 LLM 重试到崩溃
- 每个处理步骤的**耗时、成本、输入输出**都要可追踪

这些场景下，OpenClaw 的"灵活性"反而成了**不可控**。LangGraph 的显式状态图让你定义确定的流程：`classify → retrieve → generate → quality_check → (done/retry/manual)`，这条路径不会因为你换了个 LLM 就变了。

**生产环境中，可控性比灵活性更重要。**

### LangGraph 的定位

LangGraph 不是"又一个 Agent 框架"，它是 **Agent 控制流的基础设施层**：

- CrewAI、AutoGen 的上层抽象底层都可以用 LangGraph 来实现
- OpenClaw 的"技能"执行流程可以用 LangGraph 建模
- LangGraph 补的是 **"LLM 能力"到"生产系统"之间缺失的那层**——状态管理、流程控制、人机协作

学 LangGraph 不是学一个框架的 API，而是理解 **如何把不确定的 LLM 嵌入到确定的业务流程中**。

---

---

## 第一阶段：最小可行 Agent——工单分类

**目标：** 让 Agent 能把用户的问题分类到不同工单类型，并给出初步处理建议。

这是最简单的版本：4 个节点，条件分支，没有工具调用，没有记忆。

```python
# stage1_ticket_classifier.py
# pip install langgraph langchain-openai
from langgraph.graph import StateGraph, END
from typing import TypedDict, Literal

# ─── 1. 定义状态 ───
class TicketState(TypedDict):
    user_input: str     # 用户描述的问题
    ticket_type: str    # 分类结果：ops / billing / product / security
    response: str       # 处理建议
    history: list[str]  # 执行日志

# ─── 模拟 LLM（替换为实际调用） ───
def mock_llm_classify(text: str) -> str:
    """模拟 LLM 分类。实际项目中替换为 LLM 调用。"""
    if any(k in text for k in ["CPU", "内存", "服务器", "数据库", "宕机"]):
        return "ops"
    if any(k in text for k in ["账单", "费用", "扣款", "退款", "发票"]):
        return "billing"
    if any(k in text for k in ["功能", "bug", "需求", "产品"]):
        return "product"
    if any(k in text for k in ["漏洞", "攻击", "泄露", "安全"]):
        return "security"
    return "ops"  # 默认运维

# ─── 2. 定义节点 ───
def classify(state: TicketState) -> dict:
    """分类节点：判断问题类型。"""
    ticket_type = mock_llm_classify(state["user_input"])
    return {
        "ticket_type": ticket_type,
        "history": state["history"] + [f"分类: {ticket_type}"],
    }

def ops_handler(state: TicketState) -> dict:
    """运维处理节点。"""
    return {"response": "运维建议：请提供服务器 IP 和错误日志，我们会安排工程师排查。", "history": state["history"] + ["运维处理"]}

def billing_handler(state: TicketState) -> dict:
    """账单处理节点。"""
    return {"response": "账单问题：请联系财务团队核对账单明细，电话 400-xxx-xxxx。", "history": state["history"] + ["账单处理"]}

def product_handler(state: TicketState) -> dict:
    """产品处理节点。"""
    return {"response": "产品问题：请提供详细的功能描述和复现步骤，产品团队会尽快回复。", "history": state["history"] + ["产品处理"]}

def security_handler(state: TicketState) -> dict:
    """安全处理节点。"""
    return {"response": "【紧急】安全问题已上报安全团队，请在 1 小时内等待安全工程师联系。", "history": state["history"] + ["安全处理"]}

# ─── 3. 构建路由 ───
def route_by_type(state: TicketState) -> Literal["ops", "billing", "product", "security"]:
    return state["ticket_type"]

# ─── 4. 构建图 ───
graph = StateGraph(TicketState)

graph.add_node("classify", classify)
graph.add_node("ops", ops_handler)
graph.add_node("billing", billing_handler)
graph.add_node("product", product_handler)
graph.add_node("security", security_handler)

graph.set_entry_point("classify")
graph.add_conditional_edges("classify", route_by_type, {
    "ops": "ops",
    "billing": "billing",
    "product": "product",
    "security": "security",
})
graph.add_edge("ops", END)
graph.add_edge("billing", END)
graph.add_edge("product", END)
graph.add_edge("security", END)

app = graph.compile()

# ─── 5. 运行 ───
result = app.invoke({
    "user_input": "我的服务器 CPU 突然飙到 95%，数据库响应很慢",
    "ticket_type": "",
    "response": "",
    "history": [],
})

print(f"分类: {result['ticket_type']}")
print(f"回复: {result['response']}")
print(f"路径: {result['history']}")
```

**运行效果：**

```
分类: ops
回复: 运维建议：请提供服务器 IP 和错误日志，我们会安排工程师排查。
路径: ['分类: ops', '运维处理']
```

```
分类: billing
回复: 账单问题：请联系财务团队核对账单明细，电话 400-xxx-xxxx。
路径: ['分类: billing', '账单处理']
```

**这一阶段学到的：**

| 概念 | 在系统中的角色 |
|------|---------------|
| StateGraph | 工单处理流程蓝图 |
| State (TypedDict) | 工单的"数据模型" |
| Node | 每个处理步骤（分类、运维、账单…） |
| Conditional Edge | 根据分类结果路由到不同处理节点 |

用 `app.get_graph().draw_mermaid()` 可以可视化这个图：

```mermaid
graph TD
    A[START] --> B[classify]
    B --> C{route_by_type}
    C -->|ops| D[ops]
    C -->|billing| E[billing]
    C -->|product| F[product]
    C -->|security| G[security]
    D --> H[END]
    E --> H
    F --> H
    G --> H

    style A fill:#42b883,color:#fff
    style B fill:#646cff,color:#fff
    style C fill:#f59e0b
    style D fill:#5c9aff,color:#fff
    style E fill:#a855f7,color:#fff
    style F fill:#42b883,color:#fff
    style G fill:#ef4444,color:#fff
    style H fill:#42b883,color:#fff
```

---

## 第二阶段：加入工具——自动回答简单问题

**目标：** 对常见问题，Agent 能自动从知识库检索并回答，不再只是给一个"请联系 XX"的敷衍回复。

在第一阶段基础上，我们需要：
1. 添加**工具**：检索知识库、查询工单系统
2. 添加**LLM 工具调用**：让 LLM 决定用哪个工具
3. 添加**答案生成**节点：基于检索结果生成回答
4. 添加**质量检查循环**：答案不够好就重新检索

### 2.1 定义工具

```python
from langchain_core.tools import tool
from pydantic import BaseModel, Field

# 模拟知识库
MOCK_KNOWLEDGE_BASE = {
    "CPU": "CPU 飙高的排查步骤：\n1. top 命令确认占用最高的进程\n2. 检查 MySQL 慢查询日志\n3. 检查是否有定时任务或备份\n4. 必要时重启或扩容",
    "数据库": "数据库响应慢的常见原因：\n1. 慢查询堆积\n2. 连接池耗尽\n3. 锁等待超时\n4. 磁盘 IO 瓶颈",
    "账单": "账单查询：\n登录控制台 → 费用中心 → 账单明细\n如有疑问请提交工单",
    "安全": "安全事件处理流程：\n1. 隔离受影响实例\n2. 收集日志\n3. 安全团队介入\n4. 修复并复盘",
}

@tool
def search_knowledge(query: str) -> str:
    """在运维知识库中搜索相关信息。"""
    results = []
    for keyword, content in MOCK_KNOWLEDGE_BASE.items():
        if keyword in query:
            results.append(content)
    return "\n---\n".join(results) if results else "未找到相关知识。"

@tool
def check_ticket_history(ticket_id: str) -> str:
    """查询历史工单记录。"""
    return f"工单 {ticket_id} 的历史记录：\n- 2026-05-28: CPU 告警，已处理\n- 2026-05-15: 磁盘满，已清理"
```

### 2.2 构建带工具的 Agent 图

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, Literal
import operator

# 扩展状态
class TicketState(TypedDict):
    user_input: str
    ticket_type: str
    knowledge: str          # 检索到的知识
    response: str
    quality_score: float    # 答案质量评分 (0-1)
    retry_count: int
    history: Annotated[list, operator.add]  # 追加模式

# 节点
def classify(state: TicketState) -> dict:
    ticket_type = mock_llm_classify(state["user_input"])
    return {
        "ticket_type": ticket_type,
        "history": [f"分类: {ticket_type}"],
    }

def retrieve(state: TicketState) -> dict:
    knowledge = search_knowledge.invoke(state["user_input"])
    return {"knowledge": knowledge, "history": [f"检索到 {len(knowledge)} 字知识"]}

def generate(state: TicketState) -> dict:
    if not state["knowledge"] or state["knowledge"] == "未找到相关知识。":
        return {"response": f"抱歉，知识库中没有关于「{state['user_input']}」的信息。已为您转人工处理。", "history": ["知识库无结果"]}
    
    prompt = f"""你是一个运维助手。请根据以下知识库内容回答用户问题。
要求：回答简洁、准确，直接给出解决方案。

知识库：
{state['knowledge']}

用户问题：{state['user_input']}"""

    # 实际项目中替换为 LLM 调用
    response = mock_llm_generate(prompt)
    return {"response": response, "history": [f"生成答案: {response[:30]}..."]}

def quality_check(state: TicketState) -> dict:
    """检查答案质量。"""
    if state["response"].startswith("抱歉"):
        return {"quality_score": 0.0, "retry_count": state.get("retry_count", 0) + 1}
    if len(state["response"]) < 20:
        return {"quality_score": 0.3, "retry_count": state.get("retry_count", 0) + 1}
    return {"quality_score": 0.9}

def mock_llm_generate(prompt: str) -> str:
    return "CPU 飙高排查步骤：\n1. 用 top 命令确认占用最高的进程\n2. 检查 MySQL 慢查询日志\n3. 检查是否有定时任务\n4. 必要时重启或扩容"

# 路由
def route_by_type(state: TicketState) -> Literal["ops", "billing", "product", "manual"]:
    if state["ticket_type"] in ("ops", "product"):
        return "ops"  # 运维和产品都走知识库
    if state["ticket_type"] == "billing":
        return "billing"
    return "manual"  # 安全类走人工

def quality_router(state: TicketState) -> Literal["done", "retry", "manual"]:
    if state["quality_score"] >= 0.8:
        return "done"
    if state.get("retry_count", 0) < 2 and state["knowledge"]:
        return "retry"  # 重新生成
    return "manual"  # 转人工

# 构建图
graph = StateGraph(TicketState)

graph.add_node("classify", classify)
graph.add_node("retrieve", retrieve)
graph.add_node("generate", generate)
graph.add_node("quality_check", quality_check)
graph.add_node("ops", lambda s: {"response": s["response"], "history": ["运维回答完成"]})
graph.add_node("billing", billing_handler)
graph.add_node("manual", lambda s: {"response": "已转人工处理，请耐心等待。", "history": ["转人工"]})

graph.set_entry_point("classify")
graph.add_conditional_edges("classify", route_by_type, {
    "ops": "retrieve",
    "billing": "billing",
    "manual": "manual",
})

graph.add_edge("retrieve", "generate")
graph.add_edge("generate", "quality_check")
graph.add_conditional_edges("quality_check", quality_router, {
    "done": "ops",
    "retry": "generate",     # 重新生成
    "manual": "manual",
})
graph.add_edge("ops", END)
graph.add_edge("billing", END)
graph.add_edge("manual", END)

app = graph.compile()
```

### 2.3 运行效果

**简单问题（知识库有答案）：**

```python
result = app.invoke({
    "user_input": "我的服务器 CPU 突然飙到 95%，数据库响应很慢",
    "ticket_type": "", "knowledge": "", "response": "",
    "quality_score": 0, "retry_count": 0, "history": [],
})
```

```
路径追踪：
1. [classify]     → 分类: ops
2. [retrieve]     → 检索到 180 字知识
3. [generate]     → 生成答案: CPU 飙高排查步骤：1. 用...
4. [quality_check] → quality_score: 0.9
5. [ops]          → 运维回答完成

最终回复:
CPU 飙高排查步骤：
1. 用 top 命令确认占用最高的进程
2. 检查 MySQL 慢查询日志
3. 检查是否有定时任务
4. 必要时重启或扩容
```

**复杂问题（知识库无答案）：**

```python
result = app.invoke({
    "user_input": "我们的系统架构需要优化，有什么建议？",
    "ticket_type": "", "knowledge": "", "response": "",
    "quality_score": 0, "retry_count": 0, "history": [],
})
```

```
路径追踪：
1. [classify]      → 分类: ops
2. [retrieve]      → 检索到 0 字知识
3. [generate]      → 生成答案: 抱歉，知识库中没有...
4. [quality_check] → quality_score: 0.0
5. [manual]        → 转人工

最终回复: 已转人工处理，请耐心等待。
```

**这一阶段学到的：**

| 新能力 | 对应 LangGraph 特性 |
|--------|-------------------|
| 工具调用 | `@tool` + LangChain 工具绑定 |
| 条件路由到不同子流程 | `add_conditional_edges` 返回值指向不同节点 |
| 质量检查循环 | 条件边回到 `generate` 实现重试 |
| 消息历史追加 | `Annotated[list, operator.add]` |

---

## 第三阶段：多轮对话——记住上下文

**目标：** 用户追问时 Agent 能理解上下文，而不是每次都从头来。

### 3.1 问题：没有记忆的 Agent

```python
# 第一阶段的问题——每次都是全新的对话
result1 = app.invoke({"user_input": "CPU 飙到 95% 怎么办？", ...})
result2 = app.invoke({"user_input": "检查了，是 MySQL 占满了", ...})
# ← Agent 不知道"检查了"指的是什么，因为每次 invoke 都是独立调用
```

### 3.2 解法：Checkpointer

LangGraph 的 Checkpointer 机制让 Agent 能跨轮次保留状态。只需要改一行代码：

```python
from langgraph.checkpoint.memory import MemorySaver

# 编译时传入 checkpointer
checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer)

# 用 thread_id 标识对话会话
config = {"configurable": {"thread_id": "user-session-001"}}

# 第一轮
result1 = app.invoke({
    "user_input": "CPU 飙到 95% 怎么办？",
    "ticket_type": "", "knowledge": "", "response": "",
    "quality_score": 0, "retry_count": 0, "history": [],
}, config)

print("第一轮回复:", result1["response"])
# → CPU 飙高排查步骤：1. 用 top 命令...

# 第二轮——同一个 thread_id
result2 = app.invoke({
    "user_input": "检查了，是 MySQL 占满了",  # ← 没有重新说 CPU 的事
    "ticket_type": "", "knowledge": "", "response": "",
    "quality_score": 0, "retry_count": 0, "history": [],
}, config)

print("第二轮回复:", result2["response"])
# → 如果是 MySQL 占满 CPU，请检查慢查询日志...
#   Agent 知道"MySQL"是在说之前的 CPU 问题
```

### 3.3 生产环境：PostgresSaver

```python
# 开发环境用 MemorySaver（内存中，进程重启丢失）
checkpointer = MemorySaver()

# 生产环境必须用 PostgresSaver
# pip install langgraph-checkpoint-postgres
from langgraph.checkpoint.postgres import PostgresSaver

checkpointer = PostgresSaver.from_conn_string(
    "postgresql://user:pass@localhost:5432/ticket_db"
)
app = graph.compile(checkpointer=checkpointer)
```

**为什么生产不能用 MemorySaver？**

如果你的服务用 `uvicorn --workers 4` 或 `gunicorn` 部署，每个进程有独立的内存。用户第二轮请求可能路由到另一个进程，记忆就丢了。PostgresSaver 持久化到数据库，所有进程共享。

| 存储方式 | 持久化 | 并发支持 | 适合场景 |
|----------|--------|---------|----------|
| MemorySaver | 否 | 否 | 开发/测试 |
| PostgresSaver | 是 | 是 | 生产环境 |
| RedisSaver | 是 | 是 | 高并发低延迟 |

### 3.4 用 Reducer 管理消息历史

`operator.add` 让每次对话的消息追加到列表，而不是覆盖：

```python
from typing import Annotated
import operator

class TicketState(TypedDict):
    messages: Annotated[list, operator.add]  # 追加模式
    # ... 其他字段

def user_input_node(state: TicketState) -> dict:
    return {"messages": [{"role": "user", "content": state["user_input"]}]}

def agent_response_node(state: TicketState) -> dict:
    return {"messages": [{"role": "assistant", "content": state["response"]}]}

# 经过两轮对话后：
# messages: [
#   {"role": "user", "content": "CPU 飙到 95% 怎么办？"},
#   {"role": "assistant", "content": "请检查..."},
#   {"role": "user", "content": "检查了，是 MySQL"},
#   {"role": "assistant", "content": "如果是 MySQL..."},
# ]
```

**运行效果：**

```
第一轮: "CPU 飙到 95% 怎么办？"
→ 分类: ops → 检索 → 生成 → 质量通过
→ "CPU 飙高排查步骤：1. top 命令..."

第二轮: "检查了，是 MySQL 占满了"
→ 分类: ops → 检索(结合上下文) → 生成
→ "如果是 MySQL 占满 CPU，请检查慢查询日志..."

第三轮: "慢查询日志里都是全表扫描"
→ 分类: ops → 检索(优化相关) → 生成
→ "全表扫描的优化建议：1. 添加索引 2. 改写查询..."
```

**这一阶段学到的：**

| 概念 | 一句话解释 |
|------|-----------|
| Checkpointer | 给 Agent 装上存档点，每次对话从存档恢复 |
| thread_id | 每个用户的对话是独立的，互不干扰 |
| PostgresSaver | 生产环境必须用，否则多进程部署记忆会丢 |
| Reducer | 控制字段是"替换"还是"追加" |

---

## 第四阶段：流式输出与可观测——让系统透明

**目标：** 用户不用盯着白屏等，开发者知道系统内部在干什么。

### 4.1 问题：黑盒等待

```python
# invoke() 会等全部节点执行完才返回
result = app.invoke({...}, config)
# ← 用户等了 5 秒，白屏，不知道 Agent 在干嘛
```

### 4.2 解法一：逐节点 Streaming

```python
# stream() 每完成一个节点就返回
for event in app.stream({
    "user_input": "CPU 飙到 95% 怎么办？",
    "ticket_type": "", "knowledge": "", "response": "",
    "quality_score": 0, "retry_count": 0, "history": [],
}, config):
    for node_name, output in event.items():
        print(f"[{node_name}] {output}")
```

```
[classify] {'ticket_type': 'ops', 'history': ['分类: ops']}
[retrieve] {'knowledge': 'CPU 飙高的排查步骤...', 'history': ['检索到 180 字知识']}
[generate] {'response': 'CPU 飙高排查步骤...', 'history': ['生成答案: CPU 飙高...']}
[quality_check] {'quality_score': 0.9}
[ops] {'response': 'CPU 飙高排查步骤...', 'history': ['运维回答完成']}
```

### 4.3 解法二：Token 级 Streaming（用户看到的）

```python
import asyncio

async def stream_response(user_input: str, config: dict):
    """实时推送 LLM 生成的每个 token。"""
    async for event in app.astream_events({
        "user_input": user_input,
        "ticket_type": "", "knowledge": "", "response": "",
        "quality_score": 0, "retry_count": 0, "history": [],
    }, config, version="v2"):
        kind = event["event"]

        if kind == "on_chat_model_stream":
            # LLM token 级输出
            token = event["data"]["chunk"].content
            if token:
                print(token, end="", flush=True)

        elif kind == "on_tool_start":
            print(f"\n🔍 正在搜索: {event['name']}...")

        elif kind == "on_tool_end":
            print(f" ✅ 搜索完成")

        elif kind == "on_chain_end":
            node = event.get("name", "")
            if node == "quality_check":
                score = event["data"].get("output", {}).get("quality_score", 0)
                print(f"\n✓ 质量评分: {score:.1f}")
```

```
[用户看到的效果]
🔍 正在搜索: search_knowledge... ✅ 搜索完成
CPU 飙高排查步骤：
1. 用 top 命令确认占用最高的进程
2. 检查 MySQL 慢查询日志     ← 逐字输出，不用等
3. 检查是否有定时任务
4. 必要时重启或扩容
✓ 质量评分: 0.9
```

### 4.4 解法三：LangSmith 可观测（开发者看到的）

```python
# 环境变量
# export LANGCHAIN_TRACING_V2=true
# export LANGCHAIN_API_KEY=ls_xxx
# export LANGCHAIN_PROJECT=ticket-agent

# 不需要改代码！LangSmith 自动记录：
# - 每个节点的输入和输出
# - LLM 调用（prompt、响应、token 消耗）
# - 工具调用（名称、参数、返回值）
# - 执行图的可视化
# - 延迟分布
```

LangSmith 控制台会显示类似这样的执行图：

```
Ticket Agent Execution
├── classify (0.3s)
│   └── output: ticket_type="ops"
├── retrieve (1.2s)
│   ├── tool_call: search_knowledge("CPU 飙到 95%...")
│   └── output: 180 chars
├── generate (2.1s)
│   ├── llm_call: 输入 4200 tokens, 输出 380 tokens
│   └── output: "CPU 飙高排查步骤..."
├── quality_check (0.1s)
│   └── output: quality_score=0.9
└── ops (0.0s)
    └── output: "运维回答完成"

总耗时: 3.7s | Token 成本: $0.015
```

**这一阶段学到的：**

| 方法 | 适合场景 | 代码改动 |
|------|---------|---------|
| `invoke()` | 同步 API，等全部完成再返回 | 无 |
| `stream()` | 调试，看每步中间结果 | 改调用方式 |
| `astream_events()` | 用户端 token 级实时输出 | 需要 async |
| LangSmith | 开发者调试、监控、成本追踪 | 加环境变量 |

---

## 第五阶段：人在回路——复杂工单审批

**目标：** 当 Agent 无法自动解决问题时，生成工单并等待人工审批。人工批准后才能派单执行。

### 5.1 场景

```
用户: "我们的生产数据库需要迁移到新集群，能帮忙吗？"
Agent: "这是一个复杂的运维变更，需要 DBA 团队介入。"
       "已生成工单 TICKET-20260601-0042"
       "类型: 运维紧急 | 优先级: P1"

⏸️ 等待审批...

管理员: 查看工单详情 → 批准
Agent: "工单已批准，已派发给 DBA 团队，预计 30 分钟内处理。"
```

### 5.2 实现

```python
from langgraph.checkpoint.memory import MemorySaver
import uuid

# 扩展状态
class TicketState(TypedDict):
    user_input: str
    ticket_type: str
    knowledge: str
    response: str
    quality_score: float
    retry_count: int
    ticket_id: str        # 工单编号
    approved: bool        # 审批结果
    feedback: str         # 审批意见
    history: Annotated[list, operator.add]

def create_ticket(state: TicketState) -> dict:
    """生成工单。"""
    ticket_id = f"TICKET-{uuid.uuid4().hex[:8].upper()}"
    priority = "P1" if state["ticket_type"] == "security" else "P2"
    return {
        "ticket_id": ticket_id,
        "response": f"已生成工单 {ticket_id}\n类型: {state['ticket_type']}\n优先级: {priority}\n请等待人工审批。",
        "approved": False,
        "history": [f"生成工单: {ticket_id}, 优先级 {priority}"],
    }

def manual_approve(state: TicketState) -> dict:
    # 这个节点本身不做任何事——它只是 interrupt 的停泊点
    # 人工通过 update_state 更新 approved 字段后继续
    return {"history": state["history"] + ["等待审批..."]}

def dispatch(state: TicketState) -> dict:
    """派单处理。"""
    if state["approved"]:
        return {
            "response": f"工单 {state['ticket_id']} 已批准，已派发给相关团队处理。",
            "history": state["history"] + ["工单已批准并派发"],
        }
    else:
        return {
            "response": f"工单 {state['ticket_id']} 已被拒绝。{state.get('feedback', '')}",
            "history": state["history"] + ["工单被拒绝"],
        }

# 构建图
graph = StateGraph(TicketState)

graph.add_node("classify", classify)
graph.add_node("retrieve", retrieve)
graph.add_node("generate", generate)
graph.add_node("quality_check", quality_check)
graph.add_node("ops", lambda s: {"response": s["response"], "history": ["运维回答完成"]})
graph.add_node("create_ticket", create_ticket)
graph.add_node("approve", manual_approve)
graph.add_node("dispatch", dispatch)

graph.set_entry_point("classify")

# 分类后：简单问题走检索，复杂问题走工单
graph.add_conditional_edges("classify", lambda s: s["ticket_type"], {
    "ops": "retrieve",
    "billing": "ops",       # 账单直接回答
    "security": "create_ticket",  # 安全类直接建工单
    "product": "retrieve",
})

graph.add_edge("retrieve", "generate")
graph.add_edge("generate", "quality_check")

# 质量检查后：好的答案直接返回，差的建工单
graph.add_conditional_edges("quality_check", lambda s: "done" if s["quality_score"] >= 0.5 else "ticket", {
    "done": "ops",
    "ticket": "create_ticket",
})

graph.add_edge("ops", END)

# 工单流程：创建 → 审批 → 派发
graph.add_edge("create_ticket", "approve")
graph.add_edge("approve", "dispatch")
graph.add_edge("dispatch", END)

# 关键：在 approve 节点之前中断
checkpointer = MemorySaver()
app = graph.compile(
    checkpointer=checkpointer,
    interrupt_before=["approve"],  # 在审批之前停下来等人
)
```

### 5.3 使用流程

```python
config = {"configurable": {"thread_id": "ticket-approval-001"}}

# ── 第 1 步：Agent 自动执行到审批点 ──
result = app.invoke({
    "user_input": "生产数据库需要迁移到新集群，涉及 50 台服务器",
    "ticket_type": "", "knowledge": "", "response": "",
    "quality_score": 0, "retry_count": 0,
    "ticket_id": "", "approved": False, "feedback": "",
    "history": [],
}, config)

print("工单信息:")
print(f"  编号: {result['ticket_id']}")
print(f"  状态: 等待审批")
print(f"  回复: {result['response']}")

# ── 第 2 步：管理员审批 ──
# 管理员查看工单后，通过 update_state 更新审批结果
app.update_state(config, {"approved": True, "feedback": "同意，请尽快处理"})

# ── 第 3 步：继续执行 ──
final = app.invoke(None, config)  # 传入 None = 不修改 State，直接继续
print(f"\n审批后结果: {final['response']}")
# → 工单 TICKET-XXXXXXXX 已批准，已派发给相关团队处理。
```

**这一阶段学到的：**

| 概念 | 一句话解释 |
|------|-----------|
| `interrupt_before` | 在某个节点执行前暂停，等人操作 |
| `interrupt_after` | 在某个节点执行后暂停，让人检查结果 |
| `update_state` | 人工修改 State 后再继续 |
| `invoke(None, config)` | 不修改 State，直接从断点继续 |
| 断点恢复 | 配合 checkpointer，服务重启后仍能恢复 |

---

## 第六阶段：多智能体——团队协作

**目标：** 单一 Agent 能力有限，升级为多 Agent 协作：分类主管 → 运维工人 → 账单工人 → 审核员。

### 6.1 为什么需要多智能体

单 Agent 的问题：一个 LLM 既要分类、又要检索、又要生成、又要审核——提示词越来越长，容易混淆上下文，工具越来越多也管不过来。

多 Agent 的思路：每个 Agent 专注做好一件事，由一个 Supervisor 协调。

```mermaid
graph TD
    A["用户输入"] --> B["Supervisor\n分类与调度"]
    B -->|"运维问题"| C["Ops Worker\n运维专家"]
    B -->|"账单问题"| D["Billing Worker\n账单专家"]
    B -->|"产品问题"| E["Product Worker\n产品专家"]
    C --> F["审核员\n质量验证"]
    D --> F
    E --> F
    F -->|"通过"| G["返回用户"]
    F -->|"不通过"| B

    style A fill:#42b883,color:#fff
    style B fill:#f59e0b
    style C fill:#646cff,color:#fff
    style D fill:#a855f7,color:#fff
    style E fill:#5c9aff,color:#fff
    style F fill:#ef4444,color:#fff
    style G fill:#42b883,color:#fff
```

### 6.2 Supervisor + Worker 实现

```python
from pydantic import BaseModel, Field

class TeamState(TypedDict):
    user_input: str
    next_worker: str
    worker_result: str
    review_passed: bool
    final_response: str
    history: Annotated[list, operator.add]

class SupervisorDecision(BaseModel):
    next_worker: Literal["ops_worker", "billing_worker", "product_worker", "reviewer"]
    reasoning: str

def supervisor(state: TeamState) -> dict:
    """Supervisor：LLM 决定交给哪个 Worker。"""
    response = llm_with_structured_output.invoke([
        {"role": "system", "content": "你是工单系统主管。根据用户问题决定交给哪个专业团队处理。"},
        {"role": "user", "content": f"用户问题：{state['user_input']}"},
    ])
    decision: SupervisorDecision = response.parsed
    return {
        "next_worker": decision.next_worker,
        "history": [f"Supervisor 决定: {decision.next_worker} ({decision.reasoning})"],
    }

def ops_worker(state: TeamState) -> dict:
    """运维专家 Worker。"""
    knowledge = search_knowledge.invoke(state["user_input"])
    answer = mock_llm_generate(f"基于以下知识回答：{knowledge}\n问题：{state['user_input']}")
    return {
        "worker_result": answer,
        "history": ["Ops Worker 完成"],
    }

def billing_worker(state: TeamState) -> dict:
    """账单专家 Worker。"""
    return {"worker_result": billing_handler(state)["response"], "history": ["Billing Worker 完成"]}

def product_worker(state: TeamState) -> dict:
    """产品专家 Worker。"""
    return {"worker_result": product_handler(state)["response"], "history": ["Product Worker 完成"]}

def reviewer(state: TeamState) -> dict:
    """审核员：验证 Worker 的输出质量。"""
    review_prompt = f"""请评估以下回答质量：
问题：{state['user_input']}
回答：{state['worker_result'][:200]}

如果回答准确、完整、可操作，回复 PASSED，否则回复 FAILED。"""
    review = mock_llm_generate(review_prompt)
    passed = "PASSED" in review
    return {
        "review_passed": passed,
        "final_response": state["worker_result"] if passed else "回答质量不佳，已退回重做",
        "history": [f"审核: {'通过' if passed else '不通过'}"],
    }

# 构建图
graph = StateGraph(TeamState)
graph.add_node("supervisor", supervisor)
graph.add_node("ops_worker", ops_worker)
graph.add_node("billing_worker", billing_worker)
graph.add_node("product_worker", product_worker)
graph.add_node("reviewer", reviewer)

graph.set_entry_point("supervisor")

# Supervisor 路由
graph.add_conditional_edges("supervisor", lambda s: s["next_worker"], {
    "ops_worker": "ops_worker",
    "billing_worker": "billing_worker",
    "product_worker": "product_worker",
    "reviewer": "reviewer",
})

# Worker 统一回 Supervisor → 审核
graph.add_edge("ops_worker", "supervisor")
graph.add_edge("billing_worker", "supervisor")
graph.add_edge("product_worker", "supervisor")

# 审核后：通过 → END，不通过 → Supervisor 重做
graph.add_conditional_edges("reviewer", lambda s: "done" if s["review_passed"] else "redo", {
    "done": END,
    "redo": "supervisor",
})

app = graph.compile()
```

### 6.3 运行效果

```
输入: "我们的线上支付系统偶尔出现超时，帮我查一下原因"

1. [supervisor]    → 决定: ops_worker (支付超时属于运维问题)
2. [ops_worker]    → 检索知识库 → 生成回答
3. [supervisor]    → 决定: reviewer (Worker 完成，送审)
4. [reviewer]      → 审核: 通过
5. → END

最终回复: 支付超时排查建议：
1. 检查数据库连接池配置
2. 查看支付网关日志
3. 确认第三方 API 延迟
4. 检查网络延迟（ping/traceroute）
```

### 6.4 Supervisor vs Handoff

| 维度 | Supervisor | Handoff（固定路由） |
|------|-----------|-------------------|
| 调度方式 | LLM 动态决策 | 规则/条件固定路由 |
| 灵活性 | 高（LLM 可自由判断） | 低（路径确定） |
| 可控性 | 低（LLM 可能判断错） | 高（路径固定） |
| 调试难度 | 高（每次路径可能不同） | 低（路径固定） |
| 适合场景 | 开放式研究、探索性任务 | 结构化流程、分类分发 |

我们的工单系统用的是 **Handoff 模式**（第一阶段就在用的条件路由），因为工单分类是确定的规则场景。如果未来要加入更灵活的任务分解，可以切换为 Supervisor。

**这一阶段学到的：**

| 概念 | 一句话解释 |
|------|-----------|
| Supervisor 模式 | 一个 LLM 当主管，动态决定下一步交给谁 |
| Worker 模式 | 每个 Agent 专注一个领域，输入输出契约明确 |
| 审核循环 | Worker 完成后回到 Supervisor 做质量验证 |
| 子图 | 把 Supervisor+Workers 封装为子图，在更大系统中复用 |

---

## 第七阶段：生产部署——FastAPI + 容错

**目标：** 把工单 Agent 部署为生产级 API 服务，支持流式输出、错误处理、熔断降级。

### 7.1 FastAPI 同步端点

```python
# server.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langgraph.checkpoint.postgres import PostgresSaver
import uuid

app = FastAPI(title="智能工单系统")

# 生产环境用 PostgresSaver
checkpointer = PostgresSaver.from_conn_string(
    "postgresql://ticket_user:pass@localhost:5432/ticket_db"
)
agent = build_agent().compile(checkpointer=checkpointer, interrupt_before=["approve"])

class QueryRequest(BaseModel):
    query: str
    thread_id: str | None = None

class QueryResponse(BaseModel):
    response: str
    ticket_id: str | None = None
    thread_id: str
    path: list[str]

@app.post("/api/ticket/query", response_model=QueryResponse)
def ticket_query(request: QueryRequest):
    """同步查询——等待 Agent 全部完成后返回。"""
    thread_id = request.thread_id or str(uuid.uuid4())
    config = {"configurable": {"thread_id": thread_id}}

    result = agent.invoke({
        "user_input": request.query,
        "ticket_type": "", "knowledge": "", "response": "",
        "quality_score": 0, "retry_count": 0,
        "ticket_id": "", "approved": False, "feedback": "",
        "history": [],
    }, config)

    return QueryResponse(
        response=result["response"],
        ticket_id=result.get("ticket_id") or None,
        thread_id=thread_id,
        path=result["history"],
    )
```

### 7.2 SSE 流式端点

```python
from fastapi.responses import StreamingResponse
import json

@app.post("/api/ticket/query/stream")
def ticket_query_stream(request: QueryRequest):
    """流式查询——SSE 实时推送每个节点输出和 LLM token。"""
    thread_id = request.thread_id or str(uuid.uuid4())
    config = {"configurable": {"thread_id": thread_id}}

    async def event_stream():
        async for event in agent.astream_events({
            "user_input": request.query,
            "ticket_type": "", "knowledge": "", "response": "",
            "quality_score": 0, "retry_count": 0,
            "ticket_id": "", "approved": False, "feedback": "",
            "history": [],
        }, config, version="v2"):
            kind = event["event"]

            if kind == "on_chat_model_stream":
                token = event["data"]["chunk"].content
                if token:
                    yield f"data: {json.dumps({'type': 'token', 'content': token})}\n\n"

            elif kind == "on_tool_start":
                yield f"data: {json.dumps({'type': 'tool_start', 'name': event['name']})}\n\n"

            elif kind == "on_chain_end":
                node_name = event.get("name", "")
                if node_name in ("classify", "quality_check", "create_ticket", "dispatch"):
                    output = event["data"].get("output", {})
                    yield f"data: {json.dumps({'type': 'node', 'name': node_name, 'output': output})}\n\n"

            elif kind == "on_chain_end" and event.get("name") == "LangGraph":
                yield f"data: {json.dumps({'type': 'done', 'thread_id': thread_id})}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**前端接入：**

```javascript
const response = await fetch('/api/ticket/query/stream', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query: 'CPU 飙到 95% 怎么办？'}),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
    const {done, value} = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    for (const line of text.split('\n')) {
        if (line.startsWith('data: ')) {
            const event = JSON.parse(line.slice(6));
            if (event.type === 'token') {
                // 逐字追加到回答区域
                answerElement.textContent += event.content;
            } else if (event.type === 'node') {
                // 显示当前步骤
                statusElement.textContent = `正在执行: ${event.name}`;
            }
        }
    }
}
```

### 7.3 错误处理与熔断

```python
class CircuitBreaker:
    """熔断器：连续失败 N 次后跳过该节点，避免雪崩。"""
    def __init__(self, threshold: int = 5, cooldown: int = 60):
        self.failures = 0
        self.threshold = threshold
        self.cooldown = cooldown
        self.last_failure_time = 0

    def is_open(self) -> bool:
        import time
        if self.failures >= self.threshold:
            if time.time() - self.last_failure_time > self.cooldown:
                self.failures = 0
                return False
            return True  # 熔断中，跳过
        return False

    def record_failure(self):
        import time
        self.failures += 1
        self.last_failure_time = time.time()

# 知识库检索熔断
knowledge_breaker = CircuitBreaker(threshold=3, cooldown=120)

def safe_retrieve(state: TicketState) -> dict:
    """带熔断的知识检索。"""
    if knowledge_breaker.is_open():
        return {
            "knowledge": "知识库服务暂时不可用，使用默认回答。",
            "history": state["history"] + ["知识库熔断中，使用降级回答"],
        }
    try:
        knowledge = search_knowledge.invoke(state["user_input"])
        return {"knowledge": knowledge, "history": state["history"] + ["检索成功"]}
    except Exception as e:
        knowledge_breaker.record_failure()
        return {
            "knowledge": "检索失败，请稍后重试。",
            "history": state["history"] + [f"检索失败: {e}"],
        }
```

### 7.4 生产部署架构

```mermaid
flowchart LR
    A["用户"] --> B["Nginx / API Gateway"]
    B --> C["FastAPI Worker × 4"]
    C --> D["LangGraph Agent"]
    D --> E["PostgresSaver\n持久化状态"]
    D --> F["LLM API\nOpenAI/Claude"]
    D --> G["外部工具\n知识库/搜索/工单系统"]
    C --> H["Prometheus\n指标监控"]
    C --> I["Langfuse\n执行追踪"]

    style A fill:#42b883,color:#fff
    style C fill:#646cff,color:#fff
    style D fill:#f59e0b
    style E fill:#5c9aff,color:#fff
    style F fill:#a855f7,color:#fff
    style G fill:#ef4444,color:#fff
```

**关键配置清单：**

```dockerfile
# Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

```yaml
# docker-compose.yml
services:
  agent:
    build: .
    ports: ["8000:8000"]
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - LANGCHAIN_TRACING_V2=true
      - LANGCHAIN_API_KEY=${LANGCHAIN_API_KEY}
    depends_on: [postgres]

  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: ticket_db
      POSTGRES_USER: ticket_user
      POSTGRES_PASSWORD: pass
    volumes: [pgdata:/var/lib/postgresql/data]

  langfuse:
    image: langfuse/langfuse:latest
    ports: ["3001:3000"]
    environment:
      DATABASE_URL: postgresql://langfuse:pass@postgres-langfuse:5432/langfuse

volumes:
  pgdata:
```

**这一阶段学到的：**

| 能力 | 实现方式 |
|------|---------|
| 同步 API | `app.invoke()` 等全部完成再返回 |
| 流式 API | `astream_events()` + SSE |
| 会话隔离 | `thread_id` + PostgresSaver |
| 熔断降级 | CircuitBreaker 连续失败后跳过 |
| 监控 | Prometheus 指标 + Langfuse 追踪 |
| 部署 | Docker + uvicorn --workers 4 |

---

## 系统总览：7 步走完

把 7 个阶段串起来，完整的工单处理系统具备以下能力：

```
用户提交 → 分类 → 检索 → 生成 → 质检 → 返回/建工单 → 审批 → 派发
   │         │       │       │       │         │         │       │
   │         │       │       │       │         │         │       │
 多轮对话   工具     LLM    循环     流式     人在      多      生产
 记忆     调用     调用    重试    输出     回路     智能体    部署
```

| 阶段 | 新增能力 | LangGraph 特性 |
|------|---------|---------------|
| 1 | 工单分类 | StateGraph, State, Node, Conditional Edge |
| 2 | 工具调用 + 自动回答 | Tool, 质量检查循环, Reducer |
| 3 | 多轮对话 | Checkpointer, MemorySaver, PostgresSaver |
| 4 | 流式输出 + 可观测 | stream(), astream_events(), LangSmith |
| 5 | 人工审批 | interrupt_before, update_state, 断点恢复 |
| 6 | 多智能体协作 | Supervisor 模式, 审核循环 |
| 7 | 生产部署 | FastAPI, SSE, CircuitBreaker, Docker |

---

## 面试考点

以下问题都基于上面的工单系统代码。

### Q1: LangGraph 和其他 Agent 框架的核心差异？

> **满分回答：** LangGraph 的核心差异是**显式状态图建模**。CrewAI 用角色+任务，AutoGen 用对话循环——这些框架的控制流都由框架或 LLM 隐式决定。LangGraph 让开发者显式定义每一步：哪个节点、什么条件、去哪条路。就像我们的工单系统：classify → retrieve → generate → quality_check → (done/retry/manual)。这条路径是确定性的，不会因为你换了个 LLM 就变了。生产环境中，可控性比灵活性更重要。

### Q2: 如何防止 LangGraph 中的无限循环？

> **满分回答：** 三种机制：第一，条件路由中设置退出条件——比如 `quality_router` 中 `retry_count < 2` 才重试，否则转人工；第二，`graph.compile()` 可配置 `recursion_limit` 参数，超过限制自动终止；第三，业务逻辑保证条件边的返回值集合有限，不会在两个节点间无限跳转。

### Q3: Reducer 的作用？举一个工单系统中的例子。

> **满分回答：** Reducer 定义了节点返回的字段如何合并到现有 State。默认是直接替换，但有些场景需要追加。工单系统中的 `history` 字段用了 `Annotated[list, operator.add]`——每个节点执行完后，把执行日志追加到 history 列表，而不是覆盖。这样最终能看到完整的执行路径：`['分类: ops', '检索到 180 字知识', '生成答案...', '质量通过', '运维回答完成']`。

### Q4: 生产环境为什么不能用 MemorySaver？

> **满分回答：** MemorySaver 存在进程内存中，重启后丢失。更关键的是，如果用 `uvicorn --workers 4` 多进程部署，每个进程有独立的 MemorySaver。用户的第二轮请求可能路由到另一个进程，记忆就丢了。生产环境必须用 PostgresSaver（持久化到数据库，所有进程共享）或 RedisSaver（高并发场景）。

### Q5: interrupt_before 和 interrupt_after 的区别？

> **满分回答：** `interrupt_before` 在节点执行前暂停——适合审批场景，人审批后节点才执行。`interrupt_after` 在节点执行后暂停——适合检查场景，节点做完后人工检查结果，决定是继续还是退回。工单系统用的是 `interrupt_before=["approve"]`，人在审批前查看工单详情，批准后 approve 节点才执行。

### Q6: 实战题——用 LangGraph 构建一个带重试的搜索 Agent

> **满分回答框架：**
> 1. State: `query`, `results`, `answer`, `retry_count`
> 2. Node `search`: 调用搜索 API，返回结果
> 3. Node `generate`: 基于搜索结果生成答案
> 4. Node `check`: 如果答案为空或 "不知道"，返回 retry
> 5. Conditional Edge from `check`: retry_count < 3 → search, else → fail
> 6. compile + invoke

---

## 参考与延伸

### 官方资源
- [LangGraph 官方文档](https://langchain-ai.github.io/langgraph/)
- [LangGraph Studio](https://github.com/langchain-ai/langgraph-studio) — 可视化调试工具
- [LangSmith](https://smith.langchain.com/) — 可观测性平台

### 本教程相关章节
- [Agent 框架全景对比](./05-frameworks-tools.md) — LangGraph 与其他框架的定位
- [ReAct 模式实现](./13-agent-design-patterns.md) — 用 LangGraph 构建 ReAct Agent
- [Plan-and-Execute 模式](./13-agent-design-patterns.md) — Plan-Execute 循环
- [Agent Memory 系统](./07-agent-memory.md) — 记忆层详解（Mem0、GraphRAG）
- [生产部署架构](./10-production.md) — FastAPI + Docker + CI/CD
- [评估与可观测性](./12-evaluation-observability.md) — Langfuse、DeepEval
