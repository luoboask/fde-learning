# 综合实战——构建 MCP Server（FDE-MCP）

> 用 MCP（Model Context Protocol）协议将 RAG 系统能力暴露给外部 Agent。一次实现，Claude Desktop、Cursor、Claude Code 等所有 MCP 客户端自动可用。

---

## 项目背景

第 16 章我们构建了一个生产级 RAG 问答系统，但它的接口是 REST API。如果员工想通过 Claude Desktop、Cursor 或 Claude Code 查询企业知识库，需要写 custom integration。

**MCP 解决这个问题**：把 RAG 系统包装为一个 MCP Server，任何支持 MCP 协议的客户端都能直接使用——不需要额外的 API wrapper，不需要手写 integration 代码。

### 为什么不是直接用 REST API？

| 维度 | REST API | MCP Server |
|------|---------|------------|
| 接入方式 | 每个客户端手写 HTTP 调用 | 一次实现，所有客户端自动可用 |
| 工具描述 | 手写文档，客户端不理解 | JSON Schema 自动生成，LLM 直接理解 |
| 调用方式 | 客户端硬编码参数 | LLM 自动决定何时调用、传什么参数 |
| 生态 | 孤立 | 2300+ MCP 服务器可互操作 |
| 学习成本 | 每个客户端学一遍 | 学一次 MCP 协议 |

**MCP = AI 时代的 USB-C**。就像 USB-C 让所有设备用一种接口连接一样，MCP 让所有 LLM 应用用一种协议连接外部数据和工具。

---

## 整体架构

```
┌────────────────────────────────────────────────────────┐
│                    Host（LLM 应用）                       │
│                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Claude       │  │ Cursor       │  │ Claude Code  │  │
│  │ Desktop      │  │ IDE          │  │ CLI          │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                 │           │
│         ▼                 ▼                 ▼           │
├────────────────────────────────────────────────────────┤
│                    Client（MCP 客户端）                   │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ JSON-RPC 协议层                                   │  │
│  │  STDIO / Streamable HTTP 传输                    │  │
│  │  capabilities 协商（tools / resources / prompts） │  │
│  └────────────────────┬─────────────────────────────┘  │
│                       │ JSON-RPC Messages              │
├───────────────────────┼────────────────────────────────┤
│                       ▼                                │
│               Server（FDE-MCP）                         │
│                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Tools        │  │ Resources    │  │ Prompts      │  │
│  │              │  │              │  │              │  │
│  │ rag_query    │  │ knowledge_   │  │ tech_support │  │
│  │ doc_search   │  │ base://      │  │ doc_summary  │  │
│  │ doc_ingest   │  │ stats://     │  │              │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                 │           │
│         ▼                 ▼                 ▼           │
│  ┌──────────────────────────────────────────────────┐  │
│  │              RAG Pipeline（第 16 章）               │  │
│  │  Chunking → Embedding → Retrieval → Generation   │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## MCP 协议核心概念

### 三层架构

MCP 采用 Host → Client → Server 三层模型：

1. **Host**：LLM 应用程序（Claude Desktop、Cursor、Claude Code）。负责管理连接、用户界面、LLM 推理。
2. **Client**：每个 Server 对应一个 Client 实例。负责 JSON-RPC 消息协议、传输层管理、能力协商。
3. **Server**：数据和工具提供者（我们的 FDE-MCP）。通过标准化接口暴露能力。

### 四种能力（Capabilities）

| 能力 | 用途 | 类比 |
|------|------|------|
| **Tools** | 可执行函数，LLM 可自动调用 | API 端点，但 LLM 自动选择 |
| **Resources** | 只读数据源，Host 可读 | 文件系统/数据库查询 |
| **Prompts** | 预置模板，Host 可填充 | 表单模板 |
| **Sampling** | Server 主动向 LLM 发请求 | Server 调用 LLM |

### 传输模式

| 模式 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| **STDIO** | 本地部署（Claude Desktop） | 简单、安全、无网络 | 仅本地 |
| **Streamable HTTP** | 远程部署 | 可远程访问、可扩展 | 需要认证、TLS |

### JSON-RPC 消息流程

```
Client                              Server
  │                                   │
  │─── initialize ──────────────────→│
  │←── capabilities {tools,resources}─│
  │                                   │
  │─── tools/list ──────────────────→│
  │←── [rag_query, doc_search, ...]  │
  │                                   │
  │─── tools/call {name: "rag_query", │
  │    input: {query: "..."}} ──────→│
  │←── {content: [...]}              │
  │                                   │
```

---

## 项目结构

```
fde-mcp-server/
├── src/
│   ├── server.py                 # MCP Server 主入口
│   ├── tools/
│   │   ├── rag_query.py          # RAG 查询工具
│   │   ├── doc_search.py         # 文档搜索工具
│   │   └── doc_ingest.py         # 文档导入工具
│   ├── resources/
│   │   ├── knowledge_base.py     # 知识库资源
│   │   └── stats.py              # 统计信息资源
│   ├── prompts/
│   │   ├── tech_support.py       # 技术支持提示模板
│   │   └── doc_summary.py        # 文档摘要提示模板
│   └── auth/
│       ├── api_key.py            # API Key 认证
│       └── rate_limit.py         # 限流
├── mcp_config.json               # MCP 客户端配置
├── Dockerfile
└── pyproject.toml
```

---

## 第 1 节：MCP Server 主入口

使用官方 `mcp` Python SDK 实现。

```python
# server.py
"""
FDE-MCP Server —— 企业知识库 MCP 服务
启动方式：
  STDIO 模式（本地）：python src/server.py
  HTTP 模式（远程）：python src/server.py --transport sse
"""
import sys
from mcp.server.fastmcp import FastMCP

# 创建 MCP Server 实例
mcp = FastMCP(
    "fde-knowledge",  # Server 名称
    version="1.0.0",
)

# 注册 Tools
from .tools import rag_query, doc_search, doc_ingest
rag_query.register(mcp)
doc_search.register(mcp)
doc_ingest.register(mcp)

# 注册 Resources
from .resources import knowledge_base, stats
knowledge_base.register(mcp)
stats.register(mcp)

# 注册 Prompts
from .prompts import tech_support, doc_summary
tech_support.register(mcp)
doc_summary.register(mcp)


if __name__ == "__main__":
    transport = "stdio"
    if "--transport" in sys.argv:
        idx = sys.argv.index("--transport")
        if idx + 1 < len(sys.argv):
            transport = sys.argv[idx + 1]

    if transport == "stdio":
        print("Starting FDE-MCP Server (STDIO mode)...", file=sys.stderr)
        mcp.run(transport="stdio")
    elif transport in ("sse", "http"):
        print("Starting FDE-MCP Server (HTTP mode) on :8001...", file=sys.stderr)
        mcp.run(transport="streamable-http", host="0.0.0.0", port=8001)
    else:
        print(f"Unknown transport: {transport}", file=sys.stderr)
        sys.exit(1)
```

---

## 第 2 节：Tools 实现

### Tool 1：RAG 查询

这是核心工具——调用第 16 章的 RAG Pipeline 生成答案。

```python
# tools/rag_query.py
from mcp.server.fastmcp import FastMCP
from pydantic import Field


def register(mcp: FastMCP):
    """注册 RAG 查询工具"""

    @mcp.tool()
    def rag_query(
        query: str = Field(
            description="用自然语言描述你的问题，例如：'如何部署 FDE 服务到 Kubernetes？'",
        ),
        top_k: int = Field(
            default=5,
            description="返回的参考文档数量（1-10），默认 5",
        ),
        include_sources: bool = Field(
            default=True,
            description="是否在回答中注明引用来源",
        ),
    ) -> str:
        """
        从企业知识库中搜索并回答问题。

        使用混合检索（BM25 + 向量）+ 重排序，确保答案准确。
        每个回答附带引用来源，可追溯。

        适用场景：
        - 技术文档查询
        - 故障排查指南
        - 部署/配置指南
        - API 使用说明
        """
        from fde_rag.rag_pipeline import RAGPipeline

        try:
            pipeline = RAGPipeline.get_instance()
            result = pipeline.query(query, top_k=top_k)

            # 组装回答
            answer = result["answer"]

            if include_sources and result["sources"]:
                sources_str = "\n\n**引用来源**：\n" + "\n".join(
                    f"- {source}" for source in result["sources"]
                )
                answer += sources_str

            # 添加置信度提示
            confidence = result.get("confidence", "unknown")
            if confidence == "low":
                answer += "\n\n⚠️ 注意：此回答基于有限的上下文，可能不够准确。"

            return answer

        except Exception as e:
            return f"查询失败：{str(e)}"
```

**关键点**：`@mcp.tool()` 装饰器自动从函数签名和 docstring 生成 JSON Schema。LLM 看到工具描述后，自动决定何时调用、传什么参数。

生成的工具描述（自动）：

```json
{
  "name": "rag_query",
  "description": "从企业知识库中搜索并回答问题。使用混合检索（BM25 + 向量）+ 重排序...",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "用自然语言描述你的问题"
      },
      "top_k": {
        "type": "integer",
        "description": "返回的参考文档数量（1-10），默认 5",
        "default": 5
      },
      "include_sources": {
        "type": "boolean",
        "description": "是否在回答中注明引用来源",
        "default": true
      }
    },
    "required": ["query"]
  }
}
```

### Tool 2：文档搜索

快速搜索，不需要生成答案——返回匹配的文档列表。

```python
# tools/doc_search.py
from mcp.server.fastmcp import FastMCP
from pydantic import Field


def register(mcp: FastMCP):
    """注册文档搜索工具"""

    @mcp.tool()
    def doc_search(
        keyword: str = Field(
            description="搜索关键词，例如：'HTTP 503'",
        ),
        max_results: int = Field(
            default=10,
            description="最大返回结果数（1-50），默认 10",
        ),
        doc_type: str = Field(
            default="",
            description="按文档类型过滤：'api'、'guide'、'troubleshooting'，留空不过滤",
        ),
    ) -> str:
        """
        快速搜索文档（BM25 关键词匹配）。

        比 rag_query 更快，适合你知道具体关键词、只想找文档列表的场景。
        返回文档标题、摘要和相关度评分。
        """
        from fde_rag.rag_pipeline import RAGPipeline

        try:
            pipeline = RAGPipeline.get_instance()
            results = pipeline.search(keyword, max_results=max_results)

            if not results:
                return f"未找到与「{keyword}」相关的文档。"

            output = [f"找到 {len(results)} 条相关文档：\n"]
            for i, (doc_id, score, title, snippet) in enumerate(results, 1):
                output.append(
                    f"**{i}. {title}**（相关度: {score:.2f}）\n"
                    f"   ID: `{doc_id}`\n"
                    f"   {snippet[:200]}...\n"
                )

            output.append("\n💡 使用 `rag_query` 工具获取详细回答。")
            return "\n".join(output)

        except Exception as e:
            return f"搜索失败：{str(e)}"
```

### Tool 3：文档导入

```python
# tools/doc_ingest.py
from mcp.server.fastmcp import FastMCP
from pydantic import Field


def register(mcp: FastMCP):
    """注册文档导入工具"""

    @mcp.tool()
    def doc_ingest(
        file_path: str = Field(
            description="要导入的文件路径，支持 .md、.txt、.pdf 格式",
        ),
        doc_type: str = Field(
            default="general",
            description="文档类型：'api'、'guide'、'troubleshooting'、'general'",
        ),
    ) -> str:
        """
        导入文档到企业知识库。

        自动完成分块、嵌入、存储全流程。
        导入后可立即通过 rag_query 或 doc_search 查询。
        """
        from fde_rag.rag_pipeline import RAGPipeline
        import os

        try:
            if not os.path.exists(file_path):
                return f"文件不存在：{file_path}"

            pipeline = RAGPipeline.get_instance()
            result = pipeline.ingest(file_path, doc_type=doc_type)

            return (
                f"文档导入成功：\n"
                f"- 文件：{file_path}\n"
                f"- 类型：{doc_type}\n"
                f"- 分块数：{result['chunk_count']}\n"
                f"- 嵌入耗时：{result['embed_time']:.1f}s\n"
                f"- 存储状态：{result['status']}"
            )

        except Exception as e:
            return f"文档导入失败：{str(e)}"
```

---

## 第 3 节：Resources 实现

Resources 是只读数据源，Host 可以主动读取（不需要 LLM 调用 Tool）。

### 知识库概览

```python
# resources/knowledge_base.py
from mcp.server.fastmcp import FastMCP
from mcp.shared.context import RequestContext


def register(mcp: FastMCP):
    """注册知识库资源"""

    @mcp.resource("knowledge-base://overview")
    def knowledge_base_overview() -> str:
        """知识库整体概览"""
        from fde_rag.rag_pipeline import RAGPipeline

        pipeline = RAGPipeline.get_instance()
        stats = pipeline.get_stats()

        return (
            f"FDE 企业知识库\n"
            f"================\n"
            f"文档总数：{stats['total_docs']}\n"
            f"分块总数：{stats['total_chunks']}\n"
            f"文档类型分布：\n"
        ) + "\n".join(
            f"  - {dtype}: {count} 篇"
            for dtype, count in stats.get("doc_types", {}).items()
        )

    @mcp.resource("knowledge-base://docs/{doc_id}")
    def get_document(doc_id: str) -> str:
        """获取指定文档的完整内容"""
        from fde_rag.rag_pipeline import RAGPipeline

        pipeline = RAGPipeline.get_instance()
        doc = pipeline.get_document(doc_id)

        if not doc:
            return f"文档不存在：{doc_id}"

        return f"# {doc['title']}\n\n{doc['content']}"
```

### 统计信息

```python
# resources/stats.py
from mcp.server.fastmcp import FastMCP


def register(mcp: FastMCP):
    """注册统计资源"""

    @mcp.resource("stats://queries")
    def query_stats() -> str:
        """查询统计（最近 100 次查询）"""
        from fde_rag.rag_pipeline import RAGPipeline

        pipeline = RAGPipeline.get_instance()
        stats = pipeline.get_query_stats()

        return (
            f"查询统计\n"
            f"========\n"
            f"总查询次数：{stats['total_queries']}\n"
            f"平均延迟：{stats['avg_latency_ms']:.0f}ms\n"
            f"热门查询：\n"
        ) + "\n".join(
            f"  {i+1}. \"{q['query']}\" ({q['count']}次)"
            for i, q in enumerate(stats.get("top_queries", [])[:10])
        )

    @mcp.resource("stats://health")
    def health_stats() -> str:
        """系统健康状态"""
        from fde_rag.rag_pipeline import RAGPipeline

        pipeline = RAGPipeline.get_instance()
        health = pipeline.get_health()

        return (
            f"系统状态：{health['status']}\n"
            f"向量库连接：{'正常' if health['vector_db_ok'] else '异常'}\n"
            f"嵌入模型：{'正常' if health['embedder_ok'] else '异常'}\n"
            f"LLM 连接：{'正常' if health['llm_ok'] else '异常'}\n"
        )
```

---

## 第 4 节：Prompts 实现

Prompts 是预置模板，Host 可以填充参数后使用。

### 技术支持提示模板

```python
# prompts/tech_support.py
from mcp.server.fastmcp import FastMCP


def register(mcp: FastMCP):
    """注册技术支持提示模板"""

    @mcp.prompt()
    def tech_support(
        issue: str,
        severity: str = "medium",
    ) -> str:
        """
        生成结构化的技术支持请求。

        帮助用户准确描述技术问题，便于知识库检索。
        """
        severity_guide = {
            "low": "非紧急，有空处理",
            "medium": "影响工作效率，需要尽快解决",
            "high": "阻塞当前工作，需要立即处理",
        }

        return (
            f"我需要技术支持。\n\n"
            f"问题描述：{issue}\n"
            f"严重程度：{severity_guide.get(severity, severity)}\n\n"
            f"请按以下步骤帮助我：\n"
            f"1. 在知识库中搜索相关的故障排查指南\n"
            f"2. 提供具体的解决步骤\n"
            f"3. 如果无法解决，说明需要收集哪些额外信息\n"
            f"4. 给出相关的 API 文档或配置参考"
        )
```

### 文档摘要模板

```python
# prompts/doc_summary.py
from mcp.server.fastmcp import FastMCP


def register(mcp: FastMCP):
    """注册文档摘要提示模板"""

    @mcp.prompt()
    def doc_summary(doc_id: str) -> str:
        """为指定文档生成结构化摘要"""
        return (
            f"请为文档 {doc_id} 生成以下结构化摘要：\n\n"
            f"1. **核心内容**：这篇文档主要讲什么？（50 字以内）\n"
            f"2. **关键步骤**：如果包含操作指南，列出核心步骤\n"
            f"3. **注意事项**：有哪些容易踩的坑？\n"
            f"4. **相关文档**：和哪些其他文档有关联？\n\n"
            f"先读取文档内容，然后按以上格式生成摘要。"
        )
```

---

## 第 5 节：安全与认证

### API Key 认证

```python
# auth/api_key.py
import os
from typing import Optional


class APIKeyAuth:
    """API Key 认证"""

    def __init__(self):
        self.valid_keys = set()
        self._load_keys()

    def _load_keys(self):
        """从环境变量加载 API Key"""
        api_keys = os.environ.get("FDE_MCP_API_KEYS", "")
        if api_keys:
            self.valid_keys = set(api_keys.split(","))

    def validate(self, api_key: Optional[str]) -> bool:
        """验证 API Key"""
        if not api_key:
            return False
        return api_key in self.valid_keys

    def require(self, api_key: Optional[str]) -> None:
        """验证失败则抛出异常"""
        if not self.validate(api_key):
            raise PermissionError("Invalid or missing API key")
```

### 请求限流

```python
# auth/rate_limit.py
import time
from collections import defaultdict


class RateLimiter:
    """滑动窗口限流"""

    def __init__(
        self,
        max_requests: int = 100,
        window_seconds: int = 3600,  # 1 小时
    ):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._requests: dict[str, list[float]] = defaultdict(list)

    def allow(self, client_id: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds

        # 清理过期记录
        self._requests[client_id] = [
            t for t in self._requests[client_id] if t > window_start
        ]

        if len(self._requests[client_id]) >= self.max_requests:
            return False

        self._requests[client_id].append(now)
        return True
```

---

## 第 6 节：客户端对接

### Claude Desktop 配置

在 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "fde-knowledge": {
      "command": "python",
      "args": ["/path/to/fde-mcp-server/src/server.py"],
      "env": {
        "OPENAI_API_KEY": "your-key",
        "FDE_MCP_API_KEYS": "your-secret-key"
      }
    }
  }
}
```

### HTTP 远程模式配置

如果 MCP Server 部署在远程服务器上：

```json
{
  "mcpServers": {
    "fde-knowledge": {
      "url": "http://your-server:8001/mcp",
      "headers": {
        "X-API-Key": "your-secret-key"
      }
    }
  }
}
```

### Cursor 配置

在 Cursor 的 Settings → MCP → Add MCP Server 中添加：

```json
{
  "fde-knowledge": {
    "command": "python",
    "args": ["/path/to/fde-mcp-server/src/server.py"]
  }
}
```

配置完成后，Claude Desktop/Cursor 启动时会看到 FDE-MCP Server 提供的 3 个工具：
- `rag_query` — 知识库问答
- `doc_search` — 文档搜索
- `doc_ingest` — 文档导入

以及 2 个资源和 2 个提示模板。

---

## 第 7 节：实际使用演示

### 场景 1：在 Claude Desktop 中查询知识库

```
用户: 我们系统的 HTTP 503 错误怎么排查？

Claude (思考后调用工具):
→ 调用 rag_query(query="HTTP 503 错误排查步骤", top_k=5)

工具返回:
HTTP 503 错误的排查步骤如下：
1. 检查后端服务是否存活（curl localhost:8080/health）
2. 检查负载均衡配置是否正确
3. 确认健康检查端点返回 200
4. 查看应用日志中的错误堆栈
[引用来源: troubleshooting-http, deployment-guide]

Claude: 根据知识库中的文档，HTTP 503 错误通常有以下几个原因...
```

### 场景 2：组合使用多个工具

```
用户: 帮我找一下关于 Kubernetes 部署的所有文档

Claude:
→ 调用 doc_search(keyword="Kubernetes 部署", max_results=10)

工具返回:
找到 5 条相关文档：
1. k8s-deployment-guide（相关度: 0.92）
2. k8s-configmap-secrets（相关度: 0.85）
3. k8s-service-mesh（相关度: 0.78）
...

用户: 第一篇详细讲讲

Claude:
→ 调用 knowledge-base://docs/k8s-deployment-guide

然后基于文档内容生成详细回答。
```

---

## 第 8 节：生产部署

### Docker 容器化

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml .
RUN pip install --no-cache-dir -e .

COPY src/ src/

EXPOSE 8001

CMD ["python", "src/server.py", "--transport", "http"]
```

### Nginx 反向代理 + TLS

```nginx
# nginx.conf
server {
    listen 443 ssl;
    server_name mcp.yourcompany.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    location /mcp {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持（MCP SSE 传输）
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## 知识点映射

| 前置章节 | 本章的关系 |
|---------|-----------|
| 第 05 章：框架与工具调用 | 本章是 MCP 协议的完整代码实现 |
| 第 16 章：RAG 系统 | MCP Server 调用第 16 章的 RAG Pipeline |
| 第 09 章：安全与 Guardrails | API Key 认证 + 限流 |
| 第 10 章：生产部署 | Docker + Nginx 部署 |

### MCP vs REST API vs A2A 对比

| 维度 | REST API | MCP | A2A |
|------|---------|-----|-----|
| 设计目标 | 通用 HTTP 接口 | LLM 应用与工具连接 | Agent 之间协作 |
| 接口描述 | OpenAPI/Swagger | JSON Schema（自动生成） | Agent Card |
| 调用方式 | 客户端手写代码 | LLM 自动选择+调用 | Agent 协商+委派 |
| 典型场景 | 前后端分离 | Claude Desktop 接外部数据 | 多 Agent 任务协作 |
| 生态 | 成熟 | 快速增长（2300+） | 早期（50+） |

---

*← 返回 [导航图](/agentic-ai/) | 前往 [生产级 RAG 系统](/agentic-ai/16-project-rag-system) →*
