---
sidebar_position: 10
sidebar_label: 导航图
---

# 2026 Agentic AI 工程师学习路线图

> 综合多份 2026 年最新路线图（Lamhot Siagian 博士、roadmap.sh、Machine Learning Mastery、Scaler 等），
> 结合行业最新实践（MCP 协议、A2A 协议、Agent 记忆工程、Guardrails），
> 为国内开发者梳理的一条清晰可落地的学习路径。

## 核心理念

**基础先行，协议为王，实战闭环**

Agentic AI 工程的本质不是"学框架"，而是理解**智能体如何安全、可控地与工具和其他智能体协作**。

## 路线图总览

### 第 0 层：基础（2-4 周）

| 阶段 | 内容 | 前置 |
|------|------|------|
| [第一阶段：Python 工程基础](/tools/agentic-ai/01-python-fundamentals) | 智能体的骨骼支架 | 无 |
| [第二阶段：LLM 基础](/tools/agentic-ai/02-llm-basics) | 读懂智能体的大脑 | Python 基础 |
| [第三阶段：Prompt 与 Context Engineering](/tools/agentic-ai/03-context-engineering) | 提示工程与上下文工程 | LLM 基础 |

### 第 1 层：单智能体（4-6 周）

| 阶段 | 内容 | 前置 |
|------|------|------|
| [第四阶段：框架与工具调用](/tools/agentic-ai/04-frameworks-tools) | 框架选型、工具设计、MCP 协议 | 上下文工程 |
| [第五阶段：RAG 系统实战](/tools/agentic-ai/05-rag-system) | 分块、检索、重排序、评估 | 工具调用 |

### 第 2 层：多智能体与记忆（4-6 周）

| 阶段 | 内容 | 前置 |
|------|------|------|
| [第六阶段：Agent 记忆工程](/tools/agentic-ai/06-agent-memory) | 短期/长期/共享记忆层、Mem0 | RAG 实战 |
| [第七阶段：多智能体编排](/tools/agentic-ai/07-multi-agent) | 6 大编排模式、A2A 协议 | 记忆工程 |

### 第 3 层：生产与安全（4-6 周）

| 阶段 | 内容 | 前置 |
|------|------|------|
| [第八阶段：安全与 Guardrails](/tools/agentic-ai/08-safety-guardrails) | 4 层护栏、OWASP Top 10 | 多智能体 |
| [第九阶段：生产部署](/tools/agentic-ai/09-production) | FastAPI、Docker、CI/CD、监控 | 安全与 Guardrails |

### 第 4 层：面试与项目

| 阶段 | 内容 |
|------|------|
| [学习检查清单与面试锦囊](/tools/agentic-ai/10-checklist-interview) | 10 步清单、STAR 法则、高频考点 |
| [评估与可观测性](/tools/agentic-ai/11-evaluation-observability) | Langfuse、DeepEval、成本追踪、基准测试 |

## 2026 技术栈总览

```
Python ─→ LLM API ─→ Context Engineering ─→ MCP 协议 ─→ RAG
                                                    │
                                                    ▼
                                            LangGraph / PydanticAI
                                                    │
                                ┌───────────────────┼───────────────────┐
                                ▼                   ▼                   ▼
                          Agent 记忆           多智能体编排          Guardrails
                          (Mem0/GraphRAG)     (A2A 协议)           (4 层护栏)
                                │                   │                   │
                                └───────────────────┼───────────────────┘
                                                    ▼
                                        可观测性 + 评估 + 基准测试
                                  (Langfuse / DeepEval / 成本追踪)
                                                    │
                                                    ▼
                                            FastAPI + Docker + 云部署
```

## 2026 年关键趋势

| 趋势 | 说明 |
|------|------|
| MCP 协议普及 | Anthropic 的 Model Context Protocol 已成为 Agent-Tool 连接的标准 |
| A2A 协议崛起 | Google 的 Agent-to-Agent 协议被 50+ 公司支持，多智能体互操作成为现实 |
| 记忆工程化 | Agent 记忆从"context stuffing"发展为有基准测试的独立工程领域 |
| 框架理性化 | LangGraph 生产部署 #1，PydanticAI 最佳 DX，SmolAgents 最快原型 |
| 40% 项目失败 | Gartner 预测 2027 年前 40% 的 Agentic AI 项目会被取消——缺乏工程实践是主因 |
| 4 层 Guardrails | 输入/行为/输出/运行时四层护栏成为生产部署标配 |
| 可观测性标配化 | Langfuse、LangSmith 等 Agent 可观测性平台成为生产必备 |
| 评估 vs 可观测性分离 | 评估（质量）、可观测性（运行）、基准测试（排名）成为三个独立领域 |

---

*返回 [工具教程](/tools/) | 前往 [系统学习](/)*
