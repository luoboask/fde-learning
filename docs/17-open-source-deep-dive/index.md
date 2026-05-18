---
sidebar_position: 1
---

# 开源项目深度解读

> 通过阅读优秀开源项目的源码，将前面学到的知识落到实处。每个项目对应一个核心知识点。

## 导航图

```mermaid
flowchart TD
    A["开源项目解读\n总览"] --> B["nanoGPT\n从零理解 Transformer"]
    A --> C["llm.c\n纯 C 实现推理"]
    A --> D["llama.cpp\n跨平台推理引擎"]
    A --> E["vLLM\nPagedAttention 引擎"]
    A --> F["SGLang\n结构化生成引擎"]

    style A fill:#646cff,color:#fff
    style B fill:#e8f5e9
    style C fill:#e8f5e9
    style D fill:#fff3e0
    style E fill:#fff3e0
    style F fill:#e3f2fd
```

| 难度 | 项目 | 对应知识 | 核心看点 | 阅读时长 |
|------|------|---------|---------|---------|
| ⭐ | [nanoGPT](./nanogpt.md) | Transformer 架构 | 从零实现 GPT，理解 Attention | 2-3 小时 |
| ⭐⭐ | [llm.c](./llm-c.md) | 推理引擎底层 | 纯 C 实现 LLM 推理 | 3-4 小时 |
| ⭐⭐ | [llama.cpp](./llama-cpp.md) | 量化与跨平台推理 | GGUF 格式、CPU 优化 | 3-4 小时 |
| ⭐⭐⭐ | [vLLM](./vllm.md) | 推理引擎架构 | PagedAttention、Continuous Batching | 4-6 小时 |
| ⭐⭐⭐ | [SGLang](./sglang.md) | 结构化生成 | RadixAttention、FSM 约束生成 | 3-4 小时 |

## 阅读建议

1. **先看文档，再读代码**：每个项目先读懂 README 和架构文档
2. **带着问题读**：比如 "vLLM 的 PagedAttention 怎么实现的？"
3. **写笔记**：读完每个项目写一段总结
4. **做对比**：读完 vLLM 再读 SGLang，对比两者的架构差异

---

*返回 [FDE 学习路径](/01-ai-basics/01-what-is-fde)*
