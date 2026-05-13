# FDE Knowledge Map — Image Generation Prompts (English, High-Density Infographic Style)

## Usage
Copy any prompt below directly to Gemini 2.5 / DALL-E 3 to generate the infographic.

---

## 1. FDE Full Knowledge Map — Journey Timeline

```
A clean journey-style timeline infographic on light cream background (#FAF8F5), titled "FDE 前沿部署工程师 — 知识成长路径" at top center in bold dark charcoal (#2D2D2D) 48px font. Subtitle: "从入门到管理 · 12周完整路径" in smaller gray (#888) 18px text.

A thick horizontal timeline arrow (#333, 6px wide) runs left to right at vertical center, with four milestone circles (60px diameter) along it. Each circle has a colored border and white fill with an emoji icon inside.

Milestone 1 "入门 L1" (blue #4A90D9 border, left): 💡 icon inside circle. Below: a light blue card (#EBF3FC, rounded 12px) with title "基础认知" in bold 22px, then 4 bullet lines in 14px dark gray: "AI发展史与FDE岗位认知" / "Transformer架构概述" / "模型训练与预训练/后训练" / "学习路线图与五维能力模型"

Milestone 2 "进阶 L2" (green #4CAF50 border, center-left): ⚙️ icon inside circle. Below: a light green card (#E8F5E9) with title "进阶技术" in bold 22px, then 4 bullet lines: "GPU架构 A100/H100 显存模型" / "推理引擎 vLLM·TRT-LLM·SGLang" / "模型量化 FP16·INT8·INT4·FP8" / "KV Cache与Attention优化"

Milestone 3 "实战 L3" (orange #FF9800 border, center-right): 🚀 icon inside circle. Below: a light orange card (#FFF3E0) with title "生产实战" in bold 22px, then 4 bullet lines: "K8s部署与自动扩缩容" / "可观测性 Metrics·Logging·Tracing" / "成本优化 自建vs云vsAPI" / "分布式并行 TP·PP·MoE·DP"

Milestone 4 "管理 L4" (red #E53935 border, right): 🎯 icon inside circle. Below: a light red card (#FFEBEE) with title "前沿与管理" in bold 22px, then 4 bullet lines: "Agent架构 记忆+工具+规划" / "前沿技术 投机解码·FP8推理" / "面试答题框架与项目故事" / "团队建设与招聘体系"

Between milestones, small curved arrows with week labels in 12px gray: "Week 3-4" / "Week 7-9" / "Week 10-12"

At the very bottom, a navy blue (#1B3A5C) rounded bar with white text 16px: "技术深度占面试40% · 从底层向上学 不要反过来"

Style: flat minimalist icons, clean modern sans-serif (Inter/Roboto), generous white space between cards, subtle drop shadows on cards. --ar 3:4
```

---

## 2. What is FDE — Three Types + Radar

```
A clean vertical infographic on light cream background (#FAF8F5), titled "什么是 FDE — 前沿部署工程师" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "Frontier Deployment Engineer" in gray (#999) italic 20px.

Three vertical cards arranged side by side in the middle, each 300px wide with rounded corners and subtle shadow:

Card 1 (top border 4px blue #4A90D9): 
Top: 🔧 chip icon (40px)
Title "基础设施型" in bold 22px blue
Body text in 14px dark gray:
"负责推理引擎开发与底层优化"
"要求: 系统编程 + GPU底层能力"
"代表: vLLM、TensorRT团队"
Bottom line: "薪资 40-80万/年" in bold blue 18px

Card 2 (top border 4px green #4CAF50):
Top: 🖥️ server+AI brain icon (40px)
Title "应用部署型" in bold 22px green
Body text: "负责业务线模型部署与性能调优 / 要求: 工程能力 + AI交叉知识 / 代表: 各互联网大厂AI部门"
Bottom: "薪资 30-60万/年" in bold green 18px

Card 3 (top border 4px orange #FF9800):
Top: 🤝 handshake icon (40px)
Title "客户交付型" in bold 22px orange
Body text: "负责客户场景落地与方案设计 / 要求: 技术能力 + 沟通协作 / 代表: AI解决方案公司"
Bottom: "薪资 25-50万/年" in bold orange 18px

Below cards: a pentagon radar chart with 5 axes labeled:
技术深度 40% (outermost, red fill)
架构思维 25% (orange)
成本意识 15% (blue)
前沿敏感度 10% (green)
管理潜力 10% (purple)
Filled polygon with gradient from center outward.

At the very bottom, navy blue (#1B3A5C) rounded bar with white text: "FDE是工程能力+AI理解力的交叉岗位 · 不只是调API". --ar 3:4
```

---

## 3. Transformer Architecture Panorama

```
A clean educational infographic on light cream background (#FAF8F5), titled "Transformer 架构全景图" at top in bold dark charcoal (#2D2D2D) 44px font.

Top section: Three horizontal comparison cards (200px tall each) stacked vertically:

Card 1 "Encoder-only" (gray border #CCC): 
Left: 📖 book icon
"BERT · 擅长文本理解 · 不适合生成"
"用于搜索、分类、NER任务"
Right: a small bar showing "理解 ★★★★★ 生成 ★★☆☆☆"

Card 2 "Decoder-only" (thick green border #4CAF50, highlighted with light green fill):
Left: 🧠 brain icon  
"GPT / Llama / Qwen · 自回归生成"
"LLM主流选择 · 训练简单高效"
Right: "理解 ★★★☆☆ 生成 ★★★★★" (green checkmark badge "主流")

Card 3 "Encoder-Decoder" (gray border #CCC):
Left: 🔄 exchange icon
"T5 / BART · 适合翻译摘要"
"推理慢需两轮计算"
Right: "理解 ★★★★☆ 生成 ★★★☆☆"

Middle section: A vertical data flow pipeline diagram (left to right flow with arrows):
[Token "Hello"] → [Embedding d_model×vocab] → [Position RoPE] → [Transformer Block × N:
  → RMSNorm → Self-Attention QK^T → Residual → RMSNorm → SwiGLU FFN → Residual] → [Final Norm] → [Linear → Logits] → [Softmax Sampling → Token] (curved arrow looping back to input)
Each step is a rounded rectangle with a small icon, connected by thin arrows.

A floating formula box (white with shadow, top-right corner):
"Attention(Q,K,V) = softmax(QK^T/√d_k)·V" in monospace 16px with colored Q(red) K(blue) V(green)

At the very bottom, navy blue (#1B3A5C) bar with white text: "LLM几乎全部采用Decoder-only · 训练简单 · 推理高效 · Scaling Law最优". --ar 3:4
```

---

## 4. LLM Training to Fine-tuning Pipeline

```
A clean step-by-step workflow infographic on light cream background (#FAF8F5), titled "LLM 从训练到微调的完整路径" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "你不需要从头训练大模型" in gray 18px.

Five stage cards connected by thick colored arrows (→) flowing left to right, each card has a colored circle icon on top:

Stage 1 "预训练 Pre-training" (purple #9C27B0):
🔵 circle with cloud+data icon
Top line: "海量数据 → 基础模型"
Data section in 13px:
"数据: 万亿token级互联网文本"
"算力: 数千GPU运行数月"
"成本: 数千万美元"
"产出: Base Model (Llama/GPT)"
Difficulty meter: ⭐⭐⭐⭐⭐

Stage 2 "继续预训练 CPT" (blue #2196F3):
🔵 circle with database icon
Top line: "领域数据注入"
"数据: 领域专用(代码/医学/法律)"
"算力: 数百GPU运行数周"
"代表: CodeLlama、BioMedGPT"
Difficulty meter: ⭐⭐⭐⭐

Stage 3 "监督微调 SFT" (green #4CAF50):
🟢 circle with checklist icon
Top line: "指令对齐"
"数据: 数百~数千条精选指令"
"算力: 少量GPU数小时"
"代表: Alpaca、Vicuna"
Difficulty meter: ⭐⭐⭐

Stage 4 "人类对齐 RLHF/DPO" (orange #FF9800):
🟠 circle with balance scale icon
Top line: "行为优化"
"RLHF: 3阶段(SFT→Reward→PPO) 复杂"
"DPO: 1阶段直接优化 简单"
"数据: 10K-100K人类偏好对"
Difficulty meter: ⭐⭐⭐⭐

Stage 5 "领域微调 LoRA/QLoRA" (red #E53935):
🔴 circle with wrench icon
Top line: "业务场景适配"
"LoRA: 仅训练0.06%参数"
"QLoRA: 4bit量化后单卡可训"
"数据: 数十~数百条"
Difficulty meter: ⭐⭐

Below Stage 5, a highlighted callout box (light yellow):
"⚡ 99%企业只需做阶段3-5"

At the very bottom, navy blue bar with white text: "SFT + DPO + LoRA 就是你的最佳组合 · 不需要从头预训练". Clean flat icons, generous spacing. --ar 3:4
```

---

## 5. GPU Architecture & Memory Bottleneck

```
A clean technical infographic on light cream background (#FAF8F5), titled "GPU 架构解析 — 为什么 LLM 推理是内存带宽瓶颈" at top in bold dark charcoal (#2D2D2D) 44px font.

Left section: A stylized GPU chip cross-section (200px wide):
Top layer (dark blue): "HBM3 Memory" with bandwidth "3.35 TB/s" in large green text
Arrow down to middle (light blue): "L2 Cache" (shared across SMs)
Arrow down to bottom (gray): "SM Array × N"
  Inside SM box:
  ├ 🔴 CUDA Cores (scalar math)
  ├ 🟢 Tensor Cores (FP8/FP16/INT8)
  ├ 🟡 SRAM / L1 Cache
  └ 🔵 Register File
Each sub-component has a small colored dot icon.

Center section: Two GPU comparison cards side by side:

"A100" card (gray border):
Chip silhouette icon
FP16: 312 TFLOPS
HBM2e: 2.0 TB/s
80GB VRAM
Price: ~$1.5万

"H100" card (thick green border, light green fill):
Chip silhouette icon
FP8: 1978 TFLOPS 🔴
HBM3: 3.35 TB/s 🔴 (+67%)
80GB VRAM
Price: ~$3万
Green badge: "推荐"

Right section: A large analysis callout box (white with red left border):
Title "Decode 阶段 memory-bound 分析" in bold
Two horizontal bars (like a progress comparison):
"计算时间"  — short red bar: "0.45ms"
"权重加载" — long red bar (15x longer): "70ms"
Below: "GPU利用率 = 0.45/70 ≈ 0.6%" in large red text
Conclusion: "GPU算术单元99%时间在等待数据从HBM搬运"

At the very bottom, navy blue bar with white text: "推理优化的本质是减少数据搬运 · 不是增加计算 · 量化和KV Cache才是核心". --ar 3:4
```

---

## 6. Four Inference Engines Compared

```
A clean comparison infographic on light cream background (#FAF8F5), titled "四大推理引擎架构深度对比" at top in bold dark charcoal (#2D2D2D) 44px font.

Four engine cards stacked vertically, each with a colored left accent bar and unique icon:

Card 1 "vLLM" (blue accent #4A90D9):
Icon: ⚡ lightning bolt
Subtitle: "通用部署首选"
Tech: "PagedAttention — 虚拟块→物理块映射, 显存利用率90%+"
Features: "Continuous Batching · Chunked Prefill · Prefix Caching"
Throughput: "2-4x 提升 vs 传统方式" in large blue text
Users: "OpenRouter · Together AI · 多数创业公司"
Verdict badge (green): "⭐ 默认推荐"

Card 2 "TRT-LLM" (red accent #E53935):
Icon: 🔧 compiler gear
Subtitle: "极致性能"
Tech: "TensorRT图编译优化 — Kernel Fusion + 算子融合"
Features: "FP8/INT8原生支持 · In-flight Batching · 编译期优化"
Throughput: "1.2-2x vs vLLM" in large red text
Users: "NVIDIA · 字节跳动 · 百度"
Verdict badge (orange): "⚡ 性能最强"

Card 3 "SGLang" (green accent #4CAF50):
Icon: 🌳 tree structure
Subtitle: "Agent 场景最优"
Tech: "RadixAttention — 前缀缓存树状复用"
Features: "JSON约束输出 · 并行采样 · 结构化生成"
Throughput: "Agent场景2-5x加速" in large green text
Users: "多家Agent创业公司"
Verdict badge (blue): "🤖 Agent首选"

Card 4 "TGI" (purple accent #9C27B0):
Icon: 🤗 HuggingFace face
Subtitle: "快速原型"
Tech: "HuggingFace官方集成"
Features: "简单部署 · 模型支持最广 · safetensors"
Users: "初创团队 · 学术机构 · 个人开发者"
Verdict badge (gray): "🚀 快速上手"

At the very bottom, navy blue bar with white text: "通用选vLLM · 极致性能选TRT-LLM · Agent选SGLang · 快速原型选TGI". --ar 3:4
```

---

## 7. Quantization Landscape

```
A clean vertical infographic on light cream background (#FAF8F5), titled "模型量化方案全景 — 从 FP32 到 INT4" at top in bold dark charcoal (#2D2D2D) 44px font.

Top section: A descending staircase with 5 steps from left to right, each step getting shorter (representing decreasing memory):

Step 1 "FP32" (gray, crossed-out with red X):
32bit · 70B=280GB · 零损失

Step 2 "FP16" (blue, with green ✓ badge):
16bit · 70B=140GB · 零损失

Step 3 "FP8" (green, with H100 chip icon):
8bit · 70B=70GB · 损失0.5-1.5%

Step 4 "INT8" (orange, with green ✓ badge):
8bit · 70B=70GB · 损失<0.5%

Step 5 "INT4" (red, large highlight box):
4bit · 70B=35GB · 损失1-2%
With red text "单卡可部署!"

Middle section: Three strategy cards side by side:

Card "PTQ" (green):
"训练后量化 · 无需训练"
"几分钟搞定 · 适合INT8"
"精度损失<0.5%"

Card "QAT" (orange):
"量化感知训练 · 需微调"
"精度更高 · 适合INT4"
"耗时数小时"

Card "GPTQ/AWQ" (blue):
"按通道/按张量优化"
"逐层量化 · 自适应"
"INT4最佳方案"

Bottom section: A dramatic before/after comparison:

Before (gray box, left):
"FP16 · 70B"
Large "140 GB" in gray
"需要 2-3 张 A100"
Three GPU icons with 2 crossed out

Arrow →

After (green box, right):
"INT4 · 70B"
Large "35 GB" in green
"单张 A100 40GB 即可部署"
One GPU icon with green checkmark

Large red badge between them: "↓75% 显存"

At the very bottom, navy blue bar with white text: "70B模型INT4后35GB · 单卡部署成为可能 · 量化是成本优化第一板斧". --ar 3:4
```

---

## 8. Distributed Parallel Strategies

```
A clean technical infographic on light cream background (#FAF8F5), titled "LLM 分布式推理 — 五大并行策略" at top in bold dark charcoal (#2D2D2D) 44px font.

Five strategy cards stacked vertically, each with a mini GPU diagram on the left and text on the right:

Card 1 "DP 数据并行" (blue):
Mini diagram: 4 identical GPU boxes, each with a different request arrow (Req1/Req2/Req3/Req4)
"每个GPU放完整模型副本"
"通信: 无(独立推理)"
"效果: 线性增加吞吐"
"场景: 多用户并发服务"

Card 2 "TP 张量并行" (red):
Mini diagram: One large matrix split into 4 colored quadrants across 4 GPUs, with AllReduce sync arrows
"单层内切分矩阵(QKV切分)"
"通信: AllReduce每层同步"
"要求: NVLink域内低延迟"
"场景: 70B模型单请求推理"

Card 3 "PP 流水线并行" (green):
Mini diagram: GPU0=layer0-39 → Send → GPU1=layer40-79 → Recv
"按层切分到不同GPU"
"通信: Send/Recv层间传递"
"优势: 可跨节点部署"
"场景: 超大模型+多节点"

Card 4 "EP Expert并行" (orange):
Mini diagram: MoE router sending tokens to scattered Expert GPUs with AllToAll arrows
"MoE场景Expert分散"
"通信: AllToAll路由token"
"优势: 扩展性最好"
"场景: Mixtral等MoE模型"

Card 5 "CP 上下文并行" (purple):
Mini diagram: Long sequence split into 3 segments with Ring Attention circular arrows
"超长序列分段处理"
"通信: Ring AllReduce"
"场景: 128K+长上下文推理"

Right side panel (light gray background):
Title "选型决策" in bold
"70B单请求 → TP=8 (8卡NVLink)"
"多请求高吞吐 → DP+TP混合"
"MoE模型 → TP+EP"
"超长上下文 → CP"

At the very bottom, navy blue bar with white text: "70B模型最常用TP=8 · 8卡NVLink域内 · 每卡约17.5GB模型+40GB KV Cache". --ar 3:4
```

---

## 9. Production Deployment Architecture

```
A clean layered architecture infographic on light cream background (#FAF8F5), titled "LLM 推理服务生产部署架构" at top in bold dark charcoal (#2D2D2D) 44px font.

Five horizontal layers stacked bottom to top, each layer is a colored rounded rectangle with icons on the left edge:

Layer 1 (bottom, gray #F5F5F5) "基础设施层":
Left icon: 🏗️ K8s cluster
"K8s集群 · GPU节点(A100/H100 8卡服务器)"
"高速网络 InfiniBand / RoCE"

Layer 2 (blue #E3F2FD) "推理引擎层":
Left icon: ⚡ vLLM engine
"vLLM / TRT-LLM / SGLang Pod"
"模型热加载与版本管理"
"PagedAttention 显存管理"
"Continuous Batching 调度"

Layer 3 (green #E8F5E9) "服务层":
Left icon: 🌐 API Gateway
"API Gateway (路由·限流·认证)"
"Model Router (按请求路由)"
"Load Balancer (负载均衡)"

Layer 4 (orange #FFF3E0) "可观测性层":
Left icon: 📊 Three monitoring icons
"Metrics: Prometheus+Grafana (GPU利用率·TTFT·TPS)"
"Logging: ELK/Loki (请求日志·错误追踪)"
"Tracing: Jaeger (链路追踪)"

Layer 5 (top, purple #F3E5F5) "自动扩缩层":
Left icon: 📈 scaling arrows
"KEDA/HPA 自动伸缩"
"基于队列长度 / GPU利用率"
"冷启动 < 30s"

User request arrow entering from the right side at Layer 3, flowing down through all layers.

At the very bottom, navy blue bar with white text: "生产部署不只是跑个模型 · 是可观测·可扩缩·可容灾的系统工程". --ar 3:4
```

---

## 10. Autoscaling & Disaster Recovery

```
A clean two-column infographic on light cream background (#FAF8F5), titled "LLM 服务自动扩缩与容灾策略" at top in bold dark charcoal (#2D2D2D) 44px font.

Left column (green header bar #4CAF50) "📈 自动扩缩策略":

Box 1 "水平扩缩 HPA" (green icon →):
"QPS > 100 → 扩容"
"队列 > 50 → 扩容"
"GPU > 80% → 扩容"
Small icon: scaling arrows

Box 2 "KEDA 事件驱动" (blue icon 📨):
"消息队列积压 → 自动扩容"
"Redis队列深度触发"
"支持自定义指标"

Box 3 "预热策略" (yellow icon ⏰):
"新模型预加载到空闲Pod"
"冷启动 < 30s"
"模型权重预热缓存"

Box 4 "缩容策略" (gray icon ↙️):
"空闲5分钟 → 缩到最小"
"闲时从8卡缩到2卡"
"成本降 60%+"

Right column (red header bar #E53935) "🛡️ 容灾策略":

Box 1 "单Pod故障" (orange icon 🔄):
"K8s自动重启"
"请求重路由到健康Pod"
"恢复时间 < 10s"

Box 2 "单GPU故障" (red icon ⚠️):
"TP降级 (TP=8→TP=4)"
"队列等待+告警"
"自动替换GPU节点"

Box 3 "单节点故障" (dark red icon 🏥):
"跨节点PP部署"
"自动failover到备用节点"
"数据不丢失"

Box 4 "全区域故障" (maroon icon 🌍):
"多Region部署"
"DNS故障转移"
"RPO < 1min · RTO < 5min"

Box 5 "模型回滚" (purple icon ↩️):
"新版本异常 → 秒级切回"
"A/B灰度发布"
"健康检查拦截"

At the very bottom, navy blue bar with white text: "自动扩缩是成本优化的关键 · 容灾是高可用的底线 · 两者缺一不可". --ar 3:4
```

---

## 11. LLM Inference Cost Breakdown

```
A clean financial infographic on light cream background (#FAF8F5), titled "LLM 推理成本全拆解" at top in bold dark charcoal (#2D2D2D) 44px font.

Top section: A donut chart with 4 colored segments:
70% red: "GPU计算" label with "A100 ~$1.5万/张 · H100 ~$3万/张" below
15% blue: "显存存储" with "模型权重 + KV Cache + 数据"
10% green: "网络带宽" with "API调用 · 数据传输 · CDN"
5% gray: "运维人力" with "监控·扩缩·故障处理"
Center of donut shows total: "月成本 $24万" in large text

Middle section: Five optimization arrows (green downward arrows) with percentage labels:

Arrow 1 "量化 FP16→INT4":
Large green "↓75%" badge
"显存从140GB降到35GB"

Arrow 2 "模型蒸馏 70B→13B":
Large green "↓80%" badge
"精度损失仅2-3%"

Arrow 3 "Continuous Batching":
Large green "↑2-3x" badge
"吞吐翻倍"

Arrow 4 "自动扩缩闲时缩容":
Large green "↓40-60%" badge
"按需使用GPU"

Arrow 5 "Prefix Caching":
Large green "零计算" badge
"重复prompt直接返回"

Bottom section: A dramatic before/after cost comparison:

Before (red box, left):
"优化前"
70B FP16 · 8张H100
Large "$24万/月" in red

Arrow → (green)

After (green box, right):
"优化后"
70B INT4 + Batching + 缩容
Large "$5万/月" in green
"↓79% 总成本" in large red text

At the very bottom, navy blue bar with white text: "量化+扩缩+batching三板斧 · 推理成本可降80%+". --ar 3:4
```

---

## 12. Frontier Technology Roadmap

```
A clean timeline infographic on light cream background (#FAF8F5), titled "LLM 推理前沿技术路线图" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "从已成熟到前沿探索" in gray 18px.

Three timeline sections flowing left to right along a thick arrow:

Section 1 "已成熟 2023-2024" (green background #E8F5E9, green badge ✓):

Item 1 "PagedAttention": ⚡ icon · "vLLM · 显存利用率90%+"
Item 2 "Continuous Batching": 📦 icon · "吞吐提升2-3x"
Item 3 "INT8/FP8量化": 📊 icon · "显存减半精度损失<1%"
Item 4 "GQA/MQA": 🎯 icon · "KV Cache减少4-32倍"

Section 2 "正在普及 2024-2025" (orange background #FFF3E0, orange badge 🔄):

Item 1 "Speculative Decoding": 🎲 icon · "小模型draft+大模型验证 · 2-4x加速"
Item 2 "KV Cache量化": 📉 icon · "INT8/FP8 KV · 显存再降50%"
Item 3 "Chunked Prefill": ✂️ icon · "长prompt分段 · 消除首token延迟峰值"
Item 4 "Multi-LoRA服务": 🔀 icon · "单实例服务多个微调模型"

Section 3 "前沿探索 2025+" (purple background #F3E5F5, purple badge 🔬):

Item 1 "MoE推理优化": 🧩 icon · "Expert并行+动态路由 · 激活参数仅10%"
Item 2 "端侧推理": 📱 icon · "手机/边缘设备跑LLM · 7B模型INT4"
Item 3 "光子计算": 💡 icon · "光学矩阵乘法 · 理论速度100x"
Item 4 "无KV Cache": 🗑️ icon · "MLA架构/状态空间模型"

At the very bottom, navy blue bar with white text: "跟踪前沿但不盲目追新 · 生产环境以稳定为先 · PagedAttention+量化足够用2年". --ar 3:4
```

---

## 13. FDE Interview Answer Framework

```
A clean educational infographic on light cream background (#FAF8F5), titled "FDE 面试 — 高分答题框架" at top in bold dark charcoal (#2D2D2D) 44px font.

Center: A circular four-step process (clockwise from top):

Step 1 "澄清问题" (blue, top position):
🔍 magnifying glass icon (large)
对话示例:
"您指的是prefill还是decode?"
"是单卡还是多卡环境?"
"关注延迟还是吞吐?"
Subtext: "先搞清楚面试官在问什么" in gray

Step 2 "给出结论" (green, right position):
✅ checkmark icon (large)
对话示例:
"我的建议是 TP=8 + vLLM + INT8量化"
Subtext: "一句话先给结论" in gray

Step 3 "支撑论据" (orange, bottom position):
📊 bar chart icon (large)
对话示例:
"70B FP16需140GB, 单卡放不下"
"TP=8分摊到8卡, 每卡17.5GB"
"+ KV Cache约40GB, A100 80GB内"
Subtext: "用数据和公式说话" in gray

Step 4 "补充trade-off" (red, left position):
⚖️ balance scale icon (large)
对话示例:
"追求极致性能可考虑TRT-LLM+FP8"
"但需要更多编译调优时间"
"vLLM是更安全的选择"
Subtext: "展示多角度思考" in gray

Right side panel (light gray):
Title "面试题型分布" in bold
Pie chart with 5 segments:
技术深度 40% (red, largest)
架构设计 25% (orange)
成本分析 15% (blue)
前沿认知 10% (green)
管理协作 10% (purple)

At the very bottom, navy blue bar with white text: "结构化表达 > 死记硬背 · 展示trade-off思维 · 面试官看重推理过程不是答案". --ar 3:4
```

---

## 14. AI Team Building & Hiring

```
A clean four-quadrant infographic on light cream background (#FAF8F5), titled "AI 技术团队 — 从招聘到培养体系" at top in bold dark charcoal (#2D2D2D) 44px font.

Four quadrants arranged in a 2x2 grid, each with a colored header bar, icon, and bullet list:

Top-Left "招聘策略" (blue header #4A90D9):
🎯 target icon
"技术面: 编码 + 系统设计 + AI基础"
"项目面: 真实项目经历(STAR方法)"
"文化面: 学习能力·抗压·协作"
"加分项: 开源贡献·技术博客"
Small note: "不要只看学历, 看实际产出" in italic gray

Top-Right "成长路径" (green header #4CAF50):
📈 upward arrow icon
"初级(1-2年): 独立完成部署"
"中级(3-5年): 服务架构设计"
"高级(5年+): 技术规划+团队管理"
"专家级: 行业影响力·技术预研"
Small note: "给每个人清晰的晋升通道"

Bottom-Left "培训机制" (orange header #FF9800):
📚 book stack icon
"技术分享会: 每周1次(轮流讲)"
"论文共读: 每月2篇前沿论文"
"实验平台: 每人都有GPU环境"
"外部会议: 每年2-3个技术大会"
Small note: "投资团队成长是最好的留人方式"

Bottom-Right "知识管理" (purple header #9C27B0):
📋 clipboard icon
"内部Wiki: 技术方案沉淀"
"Runbook: 故障排查手册"
"代码Review: 质量把关"
"Onboarding: 新人7天上手"
Small note: "好文档让新人效率提升3倍"

At the very bottom, navy blue bar with white text: "好团队不是招到牛人 · 是让普通人变优秀 · 体系 > 个人英雄主义". --ar 3:4
```

---

## 15. Hands-on Lab Roadmap

```
A clean step-by-step infographic on light cream background (#FAF8F5), titled "FDE 动手实验 — 从零到生产的6个实验" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "动手做一遍比看十遍文档有用" in gray 18px.

Six lab cards stacked vertically, connected by a vertical progression arrow on the left (green→yellow→orange→red), each card has a difficulty badge and estimated time:

Lab 1 "vLLM部署7B模型" (green ● easy):
🚀 rocket icon · "30分钟"
"目标: 用vLLM启动Qwen2.5-7B"
"测试: TTFT(首token延迟) 和 TPS"
"硬件: 单卡 RTX 4090 或 A10"
"产出: 能跑通API调用"

Lab 2 "模型量化实战" (green ● easy):
📊 chart icon · "1小时"
"目标: 7B模型 FP16→INT8→INT4"
"工具: GPTQ / AWQ / bitsandbytes"
"测试: 量化前后精度和速度对比"
"产出: 理解量化trade-off"

Lab 3 "性能Profiling" (yellow ●● medium):
🔬 microscope icon · "2小时"
"目标: 用nsight profiler找瓶颈"
"操作: 记录GPU利用率/显存带宽"
"产出: 火焰图 + 瓶颈分析报告"
"学会: 找到memory-bound证据"

Lab 4 "Batch Size调优" (yellow ●● medium):
📈 trend icon · "2小时"
"目标: 测试batch=1/4/8/16/32"
"测量: 每个batch的吞吐和延迟"
"产出: 最优batch推荐曲线"
"发现: batch越大吞吐越高延迟也越高"

Lab 5 "张量并行实验" (orange ●●● hard):
🔀 switch icon · "3小时"
"目标: 2-4卡跑TP=2/4的70B模型"
"观察: NVLink vs PCIe通信开销"
"产出: 不同TP配置的性能对比"
"发现: NVLink比PCIe快3-5x"

Lab 6 "OOM故障排查" (red ●●● expert):
⚠️ warning icon · "2小时"
"目标: 模拟OOM并学会解决"
"场景: batch过大 / KV Cache溢出"
"技能: 显存分析·KV管理·降级策略"
"产出: 排查手册 + 解决方案"

At the very bottom, navy blue bar with white text: "6个实验覆盖部署→量化→Profiling→调优→分布式→排障 · 完整覆盖FDE日常 · 建议每个周末做一个". --ar 3:4
```

---

## Usage Tips

1. Order: Start from Prompt 1 (overview), then follow the learning path
2. Each prompt is standalone — no context needed
3. Works best with Gemini 2.5 (image generation) or DALL-E 3
4. Recommended tags: #FDE #AIDeployment #LLM #InferenceOptimization #GPU #vLLM
