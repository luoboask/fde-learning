# FDE 术语 glossary

> 面试中高频出现的专业术语，按领域分类

---

## 模型架构

| 术语 | 全称 | 解释 |
|------|------|------|
| Transformer | - | 基于 Self-Attention 的序列模型架构 |
| Attention | Self-Attention | 让每个 token 关注序列中其他 token 的机制 |
| KV Cache | Key-Value Cache | 缓存 Decode 阶段的 K 和 V 矩阵，避免重复计算 |
| MHA | Multi-Head Attention | 每个 head 有独立的 Q、K、V |
| GQA | Grouped Query Attention | 多个 query head 共享一组 KV，减少显存 |
| MQA | Multi-Query Attention | 所有 query head 共享一组 KV |
| RoPE | Rotary Positional Embedding | 通过旋转矩阵注入位置信息的位置编码 |
| SwiGLU | Swish-Gated Linear Unit | 现代模型使用的 FFN 激活函数 |
| RMSNorm | Root Mean Square Normalization | 轻量级 Normalization，只计算均方根 |
| MoE | Mixture of Experts | 每个 token 经过 Router 选择部分 Expert |
| MLA | Multi-Latent Attention | DeepSeek 使用的 Attention 变体 |

## 推理引擎

| 术语 | 全称 | 解释 |
|------|------|------|
| vLLM | - | UC Berkeley 出品的开源推理引擎 |
| PagedAttention | - | vLLM 核心创新，分页管理 KV Cache |
| Continuous Batching | - | 动态调度 batch，不等最长请求完成 |
| In-flight Batching | - | TRT-LLM 的更细粒度 batch 调度 |
| TGI | Text Generation Inference | HuggingFace 出品的推理框架 |
| SGLang | - | LMSYS 出品，擅长结构化生成 |
| TensorRT-LLM | - | NVIDIA 官方推理优化框架 |
| TTFT | Time To First Token | 首 token 延迟 |
| TPOT | Time Per Output Token | 每 token 生成时间 |
| Throughput | - | 吞吐量，tokens/sec/GPU |

## 量化

| 术语 | 全称 | 解释 |
|------|------|------|
| PTQ | Post-Training Quantization | 训练后量化，不需要重新训练 |
| QAT | Quantization-Aware Training | 量化感知训练 |
| AWQ | Activation-aware Weight Quantization | 保护大激活对应权重的量化方案 |
| GPTQ | - | 逐层量化，考虑层间误差累积 |
| SmoothQuant | - | 平滑激活和权重分布，便于同时量化 |
| FP8 | 8-bit Floating Point | 8-bit 浮点格式，H100 原生支持 |
| INT8 | 8-bit Integer | 8-bit 整数格式 |
| INT4 | 4-bit Integer | 4-bit 整数格式，极致压缩 |

## GPU 与底层

| 术语 | 全称 | 解释 |
|------|------|------|
| SM | Streaming Multiprocessor | GPU 基本执行单元 |
| Tensor Core | - | 矩阵乘法专用单元 |
| CUDA Core | - | 标量计算单元 |
| HBM | High Bandwidth Memory | GPU 高带宽显存 |
| NVLink | - | NVIDIA GPU 间高速互联，600 GB/s |
| TP | Tensor Parallel | 张量并行，层内矩阵切分 |
| PP | Pipeline Parallel | 流水线并行，层间分配到不同 GPU |
| DP | Data Parallel | 数据并行，请求分发到不同副本 |
| MIG | Multi-Instance GPU | 把一张 GPU 切分成多个独立实例 |

## 部署与运维

| 术语 | 全称 | 解释 |
|------|------|------|
| SLO | Service Level Objective | 服务等级目标 |
| SRE | Site Reliability Engineering | 站点可靠性工程 |
| HPA | Horizontal Pod Autoscaler | K8s 水平扩缩容 |
| Pod | - | K8s 最小部署单元 |
| A/B Testing | - | 两个版本对比测试 |
| Canary | - | 灰度发布，逐步放量 |
| RAG | Retrieval-Augmented Generation | 检索增强生成 |
| Agent | - | 能调用工具、自主规划的智能体 |
| Speculative Decoding | 投机解码 | 用小模型预测加速大模型生成 |
| Flash Attention | - | 高效 Attention 算法，减少显存访问 |
