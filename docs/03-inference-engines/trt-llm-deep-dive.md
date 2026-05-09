---
sidebar_position: 3
---

# TensorRT-LLM 深度解析

## 核心优势

1. **硬件深度优化** — 针对每个 GPU 型号定制 kernel
2. **Kernel Fusion** — 多个小 operator 合并为大 kernel
3. **精度校准** — INT8/FP8 自动校准
4. **In-flight Batching** — token 级动态 batch

## 与 vLLM 对比

| 维度 | vLLM | TensorRT-LLM |
|------|------|-------------|
| 性能 | 好 | 更好（1.2-2x） |
| 硬件兼容性 | 通用 | 仅 NVIDIA |
| 模型支持 | 广（社区） | 有限（NVIDIA 验证） |
| 易用性 | 好 | 中等（需要 build） |
| 定制性 | 好（开源） | 中等（部分闭源） |

## 两阶段工作

```
Build 阶段：加载权重 → 构建计算图 → 优化 → 生成 engine
Runtime 阶段：加载 engine → 接收请求 → 执行推理
```

---

*下一节：[SGLang](./sglang-deep-dive.md)*
