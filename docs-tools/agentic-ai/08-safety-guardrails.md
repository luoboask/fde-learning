---
sidebar_position: 18
sidebar_label: 第八阶段 安全
---

# 第八阶段：安全与 Guardrails——让智能体"安全运行"

> 2026 年，生产级 Agent 系统需要 **4 层 Guardrails**。Gartner 预测 2027 年前 40% 的 Agentic AI 项目会被取消——缺乏工程实践是主因。

## 4 层 Guardrails 架构

```
┌─────────────────────────────────────────────┐
│  第 4 层：运行时 Guardrails                  │  ← 执行中监控、OWASP 风险防护
│  Microsoft Agent Governance Toolkit          │
├─────────────────────────────────────────────┤
│  第 3 层：输出 Guardrails                    │  ← 行动前验证、结果审核
│  Schema 验证、策略检查、人工审批              │
├─────────────────────────────────────────────┤
│  第 2 层：行为 Guardrails                    │  ← Agent 可以做什么、何时需要批准
│  权限控制、工具白名单、操作闸门               │
├─────────────────────────────────────────────┤
│  第 1 层：输入 Guardrails                    │  ← 验证和清洗用户/外部输入
│  Prompt 注入防护、格式校验、敏感词过滤         │
└─────────────────────────────────────────────┘
```

## 第 1 层：输入 Guardrails

### Prompt 注入防护

```python
import re

def validate_input(user_input: str) -> tuple[bool, str]:
    """验证用户输入，防止注入攻击。"""
    # 检查系统指令注入
    system_injections = [
        "忽略之前的指令", "ignore previous", "忽略以上",
        "你现在是一个新的助手", "system:", "###",
    ]
    for pattern in system_injections:
        if pattern.lower() in user_input.lower():
            return False, "检测到潜在注入模式"

    # 检查长度限制
    if len(user_input) > 5000:
        return False, "输入过长"

    # 检查特殊字符（视业务需求）
    if re.search(r'<script|javascript:', user_input, re.IGNORECASE):
        return False, "检测到危险标记"

    return True, ""
```

### 输入标准化

```python
from pydantic import BaseModel, Field, field_validator

class UserInput(BaseModel):
    query: str = Field(max_length=2000)
    session_id: str = Field(pattern=r'^[a-zA-Z0-9-]+$')  # 只允许字母数字和连字符

    @field_validator('query')
    @classmethod
    def validate_query(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("查询不能为空")
        return v.strip()
```

## 第 2 层：行为 Guardrails

### 权限控制

```python
class AgentPermissions:
    """定义 Agent 可以做什么。"""

    # 允许的工具列表
    allowed_tools = {
        "search_knowledge",
        "get_current_time",
        "summarize_text",
    }

    # 需要确认的操作
    require_confirmation = {
        "send_email",
        "delete_record",
        "update_database",
    }

    # 禁止的操作
    forbidden_tools = {
        "execute_sql",
        "run_shell_command",
        "transfer_money",
    }

def check_permission(agent_id: str, tool_name: str, user_confirmed: bool = False) -> bool:
    """检查 Agent 是否有权执行某个工具。"""
    if tool_name in AgentPermissions.forbidden_tools:
        return False
    if tool_name in AgentPermissions.require_confirmation and not user_confirmed:
        return False
    return tool_name in AgentPermissions.allowed_tools
```

### 工具调用 Schema 验证

```python
from pydantic import ValidationError

def validate_tool_call(tool_name: str, args: dict) -> tuple[bool, str]:
    """验证工具调用的参数是否符合 Schema。"""
    schemas = {
        "search_knowledge": {"query": str, "limit": int},
        "send_email": {"to": str, "subject": str, "body": str},
    }

    if tool_name not in schemas:
        return False, f"未知工具: {tool_name}"

    schema = schemas[tool_name]
    for key, type_ in schema.items():
        if key not in args:
            return False, f"缺少参数: {key}"
        if not isinstance(args[key], type_):
            return False, f"参数 {key} 类型错误"

    return True, ""
```

## 第 3 层：输出 Guardrails

### 输出验证

```python
class AgentOutput(BaseModel):
    answer: str
    sources: list[str] = []
    confidence: float = Field(ge=0, le=1)
    actions_taken: list[str] = []

    @field_validator('answer')
    @classmethod
    def validate_answer(cls, v: str) -> str:
        # 不能包含敏感信息
        sensitive_patterns = [r'password', r'api[_-]?key', r'secret']
        for pattern in sensitive_patterns:
            if re.search(pattern, v, re.IGNORECASE):
                raise ValueError("输出包含潜在敏感信息")
        return v
```

### 人工审批闸门

```python
def human_approval_required(action: str, context: dict) -> bool:
    """判断某个操作是否需要人工审批。"""
    # 高影响操作
    if action in ["send_email", "delete_data", "modify_config"]:
        return True

    # 大额操作
    if "amount" in context and context["amount"] > 10000:
        return True

    return False
```

## 第 4 层：运行时 Guardrails

### 运行时监控

```python
import time
from dataclasses import dataclass

@dataclass
class RuntimeGuard:
    max_iterations: int = 20
    max_execution_time: float = 60.0  # 秒
    max_tool_calls: int = 50
    start_time: float = None
    iteration_count: int = 0
    tool_call_count: int = 0

    def __post_init__(self):
        self.start_time = time.time()

    def check(self) -> tuple[bool, str]:
        """检查运行时约束。"""
        self.iteration_count += 1

        if self.iteration_count > self.max_iterations:
            return False, f"超过最大迭代次数 ({self.max_iterations})"

        elapsed = time.time() - self.start_time
        if elapsed > self.max_execution_time:
            return False, f"执行超时 ({elapsed:.1f}s > {self.max_execution_time}s)"

        if self.tool_call_count > self.max_tool_calls:
            return False, f"超过最大工具调用次数 ({self.max_tool_calls})"

        return True, ""
```

### OWASP Agentic AI Top 10

| # | 风险 | 防护 |
|---|------|------|
| 1 | Prompt 注入 | 输入验证、系统提示分离 |
| 2 | 越权操作 | 权限控制、工具白名单 |
| 3 | 敏感数据泄露 | 输出过滤、元数据隔离 |
| 4 | 幻觉误导 | 强制引用、置信度检查 |
| 5 | 供应链攻击 | 依赖锁定、MCP Server 认证 |
| 6 | 无限循环 | 迭代次数限制 |
| 7 | 资源耗尽 | 执行超时、Token 预算 |
| 8 | 不可预期行为 | Schema 验证、输出审核 |
| 9 | 隐私违规 | 数据脱敏、合规检查 |
| 10 | 代理滥用 | 频率限制、调用配额 |

## 阶段实战

**目标**：为一个 Agent 系统添加完整的 4 层 Guardrails

- [ ] 输入验证（注入检测、格式校验）
- [ ] 权限控制（工具白名单、确认闸门）
- [ ] 输出验证（Schema 验证、敏感信息过滤）
- [ ] 运行时监控（迭代限制、超时控制）
- [ ] 模拟攻击测试

## 阶段检查清单

- [ ] 理解 4 层 Guardrails 架构
- [ ] 能实现输入 Guardrails（注入防护）
- [ ] 能实现行为 Guardrails（权限控制）
- [ ] 能实现输出 Guardrails（Schema 验证）
- [ ] 能实现运行时 Guardrails（迭代/超时限制）
- [ ] 了解 OWASP Agentic AI Top 10

---

[上一阶段：← 多智能体](/tools/agentic-ai/07-multi-agent) | [下一阶段：生产部署 →](/tools/agentic-ai/09-production)
