---
sidebar_position: 1
---

# 开源项目深度解读

> 通过阅读优秀开源项目的代码，将前面学到的知识落到实处

---

## 阅读路线图

按照技能层级从低到高，每个项目对应前面的具体知识点：

### 对应 Level 2 -- 模型架构

#### Karpathy/nanoGPT
- **GitHub**: https://github.com/karpathy/nanoGPT
- **内容**: 从零实现 GPT 模型的训练和推理
- **学习重点**:
  - Transformer 核心代码（Self-Attention、FFN）
  - 模型训练循环
  - Tokenizer 实现
- **面试收获**: 能手写 Transformer 核心组件

#### Karpathy/llm.c
- **GitHub**: https://github.com/karpathy/llm.c
- **内容**: 用纯 C 语言实现 LLM 推理
- **学习重点**:
  - 推理引擎的底层实现
  - 手动矩阵乘法优化
  - 内存管理（手动分配/释放）
- **面试收获**: 理解推理引擎从高层到底层的映射

### 对应 Level 3 -- GPU 底层理解

#### llama.cpp
- **GitHub**: https://github.com/ggerganov/llama.cpp
- **内容**: 纯 C/C++ 实现的 LLM 推理引擎，支持 CPU/GPU
- **学习重点**:
  - GGUF 格式与量化实现
  - Metal 后端（Mac GPU 推理）
  - CUDA 内核实现
  - 纯 CPU 推理的优化技巧
- **面试收获**: 量化在底层的实现方式

### 对应 Level 4 -- 推理优化技术

#### vLLM
- **GitHub**: https://github.com/vllm-project/vllm
- **内容**: 最流行的开源推理引擎
- **学习重点**:
  - PagedAttention 源码实现
  - Scheduler 调度逻辑
  - Continuous Batching 实现
  - Prefix Caching 实现
- **面试收获**: 生产级推理引擎的架构设计

#### SGLang
- **GitHub**: https://github.com/sgl-project/sglang
- **内容**: 结构化生成引擎
- **学习重点**:
  - RadixAttention 前缀缓存
  - FSM 约束生成
  - 与 vLLM 的架构差异
- **面试收获**: 结构化生成在 Agent 场景的应用

### 对应 Level 6 -- 生产部署架构

#### Open-LLM-Deploy
- **GitHub**: https://github.com/Dao-AILab/Open-LLM-Deploy
- **内容**: LLM 生产部署最佳实践集合
- **学习重点**:
  - 完整的部署架构参考
  - 监控和告警配置
  - 成本优化策略

### 对应 Level 7 -- Agent 系统与架构

#### claude-mem
- **GitHub**: https://github.com/anthropics/claude-mem (示例)
- **内容**: Claude 记忆系统实现参考
- **学习重点**:
  - 记忆的存储和检索
  - 记忆压缩策略
  - 与 LLM 的集成方式

#### obsidian-wiki
- **GitHub**: https://github.com/obsidianmd/obsidian-releases
- **内容**: 知识管理工具的方法论
- **学习重点**:
  - 知识组织结构
  - 双向链接和知识图谱
  - 个人知识库的建设方法
- **面试收获**: 如何将知识管理方法论应用到团队

## 阅读建议

1. **先看文档，再读代码**：每个项目先读懂 README 和架构文档
2. **带着问题读**：比如 "vLLM 的 PagedAttention 怎么实现的？"
3. **写笔记**：读完每个项目写一段总结
4. **做对比**：读完 vLLM 再读 SGLang，对比两者的架构差异
