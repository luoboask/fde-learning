---
sidebar_position: 1
---

# 让推理变快：推理引擎与量化

> 理解主流推理引擎的原理和优化手段，掌握量化技术，让模型跑得更快、更省资源。

## 为什么这个模块对 FDE 至关重要

这是 FDE 的**核心技能区**。很多候选人能解释 Transformer 的公式，但回答不了：

- "vLLM 的 PagedAttention 比传统 KV Cache 好在哪里？为什么能提升 4 倍吞吐？"
- "AWQ 和 GPTQ 的 INT4 量化，哪个更适合生产环境？为什么？"
- "H100 上 FP8 推理比 FP16 快多少？精度损失有多大？"
- "投机解码的加速倍数如何计算？什么场景下最有效？"

**推理优化本质上是在和三个瓶颈博弈：显存（KV Cache）、算力（Tensor Core 利用率）、通信（多卡 AllReduce）。**

```mermaid
flowchart TD
    subgraph L1["推理优化全景图"]
        A["推理引擎\n运行时优化\nvLLM / TRT-LLM / SGLang"] --> B["量化技术\n模型压缩\nINT8 / FP8 / INT4"]
        B --> C["加速算法\n减少计算量\n投机解码 / 早退"]
        C --> D["前沿技术\n2025-2026\nEAGLE-3 / FP4 / Agentic"]
    end

    subgraph L2["优化目标"]
        TTFT["TTFT 首 token 延迟\n← prefill 性能\nFlashAttention, FP8"]
        TPOT["TPOT 每 token 延迟\n← decode 性能\nKV Cache 优化"]
        THR["吞吐量 tokens/s\n← 批处理效率\nContinuous Batching"]
        MEM["显存占用\n← 模型大小 + KV Cache\n量化, PagedAttention"]
    end

    A -. "PagedAttention\n减少显存碎片" .-> MEM
    A -. "Continuous Batching\n提升 GPU 利用率" .-> THR
    B -. "INT8/FP8\n减少权重显存" .-> MEM
    B -. "INT8 GEMM\n减少计算量" .-> TPOT
    C -. "小模型辅助\n减少大模型计算" .-> TPOT
    C -. "并行验证\nbatch 内加速" .-> THR

    style A fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style B fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style C fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style D fill:#fce4ec,stroke:#c2185b,stroke-width:2px
```

## 推理引擎架构全景

```mermaid
flowchart TB
    subgraph vLLM["vLLM: 运行时优化王者"]
        v1["API Server\nOpenAI 兼容 FastAPI"]
        v2["LLM Engine\n调度协调器"]
        v3["Scheduler\nDecode 优先级调度\nContinuous Batching"]
        v4["Worker\nGPU 进程 + Model Runner"]
        v5["PagedAttention\n固定大小 Block\nBlock Table 映射\n~95% 显存利用率"]
        v6["Prefix Caching\nBlock Hash 复用\nLRU 淘汰"]
    end

    subgraph TRTLLM["TensorRT-LLM: 编译时优化王者"]
        t1["Graph Parser\nONNX/PyTorch 导入"]
        t2["Kernel Auto-Tuning\n微基准测试选最优 Kernel"]
        t3["Layer Fusion\nElement-wise 融合\nAttention 融合\n全 Block 融合"]
        t4["INT8/FP8 校准\nKL 散度最小化"]
        t5["Engine 序列化\n直接部署推理"]
        t6["In-flight Batching\nToken 级别调度"]
    end

    subgraph SGLang["SGLang: Agent 场景王者"]
        s1["RadixAttention\nRadix Tree KV Cache\n最长前缀匹配\n跨请求前缀共享"]
        s2["FSM 结构化生成\nJSON Schema / Regex\nToken Masking\n100% 格式正确"]
        s3["SGLang DSL\n领域特定语言\nfew_shot_qa / tool_use"]
    end

    v1 --> v2 --> v3 --> v4 --> v5
    v4 --> v6
    t1 --> t2 --> t3 --> t4 --> t5 --> t6
    s1 --> s2 --> s3

    style vLLM fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style TRTLLM fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style SGLang fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
```

## 量化技术全景

```mermaid
flowchart LR
    subgraph Precision["精度演进"]
        FP32["FP32\n4 bytes\n基准精度"]
        FP16["FP16/BF16\n2 bytes\n训练/推理标准"]
        INT8["INT8\n1 byte\n推理加速"]
        FP8["FP8\n1 byte\nH100 原生"]
        INT4["INT4\n0.5 byte\n极致压缩"]
    end

    subgraph Schemes["量化方案"]
        PTQ["PTQ\n后训练量化\n分钟级\n<1% 精度损失"]
        QAT["QAT\n量化感知训练\n小时级\n<0.5% 损失"]
        AWQ["AWQ\n激活感知\n保护显著通道\nINT4 MMLU -0.3%"]
        GPTQ["GPTQ\nHessian 加权\n逐层优化\nINT4 MMLU -1~2%"]
        SmoothQ["SmoothQuant\n激活→权重\n纯 INT8 GEMM\nMMLU <0.5%"]
    end

    subgraph KVQuant["KV Cache 量化"]
        KV8["INT8 KV\n2x 压缩\nMMLU <0.3%"]
        KVF8["FP8 KV\nH100 最佳\n30-50% decode 加速"]
        KIVI["KIVI\nK-INT4 + V-INT2\n~3x 压缩"]
    end

    FP32 --> FP16 --> INT8
    FP16 --> FP8 --> INT4
    PTQ --> AWQ
    PTQ --> GPTQ
    PTQ --> SmoothQ
    QAT --> AWQ
    INT8 --> KV8
    FP8 --> KVF8
    INT4 --> KIVI

    style FP32 fill:#f8f9fa,stroke:#666
    style FP16 fill:#e8f5e9,stroke:#388e3c
    style INT8 fill:#fff3e0,stroke:#f57c00
    style FP8 fill:#e3f2fd,stroke:#1976d2
    style INT4 fill:#fce4ec,stroke:#c2185b
    style AWQ fill:#c8e6c9
    style SmoothQ fill:#c8e6c9
    style KVF8 fill:#bbdefb
```

## 70B 模型在不同精度下的显存需求

| 精度 | 权重显存 | KV Cache (batch=16, seq=8192) | 总显存 | 所需 GPU |
|------|---------|-------------------------------|--------|---------|
| FP16 | 140 GB | ~50 GB | ~190 GB | 3× A100-80G |
| INT8 (SmoothQuant) | 70 GB | ~25 GB | ~95 GB | 2× A100-80G |
| INT4 (AWQ) | 35 GB | ~12 GB | ~47 GB | 1× A100-80G |
| FP8 (H100) | 70 GB | ~12 GB | ~82 GB | 1× H100-80G |
| INT4 + INT8 KV | 35 GB | ~32 GB (INT8) | ~67 GB | 1× A100-80G |

**关键洞察：量化不只是省显存，更是让 70B 模型从"需要多卡"变成"单卡可跑"，从根本上消除了 TP 的通信开销。**

## Prefill vs Decode 的优化对应关系

```mermaid
flowchart LR
    subgraph Prefill["Prefill 阶段\nCompute-Bound\n决定 TTFT"]
        P1["输入: 几百到几万 token"]
        P2["GPU 利用率: 80-95%"]
        P3["瓶颈: FLOPs 总量"]
    end

    subgraph Decode["Decode 阶段\nMemory-Bound\n决定 TPOT"]
        D1["输入: 1 token (自回归)"]
        D2["GPU 利用率: 10-30%"]
        D3["瓶颈: HBM 带宽"]
    end

    subgraph OptP["Prefill 优化"]
        OP1["FlashAttention\n减少显存访问"]
        OP2["FP8 推理\n减少计算量"]
        OP3["Chunked Prefill\n分块处理长输入"]
    end

    subgraph OptD["Decode 优化"]
        OD1["PagedAttention\n减少显存碎片"]
        OD2["KV Cache 量化\n减少显存占用"]
        OD3["投机解码\n减少自回归步数"]
        OD4["Continuous Batching\n提升吞吐量"]
    end

    P3 --> OP1
    P3 --> OP2
    P3 --> OP3
    D3 --> OD1
    D3 --> OD2
    D3 --> OD3
    D3 --> OD4

    style Prefill fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style Decode fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style OptP fill:#fff3e0,stroke:#f57c00
    style OptD fill:#e3f2fd,stroke:#1976d2
```

## 硬件与量化方案匹配

| GPU | 推荐方案 | 原因 |
|-----|---------|------|
| A100 (无 FP8 Tensor Core) | INT8 SmoothQuant / INT4 AWQ | 不支持 FP8 原生加速 |
| H100 (FP8 Tensor Core) | FP8 权重 + FP8 KV Cache | 原生 FP8 GEMM，3958 TFLOPS |
| H200 / B200 | FP8 + FP4 探索 | 更大 HBM + 新精度支持 |
| 消费级 (RTX 4090) | INT4 GGUF / AWQ | 显存有限，INT4 是唯一选择 |

## 学习路径

| 顺序 | 文档 | 核心内容 | 面试考点 |
|------|------|---------|---------|
| 1 | [推理引擎概述](./engine-overview.md) | 推理指标、引擎对比、选型指南 | 如何选择推理引擎 |
| 2 | [vLLM 深度解读](./vllm-deep-dive.md) | PagedAttention、Continuous Batching | vLLM 的核心创新是什么 |
| 3 | [TensorRT-LLM 解读](./trt-llm-deep-dive.md) | NVIDIA 原生优化、推理加速 | TRT-LLM vs vLLM |
| 4 | [SGLang 解读](./sglang-deep-dive.md) | RadixAttention、结构化生成 | 什么时候用 SGLang |
| 5 | [量化基础](./quantization-basics.md) | PTQ、QAT、量化格式 | 量化对精度的影响 |
| 6 | [量化方案详解](./quantization-schemes.md) | SmoothQuant、AWQ、GPTQ | AWQ 的原理和优势 |
| 7 | [KV Cache 量化](./kv-cache-quant.md) | 量化 KV Cache 降低显存 | KV Cache 量化的精度损失 |
| 8 | [投机解码](./speculative-decoding.md) | 小模型辅助大模型生成 | 投机解码的加速原理 |
| 9 | [FP8 推理](./fp8-inference.md) | FP8 格式和混合精度推理 | FP8 vs FP16 的精度差异 |
| 10 | [前沿技术](./frontier-overview.md) | EAGLE-3、FP4、推理模型优化 | 2026 推理前沿趋势 |

## 模块知识结构图

```mermaid
mindmap
  root(("推理优化"))
    引擎
      vLLM
        PagedAttention
        Continuous Batching
        Prefix Caching
      TRT-LLM
        Kernel Fusion
        INT8/FP8 Calibration
        In-flight Batching
      SGLang
        RadixAttention
        FSM Structured Generation
        SGLang DSL
    量化
      精度
        FP32 → FP16 → INT8 → INT4
        FP8 E4M3/E5M2
      方案
        PTQ/QAT
        AWQ/GPTQ
        SmoothQuant
      KV Cache
        INT8/FP8
        KIVI/PQ
    加速
      投机解码
        Draft-Verify
        Medusa/EAGLE
      FP8 推理
        H100 Tensor Core
        混合精度
    前沿
      EAGLE-3/SpecForge
      FP4 极限量化
      Agentic 优化
```

## 前置知识

建议先完成 [GPU 基础](/03-gpu-basics/) 了解 GPU 的计算特性。

---

*上一节：[GPU：理解推理的物理载体](/03-gpu-basics/)*
*下一节：[推理引擎概述](./engine-overview.md)*
