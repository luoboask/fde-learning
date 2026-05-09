---
sidebar_position: 1
---

# Transformer 架构概述

> 理解 Transformer 的内部机制，是所有推理优化的基础

---

## 为什么 FDE 需要理解 Transformer

面试中不会让你手推 Attention 公式，但会问：

- "为什么长上下文的推理延迟会飙升？"
- "GQA 和 MHA 对部署有什么影响？"
- "为什么 decode 阶段是 memory-bound？"

**核心原则：理解计算特征，才能找到优化点。**

---

## 推理的两个阶段

这是 FDE 面试中**最重要**的概念：

### Prefill（预填充）

- 输入所有 prompt token，**并行计算**
- 复杂度：O(n²)，n 是 prompt 长度
- **瓶颈：计算密集型（compute-bound）**

### Decode（解码）

- **逐个生成 token**，每步依赖上一步
- 每步都要加载全部模型权重
- **瓶颈：内存带宽型（memory-bound）**

```
关键事实：
  - Prefill 只执行一次
  - Decode 执行 output_length 次
  - 实际推理时间中，Decode 阶段占 80-95%
```

---

## KV Cache

### 是什么

在 decode 阶段，把前面所有 token 的 Key 和 Value 缓存起来，避免重复计算。

### 显存占比

**KV Cache 通常占推理显存的 60-80%。** 这是 FDE 优化的核心战场。

### 显存计算

```
KV Cache ≈ 2 × num_layers × batch_size × seq_len × num_kv_heads × head_dim × bytes

示例：Qwen-7B，FP16，batch=32，seq_len=2048
  ≈ 4 GB（取决于 GQA 配置）
```

### 对部署的影响

- batch size 越大，KV Cache 越大
- 上下文越长，KV Cache 越大
- **GQA/MQA 可以显著减少 KV Cache**

---

## Attention 机制对比

| 类型 | KV Cache 大小 | 推理速度 | 模型质量 | 代表模型 |
|------|--------------|----------|----------|----------|
| MHA | 最大 | 最慢 | 最好 | GPT-3、早期 Llama |
| GQA | 中等 | 快 | 接近 MHA | Llama 3、Qwen |
| MQA | 最小 | 最快 | 略有下降 | Falcon |

**GQA 是目前主流模型的标配**，在质量和效率之间取得最佳平衡。

---

## MoE 架构

### 原理

```
Dense 模型：每个 token 经过所有 FFN 层
MoE 模型：每个 token 经 Router 选择 K 个 Expert

示例 Mixtral 8×7B：
  总参数：46.7B（8 个 Expert）
  激活参数：12.9B（每个 token 只用 2 个）
```

### 部署挑战

| 挑战 | 说明 |
|------|------|
| Expert 并行 | 多 GPU 分配 Expert，需通信 |
| 激活不均衡 | 不同 token 激活不同 Expert |
| 路由器负载 | 需确保 Expert 负载均衡 |

---

## 关键数字速查

| 指标 | 典型值 |
|------|--------|
| Prefill 阶段占比 | 5-15% 推理时间 |
| Decode 阶段占比 | 85-95% 推理时间 |
| KV Cache 显存占比 | 60-80% 推理显存 |
| FFN 参数占比 | ~2/3 模型参数 |

---

*下一节：[Attention 机制深入](./attention-mechanism.md)*
*上一节：[入门篇](../01-basics/)*
