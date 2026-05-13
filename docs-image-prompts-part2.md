# FDE 全文档图解 Prompt 集合 — Part 2

---

# Module 03: GPU 基础

## 03-01. GPU 架构概述

```
A clean technical infographic on light cream background (#FAF8F5), titled "GPU 架构概述 — 从晶体管到 AI 加速器" at top in bold dark charcoal (#2D2D2D) 44px font.

Left section: GPU hierarchy diagram (nested boxes):
Outermost box "GPU" (dark gray)
  Inside: 8x "GPC" boxes (gray)
    Each GPC: 6x "TPC" boxes (light gray)
      Each TPC: 1x "SM" (Streaming Multiprocessor) (blue)
        Each SM:
        ├ 128 CUDA Cores (small red dots)
        ├ 4 Tensor Cores (green squares)
        ├ 64KB Register File
        ├ 128KB Shared Memory / L1
        └ Warp Scheduler (x2)

Right section: Key concepts:

"SIMT 单指令多线程":
"32 threads = 1 warp · 所有线程同时执行相同指令"
"GPU高效来源: 海量并行 (A100有6912个CUDA Core)"

"CUDA Core vs Tensor Core":
CUDA Core: 标量计算 (FP32) · 通用计算
Tensor Core: 矩阵乘法 (FP8/FP16/INT8) · AI专用 · 速度是CUDA的16-64x

Bottom section: NVIDIA product comparison table:
"消费级 RTX 4090": 24GB · 16384 CUDA · $1600 · 开发调试
"工作站 A6000": 48GB · 10752 CUDA · $5000 · 中小部署
"数据中心 A100": 80GB · 6912 CUDA · MIG · $15000 · 主流部署
"数据中心 H100": 80GB · 16896 CUDA · FP8 · $30000 · 高性能

At the very bottom, navy blue bar with white text: "FDE不需要写CUDA kernel 但必须理解GPU架构才能做性能优化决策". --ar 3:4
```

## 03-02. GPU 显存模型

```
A clean technical infographic on light cream background (#FAF8F5), titled "GPU 显存模型 — 从寄存器到 NVMe" at top in bold dark charcoal (#2D2D2D) 44px font.

Memory hierarchy pyramid (top = fastest/smallest, bottom = slowest/largest):

Level 1 (top, red) "寄存器 Registers":
⚡ 每线程独享 · ~256KB/SM · 零延迟
"每线程最多255个寄存器"

Level 2 (orange) "Shared Memory / L1":
🔶 每SM共享 · 128KB · 1-2 cycle
"可编程缓存 · 手动管理数据复用"

Level 3 (yellow) "L2 Cache":
🔸 全GPU共享 · 40-50MB (A100) · ~20 cycles
"所有SM可见 · 自动缓存"

Level 4 (light blue) "HBM 高带宽显存":
🔵 片上堆叠 · 80GB (A100) · 2.0 TB/s
"模型权重+KV Cache+中间激活都在这"
"GDDR6的10倍带宽"

Level 5 (blue) "DDR (CPU内存)":
🔷 800GB+ · ~50 GB/s · 跨PCIe
"CPU-GPU数据传输"

Level 6 (bottom, gray) "NVMe SSD":
⬛ 数TB · ~7 GB/s · 最慢
"模型权重存储 · 启动时加载到GPU"

Right section: KV Cache exact calculation:
"KV Cache 精确计算:"
"静态部分: 模型权重 (70B FP16 = 140GB)"
"动态部分: KV Cache (随batch和seq_len变化)"
"中间激活: 通常<5GB 可忽略"
"碎片: 传统方式20-40%浪费 PagedAttention <5%"

Memory-bound analysis box:
"当 GPU利用率 < 20% → memory-bound (需要优化数据搬运)"
"当 GPU利用率 > 60% → compute-bound (需要优化计算)"

At the very bottom, navy blue bar with white text: "LLM推理是memory-bound的 · 优化显存使用比优化计算更重要". --ar 3:4
```

## 03-03. 性能瓶颈分析

```
A clean diagnostic infographic on light cream background (#FAF8F5), titled "性能瓶颈分析 — compute-bound 还是 memory-bound" at top in bold dark charcoal (#2D2D2D) 44px font.

Top section: Two-column comparison:

Left "Compute-bound 计算密集型" (blue):
⚡ icon
"定义: GPU计算单元是瓶颈 数据充足"
"GPU利用率: 80-95%"
"优化方向: 减少计算量 (量化/蒸馏)"
"Prefill阶段: compute-bound"
"优化手段: FP8/INT8量化 · 减少FLOPs"
典型场景: 短prompt大批量

Right "Memory-bound 内存带宽型" (red):
📊 icon
"定义: 显存带宽是瓶颈 计算充足"
"GPU利用率: 10-30%"
"优化方向: 减少数据搬运 (KV Cache压缩)"
"Decode阶段: memory-bound"
"优化手段: 量化减少权重搬运 · KV Cache压缩"
典型场景: 长上下文小batch

Middle section: Roofline Model diagram:
Y-axis: Performance (GFLOPs)
X-axis: Arithmetic Intensity (FLOPs/byte)
Diagonal line: Memory bandwidth limit (e.g., 2.0 TB/s)
Horizontal line: Compute peak (e.g., 312 TFLOPS)
"Decode落在斜线下方 → memory-bound"
"Prefill落在水平线附近 → compute-bound"

Profiling tools comparison table:
"nvidia-smi": 实时监控 · GPU利用率/显存/温度
"nvtop": 交互式终端监控 · 可视化
"nsys (NVIDIA Nsight)": 系统级profiling · 时间线分析
"ncu (NVIDIA Compute)": 算子级profiling · 瓶颈定位
"PyTorch Profiler": Python层profiling · 算子耗时

At the very bottom, navy blue bar with white text: "先判断瓶颈类型再优化 · decode一定是memory-bound 优化方向只有减少数据搬运". --ar 3:4
```

## 03-04. GPU 互联架构

```
A clean technical infographic on light cream background (#FAF8F5), titled "GPU 互联架构 — 从 PCIe 到 NVLink" at top in bold dark charcoal (#2D2D2D) 44px font.

Interconnect hierarchy pyramid (top=fastest):

Level 1 (top, red) "NVLink 片内互联":
⚡ "GPU↔GPU 直连 · 900 GB/s (H100)"
"8 GPU 全互联拓扑 · 延迟最低"
"张量并行的唯一选择"

Level 2 (orange) "PCIe 4.0/5.0":
🔶 "CPU↔GPU · 64 GB/s (PCIe 5.0 x16)"
"比NVLink慢14倍"
"不适合TP 适合DP"

Level 3 (yellow) "InfiniBand / RoCE":
🔸 "Node↔Node · 400-800 Gbps"
"跨节点GPU通信"
"适合PP/DP 不适合TP"

Bandwidth comparison bar chart:
"NVLink (H100)":  ████████████████████ 900 GB/s
"PCIe 5.0 x16":   ███ 64 GB/s
"InfiniBand NDR": ██ 400 Gbps (=50 GB/s)
"RoCE v2":        █ 200 Gbps (=25 GB/s)

TP vs PP communication cost analysis:
"TP=8 (NVLink域内)":
每层: 1次AllReduce · 延迟~50μs
总延迟: N_layers × 50μs

"PP=2 (跨节点IB)":
每micro-batch: 1次Send+1次Recv · 延迟~500μs
总延迟: N_micro_batches × 500μs

Network planning guide (green box):
"8卡服务器内: 用TP (NVLink)"
"跨服务器: 用PP或DP (InfiniBand)"
"跨数据中心: 用DP (HTTP)"

At the very bottom, navy blue bar with white text: "NVLink是TP的命脉 · PCIe不够用 · 跨节点只能做PP/DP". --ar 3:4
```

---

# Module 04: 推理优化技术

## 04-01. 推理引擎概述

```
A clean overview infographic on light cream background (#FAF8F5), titled "推理引擎为什么必要 — 从裸模型到生产服务" at top in bold dark charcoal (#2D2D2D) 44px font.

Top problem statement (red warning box):
"裸PyTorch推理的4大问题:"
"❌ 显存碎片化: 连续分配KV Cache 利用率仅20-40%"
"❌ 无batching: 每个请求独立处理 吞吐极低"
"❌ 无调度: 请求排队等待 资源浪费"
"❌ 无可观测: 不知道TTFT/TPS/GPU利用率"

Inference pipeline diagram (left to right):
[Request] → [Scheduler (batching/queue)] → [Prefill Engine] → [KV Cache Manager] → [Decode Engine] → [Response]

Four core responsibilities of inference engine (4 cards):

Card 1 "显存管理" (blue): 📦 icon
"PagedAttention: 虚拟块→物理块映射"
"消除碎片 利用率90%+"

Card 2 "请求调度" (green): 🔄 icon
"Continuous Batching: 动态合并不同请求"
"吞吐提升2-3x"

Card 3 "计算优化" (orange): ⚡ icon
"FlashAttention: IO感知的Attention优化"
"Kernel Fusion: 减少kernel launch开销"

Card 4 "可观测性" (purple): 📊 icon
"TTFT/TPS/队列长度实时监控"
"Prometheus指标导出"

Tradeoff triangle (red triangle with labels):
顶点1: "低延迟" (decode time)
顶点2: "高吞吐" (batch size)
顶点3: "低成本" (GPU数量)
中心文字: "三者只能选其二 · 根据业务场景取舍"

At the very bottom, navy blue bar with white text: "推理引擎的本质是'显存+调度+计算'三位一体的优化器". --ar 3:4
```

## 04-02. vLLM 深入

```
A clean deep-dive infographic on light cream background (#FAF8F5), titled "vLLM 深入 — PagedAttention 与 Continuous Batching" at top in bold dark charcoal (#2D2D2D) 44px font.

Section 1 "PagedAttention 原理" (blue):
Left: "传统方式" (gray, crossed-out)
📦 连续分配: [Request1: 100块][Request2: 50块]
"问题: Request1实际只用了30块 浪费70块"
"碎片率: 60-80%"

Right: "PagedAttention" (green, highlighted)
📋 分页管理: Virtual Block 0→Physical Block 3
Virtual Block 1→Physical Block 7
Virtual Block 2→Physical Block 1
"按需分配 只给实际使用的块"
"碎片率: <5%"
"吞吐量提升: 2-4x"

Section 2 "Continuous Batching 原理" (green):
Before (gray):
Batch: [R1████████][R2████][R3████████████][____空闲____]
"传统static batching: 所有请求必须等最长的完成"

After (green):
Batch: [R1完成][R2▓▓][R3▓▓▓][R4新入██]
"Continuous: 请求完成即释放 新请求立即填补空位"
"吞吐提升: 2-3x"

Section 3 "Prefix Caching" (orange):
📌 icon
"多请求共享相同前缀 → 共享KV Cache"
"场景: 系统prompt相同 仅用户输入不同"
"命中时: 零计算 直接返回"
"加速: 多轮对话/相同系统prompt场景 3-5x"

Key parameters table:
"gpu-memory-utilization": 0.90-0.95 (默认0.9)
"max-num-seqs": 256 (最大batch size)
"max-model-len": 4096 (最大序列长度)
"enable-prefix-caching": True/False

At the very bottom, navy blue bar with white text: "vLLM=通用首选 · PagedAttention+Continuous Batching是核心三板斧". --ar 3:4
```

## 04-03. TRT-LLM 深入

```
A clean deep-dive infographic on light cream background (#FAF8F5), titled "TensorRT-LLM 深入 — 编译优化到极致" at top in bold dark charcoal (#2D2D2D) 44px font.

TRT-LLM vs vLLM positioning box (top):
"vLLM: 通用灵活 · 运行时优化 · 易部署"
"TRT-LLM: 极致性能 · 编译期优化 · 调优复杂"

Compilation optimization pipeline (left to right):

Step 1 "模型图优化" (blue):
🔧 icon
"Constant Folding: 预计算常量"
"Operator Fusion: 合并可合并的算子"
"Dead Code Elimination: 删除无用计算"

Step 2 "Kernel 自动调优" (green):
⚡ icon
"Auto-tuning: 为当前GPU找到最优kernel配置"
"多种算法实现 选最快的"
"耗时: 数十分钟~数小时 (一次性)"

Step 3 "Tensor Parallel 编译" (orange):
🔀 icon
"编译期决定TP切分方案"
"比运行时切分更高效"
"需要指定 TP size 后重新编译"

Step 4 "Engine 生成" (red):
📦 icon
"输出: .engine 二进制文件"
"加载速度: 秒级"
"部署: 只需engine文件 不需要原始模型"

Kernel Fusion detail box:
"典型优化:"
"LayerNorm + Scale → 融合为1个kernel"
"MatMul + Bias + GELU → 融合为1个kernel"
"减少kernel launch开销 提升GPU利用率"

When to use TRT-LLM (green decision box):
"✅ 追求极致性能 愿意花时间调优"
"✅ 模型固定 不经常切换"
"❌ 需要快速原型或多模型切换 → 用vLLM"

At the very bottom, navy blue bar with white text: "TRT-LLM吞吐是vLLM的1.2-2x · 但编译调优成本高 · 适合性能敏感场景". --ar 3:4
```

## 04-04. SGLang 深入

```
A clean deep-dive infographic on light cream background (#FAF8F5), titled "SGLang 深入 — RadixAttention 与结构化生成" at top in bold dark charcoal (#2D2D2D) 44px font.

SGLang positioning box (green):
"vLLM 的 Prefix Caching 是线性匹配 · SGLang 的 RadixAttention 是树状匹配"

RadixAttention diagram:
Tree structure with nodes representing token prefixes:
Root → "你是一个助手" (shared by all requests)
  → "帮我写代码" → (Request A)
  → "翻译这句话" → (Request B)
  → "总结一下" → (Request C)
"所有共享前缀的请求复用同一份KV Cache"
"比vLLM Prefix Caching更灵活 支持非连续前缀"

RadixAttention vs Prefix Caching comparison:
"vLLM Prefix Caching": 只能缓存完整前缀 · 精确匹配
"RadixAttention": 缓存任意前缀子串 · 模糊匹配 (LRU淘汰)
"效果: Agent场景 2-5x 加速"

Structured Generation detail box:
"FSM (有限状态机) 约束输出格式:"
"JSON: 保证输出合法JSON对象"
"Regex: 匹配正则表达式"
"Choices: 从枚举值中选择"
"EBNF: 上下文无关文法"
"应用: Function Calling · 数据提取 · 代码生成"

SGLang vs vLLM comparison:
vLLM: 通用部署 · Continuous Batching · 吞吐2-4x · 社区大
SGLang: Agent场景 · RadixAttention+结构化生成 · 2-5x · 新锐

Function Calling example:
User: "查询北京明天的天气"
SGLang output:
{"tool": "weather_api", "city": "北京", "date": "明天"}
(100% 合法JSON 无需后处理)

At the very bottom, navy blue bar with white text: "Agent场景选SGLang · RadixAttention+结构化生成是杀手级特性". --ar 3:4
```

## 04-05. 量化基础

```
A clean technical infographic on light cream background (#FAF8F5), titled "量化基础 — 用更低精度做同样的事" at top in bold dark charcoal (#2D2D2D) 44px font.

Top: Precision evolution timeline (left to right):
FP32 (32bit, 4bytes) → FP16 (16bit, 2bytes) → INT8 (8bit, 1byte) → INT4 (4bit, 0.5byte) → FP8 (8bit, 1byte, H100)

Each precision shows: bit diagram, memory for 70B model, speed relative to FP16.

Quantization math box:
"Uniform Quantization (对称):"
"INT8 = round(x / scale)"
"scale = max(|x|) / 127"
"Dequant: x ≈ INT8 × scale"

"Asymmetric Quantization:"
"INT8 = round((x - zero_point) / scale)"
"zero_point 处理非零中心分布"

Granularity comparison:
"Per-tensor": 整个张量1个scale · 最简单 · 精度最低
"Per-channel": 每行1个scale · 精度更高 · 略复杂
"Per-group": 每组(如128个)1个scale · 精度最好 · 最复杂

Why quantization saves memory AND speed:
"显存: FP16→INT8 直接减半 (140GB→70GB)"
"速度: H100 INT8 Tensor Core = 2× FP16 吞吐量"
"但: CPU/老GPU上 INT8可能更慢 (没有INT8 Tensor Core)"

PTQ vs QAT comparison:
"PTQ (训练后量化)": 无需训练 · 用calibration数据找scale · 适合INT8
"QAT (量化感知训练)": 微调补偿精度损失 · 适合INT4

At the very bottom, navy blue bar with white text: "INT8是通用量化首选 · H100上FP8更好 · INT4需要QAT补偿精度". --ar 3:4
```

## 04-06. 量化方案深入

```
A clean deep-dive infographic on light cream background (#FAF8F5), titled "量化方案深入 — AWQ / GPTQ / SmoothQuant / FP8" at top in bold dark charcoal (#2D2D2D) 44px font.

Four scheme cards:

Card 1 "AWQ 激活感知权重量化" (green):
📊 icon
"核心: 保护1%的salient weights(激活大的权重)"
"方法: 对非salient weights做INT4 salient保留FP16"
"优点: 精度损失<0.5% · 适合LLM"
"速度: 比GPTQ快 (不需要逐层优化)"
"推荐: INT4量化首选"

Card 2 "GPTQ 逐层Hessian优化" (blue):
🔧 icon
"核心: 逐层量化 每层用Hessian矩阵优化scale"
"方法: 量化→重建→最小化误差 迭代优化"
"优点: INT4精度最好"
"缺点: 慢 (逐层需要数分钟)"
"推荐: 追求极致INT4精度"

Card 3 "SmoothQuant 平滑变换" (orange):
⚖️ icon
"核心: 将激活的困难度转移到权重上"
"方法: 对激活除以s 对权重乘以s"
"优点: 同时量化激活和权重 (W8A8)"
"推荐: 需要端侧部署(如Jetson)"

Card 4 "FP8 浮点8位" (red, H100 exclusive):
⚡ icon + "H100专属" badge
"E4M3: 4bit指数+3bit尾数 · 适合推理 (动态范围大)"
"E5M2: 5bit指数+2bit尾数 · 适合训练 (精度稍高)"
"H100 FP8 Tensor Core: 1978 TFLOPS (FP16的2倍)"
"精度损失: 0.5-1.5%"
"推荐: H100上的最优方案"

Accuracy comparison:
FP16: 基线 100%
FP8 (E4M3): 99.5-99.0%
INT8 (SmoothQuant): 99.5-99.0%
INT4 (AWQ): 98-99%
INT4 (GPTQ): 98.5-99.5%

At the very bottom, navy blue bar with white text: "H100用FP8 · A100用INT8(AWQ) · 端侧用SmoothQuant · 极致INT4用GPTQ". --ar 3:4
```

## 04-07. KV Cache 量化

```
A clean deep-dive infographic on light cream background (#FAF8F5), titled "KV Cache 量化 — 比权重量化更难的事" at top in bold dark charcoal (#2D2D2D) 44px font.

Top insight: "KV Cache 占推理显存 60-80% · 量化KV Cache 比量化权重收益更大"

Why KV quant is harder (orange warning):
"⚠️ KV Cache量化的特殊挑战:"
"动态范围大: 不同token的KV值差异巨大"
"per-token变化: 每个新生成的token值不同"
"累积误差: decode阶段误差会累积传播"
"精度敏感: Attention分数对KV值非常敏感"

Four KV quant schemes comparison:

Scheme 1 "INT8 KV量化":
"最简单 · 每token/channel量化"
"显存减半 · 精度损失<0.5%"
"vLLM原生支持"

Scheme 2 "FP8 KV量化":
"H100原生支持FP8 GEMM"
"显存减半 · 动态范围比INT8大"
"精度损失0.5-1.0%"

Scheme 3 "KIVI (Kernel for INT4 KV)":
"INT4 KV量化 · 显存降至1/4"
"需要自定义kernel"
"精度损失1-2% (可接受)"

Scheme 4 "PQ (Product Quantization)":
"向量量化 · 将KV分组码本"
"显存降至1/4~1/8"
"精度损失较大 但极致压缩"

Weight quant vs KV quant priority:
"优先做权重量化 (更简单 收益大)"
"再做KV量化 (更难 额外收益)"
"两者都做: FP16→INT8权重+INT8 KV = 显存降至1/4"

At the very bottom, navy blue bar with white text: "KV Cache量化是进阶优化 · INT8 KV最简单有效 · INT4需KIVI等方案". --ar 3:4
```

---

# Module 05: 分布式推理

## 05-01. 分布式推理概述

```
A clean overview infographic on light cream background (#FAF8F5), titled "分布式推理 — 单卡放不下怎么办" at top in bold dark charcoal (#2D2D2D) 44px font.

Top: Two walls problem:

"Memory Wall 显存墙" (blue):
📊 icon
"70B FP16 = 140GB > 单卡80GB"
"175B FP16 = 350GB > 单卡80GB"
"解决: 把模型分散到多张卡"

"Compute Wall 计算墙" (red):
⚡ icon
"70B decode单步 = 0.45ms计算但70ms搬运权重"
"解决: 多卡分担带宽压力"

Five parallel strategies comparison:

"DP 数据并行": 📋 icon · "模型完整复制 不同请求不同GPU" · 通信:无
"TP 张量并行": 🔀 icon · "单层内矩阵切分" · 通信:AllReduce (NVLink)
"PP 流水线并行": 📦 icon · "按层切分" · 通信:Send/Recv
"EP Expert并行": 🧩 icon · "Expert分散" · 通信:AllToAll
"CP 上下文并行": ✂️ icon · "序列分段" · 通信:Ring Attention

Communication overhead comparison:
DP: 无通信 · 最简单
TP: 每层1次AllReduce · ~50μs/层 (NVLink)
PP: 每micro-batch 1次Send+Recv · ~500μs
EP: AllToAll · ~1-5ms (取决于Expert数)
CP: Ring AllReduce · ~2-10ms (取决于序列长度)

Decision tree (bottom right):
"70B单请求" → TP=8
"多请求高吞吐" → DP+TP
"MoE模型" → TP+EP
"超长上下文" → CP
"跨节点" → PP+DP

At the very bottom, navy blue bar with white text: "分布式推理的核心是'用通信换显存' · 通信开销决定了最优方案". --ar 3:4
```

## 05-02. 张量并行深入

```
A clean deep-dive infographic on light cream background (#FAF8F5), titled "张量并行深入 — 矩阵如何切分到多张GPU" at top in bold dark charcoal (#2D2D2D) 44px font.

Matrix partitioning principle:

Column Parallel (green):
Y = XA
A 按列切分: [A1|A2|A3|A4] → 每张卡放一部分列
Y 也按列切分: [Y1|Y2|Y3|Y4]
"适合: QKV 投影 (可以分开计算再拼接)"

Row Parallel (blue):
Y = XA
A 按行切分: 每张卡放一部分行
Y1=A的结果 + Y2=B的结果 + ... → AllReduce 求和
"适合: FFN 输出投影 (需要求和)"

QKV column partitioning example:
"QKV = X · [W_Q | W_K | W_V]"
"TP=4: 每张卡计算 [W_Q_i | W_K_i | W_V_i]"
"结果拼接: Q = concat(Q_1, Q_2, Q_3, Q_4)"
"不需要AllReduce 因为是column parallel"

FFN row+column partitioning:
"FFN = X · W_up → GELU → W_down"
"W_up: column parallel (分开算)"
"W_down: row parallel (需要AllReduce求和)"

AllReduce communication detail:
"TP每层需要2次AllReduce (Attention输出 + FFN输出)"
"70B模型80层 = 160次AllReduce/前向"
"每次AllReduce ~50μs (NVLink)"
"总通信开销: 160 × 50μs = 8ms"

Scaling efficiency:
"TP=2: ~90%效率 (通信占比小)"
"TP=4: ~80%效率"
"TP=8: ~65%效率 (通信占比增大)"
"TP>8: 不推荐 (NVLink域外效率骤降)"

At the very bottom, navy blue bar with white text: "TP=8是8卡NVLink的上限 · 再大效率不划算 · 跨节点用PP". --ar 3:4
```

## 05-03. 流水线并行深入

```
A clean deep-dive infographic on light cream background (#FAF8F5), titled "流水线并行深入 — 按层切分模型" at top in bold dark charcoal (#2D2D2D) 44px font.

PP principle:
"将模型层切分到不同GPU:"
"GPU0: Layer 0-39 (前40层)"
"GPU1: Layer 40-79 (后40层)"
"GPU0计算完→Send结果→GPU1继续计算"

Why micro-batch is needed:
Naive PP problem (red warning):
"如果没有micro-batch:"
"GPU0算完layer0-39→等GPU1算完→GPU0空闲"
"Bubble (空闲时间): 50% GPU浪费!"
Diagram: GPU0[计算░░░等待░░░] GPU1[░░░等待░░░计算]

1F1B solution (green):
"1F1B (One-Forward-One-Backward):"
"GPU0先发完所有forward→再从后往前backward"
"GPU1边收边算"
"Bubble降至: ~1/N (N=GPU数)"
Diagram: GPU0[FFFFBBBB] GPU1[░FFFF░BBBB] (much better)

PP vs TP comparison:
"TP": 切单层矩阵 · AllReduce通信 · NVLink域内 · 延迟低
"PP": 切层 · Send/Recv通信 · 可跨节点 · bubble开销

When to choose PP (green box):
"✅ 模型太大 单节点放不下 (如 1T 参数)"
"✅ 需要跨节点部署"
"✅ 和TP组合: TP=8(节点内) + PP=2(跨节点)"
"❌ 70B单节点能放下 → 只用TP更简单"

vLLM PP implementation:
"vLLM从0.3版本支持PP"
"配置: tensor_parallel_size=4, pipeline_parallel_size=2"
"= 4卡TP × 2卡PP = 8卡部署70B"

At the very bottom, navy blue bar with white text: "PP适合跨节点大模型 · bubble是主要开销 · 和TP组合是超大模型的最优解". --ar 3:4
```

## 05-04. MoE 并行

```
A clean deep-dive infographic on light cream background (#FAF8F5), titled "MoE 并行 — Expert 分散到多张GPU" at top in bold dark charcoal (#2D2D2D) 44px font.

MoE architecture review:
"每个token被Router分配到top-2 Expert"
"Expert可以分散在不同GPU上"

Cross-GPU Expert distribution diagram:
GPU0: [Expert 0, Expert 1, Expert 2, Expert 3]
GPU1: [Expert 4, Expert 5, Expert 6, Expert 7]
GPU2: [Expert 8, Expert 9, Expert 10, Expert 11]
GPU3: [Expert 12, Expert 13, Expert 14, Expert 15]

Token routing flow:
"Token 需要 Expert 1 → 在GPU0 ✓ (本地)"
"Token 需要 Expert 7 → AllToAll → 发送到GPU1"
"Token 需要 Expert 15 → AllToAll → 发送到GPU3"

AllToAll communication detail:
"AllToAll: 每张卡发送token到其他所有卡"
"通信量: (N-1)/N 的token需要跨GPU"
"延迟: ~1-5ms (取决于Expert数和网络)"
"优化: Expert并行度 ≤ GPU数 时最优"

EP + TP combination:
"单纯EP: Expert分散到所有GPU"
"TP+EP: 每个Expert内部再做TP切分"
"例如: 16 Expert × TP=2 = 需要32 GPU"

Load balancing strategies:
"Auxiliary Loss: 训练时惩罚负载不均衡"
"Capacity Factor: 限制每个Expert的最大token数"
"Drop token: 超出的token丢弃 (训练时)"
"Overflow to next Expert: 超出的交给第二Expert (推理时)"

DeepSeek-V3 case:
"DeepSeek-V3: 160 Expert + MLA (Multi-Head Latent Attention)"
"每token选择top-6 Expert"
"激活参数仅21B (总参236B)"
"MLA: 压缩KV Cache的Attention变体"

At the very bottom, navy blue bar with white text: "MoE并行的核心挑战是AllToAll通信 · Expert越多通信越重 · 负载均衡决定效率". --ar 3:4
```

---

# Module 06: 生产部署

## 06-01. 部署架构全景

```
A clean layered architecture infographic on light cream background (#FAF8F5), titled "LLM 推理服务完整部署架构" at top in bold dark charcoal (#2D2D2D) 44px font.

User request flow (top to bottom through layers):

Layer 1 "用户层" (purple): 🌐 icon
"用户请求 (HTTP/gRPC)"
"API Key 认证"
"Rate Limiting: 100 QPS per user"

Layer 2 "网关层" (blue): 🚪 icon
"API Gateway: 路由/限流/认证"
"Model Router: 按请求选择模型版本"
"Load Balancer: 轮询/最少连接/加权"

Layer 3 "引擎层" (green): ⚡ icon
"vLLM / TRT-LLM Pod × N"
"模型热加载: 新版本预加载到空闲Pod"
"PagedAttention + Continuous Batching"
"GPU Memory: 90%利用率"

Layer 4 "基础设施层" (orange): 🏗️ icon
"K8s 集群管理"
"GPU 节点: A100/H100 8卡服务器 × M"
"高速网络: InfiniBand / RoCE"

Monitoring overlay (dashed border around all layers):
"📊 Prometheus + Grafana"
"Metrics: GPU利用率 · TTFT · TPS · 队列长度"
"Logging: ELK/Loki 请求日志"
"Alert: P99延迟>2s → 告警"

Key deployment metrics targets:
"TTFT (首token延迟): < 500ms"
"TPOT (每token延迟): < 50ms"
"吞吐量: > 100 token/s per GPU"
"可用性: 99.9% (月宕机<43min)"
"GPU利用率: decode 10-30% (正常) prefill 80-95%"

At the very bottom, navy blue bar with white text: "完整部署架构 = 网关 + 引擎 + 监控 + 扩缩 · 缺一不可". --ar 3:4
```

## 06-02. 自动扩缩

```
A clean technical infographic on light cream background (#FAF8F5), titled "LLM 服务自动扩缩 — 从 HPA 到 KEDA" at top in bold dark charcoal (#2D2D2D) 44px font.

Standard HPA limitations (red warning):
"⚠️ 标准HPA的不足:"
"只支持CPU/内存指标"
"不支持GPU利用率/队列长度"
"响应慢: 默认5分钟评估周期"
"扩缩粗糙: 每次±1 Pod"

Custom metric HPA (blue):
"通过 Prometheus Adapter 暴露自定义指标:"
"http_requests_total → QPS"
"queue_length → 排队请求数"
"gpu_utilization → GPU利用率"
"评估周期: 15秒"

KEDA configuration (green):
"KEDA (Kubernetes Event-Driven Autoscaling):"
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
spec:
  minReplicaCount: 2
  maxReplicaCount: 20
  triggers:
  - type: prometheus
    metadata:
      threshold: '50'  # 队列>50扩容
      query: queue_length

Cold start problem (orange warning):
"⚠️ 冷启动: 新Pod需要加载模型权重"
"70B模型加载: ~30-60s (从NVMe)"
"解决:"
"方案1: 模型预热 — 空闲Pod预加载权重"
"方案2: 共享显存 — 多Pod共享模型权重"
"方案3: 最小副本 — 始终保留2个热Pod"

Graceful shutdown:
"缩容时:"
"停止接收新请求"
"处理完队列中所有请求"
"优雅退出 (30s timeout)"
"释放GPU显存"

At the very bottom, navy blue bar with white text: "KEDA+HPA是自动扩缩最佳组合 · 冷启动是最大挑战 · 预热是最佳解法". --ar 3:4
```

## 06-03. 可观测性

```
A clean monitoring infographic on light cream background (#FAF8F5), titled "LLM 服务可观测性 — Metrics · Traces · Logs" at top in bold dark charcoal (#2D2D2D) 44px font.

Three pillars of observability (3 columns):

Pillar 1 "Metrics 指标" (blue): 📊 icon
"What: 聚合数值 · 趋势"
Tools: "Prometheus + Grafana"
Key metrics:
"TTFT (Time To First Token): < 500ms"
"TPOT (Time Per Output Token): < 50ms"
"Throughput: tokens/s per GPU"
"Queue length: 排队请求数"
"GPU utilization: 10-95%"
"GPU memory: 已用/总量"
"Error rate: 4xx/5xx"
Storage: "TSDB · 保留30天"

Pillar 2 "Traces 链路" (green): 🔗 icon
"What: 请求全路径 · 每步耗时"
Tools: "OpenTelemetry + Jaeger"
Spans:
"Gateway → Router → vLLM Pod"
"├ Prefill: 200ms"
"├ Decode × 50: 50ms each = 2500ms"
"└ Total: 2700ms"
Use case: "定位TTFT瓶颈 · 追踪慢请求"

Pillar 3 "Logs 日志" (orange): 📝 icon
"What: 详细事件记录"
Tools: "Loki / ELK"
Log levels:
"INFO: 请求完成 · batch size · token数"
"WARN: 队列积压 · GPU利用率低"
"ERROR: OOM · 模型加载失败"
Storage: "压缩存储 · 保留7天"

Monitoring data flow diagram:
vLLM Pod → /metrics → Prometheus → Grafana Dashboard
vLLM Pod → OpenTelemetry → Jaeger Traces
vLLM Pod → stdout → Loki → Log Browser

Alert rules:
"P99 TTFT > 2s → P1 告警"
"GPU利用率 < 5% 持续10min → P2 告警"
"错误率 > 1% → P1 告警"
"队列长度 > 100 → P2 告警"

At the very bottom, navy blue bar with white text: "可观测性不是可选项 · 没有监控的推理服务就是蒙眼开车". --ar 3:4
```

## 06-04. 容灾策略

```
A clean disaster recovery infographic on light cream background (#FAF8F5), titled "LLM 服务容灾策略 — 从单Pod故障到全区域宕机" at top in bold dark charcoal (#2D2D2D) 44px font.

Four disaster levels (severity increasing):

Level 1 "单Pod故障" (yellow):
⚠️ icon · 影响: 1个Pod · 恢复: <10s
"现象: 某个vLLM Pod crash"
"检测: K8s health check失败"
"恢复: K8s自动重启Pod"
"请求: 重路由到健康Pod"
"数据: 无丢失 (无状态服务)"

Level 2 "单GPU故障" (orange):
🔧 icon · 影响: 1张GPU · 恢复: 1-5min
"现象: Xid Error / ECC Error / 温度过高"
"检测: nvidia-smi 返回错误"
"恢复: 标记GPU为unavailable · 自动替换节点"
"降级: TP=8→TP=4 + 队列等待"

Level 3 "单节点故障" (red):
🏥 icon · 影响: 8张GPU · 恢复: 5-30min
"现象: 服务器宕机 / 网络断开"
"检测: 心跳检测超时"
"恢复: 自动failover到备用节点"
"前提: 跨节点PP部署 + 模型权重共享存储"

Level 4 "全区域故障" (dark red):
🌍 icon · 影响: 全部GPU · 恢复: 30min-2h
"现象: 整个Region宕机"
"检测: 外部监控 (跨区域)"
"恢复: DNS切换到备用Region"
"指标: RPO<1min · RTO<5min"

Fault scenario matrix:
故障类型 | 影响范围 | 恢复时间 | 数据丢失
Pod crash | 1 Pod | <10s | 无
GPU Xid | 1 GPU | 1-5min | 当前请求
Node down | 8 GPU | 5-30min | 当前请求
Region down | 全部 | 30min-2h | <1min

Model rollback strategy:
"新版本异常 → 秒级切回旧版本"
"A/B灰度: 先5%流量 · 正常→逐步放大"
"健康检查拦截: 新版本启动后自动跑测试"

At the very bottom, navy blue bar with white text: "容灾不是预测问题 是必然事件 · 提前准备好降级方案比事后补救重要100倍". --ar 3:4
```

## 06-05. 多租户与平台化

```
A clean multi-tenant architecture infographic on light cream background (#FAF8F5), titled "多租户与平台化 — 一份GPU服务多个团队" at top in bold dark charcoal (#2D2D2D) 44px font.

Multi-tenant architecture diagram:
[Team A Request] → [Priority Queue] → [Scheduler] → GPU Pool
[Team B Request] → [Priority Queue] →             → (A100×8)
[Team C Request] → [Priority Queue] →             → (H100×8)

Four resource isolation strategies:

Strategy 1 "硬隔离: 独享GPU" (blue):
🔒 icon
"每个团队独占1-2张GPU"
"优点: 零干扰 · 性能可预测"
"缺点: GPU利用率低 (闲时浪费)"
"适合: 生产环境 · SLA严格的场景"

Strategy 2 "MIG 分割" (green):
📐 icon
"A100 MIG: 1张A100分成最多7个实例"
"每个实例有独立显存/计算"
"MIG 1g.10gb: 10GB显存 · 1/7计算"
"MIG 7g.80gb: 80GB显存 · 全部计算"
"优点: 硬件级隔离 · 适合开发/测试"
"缺点: 仅A100支持 · 性能非线性"

Strategy 3 "Time-slicing 时分复用" (orange):
⏰ icon
"多任务共享GPU 时间片轮转"
"每个任务分配时间配额"
"优点: GPU利用率最高"
"缺点: 性能不可预测 · 任务互相影响"
"适合: 开发/批处理场景"

Strategy 4 "逻辑隔离" (purple):
🏷️ icon
"通过K8s namespace/resource quota"
"限制: max GPU hours / max concurrent requests"
"优点: 最简单 · 管理灵活"
"缺点: 无硬保障 · 大请求可以抢占"

Billing & accounting:
"计费模型:"
"按GPU小时: $X/GPU-hour"
"按token: $X/1K tokens"
"按请求: $X/request"
"报表: 每个团队的用量·成本·SLA"

At the very bottom, navy blue bar with white text: "生产用硬隔离 · 开发用MIG或time-slicing · 逻辑隔离做配额管理". --ar 3:4
```

---

*(后续模块: 07 Agent / 08 Cost / 09 Frontier / 10 Interview / 11 Team / 12 Labs / 13-17 Reference)*
