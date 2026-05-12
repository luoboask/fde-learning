import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import './index.css';

const SKILL_LEVELS = [
  { level: 1, title: 'AI 基础认知', icon: '🧠', desc: '了解 FDE 岗位定位', color: '#10b981', to: '/01-ai-basics/01-what-is-fde', items: ['什么是 FDE', 'FDE 类型', '学习路径'] },
  { level: 2, title: '模型架构', icon: '🏗️', desc: 'Transformer 内部机制', color: '#3b82f6', to: '/02-model-architecture/transformer-overview', items: ['Attention', 'KV Cache', 'MoE', 'FFN'] },
  { level: 3, title: 'GPU 底层', icon: '🎮', desc: '硬件与显存模型', color: '#06b6d4', to: '/03-gpu-basics/gpu-overview', items: ['GPU 架构', '显存层级', '性能瓶颈', '互联'] },
  { level: 4, title: '推理优化', icon: '⚡', desc: '让模型跑得快、省资源', color: '#f59e0b', to: '/04-inference-optimization/vllm-deep-dive', items: ['vLLM', 'TRT-LLM', '量化', 'KV Cache 量化'] },
  { level: 5, title: '分布式推理', icon: '🔗', desc: '多卡/多机并行', color: '#ef4444', to: '/05-distributed-inference/distributed-overview', items: ['TP', 'PP', 'MoE 并行'] },
  { level: 6, title: '生产部署', icon: '🚀', desc: '从本地到线上服务', color: '#8b5cf6', to: '/06-production-deployment/deployment-architecture', items: ['K8s', '扩缩容', '可观测性', '容灾'] },
  { level: 7, title: 'Agent 架构', icon: '🤖', desc: '记忆、工具、规划', color: '#ec4899', to: '/07-agent-architecture', items: ['记忆系统', 'RAG', 'Function Calling'] },
  { level: 8, title: '成本运营', icon: '💰', desc: '省钱与资源规划', color: '#14b8a6', to: '/08-cost-operations/cost-breakdown', items: ['成本拆解', '优化策略', '容量规划'] },
  { level: 9, title: '前沿评估', icon: '🔭', desc: '新技术追踪与评估', color: '#6366f1', to: '/09-evaluation-frontier/frontier-overview', items: ['投机解码', 'FP8', '评估流程'] },
  { level: 10, title: '面试通关', icon: '📝', desc: '答题框架与话术', color: '#a855f7', to: '/10-interview/interview-framework', items: ['自我介绍', '技术答题', '项目故事', 'HR 面'] },
  { level: 11, title: '团队管理', icon: '👥', desc: '培养与建设', color: '#64748b', to: '/11-team-building/team-culture', items: ['团队文化', '成长路径', '招聘策略'] },
  { level: 12, title: '动手实验', icon: '🧪', desc: '7 个实操练习', color: '#10b981', to: '/12-labs', items: ['vLLM 部署', '量化', 'Profiling', 'OOM'] },
];

const FEATURES = [
  {
    icon: '📚',
    title: '63 篇技术文档',
    desc: '涵盖 15000+ 行深入讲解，从原理到实践',
  },
  {
    icon: '📊',
    title: '40+ 架构图',
    desc: 'Mermaid 图表直观展示，告别抽象概念',
  },
  {
    icon: '🎯',
    title: '面试答题框架',
    desc: '每章配套面试视角，满分回答模板',
  },
  {
    icon: '💻',
    title: '7 个动手实验',
    desc: 'vLLM 部署、量化、Profiling 等真实操作',
  },
  {
    icon: '🏛️',
    title: '开源项目解读',
    desc: 'nanoGPT、llm.c、llama.cpp、vLLM 源码分析',
  },
  {
    icon: '💼',
    title: '真实案例',
    desc: '70B 模型上线、GPU 利用率优化等实战经验',
  },
];

function SkillLevel({item, index}) {
  return (
    <Link to={item.to} className="skill-level-card" style={{'--level-color': item.color}}>
      <div className="skill-level-index">{item.level}</div>
      <div className="skill-level-icon">{item.icon}</div>
      <div className="skill-level-content">
        <h3 className="skill-level-title">{item.title}</h3>
        <p className="skill-level-desc">{item.desc}</p>
        <div className="skill-level-items">
          {item.items.map((it, i) => (
            <span key={i}>{it}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function FeatureCard({item, index}) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{item.icon}</div>
      <h3 className="feature-title">{item.title}</h3>
      <p className="feature-desc">{item.desc}</p>
    </div>
  );
}

function HomepageHeader() {
  return (
    <header className="fde-hero">
      <div className="fde-hero-content">
        <div className="fde-hero-badge">
          <span className="badge-dot" />
          FDE 学习中心 — 免费开源
        </div>
        <Heading as="h1" className="fde-hero-title">
          AI 前沿部署工程师<br />
          <span className="fde-hero-title-accent">系统学习路径</span>
        </Heading>
        <p className="fde-hero-desc">
          由浅入深，从模型原理到推理优化，从生产部署到面试通关。17 个阶段，63 篇文档，15000+ 字深度讲解。
        </p>
        <div className="fde-hero-actions">
          <Link className="fde-btn fde-btn--primary fde-btn--lg" to="/01-ai-basics/01-what-is-fde">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            开始学习
          </Link>
          <Link className="fde-btn fde-btn--ghost fde-btn--lg" to="/10-interview/interview-framework">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            面试准备
          </Link>
        </div>
        <div className="fde-hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">17</span>
            <span className="hero-stat-label">学习阶段</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">63</span>
            <span className="hero-stat-label">技术文档</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">15K+</span>
            <span className="hero-stat-label">行深度内容</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">40+</span>
            <span className="hero-stat-label">架构图</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeaturesSection() {
  return (
    <section className="fde-section fde-features">
      <div className="fde-container">
        <h2 className="fde-section-title">为什么选择这里？</h2>
        <p className="fde-section-desc">
          专为 FDE（AI 前沿部署工程师）岗位设计的系统学习路径，覆盖从原理到生产的全链路
        </p>
        <div className="fde-features-grid">
          {FEATURES.map((item, i) => (
            <FeatureCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillTreeSection() {
  return (
    <section className="fde-section fde-skill-tree">
      <div className="fde-container">
        <h2 className="fde-section-title">技能树</h2>
        <p className="fde-section-desc">
          17 个阶段，循序渐进。从零基础到生产实战。
        </p>
        <div className="fde-skill-grid">
          {SKILL_LEVELS.map((item, i) => (
            <SkillLevel key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="FDE 学习中心" description="AI 前沿部署工程师系统学习路径">
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <SkillTreeSection />
      </main>
    </Layout>
  );
}
