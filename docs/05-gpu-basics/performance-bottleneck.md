---
sidebar_position: 3
---

# GPU 性能瓶颈分析

## 三种瓶颈

| 类型 | 表现 | 优化方向 |
|------|------|----------|
| Compute-bound | GPU 利用率 > 90% | Flash Attention、Kernel Fusion |
| Memory-bound | 利用率低，带宽满 | 量化、减少显存读写 |
| IO-bound | GPU 闲置等待 | Batch 传输 |

## 推理中各阶段

- **Prefill**：Compute-bound
- **Decode**：Memory-bound（逐 token 加载权重）

## Profiling 工具

`nvidia-smi` → 实时监控 | `nvtop` → 交互监控 | `nsys` → 系统级 profiling

---

*下一节：[GPU 互联](./gpu-interconnect.md)*
