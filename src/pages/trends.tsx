import React from 'react';
import Layout from '@theme/Layout';

export default function TrendsPage() {
  return (
    <Layout title="AI 行业趋势" description="AI 行业动态、论文发布、开源项目进展">
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h1>🌐 AI 行业趋势</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          跟踪 AI 领域的最新动态：模型发布、论文进展、开源项目、行业趋势。
        </p>
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '3rem' }}>🚧</p>
          <h2>内容建设中</h2>
          <p>正在接入 GitHub Trending、arXiv、X/Twitter 等数据源，敬请期待。</p>
        </div>
      </div>
    </Layout>
  );
}
