import React, { useState } from 'react';
import Layout from '@theme/Layout';

interface Product {
  name: string;
  tagline: string;
  description: string;
  category: string;
  url: string;
  stars?: string;
  pricing?: string;
  highlight?: string;
  launchDate: string;
}

interface CategoryGroup {
  icon: string;
  title: string;
  color: string;
  bg: string;
  products: Product[];
}

const CATEGORIES: CategoryGroup[] = [
  {
    icon: '💻',
    title: 'AI 编程与开发工具',
    color: '#8b5cf6',
    bg: '#ede9fe',
    products: [
      {
        name: 'Cursor',
        tagline: 'AI 原生代码编辑器',
        description: '基于 VS Code Fork 的 AI 编程编辑器，支持多文件编辑、终端命令生成、代码库感知。2025 年底突破 1000 万用户，2026 年持续迭代 Agent 模式。',
        category: '编程工具',
        url: 'https://cursor.com',
        stars: '',
        pricing: '免费 / $20/月 Pro',
        highlight: 'AI 编程标杆',
        launchDate: '2023 起步，2026 成熟',
      },
      {
        name: 'Windsurf (Codeium)',
        tagline: 'AI 编程 IDE 中的 Cursor 最强竞争者',
        description: '2026 年推出"多 Agent 协作"模式，多个 AI Agent 可以同时处理不同文件，自动协调冲突。Flow 模式支持多步骤复杂任务自动执行。',
        category: '编程工具',
        url: 'https://codeium.com/windsurf',
        pricing: '免费 / $15/月',
        highlight: '多 Agent 协作',
        launchDate: '2026 Q1 重大更新',
      },
      {
        name: 'Bolt.new',
        tagline: '浏览器内从零构建全栈应用',
        description: '在浏览器中通过自然语言描述直接生成并运行全栈 Web 应用。2026 年增加数据库集成、API 调用、部署一键发布，成为"非程序员的第一选择"。',
        category: '编程工具',
        url: 'https://bolt.new',
        pricing: '免费 / 付费额度',
        highlight: '零代码构建全栈',
        launchDate: '2025 发布，2026 进化',
      },
      {
        name: 'Lovable',
        tagline: '从想法到产品的 AI 全栈开发平台',
        description: '类似于 Bolt.new，但更专注于产品化——自动生成前端+后端+数据库+部署。2026 年用户量暴涨，成为独立开发者的首选工具。',
        category: '编程工具',
        url: 'https://lovable.dev',
        pricing: '免费 / $25/月',
        highlight: '独立开发者首选',
        launchDate: '2026 爆发',
      },
      {
        name: 'Replit Agent',
        tagline: '一句话生成并部署应用',
        description: 'Replit 的 AI Agent 可以从自然语言描述出发，自动规划、编码、调试、部署完整应用。内置数据库、认证、支付等模板。',
        category: '编程工具',
        url: 'https://replit.com',
        pricing: '免费 / Core $25/月',
        launchDate: '2025 发布，2026 成熟',
      },
    ],
  },
  {
    icon: '🤖',
    title: 'AI Agent 平台与应用',
    color: '#3b82f6',
    bg: '#dbeafe',
    products: [
      {
        name: 'Dify',
        tagline: '开源 AI 应用开发平台',
        description: '生产级 Agentic AI 开发平台，支持可视化编排、RAG、Agent 编排、MCP 协议。50K+ GitHub Stars，国内团队开源，社区活跃。',
        category: 'Agent 平台',
        url: 'https://dify.ai',
        stars: '50K+',
        pricing: '开源免费 / 企业版',
        highlight: '国内开源明星',
        launchDate: '2024 开源，2026 成熟',
      },
      {
        name: 'Flowise',
        tagline: '可视化拖拽构建 AI Agent 工作流',
        description: '拖拽式 AI Agent 构建工具，支持 Chatflow/Agentflow/RAG/人在回路/100+ LLM 集成/可嵌入 Widget。23,300+ forks，社区贡献极其活跃。',
        category: 'Agent 平台',
        url: 'https://flowiseai.com',
        stars: '50.9K',
        pricing: '开源免费',
        highlight: '可视化编排之王',
        launchDate: '2023 开源，2026 爆发',
      },
      {
        name: 'n8n',
        tagline: '工作流自动化 + AI Agent 引擎',
        description: '开源工作流自动化工具，2026 年全面拥抱 AI——内置 AI Agent 节点、LangChain 集成、AI 辅助工作流生成。从"IFTTT 替代品"进化为"AI 自动化平台"。',
        category: 'Agent 平台',
        url: 'https://n8n.io',
        stars: '50K+',
        pricing: '自部署免费 / 云版付费',
        highlight: 'AI 自动化平台',
        launchDate: '2019 起步，2026 AI 化',
      },
      {
        name: 'Coze (扣子)',
        tagline: '字节跳动 AI Bot 开发平台',
        description: '零代码构建 AI Bot，支持插件、工作流、知识库、定时任务。国内版和国际版并行，2026 年增加 Agent 编排和多智能体协作能力。',
        category: 'Agent 平台',
        url: 'https://coze.com',
        pricing: '免费',
        highlight: '国内零代码 Agent',
        launchDate: '2024 发布，2026 进化',
      },
    ],
  },
  {
    icon: '🎨',
    title: 'AI 内容与创意工具',
    color: '#ec4899',
    bg: '#fce7f3',
    products: [
      {
        name: 'Midjourney v7',
        tagline: 'AI 图像生成领域的天花板',
        description: '2026 年发布的 v7 版本在细节、一致性、风格控制上达到新高度。新增视频生成能力（从图片生成短视频），成为设计师和内容创作者的标配。',
        category: '创意工具',
        url: 'https://midjourney.com',
        pricing: '$10-60/月',
        highlight: '图像生成天花板',
        launchDate: '2026 发布 v7',
      },
      {
        name: 'Sora / Kling / Vidu',
        tagline: 'AI 视频生成三巨头',
        description: 'OpenAI Sora、快手 Kling、生数 Vidu 三足鼎立。2026 年视频质量达到 1080p、60 秒以上，可控制角色动作一致性。国内 Kling 和 Vidu 在中文场景领先。',
        category: '创意工具',
        url: 'https://klingai.com',
        pricing: '免费额度 + 付费',
        highlight: '视频生成爆发年',
        launchDate: '2026 商用爆发',
      },
      {
        name: 'Suno / Udio',
        tagline: 'AI 音乐生成',
        description: '输入文字描述即可生成完整歌曲（含人声、编曲、混音）。Suno v4 和 Udio 2026 年均达到"普通人听不出区别"的水准。国内 Suno 已被广泛使用。',
        category: '创意工具',
        url: 'https://suno.com',
        pricing: '免费额度 + $10/月',
        launchDate: '2026 成熟',
      },
      {
        name: 'HeyGen / D-ID',
        tagline: 'AI 数字人视频生成',
        description: '上传照片+文字即可生成"真人"讲解视频。2026 年唇形同步、表情自然度大幅提升，企业培训和营销视频大量采用。',
        category: '创意工具',
        url: 'https://heygen.com',
        pricing: '$24/月起',
        highlight: '数字人视频',
        launchDate: '2026 爆发',
      },
    ],
  },
  {
    icon: '📊',
    title: 'AI 生产力与办公',
    color: '#10b981',
    bg: '#d1fae5',
    products: [
      {
        name: 'Notion AI',
        tagline: 'AI 赋能知识管理与协作',
        description: 'Notion 内置 AI 能力：自动总结、翻译、生成、表格分析。2026 年增加 AI Agent 自动执行工作流（定期报告、数据整理、任务分配）。',
        category: '生产力',
        url: 'https://notion.so',
        pricing: '$10/用户/月',
        launchDate: '2023 集成，2026 Agent 化',
      },
      {
        name: 'Perplexity AI',
        tagline: 'AI 搜索与研究的下一代入口',
        description: '不同于传统搜索，Perplexity 直接给出整合答案并附带来源引用。2026 年发布"Search as Code"——模型直接生成 Python 代码调用搜索原语，支持复杂研究流程。',
        category: '生产力',
        url: 'https://perplexity.ai',
        pricing: '免费 / $20/月 Pro',
        highlight: 'Search as Code',
        launchDate: '2022 起步，2026 爆发',
      },
      {
        name: 'Mem.ai',
        tagline: 'AI 驱动的个人信息管理系统',
        description: '自动整理笔记、邮件、会议记录，AI 主动关联相关信息并提醒。2026 年增加"AI 助手"——可以主动建议你"该回复这封邮件了"或"这个会议要准备的材料"。',
        category: '生产力',
        url: 'https://get.mem.ai',
        pricing: '免费 / $10/月',
        launchDate: '2026 重大更新',
      },
      {
        name: 'Tome',
        tagline: 'AI 一键生成演示文稿',
        description: '输入主题或文档链接，AI 自动生成精美的 PPT/Slides，支持多种模板。2026 年增加实时数据图表生成、品牌模板、团队协作编辑。',
        category: '生产力',
        url: 'https://tome.app',
        pricing: '免费 / $8/月',
        launchDate: '2026 成熟',
      },
    ],
  },
  {
    icon: '🏥',
    title: '行业垂直 AI 应用',
    color: '#f59e0b',
    bg: '#fef3c7',
    products: [
      {
        name: 'Claude for Legal',
        tagline: 'Anthropic 官方法律 AI 套件',
        description: 'Anthropic 官方开源的法律 AI 工具包：80+ AI Agent、12 个实践领域插件、20 个 MCP 连接器。合同审查、法律研究、合规检查——生产级工作流，不是聊天机器人。',
        category: '垂直应用',
        url: 'https://github.com/anthropics/claude-for-legal',
        stars: '25K',
        highlight: 'Anthropic 官方',
        launchDate: '2026 发布',
      },
      {
        name: 'Harvey AI',
        tagline: 'AI 法律助手，服务顶级律所',
        description: '服务于 Allen & Overy、Akin Gump 等顶级律所的 AI 法律平台。2026 年完成 5000 万美元融资，支持合同分析、法律研究、尽职调查、合规审查。',
        category: '垂直应用',
        url: 'https://harvey.ai',
        pricing: '企业定价',
        highlight: '顶级律所采用',
        launchDate: '2026 规模化',
      },
      {
        name: 'Consensus / Elicit',
        tagline: 'AI 学术研究助手',
        description: '从 2 亿+ 学术论文中搜索、总结、提取洞见。Consensus 侧重证据搜索结果，Elicit 侧重系统综述自动化。2026 年成为研究生和研究机构的标配工具。',
        category: '垂直应用',
        url: 'https://consensus.app',
        pricing: '免费 / $15/月',
        launchDate: '2026 普及',
      },
      {
        name: 'Tess AI / Pictory',
        tagline: 'AI 教育内容生成与个性化学习',
        description: '根据教学目标自动生成课件、测验、练习题。2026 年增加"自适应学习路径"——AI 根据学生表现动态调整难度和内容。',
        category: '垂直应用',
        url: 'https://tessai.com',
        launchDate: '2026 增长',
      },
    ],
  },
  {
    icon: '✨',
    title: '有意思的小众/独立 AI 产品',
    color: '#a855f7',
    bg: '#f3e8ff',
    products: [
      {
        name: 'Cowork',
        tagline: '把 Claude 变成你的数字同事',
        description: '2026 年 1 月 Product Hunt #1 产品。不是聊天机器人，而是像一个坐在你旁边的同事——可以分配任务、跟踪进度、自动完成工作。',
        category: '独立产品',
        url: 'https://producthunt.com',
        highlight: 'PH #1',
        launchDate: '2026-01',
      },
      {
        name: 'Kilo Code Reviewer',
        tagline: 'PR 打开那一刻 AI 自动 code review',
        description: '不需要手动触发，GitHub PR 一开就自动做代码审查，给出安全性、性能、架构层面的反馈。PH 2026 年 #2 产品，后来开源为 Kilo CodeOSS。',
        category: '独立产品',
        url: 'https://github.com',
        highlight: '自动化 Review',
        launchDate: '2026-01',
      },
      {
        name: 'Clipto',
        tagline: '本地化自然语言搜你的所有媒体文件',
        description: '完全本地运行，支持 TB 级图片/视频/文档的自然语言搜索。不用上传到云端，隐私友好。PH 2026 年 5 月 31 日 #1。',
        category: '独立产品',
        url: 'https://producthunt.com',
        highlight: '完全本地',
        launchDate: '2026-05',
      },
      {
        name: 'PostSyncer',
        tagline: 'AI 社交媒体内容制作与发布',
        description: '2026 年 PH 年度 #1（789 upvotes）。一个 AI Agent 帮你写文案、做图、定时发布、分析数据。一个人就是一支内容团队。',
        category: '独立产品',
        url: 'https://producthunt.com',
        highlight: 'PH 年度 #1',
        launchDate: '2026',
      },
      {
        name: 'Figr AI',
        tagline: 'AI 产品设计 Agent，"先思考再动手"',
        description: '不同于简单的 AI 设计工具，Figr 的 Agent 会先理解需求、分析竞品、产出设计方案，然后直接生成可交互原型。2026 年 4 月 PH 热门。',
        category: '独立产品',
        url: 'https://producthunt.com',
        highlight: 'AI 先思考再设计',
        launchDate: '2026-04',
      },
      {
        name: 'Macaron AI',
        tagline: '记住你一切的 AI 私人伴侣',
        description: '个人 AI companion，记住你的偏好、经历、情绪，主动关心你。不是聊天机器人，而是一个"记得你"的 AI。',
        category: '独立产品',
        url: 'https://producthunt.com',
        highlight: '有记忆的 AI',
        launchDate: '2026',
      },
      {
        name: 'Elser AI',
        tagline: '用 AI 把创意变成完整的动画故事',
        description: '输入一个想法，AI 生成完整的动画故事视频，角色保持一致性。不需要任何动画技能，一个人就是一个动画工作室。',
        category: '独立产品',
        url: 'https://producthunt.com',
        highlight: '角色一致性动画',
        launchDate: '2026',
      },
      {
        name: 'Voicenotes',
        tagline: '语音笔记 + AI 对话，你的声音知识库',
        description: '用语音记录想法，AI 自动转写、总结、打标签。之后可以跟你的笔记"对话"——"上周开会时我说了什么关于定价的？"',
        category: '独立产品',
        url: 'https://producthunt.com',
        highlight: '声音知识库',
        launchDate: '2026',
      },
      {
        name: 'Supamail AI',
        tagline: '每天 30 秒 AI 邮件摘要',
        description: '自动总结你过去 24 小时的邮件为一份简报。不用一封一封看，AI 告诉你"今天有 3 封重要邮件：A 需要你回复、B 只是通知、C 需要你审批"。',
        category: '独立产品',
        url: 'https://producthunt.com',
        highlight: '30 秒邮件摘要',
        launchDate: '2026',
      },
      {
        name: 'Byterover',
        tagline: '给编程 AI Agent 装上自改进记忆层',
        description: 'Cursor/Windsurf/Codex 等编程工具的记忆层插件。跨会话记住你的代码风格、项目上下文、曾经犯的错。让 AI 不再"健忘"。',
        category: '独立产品',
        url: 'https://github.com',
        highlight: 'Agent 记忆',
        launchDate: '2026',
      },
      {
        name: 'Agent 37',
        tagline: '$3.99/月的个人 OpenClaw 实例',
        description: 'Indie Hacker Marc Lou 打造的低成本 AI Agent 托管方案。一天收入近 $5K，Hacker News 655 分最高 AI 故事。独立开发者的 AI Agent 入门方案。',
        category: '独立产品',
        url: 'https://github.com',
        highlight: '$3.99/月',
        launchDate: '2026-02',
      },
      {
        name: 'Docket',
        tagline: '给独立开发者和 AI Agent 用的 Jira',
        description: '不像 Jira 那么重，不像 Trello 那么轻。专为"一个人+AI Agent"团队设计的工作管理工具，发布/创意/启动全流程管理。',
        category: '独立产品',
        url: 'https://producthunt.com',
        highlight: '独立开发者专用',
        launchDate: '2026',
      },
    ],
  },
  {
    icon: '🌐',
    title: '国内新兴 AI 应用',
    color: '#ef4444',
    bg: '#fee2e2',
    products: [
      {
        name: 'Kimi (月之暗面)',
        tagline: '长上下文 AI 助手',
        description: '支持 200 万字上下文的国产 AI 助手，擅长长文档分析、论文阅读、代码审查。2026 年推出"Kimi 探索版"——支持深度研究和多步推理。',
        category: '国内应用',
        url: 'https://kimi.moonshot.cn',
        pricing: '免费',
        highlight: '国产长上下文',
        launchDate: '2026 探索版',
      },
      {
        name: '通义千问 / 腾讯元宝',
        tagline: '大厂 AI 助手矩阵',
        description: '阿里通义千问和腾讯元宝 2026 年均完成重大升级，深度搜索、代码生成、多模态能力追平 GPT-4 级别。接入各自生态（钉钉、微信）。',
        category: '国内应用',
        url: 'https://tongyi.aliyun.com',
        pricing: '免费',
        launchDate: '2026 重大升级',
      },
      {
        name: '智谱清言 / 文心一言',
        tagline: '国产大模型应用代表',
        description: '智谱清言（GLM 系列）和百度文心一言 2026 年在中文理解、本地化服务、企业集成方面持续迭代。智谱在代码能力上进步显著。',
        category: '国内应用',
        url: 'https://chatglm.cn',
        pricing: '免费',
        launchDate: '2026 持续迭代',
      },
      {
        name: '微信 AI Agent（内测）',
        tagline: '微信生态中的 AI 智能体',
        description: '腾讯在微信小范围测试 AI Agent，预计将接入微信支付、小程序、公众号生态。一旦开放，将成为国内最大的 AI 应用入口。',
        category: '国内应用',
        pricing: '尚未开放',
        highlight: '潜在最大入口',
        launchDate: '2026 内测中',
      },
    ],
  },
];

const KEY_TRENDS = [
  '从 Copilot 到 AI Employee：AI 不再是辅助工具，而是能独立完成任务的"员工"',
  '可视化编排平台（Dify/Flowise/n8n）正在降低 AI 应用开发门槛',
  '垂直行业 AI 应用正式爆发——法律、研究、教育、医疗各显神通',
  '国内 AI 应用生态加速追赶——Kimi、通义、微信 Agent 各有杀手级场景',
  'AI 视频/音乐/图像生成进入"普通人无法分辨"阶段，内容生产方式被重塑',
];

function ProductCard({ product, color }: { product: Product; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={product.url}
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--ifm-color-primary)' }}>
          {product.name}
        </h3>
        {product.highlight && (
          <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: '4px', background: `${color}18`, color, flexShrink: 0 }}>
            {product.highlight}
          </span>
        )}
      </div>
      <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: 'var(--ifm-color-primary)', fontWeight: 500 }}>
        {product.tagline}
      </p>
      <p style={{ margin: '0.5rem 0 0.75rem', fontSize: '0.85rem', color: 'var(--fde-text-light)', lineHeight: 1.6 }}>
        {product.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', flexWrap: 'wrap' }}>
        {product.pricing && (
          <span style={{ color: '#10b981', fontWeight: 600 }}>{product.pricing}</span>
        )}
        {product.stars && (
          <span style={{ color: '#f59e0b', fontWeight: 600 }}>⭐ {product.stars}</span>
        )}
        <span style={{ color: 'var(--fde-text-light)' }}>{product.launchDate}</span>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
        {cat.products.map((product, i) => (
          <ProductCard key={i} product={product} color={cat.color} />
        ))}
      </div>
    </section>
  );
}

export default function AIApplicationsPage(): React.ReactElement {
  const totalProducts = CATEGORIES.reduce((s, c) => s + c.products.length, 0);

  return (
    <Layout title="AI 应用趋势" description="2026 年新兴 AI 应用与产品全景">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#d1fae5', color: '#10b981', borderRadius: '999px', fontWeight: 600 }}>
              AI 产品
            </span>
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#dbeafe', color: '#3b82f6', borderRadius: '999px', fontWeight: 600 }}>
              新兴应用
            </span>
          </div>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: '2rem', fontWeight: 800 }}>
            AI 应用趋势
          </h1>
          <p style={{ color: 'var(--fde-text-light)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            2026 年涌现的新兴 AI 应用与产品，从大厂到独立开发者，{totalProducts} 个值得关注的 AI 产品。
          </p>
        </div>

        {/* Key Trends */}
        <div style={{
          background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '3rem',
          border: '1px solid #8b5cf633',
        }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700, color: '#5b21b6' }}>
            🔍 2026 年 AI 应用 5 大趋势
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {KEY_TRENDS.map((p, i) => (
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
          数据来源于 Product Hunt、X/Twitter、Indie Hackers 等公开渠道，持续更新中。涵盖编程工具、Agent 平台、创意工具、生产力、小众独立产品、行业垂直应用等方向。
        </div>
      </div>
    </Layout>
  );
}
