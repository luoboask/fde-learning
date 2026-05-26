# 第 5 篇：GPU 基础篇

---

## 发布方案

### 标题（选一）

- GPU 到底是什么？一张漫画给你讲清楚
- 为什么大模型必须用 GPU？CPU 不行吗？
- 显存不够怎么办？GPU 的"记忆金字塔"

---

### 小红书正文

```
大模型为什么要跑在 GPU 上？一块 A100 到底值不值？
这篇 4 张漫画带你搞懂 GPU 基础：
① GPU 是什么 —— 数学教授 vs 小学生教室
② 显存层级 —— GPU 的"记忆金字塔"
③ 计算瓶颈 vs 显存瓶颈 —— 厨师的烦恼
④ 多卡通信 —— 高速公路 vs 城市道路
收藏这篇，搞懂大模型的"发动机"！
#GPU #A100 #显存 #AI硬件 #大模型部署 #漫画学AI
```

---

### 图片内容（共 5 张）

---

# 封面

```
Create a vertical cover image for Xiaohongshu (3:4 ratio). Cute cartoon style.
Title in large bold text at center: "GPU 到底是什么？"
Subtitle below: "大模型的"发动机""
Characters:
- 小白 (grey hoodie, glasses, curious)
- 老F (purple T-shirt with "FDE" logo, confident)
Style: Clean, modern, purple/white color scheme. Text must be clear and readable.
```

---

## 第 25 话：GPU 是什么 —— 数学教授 vs 小学生教室

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "GPU 是什么"
Panel 1:小白: "模型训练完了——但要跑起来，GPU 到底是什么东西？"
"老F: "我用两个人来比喻"
Panel 2:CPU = 数学教授:A professor (CPU) with 16 assistants.教授 solving one hard problem at a time.教授: "我是 CPU——16 个大核"教授: "一次做一道难题，做得很快"教授 finishes: "搞定！"
"
Panel 3:GPU = 小学教室:A huge classroom with 10,000+ kids doing simple arithmetic.Kids all shouting at once: "3×5=15！"
" "4×6=24！"
" "7×8=56！"
"Caption: "GPU = 10000+ 个小核同时算"教室: "搞定！3秒钟！"
"
Panel 4:小白: "那谁厉害？"
"老F holds a sign: "看干什么！"
"老F: "操作系统、数据库 → CPU 厉害"老F: "大模型矩阵计算 → GPU 碾压！"
"教授 trying to do 10000 multiplications: "这...这也太多了！"
"教室: "简单算术我强！"
"
Panel 5:老F: "大模型的核心操作是矩阵乘法"老F: "就是大量简单的'乘一下加起来'"老F: "简单但量巨大——GPU 的绝活！"
"小白: "所以大模型必须用 GPU——因为全是简单计算的堆叠！"
"
Bottom caption: "CPU 擅长复杂逻辑，GPU 擅长大量简单计算并行——大模型正是后者
```

## 第 26 话：显存层级 —— GPU 的"记忆金字塔"

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "显存层级"
Panel 1:小白: "之前把 GPU 比作很多小学生——那80GB 显存为什么还不够用？"
"老F: "GPU 的 memory 分四层——越上面越快，越下面越大"老F shows a pyramid.
Panel 2:Top - 寄存器:A genius doing mental math instantly.⚡ "最快！就几 MB"
""
"相当于'心算'"老F: "就在计算单元旁边，速度最快"
Panel 3:Middle - 共享内存 + L2 缓存:A student with a scratch pad and a bookshelf.🏃 "草稿纸——100+ KB，非常快"🚶 "书架——几 MB，中等速度"
 "比寄存器慢一点，但容量大一些"
Panel 4:Bottom - HBM:A huge library with tons of books.🐢 "图书馆——80GB，最大但最慢""
"模型主要待在这里"小白: "80GB 很大啊，为什么会不够？"
"
Panel 5:老F shows a 70B model trying to fit:老F: "70B 模型 FP16 = 140GB"
"老F: "一块 A100 只有 80GB——装不下！"
"老F: "而且好的代码就是让数据待在离计算最近的地方"老F: "心算能解决就别跑图书馆！"
"小白: "所以优化就是——减少去图书馆的次数！"
"
Bottom caption: "寄存器→共享内存→L2缓存→HBM，越近越快，越远越大——优化就是让数据少跑远路
```

## 第 27 话：计算瓶颈 vs 显存瓶颈 —— 厨师的烦恼

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "瓶颈分析"
Panel 1:小白: "之前学了显存分四层——那 GPU 跑慢了，怎么知道是算得慢还是搬得慢？"
"老F: "有两种瓶颈——我用厨师来比喻"
Panel 2:瓶颈 1 - 计算瓶颈:A chef (GPU) with a HUGE pile of vegetables.Chef sweating: "切...切...切不完..."
 "计算瓶颈——GPU 算不过来了！"
"老F: "GPU 利用率 
> 90%——全速运转但还跟不上"老F: "解决方法：减少计算量（量化）或用更快的 GPU"
"
Panel 3:瓶颈 2 - 显存瓶颈:Same chef, now the vegetables are being delivered by a slow snail.Chef waiting impatiently: "菜呢？！我手都闲下来了！"
"Caption: "显存瓶颈——GPU 在等数据！"
"老F: "GPU 利用率 < 50%——有劲使不出"老F: "解决方法：提高带宽或减少数据量"
Panel 4:小白: "大模型生成文字的时候是哪一种？"
"老F: "生成是一个一个字蹦——每次只算一点"老F: "但要不断从显存取数据——显存瓶颈！"
"小白: "那理解整个输入的时候呢？"
"老F: "一次算很多——计算瓶颈！"
"
Panel 5:老F summary:"生成阶段（Decode）→ 显存瓶颈为主 → 优化 KV Cache"
""
"理解阶段（Prefill）→ 计算瓶颈为主 → 优化算法"老F: "先搞清楚瓶颈在哪，再对症下药！"
"小白: "不是'换更快的 GPU'——是'找到哪里慢'！"
"
Bottom caption: "厨师切不过来 = 计算瓶颈，材料送不过来 = 显存瓶颈——对症下药才有效
```

## 第 28 话：多卡通信 —— 高速公路 vs 城市道路

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "GPU 通信"
Panel 1:小白: "搞懂了计算瓶颈和显存瓶颈——但一块卡装不下大模型怎么办？多块卡怎么一起工作？"
"老F: "首先，卡之间要传数据——传得快不快很重要！"
"
Panel 2:Road 1 - NVLink:A super-fast highway between two buildings.Cars zooming by at incredible speed. Zoom!
 "NVLink = GPU 之间的专用高速公路""
"速度：900 GB/s"
""
"同一台机器内——最快！"
"
Panel 3:Road 2 - PCIe:A city road with normal traffic.老F: "PCIe = 主板上的城市快速路""
"速度：63 GB/s"
""
"CPU 和 GPU 之间用"小白: "比 NVLink 慢 10 多倍？！"
"
Panel 4:Road 3 - InfiniBand:A high-speed train between two cities (two machines).Train speeding.
 ""
"
and = 机器之间的城际高铁""
"速度：400 Gb/s"
""
"跨机房用"小白: "所以张量并行要同机——因为要 NVLink 的速度！"
"
Panel 5:老F writes the ranking:"NVLink >
> InfiniBand 
> PCIe"
"老F: "距离越近越快，这是物理规律"老F: "所以 8 卡 TP 要放在同一台机器里——用 NVLink"
"
 "跨机就只能用 PP 了——因为 IB 慢一些，分层传可以接受"
 "硬件是路，软件是车——NCCL 就是管理通信的软件库"
 "NCCL 自动检测 GPU 拓扑，选最优通信路径"
 "硬件决定上限，软件决定能不能接近上限——懂了！"
"
Bottom caption: "NVLink（同机）
> IB（跨机）
> PCIe（CPU-GPU）——通信速度决定并行方案
```


---

### 系列引导（评论区置顶）

```
📚 FDE 漫画系列 · 81 话持续更新中！
全系列 81 话，关注我看后续更新！
```
