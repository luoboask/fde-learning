import React from 'react';
import Layout from '@theme/Layout';

interface SectionItem {
  title: string;
  source: string;
  summary: string;
  date: string;
  url?: string;
  likes?: number;
}

interface Section {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
  items: SectionItem[];
}

const SECTIONS: Section[] = [
  {
    icon: '⚡',
    title: 'Vibe Coding → Agentic Engineering',
    subtitle: '开发范式从"生成代码"转向"交付系统"',
    color: '#8b5cf6',
    bg: '#ede9fe',
    items: [
      {
        title: 'Vibe coding got everyone shipping, agentic engineering decides who\'s still shipping in 12 months',
        source: 'Anton Abyzov',
        summary: '差距在于 agent 是否有 memory、skills 和 spec，而不仅仅是 vibes。',
        date: '2026-05-20',
        url: 'https://x.com/aabyzov/status/2057249655520408034',
      },
      {
        title: '模型能力差距已缩小到个位数百分比',
        source: 'Jay.TL',
        summary: 'Qwen3.7-Max 在 Terminal-Bench 2.0 上排第一（69.7），超过 Codex 的 DeepSeek V4-Pro（67.9）和 Claude Opus 4.6（65.4）。竞争不在 benchmark，在生态——工作流锁定 > 模型优势。',
        date: '2026-06-02',
      },
      {
        title: 'Anthropic 把最强能力定向灌入 Claude Code',
        source: 'Jay.TL',
        summary: 'Opus 4.8 在 Claude Code 里表现极强，但在网页端体验糟糕。这不是 bug——工作流锁定正在发生。GPT-5.6 传闻本周发布，OpenAI 从 5.5 到 5.6 只用了 40 天。',
        date: '2026-06-02',
      },
      {
        title: '2026 最牛逼的 AI 编程 stack',
        source: '老白',
        summary: 'Codex 负责 vibe coding，Claude Code + Opus 4.8 啃复杂任务，Hermes Agent 调度，本地模型处理简单活，Linear 统一管理所有 Agent 任务。',
        date: '2026-06-01',
        likes: 15,
      },
    ],
  },
  {
    icon: '🏗️',
    title: 'NVIDIA GTC Taipei 2026: Agent 架构定义',
    subtitle: '黄仁勋系统阐述 AI Agent 的新计算范式',
    color: '#10b981',
    bg: '#d1fae5',
    items: [
      {
        title: '大语言模型负责思考、推理和规划；外部编排引擎（Harness）如同操作系统',
        source: '思维怪怪',
        summary: '将模型与电子表格、浏览器、数据库等工具连接，管理工作记忆与长期记忆。全新计算模式：向 AI 描述意图，AI 生成代码、调用工具、产出结果。',
        date: '2026-06-01',
      },
      {
        title: 'CUDA X 库全面面向 Agent 开放',
        source: 'GTC Taipei 2026',
        summary: '黄仁勋现场展示多个 Agent 实例，用自然语言生成完整应用代码，甚至照片 → Agent 调用 CAD 工具生成 3D 打印替换零件。"我们这里用的是 Claude Code，但 Codex 同样表现出色"。',
        date: '2026-06-01',
      },
      {
        title: 'AI Agent PC: 下一代办公入口',
        source: '大鹏',
        summary: 'NVIDIA RTX Spark 将 CPU、GPU 和 128GB 统一内存集成到单芯片，1 petaflop 本地 AI 性能。未来 3 年 AI PC 先卷企业员工生产力，而非消费者炫技。',
        date: '2026-06-02',
      },
    ],
  },
  {
    icon: '🔗',
    title: 'MCP 协议: Agent-Tool 连接标准',
    subtitle: '有 MCP Server 的软件公司才重要',
    color: '#3b82f6',
    bg: '#dbeafe',
    items: [
      {
        title: 'There are 2 types of software companies: ones with an MCP server, and ones that don\'t matter',
        source: 'Tom Alder',
        summary: 'MCP（Model Context Protocol）让 AI 工具直接插入你使用的应用。Kajabi 刚发布 MCP：一句话建着陆页、起草邮件序列、设置订单页——全部在对话中完成。',
        date: '2026-05-28',
        likes: 39,
        url: 'https://x.com/tomaldertweets/status/2059967599841103944',
      },
      {
        title: 'Perplexity 发布 Search as Code',
        source: '大鹏',
        summary: '不再让模型一轮一轮 function call 搜索工具，而是让模型直接生成 Python 代码调用 search primitives，在 sandbox 里一次性编排复杂搜索流程。已上线 Perplexity Agent API。',
        date: '2026-06-02',
      },
      {
        title: 'Nous Research 集成 NVIDIA Agent Skills 到 Hermes Skills Hub',
        source: 'k19646',
        summary: 'Agent 可利用 CUDA-X、Omniverse 和 Physical AI 工作流。',
        date: '2026-06-02',
      },
    ],
  },
  {
    icon: '🛡️',
    title: 'Agent 工程最佳实践',
    subtitle: '从"偶尔能用"到"生产可用"',
    color: '#f59e0b',
    bg: '#fef3c7',
    items: [
      {
        title: '模型只提议行动，Harness 负责验证、授权、执行、日志和返回观察',
        source: 'Zev ai',
        summary: 'Agents Best Practices 仓库（1.2k+ stars）定义了 Harness Engineering 的核心哲学。聚焦运行时严谨性，而非仅依赖 prompt。包含 Agentic Loop、窄工具权限、规划模式、上下文管理等实战资源。',
        date: '2026-06-01',
      },
      {
        title: 'Garbage in, catastrophic failure out',
        source: 'Tarun Mathur',
        summary: '企业级数据合同要求：来源追溯（不可变记录）、质量门控（自动检查）、数据主权（严格遵守驻留义务）。如果无法追溯决策，就无法扩展 Agent。',
        date: '2026-06-02',
      },
      {
        title: '理解验证工作流：Claude Code 核心开发者分享',
        source: 'meng shao',
        summary: '增量教学：每步让用户复述 → 按缺口补课 → 小范围验证 → 过关才前进。问题/方案/语境三维度清单。对抗"智能体黑箱"，把 tacit knowledge 外显化。',
        date: '2026-06-02',
        likes: 6,
      },
    ],
  },
  {
    icon: '📈',
    title: 'AI 应用落地行业动态',
    subtitle: '腾讯微信 Agent 内测、港股 A 股动态',
    color: '#ef4444',
    bg: '#fee2e2',
    items: [
      {
        title: '腾讯计划在小范围用户中测试微信 AI Agent',
        source: 'Techmeme / Financial Times',
        summary: '腾讯在国内 AI 模型竞争中落后，正在加速追赶，微信 Agent 测试后分阶段推广。',
        date: '2026-06-02',
      },
      {
        title: '6月1日 A 股/H 股：AI 应用/SaaS 修复，半导体退潮',
        source: 'StephenRyn',
        summary: '最强方向：金蝶国际 +19.39%、金山软件 +10.69%、商汤 +6.02%。最弱方向：MiniMax -15.71%、智谱 -8.09%。资金从硬件退潮切到软件和 SaaS。',
        date: '2026-06-01',
      },
      {
        title: '微软内部因 Claude Code 太贵而砍掉使用',
        source: 'Jay.TL',
        summary: 'token 计费的脆弱性首次在 3 万亿美元公司暴露。推动免费模型路由层和本地模型处理简单任务的方案。',
        date: '2026-06-02',
      },
    ],
  },
  {
    icon: '📦',
    title: '值得关注的开源项目',
    subtitle: 'AI 编程工具生态',
    color: '#06b6d4',
    bg: '#cffafe',
    items: [
      {
        title: 'Everything Claude Code — 163K+ stars',
        source: 'smrati tiwari',
        summary: 'Anthropic hackathon 冠军开源：183 个 Agent Skills、48 个子 Agent、79 个即用命令。支持 Claude Code、Codex、Cursor、Gemini、OpenCode。',
        date: '2026-06-01',
      },
      {
        title: 'codegraph — 36K stars（一周增长 13,925）',
        source: 'Isra',
        summary: '预索引知识图谱，自动为每个 Agent 提供 symbol search 和上下文，减少 47% token 浪费。支持 Claude Code、Cursor、Hermes、Gemini、Codex 等。',
        date: '2026-06-01',
        likes: 39,
      },
      {
        title: 'ktx — 跨会话自改进上下文层',
        source: 'Bryan',
        summary: '追踪模式跨会话、适配代码库，为 Claude Code 和 Codex 设计。解决 AI 编程 Agent 跨会话上下文丢失的痛点。',
        date: '2026-06-01',
      },
    ],
  },
];

const KEY_JUDGMENTS = [
  'Vibe Coding → Agentic Engineering：行业从"快速出代码"转向"构建可交付系统"，记忆、技能、规范是核心差异',
  'Harness Engineering 是生产部署的关键：模型只提议，Harness 负责验证、执行、日志',
  'MCP 是 Agent-Tool 连接标准：没有 MCP Server 的软件公司将被淘汰',
  '工作流锁定 > 模型优势：Claude Code 赌的是开发者路径依赖，不是模型领先 2%',
  'AI Agent PC 是下一代入口：本地 Agent 常驻后，PC 变成"工作流操作系统"',
];

function ItemCard({ item, color }: { item: SectionItem; color: string }) {
  return (
    <div
      style={{
        padding: '1.25rem',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid var(--fde-border)',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 2px 12px ${color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--fde-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--fde-text)', lineHeight: 1.5 }}>
        {item.title}
      </h4>
      <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--fde-text-light)', lineHeight: 1.6 }}>
        {item.summary}
      </p>
      <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.75rem', color: color, fontWeight: 600 }}>{item.source}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--fde-text-light)' }}>{item.date}</span>
        {item.likes && (
          <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>❤ {item.likes}</span>
        )}
      </div>
    </div>
  );
}

function TrendSection({ section }: { section: Section }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{section.icon}</span>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: section.color }}>
            {section.title}
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--fde-text-light)', paddingLeft: '2.5rem' }}>
          {section.subtitle}
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
        {section.items.map((item, i) => (
          <ItemCard key={i} item={item} color={section.color} />
        ))}
      </div>
    </section>
  );
}

export default function AIApplicationsPage(): React.ReactElement {
  return (
    <Layout title="AI 应用趋势" description="来自 X/Twitter 的 AI 应用一线观察">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#ede9fe', color: '#8b5cf6', borderRadius: '999px', fontWeight: 600 }}>X/Twitter</span>
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#dbeafe', color: '#3b82f6', borderRadius: '999px', fontWeight: 600 }}>实时采集</span>
          </div>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: '2rem', fontWeight: 800 }}>
            AI 应用趋势
          </h1>
          <p style={{ color: 'var(--fde-text-light)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            基于 2026 年 5-6 月 X（Twitter）实时采集的行业讨论，涵盖 AI Agent、Coding Agent、MCP 协议、Vibe Coding 到 Agentic Engineering 的演进。
          </p>
        </div>

        {/* Key Judgments */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '3rem',
          border: '1px solid #f59e0b33',
        }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700, color: '#92400e' }}>
            💡 2026 年 AI 应用的 5 个关键判断
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {KEY_JUDGMENTS.map((j, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#d97706', flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: '0.85rem', color: '#78350f', lineHeight: 1.5 }}>{j}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <TrendSection key={i} section={section} />
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
          数据来源于 X/Twitter 实时采集，持续更新中。
        </div>
      </div>
    </Layout>
  );
}
