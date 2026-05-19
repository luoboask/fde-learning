---
sidebar_position: 1
---

# GPU：理解推理的物理载体

> 所有的推理优化最终都要落到 GPU 的物理特性上。不理解 GPU 的架构和显存模型，就无法理解"为什么 decode 是 memory-bound"、"为什么量化能加速"这些核心问题。

## 为什么这个模块对 FDE 至关重要

很多 FDE 候选人能说出 Transformer 的公式，但回答不了：

- "同样 70B 模型，FP16 和 INT8 推理速度差多少？为什么？"
- "A100 80GB 能放下多少个 batch=32、seq_len=8192 的并发请求？"
- "为什么 TP=4 时，跨 NVLink 的通信开销会影响首 token 延迟？"
- "H100 比 A100 推理快多少？瓶颈在算力还是带宽？"

**GPU 是推理的物理载体。一切优化手段——量化、PagedAttention、Continuous Batching、张量并行——本质上都是在和 GPU 的物理特性博弈。**

```mermaid
flowchart TD
    subgraph L1["FDE 必须理解的 GPU 知识体系"]
        A["GPU 架构<br/>SM、Tensor Core、CUDA Core<br/>为什么 GPU 适合深度学习？"] --> B["显存模型<br/>HBM、SRAM、L1/L2 Cache<br/>显存如何影响推理性能？"]
        B --> C["性能瓶颈<br/>compute-bound vs memory-bound<br/>GPU 利用率分析"]
        C --> D["GPU 互联<br/>NVLink、PCIe、InfiniBand<br/>多卡通信带宽与延迟"]
    end

    subgraph L2["与推理优化的对应关系"]
        A -. "Tensor Core 支持 FP16/INT8/FP8<br/>→ 量化加速的硬件基础" .-> B
        B -. "HBM 带宽决定 decode 速度<br/>→ KV Cache 量化的意义" .-> C
        C -. "memory-bound 时优化带宽<br/>→ 减少显存访问的策略" .-> D
        D -. "NVLink 带宽 600GB/s<br/>→ TP 的可行性边界" .-> E
    end

    style A fill:#e8f5e9
    style B fill:#e8f5e9
    style C fill:#fff3e0
    style D fill:#e3f2fd
```

## GPU 架构全景图

```mermaid
flowchart TB
    subgraph GPU["NVIDIA GPU 硬件架构 (以 A100 为例)"]
        direction TB

        subgraph HBM["HBM2e 显存 (80GB, 2.0 TB/s)"]
            HBM1["显存控制器<br/>× 6 通道"]
        end

        subgraph L2["L2 缓存 (40MB)"]
            L2C["共享 L2<br/>所有 SM 可访问"]
        end

        subgraph SMs["Streaming Multiprocessors (108 个 SM)"]
            direction LR
            SM1["SM 0"]
            SM2["SM 1"]
            SM3["SM ..."]
            SM4["SM 107"]
        end

        HBM <--> L2
        L2 <--> SMs

        subgraph SM_Detail["单个 SM 内部结构"]
            direction TB
            Reg["寄存器文件<br/>64K 个 32-bit 寄存器"]
            L1["L1 Cache / Shared Memory<br/>192KB (可配置比例)"]
            CUDA["CUDA Cores<br/>64 个 FP32<br/>64 个 FP32/INT32"]
            TC["Tensor Cores<br/>4 个<br/>FP16/BF16/INT8/FP8"]
            SFU["SFU<br/>特殊函数单元<br/>sin/cos/exp/log"]
        end

        SM1 --- SM_Detail
    end

    style GPU fill:#f8f9fa,stroke:#646cff,stroke-width:2px
    style HBM fill:#e3f2fd,stroke:#1976d2
    style L2 fill:#fff3e0,stroke:#f57c00
    style SMs fill:#e8f5e9,stroke:#388e3c
    style SM_Detail fill:#fce4ec,stroke:#c2185b
```

**关键数字（A100 80GB）：**

| 硬件组件 | 规格 | 对推理的影响 |
|---------|------|-------------|
| CUDA Cores | 6,912 (64 × 108 SM) | 通用计算，LLM 推理中使用较少 |
| Tensor Cores | 432 (4 × 108 SM) | **LLM 推理的核心算力**，支持 FP16/BF16/INT8/FP8 |
| HBM 带宽 | 2.0 TB/s | **decode 阶段的瓶颈**，决定每秒能生成多少 token |
| L2 缓存 | 40 MB | 减少 HBM 访问，提升小 batch 推理效率 |
| 寄存器文件 | 每个 SM 64K 个 | 决定 SM 能同时处理的线程数 |

## 显存层级与性能关系

```mermaid
flowchart LR
    subgraph MemoryHierarchy["GPU 显存层级 (速度和容量权衡)"]
        direction TB
        Reg["寄存器<br/>~0 延迟<br/>64K/SM"]
        SMEM["Shared Memory / L1<br/>~1 cycle<br/>192KB/SM"]
        L2C["L2 缓存<br/>~20-40 cycles<br/>40MB (全局)"]
        HBM2["HBM2e<br/>~500 cycles<br/>80GB (全局)"]
    end

    Reg -->|"容量最小、速度最快"| SMEM
    SMEM -->|"可编程、线程共享"| L2C
    L2C -->|"所有 SM 共享"| HBM2
    HBM2 -->|"容量最大、带宽限制"| SMEM

    subgraph LLMMapping["LLM 推理中的显存映射"]
        W["模型权重 (140GB FP16 70B)<br/>→ 量化后 70GB INT8"]
        KV["KV Cache (可达数十 GB)<br/>→ PagedAttention 分页管理"]
        Act["中间激活 (几百 MB)<br/>→ 随 batch 线性增长"]
    end

    style Reg fill:#e8f5e9
    style SMEM fill:#e8f5e9
    style L2C fill:#fff3e0
    style HBM2 fill:#fce4ec
    style W fill:#646cff,color:#fff
    style KV fill:#f59e0b
    style Act fill:#10b981
```

## 学习路径

| 顺序 | 文档 | 核心内容 | 面试考点 |
|------|------|---------|---------|
| 1 | [GPU 架构概述](./gpu-overview.md) | SM、Tensor Core、CUDA Core、prefill/decode 在 GPU 上的执行特征 | 为什么 GPU 适合深度学习？prefill 和 decode 在 GPU 上的差异 |
| 2 | [显存模型](./memory-model.md) | HBM、SRAM、L1/L2 Cache、带宽与容量对推理的影响 | HBM 带宽如何限制 decode 速度 |
| 3 | [性能瓶颈分析](./performance-bottleneck.md) | compute-bound vs memory-bound、SM 利用率分析、Arithmetic Intensity | 如何判断推理是 compute-bound 还是 memory-bound |
| 4 | [GPU 互联](./gpu-interconnect.md) | NVLink、PCIe、InfiniBand 带宽对比、多卡通信拓扑 | TP=4 时跨卡通信开销有多大 |

## 模块知识结构图

```mermaid
mindmap
  root(("GPU 基础"))
    架构
      SM 结构
      Tensor Core
      CUDA Core
      SFU
    显存
      HBM2e
      L2 Cache
      L1 / Shared Memory
      寄存器
    性能
      compute-bound
      memory-bound
      Arithmetic Intensity
      Roofline 模型
    互联
      NVLink 600GB/s
      PCIe 5.0 64GB/s
      InfiniBand
      NCCL 通信库
```

## 前置知识

建议先完成 [模型是怎么工作的](/02-model-architecture/) 了解模型的计算特征（prefill 是 compute-bound，decode 是 memory-bound）。

---

*上一节：[模型是怎么工作的](/02-model-architecture/)*
*下一节：[GPU 架构概述](./gpu-overview.md)*
