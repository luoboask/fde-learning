---
sidebar_position: 5
---

# MoE 架构详解

## 原理

每个 token 经 Router 选择 K 个 Expert，只激活部分参数。

## 部署挑战

- Expert 并行需要多 GPU 通信
- 激活不均衡导致显存波动
- 路由器需确保负载均衡

## 代表模型

- Mixtral 8×7B
- DeepSeek V3/R1（MoE + MLA）

---

*进阶篇完成 → 进入 [推理引擎](../03-inference-engines/engine-overview.md)*
