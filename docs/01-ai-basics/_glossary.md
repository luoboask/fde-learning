# 术语速查表

> 本阶段反复出现的核心术语，首次遇到时回来查阅。

---

## 推理性能指标

| 术语 | 全称 | 含义 |
|------|------|------|
| **TTFT** | Time To First Token | 用户发出请求到看到第一个回答的时间。越低越好 |
| **TPOT** | Time Per Output Token | 每生成一个 token 所需的时间。越低越好 |
| **QPS** | Queries Per Second | 每秒处理的请求数 |
| **吞吐量** | Throughput | 每秒生成的 token 数（tok/s） |
| **并发** | Concurrency | 同时服务的用户/请求数 |
| **P50/P99** | Percentile | P50=中位数，P99=99% 的请求都不超过这个值 |

## 模型架构

| 术语 | 全称 | 含义 |
|------|------|------|
| **Transformer** | - | 现代 LLM 的基础架构，核心是 Attention 机制 |
| **Attention** | Self-Attention | 让模型理解 token 之间关系的机制 |
| **KV Cache** | Key-Value Cache | 推理时缓存已计算的 K/V 矩阵，避免重复计算 |
| **MHA** | Multi-Head Attention | 传统 Attention，每对 head 都有独立的 K/V |
| **GQA** | Grouped Query Attention | 多组 query head 共享一组 K/V，减少 KV Cache |
| **MQA** | Multi-Query Attention | 所有 query head 共享同一组 K/V |
| **RoPE** | Rotary Position Embedding | 通过旋转矩阵注入位置信息的编码方式 |
| **MoE** | Mixture of Experts | 每层有多个"专家"，只有部分被激活 |
| **FFN** | Feed-Forward Network | Transformer 中的前馈网络，占大多数参数 |
| **MLA** | Multi-Latent Attention | DeepSeek 的低秩 KV 压缩 Attention |

## 推理引擎与工具

| 术语 | 含义 |
|------|------|
| **vLLM** | 最流行的开源 LLM 推理引擎，核心是 PagedAttention |
| **TGI** | Hugging Face 官方推理框架 |
| **TensorRT-LLM** | NVIDIA 官方的推理编译器，追求极致性能 |
| **SGLang** | 支持结构化生成和前缀缓存的推理框架 |
| **LangGraph** | Agent 编排框架 |
| **Ollama** | 本地运行 LLM 的简易工具 |

## 并行与分布式

| 术语 | 全称 | 含义 |
|------|------|------|
| **TP** | Tensor Parallel | 把模型切分到多张 GPU 上 |
| **PP** | Pipeline Parallel | 把模型按层分配到不同 GPU |
| **DP** | Data Parallel | 多个模型副本并行处理不同请求 |
| **EP** | Expert Parallel | MoE 模型中，不同 Expert 分布在不同 GPU |
| **AllReduce** | - | 多 GPU 同步数据的集体通信操作 |
| **NCCL** | NVIDIA Collective Communications Library | NVIDIA 官方的 GPU 通信库 |

## 量化

| 术语 | 全称 | 含义 |
|------|------|------|
| **量化** | Quantization | 用更低精度存储模型以减少显存和加速 |
| **FP32** | 32-bit Float | 标准浮点，每个参数 4 bytes |
| **FP16** | 16-bit Float | 半精度，每个参数 2 bytes |
| **BF16** | Brain Float 16 | 改进的半精度，训练更稳定 |
| **FP8** | 8-bit Float | H100 原生支持，每个参数 1 byte |
| **INT8** | 8-bit Integer | 量化到 -128~127，每个参数 1 byte |
| **INT4** | 4-bit Integer | 量化到 -8~7，每个参数 0.5 bytes |
| **AWQ** | Activation-aware Weight Quantization | 根据激活重要性选择性地量化 |
| **GPTQ** | Generative Pre-trained Quantization | 逐层贪心量化，用 Hessian 加权 |

## AI 工程

| 术语 | 全称 | 含义 |
|------|------|------|
| **RAG** | Retrieval-Augmented Generation | 先从知识库检索再生成回答 |
| **Agent** | 智能体 | 能调用工具、执行任务的自主系统 |
| **Prompt** | 提示词 | 给模型的输入指令 |
| **Embedding** | 嵌入向量 | 将文本转为数值向量的表示 |
| **Vector DB** | 向量数据库 | 存储和检索 Embedding 的数据库 |

## GPU 硬件

| 术语 | 含义 |
|------|------|
| **HBM** | High Bandwidth Memory，GPU 的高带宽显存 |
| **SM** | Streaming Multiprocessor，GPU 的计算单元 |
| **Tensor Core** | GPU 中专为矩阵乘法设计的硬件单元 |
| **NVLink** | NVIDIA GPU 之间的高速互联通道 |
| **Warp** | GPU 中 32 个线程为一组，同时执行 |

## 其他

| 术语 | 含义 |
|------|------|
| **SFT** | Supervised Fine-Tuning，监督微调 |
| **RLHF** | Reinforcement Learning from Human Feedback，人类反馈强化学习 |
| **DPO** | Direct Preference Optimization，直接偏好优化 |
| **SOTA** | State Of The Art，当前最优水平 |
| **SLO** | Service Level Objective，服务级别目标 |
| **SLA** | Service Level Agreement，服务级别协议 |
| **K8s** | Kubernetes，容器编排平台 |
| **SSE** | Server-Sent Events，服务端推送的流式响应协议 |
