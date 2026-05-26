---
name: trend-collector
description: 获取最新 AI 行业趋势，更新 static/data/trends.json
type: skill
---

# AI 行业趋势采集 Skill

## 用途

采集 AI 领域最新行业动态，更新 `static/data/trends.json`，为 `src/pages/trends.tsx` 页面提供数据。

## 采集范围

### 趋势类别 + 搜索关键词

| 类别 | 关键词 |
|------|--------|
| 模型发布 | LLM release, new model, GPT, Claude, Gemini, Llama, Qwen, 大模型发布 |
| 研究论文 | arXiv LLM, Transformer, attention, reasoning model, paper breakthrough |
| 开源项目 | open source LLM, AI framework, inference engine, GitHub trending AI |
| 行业动态 | AI funding, startup, acquisition, regulation, policy, AI company |
| 推理与部署 | inference optimization, vLLM, TensorRT, quantization, GPU, serving |
| Agent 与应用 | AI agent, autonomous agent, multi-agent, RAG, MCP, AI application |

### 数据源

通过 WebSearch 搜索获取（按优先级）：
1. **arXiv** — `site:arxiv.org "LLM" OR "Transformer" 2026`
2. **GitHub Trending** — WebSearch 搜索 `GitHub trending AI LLM 2026`
3. **Hacker News** — `site:news.ycombinator.com AI LLM 2026`
4. **Twitter/X** — WebSearch 搜索 `AI news LLM breakthrough 2026`
5. **科技媒体** — TechCrunch、The Verge、36Kr 等关于 AI 的最新报道
6. **官方博客** — OpenAI Blog、Anthropic Blog、Google AI Blog、Meta AI Blog 等

## 采集流程

1. **读取现有数据**：先 `Read` 当前 `static/data/trends.json`，提取已有趋势 URL 列表，用于去重
2. **逐类别搜索**：对每个类别，用 2-3 个核心关键词 + WebSearch 搜索（限定近 30 天内容）
3. **提取信息**：从搜索结果中提取 title, source, url, date, category, summary, impact
4. **分级评估**：对每条趋势进行 impact_level 评估（S/A/B/C 四级）
5. **去重合并**：按 URL 去重，保留新趋势
6. **更新文件**：写入 `static/data/trends.json`，更新 `last_updated` 和 `total_trends`

## 数据格式

每个趋势对象：
```json
{
  "title": "趋势标题",
  "source": "来源（如 arXiv / GitHub / OpenAI Blog / TechCrunch 等）",
  "url": "原始链接",
  "date": "发布日期 YYYY-MM-DD",
  "category": "模型发布/研究论文/开源项目/行业动态/推理部署/Agent应用",
  "summary": "一句话摘要（中文）",
  "impact_level": "S/A/B/C",
  "fde_relevance": "对 FDE 岗位的相关性说明（中文，1-2 句话）"
}
```

影响级别说明：
- **S**：重大突破（如新模型架构、范式转变、里程碑发布）
- **A**：重要进展（如主流模型大版本更新、重要论文、关键工具发布）
- **B**：值得关注（如新项目起步阶段、行业分析、性能优化）
- **C**：参考信息（如社区讨论、小更新、观点文章）

整个 JSON 结构：
```json
{
  "last_updated": "YYYY-MM-DD",
  "total_trends": 数字,
  "categories": [
    {
      "name": "模型发布",
      "trends": [趋势对象...]
    },
    ...
  ],
  "highlights": [
    {
      "title": "本周亮点",
      "items": ["亮点1", "亮点2", ...]
    }
  ]
}
```

## 采集策略

- 每类至少采集 3-5 条新趋势（如有）
- 优先选择权威来源（官方博客、顶级会议论文、高星开源项目）
- 保留已有数据中的老趋势（不完全替换，而是增量更新，最多保留每个类别 20 条）
- 老趋势如果超过 90 天且无新进展，标记为 `archived: true`
- 每条趋势必须包含 `fde_relevance` 字段，说明对 FDE 学习/面试的意义

## 输出报告

采集完成后，输出简要报告：
- 本次新增趋势数
- 各类别趋势数
- 新增 S 级/A 级趋势列表
- 被归档的老趋势数
