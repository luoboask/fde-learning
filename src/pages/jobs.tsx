import React from 'react';
import Layout from '@theme/Layout';

interface Job {
  title: string;
  company: string;
  url: string;
  source: string;
  tags: string[];
}

interface Category {
  name: string;
  jobs: Job[];
}

interface JobsData {
  last_updated: string;
  total_jobs: number;
  categories: Category[];
  salary_insights: {
    note: string;
    estimated_ranges: { level: string; range: string }[];
  };
  hot_companies: string[];
  hot_skills: string[];
}

const CATEGORY_ICONS: Record<string, string> = {
  '大模型推理/部署': '⚡',
  '大模型应用/Agent': '🤖',
  '大模型算法/架构': '🧠',
  'AI 平台/基础设施': '🔧',
  'AI 解决方案/架构': '📋',
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; tag: string }> = {
  '大模型推理/部署': { bg: '#fef3c7', text: '#92400e', tag: '#f59e0b' },
  '大模型应用/Agent': { bg: '#dbeafe', text: '#1e40af', tag: '#3b82f6' },
  '大模型算法/架构': { bg: '#ede9fe', text: '#5b21b6', tag: '#8b5cf6' },
  'AI 平台/基础设施': { bg: '#d1fae5', text: '#065f46', tag: '#10b981' },
  'AI 解决方案/架构': { bg: '#fce7f3', text: '#9d174d', tag: '#ec4899' },
};

function JobCard({ job }: { job: Job }) {
  return (
    <a
      href={job.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        padding: '1rem 1.25rem',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid var(--fde-border)',
        textDecoration: 'none',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(100,108,255,0.1)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--fde-border)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--fde-text)' }}>
            {job.title}
          </h4>
          <div style={{ marginTop: '0.375rem', fontSize: '0.85rem', color: 'var(--fde-text-light)' }}>
            {job.company}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.125rem 0.5rem',
            background: 'var(--fde-surface)',
            borderRadius: '4px',
            color: 'var(--fde-text-light)',
          }}>
            {job.source}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--ifm-color-primary)' }}>→</span>
        </div>
      </div>
      {job.tags.length > 0 && (
        <div style={{ marginTop: '0.625rem', display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {job.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.45rem',
                background: 'rgba(100,108,255,0.06)',
                borderRadius: '4px',
                color: 'var(--ifm-color-primary)',
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}

function CategorySection({ category, index }: { category: Category; index: number }) {
  const colors = CATEGORY_COLORS[category.name] || { bg: '#f3f4f6', text: '#374151', tag: '#6b7280' };
  const icon = CATEGORY_ICONS[category.name] || '📄';

  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: colors.text }}>
          {category.name}
        </h2>
        <span style={{
          fontSize: '0.75rem',
          padding: '0.125rem 0.5rem',
          background: colors.bg,
          borderRadius: '999px',
          color: colors.text,
          fontWeight: 600,
        }}>
          {category.jobs.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {category.jobs.map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
      </div>
    </section>
  );
}

function SalaryTable({ ranges, note }: { ranges: { level: string; range: string }[]; note: string }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid var(--fde-border)',
      padding: '1.5rem',
      marginBottom: '2.5rem',
    }}>
      <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700 }}>💰 薪资参考范围</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {ranges.map((r) => (
          <div
            key={r.level}
            style={{
              padding: '1rem',
              background: 'var(--fde-surface)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--fde-text-light)', marginBottom: '0.375rem' }}>
              {r.level}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--fde-text)' }}>
              {r.range}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--fde-text-light)', marginTop: '0.75rem', marginBottom: 0 }}>
        {note}
      </p>
    </div>
  );
}

function TagCloud({ items, title, color }: { items: string[]; title: string; color: string }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid var(--fde-border)',
      padding: '1.5rem',
      marginBottom: '2.5rem',
    }}>
      <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700 }}>{title}</h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {items.map((item) => (
          <span
            key={item}
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 0.75rem',
              background: `${color}10`,
              border: `1px solid ${color}25`,
              borderRadius: '999px',
              color: color,
              fontWeight: 500,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function JobsPage(): React.ReactElement {
  // In Docusaurus, we can use useDocusaurusContext or fetch from static data
  // For simplicity, we'll use require to load the JSON at build time
  const jobsData = require('../../static/data/jobs.json') as JobsData;

  return (
    <Layout title="FDE 招聘动态" description="FDE 岗位信息、薪资趋势、热门公司">
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: '2rem', fontWeight: 800 }}>
            FDE 招聘动态
          </h1>
          <p style={{ color: 'var(--fde-text-light)', fontSize: '0.95rem', margin: 0 }}>
            共 {jobsData.total_jobs} 个岗位 · 更新于 {jobsData.last_updated}
          </p>
        </div>

        {/* Hot Companies */}
        <TagCloud
          items={jobsData.hot_companies}
          title="🔥 热门公司"
          color="var(--fde-amber)"
        />

        {/* Hot Skills */}
        <TagCloud
          items={jobsData.hot_skills}
          title="🎯 热门技能"
          color="var(--fde-accent)"
        />

        {/* Salary */}
        <SalaryTable
          ranges={jobsData.salary_insights.estimated_ranges}
          note={jobsData.salary_insights.note}
        />

        {/* Job Categories */}
        {jobsData.categories.map((cat, i) => (
          <CategorySection key={i} category={cat} index={i} />
        ))}

        {/* Footer note */}
        <div style={{
          marginTop: '3rem',
          padding: '1.25rem',
          background: 'var(--fde-surface)',
          borderRadius: '8px',
          border: '1px solid var(--fde-border)',
          fontSize: '0.85rem',
          color: 'var(--fde-text-light)',
          textAlign: 'center',
        }}>
          数据来源于公开渠道，持续更新中。欢迎补充岗位信息。
        </div>
      </div>
    </Layout>
  );
}
