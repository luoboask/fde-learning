---
sidebar_position: 2
---

# Attention 机制深入

## MHA → GQA → MQA 的演进

### 核心问题

KV Cache 是推理中最大的显存消耗。Attention 头数直接影响 KV Cache 大小。

### 三种方案

**MHA（Multi-Head Attention）：**
- 每个 head 有独立的 Q、K、V
- KV Cache 最大

**GQA（Grouped Query Attention）：**
- 多个 query head 共享一组 KV
- Llama 3 70B：8 个 KV 组，32 个 Q 头
- KV Cache 减少为原来的 1/G

**MQA（Multi-Query Attention）：**
- 所有 query head 共享一组 KV
- KV Cache 最小，但质量略有下降

### 部署影响

"GQA 让长上下文场景变得可行。部署时，GQA 模型的 KV Cache 更小，支持更大的 batch size。"

---

*下一节：[KV Cache 详解](./kv-cache.md)*
