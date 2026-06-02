import React, { useState } from 'react';
import Layout from '@theme/Layout';

interface Repo {
  name: string;
  stars: string;
  growth: string;
  description: string;
  category: string;
  url: string;
  highlight?: string;
  source: string;
  date: string;
}

interface CategoryGroup {
  icon: string;
  title: string;
  color: string;
  bg: string;
  repos: Repo[];
}

const CATEGORIES: CategoryGroup[] = [
  {
    icon: '🤖',
    title: 'AI Agent 框架',
    color: '#8b5cf6',
    bg: '#ede9fe',
    repos: [
      {
        name: 'langchain-ai/langgraph',
        stars: '25K+',
        growth: '持续上升',
        description: '生产级 Agent 编排框架，状态图、Memory、Streaming、HITL、多智能体。2026 年 LangGraph 成为生产部署 #1 选择。',
        category: 'Agent 框架',
        url: 'https://github.com/langchain-ai/langgraph',
        source: '多源汇总',
        date: '2025.12-2026.06',
        highlight: '生产部署 #1',
      },
      {
        name: 'NousResearch/hermes-agent',
        stars: '155K',
        growth: '+4.7K/周',
        description: '自改进 AI Agent 框架，Agent 能自我评估和优化性能循环。2026 年 5 月增长最快项目之一。',
        category: 'Agent 框架',
        url: 'https://github.com/NousResearch/hermes-agent',
        source: 'Rananjay Raj',
        date: '2026-05-19',
        highlight: '自改进能力',
      },
      {
        name: 'FlowiseAI/flowise',
        stars: '50.9K',
        growth: '每3天更新',
        description: '可视化拖拽 AI Agent 工作区，Chatflow/Agentflow/RAG/人在回路/100+ LLM 集成/可嵌入 Widget。23,300+ forks。',
        category: 'Agent 框架',
        url: 'https://github.com/FlowiseAI/Flowise',
        source: 'OSSphere',
        date: '2026-05-30',
        highlight: '可视化编排',
      },
      {
        name: 'langgenius/dify',
        stars: '50K+',
        growth: '持续上升',
        description: '生产级 agentic workflow 开发平台，支持可视化编排、RAG、Agent 编排。国内团队开源明星项目。',
        category: 'Agent 框架',
        url: 'https://github.com/langgenius/dify',
        source: 'AI Repo of the Day',
        date: '2026-06-02',
        highlight: '国内开源明星',
      },
      {
        name: 'obra/superpowers',
        stars: '188K',
        growth: '+4.7K/周',
        description: '可组合 AI Agent 工作流技能，模块化构建块，Agent 工具的"标准库"。',
        category: 'Agent 框架',
        url: 'https://github.com/obra/superpowers',
        source: 'Rananjay Raj',
        date: '2026-05-19',
      },
      {
        name: 'bytedance/UI-TARS-desktop',
        stars: '34.6K',
        growth: '+2.6K/周',
        description: '字节跳动开源桌面 AI Agent，通过自然语言控制电脑操作。GUI Agent 领域先行者。',
        category: 'Agent 框架',
        url: 'https://github.com/bytedance/UI-TARS-desktop',
        source: 'Rananjay Raj',
        date: '2026-05-19',
        highlight: 'GUI Agent 先行',
      },
      {
        name: 'modelcontextprotocol/python-sdk',
        stars: '15K+',
        growth: '持续上升',
        description: 'Anthropic 官方 MCP Python SDK。MCP 协议 2026 年成为 Agent-Tool 连接标准，50+ 公司支持。',
        category: 'Agent 框架',
        url: 'https://github.com/modelcontextprotocol',
        source: '多源汇总',
        date: '2026.01-2026.06',
        highlight: '协议标准',
      },
    ],
  },
  {
    icon: '💻',
    title: 'AI 编程工具',
    color: '#3b82f6',
    bg: '#dbeafe',
    repos: [
      {
        name: 'mattpocock/skills',
        stars: '91K',
        growth: '+19.7K/周',
        description: '一个工程师的 .claude 文件夹。AI Agent 技能库，修复不对齐和啰嗦问题。2026 年 5 月 GitHub 最大星数增长。',
        category: '编程工具',
        url: 'https://github.com/mattpocock/skills',
        source: 'Rananjay Raj',
        date: '2026-05-19',
        highlight: '本周 #1 增长',
      },
      {
        name: 'colbymchenry/codegraph',
        stars: '36K+',
        growth: '+13.9K/周',
        description: 'AI 编程 Agent 知识图谱，预索引代码库。7 个真实代码库基准：成本 -35%、Token -59%、工具调用 -70%、速度 +49%。100% 本地。',
        category: '编程工具',
        url: 'https://github.com/colbymchenry/codegraph',
        source: 'Eran Dror / 币天天',
        date: '2026-06-01',
        highlight: 'Graphs NOT Grep',
      },
      {
        name: 'rohitg00/agentmemory',
        stars: '12K',
        growth: '+7.1K/周',
        description: 'AI 编程 Agent 持久记忆服务器，Claude Code/Codex/Cursor 跨会话共享上下文，解决"AI 健忘症"。',
        category: '编程工具',
        url: 'https://github.com/rohitg00/agentmemory',
        source: 'Rananjay Raj',
        date: '2026-05-19',
        highlight: '解决健忘症',
      },
      {
        name: 'millionco/react-doctor',
        stars: '10K',
        growth: '+2.4K/周',
        description: '一条命令给 React 应用 0-100 健康评分，检测 AI Agent 写的坏代码。',
        category: '编程工具',
        url: 'https://github.com/millionco/react-doctor',
        source: 'Rananjay Raj',
        date: '2026-05-19',
        highlight: '代码质量检测',
      },
      {
        name: 'Everything Claude Code',
        stars: '163K+',
        growth: '持续上升',
        description: 'Anthropic hackathon 冠军项目：183 个 Agent Skills、48 个子 Agent、79 个即用命令。支持 Claude Code、Codex、Cursor、Gemini。',
        category: '编程工具',
        url: 'https://github.com',
        source: 'smrati tiwari',
        date: '2026-06-01',
        highlight: 'Hackathon 冠军',
      },
      {
        name: 'ktx',
        stars: '8K+',
        growth: '快速上升',
        description: '跨会话自改进上下文层，追踪模式跨会话、适配代码库，为 Claude Code 和 Codex 设计。',
        category: '编程工具',
        url: 'https://github.com',
        source: 'Bryan',
        date: '2026-06-01',
        highlight: '跨会话上下文',
      },
      {
        name: '免费 Claude Code 路由层',
        stars: '25K+',
        growth: '+20K/周',
        description: '通过 DeepSeek/Kimi 等免费提供商路由 Claude Code，5 分钟设置。20,000+ 开发者已使用。',
        category: '编程工具',
        url: 'https://github.com',
        source: 'Pawan Kumar Singh',
        date: '2026-05-22',
        highlight: '免费替代方案',
      },
    ],
  },
  {
    icon: '🔧',
    title: '行业垂直 Agent',
    color: '#10b981',
    bg: '#d1fae5',
    repos: [
      {
        name: 'anthropics/claude-for-legal',
        stars: '25K',
        growth: '+6K/周',
        description: 'Anthropic 官方开源法律 AI 套件：80+ AI Agent、12 个实践领域插件、20 个 MCP 连接器。生产级工作流 Agent。',
        category: '垂直 Agent',
        url: 'https://github.com/anthropics/claude-for-legal',
        source: 'Elias Al',
        date: '2026-05-19',
        highlight: 'Anthropic 官方',
      },
      {
        name: 'anthropics/financial-services',
        stars: '25K',
        growth: '+6K/周',
        description: 'Anthropic 官方金融 Agent 套件：Pitch Deck、DCF 模型、KYC 筛查、月末结账等即插即用 Agent。',
        category: '垂直 Agent',
        url: 'https://github.com/anthropics/financial-services',
        source: 'Rananjay Raj',
        date: '2026-05-19',
        highlight: 'Anthropic 官方',
      },
      {
        name: 'yikart/AiToEarn',
        stars: '15K',
        growth: '+4.7K/周',
        description: '独立创作者 AI 内容变现平台，一键发布到 10+ 平台并自动管理互动。',
        category: '垂直 Agent',
        url: 'https://github.com/yikart/AiToEarn',
        source: 'Rananjay Raj',
        date: '2026-05-19',
      },
    ],
  },
  {
    icon: '🛡️',
    title: '安全与基础设施',
    color: '#f59e0b',
    bg: '#fef3c7',
    repos: [
      {
        name: 'CloakHQ/CloakBrowser',
        stars: '14.6K',
        growth: '+9K/周',
        description: '隐形 Chromium，49 个源码级补丁，通过所有 bot 检测。Playwright/Puppeteer 直接替代品。',
        category: '安全',
        url: 'https://github.com/CloakHQ/CloakBrowser',
        source: 'Rananjay Raj',
        date: '2026-05-19',
        highlight: '反检测浏览器',
      },
      {
        name: 'microsoft/markitdown',
        stars: '30K+',
        growth: '持续 Trending',
        description: '微软开源：将各种文件（PDF、DOCX、图片等）转换为 Markdown 格式，AI 数据预处理利器。',
        category: '基础设施',
        url: 'https://github.com/microsoft/markitdown',
        source: 'Maggie | AI GitHub Daily',
        date: '2026-05-31',
        highlight: '微软官方',
      },
      {
        name: 'D4Vinci/Scrapling',
        stars: '15K+',
        growth: '持续 Trending',
        description: '新一代网页爬虫工具，自动化数据采集，适用于 AI Agent 数据源获取。',
        category: '基础设施',
        url: 'https://github.com/D4Vinci/Scrapling',
        source: 'Maggie | AI GitHub Daily',
        date: '2026-05-31',
      },
      {
        name: 'langfuse/langfuse',
        stars: '10K+',
        growth: '持续上升',
        description: '开源 Agent 可观测性平台，追踪、评估、调试。自部署，数据不出境。2026 年成为生产部署标配。',
        category: '基础设施',
        url: 'https://github.com/langfuse/langfuse',
        source: '多源汇总',
        date: '2025.12-2026.06',
        highlight: '可观测性标配',
      },
    ],
  },
  {
    icon: '🧠',
    title: '模型与推理引擎',
    color: '#ef4444',
    bg: '#fee2e2',
    repos: [
      {
        name: 'karpathy/llm.c',
        stars: '40K+',
        growth: '持续热门',
        description: '用纯 C 从头训练 LLM，教育意义极强。Karpathy 2025 年发布后持续成为学习 LLM 内部原理的最佳资源。',
        category: '模型',
        url: 'https://github.com/karpathy/llm.c',
        source: '多源汇总',
        date: '2025.12-2026.06',
        highlight: '学习 LLM 原理',
      },
      {
        name: 'karpathy/nanoGPT',
        stars: '30K+',
        growth: '持续热门',
        description: '最简 GPT 实现，入门 LLM 训练的首选。与 llm.c 配套，构成 LLM 学习的双子星。',
        category: '模型',
        url: 'https://github.com/karpathy/nanoGPT',
        source: '多源汇总',
        date: '2025.12-2026.06',
        highlight: 'GPT 入门',
      },
      {
        name: 'vllm-project/vllm',
        stars: '35K+',
        growth: '持续上升',
        description: '高吞吐推理引擎，PagedAttention 技术。2026 年已成为生产部署的事实标准。',
        category: '推理引擎',
        url: 'https://github.com/vllm-project/vllm',
        source: '多源汇总',
        date: '2025.12-2026.06',
        highlight: '推理标准',
      },
      {
        name: 'sgl-project/sglang',
        stars: '15K+',
        growth: '快速上升',
        description: '新一代推理框架，RadixAttention、Speculative Decoding。2026 年崛起，vLLM 最强挑战者。',
        category: '推理引擎',
        url: 'https://github.com/sgl-project/sglang',
        source: '多源汇总',
        date: '2025.12-2026.06',
        highlight: '新贵推理框架',
      },
    ],
  },
];

const KEY_PATTERNS = [
  'Agent 工具生态正在超越模型本身 — 最佳 AI 工具不是替换开发者，而是修复 Agent 的短板',
  '本周最大增长来自 .claude/.cursor 配置技能库（+19.7K），说明 Agent 工程化的核心是规则而非模型',
  '垂直行业 Agent 正式爆发 — Anthropic 官方开源法律/金融 Agent 套件，不是 demo 而是生产级工作流',
  '跨会话记忆（agentmemory）和知识图谱（codegraph）成为 AI 编程的两大刚需',
  '免费模型路由层（25K+ stars）印证了 token 计费模式的脆弱性',
  '可视化 Agent 编排（Flowise/dify）正在降低 Agent 开发门槛，23,300+ forks 说明社区活跃',
  '可观测性平台（Langfuse）和 MCP 协议成为 2026 下半年生产部署的标配',
];

function RepoCard({ repo, color }: { repo: Repo; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: '1.25rem',
        background: hovered ? `${color}08` : '#fff',
        borderRadius: '10px',
        border: `1px solid ${hovered ? `${color}40` : 'var(--fde-border)'}`,
        textDecoration: 'none',
        transition: 'all 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--ifm-color-primary)' }}>
          {repo.name}
        </h3>
        {repo.highlight && (
          <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '4px', background: `${color}18`, color }}>
            {repo.highlight}
          </span>
        )}
      </div>
      <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--fde-text-light)', lineHeight: 1.6 }}>
        {repo.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#f59e0b', fontWeight: 600 }}>⭐ {repo.stars}</span>
        <span style={{ color: '#10b981', fontWeight: 600 }}>{repo.growth}</span>
        <span style={{ color: 'var(--fde-text-light)' }}>{repo.source}</span>
        <span style={{ color: 'var(--fde-text-light)' }}>{repo.date}</span>
      </div>
    </a>
  );
}

function CategoryBlock({ cat }: { cat: CategoryGroup }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '1.3rem' }}>{cat.icon}</span>
          <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: cat.color }}>{cat.title}</h2>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '0.75rem' }}>
        {cat.repos.map((repo, i) => (
          <RepoCard key={i} repo={repo} color={cat.color} />
        ))}
      </div>
    </section>
  );
}

export default function GitHubTrendsPage(): React.ReactElement {
  const totalRepos = CATEGORIES.reduce((s, c) => s + c.repos.length, 0);

  return (
    <Layout title="GitHub AI 趋势" description="GitHub 上最受欢迎的 AI/Agent 开源项目（半年数据）">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#d1fae5', color: '#10b981', borderRadius: '999px', fontWeight: 600 }}>
              GitHub
            </span>
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#dbeafe', color: '#3b82f6', borderRadius: '999px', fontWeight: 600 }}>
              半年数据
            </span>
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#fef3c7', color: '#f59e0b', borderRadius: '999px', fontWeight: 600 }}>
              {totalRepos} 个项目
            </span>
          </div>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: '2rem', fontWeight: 800 }}>
            GitHub AI 项目趋势
          </h1>
          <p style={{ color: 'var(--fde-text-light)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            基于 2025 年 12 月至 2026 年 6 月（半年）X/Twitter 社区讨论和 GitHub Trending 数据，整理最受欢迎的 AI/Agent 开源项目。
          </p>
        </div>

        {/* Key Patterns */}
        <div style={{
          background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '3rem',
          border: '1px solid #8b5cf633',
        }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700, color: '#5b21b6' }}>
            🔍 关键模式
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {KEY_PATTERNS.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6', flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: '0.85rem', color: '#4c1d95', lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        {CATEGORIES.map((cat, i) => (
          <CategoryBlock key={i} cat={cat} />
        ))}

        {/* Footer */}
        <div style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: 'var(--fde-surface)',
          borderRadius: '8px',
          border: '1px solid var(--fde-border)',
          fontSize: '0.85rem',
          color: 'var(--fde-text-light)',
          textAlign: 'center',
        }}>
          数据来源于 X/Twitter 社区讨论和 GitHub Trending，覆盖 2025.12-2026.06 半年周期，持续更新中。
        </div>
      </div>
    </Layout>
  );
}
