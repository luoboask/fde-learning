# FDE Knowledge Map — Image Generation Prompts (English)

## Usage
Copy any prompt below directly to Gemini 2.5 / DALL-E / Midjourney to generate the infographic.

---

## 1. FDE Full Knowledge Map

```
A clean mind-map style infographic on light cream background, titled "FDE 前沿部署工程师 — 全栈知识体系" at top center in bold dark charcoal font. Four colored branches radiating from a central node "FDE Engineer":

Branch 1 (blue, top-left) "基础认知": AI发展史与FDE岗位 / Transformer架构概述 / 模型训练与预训练后训练 / 学习路线图与能力模型

Branch 2 (green, top-right) "进阶技术": GPU架构A100/H100 / 推理引擎vLLM·TRT-LLM·SGLang / 模型量化FP16·INT8·INT4·FP8 / KV Cache优化 / 分布式并行TP·PP·MoE

Branch 3 (orange, bottom-left) "生产实战": K8s部署与自动扩缩 / 可观测性Metrics·Logging·Tracing / 成本优化自建vs云vsAPI / 多租户隔离

Branch 4 (red, bottom-right) "前沿与管理": Agent架构 / 投机解码与FP8推理 / 面试答题框架 / 团队建设与招聘

Each branch has 4-5 sub-items in smaller font. Clean connecting lines, minimalist icons for each sub-item. At the very bottom, a navy blue highlight bar: "从底层向上学 · 技术深度占面试40%". --ar 3:4
```

---

## 2. What is FDE

```
A clean vertical infographic on light cream background, titled "什么是 FDE — 前沿部署工程师" at top in bold dark charcoal font. Subtitle: "Frontier Deployment Engineer" in smaller gray italic text.

Three vertical cards side by side in the middle section:

Card 1 (blue header) "基础设施型": Icon of a gear and chip. Text: "负责推理引擎开发与底层优化 / 要求: 系统编程 + GPU底层能力 / 代表: vLLM、TensorRT团队 / 薪资: 40-80万/年"

Card 2 (green header) "应用部署型": Icon of a server and AI brain. Text: "负责业务线模型部署与性能调优 / 要求: 工程能力 + AI交叉知识 / 代表: 各互联网大厂AI部门 / 薪资: 30-60万/年"

Card 3 (orange header) "客户交付型": Icon of a handshake and presentation. Text: "负责客户场景落地与方案设计 / 要求: 技术能力 + 沟通协作 / 代表: AI解决方案公司 / 薪资: 25-50万/年"

Below the cards, a radar chart showing 5 dimensions: 技术深度40% / 架构思维25% / 成本意识15% / 前沿敏感度10% / 管理潜力10%

At the very bottom, a highlighted insight box: "FDE是工程能力+AI理解力的交叉岗位". --ar 3:4
```

---

## 3. Transformer Architecture Overview

```
A clean educational infographic on light cream background, titled "Transformer 架构全景图" at top in bold dark charcoal font.

Top section: A comparison table with 3 rows:
Row 1 "Encoder-only": Icon of BERT logo. Text: "BERT · 擅长文本理解 · 不适合生成任务 · 用于搜索和分类"
Row 2 "Decoder-only" (highlighted with green border): Icon of GPT logo. Text: "GPT/Llama/Qwen · 自回归生成 · LLM主流选择 · 训练简单高效"
Row 3 "Encoder-Decoder": Icon of T5 logo. Text: "T5/BART · 适合翻译摘要 · 推理慢需两轮计算"

Bottom section: A vertical flow diagram showing Decoder-only data flow:
Token Input → Embedding Layer → Position Encoding (RoPE) → [Transformer Block × N: RMSNorm → Self-Attention → Residual → RMSNorm → SwiGLU FFN → Residual] → Final RMSNorm → Linear(d_model, vocab_size) → Logits → Softmax Sampling → Output Token (loop back to input)

A small formula box in the center-right: "Attention(Q,K,V) = softmax(QK^T/√d_k) · V"

At the very bottom, navy blue insight bar: "LLM几乎全部采用Decoder-only · 训练简单 · 推理高效 · Scaling Law最优". --ar 3:4
```

---

## 4. LLM Training to Fine-tuning Pipeline

```
A clean step-by-step workflow infographic on light cream background, titled "LLM 从训练到微调的完整路径" at top in bold dark charcoal font. Subtitle: "你不需要从头训练大模型" in smaller gray text.

Five horizontal milestone cards connected by thick progression arrows left to right:

Card 1 "阶段1 预训练 Pre-training" (purple icon: cloud with data): "海量互联网文本数据 / 目标: 预测下一个token / 算力: 数千GPU运行数月 / 成本: 数千万美元 / 产出: 基础模型(Base Model) / 代表: Llama、GPT预训练"

Card 2 "阶段2 继续预训练 CPT" (blue icon: database): "注入领域专用数据 / 如: 代码/医学/法律 / 算力: 数百GPU运行数周 / 目标: 让模型懂你的领域 / 代表: CodeLlama、BioMedGPT"

Card 3 "阶段3 监督微调 SFT" (green icon: checklist): "精选指令数据集(数百~数千条) / 目标: 让模型学会听从指令 / 算力: 少量GPU数小时 / 格式: 对话/问答/代码 / 代表: Alpaca、Vicuna"

Card 4 "阶段4 人类对齐 RLHF/DPO" (orange icon: scale): "人类偏好标注数据 / RLHF: 3阶段复杂流程(SFT→Reward→PPO) / DPO: 1阶段直接优化(更简单) / 目标: 让输出更安全/有用"

Card 5 "阶段5 领域微调 LoRA/QLoRA" (red icon: wrench): "企业业务场景适配 / LoRA: 仅训练0.06%参数 / QLoRA: 4bit量化后单卡可训 / 数据量: 数十~数百条 / 耗时: 几十分钟~数小时"

At the very bottom, large navy blue insight box: "99%的企业只需要做阶段3-5 · 不需要从头预训练 · SFT + DPO + LoRA 就是你的最佳组合". Minimalist line art style, dark charcoal text with colored accent icons. --ar 3:4
```

---

## 5. GPU Architecture & Memory Bottleneck

```
A clean technical infographic on light cream background, titled "GPU 架构解析 — 为什么 LLM 推理是内存带宽瓶颈" at top in bold dark charcoal font.

Left section: A simplified GPU chip cross-section diagram showing layers from top to bottom:
Top: HBM3 Memory Stack (H100: 3.35TB/s bandwidth)
Middle: L2 Cache (shared across all SMs)
Bottom: SM Array (Streaming Multiprocessors)
  ├ CUDA Cores (scalar math)
  ├ Tensor Cores (FP8/FP16/INT8 matrix multiply)
  ├ SRAM / L1 Cache
  └ Register File

Center section: Two GPU comparison cards side by side:
"A100" card: FP16 312 TFLOPS · HBM2e 2.0TB/s · 80GB · ~$1.5万
"H100" card (highlighted green): FP8 1978 TFLOPS · HBM3 3.35TB/s(+67%) · 80GB · ~$3万

Right section: A large comparison callout box showing:
"Decode阶段 memory-bound 分析"
"计算时间: 0.45ms (140 GFLOPs / 312 TFLOPs)"
"权重加载: 70ms (140GB / 2.0TB/s)"
"GPU利用率: 0.45/70 ≈ 0.6%"
"结论: GPU算术单元99%时间在等数据"

At the very bottom, large navy blue insight box: "推理优化的本质是减少数据搬运 · 不是增加计算 · 所以量化和KV Cache优化才是核心". --ar 3:4
```

---

## 6. Four Inference Engines Compared

```
A clean comparison infographic on light cream background, titled "四大推理引擎架构深度对比" at top in bold dark charcoal font.

Four vertical cards stacked vertically, each with a colored header bar and icon:

Card 1 "vLLM" (blue): Icon of a page/speed symbol. "核心技术: PagedAttention(虚拟块→物理块映射) / 关键特性: Continuous Batching · Chunked Prefill · Prefix Caching / 吞吐: 2-4x 提升 vs 传统方式 / 适用: 通用部署首选 / 代表用户: OpenRouter、Together AI"

Card 2 "TRT-LLM" (red): Icon of a compiler/gear. "核心技术: TensorRT图编译优化 / 关键特性: Kernel Fusion · FP8/INT8原生支持 · In-flight Batching / 吞吐: 1.2-2x vs vLLM / 适用: 极致性能场景 / 代表用户: NVIDIA、字节跳动"

Card 3 "SGLang" (green): Icon of a tree/structure. "核心技术: RadixAttention + 结构化生成 / 关键特性: 前缀缓存复用 · JSON约束输出 · 并行采样 / 吞吐: Agent场景2-5x加速 / 适用: Agent / Function Calling / 代表用户: 多家Agent创业公司"

Card 4 "TGI" (purple): Icon of a HuggingFace logo. "核心技术: HuggingFace官方集成 / 关键特性: 简单部署 · 模型支持广 · safetensors / 适用: 快速原型 · 小规模部署 / 代表用户: 初创团队、学术机构"

At the very bottom, large navy blue insight bar: "通用选vLLM · 极致性能选TRT-LLM · Agent选SGLang · 快速原型选TGI". --ar 3:4
```

---

## 7. Quantization Landscape

```
A clean vertical infographic on light cream background, titled "模型量化方案全景 — 从 FP32 到 INT4" at top in bold dark charcoal font.

Top section: A descending staircase visualization showing precision levels from left to right:
Step 1 "FP32": 32bit · 70B=280GB · 零损失 · 不用于推理(large crossed-out icon)
Step 2 "FP16": 16bit · 70B=140GB · 零损失 · 当前主流(green checkmark)
Step 3 "FP8": 8bit · 70B=70GB · 损失0.5-1.5% · H100专属(H100 chip icon)
Step 4 "INT8": 8bit · 70B=70GB · 损失<0.5% · 通用量化(green checkmark)
Step 5 "INT4": 4bit · 70B=35GB · 损失1-2% · 单卡可部署(large red highlight)

Middle section: Three quantization strategy cards:
"PTQ 训练后量化": 无需训练 · 几分钟搞定 · 适合INT8 · 精度损失小
"QAT 量化感知训练": 需少量微调 · 精度更高 · 适合INT4 · 耗时数小时
"GPTQ/AWQ": 按通道/按张量优化 · 逐层量化 · INT4最佳方案

Bottom section: A before/after visual comparison:
Before: "FP16 · 70B · 140GB · 需要2-3张A100"
Arrow → After: "INT4 · 70B · 35GB · 单张A100 40GB即可部署"
With large red text "75% 显存节省"

At the very bottom, navy blue insight bar: "70B模型INT4量化后35GB · 单卡部署成为可能 · 量化是成本优化的第一板斧". --ar 3:4
```

---

## 8. Distributed Parallel Strategies

```
A clean technical infographic on light cream background, titled "LLM 分布式推理 — 五大并行策略" at top in bold dark charcoal font.

Five horizontal cards stacked vertically, each with a mini diagram:

Card 1 "DP 数据并行" (blue): Diagram showing 4 identical GPUs each receiving different requests. "每个GPU放完整模型副本 / 通信: 无(独立推理) / 效果: 线性增加吞吐 / 场景: 多用户并发服务"

Card 2 "TP 张量并行" (red): Diagram showing a single matrix split across 4 GPUs with AllReduce arrows. "单层内切分矩阵(QKV切分到不同GPU) / 通信: AllReduce每层同步 / 要求: NVLink域内低延迟 / 场景: 70B模型单请求推理"

Card 3 "PP 流水线并行" (green): Diagram showing layers split: GPU0=layer0-39, GPU1=layer40-79, with Send/Recv arrows. "按层切分到不同GPU / 通信: Send/Recv层间传递 / 优势: 可跨节点部署 / 场景: 超大模型+多节点"

Card 4 "EP Expert并行" (orange): Diagram showing MoE with experts scattered across GPUs, AllToAll routing arrows. "MoE场景Expert分散 / 通信: AllToAll路由token / 优势: 扩展性最好 / 场景: Mixtral等MoE模型"

Card 5 "CP 上下文并行" (purple): Diagram showing a long sequence split into segments with Ring Attention arrows. "超长序列分段处理 / 通信: Ring AllReduce / 场景: 128K+长上下文推理"

Right side: A decision tree box:
"70B单请求 → TP=8(8卡NVLink)"
"多请求高吞吐 → DP+TP混合"
"MoE模型 → TP+EP"
"超长上下文 → CP"

At the very bottom, navy blue insight bar: "70B模型最常用TP=8 · 8卡A100/H100 NVLink域内 · 每卡约17.5GB模型+KV Cache". --ar 3:4
```

---

## 9. Production Deployment Architecture

```
A clean system architecture infographic on light cream background, titled "LLM 推理服务生产部署架构" at top in bold dark charcoal font.

A bottom-to-top layered architecture diagram with 5 layers:

Layer 1 (bottom, gray) "基础设施层": Icon of K8s cluster and GPU servers. "K8s集群 / GPU节点(A100/H100 8卡服务器) / 高速网络(InfiniBand/RoCE)"

Layer 2 (blue) "推理引擎层": Icon of vLLM logo. "vLLM / TRT-LLM / SGLang Pod / 模型热加载与版本管理 / PagedAttention显存管理 / Continuous Batching调度"

Layer 3 (green) "服务层": Icon of API gateway. "API Gateway(路由·限流·认证) / Model Router(按请求路由到不同模型) / Load Balancer(负载均衡)"

Layer 4 (orange) "可观测性层": Three small icons side by side. "Metrics: Prometheus+Grafana(GPU利用率·TTFT·TPS) / Logging: ELK/Loki(请求日志·错误追踪) / Tracing: Jaeger(链路追踪)"

Layer 5 (top, purple) "自动扩缩层": Icon of scaling arrows. "KEDA/HPA / 基于队列长度自动伸缩 / 基于GPU利用率弹性扩缩 / 冷启动<30s"

Arrows connecting layers bottom to top with request flow direction.

At the very bottom, navy blue insight bar: "生产部署不只是跑个模型 · 是可观测·可扩缩·可容灾的系统工程". --ar 3:4
```

---

## 10. Autoscaling & Disaster Recovery

```
A clean two-column infographic on light cream background, titled "LLM 服务自动扩缩与容灾策略" at top in bold dark charcoal font.

Left column (green header) "自动扩缩策略":

Box 1 "水平扩缩 HPA": "基于QPS阈值(>100 QPS扩容) / 基于队列长度(>50排队扩容) / 基于GPU利用率(>80%扩容)"

Box 2 "KEDA 事件驱动": "消息队列积压→自动扩容 / Redis队列深度触发 / 支持自定义指标"

Box 3 "预热策略": "新模型预加载到空闲Pod / 冷启动<30s / 模型权重预热缓存"

Box 4 "缩容策略": "空闲5分钟→缩减到最小副本 / 闲时从8卡缩到2卡 / 成本降60%+"

Right column (red header) "容灾策略":

Box 1 "单Pod故障": "K8s自动重启 / 请求重路由到健康Pod / 恢复时间<10s"

Box 2 "单GPU故障": "TP降级(TP=8→TP=4) / 队列等待+告警 / 自动替换GPU节点"

Box 3 "单节点故障": "跨节点PP部署 / 自动failover到备用节点 / 数据不丢失"

Box 4 "全区域故障": "多Region部署 / DNS故障转移 / RPO<1min RTO<5min"

Box 5 "模型回滚": "新版本异常→秒级切回旧版本 / A/B灰度发布 / 健康检查拦截"

At the very bottom, large navy blue insight box: "自动扩缩是成本优化的关键 · 容灾是高可用的底线 · 两者缺一不可". --ar 3:4
```

---

## 11. LLM Inference Cost Breakdown

```
A clean financial infographic on light cream background, titled "LLM 推理成本全拆解" at top in bold dark charcoal font.

Top section: A donut chart showing cost breakdown:
GPU计算 70% (largest slice, red): "A100 ~$1.5万/张 · H100 ~$3万/张"
显存存储 15% (blue): "模型权重 + KV Cache + 数据"
网络带宽 10% (green): "API调用 · 数据传输 · CDN"
运维人力 5% (gray): "监控·扩缩·故障处理"

Middle section: Five cost optimization strategies shown as descending arrows:

Arrow 1 "量化 FP16→INT4": Large green "↓75%" label. "显存从140GB降到35GB"
Arrow 2 "模型蒸馏 70B→13B": Large green "↓80%" label. "精度损失仅2-3%"
Arrow 3 "Continuous Batching": Large green "↑2-3x" label. "吞吐翻倍"
Arrow 4 "自动扩缩闲时缩容": Large green "↓40-60%" label. "按需使用GPU"
Arrow 5 "Prefix Caching": Large green "零计算" label. "重复prompt直接返回"

Bottom section: A before/after cost comparison:
"优化前: 70B FP16 · 8张H100 · 月成本$24万"
Arrow → "优化后: 70B INT4 + Batching + 缩容 · 月成本$5万"
With large red text "↓79% 总成本"

At the very bottom, navy blue insight bar: "量化+扩缩+batching三板斧 · 推理成本可降80%+". --ar 3:4
```

---

## 12. Frontier Technology Roadmap

```
A clean timeline infographic on light cream background, titled "LLM 推理前沿技术路线图" at top in bold dark charcoal font. Subtitle: "从已成熟到前沿探索" in smaller gray text.

Three colored timeline sections from left to right:

Section 1 "已成熟 2023-2024" (green background with checkmark icons):
✅ PagedAttention(vLLM) — 显存利用率90%+
✅ Continuous Batching — 吞吐提升2-3x
✅ INT8/FP8量化 — 显存减半精度损失<1%
✅ GQA/MQA Attention — KV Cache减少4-32倍

Section 2 "正在普及 2024-2025" (orange background with refresh icons):
🔄 Speculative Decoding — 小模型draft+大模型验证, 2-4x加速
🔄 KV Cache量化 — INT8 KV/FP8 KV, 显存再降50%
🔄 Chunked Prefill — 长prompt分段处理, 消除首token延迟峰值
🔄 Multi-LoRA服务 — 单实例服务多个微调模型

Section 3 "前沿探索 2025+" (purple background with microscope icons):
🔬 MoE推理优化 — Expert并行+动态路由, 激活参数仅10%
🔬 端侧推理 — 手机/边缘设备跑LLM, 7B模型INT4
🔬 光子计算推理 — 光学矩阵乘法, 理论速度100x
🔬 无KV Cache推理 — MLA架构/状态空间模型

At the very bottom, navy blue insight bar: "跟踪前沿但不盲目追新 · 生产环境以稳定为先 · 成熟的PagedAttention+量化足够用2年". --ar 3:4
```

---

## 13. FDE Interview Answer Framework

```
A clean educational infographic on light cream background, titled "FDE 面试 — 高分答题框架" at top in bold dark charcoal font.

Center section: A circular four-step process diagram:

Step 1 (blue, top) "澄清问题": Icon of magnifying glass.
"您指的是prefill还是decode场景?"
"是单卡还是多卡环境?"
"关注延迟还是吞吐?"
Subtitle: "先搞清楚面试官在问什么"

Step 2 (green, right) "给出结论": Icon of checkmark.
"我的建议是TP=8 + vLLM + INT8量化"
Subtitle: "一句话先给结论"

Step 3 (orange, bottom) "支撑论据": Icon of bar chart.
"70B模型FP16需140GB显存, 单卡放不下"
"TP=8分摊到8卡, 每卡17.5GB + KV Cache约40GB"
"在A100 80GB显存范围内, 安全余量充足"
Subtitle: "用数据和公式说话"

Step 4 (red, left) "补充trade-off": Icon of balance scale.
"如果追求极致性能, 可考虑TRT-LLM+FP8"
"但需要更多编译和调优时间"
"vLLM是更安全的选择, 社区活跃"
Subtitle: "展示你有多角度思考"

Right side: A small pie chart showing interview topic distribution:
技术深度40% / 架构设计25% / 成本分析15% / 前沿认知10% / 管理协作10%

At the very bottom, large navy blue insight box: "结构化表达 > 死记硬背 · 展示你的trade-off思维 · 面试官看重的是推理过程不是答案". --ar 3:4
```

---

## 14. AI Team Building & Hiring

```
A clean four-quadrant infographic on light cream background, titled "AI 技术团队 — 从招聘到培养体系" at top in bold dark charcoal font.

Top-left quadrant (blue header) "招聘策略":
技术面: 编码能力 + 系统设计 + AI基础
项目面: 真实项目经历(STAR方法)
文化面: 学习能力·抗压·协作
加分项: 开源贡献·技术博客·论文
小字: "不要只看学历, 看实际产出"

Top-right quadrant (green header) "成长路径":
初级(1-2年): 独立完成部署任务
中级(3-5年): 负责服务架构设计
高级(5年+): 技术规划 + 团队管理
专家级: 行业影响力·技术预研
小字: "给每个人清晰的目标和晋升通道"

Bottom-left quadrant (orange header) "培训机制":
技术分享会: 每周1次(轮流讲)
论文共读: 每月2篇前沿论文
实验平台: 每人都有GPU环境
外部会议: 每年2-3个技术大会
小字: "投资团队成长是最好的留人方式"

Bottom-right quadrant (purple header) "知识管理":
内部Wiki: 技术方案沉淀
Runbook: 故障排查手册
代码Review: 质量把关
Onboarding: 新人7天上手
小字: "好文档让新人效率提升3倍"

At the very bottom, navy blue insight bar: "好团队不是招到牛人 · 是让普通人变优秀 · 体系 > 个人英雄主义". --ar 3:4
```

---

## 15. Hands-on Lab Roadmap

```
A clean step-by-step infographic on light cream background, titled "FDE 动手实验 — 从零到生产的6个实验" at top in bold dark charcoal font. Subtitle: "动手做一遍比看十遍文档有用" in smaller gray text.

Six lab cards stacked vertically, connected by a progression arrow on the left side, difficulty increasing from green to red:

Lab 1 "🟢 Level 1: vLLM部署7B模型" (green): "目标: 用vLLM启动Qwen2.5-7B / 测试: TTFT(首token延迟)和TPS / 硬件: 单卡RTX 4090或A10 / 耗时: 30分钟 / 产出: 能跑通API调用"

Lab 2 "🟢 Level 2: 模型量化实战" (green): "目标: 7B模型FP16→INT8→INT4 / 工具: GPTQ / AWQ / bitsandbytes / 测试: 量化前后精度和速度对比 / 耗时: 1小时 / 产出: 理解量化trade-off"

Lab 3 "🟡 Level 3: 性能Profiling" (yellow): "目标: 用nsight profiler找瓶颈 / 操作: 记录GPU利用率/显存带宽 / 产出: 火焰图 + 瓶颈分析报告 / 耗时: 2小时 / 学会: 找到memory-bound证据"

Lab 4 "🟡 Level 4: Batch Size调优" (yellow): "目标: 测试batch=1/4/8/16/32 / 测量: 每个batch的吞吐和延迟 / 产出: 最优batch推荐曲线 / 发现: batch越大吞吐越高但延迟也越高"

Lab 5 "🟠 Level 5: 张量并行实验" (orange): "目标: 2-4卡跑TP=2/4的70B模型 / 观察: NVLink vs PCIe的通信开销 / 产出: 不同TP配置的性能对比 / 发现: NVLink比PCIe快3-5x"

Lab 6 "🔴 Level 6: OOM故障排查" (red): "目标: 模拟OOM并学会解决 / 场景: batch过大/KV Cache溢出 / 技能: 显存分析·KV Cache管理·降级策略 / 产出: 排查手册 + 解决方案"

At the very bottom, large navy blue insight box: "6个实验从部署→量化→Profiling→调优→分布式→排障 · 完整覆盖FDE日常工作的每个环节 · 建议每个周末做一个". --ar 3:4
```

---

## Usage Tips

1. Order: Start from Prompt 1 (overview), then follow the learning path
2. Each prompt is standalone — no context needed
3. Works best with Gemini 2.5 (image generation), DALL-E 3, or Midjourney v6
4. Recommended tags for social sharing: #FDE #AIDeployment #LLM #InferenceOptimization #GPU #vLLM
