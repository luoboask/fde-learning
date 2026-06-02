---
sidebar_position: 21
sidebar_label: 岗位知识图谱
---

# 2026 AI 岗位知识图谱：真实 JD 数据洞察与学习路线图

> 基于 bb-browser 实时采集的 2026 年 5-6 月最新 JD（淘天 Agent 开发、公安部第一研究所模型推理、上海 AI Lab 大模型系统、平安健康保险推理加速等），
> 从真实招聘需求中提取市场趋势、薪资数据和详细技能学习路径。

## 采集方法论

- **采集时间**：2026 年 5-6 月
- **采集方式**：bb-browser 通过 CDP 控制 Chrome 实例，逐平台访问职位详情页，提取完整 JD 文本
- **数据来源**：14 个岗位来自 12+ 平台
- **跳过平台**：BOSS直聘（要求登录）、飞书（阿里账号验证）、智联招聘（安全验证）、牛客（职位已下线）、大疆（职位已下线）

---

## 第一部分：岗位市场分析

### 岗位概览

| # | 公司 | 职位 | 薪资 | 地点 | 来源 |
|---|------|------|------|------|------|
| 1 | 淘天集团 | AI Agent 开发工程师-交易业务 | 面议 | 北京 | 淘天招聘 |
| 2 | 公安部第一研究所 | 模型推理优化工程师 | 30-40k | 北京 | 猎聘 |
| 3 | 上海 AI Lab（深圳河套学院） | 大模型系统研发工程师 | 面议 | 深圳 | 官网 |
| 4 | 平安健康保险（平安科技语义实验室） | 算法工程师（大模型推理加速） | 面议 | 深圳 | bebee |
| 5 | 滴滴 | 大模型推理框架研发工程师（高级/资深） | 面议 | 杭州 | 滴滴招聘 |
| 6 | 腾讯（牛企直聘转载） | 大模型推理性能优化工程师 | 面议 | 深圳 | niuqizp |
| 7 | 腾讯（官方） | Omni全模态模型算法工程师 | 面议 | 北京 | 腾讯招聘 |
| 8 | 字节跳动 | Data语音-推理框架优化工程师（2026届） | 面议 | 杭州 | 字节校招 |
| 9 | 上海 AI Lab（浦东） | 大模型推理部署工程师/高级工程师 | 面议 | 上海 | 官网 |
| 10 | 快手 | 大模型推理引擎工程师 | 面议 | 北京 | 牛客 |
| 11 | 双深科技 AttrSense | 大模型算法研发工程师（校园） | 面议 | 上海/杭州 | 官网 |
| 12 | **阿里巴巴（钉钉）** | AI Agent 应用开发工程师（校园） | 面议 | 杭州 | 阿里招聘 |
| 13 | **海翼电子（Anker）** | AI模型推理加速/落地工程师（CUDA） | 面议 | 长沙 | 猎聘 |
| 14 | **宁波数字孪生（东方理工）** | LLM/AI大模型工程师 | 硕士20万起/博士40万起 | 宁波 | 理聘 |

### 知识体系总览

```
编程语言基础 ─→ 深度学习/ML 基础 ─→ Transformer 架构
       │                │                  │
       ▼                ▼                  ▼
  工程能力层        算法理解层          模型架构层
  (Python/C++/       (PyTorch/           (KV Cache/
   TS/Linux)          TensorFlow)         Flash Attention)
       │                │                  │
       └────────────────┼──────────────────┘
                        ▼
              ┌─────────────────────┐
              │    核心技能层         │
              │  推理框架 + Agent 工程 │
              └────────┬────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   推理优化层      Agent 应用层     生产部署层
   (量化/加速)    (工具调用/编排)   (Docker/K8s)
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                  加分项层
              (CUDA/开源贡献/顶会)
```

### 薪资与技能关联

| 岗位 | 薪资 | 核心技能组合 |
|------|------|------------|
| 模型推理优化工程师（公安部一所） | 30-40k | PyTorch + vLLM/TensorRT + CUDA + 量化 |
| AI Agent 开发工程师（淘天） | 面议 | TypeScript/Python + LangGraph + RAG + React |
| 大模型系统研发（上海AI Lab） | 面议 | Python/C++ + vLLM/Megatron + CUDA + 分布式 |
| 算法工程师-推理加速（平安） | 面议 | Python/C++ + vLLM/SGLang + PagedAttention + K8s |
| 推理框架研发（滴滴） | 面议 | C++/Python + CUDA + vLLM/TensorRT-LLM + 分布式 |
| Omni全模态算法（腾讯） | 面议 | PyTorch + 全模态架构 + 跨模态对齐 + Python/C++ |
| 推理框架优化（字节跳动） | 面议 | CUDA/Triton + vLLM/SGLang + 量化/稀疏化 + 多模态 |
| 多模态推理（快手） | 面议 | vLLM/SGLang + CUDA/Triton + 量化 + 芯片优化 |
| AI Agent 应用开发（钉钉/阿里） | 面议 | Java/Python + Agent 架构 + ADK + RAG + Multi-Agent |
| CUDA 推理加速（海翼/Anker） | 面议 | CUDA + TensorRT + ONNX + NPU/DSP 嵌入式部署 |
| LLM/AI 大模型（宁波数字孪生） | 硕士20万起/博士40万起 | PyTorch + RAG + Agent + Prompt + EDA领域 |

**核心发现：**
- 推理优化方向薪资透明且较高（30-40k+），要求底层技术栈（CUDA、量化、分布式）
- Agent 应用方向覆盖面广，淘天要求 TypeScript+React（偏前端），钉钉要求 Java/Python+Agent架构（偏后端）
- 科研院所（宁波数字孪生）给出明确薪资范围：硕士20万起、博士40万起
- 大厂（腾讯/字节/快手）推理岗明确要求 CUDA/Triton + vLLM 二次开发能力
- **跨境电商（Anker）也要求 CUDA 工程师**——说明 AI 推理优化已渗透传统行业

### 2026 年 FDE 技能频率排行

| 排名 | 技能 | 出现次数 | 说明 |
|------|------|---------|------|
| 1 | **vLLM** | 11/14 | 绝对统治力，几乎所有推理岗都要求 |
| 2 | **PyTorch** | 10/14 | 深度学习基础 |
| 3 | **Python** | 14/14 | 通用语言 |
| 4 | **C++** | 9/14 | 推理优化方向必修 |
| 5 | **CUDA / GPU 优化** | 9/14 | 大厂核心要求，拉开薪资差距 |
| 6 | **量化** | 8/14 | INT8/FP8，推理优化核心技术 |
| 7 | **SGLang** | 6/14 | 结构化生成推理框架，上升最快 |
| 8 | **KV Cache** | 6/14 | Transformer 推理基础 |
| 9 | **Triton（编程框架）** | 6/14 | GPU kernel 开发新范式 |
| 10 | **分布式推理** | 6/14 | TP/PP/EP，多卡多机 |
| 11 | **Docker / K8s** | 5/14 | 生产部署基础 |
| 12 | **RAG** | 4/14 | Agent 应用标配 |
| 13 | **FlashAttention / PagedAttention** | 4/14 | 注意力机制优化 |
| 14 | **Agent / Function Calling** | 4/14 | Agent 应用核心（钉钉新增 ADK 框架要求） |
| 15 | **Continuous Batching** | 4/14 | 推理服务高并发 |
| 16 | **LoRA / DPO / RLHF** | 4/14 | 模型微调/对齐 |
| 17 | **MoE 推理** | 3/14 | 混合专家架构 |
| 18 | **Speculative Decoding** | 3/14 | 推测解码加速 |
| 19 | **Multi-Agent 构建** | 2/14 | 多智能体协作（钉钉明确要求） |
| 20 | **Memory 系统** | 2/14 | Agent 记忆（钉钉明确要求） |
| 21 | **NPU/DSP 部署** | 2/14 | 边缘计算部署（海翼/Anker 要求） |
| 22 | **Java** | 2/14 | 企业级后端开发（钉钉要求 Java/Python） |
| 23 | **上下文压缩** | 1/14 | 上下文工程优化（钉钉明确要求） |
| 24 | **ADK 框架** | 1/14 | Agent Development Kit（钉钉明确要求） |

### 公司分析

**互联网大厂：** 淘天（Agent 应用，TypeScript+React+LangGraph）、腾讯（Omni全模态+推理性能）、字节（校招 CUDA/Triton+vLLM）、滴滴（高级/资深，要求最全面）、快手（多模态推理）

**科研院所：** 上海 AI Lab（系统研发+推理部署，要求顶会/开源）、公安部一所（推理优化，30-40k）、宁波数字孪生（硕士20万起/博士40万起，EDA领域）

**传统企业转型：** 海翼电子 Anker（跨境电商也要求 CUDA）、平安健康保险（保险行业推理加速，加分项 CUDA/Triton Kernel）

---

## 第二部分：学习路线图

### 一、编程语言基础（所有岗位都要求）

#### 1.1 Python（必学，100% 要求）

**JD 原文引用：**
- 淘天："精通 TypeScript / Node.js / Python 中至少一门语言"
- 公安部一所："熟悉 Linux + C++ / Python 开发环境"
- 平安保险："熟练掌握 C/C++、Python、Rust 中的一种或多种"
- 上海AI Lab："优秀的编程能力 (Python/C++)"

**需要掌握：**
- Python 异步编程（asyncio）—— Agent 调用 LLM API 必须
- 面向对象设计 —— 框架扩展、工具封装
- 类型注解（typing）—— 大型项目可维护性
- 性能优化（Cython、multiprocessing）—— 推理服务并发

#### 1.2 C++ / Rust（推理方向必学）

**JD 原文引用：**
- 平安保险："熟练掌握 C/C++、Python、Rust 中的一种或多种，工程素养扎实"
- 上海AI Lab："针对硬件（GPU/昇腾）特性进行底层优化"
- 公安部一所："熟悉 Linux + C++ / Python 开发环境"

**需要掌握：**
- C++ 内存管理、模板编程 —— 推理引擎底层
- 跨平台编译（Linux 为主）
- Rust 基础（加分项，平安保险明确提到）

#### 1.3 TypeScript / Node.js（Agent 应用方向）

**JD 原文引用：**
- 淘天："精通 TypeScript / Node.js / Python 中至少一门语言"
- 淘天："熟悉 Vue / React 等主流前端框架"

**需要掌握：**
- TypeScript 类型系统 —— AI Native 应用前端
- Node.js 服务端 —— Agent 后端 API
- React/Vue 框架 —— AI 产品交互界面

### 二、深度学习与 Transformer 基础

#### 2.1 深度学习框架

**JD 原文引用：**
- 公安部一所："熟悉深度学习框架（如 PyTorch / TensorFlow）"
- 上海AI Lab："深入理解 Verl/vLLM/Megatron 底层机制"

**需要掌握：**
- PyTorch 核心概念（Tensor、autograd、nn.Module）
- 模型定义、训练循环、评估流程
- DataLoader、Dataset —— 数据处理管线

#### 2.2 Transformer 架构（必学）

**JD 原文引用：**
- 上海AI Lab："扎实的算法基础，熟悉 Transformer 架构及大模型关键技术 (如 KV Cache, Flash Attention)"
- 平安保险："熟悉 Transformer 架构及主流大模型结构（Qwen、DeepSeek 等），理解前向推理计算流程"

**需要掌握：**
- Self-Attention 机制（QKV、多头注意力）
- Position Encoding（RoPE 等）
- LayerNorm、FFN、残差连接
- Decoder-only vs Encoder-Decoder
- **KV Cache**（3 个 JD 都提到）
- **Flash Attention**（上海AI Lab 明确要求）

#### 2.3 主流大模型结构

**JD 原文引用：**
- 平安保险："理解前向推理计算流程"（Qwen、DeepSeek 等）

**需要了解：**
- Qwen 系列架构特点
- DeepSeek 系列架构特点（MoE、DeepSeek-V2/V3 的 MLA）
- Llama 系列架构

### 三、推理框架与优化（最高频技能）

#### 3.1 推理框架（至少精通一个）

**JD 原文引用：**
- 公安部一所："参与模型部署与推理框架优化，包括但不限于 TensorRT、ONNX Runtime、vLLM、Triton 等"
- 平安保险："基于 vLLM、SGLang、TensorRT-LLM 等框架，建设和优化推理服务能力"
- 上海AI Lab："开发或改进大模型框架（如Verl、vLLM、Megatron等）"
- 平安保险加分项："有 vLLM、SGLang、TensorRT-LLM 二次开发或开源贡献经验"

| 框架 | 适用场景 | 学习优先级 |
|------|---------|-----------|
| **vLLM** | 大模型推理服务，PagedAttention | ★★★★★ 必学 |
| **SGLang** | 结构化生成、推理编排 | ★★★★ 重点 |
| **TensorRT-LLM** | NVIDIA GPU 高性能推理 | ★★★★ 重点 |
| **Triton Inference Server** | 生产级模型服务化 | ★★★ 重要 |
| **ONNX Runtime** | 跨平台推理 | ★★★ 重要 |
| **Megatron** | 分布式训练/推理 | ★★★ 重要 |
| **Verl** | 强化学习后训练 | ★★ 进阶 |

#### 3.2 推理优化技术

**JD 原文引用：**
- 公安部一所："负责模型量化、剪枝、蒸馏、算子融合等推理加速技术的落地"
- 公安部一所："优化 GPU / CPU / NPU 等硬件上的模型推理效率，包括显存、延迟、吞吐量优化"
- 公安部一所："参与大模型推理架构设计，例如 KV Cache、Batching、流水线并行等优化策略"
- 平安保险："熟悉常见推理优化技术，如 PagedAttention、Prefix Cache、Speculative Decoding、量化等"
- 平安保险加分项："有 PD 分离、Expert Parallel、KV Cache 优化等实战经验"

**需要掌握（按优先级）：**

| 技术 | 说明 | JD 出现次数 | 首次提到公司 |
|------|------|------------|------------|
| **量化**（INT8/FP16/FP8） | 降低精度换速度 | 7 次 | 公安部一所、滴滴、腾讯 |
| **vLLM** | 主流推理框架 | 9 次 | 所有推理岗 |
| **CUDA Kernel 开发** | GPU 底层编程 | 6 次 | 滴滴、上海AI Lab、字节跳动 |
| **Triton（编程框架）** | Python 写 GPU kernel | 5 次 | 字节跳动、腾讯、快手 |
| **KV Cache 优化** | 减少重复计算 | 5 次 | 上海AI Lab、字节跳动、腾讯 |
| **SGLang** | 结构化生成推理 | 5 次 | 字节跳动、腾讯、快手、滴滴 |
| **PagedAttention** | vLLM 核心优化 | 3 次 | 平安、滴滴 |
| **FlashAttention** | 注意力加速 | 3 次 | 滴滴、上海AI Lab |
| **Continuous Batching** | 高并发推理 | 3 次 | 滴滴 |
| **Speculative Decoding** | 推测解码加速 | 2 次 | 上海AI Lab（浦东） |
| **PD 分离**（Prefill/Decode） | 推理两阶段分离 | 1 次 | 平安保险 |
| **MoE 推理** | 混合专家架构 | 2 次 | 上海AI Lab（浦东）、腾讯 |
| **算子融合** | 减少 kernel launch 开销 | 2 次 | 公安部一所 |
| **Tensor Parallel** | 张量并行 | 2 次 | 平安保险 |
| **Pipeline Parallel** | 流水线并行 | 1 次 | 平安保险 |
| **Expert Parallel** | MoE 专家并行 | 1 次 | 平安保险 |
| **LoRA/DPO/RLHF** | 模型微调/对齐 | 3 次 | 双深科技、上海AI Lab |

#### 3.3 GPU / 底层优化（加分但高薪必备）

**JD 原文引用：**
- 公安部一所："优化 GPU / CPU / NPU 等硬件上的模型推理效率"
- 上海AI Lab："精通 CUDA、OpenAI Triton 或 Ascend C，能进行内核级性能优化"
- 上海AI Lab："解决大模型在训练/推理中的瓶颈问题（如计算、存储、通信）"
- 平安保险加分项："有 CUDA/Triton Kernel 开发或 GPU 架构级性能调优经验"

**需要掌握：**
- CUDA 基础编程（kernel 编写、内存管理）
- OpenAI Triton（Python 写 GPU kernel）
- GPU 架构基础（SM、显存层级、warp）
- NCCL 通信库（分布式训练/推理）

### 四、Agent 工程（应用方向核心）

#### 4.1 Agent 核心能力

**JD 原文引用：**
- 淘天："参与 AI Agent 系统的设计与研发，探索基于大模型的任务理解、工具调用与流程编排能力"
- 钉钉："参与Agent设计、开发和维护，完成从需求到设计、开发和上线等全项目周期工作"
- 钉钉："负责将Agent落地到实际业务场景，包括但不限于Prompt工程、RAG优化、Multi-Agent构建、Memory系统、RL系统、流程编排、知识库建设、内容生成及业务流程自动化等"
- 钉钉："熟练掌握Agent架构核心组件设计原理和调优方案，对开源的 Agent 框架了解者优先，包含而不限于ADK，Prompt 调优，Function Calling，RAG，上下文工程及压缩等"

**需要掌握：**

| 能力 | 对应技术 | 相关章节 |
|------|---------|---------|
| **任务理解** | Prompt Engineering、ReAct 模式 | [03-context-engineering](/agentic-ai/03-context-engineering) |
| **工具调用** | LangChain @tool、MCP 协议、Function Calling | [05-frameworks-tools](/agentic-ai/05-frameworks-tools) |
| **流程编排** | LangGraph StateGraph、条件分支、ADK | [LangGraph 深度指南](/agentic-ai/langgraph-deep-dive) |
| **多轮对话** | MemorySaver、PostgresSaver、Memory 系统 | [07-agent-memory](/agentic-ai/07-agent-memory) |
| **人在回路** | interrupt_before、update_state | [LangGraph 深度指南](/agentic-ai/langgraph-deep-dive) |
| **多智能体** | Supervisor/Handoff 模式、Multi-Agent 构建 | [08-multi-agent](/agentic-ai/08-multi-agent) |
| **上下文压缩** | 上下文工程、Context Compression | [03-context-engineering](/agentic-ai/03-context-engineering) |
| **RL 系统** | 强化学习后训练、RLHF | [模型微调/增训](#43-模型微调增训) |

#### 4.2 RAG 系统

**JD 原文引用：**
- 淘天："对大模型技术（如 Agent、RAG、Prompt Engineering、模型推理等）有实践或深入理解"
- 淘天加分项："有 AI Agent、RAG 系统或 AI 自动化工具等相关项目经验"
- 上海AI Lab加分项："熟悉 LLM 生态工具链 (如 Hugging Face, LangChain, LoRA)"

**需要掌握：**
- 文档分块策略（按段落、按语义、固定长度）
- 向量数据库（Milvus、Chroma、FAISS）
- 检索策略（BM25 + 向量混合检索）
- 重排序（Cross-encoder Reranker）
- RAG 评估（RAGAS、DeepEval）

相关章节：[06-rag-system](/agentic-ai/06-rag-system)

#### 4.3 模型微调/增训

**JD 原文引用：**
- 上海AI Lab："预训练、增训微调、强化学习后训练、高性能推理落地的全流程工作"
- 上海AI Lab加分项："熟悉 LLM 生态工具链 (如 Hugging Face, LangChain, LoRA)"

**需要了解：**
- LoRA / QLoRA 微调
- SFT（Supervised Fine-Tuning）
- RLHF（Reinforcement Learning from Human Feedback）
- Hugging Face Transformers 库

### 五、生产部署与工程实践

#### 5.1 服务化与部署

**JD 原文引用：**
- 公安部一所："设计并实现高性能推理服务，支持大规模并发请求"
- 公安部一所："熟悉推理服务框架（如 Triton、vLLM、Ray Serve、FastAPI 等）优先"
- 上海AI Lab："设计容错、弹性伸缩的推理平台，支持多租户、高并发场景需求"
- 上海AI Lab："熟悉 Linux 开发环境与容器化技术 (Docker/K8s)"
- 平安保险："熟悉 Docker/Kubernetes，有模型服务容器化部署经验"

**需要掌握：**

| 技术 | 用途 | 学习优先级 |
|------|------|-----------|
| **FastAPI** | 快速构建 API 服务 | ★★★★★ 必学 |
| **Docker** | 容器化部署 | ★★★★★ 必学 |
| **Kubernetes** | 集群编排、弹性伸缩 | ★★★★ 重要 |
| **Triton Inference Server** | 模型服务化 | ★★★ 重要 |
| **Ray Serve** | 分布式推理服务 | ★★ 进阶 |
| **Nginx / API Gateway** | 反向代理、负载均衡 | ★★★ 重要 |

#### 5.2 分布式通信

**JD 原文引用：**
- 上海AI Lab："熟悉 NCCL、RDMA、MPI 等通信协议，有大规模分布式训练调优经验"
- 上海AI Lab："优化分布式计算、显存管理、通信效率等关键模块"
- 平安保险："了解分布式推理（TP/PP/EP）及 NCCL 等通信库"

**需要了解：**
- NCCL（NVIDIA 集合通信库）
- Tensor Parallel / Pipeline Parallel / Expert Parallel
- RDMA 基础概念

#### 5.3 工程素养

**JD 原文引用：**
- 淘天："具备良好的工程设计能力与代码质量意识"
- 淘天："具备良好的系统设计能力与技术前瞻性"
- 淘天："能够在快速变化的 AI 技术环境中持续迭代系统能力"
- 公安部一所："具备良好的工程能力和性能调优经验"
- 平安保险："认真负责，主动性强，有担当，愿意处理排障、调试、验证等基础但关键的工作"

**需要掌握：**
- Git 工作流
- 单元测试 / 集成测试
- CI/CD 基础
- 性能 profiling（cProfile、py-spy）
- 日志与监控（Prometheus、Grafana）
- 错误处理与重试机制

### 六、加分项（拉开薪资差距的关键）

| 加分项 | 出现 JD | 对应学习方向 |
|--------|---------|------------|
| **CUDA / Triton Kernel 开发** | 平安、上海AI Lab、滴滴、海翼电子 | GPU 编程 |
| **vLLM / SGLang / TensorRT-LLM 二次开发或开源贡献** | 平安、滴滴、字节跳动 | 推理框架源码 |
| **百亿以上参数大模型训练/推理落地经验** | 上海AI Lab | 分布式训练/推理 |
| **MLSys / NeurIPS / OSDI 顶会论文** | 上海AI Lab、双深科技、腾讯 | 学术研究 |
| **AI Agent / RAG 系统相关项目经验** | 淘天、钉钉 | 项目实战（本路线图第 14-17 阶段） |
| **模型部署、推理优化、向量数据库、RAG 架构** | 淘天 | 全栈 AI 工程 |
| **AI Coding 工具熟练使用** | 平安 | Claude Code / Cursor |
| **大规模推理系统经验** | 字节跳动、滴滴 | 分布式推理 |
| **GPU/NPU 异构计算算子优化** | 滴滴、腾讯、上海AI Lab | GPU 底层编程 |
| **LoRA/DPO/RLHF 大模型微调** | 双深科技、上海AI Lab | 模型增训 |
| **ACM/Kaggle 竞赛获奖** | 钉钉（阿里） | 编程竞赛 |
| **NPU/DSP 嵌入式部署** | 海翼电子（Anker） | 边缘计算 |
| **EDA 领域大模型** | 宁波数字孪生 | 垂直行业 |

### 学习路径映射

| 路线图阶段 | 覆盖的 JD 需求 | 覆盖度 |
|-----------|--------------|-------|
| 01-Python 工程基础 | 所有岗位的基础要求 | ✅ 100% |
| 02-LLM 基础 | Transformer、KV Cache、主流模型 | ✅ 100% |
| 03-Context Engineering | Prompt Engineering、RAG | ✅ 100% |
| 04-Harness Engineering | 工程质量、约束验证 | ✅ 100% |
| 05-框架与工具 | 工具调用、MCP 协议 | ✅ 100% |
| LangGraph 深度指南 | Agent 系统设计与编排 | ✅ 100% |
| 06-RAG 系统 | RAG 全流程 | ✅ 100% |
| 07-Agent 记忆 | 多轮对话记忆 | ✅ 100% |
| 08-多智能体 | Supervisor/Handoff 编排 | ✅ 100% |
| 09-Safety & Guardrails | 生产安全（淘天要求"稳定可扩展"） | ✅ 100% |
| 10-生产部署 | FastAPI + Docker + K8s | ✅ 100% |
| 12-评估与可观测性 | 质量验证、成本追踪 | ✅ 100% |
| 13-Agent 设计模式 | ReAct、Reflection 等 | ✅ 100% |
| 14-综合实战 | Agent/RAG 项目经验（淘天加分项） | ✅ 100% |
| 15-Agent 平台 | 类 OpenClaw 平台构建 | ✅ 覆盖加分项 |
| 16-生产级 RAG | 淘天加分项"RAG 架构" | ✅ 100% |
| 17-MCP Server | MCP 工具注册 | ✅ 覆盖加分项 |

**路线图未直接覆盖的部分**（需要额外学习）：

| 未覆盖 | 建议学习路径 |
|--------|------------|
| CUDA / Triton Kernel | 推荐：[CUDA Programming Guide](https://docs.nvidia.com/cuda/) + [Triton 官方教程](https://triton-lang.org/) |
| 量化技术细节（INT8/FP8） | 推荐：[BitsAndBytes 文档](https://huggingface.co/docs/bitsandbytes/) |
| 分布式训练（Megatron/Verl） | 推荐：[Megatron-LM GitHub](https://github.com/NVIDIA/Megatron-LM) |
| GPU 集群调度（K8s + GPU） | 推荐：[K8s Device Plugin for GPU](https://github.com/NVIDIA/k8s-device-plugin) |

---

## 总结：2026 年 FDE 最应该学什么

精通 PyTorch + vLLM + SGLang + Python/C++ 工程能力，掌握 CUDA/Triton GPU 优化，能写 Agent 应用（LangGraph/RAG/Multi-Agent/Memory），知道 NPU/DSP 边缘部署是怎么回事——2026 年 FDE 市场基本通吃。大厂核心差距在 **GPU 底层编程能力（CUDA/Triton）**，科研院所和传统企业（Anker、数字孪生）也在加速抢人。
