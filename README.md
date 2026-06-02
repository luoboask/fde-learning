# FDE 学习中心

> **AI 前沿部署工程师（Frontier Deployment Engineer）—— 从入门到面试的一条龙学习平台**

在线地址：[https://luoboask.github.io/fde-learning/](https://luoboask.github.io/fde-learning/)

---

## 这是什么

FDE 学习中心是一个面向 AI 前沿部署工程师的**系统性学习平台**，涵盖：

- **AI 基础理论**：Transformer、模型训练、GPU 架构、推理优化
- **生产部署实战**：vLLM/SGLang 推理引擎、K8s 部署、可观测性、成本优化
- **Agentic AI**：LangGraph、RAG、多智能体编排、MCP/A2A 协议
- **源码解读**：nanoGPT、llm.c、llama.cpp、vLLM、SGLang、Claude Code 架构
- **面试与招聘**：面试答题框架、技能知识图谱、真实岗位列表
- **行业动态**：AI 趋势、GitHub 热门项目、新兴 AI 产品

## 适合谁

| 人群 | 收获 |
|------|------|
| **求职者** | 掌握 FDE 面试核心技术考点，用 STAR 方法讲述项目故事 |
| **在职工程师** | 从 GPU 底层到分布式架构，系统化现有知识 |
| **转行 AI 的开发者** | 从 Transformer 开始，一条清晰路径走到生产部署 |
| **技术负责人** | 团队建设、招聘体系、技术选型、成本管控 |

---

## 页面预览

### 首页

![首页](static/screenshots/home-dashboard.png)

### 系统学习 — 什么是 FDE

![系统学习文档](static/screenshots/learn-doc.png)

### Agentic AI — Python 工程基础

![Agentic AI 文档](static/screenshots/agentic-ai-doc.png)

### GitHub AI 趋势（半年数据）

![GitHub 趋势](static/screenshots/github-trends.png)

### AI 应用趋势（40+ 新兴产品）

![AI 应用趋势](static/screenshots/ai-applications.png)

---

## 平台模块

| 模块 | 路由 | 内容量 | 说明 |
|------|------|--------|------|
| **FDE 系统学习** | `/` | 15 个阶段 | AI 基础 → GPU → 推理引擎 → 分布式 → 生产部署 → 面试 → 团队管理 |
| **Agentic AI 系统学习** | `/agentic-ai/` | 20 篇 | Python 基础 → LLM → 上下文工程 → Harness → LangGraph → RAG → 多智能体 → 实战项目 |
| **开源源码解读** | `/opensource/` | 6 个项目 | nanoGPT、llm.c、llama.cpp、vLLM、SGLang、Claude Code 架构 |
| **工具教程** | `/tools/` | 5 篇 | Cursor、Claude Code、Karpathy AI 编程、OpenSpec 工作流 |
| **AI 行业趋势** | `/trends/` | 动态 | 30+ 条趋势，S/A/B/C 四级影响评估，每周更新 |
| **GitHub 趋势** | `/github-trends/` | 动态 | 半年数据，5 大分类 31 个项目 |
| **AI 应用趋势** | `/ai-applications/` | 动态 | 40+ 个新兴 AI 产品，从大厂到独立开发者 |
| **FDE 招聘动态** | `/jobs/` | 5 大类别 | 推理/部署、Agent、算法/架构、平台/基础设施、解决方案 |

---

## 本地运行

```bash
npm install
npm start
```

打开 [http://localhost:3000](http://localhost:3000) 即可查看。

## 部署

站点通过 GitHub Pages 自动部署：

```bash
git push origin master
npm run deploy
```

## 贡献

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交修改：`git commit -m '描述你的改动'`
4. 推送并提 Pull Request

## License

MIT
