import React from 'react';
import Layout from '@theme/Layout';

export default function JobsPage() {
  return (
    <Layout title="FDE 招聘动态" description="FDE 岗位信息、薪资趋势、热门公司">
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h1>💼 FDE 招聘动态</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          实时跟踪 FDE 相关岗位招聘信息：热门公司、薪资范围、技能需求。
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
          <p>正在接入主流招聘平台数据源，敬请期待。</p>
        </div>
      </div>
    </Layout>
  );
}
