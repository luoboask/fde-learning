---
sidebar_position: 15
sidebar_label: 第五阶段 工具与 RAG
---

# 第五阶段：工具集成与 RAG 系统——让智能体"连接世界"

> 智能体的核心价值是"连接现实世界"，而工具集成和 RAG 系统（检索增强生成），就是智能体连接世界的"感官"——工具让智能体能执行具体操作，RAG 让智能体能获取最新、最准确的知识。

## 智能体友好型工具设计

设计工具时要遵循 4 个原则：

### 4 大设计原则

| 原则 | 说明 | 示例 |
|------|------|------|
| **命名清晰** | 让模型一眼知道工具用途 | `search_knowledge_base` 而非 `fn1` |
| **目的单一** | 一个工具只做一件事 | 搜索和写入分为两个工具 |
| **输入输出结构化** | 方便模型识别和调用 | 使用 Pydantic Schema |
| **失败快速** | 遇到错误及时返回，避免阻塞 | 超时返回错误信息 |

### 工具设计示例

```python
from pydantic import BaseModel, Field

class SearchInput(BaseModel):
    """搜索知识库的输入。"""
    query: str = Field(description="搜索查询，尽量简洁，建议 < 100 字")
    limit: int = Field(default=5, ge=1, le=20, description="返回结果数量")
    category: str = Field(default="", description="可选：按类别过滤")

class SearchOutput(BaseModel):
    """搜索知识库的输出。"""
    results: list[dict] = Field(description="搜索结果列表")
    count: int = Field(description="结果数量")
    error: str = Field(default="", description="错误信息，无错误则为空")

def search_knowledge(input: SearchInput) -> SearchOutput:
    """搜索内部知识库，返回相关文章和信息。

    适用于：查找公司政策、产品信息、技术文档
    不适用于：实时新闻、股票价格（应使用网络搜索工具）
    """
    try:
        results = vector_store.search(input.query, limit=input.limit)
        return SearchOutput(results=results, count=len(results))
    except Exception as e:
        return SearchOutput(results=[], count=0, error=str(e))
```

### 有副作用操作的安全闸门

```python
def send_email(input: EmailInput) -> EmailOutput:
    """发送邮件——有副作用的操作，需要确认闸门。"""
    # 1. 权限检查
    if not check_permission(user_id, "send_email"):
        return EmailOutput(error="无发送邮件权限")

    # 2. 确认闸门（在 Agent 层面要求模型先征得用户同意）
    # 3. 执行发送
    try:
        smtp.send_mail(
            to=input.to,
            subject=input.subject,
            body=input.body
        )
        return EmailOutput(success=True)
    except Exception as e:
        return EmailOutput(error=str(e))
```

## RAG 的实用主义

RAG 是企业级 Agent 应用的核心，小白无需追求复杂的算法，重点掌握以下 3 点即可落地。

### 1. 分块策略（Chunking）

**最佳起点**：300-800 Token 的语义分块，配合 10-20% 的内容重叠。

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,          # 300-800 之间
    chunk_overlap=75,        # 10-20% 重叠
    separators=["\n\n", "\n", "。", "！", "？", " ", ""],
    length_function=len,
)

chunks = splitter.split_documents(documents)
```

**调优方法**：根据数据集和任务需求，通过评估不断调整 chunk_size 和 overlap。

| 场景 | chunk_size | overlap |
|------|------------|---------|
| 短问答（FAQ） | 300 | 50 |
| 长文档理解 | 800 | 150 |
| 代码检索 | 500 | 100 |

### 2. 混合检索（Hybrid Retrieval）

结合密集向量检索（语义匹配）和稀疏检索（关键词 BM25），再通过重排序模型优化结果。

```
用户查询
    │
    ├──→ 密集检索 (BM25/关键词) ──┐
    │                             ▼
    └──→ 向量检索 (语义相似度) ──→ 合并结果 ──→ 重排序 ──→ Top-K
```

```python
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever
from langchain_chroma import Chroma

# 关键词检索
bm25 = BM25Retriever.from_documents(chunks)
bm25.k = 10

# 向量检索
vector_store = Chroma.from_documents(chunks, embeddings)
vector_retriever = vector_store.as_retriever(search_kwargs={"k": 10})

# 混合检索
ensemble = EnsembleRetriever(
    retrievers=[bm25, vector_retriever],
    weights=[0.3, 0.7]  # BM25 权重 30%，向量权重 70%
)

# 可选：重排序
from langchain.retrievers.document_compressors import CrossEncoderReranker
from langchain_community.cross_encoders import HuggingFaceCrossEncoder

cross_encoder = HuggingFaceCrossEncoder(model_name="BAAI/bge-reranker-large")
reranker = CrossEncoderReranker(model=cross_encoder, top_n=5)
```

### 3. 元数据过滤（Metadata Filtering）

这是企业级 RAG 的"生命线"，尤其是多租户场景。

```python
# 文档添加元数据
doc_with_metadata = Document(
    page_content="公司 Q3 财报摘要...",
    metadata={
        "tenant_id": "company_a",    # 租户 ID——安全关键
        "department": "finance",      # 部门
        "doc_type": "report",         # 文档类型
        "created_at": "2026-01-15",   # 创建时间
    }
)

# 检索时强制元数据过滤
results = vector_store.similarity_search(
    query="Q3 营收",
    k=5,
    filter={
        "tenant_id": "company_a",  # 必须过滤，防止跨租户数据泄露
    }
)
```

**关键原则**：必须通过**代码强制执行**元数据过滤，防止跨租户数据泄露。从入门就需重视数据安全。

## 阶段实战：构建完整的 RAG 问答系统

**目标**：独立完成一个可部署的 RAG 系统：

- [ ] 文档加载与分块（300-800 Token + 10-20% overlap）
- [ ] 混合检索（BM25 + 向量）
- [ ] 重排序（CrossEncoder）
- [ ] LLM 问答（带提示模板和引用）
- [ ] 元数据过滤（租户隔离）
- [ ] 评估（使用 Ragas 或自建测试集）

## 阶段检查清单

- [ ] 掌握工具设计的 4 个原则
- [ ] 能为有副作用的操作添加确认闸门
- [ ] 掌握分块策略，能根据场景调整 chunk_size
- [ ] 能实现混合检索（BM25 + 向量 + 重排序）
- [ ] 理解元数据过滤的重要性，能实现租户隔离
- [ ] 能独立完成完整的 RAG 问答系统

---

[上一阶段：← 高级概念](/tools/agentic-ai/04-advanced-concepts) | [下一阶段：生产落地 →](/tools/agentic-ai/06-production-deployment)
