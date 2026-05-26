import React from 'react';
import Layout from '@theme/Layout';
import trendsData from '../../static/data/trends.json';

const impactColors = {
  S: '#ef4444',
  A: '#f59e0b',
  B: '#3b82f6',
  C: '#6b7280',
};

function TrendCard({trend}) {
  return (
    <div className={`trend-card${trend.impact_level === 'S' ? ' is-level-s' : ''}`}>
      <div className="trend-header-row">
        <span
          className="impact-badge"
          style={{backgroundColor: impactColors[trend.impact_level] || '#999'}}
        >
          {trend.impact_level}
        </span>
        <a href={trend.url} target="_blank" rel="noopener noreferrer" className="trend-title">
          {trend.title}
        </a>
      </div>
      <div className="trend-meta">
        <span className="trend-source">{trend.source}</span>
        <span className="trend-date-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {trend.date}
        </span>
      </div>
      <p className="trend-summary">{trend.summary}</p>
      {trend.fde_relevance && (
        <p className="trend-relevance">
          <strong>FDE 相关：</strong>{trend.fde_relevance}
        </p>
      )}
    </div>
  );
}

function TrendCategory({category}) {
  if (!category.trends || category.trends.length === 0) return null;
  return (
    <div className="trend-section">
      <h2 className="trend-category-title">
        {category.name}
        <span className="cat-count">{category.trends.length}</span>
      </h2>
      <div className="trend-grid">
        {category.trends.map((trend) => (
          <TrendCard key={trend.url} trend={trend} />
        ))}
      </div>
    </div>
  );
}

function HighlightItem({title, items, color}) {
  return (
    <div className="highlight-card" style={{borderLeft: `4px solid ${color}`}}>
      <h3>{title}</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function TrendsPage() {
  const total = trendsData.categories.reduce((sum, c) => sum + (c.trends ? c.trends.length : 0), 0);
  return (
    <Layout title="AI 行业趋势" description="AI 行业动态、论文发布、开源项目进展">
      <div className="trends-page">
        <div className="trends-header">
          <h1>AI 行业趋势</h1>
          <p className="trends-desc">
            跟踪 AI 领域的最新动态：模型发布、论文进展、开源项目、行业动态。
          </p>
          <div className="trends-stats">
            <span className="stat-item">
              共 <strong>{total}</strong> 条趋势
            </span>
            <span className="stat-item">
              更新于 <strong>{trendsData.last_updated}</strong>
            </span>
            <span className="stat-item">
              S 级 <strong>{
                trendsData.categories.reduce((s, c) => s + (c.trends ? c.trends.filter(t => t.impact_level === 'S').length : 0), 0)
              }</strong>
            </span>
          </div>
        </div>

        {trendsData.highlights && trendsData.highlights.length > 0 && (
          <div className="highlights-section">
            <h2>亮点速览</h2>
            <div className="highlights-grid">
              {trendsData.highlights.map((h, i) => (
                <HighlightItem
                  key={i}
                  title={h.title}
                  items={h.items}
                  color={i === 0 ? '#ef4444' : '#f59e0b'}
                />
              ))}
            </div>
          </div>
        )}

        <div className="trends-body">
          {trendsData.categories
            .filter((c) => c.trends && c.trends.length > 0)
            .map((category) => (
              <TrendCategory key={category.name} category={category} />
            ))}
        </div>
      </div>
    </Layout>
  );
}
