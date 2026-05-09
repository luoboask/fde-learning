---
sidebar_position: 2
---

# vLLM 深度解析

## PagedAttention

借鉴操作系统虚拟内存思想，把 KV Cache 分页管理：

- 每个 Page 存固定数量 token 的 KV（如 16 个）
- 按需分配，不连续也可以
- 用 Page Table 管理映射
- **显存利用率从 ~60% 提升到 ~95%**

## Continuous Batching

不等待整个 batch 完成，某个请求完成后立即从队列中拿新请求填充：

- GPU 始终保持高利用率
- **吞吐提升 2-5 倍**

## 关键配置

| 参数 | 说明 | 调优建议 |
|------|------|----------|
| `max_num_seqs` | 最大并发序列数 | 根据显存调整 |
| `gpu_memory_utilization` | GPU 显存使用比例 | 默认 0.9，留余量 |
| `quantization` | 量化方案 | awq/gptq/fp8 |

---

*下一节：[TensorRT-LLM](./trt-llm-deep-dive.md)*
