---
sidebar_position: 12
sidebar_label: 第二阶段 LLM
---

# 第二阶段：LLM 基础——读懂智能体的"大脑"

> 在接触框架之前，必须先深刻理解大模型的核心逻辑、局限与潜在风险。

## Token 与上下文预算

### 理解 Token

Token 不只是计费单位，更是决定模型"记忆容量"的硬约束。

```
"大模型推理部署" → ~4 tokens
"Large language model deployment" → ~4 tokens
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

## 函数调用（Function Calling）

这是智能体与普通聊天机器人的核心区别。

### 工作流程

```
用户提问 → LLM → 输出结构化指令 → Agent 解析 → 执行工具 → 结果返回 LLM → 生成最终回复
```

### 代码示例

```python
from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取指定城市的天气信息",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "城市名称"},
            },
            "required": ["city"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}],
    tools=tools,
)

if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    print(f"工具: {tool_call.function.name}")
    print(f"参数: {tool_call.function.arguments}")
```

## 幻觉与注入防范

### 3 层防护策略

```python
# 1. 强制引用
SYSTEM_PROMPT = """你必须仅基于以下知识片段回答问题。
如果知识中没有相关信息，回复"暂无相关信息"。

知识片段：
{retrieved_context}
"""

# 2. Schema 验证
class Answer(BaseModel):
    answer: str
    sources: list[str]
    confidence: float  # 0-1 之间的置信度

# 3. 策略层限制
def sanitize_response(response: str) -> str:
    """移除可能包含的敏感信息或恶意内容。"""
    return response
```

## 模型 API 选型

| 提供商 | 推荐模型 | 特点 |
|--------|----------|------|
| OpenAI | GPT-4o / o3 | 工具调用最稳定 |
| Anthropic | Claude 4 Opus/Sonnet | 长上下文、复杂推理强 |
| 阿里云 | 通义千问 | 国内可用、中文优 |
| DeepSeek | DeepSeek V3 | 性价比高 |

## 阶段实战

**目标**：不调用任何框架，实现简单的工具调用流程

- [ ] 定义 2-3 个工具函数
- [ ] 构造工具描述的 JSON Schema
- [ ] 调用 LLM API 获取结构化指令
- [ ] 解析指令并执行对应工具
- [ ] 将工具结果返回给 LLM 生成最终回复

## 阶段检查清单

- [ ] 理解 Token 是什么，能估算 Token 消耗
- [ ] 能手动分配上下文预算
- [ ] 能使用 LLM API 的函数调用功能
- [ ] 能编写结构化提示词
- [ ] 了解幻觉和注入风险，知道基本防护方法

---

[上一阶段：← Python 基础](/tools/agentic-ai/01-python-fundamentals) | [下一阶段：Context Engineering →](/tools/agentic-ai/03-context-engineering)
