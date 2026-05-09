---
sidebar_position: 1
---

# 推理引擎概览

## 为什么需要推理引擎

原始 PyTorch 推理的三大问题：

1. **显存碎片化** — KV Cache 动态分配，产生大量碎片
2. **批处理效率低** — Static Batching 被长请求阻塞
3. **没有优化** — 默认 kernel 不是最优的

**推理引擎的核心目标：让 GPU 跑得更快、更满、更便宜。**

## 主流引擎对比

| 引擎 | 核心优势 | 适用场景 |
|------|----------|----------|
| **vLLM** | PagedAttention、生态最好 | 通用推理服务 |
| **TensorRT-LLM** | 性能最强、kernel 深度优化 | NVIDIA 硬件极致优化 |
| **SGLang** | 结构化输出、RadixAttention | Agent / 复杂工作流 |
| **TGI** | 易用、HuggingFace 生态 | 快速原型 |

## 选型决策

```
需要极致性能 + 只用 NVIDIA？→ TensorRT-LLM
需要最好的生态 + 灵活性？→ vLLM
主要跑 Agent / 结构化输出？→ SGLang
如果不确定，选 vLLM。
```

---

*下一节：[vLLM 深度解析](./vllm-deep-dive.md)*
