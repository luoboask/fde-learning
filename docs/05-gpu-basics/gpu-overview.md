---
sidebar_position: 1
---

# GPU 基础概述

## 为什么 FDE 需要懂 GPU

推理优化的最终战场在 GPU 上。需要理解显存分配、性能瓶颈、硬件选型。

## GPU 架构概览

```
GPU → GPC → TPC → SM → CUDA Core + Tensor Core
```

- **SM**：基本执行单元，A100 有 108 个
- **Tensor Core**：矩阵乘法专用，推理的主要计算在这里

## 主流 GPU 对比

| GPU | 显存 | 带宽 | 适用场景 |
|-----|------|------|----------|
| A100-80G | 80GB HBM2e | 2 TB/s | 通用推理 |
| H100-80G | 80GB HBM3 | 3.35 TB/s | 极致性能 |
| L40S | 48GB GDDR6 | 864 GB/s | 推理性价比 |

---

*下一节：[显存模型](./memory-model.md)*
