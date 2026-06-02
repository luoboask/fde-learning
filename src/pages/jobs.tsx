import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface Job {
  title: string;
  company: string;
  location: string;
  url: string;
  source: string;
  tags: string[];
  salary?: string;
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
    by_level: { level: string; range: string }[];
    by_category: Record<string, string>;
  };
  hot_companies: string[];
  hot_skills: string[];
}

const CATEGORY_ICONS: Record<string, string> = {
  '大模型推理/部署': '⚡',
  '大模型应用/Agent': '',
  '大模型算法/架构': '🧠',
  'AI 平台/基础设施': '🔧',
  'AI 解决方案/架构': '📋',
  'AI 前沿部署工程师': '🚀',
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; tag: string }> = {
  '大模型推理/部署': { bg: '#fef3c7', text: '#92400e', tag: '#f59e0b' },
  '大模型应用/Agent': { bg: '#dbeafe', text: '#1e40af', tag: '#3b82f6' },
  '大模型算法/架构': { bg: '#ede9fe', text: '#5b21b6', tag: '#8b5cf6' },
  'AI 平台/基础设施': { bg: '#d1fae5', text: '#065f46', tag: '#10b981' },
  'AI 解决方案/架构': { bg: '#fce7f3', text: '#9d174d', tag: '#ec4899' },
  'AI 前沿部署工程师': { bg: '#e0e7ff', text: '#3730a3', tag: '#6366f1' },
};

const ALL_CATEGORIES = '全部';

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
          <div style={{ marginTop: '0.375rem', fontSize: '0.85rem', color: 'var(--fde-text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span>{job.company}</span>
            {job.location && (
              <span style={{ color: 'var(--fde-text-light)', opacity: 0.7 }}>·</span>
            )}
            {job.location && (
              <span style={{ color: 'var(--ifm-color-primary-light)', fontSize: '0.8rem' }}>
                {job.location}
              </span>
            )}
            {job.salary && (
              <>
                <span style={{ color: 'var(--fde-text-light)', opacity: 0.7 }}>·</span>
                <span style={{ color: '#059669', fontWeight: 600, fontSize: '0.8rem' }}>
                  {job.salary}
                </span>
              </>
            )}
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

function CategorySection({ category }: { category: Category }) {
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

function FilterBar({
  allTags,
  selectedTag,
  onTagSelect,
  activeCategory,
  onCategorySelect,
  selectedSource,
  onSourceSelect,
  allSources,
  searchKeyword,
  onSearchChange,
}: {
  allTags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  activeCategory: string;
  onCategorySelect: (cat: string) => void;
  selectedSource: string;
  onSourceSelect: (src: string) => void;
  allSources: string[];
  searchKeyword: string;
  onSearchChange: (kw: string) => void;
}) {
  const categoryNames = ['大模型推理/部署', '大模型应用/Agent', '大模型算法/架构', 'AI 平台/基础设施', 'AI 解决方案/架构', 'AI 前沿部署工程师'];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid var(--fde-border)',
      padding: '1.25rem',
      marginBottom: '2rem',
    }}>
      {/* Search bar */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="搜索职位、公司、标签..."
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.625rem 1rem',
            border: '1px solid var(--fde-border)',
            borderRadius: '8px',
            fontSize: '0.9rem',
            outline: 'none',
            boxSizing: 'border-box',
            background: 'var(--fde-surface)',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--ifm-color-primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--fde-border)'}
        />
      </div>

      {/* Category tabs */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[ALL_CATEGORIES, ...categoryNames].map((cat) => {
          const isActive = cat === activeCategory;
          const colors = isActive
            ? { bg: 'var(--ifm-color-primary)', text: '#fff' }
            : { bg: 'var(--fde-surface)', text: 'var(--fde-text-light)' };
          return (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                border: 'none',
                background: colors.bg,
                color: colors.text,
                fontSize: '0.8rem',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {isActive && CATEGORY_ICONS[cat] ? `${CATEGORY_ICONS[cat]} ` : ''}{cat}
            </button>
          );
        })}
      </div>

      {/* Source filter */}
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--fde-text-light)', fontWeight: 600 }}>来源：</span>
        <button
          onClick={() => onSourceSelect('')}
          style={{
            padding: '0.2rem 0.6rem',
            borderRadius: '6px',
            border: `1px solid ${selectedSource === '' ? 'var(--ifm-color-primary)' : 'var(--fde-border)'}`,
            background: selectedSource === '' ? 'rgba(100,108,255,0.08)' : 'transparent',
            color: selectedSource === '' ? 'var(--ifm-color-primary)' : 'var(--fde-text-light)',
            fontSize: '0.75rem',
            fontWeight: selectedSource === '' ? 600 : 400,
            cursor: 'pointer',
          }}
        >
          全部
        </button>
        {allSources.map((src) => (
          <button
            key={src}
            onClick={() => onSourceSelect(src === selectedSource ? '' : src)}
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
              border: `1px solid ${src === selectedSource ? 'var(--ifm-color-primary)' : 'var(--fde-border)'}`,
              background: src === selectedSource ? 'rgba(100,108,255,0.08)' : 'transparent',
              color: src === selectedSource ? 'var(--ifm-color-primary)' : 'var(--fde-text-light)',
              fontSize: '0.75rem',
              fontWeight: src === selectedSource ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {src}
          </button>
        ))}
      </div>

      {/* Tag filter */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--fde-text-light)', fontWeight: 600, marginTop: '0.2rem', flexShrink: 0 }}>技能：</span>
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag === selectedTag ? '' : tag)}
              style={{
                padding: '0.15rem 0.55rem',
                borderRadius: '4px',
                border: `1px solid ${tag === selectedTag ? 'var(--ifm-color-primary)' : 'rgba(100,108,255,0.15)'}`,
                background: tag === selectedTag ? 'var(--ifm-color-primary)' : 'transparent',
                color: tag === selectedTag ? '#fff' : 'var(--ifm-color-primary)',
                fontSize: '0.7rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.1s',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters display */}
      {(selectedTag || selectedSource || searchKeyword || activeCategory !== ALL_CATEGORIES) && (
        <div style={{
          marginTop: '0.75rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--fde-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--fde-text-light)' }}>
            已选条件：
          </span>
          {activeCategory !== ALL_CATEGORIES && (
            <span style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              background: 'rgba(100,108,255,0.08)',
              borderRadius: '4px',
              color: 'var(--ifm-color-primary)',
              cursor: 'pointer',
            }}
            onClick={() => onCategorySelect(ALL_CATEGORIES)}
            >
              分类: {activeCategory} ✕
            </span>
          )}
          {selectedSource && (
            <span style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              background: 'rgba(100,108,255,0.08)',
              borderRadius: '4px',
              color: 'var(--ifm-color-primary)',
              cursor: 'pointer',
            }}
            onClick={() => onSourceSelect('')}
            >
              来源: {selectedSource}
            </span>
          )}
          {selectedTag && (
            <span style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              background: 'rgba(100,108,255,0.08)',
              borderRadius: '4px',
              color: 'var(--ifm-color-primary)',
              cursor: 'pointer',
            }}
            onClick={() => onTagSelect('')}
            >
              技能: {selectedTag} ✕
            </span>
          )}
          {searchKeyword && (
            <span style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              background: 'rgba(100,108,255,0.08)',
              borderRadius: '4px',
              color: 'var(--ifm-color-primary)',
              cursor: 'pointer',
            }}
            onClick={() => onSearchChange('')}
            >
              搜索: {searchKeyword}
            </span>
          )}
          <button
            onClick={() => {
              onCategorySelect(ALL_CATEGORIES);
              onSourceSelect('');
              onTagSelect('');
              onSearchChange('');
            }}
            style={{
              fontSize: '0.7rem',
              padding: '0.15rem 0.5rem',
              border: '1px solid var(--fde-border)',
              borderRadius: '4px',
              background: 'transparent',
              color: 'var(--fde-text-light)',
              cursor: 'pointer',
            }}
          >
            清除全部
          </button>
        </div>
      )}
    </div>
  );
}

function JobsContent({ jobsData }: { jobsData: JobsData }) {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || '/';

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Collect all unique tags and sources
  const { allTags, allSources } = useMemo(() => {
    const tagSet = new Set<string>();
    const sourceSet = new Set<string>();
    jobsData.categories.forEach((cat) => {
      cat.jobs.forEach((job) => {
        job.tags.forEach((t) => tagSet.add(t));
        sourceSet.add(job.source);
      });
    });
    return {
      allTags: Array.from(tagSet).sort(),
      allSources: Array.from(sourceSet).sort(),
    };
  }, [jobsData]);

  // Filter and group jobs
  const filteredCategories = useMemo(() => {
    return jobsData.categories
      .map((cat) => ({
        ...cat,
        jobs: cat.jobs.filter((job) => {
          // Category filter
          if (activeCategory !== ALL_CATEGORIES && cat.name !== activeCategory) return false;
          // Source filter
          if (selectedSource && job.source !== selectedSource) return false;
          // Tag filter
          if (selectedTag && !job.tags.includes(selectedTag)) return false;
          // Search keyword
          if (searchKeyword) {
            const kw = searchKeyword.toLowerCase();
            const inTitle = job.title.toLowerCase().includes(kw);
            const inCompany = job.company.toLowerCase().includes(kw);
            const inTags = job.tags.some((t) => t.toLowerCase().includes(kw));
            if (!inTitle && !inCompany && !inTags) return false;
          }
          return true;
        }),
      }))
      .filter((cat) => cat.jobs.length > 0);
  }, [activeCategory, selectedTag, selectedSource, searchKeyword, jobsData]);

  const totalFiltered = filteredCategories.reduce((sum, cat) => sum + cat.jobs.length, 0);

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '2rem', fontWeight: 800 }}>
          FDE 招聘动态
        </h1>
        <p style={{ color: 'var(--fde-text-light)', fontSize: '0.95rem', margin: 0 }}>
          共 {jobsData.total_jobs} 个岗位 · 更新于 {jobsData.last_updated}
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        allTags={allTags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        selectedSource={selectedSource}
        onSourceSelect={setSelectedSource}
        allSources={allSources}
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
      />

      {/* Hot Companies */}
      {jobsData.hot_companies.length > 0 && (
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid var(--fde-border)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700 }}>🔥 热门公司</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {jobsData.hot_companies.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.75rem',
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  borderRadius: '999px',
                  color: '#d97706',
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hot Skills */}
      {jobsData.hot_skills.length > 0 && (
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid var(--fde-border)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700 }}>🎯 热门技能</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {jobsData.hot_skills.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.75rem',
                  background: 'rgba(100,108,255,0.06)',
                  border: '1px solid rgba(100,108,255,0.15)',
                  borderRadius: '999px',
                  color: 'var(--ifm-color-primary)',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedTag(item === selectedTag ? '' : item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Salary */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid var(--fde-border)',
        padding: '1.5rem',
        marginBottom: '2.5rem',
      }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700 }}>💰 薪资参考范围</h3>
        {jobsData.salary_insights.by_level.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            {jobsData.salary_insights.by_level.map((r) => (
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
        )}
        <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', fontWeight: 600 }}>按类别</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {Object.entries(jobsData.salary_insights.by_category).map(([cat, range]) => (
            <div
              key={cat}
              style={{
                padding: '0.75rem 1rem',
                background: 'var(--fde-surface)',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--fde-text-light)' }}>{cat}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--fde-text)', marginTop: '0.25rem' }}>
                {range}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--fde-text-light)', marginTop: '0.75rem', marginBottom: 0 }}>
          {jobsData.salary_insights.note}
        </p>
      </div>

      {/* Filtered results count */}
      {totalFiltered !== jobsData.total_jobs && (
        <div style={{
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--fde-text-light)',
        }}>
          筛选结果：{totalFiltered} 个岗位
        </div>
      )}

      {/* Job Categories */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat) => (
          <CategorySection key={cat.name} category={cat} />
        ))
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: 'var(--fde-text-light)',
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</p>
          <p>没有找到匹配的岗位，请调整筛选条件</p>
        </div>
      )}

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
  );
}

export default function JobsPage(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || '/';
  const [jobsData, setJobsData] = useState<JobsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobsUrl = `${baseUrl}data/jobs.json`;
    fetch(jobsUrl)
      .then((res) => res.json())
      .then((data) => {
        setJobsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load jobs data:', err);
        setLoading(false);
      });
  }, [baseUrl]);

  return (
    <Layout title="FDE 招聘动态" description="FDE 岗位信息、薪资趋势、热门公司">
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '6rem 2rem',
          color: 'var(--fde-text-light)',
          fontSize: '1rem',
        }}>
          加载岗位数据中...
        </div>
      ) : jobsData ? (
        <JobsContent jobsData={jobsData} />
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '6rem 2rem',
          color: 'var(--fde-text-light)',
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</p>
          <p>加载岗位数据失败，请稍后重试</p>
        </div>
      )}
    </Layout>
  );
}
