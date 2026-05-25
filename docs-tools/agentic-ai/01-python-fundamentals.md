---
sidebar_position: 11
sidebar_label: 第一阶段 Python
---

# 第一阶段：Python 工程基础——智能体的"骨骼支架"

> 为什么 Agentic AI 开发首选 Python？Python 不仅拥有丰富的 AI 生态（FastAPI、Pydantic、异步支持等），更能快速将想法原型固化为可测试、可维护、可扩展的生产级代码。

## 为什么选 Python

- **AI 生态完善**：FastAPI、Pydantic、LangGraph、PydanticAI、异步支持
- **快速原型到生产**：从想法到可测试代码的转换成本最低
- **入门门槛低**：小白和程序员入门的最优选择

## 核心能力要点

### 1. 项目结构分层

```
my-agent/
├── main.py              # 入口文件
├── domain/              # 领域逻辑
│   ├── models.py        # 数据模型（Pydantic）
│   └── services.py      # 业务逻辑
├── agents/              # 智能体实现
│   ├── graph.py         # LangGraph 状态图
│   └── nodes.py         # 各节点实现
├── tools/               # 工具封装
│   ├── search.py        # 搜索工具
│   └── database.py      # 数据库操作
├── rag/                 # RAG 模块
│   ├── retriever.py     # 检索器
│   └── vector_store.py  # 向量库
├── memory/              # 记忆模块
│   ├── short_term.py    # 短期记忆
│   └── long_term.py     # 长期记忆
├── guardrails/          # 安全护栏
│   ├── input.py         # 输入验证
│   └── output.py        # 输出验证
├── eval/                # 评估模块
└── tests/               # 单元测试
```

### 2. 类型与验证

善用 Pydantic 定义工具的输入输出 Schema——这是防止大模型产生幻觉参数的第一道防线。

```python
from pydantic import BaseModel, Field

class SearchInput(BaseModel):
    query: str = Field(description="搜索关键词", max_length=200)
    limit: int = Field(default=5, ge=1, le=20, description="返回结果数量")

class SearchResult(BaseModel):
    title: str
    url: str
    snippet: str
    score: float
```

### 3. 同步与异步

| 任务类型 | 推荐方式 | 原因 |
|----------|----------|------|
| 网络密集型（API 请求、数据检索） | `async/await` | 提升并发效率 |
| CPU 密集型（嵌入计算、数据处理） | 后台任务队列 | 避免阻塞主程序 |

### 4. 配置管理与可复现性

```bash
# 使用 uv（推荐，速度快）
uv init my-agent
uv add langchain langgraph pydantic pydantic-ai fastapi
```

**关键原则**：
- 锁定依赖版本，避免"本地能跑、线上报错"
- 密钥通过环境变量管理
- 从入门就养成生产习惯

## 阶段实战

**目标**：完成一个结构清晰的 Python 项目模板

- [ ] 正确的项目目录结构
- [ ] Pydantic 数据模型定义
- [ ] 环境变量配置
- [ ] 依赖锁定（pyproject.toml）
- [ ] 至少一个异步工具函数

## 常见陷阱

| 陷阱 | 症状 | 解决方案 |
|------|------|----------|
| 意大利面条代码 | 所有逻辑写在 main.py | 按功能分层，模块化 |
| 没有类型注解 | 函数参数类型不明确 | 所有函数加类型注解 |
| 硬编码密钥 | 代码泄露 API Key | 使用 .env + Pydantic Settings |
| 同步阻塞 | 多个 API 调用串行执行 | 改用 async/await |

---

[下一步：第二阶段 LLM 基础 →](/tools/agentic-ai/02-llm-basics)
