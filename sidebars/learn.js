// @ts-check
// sidebars/learn.js — 系统学习（学习中心）侧边栏
const sidebars = {
  learnSidebar: [
    {
      type: 'html',
      value: '<div class="sidebar-stage">L1 基础</div>',
    },
    {
      type: 'category',
      label: '入门：什么是 FDE',
      link: { type: 'doc', id: '01-basics/index' },
      items: [
        '01-basics/00-ai-history',
        '01-basics/01-what-is-fde',
        '01-basics/02-learning-path',
        '01-basics/03-fde-types',
      ],
    },
    {
      type: 'category',
      label: '模型是怎么工作的',
      link: { type: 'doc', id: '02-model-architecture/index' },
      items: [
        '02-model-architecture/transformer-overview',
        '02-model-architecture/attention-mechanism',
        '02-model-architecture/kv-cache',
        '02-model-architecture/ffn-norm-pos',
        '02-model-architecture/decoding-strategies',
        '02-model-architecture/moe-architecture',
        '02-model-architecture/mla-deep-dive',
        '02-model-architecture/multimodal-llm',
        '02-model-architecture/thinking-models',
        '02-model-architecture/llm-training',
        '02-model-architecture/pre-post-training',
        '02-model-architecture/llm-finetuning',
        '02-model-architecture/scaling-law',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">L2 进阶</div>',
    },
    {
      type: 'category',
      label: 'GPU：理解推理的物理载体',
      link: { type: 'doc', id: '03-gpu-basics/index' },
      items: [
        '03-gpu-basics/memory-model',
        '03-gpu-basics/performance-bottleneck',
        '03-gpu-basics/gpu-interconnect',
      ],
    },
    {
      type: 'category',
      label: '让推理变快：推理引擎与量化',
      link: { type: 'doc', id: '04-inference-optimization/index' },
      items: [
        '04-inference-optimization/vllm-deep-dive',
        '04-inference-optimization/trt-llm-deep-dive',
        '04-inference-optimization/sglang-deep-dive',
        '04-inference-optimization/quantization-basics',
        '04-inference-optimization/quantization-schemes',
        '04-inference-optimization/kv-cache-quant',
        '04-inference-optimization/speculative-decoding',
        '04-inference-optimization/fp8-inference',
      ],
    },
    {
      type: 'category',
      label: '大模型怎么部署到多块 GPU 上',
      link: { type: 'doc', id: '05-distributed-inference/index' },
      items: [
        '05-distributed-inference/tensor-parallel',
        '05-distributed-inference/pipeline-parallel',
        '05-distributed-inference/moe-parallel',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">L3 应用</div>',
    },
    {
      type: 'category',
      label: '用 LLM 构建应用',
      link: { type: 'doc', id: '06-ai-engineering/index' },
      items: [
        '06-ai-engineering/prompt-engineering',
        '06-ai-engineering/rag-principles',
        '06-ai-engineering/agent-architecture',
        '06-ai-engineering/ai-evaluation',
      ],
    },
    {
      type: 'category',
      label: '生产环境部署架构',
      link: { type: 'doc', id: '07-production-deployment/index' },
      items: [
        '07-production-deployment/prefill-decode-separation',
        '07-production-deployment/autoscaling',
        '07-production-deployment/observability',
        '07-production-deployment/disaster-recovery',
        '07-production-deployment/multi-tenant',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">L4 实战</div>',
    },
    {
      type: 'category',
      label: '成本与运营',
      link: { type: 'doc', id: '08-cost-operations/index' },
      items: [
        '08-cost-operations/optimization-strategies',
        '08-cost-operations/capacity-planning',
        '08-cost-operations/self-hosted-vs-cloud',
      ],
    },
    {
      type: 'category',
      label: '动手实验',
      link: { type: 'doc', id: '09-labs/index' },
      items: [
        '09-labs/vllm-7b-deploy',
        '09-labs/quantization-workflow',
        '09-labs/profiling-workshop',
        '09-labs/batching-tuning',
        '09-labs/tensor-parallel-lab',
        '09-labs/oom-troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'AI 驱动业务流程',
      link: { type: 'doc', id: '10-business-workflows/index' },
      items: [
        '10-business-workflows/workflow-orchestration',
        '10-business-workflows/enterprise-integration',
        '10-business-workflows/business-metrics',
      ],
    },
    {
      type: 'category',
      label: '合规与安全',
      link: { type: 'doc', id: '11-compliance-security/index' },
      items: [
        '11-compliance-security/data-privacy',
        '11-compliance-security/audit-explainability',
        '11-compliance-security/prompt-safety',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">L5 面试</div>',
    },
    {
      type: 'category',
      label: '面试答题方法',
      link: { type: 'doc', id: '12-interview/interview-framework' },
      items: [
        '12-interview/self-intro',
        '12-interview/technical-answers',
        '12-interview/project-stories',
        '12-interview/behavioral',
        '12-interview/hr-round',
        '12-interview/checklist',
        '12-interview/index',
      ],
    },
    {
      type: 'category',
      label: '变更管理与组织采纳',
      link: { type: 'doc', id: '13-change-adoption/index' },
      items: [
        '13-change-adoption/rollout-strategy',
        '13-change-adoption/roi-measurement',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">附录</div>',
    },
    {
      type: 'category',
      label: '团队管理与建设',
      link: { type: 'doc', id: '14-team-building/index' },
      items: [
        '14-team-building/team-culture',
        '14-team-building/growth-path',
        '14-team-building/training-mechanism',
        '14-team-building/knowledge-management',
        '14-team-building/hiring-strategy',
      ],
    },
    {
      type: 'category',
      label: '前沿技术参考',
      link: { type: 'doc', id: '04-inference-optimization/frontier-overview' },
      items: [
        '04-inference-optimization/frontier-eval-process',
      ],
    },
    {
      type: 'category',
      label: '术语与资源',
      link: { type: 'doc', id: '15-resources/index' },
      items: [
        '15-resources/glossary',
        '15-resources/case-studies',
      ],
    },
  ],
};

module.exports = sidebars;
