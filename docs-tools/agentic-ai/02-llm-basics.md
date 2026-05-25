---
sidebar_position: 12
sidebar_label: 第二阶段 LLM
---

# 第二阶段：LLM 基础——读懂智能体的"大脑"

> 很多小白刚入门就急着学各种框架，却忽略了 LLM 本身的工作原理，导致后续学习中遇到问题无法定位、难以进阶。在接触炫酷的框架之前，必须先深刻理解大模型的核心逻辑、局限与潜在风险。

## Token 与上下文预算

Token 不只是大模型的计费单位，更是决定模型"记忆容量"的硬约束。

### 理解 Token

```
"大模型推理部署" → ["大", "模型", "推理", "部署"]  ≈ 4 tokens
"Large language model deployment" → ["Large", " language", " model", " deployment"] ≈ 4 tokens
```

### 上下文预算分配

一个 128K 上下文窗口的典型分配：

```
┌──────────────────────────────────────────────┐
│  系统提示 (500 tokens)                       │  ← 角色、规则、约束
│  工具定义 (1-3K tokens)                      │  ← 工具描述、Schema
│  RAG 检索 (5-10K tokens)                     │  ← 知识片段
│  对话历史 (10-20K tokens)                    │  ← 上下文记忆
│  用户输入 (500 tokens)                       │  ← 当前请求
│  输出预留 (2-5K tokens)                      │  ← 模型响应
├──────────────────────────────────────────────┤
│  总预算: ~128K tokens                        │
└──────────────────────────────────────────────┘
```

**关键原则**：优秀的 Agentic AI 工程师，必须学会合理分配"上下文预算"，避免因 Token 不足导致任务失败。

## 函数调用（Function Calling）

这是智能体与普通聊天机器人的核心区别，也是小白入门的重点。

### 为什么需要函数调用

| 方式 | 输出 | 适合场景 |
|------|------|----------|
| 自由文本 | "我来帮你查一下，北京的天气是晴天，25度" | 对话聊天 |
| 函数调用 | `{"tool": "get_weather", "args": {"city": "北京"}}` | 自动化任务 |

### 函数调用工作流程

```
用户提问 → LLM → 输出结构化指令 → Agent 解析 → 执行工具 → 结果返回 LLM → LLM 生成最终回复
```

### 代码示例

```python
from openai import OpenAI

client = OpenAI()

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名称"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["city"]
            }
        }
    }
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}],
    tools=tools,
)

# 检查 LLM 是否调用了工具
if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    print(f"工具: {tool_call.function.name}")
    print(f"参数: {tool_call.function.arguments}")
```

## 提示工程是接口设计

新手往往认为提示工程是"话术技巧"，其实它更像**代码接口设计**。

### 好的提示 = 好的 API 接口

```python
# 差的提示——模糊、不可测试
prompt = "你是一个助手，帮我回答问题"

# 好的提示——明确、结构化、可测试
SYSTEM_PROMPT = """你是一个知识库问答助手。

## 角色
- 根据用户的问题，从检索到的知识片段中提取答案
- 只回答与知识相关的问题，不要编造

## 约束
- 如果知识中没有答案，回复"抱歉，我目前没有相关信息"
- 必须引用具体的知识来源
- 不要使用知识之外的信息

## 输出格式
回答应包含：
1. 直接答案（1-2 句话）
2. 来源引用（引用知识片段的编号）
"""
```

### 提示版本化管理

```python
# prompts/v1/qa_prompt.py
# prompts/v2/qa_prompt.py  # 优化了引用格式
# prompts/v3/qa_prompt.py  # 添加了多轮对话支持

# 像代码一样管理提示版本，确保每次调用的稳定性
```

## 幻觉与注入防范

这是企业级应用的核心需求，也是小白容易忽略的点。

### 幻觉（Hallucination）

大模型会"一本正经地胡说八道"——生成看似合理但实际错误的内容。

### 注入攻击（Injection）

当检索的内容被恶意污染，可能导致：

- 模型执行意外操作
- 泄露敏感信息
- 绕过安全限制

### 防护策略

```python
# 1. 强制引用——要求模型必须基于检索内容回答
SYSTEM_PROMPT = """你必须仅基于以下知识片段回答问题。
如果知识中没有相关信息，回复"暂无相关信息"。

知识片段：
{retrieved_context}
"""

# 2. Schema 验证——验证模型输出是否符合预期格式
from pydantic import BaseModel

class Answer(BaseModel):
    answer: str
    sources: list[str]
    confidence: float  # 0-1 之间的置信度

# 3. 策略层限制——在代码层面做限制，而非仅依赖 LLM
def sanitize_response(response: str) -> str:
    """移除可能包含的敏感信息或恶意内容。"""
    # 过滤逻辑
    return response
```

**核心原则**：将检索到的内容视为"不可信数据源"，通过强制引用、Schema 验证和策略层限制，降低模型幻觉和注入攻击的风险。

## 阶段实战：手写一个工具调用 Demo

**目标**：不调用任何框架，实现一个简单的工具调用流程：

- [ ] 定义 2-3 个工具函数（如搜索、计算）
- [ ] 构造工具描述的 JSON Schema
- [ ] 调用 LLM API 获取结构化指令
- [ ] 解析指令并执行对应工具
- [ ] 将工具结果返回给 LLM 生成最终回复

## 阶段检查清单

- [ ] 理解 Token 是什么，知道如何估算 Token 消耗
- [ ] 能手动分配上下文预算（提示、工具、检索、历史各占多少）
- [ ] 能使用 LLM API 的函数调用功能
- [ ] 能编写结构化提示词，包含角色、约束、输出格式
- [ ] 了解幻觉和注入风险，知道基本的防护方法

---

[上一阶段：← Python 基础](/tools/agentic-ai/01-python-fundamentals) | [下一阶段：框架选择 →](/tools/agentic-ai/03-framework-selection)
