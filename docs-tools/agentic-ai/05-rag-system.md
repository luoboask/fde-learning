---
sidebar_position: 15
sidebar_label: 第五阶段 RAG
---

# 第五阶段：RAG 系统实战——让智能体"获取知识"

> RAG（检索增强生成）是企业级 Agent 应用的核心。2026 年，RAG 已从简单向量搜索进化为混合检索 + 重排序 + 评估的完整工程体系。

## RAG 架构总览

```
文档加载 ─→ 分块 ─→ 向量化 ─→ 存储
                                    │
用户查询 ─→ 向量化 ─→ 检索 ─→ 重排序 ─→ LLM ─→ 答案
```

## 1. 分块策略（Chunking）

**最佳起点**：300-800 Token 的语义分块 + 10-20% 重叠。

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=75,
    separators=["\n\n", "\n", "。", "！", "？", " ", ""],
)

chunks = splitter.split_documents(documents)
```

| 场景 | chunk_size | overlap |
|------|------------|---------|
| 短问答（FAQ） | 300 | 50 |
| 长文档理解 | 800 | 150 |
| 代码检索 | 500 | 100 |

## 2. 混合检索（Hybrid Retrieval）

结合密集向量检索（语义匹配）和稀疏检索（关键词 BM25）。

```python
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever
from langchain_chroma import Chroma

# 关键词检索
bm25 = BM25Retriever.from_documents(chunks, k=10)

# 向量检索
vector_store = Chroma.from_documents(chunks, embeddings)
vector = vector_store.as_retriever(search_kwargs={"k": 10})

# 混合检索
ensemble = EnsembleRetriever(
    retrievers=[bm25, vector],
    weights=[0.3, 0.7]  # BM25 30%，向量 70%
)
```

### 重排序（Reranking）

```python
from langchain.retrievers.document_compressors import CrossEncoderReranker
from langchain_community.cross_encoders import HuggingFaceCrossEncoder

cross_encoder = HuggingFaceCrossEncoder(model_name="BAAI/bge-reranker-large")
reranker = CrossEncoderReranker(model=cross_encoder, top_n=5)
```

## 3. 元数据过滤

这是企业级 RAG 的"生命线"。

```python
doc = Document(
    page_content="公司 Q3 财报摘要...",
    metadata={
        "tenant_id": "company_a",    # 租户 ID——安全关键
        "department": "finance",
        "doc_type": "report",
        "created_at": "2026-01-15",
    }
)

# 检索时强制过滤
results = vector_store.similarity_search(
    query="Q3 营收",
    k=5,
    filter={"tenant_id": "company_a"}  # 必须过滤
)
```

## 4. GraphRAG（2026 进阶）

当文档间存在复杂关系时，使用图结构增强 RAG：

```
文档 A ─→ 引用 ─→ 文档 B ─→ 反驳 ─→ 文档 C
```

适用场景：法律文档、技术文档、论文引用网络。

## 5. RAG 评估

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision

# 准备测试集
test_cases = [
    {"question": "公司的年假是多少天？", "ground_truth": "15 天"},
    {"question": "Q3 营收增长了多少？", "ground_truth": "12%"},
]

# 评估
results = evaluate(
    test_cases,
    metrics=[faithfulness, answer_relevancy, context_precision],
)
```

## 阶段实战

**目标**：独立完成一个可部署的 RAG 系统

- [ ] 文档加载与分块
- [ ] 混合检索（BM25 + 向量 + 重排序）
- [ ] LLM 问答（带提示模板和引用）
- [ ] 元数据过滤（租户隔离）
- [ ] 评估（Ragas 或自建测试集）

## 阶段检查清单

- [ ] 掌握分块策略，能根据场景调整
- [ ] 能实现混合检索 + 重排序
- [ ] 理解元数据过滤的重要性
- [ ] 能独立完成完整的 RAG 问答系统
- [ ] 能定义评估指标并运行评估

---

[上一阶段：← 框架与工具](/tools/agentic-ai/04-frameworks-tools) | [下一阶段：Agent 记忆 →](/tools/agentic-ai/06-agent-memory)
