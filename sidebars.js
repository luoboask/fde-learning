// @ts-check
const sidebars = {
  tutorialSidebar: [
    {
      type: 'html',
      value: '<div class="sidebar-stage">入门</div>',
    },
    {
      type: 'category',
      label: 'AI 基础认知',
      items: [
        '01-ai-basics/index',
        '01-ai-basics/00-ai-history',
        '01-ai-basics/01-what-is-fde',
        '01-ai-basics/02-learning-path',
        '01-ai-basics/03-fde-types',
      ],
    },
    {
      type: 'category',
      label: '模型架构',
      items: [
        '02-model-architecture/transformer-overview',
        '02-model-architecture/llm-training',
        '02-model-architecture/pre-post-training',
        '02-model-architecture/scaling-law',
        '02-model-architecture/attention-mechanism',
        '02-model-architecture/kv-cache',
        '02-model-architecture/ffn-norm-pos',
        '02-model-architecture/moe-architecture',
        '02-model-architecture/multimodal-llm',
        '02-model-architecture/llm-finetuning',
        '02-model-architecture/thinking-models',
        '02-model-architecture/decoding-strategies',
        '02-model-architecture/mla-deep-dive',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">进阶</div>',
    },
    {
      type: 'category',
      label: 'GPU 基础',
      items: [
        '03-gpu-basics/gpu-overview',
        '03-gpu-basics/memory-model',
        '03-gpu-basics/performance-bottleneck',
        '03-gpu-basics/gpu-interconnect',
      ],
    },
    {
      type: 'category',
      label: '推理优化技术',
      items: [
        '04-inference-optimization/engine-overview',
        '04-inference-optimization/vllm-deep-dive',
        '04-inference-optimization/trt-llm-deep-dive',
        '04-inference-optimization/sglang-deep-dive',
        '04-inference-optimization/quantization-basics',
        '04-inference-optimization/quantization-schemes',
        '04-inference-optimization/kv-cache-quant',
      ],
    },
    {
      type: 'category',
      label: '分布式推理',
      items: [
        '05-distributed-inference/distributed-overview',
        '05-distributed-inference/tensor-parallel',
        '05-distributed-inference/pipeline-parallel',
        '05-distributed-inference/moe-parallel',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">实战</div>',
    },
    {
      type: 'category',
      label: '生产部署架构',
      items: [
        '06-production-deployment/deployment-architecture',
        '06-production-deployment/prefill-decode-separation',
        '06-production-deployment/autoscaling',
        '06-production-deployment/observability',
        '06-production-deployment/disaster-recovery',
        '06-production-deployment/multi-tenant',
      ],
    },
    {
      type: 'category',
      label: '动手实验',
      items: [
        '12-labs/index',
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
      label: '成本运营',
      items: [
        '08-cost-operations/cost-breakdown',
        '08-cost-operations/optimization-strategies',
        '08-cost-operations/capacity-planning',
        '08-cost-operations/self-hosted-vs-cloud',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">扩展</div>',
    },
    {
      type: 'category',
      label: 'Agent 系统与架构',
      items: [
        '07-agent-architecture/index',
      ],
    },
    {
      type: 'category',
      label: 'AI 工程核心技术栈',
      items: [
        '08-ai-engineering-tech-stack/index',
        '08-ai-engineering-tech-stack/prompt-engineering',
        '08-ai-engineering-tech-stack/rag-principles',
        '08-ai-engineering-tech-stack/agent-architecture',
        '08-ai-engineering-tech-stack/ai-evaluation',
      ],
    },
    {
      type: 'category',
      label: '前沿技术',
      items: [
        '09-evaluation-frontier/frontier-overview',
        '09-evaluation-frontier/speculative-decoding',
        '09-evaluation-frontier/fp8-inference',
        '09-evaluation-frontier/frontier-eval-process',
      ],
    },
    {
      type: 'category',
      label: '开源项目深度解读',
      items: [
        '17-open-source-deep-dive/index',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">面试</div>',
    },
    {
      type: 'category',
      label: '面试答题框架',
      items: [
        '10-interview/interview-framework',
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
      label: '面试问答库',
      items: [
        '13-qna/index',
      ],
    },
    {
      type: 'category',
      label: '团队建设与管理',
      items: [
        '11-team-building/index',
        '11-team-building/team-culture',
        '11-team-building/growth-path',
        '11-team-building/training-mechanism',
        '11-team-building/knowledge-management',
        '11-team-building/hiring-strategy',
      ],
    },
    {
      type: 'html',
      value: '<div class="sidebar-stage">参考附录</div>',
    },
    {
      type: 'category',
      label: '术语表',
      items: [
        '14-glossary/index',
      ],
    },
    {
      type: 'category',
      label: '推荐资源',
      items: [
        '15-resources/index',
      ],
    },
    {
      type: 'category',
      label: '案例研究',
      items: [
        '16-case-studies/index',
      ],
    },
  ],
};

module.exports = sidebars;
