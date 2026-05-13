# FDE 全文档图解 Prompt 集合

## 使用方法
每个文档对应一个 prompt，复制到 Gemini 2.5 / DALL-E 3 生成信息图。

---

# Module 01: AI 基础认知

## 01-01. AI 发展史关键转折点

```
A clean vertical timeline infographic on light cream background (#FAF8F5), titled "AI 发展史 — 从 1950 到 2026" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "每个时代的关键突破" in gray 18px.

A vertical timeline line (4px wide, gray #CCC) runs from top to bottom on the left side, with circular milestone nodes alternating left and right:

Node 1 (top, left side, gray circle) "1950 图灵测试":
🧠 brain icon
"图灵提出'机器能思考吗？'"
"图灵测试: 人类无法区分机器与人类"

Node 2 (right, blue circle) "2006 深度学习诞生":
📊 chart icon
"Hinton 提出 Deep Belief Network"
"多层神经网络训练成为可能"

Node 3 (left, orange circle) "2012 AlexNet":
⚡ lightning icon
"GPU 训练 CNN · ImageNet 夺冠"
"比第二名快 10%"
"GPU 训练速度 50x 于 CPU"

Node 4 (right, green circle) "2017 Transformer":
🔄 transformer icon
"Attention Is All You Need"
"取代 RNN/CNN 成为新范式"

Node 5 (left, purple circle) "2020 GPT-3":
📝 writing icon
"175B 参数 · In-context Learning"
"不需要微调就能完成新任务"

Node 6 (right, red circle) "2022 ChatGPT":
💬 chat icon
"RLHF 对齐 · 改变世界"
"用户破亿最快纪录"

Node 7 (left, blue circle) "2023 Llama 开源":
📦 box icon
"降低 LLM 门槛 · 开源生态爆发"

Node 8 (right, green circle) "2024 GPT-4o":
🎨 palette icon
"原生多模态 · 实时语音/视觉"

Node 9 (left, red circle, highlighted) "2025 FDE 岗位爆发":
👤 person icon
"FDE 岗位增长率 800%"
"推理优化成为核心竞争力"

At the very bottom, navy blue bar with white text: "理解历史才能判断未来 · 每次突破都是'架构创新 + 算力提升'的组合". --ar 3:4
```

## 01-02. 什么是 FDE

```
A clean vertical infographic on light cream background (#FAF8F5), titled "什么是 FDE — 前沿部署工程师" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "Frontier Deployment Engineer" in gray italic 20px.

Top definition box (navy blue #1B3A5C, white text):
"FDE = 将大模型高效部署到生产环境的工程师"
"核心目标: 用最低成本 提供最高性能 的 LLM 推理服务"

Middle section: Three evaluation dimensions as horizontal cards with icons:

Card 1 (blue) "面试考察什么？":
🎯 target icon
"技术深度: 推理引擎、GPU、系统编程"
"架构思维: 系统设计、技术选型、trade-off"
"成本意识: GPU 成本、优化方案、ROI"
"前沿敏感度: 新模型/技术了解"
"管理潜力: 团队管理、跨团队协作"

Card 2 (green) "谁在招 FDE？":
🏢 building icon
"云厂商: AWS/GCP/阿里云"
"AI 公司: OpenAI/Anthropic/智谱"
"互联网大厂: 字节/腾讯/百度"
"AI 创业公司: Agent/基础设施"
"金融/医疗: 垂直行业应用"

Card 3 (orange) "FDE 的日常":
🔧 wrench icon
"部署调优: 模型上线、参数调优"
"性能分析: profiling、找瓶颈"
"成本控制: 量化、扩缩、batching"
"故障排查: OOM、延迟飙升"
"技术选型: 评估新引擎/框架"

Bottom section: Three suitability indicators:
"适合你 ✅" (green): "喜欢底层优化 / 关注性能细节 / 有系统工程经验"
"可能不适合 ❌" (red): "只想做算法 / 不喜欢调试 / 对硬件不感兴趣"

At the very bottom, navy blue bar with white text: "FDE 不是纯算法岗也不是纯运维岗 · 是工程能力+AI 理解力的交叉岗位". --ar 3:4
```

## 01-03. FDE 的三种类型

```
A clean comparison infographic on light cream background (#FAF8F5), titled "FDE 的三种类型 — 你适合哪一种？" at top in bold dark charcoal (#2D2D2D) 44px font.

Three vertical cards side by side, each with a colored top border and large icon:

Card 1 "Type A 基础设施型" (blue top border #4A90D9):
⚙️ large gear icon (60px)
Description: "负责推理引擎开发与底层优化"
Skills required: "系统编程 (C++/CUDA) / GPU 底层能力 / 编译器知识"
Daily work: "写 kernel · 做 profiling · 优化 PagedAttention · 开发新特性"
Representative: "vLLM 团队 · TensorRT-LLM 团队 · NVIDIA"
Salary range: "40-80万/年" in large blue text
Difficulty: "⭐⭐⭐⭐⭐"

Card 2 "Type B 应用部署型" (green top border #4CAF50):
🖥️ large server icon (60px)
Description: "负责业务线模型部署与性能调优"
Skills required: "工程能力 (Python/Go) / AI 交叉知识 / K8s"
Daily work: "部署模型 · 调参数 · 做监控 · 优化成本 · 故障排查"
Representative: "字节 AI Lab · 阿里通义 · 各厂 AI 部门"
Salary range: "30-60万/年" in large green text
Difficulty: "⭐⭐⭐⭐"

Card 3 "Type C 客户交付型" (orange top border #FF9800):
🤝 large handshake icon (60px)
Description: "负责客户场景落地与方案设计"
Skills required: "技术能力 + 沟通协作 / 方案设计 / 项目管理"
Daily work: "客户需求调研 · PoC 验证 · 系统集成 · 交付培训"
Representative: "AI 解决方案公司 · 云厂商交付团队"
Salary range: "25-50万/年" in large orange text
Difficulty: "⭐⭐⭐"

Below cards: A decision matrix:
"喜欢写 C++/CUDA？ → Type A"
"喜欢部署调优？ → Type B"
"喜欢和客户沟通？ → Type C"
"都可以？ → 先 B 后 A 或 C"

At the very bottom, navy blue bar with white text: "三种类型没有优劣之分 · 核心是找到与你的技能兴趣匹配的那个". --ar 3:4
```

## 01-04. 学习路线图

```
A clean journey roadmap infographic on light cream background (#FAF8F5), titled "FDE 学习路线图 — 12 周从零到面试" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "每周都有明确目标和产出" in gray 18px.

A winding road/path illustration from bottom-left to top-right, with 6 milestone stations:

Station 1 "Week 1-2 入门篇" (blue flag 🚩):
"了解 FDE 岗位认知"
"AI 发展史关键节点"
"Transformer 架构概述"
"产出: 能清晰描述 FDE 做什么"

Station 2 "Week 3-4 模型架构" (green flag 🟢):
"LLM 训练流程 (Pre-train/SFT/RLHF)"
"Attention 机制深入 (MHA/GQA/MQA)"
"KV Cache 原理与显存计算"
"产出: 能解释推理两阶段差异"

Station 3 "Week 5-6 推理引擎" (yellow flag 🟡):
"vLLM 架构与 PagedAttention"
"TRT-LLM 编译优化"
"SGLang RadixAttention"
"产出: 能对比选择推理引擎"

Station 4 "Week 7 GPU+量化" (orange flag 🟠):
"GPU 架构与显存模型"
"性能瓶颈分析 (compute/memory bound)"
"量化方案 (INT8/INT4/FP8)"
"产出: 能做显存计算与量化决策"

Station 5 "Week 8-9 部署实战" (red flag 🔴):
"分布式并行 (TP/PP/EP)"
"K8s 部署与自动扩缩"
"可观测性 (Metrics/Logging/Tracing)"
"产出: 能设计生产部署架构"

Station 6 "Week 10-12 面试+管理" (purple flag 🟣):
"面试答题框架 (四步法)"
"项目故事 (STAR 格式)"
"团队建设与招聘体系"
"产出: 能用结构化框架回答面试问题"

At the very bottom, navy blue bar with white text: "按顺序学习 每个阶段是下一个的基础 · 不要跳步". --ar 3:4
```

---

# Module 02: 模型架构

## 02-01. Transformer 架构全景

```
A clean educational infographic on light cream background (#FAF8F5), titled "Transformer 架构全景图" at top in bold dark charcoal (#2D2D2D) 44px font.

Top section: Three architecture comparison cards:

Card 1 "Encoder-only" (gray border): 📖 icon · "BERT · 擅长理解 · 不适合生成 · 用于搜索/分类/NER"
Card 2 "Decoder-only" (thick green border, highlighted): 🧠 icon · "GPT/Llama/Qwen · 自回归生成 · LLM主流 · 训练简单" (green badge "主流")
Card 3 "Encoder-Decoder" (gray border): 🔄 icon · "T5/BART · 适合翻译摘要 · 推理慢需两轮"

Middle section: Data flow pipeline (left to right with arrows):
[Token "Hello"] → [Embedding d_model×vocab] → [Position RoPE] → [Block × N: RMSNorm → Self-Attention(Q,K,V) → Residual → RMSNorm → SwiGLU FFN → Residual] → [Final Norm] → [Linear→Logits] → [Softmax→Token] ↩️(loop back)
Each step in a rounded rectangle with small icon. Formula floating top-right: "Attention(Q,K,V) = softmax(QK^T/√d_k)·V" with colored Q(red) K(blue) V(green).

Bottom section: Two phase comparison:

Prefill box (blue): ⚡ icon
"一次性并行处理所有 prompt"
"compute-bound · GPU利用率 80-95%"
"O(n²) 复杂度 · 占 5-15% 时间"

Decode box (red): 🔄 icon
"逐个生成 token 每步依赖上一步"
"memory-bound · GPU利用率 10-30%"
"占 85-95% 时间 · 优化核心战场"

Large red badge between them: "Decode 占总时间 85-95%"

At the very bottom, navy blue bar with white text: "LLM几乎全部采用Decoder-only · 推理优化核心在Decode不在Prefill". --ar 3:4
```

## 02-02. LLM 训练流程

```
A clean step-by-step workflow infographic on light cream background (#FAF8F5), titled "LLM 训练全流程 — 从预训练到对齐" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "理解训练过程 才知道部署优化在哪" in gray 18px.

Three main stage cards connected by thick arrows:

Stage 1 "预训练 Pre-training" (purple header #9C27B0):
🔵 cloud+data icon
"目标: 预测下一个token (Next Token Prediction)"
"数据: 万亿token级互联网文本"
"Loss: Cross-entropy over vocabulary"
"算力: 数千GPU运行数月"
"产出: Base Model (有语言能力但不会对话)"
"代表: Llama预训练、GPT预训练"
Cost bar: "$$$$" (4 red bars)
Time bar: "数月" (4 blue bars)

Stage 2 "监督微调 SFT" (green header #4CAF50):
🟢 checklist icon
"目标: 让模型学会听从指令"
"数据: 数百~数千条精选指令"
"Loss: 只对 answer 部分计算 loss"
"算力: 少量GPU 数小时~数天"
"产出: 能按指令完成任务的模型"
"代表: Alpaca、Vicuna"
Cost bar: "$" (1 green bar)
Time bar: "数小时" (1 yellow bar)

Stage 3 "人类对齐" (orange header #FF9800):
🟠 balance scale icon
Two sub-methods side by side:

"RLHF (传统方式)":
Step 1: SFT
Step 2: 训练 Reward Model (人类偏好标注)
Step 3: PPO 优化 (4个模型协作)
复杂度: ⭐⭐⭐⭐⭐

"DPO (新方式 推荐)":
直接优化: π(y|x) ∝ exp(r(x,y))
只需1个模型 无需 Reward Model
简单稳定 效果接近 RLHF
复杂度: ⭐⭐⭐

Key insight box (yellow): "99%企业从SFT开始 · 不需要预训练"

At the very bottom, navy blue bar with white text: "预训练是军备竞赛 · SFT+对齐才是企业能做的事 · DPO 比 RLHF 更简单". --ar 3:4
```

## 02-03. 预训练 vs 后训练

```
A clean comparison infographic on light cream background (#FAF8F5), titled "预训练 vs 后训练 — 一行话说清" at top in bold dark charcoal (#2D2D2D) 44px font.

Top highlight box (green):
"预训练 = 教模型'说话' (学习语言规律)"
"后训练 = 教模型'听话' (按人类期望输出)"

Full comparison table with 8 rows:

Row 1 "目的": 学习语言规律 (blue) | 按人类期望输出 (green)
Row 2 "数据": 万亿token互联网文本 | 数百~数万条精选指令/偏好
Row 3 "Loss": 预测下一个token | 指令跟随/人类偏好优化
Row 4 "算力": 数千GPU 数月 ($$$$, weeks) | 少量GPU 数天 ($, days)
Row 5 "产出": Base Model (有语言能力) | Instruct Model (会对话)
Row 6 "难度": 极高 (工程+算法挑战) | 中等 (有成熟框架)
Row 7 "企业能做吗": 99%不能 | 都能做
Row 8 "代表": Llama预训练/GPT预训练 | Alpaca/Vicuna/ChatGPT

Bottom insight section:
Scaling Law mini-box:
"Chinchella: 最优训练时 N(params) 和 D(tokens) 应等比例增加"
"70B 模型最优 ≈ 1.4T tokens"
"FDE视角: 预训练规模决定了部署时的显存和算力需求"

At the very bottom, navy blue bar with white text: "预训练决定了模型有多聪明 · 后训练决定了模型有多好用". --ar 3:4
```

## 02-04. Scaling Law

```
A clean data-driven infographic on light cream background (#FAF8F5), titled "Scaling Law — 大模型的物理定律" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "三个关键论文决定模型该怎么训练" in gray 18px.

Three paper cards stacked vertically:

Card 1 "Kapling et al. 2020" (blue):
📄 paper icon
标题: "Scaling Laws for Neural Language Models"
核心发现: "Loss 随 compute/data/params 幂律下降"
公式: "L(C) = (C_c/C)^α + L_∞" (monospace)
含义: "compute 增加 N 倍 → loss 降低 N^α"
对FDE的启示: "更大的模型 = 更大的显存 + 更长的推理时间"

Card 2 "Chinchilla 2022" (green, highlighted):
📄 paper icon + green "关键" badge
标题: "Training Compute-Optimal Large Language Models"
核心发现: "params 和 tokens 应等比例缩放"
公式: "N_optimal ∝ C^(1/2), D_optimal ∝ C^(1/2)"
含义: "70B 模型最优 ≈ 1.4T tokens (不是直觉上的更多)"
对FDE的启示: "Chinchella 最优模型在推理时性能最好"

Card 3 "DeepMind 2024" (orange):
📄 paper icon
标题: "Grandmaster-level Chess with GPT-scale model"
核心发现: "Scaling Law 不仅适用于 pre-training 也适用于 inference"
对FDE的启示: "模型越大 推理优化的价值越大 (因为基数大)"

Bottom section: Compute Budget Calculator:
"估算 70B 模型训练 compute:"
"6 × N × D = 6 × 70B × 1.4T = 2.5 × 10²⁴ FLOPs"
"H100 (312 TFLOPs): ≈ 8,000,000 GPU-seconds ≈ 3000张H100 × 60天"

At the very bottom, navy blue bar with white text: "Scaling Law 是训练的铁律 · 但 FDE 关注的是推理端的延伸: 更大的模型意味着更大的优化空间". --ar 3:4
```

## 02-05. Attention 机制深入

```
A clean technical infographic on light cream background (#FAF8F5), titled "Attention 机制深入 — MHA vs GQA vs MQA" at top in bold dark charcoal (#2D2D2D) 44px font.

Top formula box (white with shadow):
"Attention(Q,K,V) = softmax(QK^T/√d_k) · V"
Dimensions: Q,K,V = [batch, seq_len, num_heads, head_dim]

Three mechanism diagrams side by side:

Diagram 1 "MHA 多头注意力" (gray border):
Q heads: 32 (blue circles)
K heads: 32 (red circles)  ← 1:1 对应
V heads: 32 (green circles)
KV Cache: 最大 (32份)
代表: 早期 GPT、BERT
Badge: "质量最好 显存最大"

Diagram 2 "GQA 分组查询注意力" (thick green border, highlighted):
Q heads: 32 (blue circles, grouped into 8 groups of 4)
K heads: 8 (red circles) ← 4:1 对应
V heads: 8 (green circles)
KV Cache: 减少 4 倍
代表: Llama 3 70B、Mistral
Badge (green): "生产环境最优"

Diagram 3 "MQA 多查询注意力" (orange border):
Q heads: 32 (blue circles)
K heads: 1 (single red circle) ← 32:1 对应
V heads: 1 (single green circle)
KV Cache: 最小 (1份)
代表: 早期实验性模型
Badge: "显存最小 质量略降"

KV Cache comparison bar chart:
MHA: ████████████████████ 100%
GQA: ████████ 25% (↓75%)
MQA: █ 3% (↓97%)

At the very bottom, navy blue bar with white text: "GQA是生产环境最优解 · KV Cache减少4倍 质量几乎不降 · Llama 3 70B 采用". --ar 3:4
```

## 02-06. KV Cache 深入

```
A clean technical infographic on light cream background (#FAF8F5), titled "KV Cache 深入 — 推理优化的核心战场" at top in bold dark charcoal (#2D2D2D) 44px font.

Top section: Formula card (white with large formula):
"KV Cache 显存 = 2 × num_layers × batch × seq_len × num_kv_heads × head_dim × 2 bytes"
Small annotations: "2=K+V" "layers=模型层数" "2 bytes=FP16"

Example calculation box (light blue):
"Llama 3 70B · batch=32 · seq=4096 · GQA(8 KV heads)"
"= 2 × 80 × 32 × 4096 × 8 × 128 × 2"
"= 80 GB"
With red highlight: "占 A100 80GB 显存的 60-80%!"

Middle section: Memory layout comparison:

Left "传统连续分配" (gray border, crossed-out):
📦 fragmentation diagram
"传统方式: 为每个请求连续分配 KV Cache"
"问题: 请求长度不同 → 大量碎片"
"显存利用率: 20-40%"
"结果: 明明有显存却 OOM"

Right "PagedAttention" (green border, highlighted):
📋 page mapping diagram (virtual→physical blocks)
"vLLM方案: 虚拟块→物理块按需映射"
"类比操作系统虚拟内存"
"显存利用率: 90%+"
"结果: 吞吐提升 2-4x"

Bottom section: KV Cache compression techniques (3 small cards):
"INT8 KV量化": 显存减半 精度损失<0.5%
"Prefix Caching": 重复prompt零计算
"PagedAttention": 消除碎片 利用率90%+

At the very bottom, navy blue bar with white text: "KV Cache通常占推理显存60-80% · 是FDE优化的核心战场". --ar 3:4
```

## 02-07. FFN、归一化与位置编码

```
A clean technical infographic on light cream background (#FAF8F5), titled "Transformer 三大组件 — FFN、归一化与位置编码" at top in bold dark charcoal (#2D2D2D) 44px font.

Three sections stacked vertically:

Section 1 "FFN 前馈网络" (blue):
🔷 cube icon
对比表:
"传统 FFN": linear→GELU→linear · 2/3 参数
"Gated FFN (SwiGLU)": linear→SwiGLU×2→linear · 3×参数
"参数占比推导": FFN ≈ 2/3 模型参数 · Attention ≈ 1/3
"为什么FFN参数多": FFN是知识存储区域 · 越大知识越多

Section 2 "归一化 Normalization" (green):
📊 bar icon
对比:
"Pre-Norm": Norm→Attention→Residual · 训练稳定(主流)
"Post-Norm": Attention→Residual→Norm · 表达力强但难训练
"RMSNorm vs LayerNorm": RMSNorm去掉均值归一化 · 快7-64% · Llama采用

Section 3 "位置编码 Position Encoding" (orange):
📍 pin icon
对比:
"RoPE (旋转位置编码)": 通过旋转注入相对位置 · 外推性好 · Llama/Qwen采用
"ALiBi (线性偏置)": attention分数加线性偏置 · 外推性最好 · 但精度略降
"绝对位置编码": 可学习的position embedding · GPT-2采用 · 外推性差

At the very bottom, navy blue bar with white text: "Pre-Norm+RMSNorm+RoPE 是当前最优组合 · Llama/Qwen都在用". --ar 3:4
```

## 02-08. MoE 架构

```
A clean technical infographic on light cream background (#FAF8F5), titled "MoE 混合专家架构 — 参数多不代表慢" at top in bold dark charcoal (#2D2D2D) 44px font.

Top insight box (green):
"Dense: 所有参数都参与计算"
"MoE: 只有部分 Expert 被激活 · 总参数大但激活参数小"

MoE workflow diagram (left to right):
[Input Token] → [Router/Gate] → [Expert 0] ↘
                                    → [Sum/Combine] → [Output]
                           [Expert 1] ↗
                           [Expert 2] ↗ (only top-K selected)
                           [Expert N] ↗

Router details: "每个token选择top-2 Expert · softmax选择最相关的"

Model comparison table:
"Mixtral 8×7B": 总参46.7B · 激活参12.9B(每token) · Expert数8 · top-2
"DeepSeek-V2": 总参236B · 激活参21B · Expert数160 · top-6
"GPT-4 (传闻)": 总参~1.8T · 激活参~80B · Expert数~16 · top-2

Why MoE doesn't mean faster (orange warning box):
"⚠️ MoE 不一定更快!"
"虽然激活参数少 但需要 AllToAll 通信跨GPU移动token"
"Expert分散在不同GPU上 路由通信是瓶颈"
"只有当 计算/通信比 高时 MoE 才有优势"

Deployment strategies (3 cards):
"单GPU MoE": Expert全在一张卡 · 适合小模型
"跨GPU EP": Expert分散+AllToAll · 适合大模型
"TP+EP混合": 层内TP+跨Expert EP · 生产最优

At the very bottom, navy blue bar with white text: "MoE的精髓是'用通信换计算' · 但通信成本不可忽视". --ar 3:4
```

## 02-09. 多模态 LLM

```
A clean technical infographic on light cream background (#FAF8F5), titled "多模态 LLM 架构 — 从文本到视觉" at top in bold dark charcoal (#2D2D2D) 44px font.

Three architecture types shown horizontally:

Type 1 "LLaVA 风格" (blue):
📸 camera icon → 🔗 projector → 🧠 LLM
"视觉编码器 (CLIP/ViT)"
"投影层 (Linear Connector)"
"LLM 处理视觉token+文本token"
优点: 简单有效 · 训练快
缺点: 视觉token多(256+) 占用KV Cache
代表: LLaVA、Qwen-VL

Type 2 "多模态 MoE" (green):
📸 camera → ViT Expert (视觉处理)
📝 text → Text Expert (文本处理)
Both → 🧠 共享Router → Output
"不同模态走不同Expert"
优点: 模态特异性处理
缺点: 复杂 训练难
代表: 实验性

Type 3 "原生多模态" (orange):
📸 camera + 📝 text → 🧠 统一Transformer
"从头训练统一处理多模态"
优点: 最统一 · 效果最好
缺点: 训练成本极高
代表: GPT-4o、Gemini

Visual tokenization detail box:
"视觉如何变成token？"
"图片 → ViT编码 → 256个视觉token (每个768维)"
"拼接: [视觉token_1...256] + [文本token_1...n]"
"问题: 256个视觉token = 256个KV Cache条目!"

Production deployment challenges (orange warning):
"多模态推理的挑战:"
"视觉token占用大量KV Cache"
"图片分辨率越高 token越多"
"需要压缩策略: token merging / pooling"

At the very bottom, navy blue bar with white text: "多模态的部署挑战在于视觉token · 256个视觉token可能比prompt还长". --ar 3:4
```

## 02-10. LLM 微调实战

```
A clean practical guide infographic on light cream background (#FAF8F5), titled "LLM 微调实战 — 全量 vs LoRA vs QLoRA" at top in bold dark charcoal (#2D2D2D) 44px font.

Three comparison cards with visual diagrams:

Card 1 "全参数微调" (gray border):
🔄 icon: ALL parameters highlighted (purple)
"更新全部 100% 参数"
"70B 模型需 560GB 显存 (Adam优化器)"
"效果最好 但成本最高"
"适合: 有资源的团队/基础模型厂商"
显存条: ████████████████████ 560GB
难度: ⭐⭐⭐⭐⭐

Card 2 "LoRA 低秩适配" (blue border):
🔄 icon: Only small adapter matrices highlighted (blue)
"冻结主干 仅训练低秩矩阵"
"参数量: 0.06% (约42MB for 70B)"
"70B 需 175GB 显存"
"效果接近全量 (95-98%)"
"部署: 合并到主干 零推理开销"
显存条: █████████ 175GB
难度: ⭐⭐⭐

Card 3 "QLoRA 量化+LoRA" (green border, highlighted):
🔄 icon: Quantized backbone + small LoRA (green)
"4bit量化 + LoRA"
"70B 单卡 48GB 可训!"
"效果略低于LoRA 但性价比最高"
"部署: 直接量化模型 + LoRA adapter"
显存条: ████ 48GB (green highlight)
难度: ⭐⭐

Deployment comparison:
"全参数: 新模型文件 (70B)"
"LoRA: 主干+adapter合并 → 新模型 (70B)"
"QLoRA: 量化模型(35GB) + LoRA adapter(42MB) · 可热插拔"

At the very bottom, navy blue bar with white text: "企业微调首选 QLoRA · 单卡可训70B · 效果够好 成本最低". --ar 3:4
```

---

*(文件继续 — 后续模块的 prompt 在下一部分)*
