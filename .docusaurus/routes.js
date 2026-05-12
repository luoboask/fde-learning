import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '8f5'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '216'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '02d'),
            routes: [
              {
                path: '/01-ai-basics',
                component: ComponentCreator('/01-ai-basics', 'a06'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/01-ai-basics/00-ai-history',
                component: ComponentCreator('/01-ai-basics/00-ai-history', 'e5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/01-ai-basics/01-what-is-fde',
                component: ComponentCreator('/01-ai-basics/01-what-is-fde', '35b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/01-ai-basics/02-learning-path',
                component: ComponentCreator('/01-ai-basics/02-learning-path', 'aea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/01-ai-basics/03-fde-types',
                component: ComponentCreator('/01-ai-basics/03-fde-types', '82a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/attention-mechanism',
                component: ComponentCreator('/02-model-architecture/attention-mechanism', 'abe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/ffn-norm-pos',
                component: ComponentCreator('/02-model-architecture/ffn-norm-pos', '7ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/kv-cache',
                component: ComponentCreator('/02-model-architecture/kv-cache', '666'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/llm-finetuning',
                component: ComponentCreator('/02-model-architecture/llm-finetuning', '8ce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/llm-training',
                component: ComponentCreator('/02-model-architecture/llm-training', 'e9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/moe-architecture',
                component: ComponentCreator('/02-model-architecture/moe-architecture', '749'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/multimodal-llm',
                component: ComponentCreator('/02-model-architecture/multimodal-llm', 'c89'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/pre-post-training',
                component: ComponentCreator('/02-model-architecture/pre-post-training', '66c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/scaling-law',
                component: ComponentCreator('/02-model-architecture/scaling-law', 'b75'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/02-model-architecture/transformer-overview',
                component: ComponentCreator('/02-model-architecture/transformer-overview', 'fd3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/03-gpu-basics/gpu-interconnect',
                component: ComponentCreator('/03-gpu-basics/gpu-interconnect', 'd56'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/03-gpu-basics/gpu-overview',
                component: ComponentCreator('/03-gpu-basics/gpu-overview', 'f20'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/03-gpu-basics/memory-model',
                component: ComponentCreator('/03-gpu-basics/memory-model', '1eb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/03-gpu-basics/performance-bottleneck',
                component: ComponentCreator('/03-gpu-basics/performance-bottleneck', 'f54'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/04-inference-optimization/engine-overview',
                component: ComponentCreator('/04-inference-optimization/engine-overview', '285'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/04-inference-optimization/kv-cache-quant',
                component: ComponentCreator('/04-inference-optimization/kv-cache-quant', 'f0d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/04-inference-optimization/quantization-basics',
                component: ComponentCreator('/04-inference-optimization/quantization-basics', 'd47'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/04-inference-optimization/quantization-schemes',
                component: ComponentCreator('/04-inference-optimization/quantization-schemes', 'fb1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/04-inference-optimization/sglang-deep-dive',
                component: ComponentCreator('/04-inference-optimization/sglang-deep-dive', '755'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/04-inference-optimization/trt-llm-deep-dive',
                component: ComponentCreator('/04-inference-optimization/trt-llm-deep-dive', '63b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/04-inference-optimization/vllm-deep-dive',
                component: ComponentCreator('/04-inference-optimization/vllm-deep-dive', '5f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/05-distributed-inference/distributed-overview',
                component: ComponentCreator('/05-distributed-inference/distributed-overview', '7e3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/05-distributed-inference/moe-parallel',
                component: ComponentCreator('/05-distributed-inference/moe-parallel', 'b9b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/05-distributed-inference/pipeline-parallel',
                component: ComponentCreator('/05-distributed-inference/pipeline-parallel', 'fa5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/05-distributed-inference/tensor-parallel',
                component: ComponentCreator('/05-distributed-inference/tensor-parallel', '05f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/06-production-deployment/autoscaling',
                component: ComponentCreator('/06-production-deployment/autoscaling', '7b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/06-production-deployment/deployment-architecture',
                component: ComponentCreator('/06-production-deployment/deployment-architecture', '30b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/06-production-deployment/disaster-recovery',
                component: ComponentCreator('/06-production-deployment/disaster-recovery', '1a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/06-production-deployment/multi-tenant',
                component: ComponentCreator('/06-production-deployment/multi-tenant', 'b7d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/06-production-deployment/observability',
                component: ComponentCreator('/06-production-deployment/observability', '605'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/07-agent-architecture',
                component: ComponentCreator('/07-agent-architecture', '024'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/08-cost-operations/capacity-planning',
                component: ComponentCreator('/08-cost-operations/capacity-planning', '745'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/08-cost-operations/cost-breakdown',
                component: ComponentCreator('/08-cost-operations/cost-breakdown', '87f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/08-cost-operations/optimization-strategies',
                component: ComponentCreator('/08-cost-operations/optimization-strategies', '991'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/08-cost-operations/self-hosted-vs-cloud',
                component: ComponentCreator('/08-cost-operations/self-hosted-vs-cloud', '46b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/09-evaluation-frontier/fp8-inference',
                component: ComponentCreator('/09-evaluation-frontier/fp8-inference', '577'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/09-evaluation-frontier/frontier-eval-process',
                component: ComponentCreator('/09-evaluation-frontier/frontier-eval-process', '881'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/09-evaluation-frontier/frontier-overview',
                component: ComponentCreator('/09-evaluation-frontier/frontier-overview', '735'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/09-evaluation-frontier/speculative-decoding',
                component: ComponentCreator('/09-evaluation-frontier/speculative-decoding', 'ac1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/10-interview/behavioral',
                component: ComponentCreator('/10-interview/behavioral', '4d2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/10-interview/checklist',
                component: ComponentCreator('/10-interview/checklist', '427'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/10-interview/hr-round',
                component: ComponentCreator('/10-interview/hr-round', '4d8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/10-interview/interview-framework',
                component: ComponentCreator('/10-interview/interview-framework', '34b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/10-interview/project-stories',
                component: ComponentCreator('/10-interview/project-stories', '2f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/10-interview/self-intro',
                component: ComponentCreator('/10-interview/self-intro', 'fe7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/10-interview/technical-answers',
                component: ComponentCreator('/10-interview/technical-answers', 'f5b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/11-team-building',
                component: ComponentCreator('/11-team-building', '9ed'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/11-team-building/growth-path',
                component: ComponentCreator('/11-team-building/growth-path', 'be9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/11-team-building/hiring-strategy',
                component: ComponentCreator('/11-team-building/hiring-strategy', '42a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/11-team-building/knowledge-management',
                component: ComponentCreator('/11-team-building/knowledge-management', '1a4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/11-team-building/team-culture',
                component: ComponentCreator('/11-team-building/team-culture', 'a83'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/11-team-building/training-mechanism',
                component: ComponentCreator('/11-team-building/training-mechanism', '1ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/12-labs',
                component: ComponentCreator('/12-labs', 'a97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/12-labs/batching-tuning',
                component: ComponentCreator('/12-labs/batching-tuning', 'c30'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/12-labs/oom-troubleshooting',
                component: ComponentCreator('/12-labs/oom-troubleshooting', '981'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/12-labs/profiling-workshop',
                component: ComponentCreator('/12-labs/profiling-workshop', '7d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/12-labs/quantization-workflow',
                component: ComponentCreator('/12-labs/quantization-workflow', '397'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/12-labs/tensor-parallel-lab',
                component: ComponentCreator('/12-labs/tensor-parallel-lab', 'a9b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/12-labs/vllm-7b-deploy',
                component: ComponentCreator('/12-labs/vllm-7b-deploy', 'f9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/13-qna',
                component: ComponentCreator('/13-qna', 'd91'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/14-glossary',
                component: ComponentCreator('/14-glossary', 'ca3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/15-resources',
                component: ComponentCreator('/15-resources', '113'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/16-case-studies',
                component: ComponentCreator('/16-case-studies', 'b6d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/17-open-source-deep-dive',
                component: ComponentCreator('/17-open-source-deep-dive', '76d'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
