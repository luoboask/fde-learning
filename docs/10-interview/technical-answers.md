---
sidebar_position: 3
---

# 技术答题框架

## "解释 vLLM 的 PagedAttention"

1. **问题**（30s）— 传统 KV Cache 显存碎片化
2. **方案**（60s）— 分页管理，借鉴虚拟内存思想
3. **效果**（30s）— 显存利用率 60% → 95%

## "怎么优化推理延迟？"

1. **分析** — Prefill 瓶颈？Decode 瓶颈？排队瓶颈？
2. **方案** — 量化、Continuous Batching、Speculative Decoding
3. **数据** — 给出实际优化结果

## "流量翻 10 倍怎么扛？"

1. **垂直扩展** — 调大 batch size
2. **水平扩展** — 加实例 + LB
3. **架构优化** — 换引擎、缓存、蒸馏
4. **限流降级** — 优雅降级

---

*下一节：[项目故事](./project-stories.md)*
