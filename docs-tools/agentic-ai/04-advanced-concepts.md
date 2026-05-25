---
sidebar_position: 14
sidebar_label: 第四阶段 高级概念
---

# 第四阶段：高级概念与记忆管理——让智能体"更聪明、记更牢"

> 当智能体需要处理跨天、跨会话的复杂任务（如长期项目管理、多轮复杂咨询）时，基础的框架用法就不够用了，这时候需要掌握高级概念和记忆管理技巧。

## LCEL 与可运行单元

LCEL（LangChain Expression Language）可以简单理解为"组件化编程"——通过声明式管道将不同的组件组合起来，让代码更模块化、可测试、可复用。

### 组件化管道

```python
from langchain_core.runnables import RunnablePassthrough

# 声明式管道：检索 → 格式化 → LLM → 解析输出
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt_template
    | llm
    | output_parser
)

# 运行
result = chain.invoke("什么是 RAG？")
```

**好处**：
- 每个组件可以独立测试
- 管道可以嵌套组合
- 代码更清晰、可复用

### Runnable 类型

| 类型 | 作用 | 示例 |
|------|------|------|
| `RunnablePassthrough` | 透传输入 | 传递用户问题 |
| `RunnableLambda` | 自定义转换函数 | 格式化结果 |
| `RunnableBranch` | 条件分支 | 根据问题类型路由 |

## 多智能体 vs 单智能体 + 工具

很多小白会觉得"多智能体更高级"，盲目追求多智能体架构。其实不然。

### 选型决策树

```
任务是否可以单步完成？
  ├── 是 → 单智能体 + 工具
  └── 否 → 任务是否需要专业知识分工？
              ├── 否 → 单智能体 + 多个工具
              └── 是 → 多智能体
```

### 单智能体 + 工具

```
用户 ─→ 单智能体 ─→ [搜索工具, 计算工具, 数据库工具, ...]
                    智能体自己决定使用哪个工具
```

**优点**：简单、高效、低开销
**适用**：大多数场景

### 多智能体（角色分工）

```
用户 ─→ 规划者 (Planner)
         ├── 检索者 (Researcher) ─→ [搜索工具]
         ├── 执行者 (Executor)   ─→ [代码工具]
         └── 审核者 (Reviewer)   ─→ [验证结果]
```

**优点**：专业分工、适合复杂任务
**缺点**：协调开销大、调试困难

### 核心原则

> **只在任务确实需要分解、单智能体无法完成时，再考虑多智能体架构，避免过度设计。**

## 记忆的分层设计（核心重点）

智能体的"记忆"决定了它的任务处理能力，建议按以下三层设计：

### 三层记忆架构

```
┌─────────────────────────────────────────┐
│          短期记忆 (Short-term)           │
│  对话窗口内的即时上下文                   │
│  当前提问 + 上一步操作                    │
│  无需额外存储，随对话结束失效              │
├─────────────────────────────────────────┤
│          长期记忆 (Long-term)            │
│  存储在外部向量库中                      │
│  用户偏好、历史对话摘要、业务知识           │
│  供智能体长期调用，实现"记住用户"          │
├─────────────────────────────────────────┤
│          检查点 (Checkpoints)            │
│  保存工作流的中间状态                     │
│  复杂任务的执行进度、已完成的步骤           │
│  实现任务恢复、人机协同的关键              │
└─────────────────────────────────────────┘
```

### 短期记忆实现

```python
# 使用对话历史列表
messages = [
    {"role": "system", "content": "你是一个助手"},
    {"role": "user", "content": "你好"},
    {"role": "assistant", "content": "你好！有什么可以帮你？"},
]

# 当消息过长时，自动截断或摘要
def trim_messages(messages, max_tokens=4000):
    """截断消息，保留最新的对话。"""
    total = sum(len(m["content"]) // 4 for m in messages)
    while total > max_tokens and len(messages) > 2:
        messages.pop(1)  # 保留 system 和最新的
        total = sum(len(m["content"]) // 4 for m in messages)
    return messages
```

### 长期记忆实现

```python
# 使用向量库存储用户偏好和历史摘要
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

# 创建长期记忆存储
memory_store = Chroma(
    collection_name="long_term_memory",
    embedding_function=OpenAIEmbeddings()
)

def save_memory(user_id: str, key: str, value: str):
    """保存长期记忆。"""
    memory_store.add_texts(
        texts=[value],
        metadatas=[{"user_id": user_id, "key": key}]
    )

def recall_memory(user_id: str, query: str, top_k=5) -> list:
    """回忆相关记忆。"""
    results = memory_store.similarity_search(
        query=query,
        k=top_k,
        filter={"user_id": user_id}
    )
    return [doc.page_content for doc in results]
```

### 检查点实现（LangGraph）

```python
from langgraph.checkpoint.memory import MemorySaver

# 启用检查点
checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer)

# 运行并保存状态
config = {"configurable": {"thread_id": "user-session-1"}}
result = app.invoke({"query": "帮我分析这个项目", "results": [], "answer": "", "history": []}, config)

# 后续可以从断点恢复
result2 = app.invoke({"query": "继续分析", "results": [], "answer": "", "history": []}, config)
```

## 阶段实战：带记忆的多轮对话 Agent

**目标**：构建一个能记住用户偏好的问答智能体：

- [ ] 实现短期记忆（对话历史截断）
- [ ] 实现长期记忆（向量库存储用户偏好）
- [ ] 实现检查点（LangGraph MemorySaver）
- [ ] 测试：跨会话是否能记住用户信息
- [ ] 测试：任务中断后是否能从断点恢复

## 阶段检查清单

- [ ] 理解 LCEL 组件化编程的概念
- [ ] 知道多智能体和单智能体的适用场景差异
- [ ] 能实现三层记忆架构
- [ ] 理解检查点的作用，能在 LangGraph 中使用 MemorySaver
- [ ] 能构建带记忆的多轮对话 Agent

---

[上一阶段：← 框架选择](/tools/agentic-ai/03-framework-selection) | [下一阶段：工具集成与 RAG →](/tools/agentic-ai/05-tools-and-rag)
