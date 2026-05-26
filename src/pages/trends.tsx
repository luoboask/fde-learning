import React, {useState} from 'react';
import Layout from '@theme/Layout';
import trendsData from '../../static/data/trends.json';

const impactColors = {
  S: '#ef4444',
  A: '#f59e0b',
  B: '#3b82f6',
  C: '#6b7280',
};

const categoryIcons = {
  '模型发布': '\u{1f680}',
  '研究论文': '\u{1f4d1}',
  '开源项目': '\u{1f4bb}',
  '行业动态': '\u{1f4c8}',
  '推理部署': '\u{26a1}',
  'Agent 应用': '\u{1f916}',
};

function ImpactBadge({level, size = 'sm'}) {
  const color = impactColors[level] || '#999';
  return (
    <span
      className={`impact-badge impact-badge--${size}`}
      style={{backgroundColor: color}}
    >
      {level}
    </span>
  );
}

function FeaturedCard({trend}) {
  return (
    <a
      href={trend.url}
      target="_blank"
      rel="noopener noreferrer"
      className="featured-card"
      style={{
        background: `linear-gradient(135deg, ${impactColors[trend.impact_level]}22, ${impactColors[trend.impact_level]}08)`,
        borderColor: `${impactColors[trend.impact_level]}44`,
      }}
    >
      <div className="featured-card-header">
        <ImpactBadge level={trend.impact_level} size="lg" />
        <span className="featured-category">{trend.category}</span>
        <span className="featured-date">{trend.date}</span>
      </div>
      <h3 className="featured-title">{trend.title}</h3>
      <p className="featured-summary">{trend.summary}</p>
      <div className="featured-source">
        <span className="source-badge">{trend.source}</span>
      </div>
    </a>
  );
}

function TrendListItem({trend}) {
  return (
    <a
      href={trend.url}
      target="_blank"
      rel="noopener noreferrer"
      className="trend-list-item"
    >
      <div className="trend-list-left">
        <ImpactBadge level={trend.impact_level} />
        <div className="trend-list-content">
          <h4 className="trend-list-title">{trend.title}</h4>
          <p className="trend-list-summary">{trend.summary}</p>
        </div>
      </div>
      <div className="trend-list-right">
        <span className="trend-list-source">{trend.source}</span>
        <span className="trend-list-date">{trend.date}</span>
      </div>
    </a>
  );
}

function CategorySection({category}) {
  if (!category.trends || category.trends.length === 0) return null;
  const icon = categoryIcons[category.name] || '\u{1f4cb}';
  return (
    <div className="trend-category-section">
      <div className="trend-category-header">
        <span className="trend-category-icon">{icon}</span>
        <h2 className="trend-category-name">{category.name}</h2>
        <span className="trend-category-count">{category.trends.length}</span>
      </div>
      <div className="trend-list">
        {category.trends.map((trend) => (
          <TrendListItem key={trend.url} trend={trend} />
        ))}
      </div>
    </div>
  );
}

export default function TrendsPage() {
  const total = trendsData.categories.reduce(
    (sum, c) => sum + (c.trends ? c.trends.length : 0),
    0,
  );
  const sCount = trendsData.categories.reduce(
    (s, c) => s + (c.trends ? c.trends.filter((t) => t.impact_level === 'S').length : 0),
    0,
  );
  const aCount = trendsData.categories.reduce(
    (s, c) => s + (c.trends ? c.trends.filter((t) => t.impact_level === 'A').length : 0),
    0,
  );

  const sLevel = [];
  trendsData.categories.forEach((c) => {
    c.trends.forEach((t) => {
      if (t.impact_level === 'S') sLevel.push(t);
    });
  });

  return (
    <Layout title="AI 行业趋势" description="AI 行业动态、论文发布、开源项目进展">
      <div className="trends-page-v2">
        {/* Hero Banner */}
        <div className="trends-hero">
          <div className="trends-hero-content">
            <div className="trends-hero-badge">
              <span className="pulse-dot" />
              实时追踪
            </div>
            <h1 className="trends-hero-title">
              AI 行业趋势
            </h1>
            <p className="trends-hero-desc">
              跟踪 AI 领域的最新动态：模型发布、论文进展、开源项目、行业动态
            </p>
            <div className="trends-hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">{total}</span>
                <span className="hero-stat-label">条趋势</span>
              </div>
              <div className="hero-stat hero-stat--s">
                <span className="hero-stat-num">{sCount}</span>
                <span className="hero-stat-label">S 级突破</span>
              </div>
              <div className="hero-stat hero-stat--a">
                <span className="hero-stat-num">{aCount}</span>
                <span className="hero-stat-label">A 级进展</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">{trendsData.last_updated}</span>
                <span className="hero-stat-label">最后更新</span>
              </div>
            </div>
          </div>
          <div className="trends-hero-bg" />
        </div>

        {/* S-Level Featured */}
        {sLevel.length > 0 && (
          <section className="trends-section">
            <div className="trends-section-header">
              <h2 className="trends-section-title">
                <span className="section-dot section-dot--s" />
                S 级重大突破
              </h2>
              <p className="trends-section-subtitle">
                可能改变行业格局的里程碑事件
              </p>
            </div>
            <div className="featured-grid">
              {sLevel.map((trend) => (
                <FeaturedCard key={trend.url} trend={trend} />
              ))}
            </div>
          </section>
        )}

        {/* Highlights */}
        {trendsData.highlights && trendsData.highlights.length > 0 && (
          <section className="trends-section">
            <div className="trends-section-header">
              <h2 className="trends-section-title">
                <span className="section-dot section-dot--a" />
                趋势速览
              </h2>
            </div>
            <div className="highlights-v2-grid">
              {trendsData.highlights.map((h, i) => (
                <div
                  key={i}
                  className="highlight-v2-card"
                  style={{
                    borderLeft: `3px solid ${i === 0 ? '#ef4444' : '#f59e0b'}`,
                  }}
                >
                  <h3 className="highlight-v2-title">{h.title}</h3>
                  <ul className="highlight-v2-list">
                    {h.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="trends-section">
          <div className="trends-section-header">
            <h2 className="trends-section-title">
              <span className="section-dot section-dot--b" />
              分类追踪
            </h2>
            <p className="trends-section-subtitle">
              按领域分类的所有趋势，含 FDE 相关性说明
            </p>
          </div>
          <div className="categories-v2-list">
            {trendsData.categories
              .filter((c) => c.trends && c.trends.length > 0)
              .map((category) => (
                <CategorySection key={category.name} category={category} />
              ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
