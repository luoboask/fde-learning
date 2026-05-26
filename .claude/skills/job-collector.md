---
name: job-collector
description: 定期采集 FDE 相关招聘岗位，更新 static/data/jobs.json
type: skill
---

# FDE 岗位采集 Skill

## 用途

定期采集 5 大类别 FDE 相关岗位，更新 `static/data/jobs.json`。

## 采集范围

### 岗位类别 + 搜索关键词

| 类别 | 关键词 |
|------|--------|
| 大模型推理/部署 | 大模型推理, LLM推理, vLLM, TRT-LLM, SGLang, KV Cache, 模型部署, GPU优化 |
| 大模型应用/Agent | AI Agent, LLM应用, RAG, Prompt Engineering, LangChain, Function Calling |
| 大模型算法/架构 | 大模型算法, LLM架构, 模型训练, MoE, 多模态, 具身智能 |
| AI 平台/基础设施 | AI平台, CUDA, GPU工程师, 推理加速, AI基础设施 |
| AI 解决方案/架构 | AI解决方案, AI架构师, 大模型解决方案 |
| AI 前沿部署工程师 | AI前沿, 大模型前沿, AGI, AI安全, AI对齐, AI研究, AI Scientist |

### 数据源

优先从以下平台采集（按优先级）：
1. BOSS直聘 (zhipin.com) — 通过 WebSearch 搜索 `site:zhipin.com "关键词"`
2. 猎聘 (liepin.com) — 通过 WebSearch 搜索 `site:liepin.com "关键词"`
3. 牛客 (nowcoder.com) — 通过 WebSearch 搜索 `site:nowcoder.com "关键词"`
4. 各公司官方招聘页面 — 通过 WebSearch 搜索 `site:jobs.xxx.com "关键词"`
5. WebFetch 抓取搜索结果页

## 采集流程

1. **读取现有数据**：先 `Read` 当前 `static/data/jobs.json`，提取已有岗位 URL 列表，用于去重
2. **逐类别搜索**：对每个类别，用 2-3 个核心关键词 + WebSearch 搜索
3. **提取信息**：从搜索结果中提取 title, company, location, url, source, tags, salary
4. **去重合并**：按 URL 去重，保留新岗位
5. **更新文件**：写入 `static/data/jobs.json`，更新 `last_updated` 和 `total_jobs`

## 数据格式

每个岗位对象：
```json
{
  "title": "岗位标题",
  "company": "公司名称",
  "location": "工作地点（如 北京/上海/深圳/杭州/全国 等）",
  "url": "招聘页面URL",
  "source": "来源平台（如 BOSS直聘/猎聘/牛客/字节招聘等）",
  "tags": ["关键词1", "关键词2"],
  "salary": "薪资范围（如 30-60K·15薪，无法获取时省略）"
}
```

整个 JSON 结构：
```json
{
  "last_updated": "YYYY-MM-DD",
  "total_jobs": 数字,
  "categories": [
    { "name": "类别名", "jobs": [岗位对象...] },
    ...
  ],
  "salary_insights": { ... },
  "hot_companies": ["公司1", ...],
  "hot_skills": ["技能1", ...]
}
```

## 采集策略

- 每类至少采集 5-10 个新岗位（如有）
- 优先选择大厂/知名企业
- 保留已有数据中的老岗位（不完全替换，而是增量更新）
- 同一公司同类型岗位去重（保留最新）
- 每个类别的 tags 要体现该岗位的技术栈特点

## 输出报告

采集完成后，输出简要报告：
- 本次新增岗位数
- 各类别岗位数
- 新增热门公司/技能（如有变化）
