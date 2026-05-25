---
sidebar_position: 16
sidebar_label: 第六阶段 记忆工程
---

# 第六阶段：Agent 记忆工程——让智能体"记住你"

> 2026 年，Agent 记忆已经从"context stuffing"发展为**有基准测试的独立工程领域**。Mem0、GraphRAG、LongMemEval 等工具和评测体系已经成熟。

## 为什么需要专门的记忆系统

| 仅用上下文窗口 | 专用记忆层 |
|----------------|------------|
| 随对话结束丢失 | 跨会话持久化 |
| 无结构化存储 | 可按用户/主题检索 |
| 无法自我改进 | 可积累经验和偏好 |

## 记忆架构的 5 个层次

```
┌─────────────────────────────────────────────┐
│  情景记忆 (Episodic)                        │  ← 过往对话和事件
│  例："上周你帮我查过北京出差的报销政策"       │
├─────────────────────────────────────────────┤
│  语义记忆 (Semantic)                        │  ← 事实性知识
│  例："公司的差旅报销上限是 800 元/天"          │
├─────────────────────────────────────────────┤
│  程序记忆 (Procedural)                      │  ← 技能和流程
│  例："报销流程：提交申请 → 主管审批 → 财务打款"│
├─────────────────────────────────────────────┤
│  用户偏好记忆 (Profile)                     │  ← 个人偏好
│  例："用户偏好简洁回答，不需要详细解释"        │
├─────────────────────────────────────────────┤
│  工作记忆 (Working)                         │  ← 当前任务状态
│  例："正在处理第 2 步：查询报销标准"          │
└─────────────────────────────────────────────┘
```

## 使用 Mem0 实现记忆

[Mem0](https://mem0.ai/) 是 2026 年最流行的 Agent 记忆层。

```python
from mem0 import Memory

# 初始化
memory = Memory()

# 保存记忆
memory.add("张三喜欢用 Python 写代码，最近在学 LangGraph", user_id="zhangsan")
memory.add("张三的项目 deadline 是 3 月 15 日", user_id="zhangsan")

# 回忆记忆
memories = memory.search("张三最近在学什么？", user_id="zhangsan", limit=3)
for m in memories:
    print(m["memory"])  # → "张三最近在学 LangGraph"

# 更新记忆
memory.update("张三已经掌握了 LangGraph", memory_id=memories[0]["id"])

# 获取所有记忆
all_memories = memory.get_all(user_id="zhangsan")
```

## 使用 LangGraph 检查点

```python
from langgraph.checkpoint.memory import MemorySaver

# 启用检查点
checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer)

# 运行并保存状态
config = {"configurable": {"thread_id": "user-session-1"}}
result = app.invoke({"query": "帮我分析", "results": [], "answer": "", "history": []}, config)

# 后续从断点恢复
result2 = app.invoke({"query": "继续分析", "results": [], "answer": "", "history": []}, config)
```

## 多智能体共享记忆

```python
# 多个 Agent 共享同一个记忆存储
shared_memory = Memory()

# 研究者 Agent 保存发现
shared_memory.add("发现用户偏好简洁回答", user_id="shared")

# 执行者 Agent 读取
memories = shared_memory.search("用户偏好", user_id="shared")
```

## 记忆评估

2026 年已有成熟的记忆评估基准：

| 基准 | 评测内容 |
|------|----------|
| LoCoMo | 长期一致性 |
| LongMemEval | 长期记忆检索准确率 |
| BEAM | 跨会话记忆质量 |

## 阶段实战

**目标**：构建一个带记忆的 Agent

- [ ] 用 Mem0 保存用户偏好
- [ ] 实现短期记忆（对话历史截断）
- [ ] 实现长期记忆（Mem0 检索）
- [ ] 实现检查点（LangGraph MemorySaver）
- [ ] 测试：跨会话是否能记住用户信息

## 阶段检查清单

- [ ] 理解 5 层记忆架构
- [ ] 能用 Mem0 实现用户偏好记忆
- [ ] 能实现 LangGraph 检查点
- [ ] 理解多智能体共享记忆的概念
- [ ] 了解记忆评估基准

---

[上一阶段：← RAG 系统](/tools/agentic-ai/05-rag-system) | [下一阶段：多智能体 →](/tools/agentic-ai/07-multi-agent)
