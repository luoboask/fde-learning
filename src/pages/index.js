import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import './index.css';

const LEARNING_TIERS = [
  {
    emoji: '🟢',
    tier: '入门篇',
    subtitle: '基础认知',
    description: '了解 FDE 是什么、三种类型、成长路径',
    items: ['什么是 FDE', 'FDE 的三种类型', '学习路线图', '能力五维模型'],
    to: '/docs/01-basics/01-what-is-fde',
    color: '#10b981',
  },
  {
    emoji: '🔵',
    tier: '进阶篇',
    subtitle: '核心技术',
    description: 'Transformer、推理引擎、量化、GPU、分布式',
    items: ['Transformer 基础', 'vLLM 深度解析', '模型量化方案', 'GPU 显存模型', '分布式推理'],
    to: '/docs/02-transformer-basics/transformer-overview',
    color: '#3b82f6',
  },
  {
    emoji: '🟠',
    tier: '实战篇',
    subtitle: '生产部署',
    description: 'K8s 部署、弹性扩缩容、成本优化、前沿跟踪',
    items: ['部署架构设计', '可观测性体系', '成本优化策略', 'Speculative Decoding'],
    to: '/docs/07-deployment/deployment-architecture',
    color: '#f59e0b',
  },
  {
    emoji: '🔴',
    tier: '面试篇',
    subtitle: '答题框架',
    description: '结构化答题框架、话术模板、行为面试准备',
    items: ['自我介绍模板', '技术答题框架', '项目故事 STAR', 'HR 面策略'],
    to: '/docs/10-interview/interview-framework',
    color: '#ef4444',
  },
  {
    emoji: '🟣',
    tier: '管理篇',
    subtitle: '团队建设',
    description: 'FDE 培养体系、招聘策略、知识管理',
    items: ['三级成长路径', '技术轮转机制', '知识库建设', '招聘策略'],
    to: '/docs/11-team-building/index',
    color: '#8b5cf6',
  },
];

function TierCard({tier, index}) {
  return (
    <div className="tier-card" style={{borderTopColor: tier.color}}>
      <div className="tier-header">
        <span className="tier-emoji">{tier.emoji}</span>
        <div>
          <h3 className="tier-title">{tier.tier} — {tier.subtitle}</h3>
          <p className="tier-desc">{tier.description}</p>
        </div>
      </div>
      <ul className="tier-items">
        {tier.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link className="tier-link" to={tier.to} style={{color: tier.color}}>
        开始学习 →
      </Link>
    </div>
  );
}

function HomepageHeader() {
  return (
    <header className="homepage-header">
      <div className="header-content">
        <Heading as="h1" className="header-title">
          FDE 学习中心
        </Heading>
        <p className="header-subtitle">
          AI 前沿部署工程师 — 从入门到面试的系统学习路径
        </p>
        <p className="header-desc">
          由浅入深，从技术原理到生产实践，从面试答题到团队建设
        </p>
        <div className="header-buttons">
          <Link className="button button--primary button--lg" to="/docs/01-basics/01-what-is-fde">
            🚀 从零开始学习
          </Link>
          <Link className="button button--outline button--lg" to="/docs/10-interview/interview-framework">
            📝 直接进入面试准备
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout title="FDE 学习中心" description="AI 前沿部署工程师系统学习路径">
      <HomepageHeader />
      <main className="homepage-main">
        <div className="tiers-container">
          <h2>学习路径</h2>
          <p className="tiers-intro">五个阶段，循序渐进。每阶段包含原理讲解、实战练习和面试答题框架。</p>
          <div className="tiers-grid">
            {LEARNING_TIERS.map((tier, i) => (
              <TierCard key={i} tier={tier} index={i} />
            ))}
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">5</span>
            <span className="stat-label">学习阶段</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">40+</span>
            <span className="stat-label">知识模块</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">30+</span>
            <span className="stat-label">面试答题框架</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">免费开源</span>
          </div>
        </div>
      </main>
    </Layout>
  );
}
