# 第 7 篇：推理加速②——投机解码与 OOM

---

## 发布方案

### 标题（选一）

- 投机解码——让小模型帮大模型加速
- OOM 了怎么办？显存爆了排查实录
- 多卡怎么拆分？一张图看懂分布式选型

---

### 小红书正文

```
推理太慢怎么办？显存爆了怎么排查？多卡并行怎么选？
这篇 6 张漫画带你搞懂推理加速进阶：
① 投机解码 —— 让小模型帮大模型加速
② 一块 GPU 装不下 —— 三种拆分策略
③ OOM 排查实录 —— 显存爆了怎么办？
④ 性能 profiling —— 找到瓶颈再优化
⑤ 分布式选型 —— 什么时候用什么策略
⑥ MoE 多卡部署 —— 671B 参数怎么分布？
收藏这篇，性能优化不迷路！
#投机解码 #OOM #性能优化 #分布式推理 #大模型加速
```

---

### 图片内容（共 7 张）

---

# 封面

```
Create a vertical cover image for Xiaohongshu (3:4 ratio). Cute cartoon style.
Title in large bold text at center: "推理加速进阶"
Subtitle below: "OOM 了怎么办？"
Characters:
- 小白 (grey hoodie, glasses, curious)
- 老F (purple T-shirt with "FDE" logo, confident)
Style: Clean, modern, purple/white color scheme. Text must be clear and readable.
```

---

## 第 35 话：投机解码 —— 让小模型帮大模型加速

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "投机解码"
Panel 1:小白: "量化也搞定了，引擎也选好了——还有不花钱就能加速的方法吗？"
"老F: "有！投机解码——让小模型帮大模型加速"小白: "小模型帮大模型？"
"
Panel 2:Exam scene - before:小白 taking a test alone.小白 thinking: "这道题...那道题...好慢啊"
 "大模型一个字一个字生成——很慢"
Panel 3:Exam scene - with spec decode:老F brings a smart kid (小模型).老F: "让小学生先猜，教授来检查！"
"小 kid quickly writes: "答案 A, B, C, D, E"
"Caption: "小模型一次猜 3-5 个词，速度超快"
Panel 4:Professor (大模型) checking:Professor: "A 对了✓，B 对了✓，C 对了✓，D 错了✗——改！E 对了✓"
 "猜对的保留，猜错的纠正"
 "平均下来少算了很多！"
"
Panel 5:老F: "加速 2-3 倍，不需要额外 GPU！"
"老F: "Medusa、EAGLE-3 都是这个方法"老F: "简单问题小模型就能猜对，复杂问题大模型纠正"小白: "免费加速——这招太棒了！"
"老F: "简单但有效——这就是好技术"
Bottom caption: "小模型先猜，大模型验证——猜对的过，猜错的改，免费加速 2-3 倍
```

## 第 36 话：一块 GPU 装不下 —— 三种拆分策略

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "多卡并行"
Panel 1:小白 trying to fit a HUGE model (70B, 140GB) onto a single GPU board (80GB).加速方法都学完了，但一块卡还是装不下。
 "我太——大了！放——不——下——！"
"GPU board: "我才 80GB！"
"小白: "怎么办？！"
"老F: "拆开放！三种拆法"
Panel 2:拆法 1 - 张量并行 TP:老F with a saw cutting a matrix in half.
 "把每一层拆成两半，两块 GPU 各算一半"GPU0: [矩阵左半边]  GPU1: [矩阵右半边]"两个人一起算一道大题——最后拼起来"
 "这适合什么场景？"
"老F: "同一台机器内，用 NVLink，超快"
Panel 3:拆法 2 - 流水线并行 PP:
 "GPU1 算前 16 层，GPU2 算后 16 层"GPU0: Layer 1-16 → GPU1: Layer 17-32"像工厂流水线——一人负责一段"
 "那层之间怎么传？"
"老F: "算完一层传给下一个——但会有等待时间（流水线气泡）"
"
Panel 4:拆法 3 - 数据并行 DP:Three identical models on three GPUs.老F: "每个 GPU 都有完整模型"老F: "不同 GPU 处理不同请求""
"就像多个柜台同时服务客户""
"最简单——直接提高吞吐量"
Panel 5:老F writes a formula:"实际方案 = TP + PP + DP 组合拳""
"比如 8 卡：TP=4（每层拆4份）, PP=2（分2段）, DP=1"老F: "70B 模型常见方案：4 卡 TP 或 2 卡 TP + 2 卡 DP"
"小白: "先搞清楚模型多大，再决定怎么拆——明白了！"
"
Bottom caption: "TP 切矩阵、PP 分层、DP 多副本——拆开放就装得下了
```

## 第 37 话：OOM 了怎么办 —— 显存爆了排查实录

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "OOM 排查实录"
Panel 1:小白 at his computer, red error message on screen:"模型拆到多卡上了，但跑起来又报错了！"
"
rror: CUDA out of memory. Tried to allocate 2.00 GiB. GPU 0 has 80.00 GiB total."小白 panicking: "OOM！80GB 都不够？！"
"老F calmly: "别急——一步步排查"
Panel 2:Step 1 - 看显存:小白 runs: nvidia-smi显示: "GPU Memory: 79.8 / 80.0 GB"
"老F: "显存确实满了——看是什么占了"老F: "模型权重 FP16 70B ≈ 140GB"
"小白: "等等——80GB 的卡装 140GB 的模型？！"
"老F: "对！你没量化就加载了"
Panel 3:小白: "量化！我忘了量化了！"
"小白 loads INT4 model instead: "显存：35 / 80 GB ✓"小白 runs inference again.显示: "GPU Memory: 78 / 80 GB"
"小白: "还是快满了？！"
"老F: "KV Cache——你的 batch size 设太大了"
Panel 4:小白 reduces batch size: 32 → 8显存: "42 / 80 GB ✓"运行成功！小白: "终于跑通了！"
"小白: "原来 OOM 不是'显存不够'——是'哪里没优化'"老F: "OOM 三步排查：1. 模型精度 2. KV Cache 3. Batch Size"
"
Panel 5:老F writes OOM checklist:"❶ 模型量化了吗？FP16→INT4 省 75%""
"❷ Batch size 设了多少？从 8 开始试""
"❸ 上下文长度设了多少？4096→2048 省一半 KV Cache"
""
"❹ 开了 PagedAttention 吗？vLLM 自动管理""
"❺ 其他进程占显存了吗？nvidia-smi 看"小白: "踩完这一坑，全懂了！"
"
Bottom caption: "OOM 不是'显存不够'——是'哪里没优化'。量化→降 batch→缩长度，三步搞定
```

## 第 38 话：性能 profiling —— 找到瓶颈再优化

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "性能 profiling"
"
Panel 1:小白: "OOM 排查搞定了，模型跑通了——但首字延迟 2 秒，怎么优化？"
"老F: "先 profiling 找到瓶颈，再优化"小白: "什么是 profiling？"
"老F: "就是给模型做'体检'——看哪里慢"
Panel 2:小白 runs vLLM benchmark:"TTFT（首字延迟）：2000ms"
""
"TPOT（每个 token 时间）：50ms"
""
"吞吐量：25 req/s"
"老F: "TTFT 2 秒——Prefill 阶段慢"老F: "TPOT 50ms——Decode 还可以"
Panel 3:老F: "Prefill 慢的原因——你的 prompt 太长了"老F: "2000 个 token 的 prompt，Prefill 要算很久"老F: "两个解决方案""
"方案 1：Chunked Prefill——把长 prompt 分成几段算""
"方案 2：Prefill-Decode 分离——Prefill 用算力强的 GPU"
"
Panel 4:小白 tries Chunked Prefill:TTFT: "2000ms → 800ms ✓"小白: "快了这么多？！"
"老F: "Chunked Prefill 不让长 prompt 阻塞其他请求"老F: "就像餐厅——大桌客人分批上菜，不让其他人等"
Panel 5:老F shows before/after optimization:"优化前：TTFT 2000ms, 吞吐 25 req/s"
""
"量化 INT4: TTFT 1500ms, 吞吐 40 req/s"
""
"降 batch: TTFT 1200ms, 吞吐 50 req/s"
""
"Chunked Prefill: TTFT 800ms, 吞吐 65 req/s"
"小白: "每一步都有提升——加起来快了 2.5 倍！"
"老F: "这就是 profiling 的意义——找到瓶颈，对症下药"老F: "不是'换更快的 GPU'——是'找到哪里慢'"
Bottom caption: "先 profiling 找瓶颈，再对症下药——每步优化都有数据支撑
```

## 第 39 话：分布式选型 —— 什么时候用什么策略

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "分布式选型"
Panel 1:小白 at a crossroads with 3 signs:← TP（张量并行）→ PP（流水线并行）↑ DP（数据并行）小白: "之前做了 profiling 找到瓶颈——但多卡并行，我该选哪种拆分方式？"
"
Panel 2:老F as a traffic guide asks Question 1:老F: "第一问：一块 GPU 装得下吗？"
"小白 thinks: "70B FP16 = 140GB，A100 = 80GB...装不下！"
"老F: "装不下 → 继续"小白: "如果装得下呢？"
"老F: "单卡部署！啥都不用搞！最舒服！"
"
Panel 3:老F asks Question 2:老F: "第二问：GPU 在同一台机器里吗？"
"小白: "在！"
"老F: "TP！NVLink 超快，2-8 卡都行！"
"小白: "如果不在呢？"
"老F: "跨机只能用 PP——因为 NVLink 只到同机"
Panel 4:老F asks Question 3:老F: "第三问：要提高吞吐量（QPS）吗？"
"小白: "要！用户越来越多！"
"老F: "加 DP！每个 GPU 各处理不同请求"老F: "DP 是最简单的扩容方式"
Panel 5:老F shows common configs:"单卡：7B 以下""
"2 卡 TP：13B-30B"
""
"4 卡 TP：70B（最常见）"
""
"8 卡 TP：70B 或 175B"
""
"多机混合：超大模型"小白: "我的 70B 用 4 卡 TP 就行！"
"
Bottom caption: "三个问题：装得下吗？同机吗？要 QPS 吗？——答案告诉你用什么策略
```

## 第 40 话：MoE 多卡部署 —— 671B 参数怎么分布？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "MoE Deployment"
Panel 1:小白: "Dense 模型的分布式我懂了——但 MoE（混合专家）模型怎么部署？671B 参数只有 37B 激活"
老F: "MoE 部署和普通分布式不一样——关键是'专家放哪'"
小白: "专家可以分开跑？"
Panel 2:MoE 架构回顾:老F: "MoE 的核心是'找专家'"
"每个 token 经过 Gate → 选 top-k 专家（比如 2 个）"
"671B = 256 个专家 × 每个约 2.6B + 共享参数"
"每次只激活 2 个专家 = 约 37B 计算量"
小白: "大部分参数在'睡觉'——只有少数干活"
Panel 3:专家并行部署:老F: "部署方案：专家并行（Expert Parallelism）"
"每张 GPU 放一部分专家（比如 8 卡 × 32 专家/卡）"
"token 来了 → 路由到对应 GPU → 计算 → AllToAll 收集结果"
"好处：每张卡只加载自己负责的专家——显存省"
"缺点：AllToAll 通信开销大——网络是瓶颈"
Visual: token → Router → GPU 3 & GPU 7 → AllToAll → 合并输出
Panel 4:DeepSeek-V3 部署实践:老F: "DeepSeek-V3 的部署技巧："
"1. 专家按热度分配——热门专家放高速卡"
"2. 共享参数复制——每张卡都有一份（TP 切分）"
"3. 通信优化——用 NVLink 降低 AllToAll 延迟"
"4. 负载均衡——避免某个专家过载"
小白: "MoE 部署 = 专家分配 + 通信优化 + 负载均衡"
Panel 5:老F总结:老F: "MoE vs Dense 部署对比："
"Dense：TP/PP/DP——计算均匀分配"
"MoE：Expert Parallel——专家按卡分配，通信更复杂"
"Dense：好预测，稳"
"MoE：省钱（激活少），但部署复杂"
小白: "MoE = 省钱但费脑子——部署难度大一个级别！"

Bottom caption: "MoE 部署 = 专家并行 + AllToAll 通信 + 负载均衡——省钱但部署复杂
```


---

### 系列引导（评论区置顶）

```
📚 FDE 漫画系列 · 81 话持续更新中！
全系列 81 话，关注我看后续更新！
```
