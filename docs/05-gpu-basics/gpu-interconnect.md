---
sidebar_position: 4
---

# GPU 互联与 MIG

## 互联方式

| 方式 | 带宽 | 适用 |
|------|------|------|
| NVLink | 600 GB/s | 同服务器内多卡 |
| PCIe 5.0 | 64 GB/s | 服务器间 |
| InfiniBand | 400 Gbps | 多机多卡 |

## MIG（Multi-Instance GPU）

把一张 A100 切分成最多 7 个独立实例，适合小模型部署和多用户共享。

---

*GPU 基础完成 → 进入 [分布式推理](../06-distributed/distributed-overview.md)*
