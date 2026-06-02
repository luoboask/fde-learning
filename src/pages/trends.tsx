import React, {useState} from 'react';
import Layout from '@theme/Layout';
import trendsData from '../../static/data/trends.json';

const impactConfig = {
  S: { color: '#ef4444', label: 'S 级突破', desc: '可能改变行业格局的里程碑' },
  A: { color: '#f59e0b', label: 'A 级重要', desc: '对 FDE 工作有直接影响' },
  B: { color: '#3b82f6', label: 'B 级关注', desc: '值得持续追踪的进展' },
  C: { color: '#6b7280', label: 'C 级参考', desc: '理论或长期影响' },
};

const categoryMeta: Record<string, { icon: string; desc: string }> = {
  '模型发布': { icon: '🚀', desc: '新模型与版本更新' },
  '研究论文': { icon: '📑', desc: '前沿学术研究' },
  '开源项目': { icon: '💻', desc: '开源工具与框架进展' },
  '行业动态': { icon: '📈', desc: '投融资、政策、市场格局' },
  '推理部署': { icon: '⚡', desc: '推理引擎、硬件、部署方案' },
  'Agent 应用': { icon: '🤖', desc: 'Agent 框架、协议、产品化' },
};

function ImpactDot({ level }: { level: string }) {
  const cfg = impactConfig[level as keyof typeof impactConfig] || impactConfig.C;
  return (
    <span
      style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: cfg.color,
        flexShrink: 0,
      }}
      title={cfg.label}
    />
  );
}

function TrendCard({ trend }: { trend: { title: string; summary: string; source: string; date: string; impact_level: string; url?: string; fde_relevance?: string } }) {
  const [hovered, setHovered] = useState(false);
  const cfg = impactConfig[trend.impact_level as keyof typeof impactConfig] || impactConfig.C;

  return (
    <a
      href={trend.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: '1.25rem',
        background: hovered ? `${cfg.color}08` : '#fff',
        borderRadius: '10px',
        border: `1px solid ${hovered ? `${cfg.color}40` : 'var(--fde-border)'}`,
        textDecoration: 'none',
        transition: 'all 0.15s ease',
        boxShadow: hovered ? `0 4px 16px ${cfg.color}12` : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.625rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 1 }}>
          <ImpactDot level={trend.impact_level} />
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--fde-text)', lineHeight: 1.4 }}>
            {trend.title}
          </h3>
        </div>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '0.15rem 0.5rem',
            borderRadius: '4px',
            background: `${cfg.color}15`,
            color: cfg.color,
            flexShrink: 0,
          }}
        >
          {trend.impact_level}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--fde-text-light)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
        {trend.summary}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--ifm-color-primary)', fontWeight: 600 }}>{trend.source}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--fde-text-light)' }}>{trend.date}</span>
        </div>
      </div>
      {trend.fde_relevance && (
        <div style={{ marginTop: '0.75rem', padding: '0.625rem 0.75rem', background: 'var(--fde-surface)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--fde-text-light)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--ifm-color-primary)' }}>FDE 相关性：</strong>{trend.fde_relevance}
        </div>
      )}
    </a>
  );
}

function CategoryBlock({ category }: { category: { name: string; trends: Array<{ title: string; summary: string; source: string; date: string; impact_level: string; url?: string; fde_relevance?: string }> } }) {
  const meta = categoryMeta[category.name] || { icon: '📋', desc: '' };
  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '1.3rem' }}>{meta.icon}</span>
          <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--fde-text)' }}>{category.name}</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--fde-text-light)' }}>{category.trends.length} 条</span>
        </div>
        {meta.desc && <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--fde-text-light)', paddingLeft: '2rem' }}>{meta.desc}</p>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '0.75rem' }}>
        {category.trends.map((t) => (
          <TrendCard key={t.title} trend={t} />
        ))}
      </div>
    </section>
  );
}

export default function TrendsPage(): React.ReactElement {
  const total = trendsData.categories.reduce((s, c) => s + (c.trends?.length || 0), 0);
  const sCount = trendsData.categories.reduce((s, c) => s + (c.trends?.filter((t) => t.impact_level === 'S').length || 0), 0);
  const aCount = trendsData.categories.reduce((s, c) => s + (c.trends?.filter((t) => t.impact_level === 'A').length || 0), 0);

  const allSTrends: Array<{ title: string; summary: string; source: string; date: string; impact_level: string; url?: string; fde_relevance?: string }> = [];
  trendsData.categories.forEach((c) => c.trends?.forEach((t) => { if (t.impact_level === 'S') allSTrends.push(t); }));

  return (
    <Layout title="AI 行业趋势" description="AI 行业动态、论文发布、开源项目进展">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#fee2e2', color: '#ef4444', borderRadius: '999px', fontWeight: 600 }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', marginRight: '4px', animation: 'pulse 2s infinite' }} />
              实时追踪
            </span>
          </div>
          <h1 style={{ margin: '0 0 0.5rem', fontSize: '2rem', fontWeight: 800 }}>
            行业趋势
          </h1>
          <p style={{ color: 'var(--fde-text-light)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
            跟踪 2025.12-2026.06（半年）AI 领域的最新动态：模型发布、论文进展、开源项目、行业动态。
          </p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem' }}><strong>{total}</strong> 条趋势</span>
            <span style={{ fontSize: '0.85rem', color: '#ef4444' }}><strong>{sCount}</strong> S 级突破</span>
            <span style={{ fontSize: '0.85rem', color: '#f59e0b' }}><strong>{aCount}</strong> A 级重要</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--fde-text-light)' }}>半年数据</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--fde-text-light)' }}>更新于 {trendsData.last_updated}</span>
          </div>
        </div>

        {/* S Level */}
        {allSTrends.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#dc2626' }}>S 级重大突破</h2>
              </div>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--fde-text-light)', paddingLeft: '1.5rem' }}>可能改变行业格局的里程碑事件</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
              {allSTrends.map((t) => (
                <div
                  key={t.title}
                  style={{
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, #fef2f2, #fff)',
                    borderRadius: '10px',
                    border: '1px solid #fca5a566',
                  }}
                >
                  <ImpactDot level="S" />
                  <h3 style={{ margin: '0.5rem 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--fde-text)' }}>{t.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--fde-text-light)', lineHeight: 1.6 }}>{t.summary}</p>
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600 }}>{t.source}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--fde-text-light)' }}>{t.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Highlights */}
        {trendsData.highlights?.map((h, i) => (
          <section key={i} style={{
            marginBottom: '1.5rem',
            padding: '1.25rem 1.5rem',
            background: i === 0 ? 'linear-gradient(135deg, #fef2f2, #fff)' : 'linear-gradient(135deg, #fefce8, #fff)',
            borderRadius: '10px',
            border: `1px solid ${i === 0 ? '#fca5a555' : '#fde04755'}`,
          }}>
            <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 700, color: i === 0 ? '#dc2626' : '#d97706' }}>
              {h.title}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
              {h.items.map((item, j) => (
                <div key={j} style={{ fontSize: '0.85rem', color: 'var(--fde-text)', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: i === 0 ? '#ef4444' : '#f59e0b', fontWeight: 600, flexShrink: 0 }}>•</span>
                  {item}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Category Tracking */}
        {trendsData.categories
          .filter((c) => c.trends && c.trends.length > 0)
          .map((cat) => (
            <CategoryBlock key={cat.name} category={cat} />
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
          数据来源于公开渠道，持续更新中。S/A/B/C 按对 FDE 工作的影响程度分级。
        </div>
      </div>
    </Layout>
  );
}
