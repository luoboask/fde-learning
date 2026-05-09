---
sidebar_position: 3
---

# KV Cache 详解

## KV Cache 的显存计算

```
KV Cache 显存 = 2 × num_layers × batch_size × seq_len × num_kv_heads × head_dim × bytes

示例：Qwen-7B，FP16，batch=32，seq_len=2048
  ≈ 4 GB

示例：70B，FP16，batch=128，seq_len=4096
  ≈ 30+ GB（GQA 配置下）
```

## 优化手段

1. **PagedAttention**（vLLM）— 分页管理，消除碎片
2. **KV Cache 量化** — FP8/INT8 减少 50%
3. **前缀缓存** — 相同前缀共享 KV Cache
4. **Eviction 策略** — 丢弃旧 KV（有精度损失）

---

*下一节：[FFN 与 Normalization](./ffn-norm-pos.md)*
