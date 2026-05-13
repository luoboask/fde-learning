# 推荐资源

> 论文、博客、代码仓库、工具，按主题分类

---

## 核心论文

| 论文 | 年份 | 主题 |
|------|------|------|
| [Attention Is All You Need](https://arxiv.org/abs/1706.03762) | 2017 | Transformer 原始论文 |
| [Grouped Query Attention](https://arxiv.org/abs/2305.13245) | 2023 | GQA 方案 |
| [FlashAttention](https://arxiv.org/abs/2205.14135) | 2022 | 高效 Attention 算法 |
| [FlashAttention-3](https://arxiv.org/abs/2407.08608) | 2024 | 异步 + FP8 Attention |
| [Orca (Continuous Batching)](https://arxiv.org/abs/2309.06180) | 2023 | 持续批处理 |
| [AWQ](https://arxiv.org/abs/2306.00978) | 2023 | 激活感知量化 |
| [GPTQ](https://arxiv.org/abs/2210.17323) | 2022 | 逐层量化 |
| [SmoothQuant](https://arxiv.org/abs/2211.10438) | 2022 | 平滑量化方案 |
| [Speculative Decoding](https://arxiv.org/abs/2302.01318) | 2023 | 投机解码 |
| [EAGLE-3](https://arxiv.org/abs/2503.13643) | 2025 | 特征级推测解码 2-6x |
| [SpecForge](https://arxiv.org/abs/2603.18567) | 2026 | 灵活推测解码训练框架 |
| [FLy Loosely Speculative](https://openreview.net/forum?id=JjoTg34YiU) | 2025 | 宽松推测解码 |
| [PagedAttention](https://arxiv.org/abs/2309.06180) | 2023 | vLLM 核心技术 |
| [DistServe](https://arxiv.org/abs/2401.09670) | 2024 | Prefill-Decode 分离 |

## 必读博客

| 来源 | 内容 |
|------|------|
| [vLLM Blog](https://blog.vllm.ai/) | PagedAttention、Continuous Batching 原理 |
| [SGLang Blog](https://blog.sglang.ai/) | RadixAttention、Agentic 推理优化 |
| [Lilian Weng - LLM 推理](https://lilianweng.github.io/posts/2024-11-03-llm-inference/) | LLM 推理全景图 |
| [Kipp Lee - Transformer Inference Arithmetic](https://kipp.ly/transformer-inference-arithmetic/) | 推理显存和计算量化分析 |
| [NVIDIA Blog](https://developer.nvidia.com/blog/) | GPU 优化技术、Rubin 架构 |
| [Sebastian Raschka Blog](https://sebastianraschka.com/blog/) | LLM 技术详解、年度回顾 |

## 代码仓库

| 仓库 | 说明 |
|------|------|
| [vLLM](https://github.com/vllm-project/vllm) | 最活跃的推理引擎 |
| [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) | NVIDIA 官方优化框架 |
| [SGLang](https://github.com/sgl-project/sglang) | 结构化生成引擎 |
| [llm-action](https://github.com/liguodongiot/llm-action) | 中文大模型技术原理汇总 |
| [llm-course](https://github.com/mlabonne/llm-course) | LLM 课程合集 |

## 学习平台

| 平台 | 内容 |
|------|------|
| [BentoML LLM Handbook](https://bentoml.com/llm/) | 免费在线推理手册 |
| [Machine Learning Mastery](https://machinelearningmastery.com/) | ML 基础教程 |
| [智源社区](https://hub.baai.ac.cn/) | 中文 AI 学习社区 |
| [Datawhale](https://github.com/datawhalechina/) | 中文开源学习社区 |
