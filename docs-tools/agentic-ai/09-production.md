---
sidebar_position: 19
sidebar_label: 第九阶段 生产部署
---

# 第九阶段：生产部署与可观测性——从 Demo 到产品

> 一个能在本地跑通的脚本，距离生产级应用还有巨大鸿沟。2026 年的生产级 Agent 系统需要：API 服务、容器化、CI/CD、可观测性三件套。

## 生产级技术栈

```
FastAPI ─→ Streamlit/Next.js ─→ Docker ─→ CI/CD ─→ Cloud
                                        │
                                  可观测性三件套
                                  ├── 结构化日志
                                  ├── 分布式追踪
                                  └── 指标监控
```

## 1. 后端 API：FastAPI

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import structlog

logger = structlog.get_logger()
app = FastAPI(title="Agent API", version="1.0.0")

class ChatRequest(BaseModel):
    query: str = Field(max_length=2000)
    session_id: str = "default"

class ChatResponse(BaseModel):
    answer: str
    sources: list[str] = []
    latency_ms: float
    trace_id: str

@app.get("/health")
async def health():
    """健康检查——Docker HEALTHCHECK 使用。"""
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    trace_id = str(uuid.uuid4())
    logger.info("chat_request", trace_id=trace_id, query_len=len(request.query))

    try:
        config = {"configurable": {"thread_id": request.session_id}}
        start = time.time()
        result = await app.agent.ainvoke(
            {"query": request.query, "results": [], "answer": "", "history": []},
            config
        )
        latency = (time.time() - start) * 1000

        logger.info("chat_response", trace_id=trace_id, latency_ms=latency)
        return ChatResponse(
            answer=result["answer"],
            sources=result.get("sources", []),
            latency_ms=latency,
            trace_id=trace_id,
        )
    except Exception as e:
        logger.error("chat_error", trace_id=trace_id, error=str(e))
        raise HTTPException(status_code=500, detail="Internal error")
```

## 2. 前端演示：Streamlit

```python
import streamlit as st
import requests

st.set_page_config(page_title="Agent Demo", layout="wide")
st.title("🤖 Agentic AI Demo")

if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])

if query := st.chat_input("输入问题..."):
    st.session_state.messages.append({"role": "user", "content": query})
    with st.chat_message("user"):
        st.write(query)

    with st.chat_message("assistant"):
        with st.spinner("思考中..."):
            resp = requests.post("http://localhost:8000/chat", json={"query": query})
            result = resp.json()
            st.write(result["answer"])
            st.session_state.messages.append({"role": "assistant", "content": result["answer"]})
            if result.get("sources"):
                with st.expander(f"来源 ({len(result['sources'])} 个)"):
                    for i, src in enumerate(result["sources"], 1):
                        st.write(f"{i}. {src}")
```

## 3. 容器化：Docker

```dockerfile
FROM python:3.12-slim

# 非 root 用户
RUN useradd -m -u 1000 agent
USER agent
WORKDIR /home/agent/app

# 依赖
COPY --chown=agent:agent pyproject.toml uv.lock ./
RUN pip install uv && uv sync --frozen

# 代码
COPY --chown=agent:agent . .

# 健康检查
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### docker-compose

```yaml
version: "3.9"
services:
  api:
    build: .
    ports: ["8000:8000"]
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DATABASE_URL=postgresql://db:5432/agent_db
    depends_on: [db]
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  pgdata:
```

## 4. 可观测性三件套

### 结构化日志

```python
import structlog

structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.JSONRenderer(),  # JSON 输出
    ],
)

logger = structlog.get_logger()
logger.info("agent_started", agent_type="rag", version="1.0")
# → {"event": "agent_started", "agent_type": "rag", "version": "1.0", "timestamp": "..."}
```

### 分布式追踪

```python
# 每个请求一个 Trace ID，贯穿所有组件
trace_id = ContextVar("trace_id")

@app.middleware("http")
async def trace_middleware(request, call_next):
    tid = str(uuid.uuid4())
    trace_id.set(tid)
    response = await call_next(request)
    response.headers["X-Trace-Id"] = tid
    return response

# 关键能力：通过 Trace ID 复现单次任务运行
```

### 指标监控

```python
from prometheus_client import Counter, Histogram

REQUEST_COUNT = Counter("agent_requests_total", "总请求数", ["status", "endpoint"])
REQUEST_LATENCY = Histogram("agent_latency_seconds", "请求延迟", ["endpoint"])
TOOL_CALL_COUNT = Counter("agent_tool_calls_total", "工具调用次数", ["tool", "status"])
TOKEN_USAGE = Counter("agent_tokens_total", "Token 消耗", ["model", "type"])
```

## 5. CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v3
      - run: uv sync --frozen
      - run: uv run pytest tests/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t my-agent .
      - run: docker push my-agent:latest
```

## 阶段实战

**目标**：部署一个生产级 Agent 服务

- [ ] FastAPI 实现 Agent API（含健康检查）
- [ ] Streamlit 实现前端
- [ ] Dockerfile 构建镜像
- [ ] docker-compose 本地运行
- [ ] 结构化日志 + Trace ID
- [ ] Prometheus 指标监控
- [ ] 部署到云平台

## 阶段检查清单

- [ ] 能用 FastAPI 构建 Agent API
- [ ] 能编写生产级 Dockerfile
- [ ] 能实现结构化日志 + Trace ID
- [ ] 能定义 Prometheus 指标
- [ ] 了解 CI/CD 基本流程
- [ ] 能通过 Trace ID 复现单次任务运行

---

[上一阶段：← 安全与 Guardrails](/tools/agentic-ai/08-safety-guardrails) | [下一阶段：检查清单 →](/tools/agentic-ai/10-checklist-interview)
