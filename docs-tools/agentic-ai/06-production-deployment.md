---
sidebar_position: 16
sidebar_label: 第六阶段 生产落地
---

# 第六阶段：真实项目构建与生产落地——从 Demo 到产品

> 很多小白能写出本地可运行的 Demo，但一到生产部署就无从下手，而"生产落地能力"正是企业招聘的核心要求。一个能在本地跑通的脚本，距离生产级应用还有巨大鸿沟。

## 生产级技术栈

```
FastAPI (后端 API) ─→ Streamlit (前端演示) ─→ Docker (容器化) ─→ Cloud (云部署) ─→ CI/CD
```

## 1. 后端 API：FastAPI

首选 FastAPI——支持异步、自动生成接口文档、强类型校验。

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langgraph.graph import StateGraph

app = FastAPI(title="Agentic AI Agent API", version="1.0.0")

# 请求/响应模型
class ChatRequest(BaseModel):
    query: str
    session_id: str = "default"
    max_tokens: int = 2000

class ChatResponse(BaseModel):
    answer: str
    sources: list[str] = []
    session_id: str
    latency_ms: float

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Agent 问答接口。"""
    try:
        config = {"configurable": {"thread_id": request.session_id}}
        result = await app.agent.ainvoke(
            {"query": request.query, "results": [], "answer": "", "history": []},
            config
        )
        return ChatResponse(
            answer=result["answer"],
            sources=result.get("sources", []),
            session_id=request.session_id,
            latency_ms=result.get("latency_ms", 0),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

**FastAPI 优势**：
- 异步支持（`async/await`）
- 自动生成 OpenAPI 文档（`/docs` 和 `/redoc`）
- 强类型校验（基于 Pydantic）
- 上手简单，适合快速开发

## 2. 前端演示：Streamlit

用 Streamlit 快速构建聊天界面和调试面板，无需复杂的前端知识。

```python
import streamlit as st
import requests

st.set_page_config(page_title="Agent 演示", layout="wide")
st.title("🤖 Agentic AI 演示")

# 初始化会话
if "messages" not in st.session_state:
    st.session_state.messages = []

# 显示历史消息
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])

# 用户输入
if query := st.chat_input("输入你的问题..."):
    # 显示用户消息
    st.session_state.messages.append({"role": "user", "content": query})
    with st.chat_message("user"):
        st.write(query)

    # 调用 API
    with st.chat_message("assistant"):
        with st.spinner("思考中..."):
            response = requests.post(
                "http://localhost:8000/chat",
                json={"query": query, "session_id": st.session_state.get("session_id", "default")}
            )
            result = response.json()
            st.write(result["answer"])
            st.session_state.messages.append({"role": "assistant", "content": result["answer"]})

            # 显示来源引用
            if result.get("sources"):
                with st.expander("来源引用"):
                    for i, src in enumerate(result["sources"], 1):
                        st.write(f"{i}. {src}")
```

**好处**：几行代码就能实现可视化交互，方便展示自己的项目。

## 3. 容器化：Docker

学习 Docker，通过容器化打包项目。

```dockerfile
# 使用轻量 Python 镜像
FROM python:3.12-slim

# 使用非 root 用户
RUN useradd -m -u 1000 agent
USER agent
WORKDIR /home/agent/app

# 复制依赖文件
COPY --chown=agent:agent pyproject.toml uv.lock ./
RUN pip install uv && uv sync --frozen

# 复制代码
COPY --chown=agent:agent . .

# 健康检查
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Dockerfile 要点**：
- 非 root 用户运行（安全）
- 固定依赖版本（`uv sync --frozen`）
- 添加健康检查
- 使用 slim 镜像减少体积

## 4. 云部署

推荐 AWS ECS/Fargate 配合 RDS/向量数据库。国内可从阿里云、腾讯云入手，操作更便捷。

```yaml
# docker-compose.yml
version: "3.9"
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DATABASE_URL=postgresql://db:5432/agent_db
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## 5. 可观测性三件套

生产环境排查问题的核心工具。

### 结构化日志

```python
import logging
import structlog

structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),  # 结构化输出
    ],
    logger_factory=structlog.stdlib.LoggerFactory(),
)

logger = structlog.get_logger()

@app.post("/chat")
async def chat(request: ChatRequest):
    logger.info("chat_request", session_id=request.session_id, query_length=len(request.query))
    # ...
    logger.info("chat_response", session_id=request.session_id, latency_ms=latency_ms)
```

### 分布式追踪（Trace ID）

```python
import uuid
from contextvars import ContextVar

trace_id: ContextVar[str] = ContextVar("trace_id")

@app.middleware("http")
async def add_trace_id(request, call_next):
    tid = str(uuid.uuid4())
    trace_id.set(tid)
    response = await call_next(request)
    response.headers["X-Trace-Id"] = tid
    return response

# 在任意日志中使用
logger.info("tool_call", tool="search", trace_id=trace_id.get())
```

**必须具备的能力**：通过 Trace ID 复现单次任务运行结果。

### 关键指标监控

```python
from prometheus_client import Counter, Histogram

REQUEST_COUNT = Counter("agent_requests_total", "总请求数", ["status"])
REQUEST_LATENCY = Histogram("agent_request_latency_seconds", "请求延迟")

@app.post("/chat")
async def chat(request: ChatRequest):
    with REQUEST_LATENCY.time():
        result = await invoke_agent(request)
    REQUEST_COUNT.inc(labels={"status": "success"})
    return result
```

## 阶段实战：部署一个生产级 Agent

**目标**：完成一个可从外部访问的 Agent 服务：

- [ ] 用 FastAPI 实现 Agent API（含健康检查接口）
- [ ] 用 Streamlit 实现前端演示界面
- [ ] 编写 Dockerfile 并构建镜像
- [ ] 本地 docker-compose 运行
- [ ] 添加结构化日志和 Trace ID
- [ ] 部署到云平台（阿里云/腾讯云/AWS）

## 阶段检查清单

- [ ] 能用 FastAPI 构建 Agent 后端（含类型校验和自动文档）
- [ ] 能用 Streamlit 构建前端演示
- [ ] 能编写 Dockerfile（非 root、健康检查、固定依赖）
- [ ] 了解云部署的基本流程
- [ ] 能实现结构化日志、Trace ID、关键指标监控
- [ ] 能通过 Trace ID 复现单次任务运行

---

[上一阶段：← 工具集成与 RAG](/tools/agentic-ai/05-tools-and-rag) | [下一阶段：学习检查清单 →](/tools/agentic-ai/07-checklist-interview)
