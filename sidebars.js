// @ts-check
const sidebars = {
  tutorialSidebar: [
    // ===== L1: 基础层 =====
    {
      type: 'html',
      value: '<div class="sidebar-stage">L1 基础</div>',
    },
    {
      type: 'category',
      label: '入门：什么是 FDE',
      link: { type: 'doc', id: '01-ai-basics/index' },
      items: [
        '01-ai-basics/00-ai-history',
        '01-ai-basics/01-what-is-fde',
        '01-ai-basics/02-learning-path',
        '01-ai-basics/03-fde-types',
      ],
    },
    {
      type: 'category',
      label: '模型是怎么工作的',
      link: { type: 'doc', id: '02-model-architecture/transformer-overview' },
      items: [
        // 核心概念线
        '02-model-architecture/attention-mechanism',
        '02-model-architecture/kv-cache',
        '02-model-architecture/ffn-norm-pos',
        '02-model-architecture/decoding-strategies',
        // 高级架构线
        '02-model-architecture/moe-architecture',
        '02-model-architecture/mla-deep-dive',
        '02-model-architecture/multimodal-llm',
        '02-model-architecture/thinking-models',
        // 训练线
        '02-model-architecture/llm-training',
        '02-model-architecture/pre-post-training',
        '02-model-architecture/llm-finetuning',
        '02-model-architecture/scaling-law',
      ],
    },
    // ===== L2: 进阶层 =====
    {
      type: 'html',
      value: '<div class="sidebar-stage">L2 进阶</div>',
    },
    {
      type: 'category',
      label: 'GPU：理解推理的物理载体',
      link: { type: 'doc', id: '03-gpu-basics/gpu-overview' },
      items: [
        '03-gpu-basics/memory-model',
        '03-gpu-basics/performance-bottleneck',
        '03-gpu-basics/gpu-interconnect',
      ],
    },
    {
      type: 'category',
      label: '让推理变快：推理引擎与量化',
      link: { type: 'doc', id: '04-inference-optimization/engine-overview' },
      items: [
        '04-inference-optimization/vllm-deep-dive',
        '04-inference-optimization/trt-llm-deep-dive',
        '04-inference-optimization/sglang-deep-dive',
        '04-inference-optimization/quantization-basics',
        '04-inference-optimization/quantization-schemes',
        '04-inference-optimization/kv-cache-quant',
        // 前沿推理优化
        '09-evaluation-frontier/speculative-decoding',
        '09-evaluation-frontier/fp8-inference',
      ],
    },
    {
      type: 'category',
      label: '大模型怎么部署到多块 GPU 上',
      link: { type: 'doc', id: '05-distributed-inference/distributed-overview' },
      items: [
        '05-distributed-inference/tensor-parallel',
        '05-distributed-inference/pipeline-parallel',
        '05-distributed-inference/moe-parallel',
      ],
    },
    // ===== L3: 应用层 =====
    {
      type: 'html',
      value: '<div class="sidebar-stage">L3 应用</div>',
    },
    {
      type: 'category',
      label: '用 LLM 构建应用',
      link: { type: 'doc', id: '08-ai-engineering-tech-stack/index' },
      items: [
        '08-ai-engineering-tech-stack/prompt-engineering',
        '08-ai-engineering-tech-stack/rag-principles',
        '08-ai-engineering-tech-stack/agent-architecture',
        '08-ai-engineering-tech-stack/ai-evaluation',
      ],
    },
    {
      type: 'category',
      label: '生产环境部署架构',
      link: { type: 'doc', id: '06-production-deployment/deployment-architecture' },
      items: [
        '06-production-deployment/prefill-decode-separation',
        '06-production-deployment/autoscaling',
        '06-production-deployment/observability',
        '06-production-deployment/disaster-recovery',
        '06-production-deployment/multi-tenant',
      ],
    },
    // ===== L4: 实战层 =====
    {
      type: 'html',
      value: '<div class="sidebar-stage">L4 实战</div>',
    },
    {
      type: 'category',
      label: '成本与运营',
      link: { type: 'doc', id: '08-cost-operations/cost-breakdown' },
      items: [
        '08-cost-operations/optimization-strategies',
        '08-cost-operations/capacity-planning',
        '08-cost-operations/self-hosted-vs-cloud',
      ],
    },
    {
      type: 'category',
      label: '动手实验',
      link: { type: 'doc', id: '12-labs/index' },
      items: [
        '12-labs/vllm-7b-deploy',
        '12-labs/quantization-workflow',
        '12-labs/profiling-workshop',
        '12-labs/batching-tuning',
        '12-labs/tensor-parallel-lab',
        '12-labs/oom-troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'AI 驱动业务流程',
      link: { type: 'doc', id: '18-ai-business-workflows/index' },
      items: [
        '18-ai-business-workflows/workflow-orchestration',
        '18-ai-business-workflows/enterprise-integration',
        '18-ai-business-workflows/business-metrics',
      ],
    },
    {
      type: 'category',
      label: '合规与安全',
      link: { type: 'doc', id: '19-ai-compliance-security/index' },
      items: [
        '19-ai-compliance-security/data-privacy',
        '19-ai-compliance-security/audit-explainability',
        '19-ai-compliance-security/prompt-safety',
      ],
    },
    // ===== L5: 面试层 =====
    {
      type: 'html',
      value: '<div class="sidebar-stage">L5 面试</div>',
    },
    {
      type: 'category',
      label: '面试答题方法',
      link: { type: 'doc', id: '10-interview/interview-framework' },
      items: [
        '10-interview/self-intro',
        '10-interview/technical-answers',
        '10-interview/project-stories',
        '10-interview/behavioral',
        '10-interview/hr-round',
        '10-interview/checklist',
      ],
    },
    {
      type: 'category',
      label: '面试真题问答',
      link: { type: 'doc', id: '13-qna/index' },
      items: [],
    },
    {
      type: 'category',
      label: '变更管理与组织采纳',
      link: { type: 'doc', id: '20-ai-change-adoption/index' },
      items: [
        '20-ai-change-adoption/rollout-strategy',
        '20-ai-change-adoption/roi-measurement',
      ],
    },
    // ===== 附录 =====
    {
      type: 'html',
      value: '<div class="sidebar-stage">附录</div>',
    },
    {
      type: 'category',
      label: '团队管理与建设',
      link: { type: 'doc', id: '11-team-building/index' },
      items: [
        '11-team-building/team-culture',
        '11-team-building/growth-path',
        '11-team-building/training-mechanism',
        '11-team-building/knowledge-management',
        '11-team-building/hiring-strategy',
      ],
    },
    {
      type: 'category',
      label: '前沿技术参考',
      link: { type: 'doc', id: '09-evaluation-frontier/frontier-overview' },
      items: [
        '09-evaluation-frontier/frontier-eval-process',
      ],
    },
    {
      type: 'category',
      label: '术语与资源',
      link: { type: 'doc', id: '14-glossary/index' },
      items: [
        '15-resources/index',
        '16-case-studies/index',
      ],
    },
    {
      type: 'category',
      label: '开源项目深度解读',
      link: { type: 'doc', id: '17-open-source-deep-dive/index' },
      items: [],
    },
  ],
};

module.exports = sidebars;
