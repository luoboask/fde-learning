---
sidebar_position: 3
---

# KV Cache 量化

KV Cache 通常占 60-80% 推理显存。量化后省一半。

方案：FP8（精度几乎无损）> INT8（轻微损失）> eviction（有损）

---

*下一节：[GPU 基础](../05-gpu-basics/gpu-overview.md)*
