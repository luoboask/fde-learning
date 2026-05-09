---
sidebar_position: 4
---

# 项目故事（STAR 格式）

## 模板

```
Situation（1 句）: 业务需要接入 70B 大模型

Task（1 句）: 在现有 GPU 下让模型跑起来

Action（60% 篇幅）:
  1. 选 vLLM，PagedAttention 最大化显存利用
  2. INT8 量化，显存降低 50%
  3. K8s 部署方案，支持弹性扩缩容
  4. 建立完整监控体系

Result（量化）: P99 延迟 400ms，吞吐 100 tok/s，GPU 利用率 75%
```

## 复盘

"如果重来：更早做 profiling、建立 benchmark 体系、考虑 FP8、更早引入前缀缓存。"

---

*下一节：[行为面试](./behavioral.md)*
