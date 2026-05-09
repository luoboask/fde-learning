---
sidebar_position: 4
---

# MoE 并行

每个 GPU 放一部分 Expert，Router 决定 token 去哪个 GPU。

挑战：Expert 负载不均衡，通信模式复杂。

---

*分布式完成 → 进入 [实战篇](../07-deployment/deployment-architecture.md)*
