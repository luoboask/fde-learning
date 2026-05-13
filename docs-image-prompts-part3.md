# FDE 全文档图解 Prompt 集合 — Part 3

---

# Module 07: Agent 架构

## 07-01. Agent 系统架构

```
A clean system architecture infographic on light cream background (#FAF8F5), titled "AI Agent 四要素架构 — 从 LLM 到自主智能体" at top in bold dark charcoal (#2D2D2D) 44px font.

Center: Large "LLM (大脑)" circle with 🧠 icon (80px diameter).

Four surrounding modules connected by bidirectional arrows:

Module 1 (top-left, blue) "记忆系统":
💾 icon
短期记忆: 对话历史 (windowed)
工作记忆: 当前任务上下文
长期记忆: 向量数据库持久化
"Agent需要'记住'上下文 而不是每次都从头开始"
部署: Redis(短期) + Milvus/Qdrant(长期)

Module 2 (top-right, green) "工具调用":
🔧 icon
搜索: Google/Bing API
代码执行: Python REPL / Jupyter
数据库: SQL query
外部API: 天气/邮件/支付
"LLM通过Function Calling调用外部工具"
部署: SGLang结构化输出保障JSON合法性

Module 3 (bottom-left, orange) "规划能力":
📋 icon
任务分解: 大任务→子任务链
反思: 检查结果是否正确
自我修正: 错误时换策略
ReAct: Reason + Act 交替
"Agent需要规划执行路径 而不是随机尝试"

Module 4 (bottom-right, purple) "知识库 (RAG)":
📚 icon
文档向量化: Embedding模型
向量检索: Top-K相似文档
上下文拼接: 知识+prompt→LLM
"RAG让Agent能回答训练数据外的知识"
部署: LangChain / LlamaIndex

Framework comparison table (bottom):
"LangChain": 生态最广 · 组件多 · 学习曲线陡
"LlamaIndex": RAG专精 · 数据索引强 · 简单
"CrewAI": 多Agent协作 · 角色分工
"AutoGen": Microsoft · 多Agent对话

Agent formula (bottom center):
"Agent = LLM + 记忆 + 工具 + 规划 + 知识库"

At the very bottom, navy blue bar with white text: "Agent的部署挑战是工具链路的可靠性 · 每个工具调用都是潜在的失败点". --ar 3:4
```

---

# Module 08: 成本运营

## 08-01. LLM 推理成本拆解

```
A clean financial infographic on light cream background (#FAF8F5), titled "LLM 推理成本全拆解 — 每一分钱花在哪" at top in bold dark charcoal (#2D2D2D) 44px font.

Top donut chart with 5 segments:
GPU计算 70% (red, largest slice): "A100 ~$1.5万/张 · H100 ~$3万/张"
运维人力 12% (gray): "监控·扩缩·故障处理"
电力 8% (yellow): "GPU功耗 A100 400W/H100 700W"
网络 6% (blue): "API调用·数据传输·CDN"
存储 4% (green): "模型权重·日志·监控数据"

GPU cost deep-dive (3 cards):

Card 1 "硬件折旧" (blue):
"购买A100: $1.5万/张 · 3年折旧"
"月成本: $1.5万/36 = $417/月/张"
"8卡服务器: $3,333/月"
"但: 电费+运维 ≈ 硬件价格"

Card 2 "云GPU租赁" (green):
"云厂商A100: ~$3-5/小时/卡"
"月租(24×30): $2,160-3,600/卡"
"含电费运维 · 但长期更贵"

Card 3 "Serverless API" (orange):
"OpenAI GPT-4: $30/1M input tokens"
"月1亿tokens: ~$3,000"
"零运维 · 但大规模比自建贵5-10倍"

70B model cost by precision:
"FP16 (8×H100)": $24万/月 · 基线
"INT8 (4×H100)": $12万/月 · ↓50%
"INT4 (2×H100)": $6万/月 · ↓75%

Cloud vendor comparison:
"AWS p5 (H100)": $98.32/小时 · 最贵 · 生态好
"GCP A3 (H100)": ~$80/小时 · 中等
"阿里云 GPU": ~¥50/小时 · 国内最便宜

At the very bottom, navy blue bar with white text: "GPU成本占推理成本70% · 减少GPU数量是成本优化的核心". --ar 3:4
```

## 08-02. 成本优化策略

```
A clean optimization infographic on light cream background (#FAF8F5), titled "成本优化策略 — 分层降本框架" at top in bold dark charcoal (#2D2D2D) 44px font.

Three-layer optimization framework (top to bottom):

Layer 1 "模型层 — 降本 70-80%" (red):
📊 icon
量化: FP16→INT4 · 显存降至1/4
蒸馏: 70B→13B · 精度损失2-3% 成本降80%
模型选择: 小模型够用就不用大的

Layer 2 "调度层 — 降本 40-60%" (orange):
🔄 icon
Continuous Batching: 吞吐提升2-3x
自动扩缩: 闲时缩容 成本降40-60%
请求合并: 相同前缀共享计算

Layer 3 "运营层 — 降本 20-30%" (green):
📈 icon
Spot实例: 按需竞价实例 降价60-90%
预留实例: 1-3年承诺 降价30-50%
多Region: 选便宜Region部署

Optimization priority (decision flow):
"Step 1: 量化 (最快 降本50-75%)"
"Step 2: Batching优化 (简单 提升2-3x吞吐)"
"Step 3: 自动扩缩 (按需 降本40-60%)"
"Step 4: 模型蒸馏 (有精度损失 但效果最大)"
"Step 5: 运营优化 (Spot/预留/Region)"

Semantic Caching detail:
"语义缓存: 相似问题返回相同答案"
"Embedding相似度 > 0.95 → 直接返回"
"节省: 重复问题零计算"
"适合: FAQ场景 命中率可达30-50%"

Cost optimization impact chart:
基线: ████████████████████ $24万/月
+量化: ██████████ $12万 (↓50%)
+Batching: ████ $6万 (↓75%)
+扩缩: ██ $3万 (↓87%)
+Spot: █ $1.5万 (↓93%)

At the very bottom, navy blue bar with white text: "优化优先级: 量化→Batching→扩缩→蒸馏 → 一步步降 不是一步到位". --ar 3:4
```

## 08-03. 容量规划

```
A clean capacity planning infographic on light cream background (#FAF8F5), titled "容量规划 — 需要多少张GPU" at top in bold dark charcoal (#2D2D2D) 44px font.

Three-step capacity planning method:

Step 1 "流量预测" (blue): 📊 icon
"预估日请求量: 100万 requests/day"
"平均 prompt长度: 500 tokens"
"平均 output长度: 200 tokens"
"峰值QPS: 平均QPS × 3 (峰值系数)"
"日均QPS: 100万/86400 ≈ 12 QPS"
"峰值QPS: 12 × 3 = 36 QPS"

Step 2 "吞吐建模" (green): ⚡ icon
"单GPU吞吐量: tokens/s per GPU"
"A100 70B INT4: ~15 token/s"
"单GPU可服务QPS:"
"  QPS = GPU吞吐 / 平均output_tokens"
"  = 15 / 200 = 0.075 QPS"
"⚠️ decode是串行 每请求需200步×50ms = 10s"

Step 3 "GPU数量计算" (orange): 🔢 icon
"需要GPU = 峰值QPS × 平均请求时长"
"= 36 × 10s = 360 GPU-seconds"
"每GPU每秒处理0.1个请求"
"需要GPU: 36 / 0.1 = 360 GPU"
"考虑batching优化: 360 / 3 = 120 GPU"
"考虑Buffer(50%): 120 × 1.5 = 180 GPU"

Buffer types:
"正常Buffer: +20% (应对流量波动)"
"峰值Buffer: +50% (应对突发)"
"容灾Buffer: +100% (应对GPU故障)"

SLA-based planning:
"严格SLA (P99 < 1s): 峰值Buffer +100%"
"宽松SLA (P99 < 5s): 正常Buffer +20%"
"排队可接受: 最小GPU + 队列"

At the very bottom, navy blue bar with white text: "容量规划的核心公式: GPU数 = 峰值QPS × 平均请求时长 × Buffer". --ar 3:4
```

## 08-04. 自建 vs 云 vs API

```
A clean comparison infographic on light cream background (#FAF8F5), titled "自建 vs 云GPU vs API — 哪种部署最划算" at top in bold dark charcoal (#2D2D2D) 44px font.

Three full comparison columns:

Column 1 "Serverless API" (blue):
☁️ cloud icon
"OpenAI / Anthropic / 智谱"
优势:
"✅ 零运维"
"✅ 按需付费"
"✅ 自动扩缩"
"✅ 随时可用"
劣势:
"❌ 大规模成本最高"
"❌ 数据隐私顾虑"
"❌ 模型选择受限"
"❌ 速率限制"
成本: "$250K/月 (月1亿tokens)"
适合: "月请求 < 100万 · 快速原型"

Column 2 "云GPU IaaS" (green):
🖥️ server icon
"AWS p5 / GCP A3 / 阿里云GPU"
优势:
"✅ 灵活选模型"
"✅ 数据可控"
"✅ 按需租GPU"
"✅ 无需硬件采购"
劣势:
"❌ 需运维K8s"
"❌ 长期比自建贵"
"❌ GPU供应不稳定"
成本: "$71K/月 (8×H100)"
适合: "月请求 100万-1亿 · 弹性需求大"

Column 3 "自建集群" (orange):
🏗️ building icon
"自购GPU + 自建机房"
优势:
"✅ 大规模成本最低"
"✅ 完全控制"
"✅ 数据绝对安全"
"✅ 无供应商锁定"
劣势:
"❌ 初期投入大"
"❌ 需运维团队"
"❌ 扩缩不灵活"
成本: "$30K/月 (8×H100含运维)"
适合: "月请求 > 1亿 · 长期稳定需求"

Break-even analysis:
"API → 云GPU: 月100万tokens是转折点"
"云GPU → 自建: 月1亿tokens是转折点"
"自建回本: 12-18个月(含硬件采购)"

Hybrid deployment (green box):
"推荐: 混合部署"
"日常流量: 自建集群 (低成本)"
"峰值流量: 云GPU溢出 (弹性)"
"测试开发: Serverless API (灵活)"

At the very bottom, navy blue bar with white text: "小量用API 中量用云GPU 大量用自建 · 混合部署是最优解". --ar 3:4
```

---

# Module 09: 前沿技术

## 09-01. 前沿技术总览

```
A clean technology landscape infographic on light cream background (#FAF8F5), titled "LLM 推理加速技术全景 — 四层优化体系" at top in bold dark charcoal (#2D2D2D) 44px font.

Four optimization layers (top to bottom):

Layer 1 "算法层 — 改变生成方式" (purple):
🧠 icon
"投机解码 (Speculative Decoding): 小模型draft大模型验证 · 2-4x加速"
"Medusa: 多头预测 · 一次生成多个token"
"EAGLE-2/3: 特征级draft · 更高接受率"
"Lookahead Decoding: 并行验证多个候选"

Layer 2 "数值层 — 改变精度" (blue):
📊 icon
"FP8推理: H100原生FP8 Tensor Core · 2x吞吐"
"INT4 KV Cache: 显存再降50%"
"混合精度: Attention用FP16 FFN用FP8"

Layer 3 "显存层 — 改变存储方式" (green):
📦 icon
"PagedAttention: 虚拟页→物理页映射 · 利用率90%+"
"KV Cache压缩: 量化+PQ编码"
"MLA (DeepSeek): 压缩KV Cache的Attention"

Layer 4 "系统层 — 改变调度方式" (orange):
🔄 icon
"Continuous Batching: 动态请求合并"
"Chunked Prefill: 长prompt分段"
"DistServe: Prefill和Decode分离到不同GPU"
"MoonCake: 分布式KV Cache存储"

Recent papers worth attention (2025-2026):
"EAGLE-3: 接受率>80% 加速比3-4x"
"FlashDecoding++: FlashAttention扩展到decode"
"DistServe: Prefill/Decode分离 延迟降50%"

At the very bottom, navy blue bar with white text: "保持技术敏感 但生产以稳定为先 · PagedAttention+量化+batching 足够用2年". --ar 3:4
```

## 09-02. 投机解码

```
A clean technical infographic on light cream background (#FAF8F5), titled "投机解码 Speculative Decoding — 小模型draft 大模型验证" at top in bold dark charcoal (#2D2D2D) 44px font.

Algorithm flow (left to right):

Step 1 "Draft" (blue):
"小模型 (如 7B) 快速生成 γ 个 tokens"
"速度: ~200 token/s (7B on A100)"
"γ = 4 (典型值)"

Step 2 "Verify" (green):
"大模型 (如 70B) 并行验证 γ 个 tokens"
"计算每个draft token的接受概率"
"速度: ~15 token/s (70B on A100)"

Step 3 "Accept/Reject" (orange):
"概率 > threshold → 接受"
"概率 < threshold → 拒绝 大模型重新采样"
"连续接受则输出多个token"
"拒绝后从小模型拒绝点重新draft"

Speedup formula:
"加速比 = 1 + γ × 接受率"
"γ=4, 接受率60% → 1 + 4×0.6 = 3.4x 理论"
"实际: 2-2.5x (考虑draft开销)"

Medusa scheme (detail box):
"Medusa: 在LLM上加多个'decoding heads'"
"每个head预测第n步token"
"一次前向 = 多个token预测"
"不需要独立小模型 · 但需微调"

Acceptance rate analysis:
"高接受率 (>70%): Draft和Target分布接近"
"  如: 同系列小模型 → draft"
"低接受率 (<30%): Draft和Target分布差异大"
"  如: 不同类型小模型 → 收益有限"

vLLM configuration:
speculative_model = "small_model_path"
num_speculative_tokens = 4
speculative_draft_tensor_parallel_size = 1

When to use:
"✅ Draft模型和主模型同源 (如 Llama-7B draft Llama-70B)"
"✅ 对延迟敏感 愿意用额外显存换速度"
"❌ 接受率<40% 时收益不大"

At the very bottom, navy blue bar with white text: "投机解码接受率>60%时收益最大 · 关键是选择同源的小模型做draft". --ar 3:4
```

## 09-03. FP8 推理

```
A clean technical infographic on light cream background (#FAF8F5), titled "FP8 推理 — H100 的性能密码" at top in bold dark charcoal (#2D2D2D) 44px font.

Floating point format comparison:
"FP32": 1bit符号 + 8bit指数 + 23bit尾数 · 范围±3.4×10³⁸
"FP16": 1bit符号 + 5bit指数 + 10bit尾数 · 范围±65504
"BF16": 1bit符号 + 8bit指数 + 7bit尾数 · 范围同FP38 精度低
"FP8 E4M3": 1bit符号 + 4bit指数 + 3bit尾数 · 范围±448 (推理)
"FP8 E5M2": 1bit符号 + 5bit指数 + 2bit尾数 · 范围±57344 (训练)
"INT8": 0bit指数 + 8bit整数 · 范围-128~127 (对称)

H100 FP8 Tensor Core (highlighted green box):
⚡ "FP8 Tensor Core: 1978 TFLOPS"
"FP16 Tensor Core: 989 TFLOPS"
"FP8 是 FP16 的 2 倍!"
"原因: 8bit数据量减半 每次能处理2倍矩阵"

Why FP8 is faster than A100 FP16:
"A100 FP16: 312 TFLOPS"
"H100 FP8: 1978 TFLOPS"
"6.3x 差距! 不仅是FP8的功劳:"
"FP8精度: 2x (数据量减半)"
"Hopper架构: ~1.5x (架构改进)"
"Tensor Core数量: ~2x"

FP8 quantization schemes:
"Dynamic Scaling: 每层运行时找scale"
"Per-tensor: 整个张量1个scale"
"Per-channel: 每通道1个scale (更精确)"

Accuracy loss analysis:
"FP8 vs FP16: 精度损失 0.5-1.5%"
"FP8 vs INT8: FP8动态范围更大 对outlier更鲁棒"
"FP8在Attention上可能不稳定 (softmax敏感)"

NVIDIA Transformer Engine:
"自动FP8/FP16混合精度"
"前向FP8 后向FP16"
"自动监控 精度不够自动切FP16"

FP8 vs INT8 comparison:
"FP8": 动态范围大 · 对outlier鲁棒 · H100专属
"INT8": 动态范围小 · 兼容性广 · 所有GPU支持

At the very bottom, navy blue bar with white text: "H100的FP8 Tensor Core是推理性能翻倍的关键 · E4M3适合推理 E5M2适合训练". --ar 3:4
```

## 09-04. 前沿技术评估流程

```
A clean process infographic on light cream background (#FAF8F5), titled "前沿技术评估流程 — 怎么判断一个新技术值不值得用" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "四步评估法 从信息到上线" in gray 18px.

Step 1 "信息收集" (blue): 📖 icon
"来源: 论文(Google Scholar) / 博客(GitHub) / 社区(Twitter)"
"关注: arXiv上的cs.LG和cs.DC"
"筛选标准:"
"  是否有开源实现?"
"  是否有benchmark数据?"
"  是否有生产环境验证?"
"产出: 技术评估笔记 (1-2页)"

Step 2 "环境搭建" (green): 🔧 icon
"搭建隔离测试环境 (和production一致)"
"安装依赖 · 配置benchmark数据集"
"确保baseline (当前方案)可复现"
"产出: 可重复的测试脚本"

Step 3 "Benchmark 测试" (orange): 📊 icon
五大评估维度:
"准确率: vs baseline 精度变化 <1%可接受"
"性能: TTFT/TPS/吞吐 提升>20%才有价值"
"兼容性: 是否支持现有模型/框架"
"成本: 额外显存/CPU开销"
"生态: 社区活跃度/维护频率/文档质量"

Step 4 "业务验证" (red): 🎯 icon
"在真实业务流量上灰度测试"
"5%流量 → 观察1周 → 指标正常 → 50% → 100%"
"监控: 错误率/延迟/资源消耗"
"产出: 评估报告 + 上线/回退决策"

Evaluation report template:
"技术名称 / 版本"
"评估日期 / 评估人"
"测试环境 (GPU/模型/数据)"
"Baseline结果 vs 新技术结果"
"结论: 推荐采用 / 继续观察 / 不推荐"
"理由: (3-5条)"

Automated evaluation pipeline:
"GitHub CI: 每次commit自动跑benchmark"
"Prometheus: 持续监控生产指标"
"Dashboard: 实时对比新旧方案"

At the very bottom, navy blue bar with white text: "新技术评估的核心原则: 数据说话 · 不盲目追新 · 生产稳定优先". --ar 3:4
```

---

# Module 10: 面试

## 10-01. 面试全流程框架

```
A clean interview framework infographic on light cream background (#FAF8F5), titled "FDE 面试全流程 — 从准备到Offer" at top in bold dark charcoal (#2D2D2D) 44px font.

Interview rounds (horizontal flow):

Round 1 "技术一面" (blue): 📋 icon · 60min
"考察: 技术深度 (推理引擎/GPU/量化)"
"形式: 技术问答 + 编码"
"常见问题:"
"  '解释PagedAttention原理'"
"  '70B模型怎么部署'"
"  'decode为什么是memory-bound'"
"准备: 刷Top 15高频题"

Round 2 "技术二面" (green): 🔧 icon · 60min
"考察: 架构设计 + 系统设计"
"形式: 场景设计题"
"常见问题:"
"  '设计一个LLM推理服务'"
"  '流量突然10x增长怎么办'"
"准备: 画架构图 + 说trade-off"

Round 3 "Manager面" (orange): 👔 icon · 45min
"考察: 项目管理 + 团队协作"
"形式: 行为问题 + 项目回顾"
"常见问题:"
"  '讲一个你最自豪的项目'"
"  '技术路线分歧怎么处理'"
"准备: STAR格式项目故事"

Round 4 "Cross面" (purple): 🤝 icon · 45min
"考察: 跨团队沟通 + 文化匹配"
"形式: 场景模拟"
"常见问题:"
"  '如何向非技术人解释技术方案'"
"准备: 练习简洁表达"

Round 5 "HR面" (red): 💼 icon · 30min
"考察: 稳定性 + 薪资 + 职业规划"
"形式: 聊天式"
"常见问题:"
"  '为什么离开'"
"  '期望薪资'"
"  '3-5年规划'"
"准备: 标准答案模板"

4-week preparation timeline:
"Week 1: 技术基础复习 (文档从头看一遍)"
"Week 2: 高频题练习 (Top 15 + 编码)"
"Week 3: 项目故事整理 (STAR格式)"
"Week 4: 模拟面试 + 行为问题"

Common mistakes:
"❌ 只会背概念 说不清trade-off"
"❌ 项目故事没有量化指标"
"❌ 遇到不会的就说'不知道'"
"❌ 不问面试官问题"

At the very bottom, navy blue bar with white text: "技术面40% + 架构面25% + Manager面15% + HR面10% + Cross面10%". --ar 3:4
```

## 10-02. 自我介绍

```
A clean personal branding infographic on light cream background (#FAF8F5), titled "FDE 面试自我介绍 — 3分钟打动面试官" at top in bold dark charcoal (#2D2D2D) 44px font.

Self-intro structure (5 parts):

Part 1 "背景" (15秒, blue): 👤 icon
"当前公司/职位 · 工作年限"
"教育背景 (学校+专业)"
示例: "我在XX公司做AI基础设施3年"

Part 2 "技术能力" (45秒, green): ⚡ icon
"核心技术栈: vLLM/K8s/Python/C++"
"关键项目: 部署过XX模型 优化XX性能"
"量化指标: 吞吐提升X倍 成本降低X%"
示例: "我负责将70B模型从PoC到生产部署 吞吐提升3x"

Part 3 "项目经验" (60秒, orange): 🏆 icon
"STAR格式: 情境→任务→行动→结果"
"选2-3个最有代表性的项目"
"每个项目1分钟"
示例: "公司要求降低推理成本60% → 我做了INT4量化+自动扩缩 → 最终降本75%"

Part 4 "管理经验" (30秒, purple): 👥 icon
"如果有: 团队规模/项目管理/技术分享"
"如果没有: 说mentorship/开源贡献"
示例: "我带过2个实习生 每周做技术分享"

Part 5 "动机" (30秒, red): 🎯 icon
"为什么选择这家公司"
"为什么适合这个岗位"
示例: "贵公司在LLM推理领域的技术深度 和我的经验高度匹配"

3-min vs 5-min version:
"3分钟: 精简版 只说核心亮点"
"5分钟: 详细版 展开1-2个重点项目"

Highlight management + technical depth:
"技术深度体现在: 能解释底层原理 + 有量化指标"
"管理潜力体现在: 带过人/做过技术决策/推动过变革"

At the very bottom, navy blue bar with white text: "自我介绍不是复述简历 · 是用量化指标+项目故事证明你匹配这个岗位". --ar 3:4
```

## 10-03. 技术答题框架

```
A clean Q&A framework infographic on light cream background (#FAF8F5), titled "FDE 技术答题框架 — 15道高频题详解" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "三阶段答题法: 定义→分析→总结" in gray 18px.

Three-stage answering method (center):

Stage 1 "定义" (blue): 📖 icon
"先说清楚概念是什么"
"示例: 'PagedAttention是vLLM的显存管理方案...'"
"时间: 15-20秒"

Stage 2 "分析" (green): 🔍 icon
"展开原理/公式/对比/数据"
"示例: '它借鉴了操作系统的虚拟内存...'"
"时间: 40-60秒"

Stage 3 "总结" (orange): 📌 icon
"一句话总结 + 实践建议"
"示例: '所以PagedAttention让vLLM吞吐提升2-4x'"
"时间: 10-15秒"

Top 5 high-frequency questions preview:

Q1 "解释PagedAttention": 答: 虚拟块→物理块 · 消除碎片 · 类比虚拟内存
Q2 "Continuous Batching": 答: 请求完成即释放 · 新请求填补 · 吞吐2-3x
Q3 "INT8 vs FP8": 答: INT8通用 · FP8动态范围大H100专属 · 精度差异
Q4 "70B模型怎么部署": 答: TP=8 · INT4量化 · vLLM · 8卡A100
Q5 "如何优化首token延迟": 答: Chunked Prefill · 投机解码 · 模型并行

Reference benchmark data to memorize:
"A100 70B FP16: ~8 token/s (decode)"
"A100 70B INT4: ~15 token/s"
"H100 70B FP8: ~25 token/s"
"vLLM vs 裸PyTorch: 2-4x 吞吐提升"
"P99 TTFT目标: < 500ms"

At the very bottom, navy blue bar with white text: "答题框架: 定义→分析→总结 · 记住关键数据 · 展示trade-off思维". --ar 3:4
```

## 10-04. 项目故事

```
A clean storytelling framework infographic on light cream background (#FAF8F5), titled "FDE 项目故事 — 用 STAR 讲好你的技术经历" at top in bold dark charcoal (#2D2D2D) 44px font.

STAR narrative structure (4 blocks connected by arrows):

S "Situation 情境" (blue): 🏢 icon
"背景是什么? 为什么做这个项目?"
"示例: '公司要求将70B模型从PoC部署到生产'"
"时长: 30秒"

T "Task 任务" (green): 🎯 icon
"你的具体任务是什么? 面临什么挑战?"
"示例: '目标: 延迟<1s 吞吐>100 token/s 成本降60%'"
"时长: 30秒"

A "Action 行动" (orange): 🔧 icon
"你做了什么? 技术方案和决策过程?"
"示例: '1)INT4量化 2)vLLM部署 3)自动扩缩 4)性能profiling调优'"
"时长: 90秒"

R "Result 结果" (red): 📊 icon
"结果如何? 量化指标?"
"示例: '延迟从3s降到0.5s 吞吐从50提升到150 token/s 成本降75%'"
"时长: 30秒"

Five project story templates:

Story 1 "70B生产部署": PoC→生产 · 4步优化 · 前后对比指标
Story 2 "量化优化": FP16→INT4 · 精度保持 · 成本降低
Story 3 "集群扩缩": 流量10x增长 · 自动扩缩方案 · 零宕机
Story 4 "在线故障": 凌晨P99飙升 · 排查过程 · 根因+修复
Story 5 "引擎二开": vLLM定制 · 需求→实现→效果

Pacing control:
"1分钟版: 只说S+R (背景+结果)"
"3分钟版: S+T+R (省略Action细节)"
"5分钟版: 完整STAR (重点在Action)"

Quantitative metrics system:
"性能: TTFT/TPS/吞吐提升x倍"
"成本: 降低x% 节省x万/月"
"质量: 精度损失<x% 可用性99.x%"

At the very bottom, navy blue bar with white text: "好的项目故事 = 具体情境 + 量化目标 + 技术方案 + 数字结果". --ar 3:4
```

## 10-05. 行为面试

```
A clean behavioral interview infographic on light cream background (#FAF8F5), titled "FDE 行为面试 — 5个经典问题与标准答案" at top in bold dark charcoal (#2D2D2D) 44px font.

Five classic behavioral questions:

Q1 "描述一次技术改造经历" (blue):
🔄 icon
STAR回答模板:
S: "现有系统用裸PyTorch 吞吐低"
T: "需要提升3倍吞吐 同时保持稳定"
A: "调研vLLM→PoC→灰度→全量 · 遇到兼容性bug→修复"
R: "吞吐提升3x 延迟降50% 零宕机"

Q2 "描述一次失败经历" (green):
⚠️ icon
关键: 说反思和改进
"失败: 一次量化后精度损失3%"
"原因: 直接用PTQ没做calibration"
"改进: 改用AWQ+calibration数据 损失降到0.5%"

Q3 "和上级意见不一致怎么办" (orange):
🤝 icon
框架: 数据说话 + 尊重决策
"先做PoC验证两种方案"
"用benchmark数据对比"
"尊重上级最终决策 全力执行"

Q4 "优先级冲突怎么处理" (purple):
⚖️ icon
框架: 影响面评估 + 沟通对齐
"评估: 哪个对用户影响更大"
"沟通: 和stakeholder对齐优先级"
"执行: 先紧急重要的 再重要不紧急"

Q5 "跨团队协作案例" (red):
🔗 icon
框架: 明确接口 + 定期同步 + 主动沟通
"项目: 推理引擎团队 + 业务团队协作"
"做法: 每周同步进度 · 明确API接口 · 提前预警风险"

Scoring dimensions:
"沟通清晰度: 能否让非技术人理解"
"数据驱动: 是否用数据支撑决策"
"反思能力: 失败后能否总结改进"
"协作意识: 是否考虑他人感受"

At the very bottom, navy blue bar with white text: "行为面核心: 用STAR结构 + 量化指标 + 反思改进 展示你的综合素质". --ar 3:4
```

## 10-06. HR面

```
A clean HR interview guide infographic on light cream background (#FAF8F5), titled "FDE HR面 — 谈薪·稳定性·职业规划" at top in bold dark charcoal (#2D2D2D) 44px font.

Four evaluation focus areas:

Focus 1 "稳定性" (blue): 🏠 icon
"HR关注: 你会不会很快跳槽?"
"好回答: '我看好AI基础设施方向 贵公司技术深度让我有长期发展空间'"
"坏回答: '我想先积累经验 以后可能创业'"

Focus 2 "文化匹配" (green): 🤝 icon
"HR关注: 你和团队合得来吗?"
"好回答: '我喜欢技术分享和code review 贵团队的weekly tech talk我很认同'"
"坏回答: '我更喜欢独立工作 不太需要团队'"

Focus 3 "薪资期望" (orange): 💰 icon
"策略: 先说范围 不说具体数字"
"好回答: '我期望年薪50-65万 具体看整体package'"
"谈判技巧: '我手头有另一个offer 60万 但我更倾向贵公司'"

Focus 4 "职业规划" (purple): 📈 icon
"HR关注: 你有清晰的发展方向吗?"
"好回答: '1-2年成为资深FDE · 3-5年带团队 · 长期方向: AI基础设施专家'"
"坏回答: '没想好 · 看公司安排'"

Common HR Q&A:
"离职原因": "追求更大发展空间 · 现有平台受限"
"为什么选我们": "技术方向匹配 · 团队氛围好 · 行业领先"
"优缺点": "优: 技术深度+执行力 · 缺: 公开演讲需要提升(加改进动作)"
"其他offer": "有2-3个 在比较中 · 贵公司是第一选择"
"加班看法": "项目关键期可以加班 · 但平时追求效率"

Good reverse questions:
"✅ '团队目前最大的技术挑战是什么?'"
"✅ '这个岗位的success metric是什么?'"
"❌ '加班多吗?' (显得你不想努力)"

At the very bottom, navy blue bar with white text: "HR面不是走过场 · HR有一票否决权 · 稳定性是核心考察点". --ar 3:4
```

## 10-07. 面试检查清单

```
A clean checklist infographic on light cream background (#FAF8F5), titled "FDE 面试检查清单 — 面试前中后全流程" at top in bold dark charcoal (#2D2D2D) 44px font.

Before Interview (48 hours):

Tech prep: ✅
"□ 刷完Top 15高频题"
"□ 复习所有文档核心概念"
"□ 准备编码题 (LeetCode medium)"

Project prep: ✅
"□ 准备3-5个STAR项目故事"
"□ 每个项目有量化指标"
"□ 练习3分钟和5分钟版本"

Self-intro: ✅
"□ 3分钟版练熟"
"□ 5分钟版练熟"
"□ 录音自检"

HR prep: ✅
"□ 离职原因标准答案"
"□ 薪资范围 (上下浮动15%)"
"□ 3-5年规划"

Company research: ✅
"□ 了解公司业务和技术栈"
"□ 了解面试官背景(LinkedIn)"
"□ 准备2-3个反问问题"

During Interview:
"⏱️ 时间管理: 每题不超过3分钟"
"🗣️ 表达方式: 先给结论再展开"
"🤔 遇到不会的: '这个问题我不确定 但我认为...'"
"📐 展示思维: 说trade-off 不只说答案"

After Interview:
"Same day: 复盘记录 (题目/表现/改进)"
"24h: 发感谢信 (LinkedIn/邮件)"
"3天: 如果没回复 主动跟进"

At the very bottom, navy blue bar with white text: "面试成功 = 充分准备 + 自信表达 + 展示trade-off思维". --ar 3:4
```

---

# Module 11: 团队建设

## 11-01. 团队管理概述

```
A clean management overview infographic on light cream background (#FAF8F5), titled "FDE 团队管理 — 为什么技术团队需要管理体系" at top in bold dark charcoal (#2D2D2D) 44px font.

Three reasons why management is needed:

Reason 1 "技术栈太新" (blue): 🆕 icon
"LLM领域每3-6个月就有大变化"
"新人上手需要3-6个月"
"没有体系 团队永远在重新造轮子"

Reason 2 "能力要求太全面" (green): 🎯 icon
"FDE需要: 系统工程+AI+运维+沟通"
"单个人不可能全都会"
"需要团队互补 知识共享"

Reason 3 "变化太快" (orange): 📈 icon
"vLLM每月发新版"
"新模型/新量化方案不断出现"
"需要持续学习机制"

Five core management modules:

Module 1 "团队文化" (blue): 🏠 icon · 信任·安全·分享
Module 2 "成长路径" (green): 📈 icon · L1→L2→L3→Tech Lead
Module 3 "培训机制" (orange): 📚 icon · 轮岗·onboarding·论文共读
Module 4 "知识管理" (purple): 📋 icon · Wiki·Runbook·技术文档
Module 5 "招聘策略" (red): 🎯 icon · 画像·面试·渠道

Five management principles:
"体系 > 个人" (系统化管理优于个人英雄主义)
"数据驱动" (用指标说话 不用感觉)
"持续迭代" (管理机制也要定期优化)
"工程文化" (code review·文档·自动化)
"人才密度" (招对人比管理更重要)

At the very bottom, navy blue bar with white text: "好管理不是管人 是搭建让每个人都能发挥最大价值的体系". --ar 3:4
```

## 11-02. 团队文化

```
A clean team culture infographic on light cream background (#FAF8F5), titled "FDE 团队文化 — 打造高绩效AI工程团队" at top in bold dark charcoal (#2D2D2D) 44px font.

Five-dimensional capability model (radar chart):
AI理解力: Transformer/训练/量化/引擎
工程能力: 编码/系统调试/性能分析
运营意识: 成本/SLA/可观测性
学习力: 论文阅读/技术评估/实验
协作力: 沟通/跨团队/知识分享

Ideal candidate characteristics (green box):
"✅ 好奇心强 主动学习新技术"
"✅ 工程思维 追求自动化"
"✅ 数据驱动 用指标说话"
"✅ 分享精神 愿意教别人"
"✅ 抗压能力 能handle紧急故障"

Unsuitable people (red box):
"❌ 只做算法 不愿意做工程"
"❌ 不愿意写文档"
"❌ 拒绝code review"
"❌ 不关注成本只追求sota"
"❌ 不愿意share knowledge"

Trust & Safety:
"心理安全: 敢说'我不知道'"
"容错文化: 失败是学习机会"
"无责复盘: 故障复盘不追究个人"

Recognition & Motivation:
"技术成就: 公开表扬(weekly meeting)"
"成长机会: 给新人挑战性任务"
"影响力: 让团队成员在技术社区发声"

Culture implementation timeline:
"Month 1: 建立weekly tech share"
"Month 2: 启动code review"
"Month 3: 建Wiki + Runbook"
"Month 6: 第一次团队满意度调研"

At the very bottom, navy blue bar with white text: "团队文化不是口号 · 是通过每周的tech share/code review/review一点点建立起来的". --ar 3:4
```

## 11-03. 成长路径

```
A clean career growth infographic on light cream background (#FAF8F5), titled "FDE 成长路径 — 从L1入门到L3高级" at top in bold dark charcoal (#2D2D2D) 44px font.

Three-level growth path:

Level 1 "L1 入门 (0-6个月)" (blue): 🌱 icon
能做什么:
"独立部署7B-13B模型"
"使用vLLM做基本推理"
"做INT8量化"
"看懂Grafana监控面板"
需要帮助:
"需要senior指导架构设计"
"不熟悉分布式并行"
评估标准:
"能完成分配的任务"
"代码质量达标"

Level 2 "L2 成熟 (6-18个月)" (green): 🌿 icon
能做什么:
"设计70B模型部署方案"
"做性能profiling和调优"
"设计自动扩缩策略"
"独立排查OOM/延迟问题"
"指导L1新人"
需要帮助:
"需要指导超大模型架构"
"技术选型需要讨论"
评估标准:
"能独立负责一个服务"
"能做技术决策"

Level 3 "L3 高级 (18+个月)" (orange): 🌳 icon
能做什么:
"设计多模型推理平台"
"主导技术选型和评估"
"做容量规划"
"制定团队技术规范"
"跨团队协作"
评估标准:
"能规划季度技术路线"
"能带2-3人小组"

Career development paths (two tracks):
"技术路线": L1→L2→L3→Principal Engineer
"管理路线": L2→Tech Lead→Manager→Director

At the very bottom, navy blue bar with white text: "成长路径不是升职标准 · 是让每个人知道自己该学什么·该往哪走". --ar 3:4
```

## 11-04. 培训机制

```
A clean training mechanism infographic on light cream background (#FAF8F5), titled "FDE 培训机制 — 让新人快速上手 老人持续成长" at top in bold dark charcoal (#2D2D2D) 44px font.

New employee onboarding flow:

Week 1 "融入" (blue):
Day 1: 环境搭建 · 账号权限 · 认识团队
Day 2-3: 阅读文档 (FDE学习中心)
Day 4-5: 第一个lab (vLLM部署7B)
产出: 能跑通基本推理

Month 1 "上手" (green):
Week 2: 影子学习 (跟着senior看日常)
Week 3: 独立做一个小任务 (量化测试)
Week 4: 第一次代码review + tech share
产出: 能独立完成基本部署

Month 3 "独立" (orange):
独立负责一个模型部署
开始参与技术讨论
第一次故障排查
产出: L1达标

Annual training rotation:
Month 1-2: GPU底层 (CUDA/Nsight)
Month 3-4: 推理引擎深入 (vLLM源码)
Month 5-6: 量化方案 (AWQ/GPTQ/FP8)
Month 7-8: 分布式 (TP/PP/EP)
Month 9-10: 生产运维 (扩缩/容灾)
Month 11-12: 前沿技术评估

1v1 mechanism:
"频率: 每两周一次"
"内容: 成长进度/困惑/目标"
"不是考核 · 是帮助和引导"

Learning incentives:
"论文共读奖金: 每月分享2篇 → $500"
"技术博客奖励: 外部分享 → $1000"
"会议赞助: 优秀贡献者 → 技术大会门票+差旅"

At the very bottom, navy blue bar with white text: "培训不是一次性的 · 是年度轮换+日常1v1+实战练习的组合拳". --ar 3:4
```

## 11-05. 知识管理

```
A clean knowledge management infographic on light cream background (#FAF8F5), titled "FDE 知识管理 — 让团队经验可积累可传承" at top in bold dark charcoal (#2D2D2D) 44px font.

Why FDE teams need knowledge management:
"技术栈更新快 → 经验容易过时"
"人员流动 → 知识随人流失"
"重复踩坑 → 没有记录教训"

Knowledge base structure:

Category 1 "模型卡片" (blue): 📦 icon
"每个模型的: 参数量/精度/显存需求/基准性能"
"格式: Model Card 模板"

Category 2 "性能基线" (green): 📊 icon
"每个模型在每个GPU上的: TTFT/TPS/最大batch"
"定期更新 (引擎升级后重测)"

Category 3 "最佳实践" (orange): ✅ icon
"部署指南 / 量化指南 / 调参指南"
"来自实战经验 不是文档搬运"

Category 4 "踩坑记录" (red): ⚠️ icon
"每次故障/bug的原因和解决方案"
"最有价值的知识"

Category 5 "技术评估报告" (purple): 🔬 icon
"每个新技术的评估: 论文/代码/测试/结论"
"避免重复评估"

Document templates:
"Model Card: 模型信息 + 性能数据 + 部署建议"
"Pit Record: 现象 → 排查 → 根因 → 修复 → 预防"
"Evaluation Report: 方案对比 + benchmark + 结论"

Knowledge inheritance (offboarding flow):
"离职前2周: 整理文档 + 交接代码"
"交接会议: 1v1讲解关键系统"
"交接文档: 系统架构 + 运维手册 + 待办事项"

At the very bottom, navy blue bar with white text: "好知识管理让新人从3个月上手缩短到2周 · 踩坑记录比最佳实践更有价值". --ar 3:4
```

## 11-06. 招聘策略

```
A clean hiring strategy infographic on light cream background (#FAF8F5), titled "FDE 招聘策略 — 找到对的人比什么都重要" at top in bold dark charcoal (#2D2D2D) 44px font.

Talent profile:

Must-have (green): ✅
"扎实的编程能力 (Python/C++)"
"系统调试经验"
"对AI/LLM有热情和基本了解"
"学习能力强 (能快速上手新技术)"

Nice-to-have (blue): ⭐
"GPU/CUDA经验"
"推理引擎使用经验 (vLLM等)"
"K8s/部署经验"
"开源贡献"

Red flags (red): ❌
"只会调API 不理解底层"
"不愿意写文档"
"对性能优化没有兴趣"
"沟通能力差 (无法解释技术问题)"

Interview flow design:

Round 1 "工程能力" (60min, blue): 💻 icon
"编码: LeetCode medium难度"
"系统设计: 设计一个API服务"
"考察: 编程基础 + 工程思维"

Round 2 "AI理解力" (60min, green): 🧠 icon
"问答: Transformer/推理/量化"
"场景: 70B模型怎么部署"
"考察: AI基础 + 部署思维"

Round 3 "实战经验" (45min, orange): 🔧 icon
"项目回顾: 讲一个你最自豪的项目"
"追问: 为什么选这个方案 有没有trade-off"
"考察: 实战能力 + 决策思维"

Round 4 "协作+Manager" (45min, purple): 🤝 icon
"行为问题: 技术分歧/失败经历"
"情景模拟: 跨团队协作"
"考察: 沟通协作 + 文化匹配"

Final round "HR" (30min, red): 💼 icon
"稳定性 / 薪资 / 职业规划"

Recruitment channels:
"内推: 最高效 (团队成员推荐)"
"技术社区: GitHub/技术博客/Twitter"
"猎头: 适合senior岗位"
"校招: 培养潜力新人"

At the very bottom, navy blue bar with white text: "招对人比管理更重要 · 宁缺毋滥 · 一个不合适的人拖累整个团队". --ar 3:4
```

---

# Module 12: 动手实验

## 12-01. vLLM 7B 部署实验

```
A clean hands-on lab guide infographic on light cream background (#FAF8F5), titled "Lab 1: vLLM 部署 7B 模型" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "30分钟完成第一个LLM推理服务" in gray 18px.

Environment requirements:
"GPU: RTX 4090 (24GB) 或 A10 (24GB)"
"Python 3.10+"
"磁盘: 20GB (模型权重)"

Step 1 "安装" (blue):
pip install vllm
"验证: vllm --version"

Step 2 "启动" (green):
vllm serve Qwen/Qwen2.5-7B \
  --served-model-name qwen-7b \
  --gpu-memory-utilization 0.90 \
  --max-model-len 4096
"启动后: http://localhost:8000"

Step 3 "测试推理" (orange):
curl http://localhost:8000/v1/completions \
  -d '{"model":"qwen-7b","prompt":"你好","max_tokens":50}'
"期望: 返回JSON含generated_text"

Step 4 "监控显存" (purple):
watch -n 1 nvidia-smi
"观察: GPU利用率 → 90%"
"显存占用 → ~14GB (7B FP16)"

Key configuration table:
"gpu-memory-utilization": 0.90 (最大可用比例)
"max-num-seqs": 256 (最大并发请求)
"max-model-len": 4096 (最大序列长度)
"tensor-parallel-size": 1 (单卡)
"enable-prefix-caching": False (7B不需要)

Verification success criteria:
"✅ API返回正常 (200 OK)"
"✅ GPU利用率 > 0 (有计算)"
"✅ 显存占用 < 20GB (有剩余)"
"✅ 首token延迟 < 500ms"
"✅ 生成50 token < 5s"

Thinking questions:
"Q1: 如果显存不够怎么办?"
"Q2: max-model-len 和显存的关系?"
"Q3: 如何测试最大并发请求数?"

At the very bottom, navy blue bar with white text: "完成这个lab 你就迈出了FDE的第一步 · 理解每个参数的含义比跑通更重要". --ar 3:4
```

## 12-02. 量化工作流实验

```
A clean hands-on lab guide infographic on light cream background (#FAF8F5), titled "Lab 2: 模型量化实战 — 从 FP16 到 INT4" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "1小时体验量化的全流程" in gray 18px.

Environment:
"GPU: A10 24GB (INT4 7B可放单卡)"
"Python 3.10+"
"pip install autoawq lm_eval"

Step 1 "使用预量化模型" (blue):
from awq import AutoAWQForCausalLM
model = AutoAWQForCausalLM.from_quantized("model-4bit")
"加载INT4模型 对比FP16加载速度"

Step 2 "FP16 vs INT4 对比" (green):
"显存对比: FP16=14GB vs INT4=3.5GB"
"速度对比: 测TTFT和TPS"
"质量对比: 同prompt输出对比"
"记录: FP16输出 vs INT4输出 差异度"

Step 3 "精度验证 (lm_eval)" (orange):
lm_eval --model vllm \
  --model_args pretrained=model-4bit \
  --tasks hellaswag,arc_easy \
  --num_fewshot 0
"对比FP16和INT4在benchmark上的分数差异"
"期望: INT4比FP16低1-2%"

Step 4 "性能测试 (ab/wrk)" (purple):
"用ab或wrk做压力测试"
"测不同batch size下的吞吐"
"对比FP16和INT4的吞吐差异"

Expected results:
"显存: ↓75% (14GB → 3.5GB)"
"速度: ↑20-50% (数据量减少)"
"精度: ↓1-2% (可接受)"
"吞吐: ↑30-50%"

Thinking questions:
"Q1: INT4量化后哪些场景精度损失最大?"
"Q2: 如果精度损失>3% 怎么办?"
"Q3: INT4 vs INT8 在什么场景下选哪个?"

At the very bottom, navy blue bar with white text: "量化不是黑盒 · 一定要验证精度损失 · 1-2%可接受 >3%需要重新评估方案". --ar 3:4
```

## 12-03. 性能 Profiling 实验

```
A clean hands-on lab guide infographic on light cream background (#FAF8F5), titled "Lab 3: 性能 Profiling — 找到推理瓶颈" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "2小时学会用工具找瓶颈" in gray 18px.

Tool chain overview:

Tool 1 "nvidia-smi" (blue): 📊 icon
watch -n 1 nvidia-smi
"看什么: GPU利用率% / 显存占用 / 温度"
"判断: 利用率<20% = memory-bound"

Tool 2 "nvtop" (green): 📈 icon
nvtop
"比nvidia-smi更直观: 历史曲线图"
"看什么: GPU利用率和显存随时间变化"

Tool 3 "nsys (NVIDIA Nsight)" (orange): 🔬 icon
nsys profile --stats=true \
  python inference_script.py
"产出: 时间线报告"
"看什么: 哪个kernel最耗时 / PCIe传输占比"

Tool 4 "ncu (NVIDIA Compute)" (purple): 🔍 icon
ncu --target-processes all \
  python inference_script.py
"产出: 算子级profiling"
"看什么: 每个算子的FLOPs/内存带宽/利用率"

Bottleneck type judgment flow:
"GPU利用率 > 60% → compute-bound"
"  → 优化: 量化/蒸馏减少计算"
"GPU利用率 < 20% → memory-bound"
"  → 优化: 减少数据搬运(KV Cache压缩)"
"GPU利用率 20-60% → 混合瓶颈"
"  → 看nsys时间线找具体问题"

Real profiling steps:
"Step 1: 用nvtop看实时利用率"
"Step 2: 用nsys做系统级profiling"
"Step 3: 用ncu定位具体算子"
"Step 4: 分析结果 制定优化方案"

Thinking questions:
"Q1: decode阶段GPU利用率为什么很低?"
"Q2: 如何用nsys证明是memory-bound?"
"Q3: 什么情况下TPU比GPU更适合?"

At the very bottom, navy blue bar with white text: "Profiling的核心原则: 先宏观(nvidia-smi)再微观(ncu) · 不要盲目优化没有数据的瓶颈". --ar 3:4
```

## 12-04. Batch Size 调优实验

```
A clean hands-on lab guide infographic on light cream background (#FAF8F5), titled "Lab 4: Batch Size 调优 — 找到最优并发数" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "吞吐和延迟的trade-off艺术" in gray 18px.

Key parameters:
"max-num-seqs": 最大并发请求数 (默认256)
"gpu-memory-utilization": 显存利用率上限 (默认0.9)
"max-model-len": 最大序列长度 (默认模型最大值)

Testing methodology:

Step 1 "基线测试" (blue):
"batch=1 · 测TTFT和TPS"
"这是最小延迟 最大吞吐的场景"
"记录: TTFT=Xms, TPS=Y token/s"

Step 2 "逐步增加batch" (green):
"batch = 1, 4, 8, 16, 32, 64, 128, 256"
"每个batch测: TTFT, TPS, GPU利用率"
"工具: wrk / ab / 自定义脚本"

Step 3 "结果分析" (orange):
"画两条曲线:"
"横轴: batch size"
"纵轴1: 吞吐量 (token/s) → 上升趋势"
"纵轴2: 延迟 (ms) → 上升趋势"
"找到: 吞吐增长的拐点"

Step 4 "调整显存利用率" (purple):
"gpu-memory-utilization = 0.80, 0.85, 0.90, 0.95"
"观察: 更高利用率 = 更大batch = 更高吞吐"
"风险: 0.95+ 可能OOM"

Expected pattern:
"batch 1:   TTFT=50ms  TPS=15   GPU=10%"
"batch 4:   TTFT=80ms  TPS=50   GPU=30%"
"batch 16:  TTFT=150ms TPS=180  GPU=60%"
"batch 32:  TTFT=300ms TPS=300  GPU=85%"
"batch 64:  TTFT=600ms TPS=350  GPU=95% ← 接近拐点"
"batch 128: TTFT=1200ms TPS=360 GPU=98% ← 边际收益很小"

Optimal batch recommendation:
"追求低延迟: batch=4-8"
"追求高吞吐: batch=32-64"
"平衡: batch=16-32"

At the very bottom, navy blue bar with white text: "batch越大吞吐越高但延迟也越高 · 根据业务SLA选择最优batch · 不是越大越好". --ar 3:4
```

## 12-05. 张量并行实验

```
A clean hands-on lab guide infographic on light cream background (#FAF8F5), titled "Lab 5: 张量并行实验 — 70B 模型多卡部署" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "对比 TP=2/4/8 的性能差异" in gray 18px.

Environment:
"GPU: 4×A100 NVLink (每卡80GB)"
"模型: Llama 3 70B"

Memory requirement calculation:
"70B FP16 = 140GB 模型权重"
"TP=4: 每卡 140/4 = 35GB 权重"
"+ KV Cache (batch=32, seq=4096): ~20GB"
"+ 中间激活: ~5GB"
"每卡总计: ~60GB < 80GB ✓"

Step 1 "TP=4 启动" (blue):
vllm serve meta-llama/Llama-3-70B \
  --tensor-parallel-size 4 \
  --gpu-memory-utilization 0.90 \
  --max-model-len 4096

Step 2 "验证" (green):
"nvidia-smi: 4张GPU都有显存占用"
"curl测试: 返回正常"
"每张卡显存: ~60GB"

Step 3 "性能对比" (orange):
"TP=2: TTFT=?ms TPS=? token/s (2卡)"
"TP=4: TTFT=?ms TPS=? token/s (4卡)"
"TP=8: TTFT=?ms TPS=? token/s (8卡,如果有)"
"观察: TP越大 吞吐越高 但通信开销也越大"

Expected results:
"TP=2: TPS=X · 效率~90%"
"TP=4: TPS≈1.8X · 效率~85% (通信开销增大)"
"TP=8: TPS≈2.5X · 效率~65% (NVLink内仍可接受)"
"结论: TP=4是4卡最优 · 不要超过NVLink域"

NVLink vs PCIe comparison (if available):
"NVLink: TP=4 效率~85%"
"PCIe:  TP=4 效率~40% (通信慢3-5x)"
"教训: TP必须在NVLink域内"

Thinking questions:
"Q1: 为什么TP=4不是TP=2的2倍吞吐?"
"Q2: AllReduce通信占推理时间的比例?"
"Q3: 什么情况下PP比TP更合适?"

At the very bottom, navy blue bar with white text: "TP的核心教训: 在NVLink域内做TP · PCIe做TP效率太低 · TP=4是4卡甜点". --ar 3:4
```

## 12-06. OOM 故障排查

```
A clean troubleshooting lab infographic on light cream background (#FAF8F5), titled "Lab 6: OOM 故障排查 — 显存爆了怎么办" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "FDE最常见的故障场景" in gray 18px.

Scenario:
"现象: CUDA Out Of Memory"
"错误: torch.cuda.OutOfMemoryError: CUDA out of memory"
"触发: batch=64 时突然OOM"

Troubleshooting steps:

Step 1 "检查显存分配" (blue):
nvidia-smi
"总显存: 80GB"
"已用: 79.5GB → OOM"
"模型权重: 140GB/4=35GB (TP=4)"
"KV Cache: ~40GB"
"剩余: 80-35-40=5GB (不够中间激活)"

Step 2 "分析显存组成" (green):
"静态: 模型权重 35GB (固定)"
"动态: KV Cache 40GB (随batch和seq_len变化)"
"中间激活: ~10GB (随batch变化)"
"碎片: ~5GB (PagedAttention下很少)"
"结论: KV Cache太大"

Step 3 "解决方案" (orange):
方案A: "减少batch size (64→32)"
方案B: "减少max-model-len (4096→2048)"
方案C: "降低gpu-memory-utilization预留空间"
方案D: "开启KV Cache量化"

Common causes table:
原因 | 症状 | 解决
batch太大 | 高并发时OOM | 减少max-num-seqs
seq_len太长 | 长请求时OOM | 减少max-model-len
KV Cache满 | 运行一段时间后OOM | 启用PagedAttention
显存碎片 | 明明有空闲却OOM | 用vLLM(已解决)
权重加载失败 | 启动时OOM | 减少gpu-memory-utilization

Prevention tips:
"监控显存使用率 设置告警(>90%)"
"预留10%显存buffer"
"压力测试时逐步增加batch 不是一次性拉到最大"

Thinking questions:
"Q1: OOM时怎么判断是KV Cache还是中间激活?"
"Q2: PagedAttention如何减少碎片?"
"Q3: 如何在OOM前自动触发降级?"

At the very bottom, navy blue bar with white text: "OOM是FDE最日常的故障 · 排查逻辑: 模型权重→KV Cache→中间激活→碎片 逐个排查". --ar 3:4
```

---

# Module 13-17: 参考附录

## 13-01. 面试问答库 (30题)

```
A clean Q&A bank overview infographic on light cream background (#FAF8F5), titled "FDE 面试问答库 — 30道高频题分级" at top in bold dark charcoal (#2D2D2D) 44px font.

Three difficulty levels:

Level 1 "基础题 1-10" (blue): 📖 icon
"1. 什么是Transformer"
"2. Attention公式解释"
"3. Prefill vs Decode区别"
"4. 什么是KV Cache"
"5. vLLM的核心优化"
"6. 什么是量化"
"7. FP16 vs INT8区别"
"8. 什么是GPU"
"9. 什么是张量并行"
"10. PagedAttention原理"
每题答题要点: 3-5个关键词

Level 2 "进阶题 11-20" (green): 🔧 icon
"11. 70B模型部署方案"
"12. 延迟优化策略"
"13. 流量10x增长怎么办"
"14. P99延迟排查"
"15. Flash Attention原理"
"16. 投机解码原理"
"17. TP vs PP选择"
"18. 量化方案评估"
"19. vLLM调度器原理"
"20. Prefix Caching机制"
每题答题要点: 完整答案框架

Level 3 "高级题 21-30" (orange): ⚡ icon
"21. MoE部署方案"
"22. DeepSeek-V3架构"
"23. FP8推理优化"
"24. 容量规划计算"
"25. 多租户平台设计"
"26. 自动扩缩方案设计"
"27. 跨Region容灾"
"28. 模型路由策略"
"29. Agent系统部署"
"30. 新技术评估流程"
每题答题要点: 系统设计+trade-off

Universal answer framework:
"技术题: 定义→原理→实践→trade-off"
"架构题: 需求→方案→对比→决策"
"行为题: STAR格式"

At the very bottom, navy blue bar with white text: "30题覆盖从基础到高级 · 每道题都有答题要点和参考数据 · 刷完=面试准备80%". --ar 3:4
```

## 14-01. 术语表

```
A clean glossary overview infographic on light cream background (#FAF8F5), titled "FDE 术语表 — 100+核心概念速查" at top in bold dark charcoal (#2D2D2D) 44px font.

Five domain categories:

Domain 1 "模型架构" (blue): 🧠 icon
Transformer · Attention · KV Cache · MHA · GQA · MQA
RoPE · SwiGLU · RMSNorm · MoE · MLA
Pre-Norm · Post-Norm · Decoder-only
每项一句话定义

Domain 2 "推理引擎" (green): ⚡ icon
vLLM · PagedAttention · Continuous Batching
TGI · SGLang · TRT-LLM
TTFT · TPOT · Throughput
每项一句话定义

Domain 3 "量化" (orange): 📊 icon
PTQ · QAT · AWQ · GPTQ · SmoothQuant
FP8 · INT8 · INT4 · E4M3 · E5M2
每项一句话定义

Domain 4 "GPU与分布式" (purple): 🔧 icon
SM · Tensor Core · CUDA Core · HBM
NVLink · TP · PP · DP · MIG
每项一句话定义

Domain 5 "部署与运维" (red): 🏗️ icon
SLO · SRE · HPA · Pod · A/B测试
Canary · RAG · Agent · Speculative Decoding
Flash Attention
每项一句话定义

At the very bottom, navy blue bar with white text: "术语是沟通的基础 · 面试中说对术语 = 基本功扎实的第一印象". --ar 3:4
```

## 15-01. 推荐资源

```
A clean curated resources infographic on light cream background (#FAF8F5), titled "FDE 推荐资源 — 论文·博客·代码·平台" at top in bold dark charcoal (#2D2D2D) 44px font.

Four resource categories:

Category 1 "核心论文 10篇" (blue): 📄 icon
"Attention Is All You Need (Transformer)"
"FlashAttention (IO-aware Attention)"
"PagedAttention (vLLM)"
"Chinchella (Scaling Law)"
"LoRA (Low-Rank Adaptation)"
"GPTQ (量化)"
"SmoothQuant (量化)"
"Speculative Decoding"
"Medusa (多头预测)"
"DeepSeek-V3 (MoE+MLA)"
每篇: 标题+一句话核心贡献

Category 2 "必读博客" (green): ✍️ icon
"vLLM Blog: 推理引擎最新动态"
"Lilian Weng (OpenAI): 技术深度博客"
"Kipp Lee (ScaleAI): 推理优化实践"
"NVIDIA Developer Blog: GPU/FP8/性能"
"Sebastian Raschka: AI教育博客"

Category 3 "代码仓库" (orange): 💻 icon
"vLLM: 推理引擎源码"
"TensorRT-LLM: NVIDIA推理引擎"
"SGLang: 结构化生成引擎"
"llm-action: 大模型实践指南"
"llm-course: 大模型学习路线"

Category 4 "学习平台" (purple): 🎓 icon
"BentoML: 模型部署教程"
"ML Mastery: 机器学习入门"
"智源社区: 中文AI社区"
"Datawhale: 开源学习组织"

At the very bottom, navy blue bar with white text: "资源不在多 · 精读10篇论文胜过泛读100篇 · 代码仓库是最直接的老师". --ar 3:4
```

## 16-01. 案例研究

```
A clean case studies infographic on light cream background (#FAF8F5), titled "FDE 案例研究 — 3个真实生产故事" at top in bold dark charcoal (#2D2D2D) 44px font.

Case 1 "70B模型从PoC到生产" (blue):
🏆 icon
背景: "客户要求部署Llama 70B"
问题1: "PoC环境裸PyTorch 吞吐仅5 token/s"
问题2: "OOM频繁 无法服务并发请求"
问题3: "首token延迟3秒 用户体验差"
4步优化:
"Step 1: 迁移vLLM → 吞吐15 token/s (3x)"
"Step 2: INT4量化 → 显存减半 可放4卡"
"Step 3: Continuous Batching → 吞吐45 token/s (9x)"
"Step 4: 自动扩缩 → 闲时成本降60%"
最终指标:
"吞吐: 5→45 token/s (9x)"
"延迟: 3s→200ms (15x)"
"成本: 降低75%"

Case 2 "新模型1周上线流程" (green):
🚀 icon
"Day 1: 需求确认 (模型/SLA/流量预估)"
"Day 2: 环境搭建 + 基线测试"
"Day 3: 量化 + 性能调优"
"Day 4: 部署到staging + 压测"
"Day 5: 灰度5%流量"
"Day 6-7: 监控正常 → 100%流量"
"关键: 有标准SOP 不需要从头摸索"

Case 3 "GPU利用率从40%提升到75%" (orange):
📈 icon
根因分析:
"问题: batch size太小 (默认=1)"
"问题: 无Continuous Batching"
"问题: 固定8个Pod 闲时也跑"
优化项:
"batch从1调到32"
"启用Continuous Batching"
"HPA自动扩缩 闲时缩到2个Pod"
结果: "利用率40%→75% · 成本降50%"

At the very bottom, navy blue bar with white text: "案例是最好的老师 · 每个案例都是真实踩坑和优化经验". --ar 3:4
```

## 17-01. 开源项目深度解读

```
A clean open source reading guide infographic on light cream background (#FAF8F5), titled "FDE 开源阅读路线 — 从nanoGPT到vLLM" at top in bold dark charcoal (#2D2D2D) 44px font. Subtitle: "按难度分级 循序渐进读源码" in gray 18px.

Six difficulty levels:

Level 1 "入门" (green): 🌱 icon · 1-2周
"llm.c: C语言实现LLM推理"
"看懂完整前向传播过程"
"目标: 理解Token→Logits的数据流"

Level 2 "模型架构" (blue): 🌿 icon · 2-4周
"nanoGPT: 极简GPT实现"
"看懂: Embedding→Attention→FFN→Output"
"目标: 理解Transformer代码实现"

Level 3 "GPU底层" (orange): 🌳 icon · 4-8周
"llama.cpp: C++推理引擎"
"看懂: GGUF格式/量化/GGML计算图"
"目标: 理解底层推理优化"

Level 4 "推理优化" (red): 🔥 icon · 8-12周
"vLLM: PagedAttention + Continuous Batching"
"看懂: Scheduler/PagedAttention/BlockManager"
"目标: 理解生产级推理引擎架构"
"SGLang: RadixAttention + 结构化生成"
"看懂: RadixTree/FSM/Compiler"

Level 5 "生产部署" (purple): 🏗️ icon · 持续
"Open-LLM-Deploy: 部署最佳实践"
"目标: 学习生产环境配置"

Level 6 "Agent系统" (maroon): 🤖 icon · 持续
"claude-mem: Claude记忆系统"
"obsidian-wiki: 知识库构建"
"目标: 理解Agent架构实践"

Reading suggestions:
"不要从头读到尾 · 带着问题读"
"先跑通demo · 再读核心代码"
"画图理解数据流"
"做笔记: 关键函数+设计决策"

At the very bottom, navy blue bar with white text: "读源码是最好的学习方式 · 从nanoGPT开始 最终读懂vLLM 你就是资深FDE". --ar 3:4
```

---

## 使用指南

1. **按顺序生成**: 从 01-01 开始 按文档编号顺序生成
2. **每个 prompt 独立使用**: 不需要上下文
3. **推荐工具**: Gemini 2.5 (最佳) / DALL-E 3 / Midjourney v6
4. **画幅比例**: 全部 3:4 竖版 适合手机浏览和社交媒体分享
5. **风格一致性**: 所有图统一浅米色背景 (#FAF8F5) + 深炭色标题 (#2D2D2D) + 底部 navy blue 总结条
