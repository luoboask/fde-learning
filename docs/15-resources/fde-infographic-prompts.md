# FDE 白话图解 — 漫画版 Prompt 集

> 用法：每张 prompt 复制到 Gemini（或任何 AI 图片生成器），生成漫画风格图片。
> 所有图片统一 3:4 竖版比例，适合小红书发布。
> 风格：多格漫画，有角色对话，白话口语化，幽默易懂。

---

## L1 入门篇（10 张）

### 01｜AI 简史：大模型是怎么来的？

```
Create a vertical 4-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style with speech bubbles. White background.

Panel 1 (top):
A cartoon scientist in 1950, looking at a big machine.
Scientist: "机器能思考吗？"
Caption: "1950 年，图灵提出了这个问题"

Panel 2:
A conference room in 1956, people arguing excitedly.
Person A: "我们给这东西起个名吧！"
Person B: "就叫 AI！"
Caption: "1956 年，AI 这个词诞生了"

Panel 3:
A chess board in 1997, a robot beating a human.
Robot: "将！"
Human: "我竟然输给了机器..."
Caption: "1997 年，深蓝战胜了国际象棋冠军"

Panel 4 (bottom, bigger):
A person chatting with their phone in 2024. The phone has a cute face.
Person: "帮我写个周报"
Phone: "好嘞～30秒搞定！"
Person: "这才叫 AI 啊！"
Caption: "2024 年，ChatGPT 让 AI 走进了每个人手里"

Bottom caption: "70 年，从'能不能思考'到'帮你干活'"
```

---

### 02｜什么是 FDE — 这个新岗位到底干嘛的？

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style with speech bubbles.

Scene: A job fair. A confused graduate (小白) stands in front of different company booths.

Panel 1:
小白: "AI 算法工程师——造发动机的"
小白: "AI 运维工程师——修路的"
小白: "那 FDE 是干嘛的？"

Panel 2:
An FDE expert (老F, wearing a purple shirt with "FDE" on it) appears.
老F: "我啊，是让发动机在高速公路上跑起来的人！"
老F: "算法工程师造模型（造发动机）"
老F: "运维工程师保障服务（修路）"
老F: "FDE 是优化性能 + 架构设计（设计高速公路）"

Panel 3:
小白: "那得会很多吧？"
老F: "得懂模型、懂 GPU、懂部署、懂成本..."
老F thinks: "还要懂怎么省钱"

Panel 4:
小白: "工资呢？"
老F holds up a sign: "40-80万/年"
小白's eyes turn into $$$ symbols.
小白: "我学！"

Bottom caption: "FDE = 懂模型 + 懂硬件 + 懂部署的复合型工程师"
```

---

### 03｜Transformer 原理：大模型怎么"思考"的？

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Scene: 老F teaches 小白 about how a large model "thinks".

Panel 1:
小白: "大模型是怎么理解我说话的？"
老F: "我来用你读文章的过程给你讲讲"

Panel 2:
A cartoon model character with a sentence "苹果很好吃" in front of it.
老F: "第一步：把句子拆成词"
Model character picks up each word and turns it into numbers.
Model: "苹→[0.2, 0.5...]，果→[0.1, 0.8...]"
老F: "每个词变成一串数字"

Panel 3:
Now the sentence is "苹果手机"
The model looks at "苹果" and then at "手机"
老F: "第二步：自注意力——每个词看上下文"
"苹果" thinks: "手机告诉我，这次是品牌不是水果！"
Visual: Lines connecting "苹果" and "手机" with a glow.

Panel 4:
The model stacks multiple layers on top of itself like a tower.
老F: "第三步：叠！一层不够叠 32 层！"
小白: "叠罗汉吗？！"
Model (sweating): "理解更深了！"

Bottom caption: "拆词 → 找关系 → 加工 → 叠加 → 预测，这就是大模型的思考过程"
```

---

### 04｜Attention 机制：AI 的"划重点"能力

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
老师 holding a long essay.
老师: "读完这篇文章，回答我的问题"

Panel 2:
A student reading the essay.
Student's thought bubble: "我不会逐字逐句读——我会找关键词！"
老师: "这就是 Attention！找重点！"

Panel 3:
Now a cartoon AI model doing the same thing.
Sentence: "苹果手机是一家科技公司"
The model highlights "苹果" and "手机" with a yellow marker.
"苹果" connects to "公司" with a thick line.
"是" connects weakly with a thin line.
老F: "重点词之间的连线更粗——这就是注意力权重"

Panel 4:
老F writes on a board:
"Q（查询）= 我在想什么？"
"K（键）= 这里有什么线索？"
"V（值）= 实际含义是什么？"
小白: "所以 Attention = 用 Q 找 K，找到后取 V？"
老F: "完全正确！就这么简单！"

Bottom caption: "Attention 就是 AI 版的'划重点'"
```

---

### 05｜MoE 架构：大模型的"找专家"模式

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 in a hospital hallway, confused.
小白: "我肚子疼，难道要所有科室的医生都来看一遍？"

Panel 2:
A nurse guides 小白.
护士: "不用！挂消化科，消化科医生来看你就够了"
Caption: "医院就是这样——找对口的专家"

Panel 3:
Now the same concept applied to a large model.
A question: "苹果股票涨了吗？"
A Router character (like a traffic cop) directs the question.
Router: "这是金融问题——金融专家上！"
金融 Expert 💪: "来了！"
医疗 Expert 😴: "zzz..."
体育 Expert 😴: "zzz..."
烹饪 Expert 😴: "zzz..."

Panel 4:
小白: "其他专家在睡觉？"
老F: "对！不相关的专家不干活，省电！"
老F: "传统模型 100% 参数都算"
老F: "MoE 只激活 10-20%，同样效果，1/5 算力！"
小白: "这就是 DeepSeek 省钱的关键？！"
老F: "Bingo！"

Bottom caption: "MoE = 不是所有问题都要所有人答，找对的人就行"
```

---

### 06｜大模型的"教育三阶段"：预训练、微调、对齐

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
A baby robot (模型) in a school uniform.
老F: "大模型的培养就像养孩子——分三个阶段"

Panel 2:
Stage 1 - Pre-training:
The baby robot sits in a huge library, reading thousands of books.
Caption: "预训练 = 上小学+中学+大学"
Robot: "我知道了全世界的事！但...还不会好好说话"
老F: "这个阶段花了几千万，用了几千块 GPU"

Panel 3:
Stage 2 - Fine-tuning (SFT):
Robot now at a training desk.
Teacher: "现在学具体技能——写代码、聊天、翻译"
Caption: "微调 = 上职业培训班"
Robot: "我会写代码了！"
老F: "只需要几块 GPU，几天就行"

Panel 4:
Stage 3 - Alignment (RLHF):
Robot learning manners from a polite teacher.
Teacher: "说话要礼貌，不能骂人，要帮人解决问题"
Caption: "对齐 = 学做人"
Robot: "您好！请问有什么可以帮您的？😊"
老F: "三个阶段加起来 = ChatGPT"

Bottom caption: "预训练学知识 → 微调学技能 → 对齐学做人"
```

---

### 07｜微调方法：全量 vs LoRA vs QLoRA

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Scene: Three different repair shops fixing a big robot (the model).

Panel 1:
Shop 1 - "全量微调":
Workers rebuilding the ENTIRE robot from scratch.
老板: "所有参数都重新调！"
小白: "效果最好吧？"
老板: "对，但需要 8 块 GPU，花 10 万块"

Panel 2:
Shop 2 - "LoRA":
A mechanic adding a small adapter piece to the robot.
老板: "原模型不动，加个小补丁就行"
小白: "效果呢？"
老板: "差不多！只要一块 GPU，花 1 万块"

Panel 3:
Shop 3 - "QLoRA":
A mechanic first compressing the robot (squishing it), then adding the adapter.
老板: "先压缩模型再加 LoRA 补丁"
小白: "效果会差吗？"
老板: "差一丢丢，但 4090 就能跑！花 2 千块"

Panel 4:
小白 thinking:
"全量：效果💯 成本💸💸💸"
"LoRA：  效果💯- 成本💸"
"QLoRA：效果💯-- 成本💸--"
小白: "新手选 QLoRA！"

Bottom caption: "不是所有调整都要从头来——加个补丁就够了"
```

---

### 08｜KV Cache：大模型的"小抄"

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
Restaurant scene. 小白 ordering food.
小白: "今天天气怎么样？"
Model waiter writes everything down on a fresh piece of paper.
Caption: "从头开始算"

Panel 2:
小白: "真好"
Model waiter THROWS AWAY the paper and starts a NEW one from scratch.
小白: "等等你为什么从头写？！"
Model: "因为每次都是新对话啊"
小白: "太蠢了吧！！"

Panel 3:
老F appears with a clipboard (KV Cache).
老F: "让我来——算完的存起来！"
小白: "今天天气怎么样？"
老F writes and keeps the paper.
小白: "真好"
老F just adds "真好" to the existing paper.
小白: "快多了！"

Panel 4:
OldF holds up a balance scale.
Left side: "显存 ↑ 30-50%"
Right side: "速度 ↑ 3-10 倍"
老F: "用空间换时间——绝对值！"
小白: "就是考试的小抄！"

Bottom caption: "KV Cache = 记住算过的，只算新的"
```

---

### 09｜量化：给大模型"瘦身"

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
A fat robot (labeled "FP32") trying to squeeze through a door.
Robot: "我...太胖了...进不去..."
老F: "这是 FP32 精度，100% 精度但太大了"

Panel 2:
The robot goes on a diet and becomes slightly slimmer (labeled "FP16").
Robot: "我减了一半！"
老F: "FP16——精度 99%，显存只要一半"
Robot: "感觉没瘦多少啊"

Panel 3:
More diet, much slimmer (labeled "INT8").
Robot: "现在呢？"
老F: "INT8——精度 97%，显存只要 1/4，速度快 3-4 倍！"
Robot: "我还能跑！而且更快了！"

Panel 4:
Super slim robot (labeled "INT4") fitting easily through the door.
Robot: "我进来了！"
老F: "INT4——精度 90-95%，显存只要 1/8"
小白: "70B 模型 INT4 只要 35GB，4090 就能跑！"
老F: "4K 照片缩成 1080P，肉眼看不出区别——就是这个道理"

Bottom caption: "精度降一点点，速度快很多——这就是量化"
```

---

### 10｜Scaling Law：大模型的"规模法则"

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 looking at two seeds.
小白: "是不是种子越大树就越大？"
老F: "对！但有个前提——土壤也要够大"

Panel 2:
老F drawing on a board:
"模型参数 × 训练数据量 = 效果"
"7B 参数 → 需要约 140B 数据"
"70B 参数 → 需要约 1.4T 数据"
"参数翻倍，数据也要翻倍！"

Panel 3:
A small plant with HUGE soil (data).
老F: "7B 模型给海量数据 → 浪费！"
A giant tree with TINY soil.
老F: "70B 模型给少量数据 → 也浪费！"

Panel 4:
OldF and 小白 standing next to a perfectly balanced big tree.
老F: "匹配才是关键"
小白: "所以不是越大越好——是要搭配好！"
老F: "Scaling Law 告诉我们——多大树配多少土"

Bottom caption: "大模型有一个简单规律：参数、数据、算力要匹配"
```

---

## L2 GPU + 推理优化篇（10 张）

### 11｜GPU 是什么：数学教授 vs 小学生教室

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
A professor (CPU) sitting at a desk, solving one hard math problem.
教授: "我是 CPU——16 个大核"
教授: "一次做一道难题，做得很快"
Caption: "CPU = 数学教授"

Panel 2:
A classroom (GPU) with 100 kids doing simple arithmetic at the same time.
Caption: "GPU = 小学教室，10000+ 个小核"
Kids all shouting: "3×5=15！" "4×6=24！" "7×8=56！"

Panel 3:
小白: "那谁厉害？"
老F holds up a sign: "看干什么！"
老F: "操作系统、数据库 → CPU 厉害"
老F: "大模型矩阵计算 → GPU 碾压！"

Panel 4:
The professor struggling with thousands of simple calculations.
教授: "这...这也太多了！"
Meanwhile the classroom finishes instantly.
教室: "搞定！3秒钟！"
老F: "大模型的核心就是大量的'简单计算'——GPU 的绝活！"

Bottom caption: "CPU 擅长复杂逻辑，GPU 擅长大量简单计算并行"
```

---

### 12｜显存层级：GPU 的"记忆金字塔"

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
老F showing 小白 a pyramid.
老F: "GPU 的 memory 分四层——越上面越快，越下面越大"

Panel 2:
Top of pyramid - ⚡ 寄存器:
A genius doing mental math instantly.
"最快！几 MB"
"相当于心算"

Panel 3:
Middle layers - 🏃 共享内存 + 🚶 L2 缓存:
A student with a scratch pad and a bookshelf.
"草稿纸——100+ KB，非常快"
"书架——几 MB，中等速度"

Panel 4:
Bottom layer - 🐢 HBM:
A huge library with tons of books.
"图书馆——80GB，最大但最慢"
"模型主要待在这里"
小白: "那好的代码就是..."
老F: "让数据待在离计算最近的地方——心算能解决就别跑图书馆！"

Bottom caption: "心算→草稿纸→书架→图书馆，越近越快，越远越大"
```

---

### 13｜vLLM 为什么快：酒店浪费 vs 虚拟内存

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
A hotel manager (传统推理引擎) giving out rooms.
Manager: "每位客人必须住连续的房间！"
Guest A gets 16 rooms, but only uses 6. 10 rooms wasted.
Guest B gets 16 rooms, only uses 4. 12 rooms wasted.
Caption: "浪费 60% 显存！"

Panel 2:
小白 looking at the wasted rooms.
小白: "这也太浪费了吧！"
Manager: "没办法，传统方式就是这样"

Panel 3:
老F appears as a new manager (vLLM).
老F: "我来！房间不一定要连续的——分散住就行！"
Guest A: room 3, room 7, room 15 (small blocks scattered)
Guest B: room 1, room 4, room 8
Guest C: room 2, room 6
Caption: "像操作系统的虚拟内存——分页管理"

Panel 4:
OldF shows a dashboard.
老F: "显存利用率 40% → 95%"
老F: "吞吐量提升 2-4 倍"
小白: "这就是 vLLM 成为行业标准的原因！"

Bottom caption: "vLLM 的 PagedAttention = 显存分页管理，不浪费每一块"
```

---

### 14｜计算瓶颈 vs 显存瓶颈：厨师的烦恼

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
A chef (GPU) with a huge pile of vegetables.
Chef sweating: "切...切...切不完..."
Caption: "计算瓶颈——GPU 算不过来了！"
老F: "这时候需要减少计算量或者用更快的 GPU"

Panel 2:
Same chef, now the vegetables are being delivered by a slow snail.
Chef waiting impatiently: "菜呢？！我手都闲下来了！"
Caption: "显存瓶颈——GPU 在等数据！"
老F: "这时候需要提高带宽或者减少数据量"

Panel 3:
小白: "怎么判断是哪种？"
老F: "看 GPU 利用率"
老F holds a meter:
"> 90% → 计算瓶颈（切不过来）"
"< 50% → 显存瓶颈（材料不够）"

Panel 4:
老F: "生成任务通常是显存瓶颈"
老F: "理解任务通常是计算瓶颈"
小白: "先搞清楚瓶颈在哪，再对症下药！"

Bottom caption: "厨师切不过来 = 计算瓶颈，材料送不过来 = 显存瓶颈"
```

---

### 15｜量化方案大比拼：三条不同的路

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
Three roads leading to "量化成功" mountain top.
小白: "哪条路好走？"
老F: "三条路都能到——但走法不一样"

Panel 2:
Road 1 - SmoothQuant:
A road construction crew leveling a bumpy road.
工人: "把高低不平的路铺平再走！"
Caption: "用激活值统计平滑权重"
"简单、快速，INT8 够用"

Panel 3:
Road 2 - AWQ:
A VIP escort protecting important cargo on a road.
保安: "重要的权重 VIP 保护！不重要的随便压！"
Caption: "找到重要权重，优先保护"
"精度最好，INT4 首选"

Panel 4:
Road 3 - GPTQ:
A craftsman carefully carving each stone one by one.
工匠: "一层一层精雕细琢，慢工出细活"
Caption: "逐层量化，一层完了再下一层"
"精度好，但量化过程慢"
小白: "综合最优是 AWQ！"

Bottom caption: "SmoothQuant = 铺路，AWQ = VIP保护，GPTQ = 精雕细琢"
```

---

### 16｜投机解码：小学生猜答案，教授来检查

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 taking a test alone.
小白 thinking: "这道题...那道题...好慢啊"
Caption: "大模型一个字一个字生成——很慢"

Panel 2:
老F brings a kid (小模型) to help.
老F: "让小学生先猜，教授来检查！"
小 kid quickly writes: "ABCD" (4 answers)
Caption: "小模型一次猜 3-5 个词，速度超快"

Panel 3:
Professor (大模型) checks the kid's answers.
Professor: "这道对了✓，这道对了✓，这道对了✓，这道错了✗——改！"
Caption: "猜对的就过，猜错的纠正"

Panel 4:
小白 now finishes the test much faster.
小白: "平均下来，少算了很多！"
老F: "加速 2-3 倍，不需要额外 GPU！"
老F: "简单问题小模型就能猜对，复杂问题大模型纠正"

Bottom caption: "小模型先猜，大模型验证——免费加速 2-3 倍"
```

---

### 17｜多卡并行：一块 GPU 装不下怎么办？

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 trying to fit a HUGE model onto a single GPU board.
Model: "我太——大了！放——不——下——！"
GPU board: "我才 80GB，你 140GB！"
小白: "怎么办？！"

Panel 2:
老F with a saw (TP - 张量并行).
老F: "切！每层拆成两半，两块 GPU 各算一半"
Model gets split in half horizontally.
GPU0: [左半边]  GPU1: [右半边]
Caption: "张量并行 = 两个人一起算一道大题"

Panel 3:
老F with a different approach (PP - 流水线并行).
老F: "或者分层！GPU1 算前 16 层，GPU2 算后 16 层"
GPU0: Layer 1-16 → GPU1: Layer 17-32
Caption: "流水线并行 = 工厂装配线"

Panel 4:
小白: "什么时候用什么？"
老F: "同一台机器 → TP（NVLink 超快）"
老F: "模型太深 → PP（分层处理）"
老F: "提高吞吐量 → DP（多副本同时服务）"
小白: "实际通常是组合拳！"

Bottom caption: "TP 切矩阵，PP 分层，DP 多副本——拆开放就装得下了"
```

---

### 18｜SGLang 有什么特别：公共前缀缓存

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
Three users coming to a service counter.
User A: "系统提示词...+ 我的问题 A"
User B: "系统提示词...+ 我的问题 B"
User C: "系统提示词...+ 我的问题 C"
Caption: "每个人的 prompt 前面都一样"

Panel 2:
Traditional engine recalculating everything for each user.
Engine: "从头算 A...从头算 B...从头算 C..."
老F: "系统提示词每次都算——浪费！"

Panel 3:
SGLang appears with a stamp machine.
SGLang: "系统提示词算一次，盖个章缓存起来！"
User A: [系统 prompt ✓缓存] + [问题 A 新算]
User B: [系统 prompt ✓缓存] + [问题 B 新算]
User C: [系统 prompt ✓缓存] + [问题 C 新算]

Panel 4:
小白: "快了多少？"
老F: "Agent 场景快 3-10 倍！RAG 快 5-8 倍！"
老F: "因为大部分前缀都是重复的！"
小白: "vLLM 通用推理，SGLang 专注 Agent——各有所长！"

Bottom caption: "SGLang 的 RadixAttention = 公共前缀只算一次，后面直接复用"
```

---

### 19｜FP8：下一代精度格式

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
Three characters in a line:
FP16 (fat): "我 16 位，精度高，但慢"
INT8 (skinny): "我 8 位，快，但没有小数点！"
A new character appears between them.

Panel 2:
FP8 character: "我是 FP8——8 位但有小数点！"
FP8: "比 INT8 灵活——有小数"
FP8: "比 FP16 快——位数少一半"

Panel 3:
小白: "格式有什么区别？"
老F draws on a board:
"FP16: [1符号][5指数][10尾数] = 16位"
"INT8: [8位整数] = 没有小数点！"
"FP8:  [1符号][4指数][3尾数] = 8位+小数"

Panel 4:
H100 GPU with FP8 badge.
H100: "我原生支持 FP8！比 FP16 快 2 倍！"
老F: "速度比 FP16 快 2 倍，显存只有一半"
老F: "新模型部署，优先试试 FP8！"

Bottom caption: "FP8 = 比 INT8 聪明，比 FP16 快——完美平衡"
```

---

### 20｜GPU 通信：高速公路 vs 城市道路 vs 城际高铁

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白: "多块 GPU 之间怎么传数据？"
老F: "有三种路——速度差别很大"

Panel 2:
NVLink - A super-fast highway between two buildings.
Cars zooming by at incredible speed.
老F: "NVLink = GPU 之间的专用高速公路"
"速度：900 GB/s"
"同一台机器内用——张量并行 TP"

Panel 3:
PCIe - A city road connecting buildings.
Cars at normal speed.
老F: "PCIe = 主板上的城市快速路"
"速度：63 GB/s"
"CPU 和 GPU 之间用"
小白: "比 NVLink 慢 10 倍？！"

Panel 4:
InfiniBand - A high-speed train track between two cities (two machines).
Train speeding between buildings.
老F: "InfiniBand = 机器之间的城际高铁"
"速度：400 Gb/s"
"跨机房用——分布式训练"
小白: "所以 TP 要同机——因为要 NVLink！"

Bottom caption: "NVLink >> InfiniBand > PCIe —— 距离越近越快"
```

---

## L3 AI 工程化篇（6 张）

### 21｜RAG：闭卷 vs 开卷考试

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
Two students taking a test.
Student A (闭卷): Sweating, struggling.
"你公司的去年营收是多少？"
Student A: "我...我不知道...可能是...50 亿？"
老F: "这是不用 RAG 的大模型——可能瞎编"

Panel 2:
Student B (开卷): Opens a book, looks up the answer.
Student B: "让我查一下..."
Student B: "根据 2023 年报第 42 页，去年营收是 68 亿元"
老F: "这是用了 RAG——准确！"

Panel 3:
老F showing the RAG flow:
"1. 用户提问 → 2. 变成向量 → 3. 在知识库检索 → 4. 找到相关资料 → 5. 拼装给模型 → 6. 模型基于资料回答"

Panel 4:
小白: "就是给大模型开了卷？"
老F: "对！从闭卷变开卷——准确率大幅提升！"
小白: "而且有出处可以查证！"
老F: "这就是企业为什么都要用 RAG"

Bottom caption: "RAG = 让大模型先查资料再回答，不再瞎编"
```

---

### 22｜Agent：给 AI 配工具

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
A smart intern (普通大模型) sitting at a desk.
小白: "帮我分析上周的销售数据"
Intern: "好的，但我查不到数据..."
Caption: "普通大模型 = 聪明但没工具"

Panel 2:
老F gives the intern a tool belt.
老F: "给他配工具！"
Tool belt has: 🔍 数据库, 📊 图表工具, 📧 邮件

Panel 3:
Agent (with tool belt) now in action.
Agent thinking: "先查数据库 → 再做分析图表 → 最后发邮件"
Action sequence:
🔍 查数据库 → 拿到数据
📊 生成图表 → 做出分析报告
📧 发送邮件 → "报告已发到邮箱"

Panel 4:
小白: "太厉害了！"
老F: "Agent 的核心不是模型更强"
老F: "而是'会用什么工具'和'知道什么时候用'"
小白: "不是知道多少，而是会用工具！"

Bottom caption: "Agent = 大模型 + 工具 + 规划能力 = 让 AI 自己干活"
```

---

### 23｜提示词工程：写好 Prompt 的 5 个关键

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 types: "帮我写代码"
AI returns: 一段乱七八糟的代码
小白: "这啥啊！"

Panel 2:
老F takes over the keyboard.
老F types:
"你是一个资深 Python 工程师
 背景：我们需要一个数据清洗脚本
 任务：读取 CSV，去除空值，输出清洗后的数据
 要求：有注释、有异常处理、符合 PEP8"
AI returns: 完美代码！
小白: "差这么多？！"

Panel 3:
老F adds one more thing:
"请一步步思考，先理解需求，再设计方案，最后写代码"
AI: "让我一步步来..."（更好的代码）
老F: "加一句'一步步思考'，效果提升 20-50%！"

Panel 4:
老F writes on a board - 万能模板:
"你是[角色]
 背景是[背景信息]
 任务是[具体任务]
 要求是[格式/风格/长度]
 参考示例是[Few-shot]"
小白: "以后就按这个写！"

Bottom caption: "角色 + 背景 + 任务 + 要求 + 示例 = 好 Prompt 五件套"
```

---

### 24｜AI 评测：怎么知道模型好不好

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 showing off a model.
小白: "我的模型超厉害！"
老F: "怎么判断？"
小白: "呃...感觉挺好的？"
老F: "感觉不行——得看 4 个维度"

Panel 2:
Four report cards:
🎯 精度: "回答对不对？准确率多少？幻觉率？"
🚀 性能: "首字延迟多少？每秒几个 token？"
🛡️ 安全: "会不会骂人？会不会泄露数据？"
😊 体验: "用户觉得好用吗？会回来用吗？"

Panel 3:
小白: "精度 100%！"
老F: "那其他呢？"
小白 checks:
性能: "首字延迟 5 秒..." 老F: "太慢了 ❌"
安全: "被 prompt 注入了..." 老F: "不安全 ❌"

Panel 4:
老F: "生产环境 4 个维度缺一不可"
老F: "精度再高，速度慢也没人用"
老F: "速度再快，胡说八道也不行"
小白: "懂了——综合来看！"

Bottom caption: "精度 + 性能 + 安全 + 体验 = 好模型的四个标准"
```

---

### 25｜多模态模型：大模型怎么"看图片"的？

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 holding a picture.
小白: "大模型只能理解文字吗？"
老F: "不！给它配双'眼睛'就行了"

Panel 2:
老F showing the process:
"图片 → 视觉编码器（ViT）→ 变成向量"
"文字 → Token 化 → 变成向量"
"两种向量拼在一起 → 大模型处理"
Visual: [图片] + [文字] → [拼在一起] → 大模型

Panel 3:
A multi-modal model looking at a photo of a cat on a sofa.
Model: "这是一只橘色的猫，坐在灰色沙发上，看起来很懒"
小白: "它真的'看懂'了！"

Panel 4:
老F: "GPT-4V、Gemini、Qwen-VL 都是多模态"
老F: "能看图回答问题、分析图表、总结视频"
小白: "以后 AI 不光会读，还会看、还会听！"

Bottom caption: "多模态 = 给大模型装上眼睛和耳朵"
```

---

### 26｜分布式选型：什么时候用什么策略

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 standing at a crossroads with 3 signs:
← TP（张量并行）
→ PP（流水线并行）
↑ DP（数据并行）
小白: "我该走哪条路？"

Panel 2:
老F appears as a traffic guide.
老F: "第一个问题：一块 GPU 装得下吗？"
小白: "装得下！"
老F: "那单卡就行，啥都不用！💚"

Panel 3:
老F: "装不下的话——GPU 在同一台机器里吗？"
小白: "在！"
老F: "TP！NVLink 超快，2-8 卡都行！"
小白: "不在同一台呢？"
老F: "跨机 → PP，用 InfiniBand 通信"

Panel 4:
小白: "如果我想同时服务更多用户？"
老F: "DP！每个 GPU 各处理不同请求"
老F writes final answer:
"实际方案：TP + PP + DP 组合拳"
"比如 8 卡：TP=4, PP=2, DP=1"
小白: "原来如此！"

Bottom caption: "先问三个问题，就知道该用什么策略了"
```

---

## L4 生产部署 + 成本篇（8 张）

### 27｜生产部署架构：线上服务怎么搭

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 showing a demo on his laptop.
小白: "我在本地跑起来了！"
老F: "好！但生产环境要复杂得多"

Panel 2:
老F drawing a layered building:
Top: 🌐 接入层 "Nginx/API Gateway - 负载均衡、限流、鉴权"
2nd: 🔄 调度层 "路由请求、灰度发布、A/B 测试"
3rd: 🏎️ 推理层 "vLLM/SGLang - 模型推理"
4th: 💾 缓存层 "Redis - 高频答案缓存"

Panel 3:
More layers:
5th: 📊 监控层 "Prometheus + Grafana - 延迟、QPS、GPU"
6th: 📝 日志层 "Loki - 请求日志、输入输出"

Panel 4:
小白: "生产环境和 demo 的区别..."
老F: "demo 跑起来就行"
老F: "生产要稳、要快、要省钱、要可追溯"
小白: "差了十万八千里！"

Bottom caption: "6 层架构 = 生产级大模型服务的标准配置"
```

---

### 28｜Prefill-Decode 分离：专机专用

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
A worker trying to do two jobs at once.
Job 1: Understanding a long document (Prefill)
Job 2: Writing answers word by word (Decode)
Worker sweating: "两边都干不好..."
Caption: "一台机器干两件事——效率低"

Panel 2:
老F splits it into two workers.
Worker A (Prefill): "我专管理解输入，算力强！" 🧠
Worker B (Decode): "我专管往外蹦词，显存大！" 🗣️
Caption: "专机专用，各司其职"

Panel 3:
小白: "Prefill 和 Decode 有什么不同？"
老F:
"Prefill：一次性处理所有输入的词 → 计算密集型"
"Decode：一个一个词往外蹦 → 显存密集型"
"完全不同的需求！"

Panel 4:
老F: "吞吐量提升 2-3 倍！成本降低 40%！"
小白: "Prefill 用算力强的 GPU，Decode 用显存大的 GPU"
小白: "完美匹配！"

Bottom caption: "理解任务和生成任务需求不同——分开来干效率翻倍"
```

---

### 29｜自动扩缩容：人多了自动加机器

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
Morning 9am - a restaurant getting crowded.
老F: "早高峰来了！QPS 飙升！"
Servers automatically spawn new instances. 🌱🌱🌱
老F: "自动扩容——加机器！"

Panel 2:
2am - the restaurant is almost empty.
老F: "凌晨没人了"
Servers automatically shrink back. 💤💤
老F: "自动缩容——省钱！"

Panel 3:
小白: "怎么实现的？"
老F shows tools:
"HPA：根据 GPU 利用率自动扩缩"
"KEDA：根据消息队列长度"
"Warm Pool：提前备好热实例，冷启动从 2 分钟降到 5 秒"

Panel 4:
小白: "高峰期不崩，闲时省钱"
老F: "对！这就是生产环境的标配"
小白: "不是要不要做，是必须做！"

Bottom caption: "自动扩缩容 = 高峰不崩 + 闲时省钱"
```

---

### 30｜容灾高可用：GPU 挂了怎么办

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
Everything green - all GPUs working fine.
🟢 GPU0 ✅ GPU1 ✅ GPU2 ✅ GPU3 ✅
Caption: "正常状态"

Panel 2:
GPU2 suddenly shows an error.
🔴 GPU2: "Xid Error! 我挂了！"
System automatically isolates GPU2.
🟢 GPU0 ✅ GPU1 ✅ 🔴 GPU2 ❌(隔离) ✅ GPU3
小白: "用户会发现吗？"
老F: "不会！自动切换，无感知"

Panel 3:
More GPUs fail.
🟢 GPU0 ✅ 🔴 GPU1 ❌ 🔴 GPU2 ❌ ✅ GPU3
System degrades: batch size lowered.
老F: "降级服务——降低 batch size，或切换到小模型"
老F: "能用比不能用好"

Panel 4:
老F: "高可用 = 冗余 + 自动切换 + 降级策略"
老F: "设计时就想好——最坏情况怎么办？"
小白: "不是'会不会挂'，是'挂了怎么办'"

Bottom caption: "GPU 一定会挂——关键是挂了之后怎么办"
```

---

### 31｜多租户架构：一块 GPU 多人怎么用

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白: "一块 A100 好贵，只给一个人用太浪费了"
老F: "那就多人共享！但有 4 种共享方式"

Panel 2:
Method 1 - MIG:
A GPU being sliced into 7 small GPUs like a cake.
老F: "MIG——切成 7 块，每人一块，互不影响"
"物理隔离，最安全"

Panel 3:
Method 2 - Time-Slicing:
A timer switching between users.
User A (100ms) → User B (100ms) → User C (100ms)
老F: "时间片——轮流用，像分时复用"
"最灵活"

Panel 4:
Method 3 + 4:
老F: "Priority——VIP 优先，普通人排队"
老F: "Quota——每人固定额度，用完等释放"
小白: "实际通常组合使用——MIG + Priority + Quota"

Bottom caption: "MIG 切片、时间片轮流、优先级排队、配额制限用——总有一款适合你"
```

---

### 32｜可观测性三板斧：出了问题怎么排查

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 panicking.
小白: "服务慢了！但不知道哪里出了问题！"
老F: "你需要可观测性三板斧"

Panel 2:
First axe 📈 - Metrics:
A dashboard showing numbers.
老F: "Metrics 告诉你'现在怎么样'"
"GPU 利用率 92%、延迟 200ms、QPS 150"
"Prometheus + Grafana"

Panel 3:
Second axe 📋 - Logs:
A log file with text.
老F: "Logs 告诉你'发生了什么'"
"Error: OOM at layer 24"
"Request ID: abc123"
"Loki + ELK"

Panel 4:
Third axe 🔗 - Traces:
A path showing request going through services.
老F: "Traces 告诉你'慢在哪一步'"
"接入层 5ms → 调度层 10ms → 推理层 180ms ← 瓶颈在这！"
小白: "三板斧齐了！Metrics 发现问题，Logs 定位原因，Traces 找到瓶颈！"

Bottom caption: "Metrics: 哪里有问题？Logs: 什么出了问题？Traces: 怎么慢的？"
```

---

### 33｜成本拆解：跑一个大模型到底花多少钱

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白: "跑一次大模型要多少钱？"
老F pulls out a calculator: "来，拆开看"

Panel 2:
💰 GPU 成本（占 60-70%）:
老F: "A100 80GB: 10-15 元/小时"
老F: "70B 模型需要 2 块"
老F: "单次对话 GPU 成本: 0.15-0.35 元"
小白: "GPU 是大头！"

Panel 3:
The other costs:
💾 显存 15-20%: "KV Cache 长对话占一半显存"
🌐 网络 5-10%: "多卡通信，通常不是大头"
🔧 运维 10-15%: "监控、日志、扩缩容"

Panel 4:
老F: "省钱三招！"
1️⃣ 量化降显存
2️⃣ 合并请求提吞吐
3️⃣ 闲时缩容省电费
老F: "三招齐下，成本降 50%+"
小白: "原来能省这么多！"

Bottom caption: "GPU 是大头，但量化+合并+缩容能省一半"
```

---

### 34｜容量规划：需要多少块 GPU

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白: "我要买几块 GPU？"
老F: "算一下就知道了——4 步"

Panel 2:
Step 1: 小白 estimating.
小白: "预计峰值 100 QPS（每秒 100 个请求）"
Step 2: 老F shows specs.
老F: "一块 A100 跑 70B 模型，约 50 QPS"

Panel 3:
Step 3: 小白开始算。
小白: "100 ÷ 50 = 2 块...等等！"
小白: "要留 buffer！加 50% 冗余 → 3 块"
老F: "聪明！永远不要刚刚好！"

Panel 4:
Step 4: Growth planning.
老F: "如果每月增长 20% 呢？"
小白: "3 个月后 173 QPS → 需要 4 块"
小白: "一开始就预留到 6 块！"
老F: "公式：GPU 数量 = 峰值 QPS ÷ 单卡 QPS × 1.5-2"

Bottom caption: "算 QPS → 算单卡能力 → 留 50-100% buffer → 考虑增长"
```

---

### 35｜自建 vs 云端：部署方案怎么选

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白: "我应该自建还是用云？"
老F: "4 个方案，听我讲"

Panel 2:
Option A - Serverless API:
小白 talking to OpenAI/Claude logo.
"按调用付费，零运维"
老F: "创业公司首选，但长期贵"
Cost: $$$

Panel 3:
Option B - 云 GPU:
小白 renting a GPU from cloud.
"弹性，按需付费"
老F: "波动负载适合，长期不如自建便宜"
Cost: $$

Panel 4:
Option C - 自建:
小白 buying GPU servers.
"前期贵，长期便宜"
老F: "稳定负载 + 数据敏感 = 自建"
Cost: $（长期）

Bonus panel:
老F: "推荐——混合架构 70/20/10"
"70% 自建 + 20% 云端 + 10% API"
"基础负载自建，高峰上云，偶尔用 API"

Bottom caption: "70% 自建 + 20% 云端 + 10% API = 最优方案"
```

---

### 36｜数据隐私：用户数据怎么处理

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 collecting user data with a big net.
小白: "数据越多越好嘛！"
老F stops him: "等等！有些数据不能收！"

Panel 2:
Three traffic lights:
🔴 红色 - 禁止收集:
"身份证号、密码、银行卡"
🟡 黄色 - 需要脱敏:
"手机号、邮箱"
🟢 绿色 - 可以收集:
"用户名、使用偏好"

Panel 3:
老F: "KV Cache 里可能有敏感信息！"
老F: "多租户共享时，需要清理或隔离"
小白: "连缓存里的数据都要管？！"
老F: "PIPL 和 GDPR 可不是闹着玩的——违规罚款！"

Panel 4:
老F checklist:
✅ Prompt 里不传 PII
✅ 日志里脱敏
✅ Prompt 缓存定期清理
✅ 数据出境要合规
小白: "数据隐私不是锦上添花——是硬要求！"

Bottom caption: "设计阶段就要考虑隐私——不是上线后才想"
```

---

## L5 面试 + 成长篇（3 张）

### 37｜FDE 面试通关：高频题 + 答题框架

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 at an interview desk, nervous.
面试官: "说说 KV Cache 是什么"
小白 sweating: "我...我..."

Panel 2:
老F appears as a coach.
老F: "别背书！用这个框架——"
老F: "类比解释 → 数据支撑 → 实践验证"
老F: "KV Cache 就像餐厅小抄..."

Panel 3:
小白 now confidently answering:
小白: "KV Cache 就像考试的小抄——算过的存起来，下次直接拿来用。70B 模型能加速 3-10 倍，显存多占 30-50%。我们在项目里用 vLLM 部署后，吞吐量确实提升了 2.5 倍。"
面试官 smiling: "很好！理解很深！"

Panel 4:
老F's final tips:
"模型架构题：概念 → 原理 → 举例"
"推理优化题：类比 → 数据 → 实践"
"项目经验题：STAR 法则 → 数据量化 → 反思"
老F: "面试不是背书，是讲清楚'为什么'和'怎么做'"

Bottom caption: "答题框架 = 类比 + 数据 + 实践，面试官最爱听的套路"
```

---

### 38｜FDE 成长路径：从零到专家

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
小白 at level 0, looking at a long mountain path.
小白: "从零到 FDE 专家，要爬多久？"
老F: "约 7 个月——我带你走一遍"

Panel 2:
L1 (1-4 周) 🟢 → L2 (5-10 周) 🔵
小白 learning basics: "Transformer、GPU、量化..."
小白 running inference demo: "跑起来了！"
Caption: "能解释 FDE 岗位 + 跑通 demo"

Panel 3:
L3 (11-16 周) 🟠 → L4 (17-24 周) 🟣
小白 building systems: "RAG、Agent、部署、监控..."
小白 managing costs: "降本 50%！"
Caption: "能独立搭建 AI 服务 + 运营生产系统"

Panel 4:
L5 (25-28 周) 🟡
小白 at interview, getting an offer letter.
小白: "拿到 Offer！年薪 50 万！"
老F: "恭喜！但学习才刚刚开始"
小白: "每周 10-15 小时，7 个月搞定！"

Bottom caption: "L1 认知 → L2 进阶 → L3 应用 → L4 实战 → L5 面试，7 个月从小白到 FDE"
```

---

### 39｜面试项目故事：STAR 法则怎么说

```
Create a vertical comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.

Panel 1:
面试官: "说说你做过最难的项目"
小白 panicking: "我做了很多...但怎么说呢..."

Panel 2:
老F appears: "用 STAR 法则！"
S - Situation（背景）: "什么场景？什么困难？"
T - Task（任务）: "你要解决什么？"
A - Action（行动）: "你做了什么？为什么？"
R - Result（结果）: "效果如何？数据？"

Panel 3:
小白 now telling his story:
"背景：我们 70B 模型推理太慢，用户投诉"
"任务：要把首字延迟从 3 秒降到 1 秒内"
"行动：上了 vLLM + INT4 量化 + KV Cache 优化"
"结果：延迟降到 800ms，成本降 40%"
面试官: "很好！很完整！"

Panel 4:
老F: "别忘了加一步——反思"
老F: "如果再做一遍，我会先做 profiling 再选方案"
小白: "这样显得更成熟！"

Bottom caption: "STAR + 反思 = 面试项目故事的标准答案"
```

---

## 使用建议

| 编号 | 主题 | 对应课程 | 难度 | 系列 |
|------|------|---------|------|------|
| 01 | AI 简史 | 01-basics/00-ai-history | L1 | 入门 |
| 02 | 什么是 FDE | 01-basics/01-what-is-fde | L1 | 入门 |
| 03 | Transformer 原理 | 02-model-architecture/transformer-overview | L1 | 入门 |
| 04 | Attention 机制 | 02-model-architecture/attention-mechanism | L1 | 入门 |
| 05 | MoE 架构 | 02-model-architecture/moe-architecture | L1 | 入门 |
| 06 | 教育三阶段 | 02-model-architecture/pre-post-training | L1 | 入门 |
| 07 | 微调方法 | 02-model-architecture/llm-finetuning | L1 | 入门 |
| 08 | KV Cache | 02-model-architecture/kv-cache | L1 | 入门 |
| 09 | 量化基础 | 04-inference-optimization/quantization-basics | L1 | 入门 |
| 10 | Scaling Law | 02-model-architecture/scaling-law | L1 | 入门 |
| 11 | GPU 是什么 | 03-gpu-basics/gpu-overview | L2 | GPU |
| 12 | 显存层级 | 03-gpu-basics/memory-model | L2 | GPU |
| 13 | vLLM | 04-inference-optimization/vllm-deep-dive | L2 | 推理优化 |
| 14 | 瓶颈分析 | 03-gpu-basics/performance-bottleneck | L2 | GPU |
| 15 | 量化方案 | 04-inference-optimization/quantization-schemes | L2 | 推理优化 |
| 16 | 投机解码 | 04-inference-optimization/speculative-decoding | L2 | 推理优化 |
| 17 | 多卡并行 | 05-distributed-inference/distributed-overview | L2 | 分布式 |
| 18 | SGLang | 04-inference-optimization/sglang-deep-dive | L2 | 推理优化 |
| 19 | FP8 | 04-inference-optimization/fp8-inference | L2 | 推理优化 |
| 20 | GPU 通信 | 03-gpu-basics/gpu-interconnect | L2 | GPU |
| 21 | RAG | 06-ai-engineering/rag-principles | L3 | AI 工程化 |
| 22 | Agent | 06-ai-engineering/agent-architecture | L3 | AI 工程化 |
| 23 | Prompt 工程 | 06-ai-engineering/prompt-engineering | L3 | AI 工程化 |
| 24 | AI 评测 | 06-ai-engineering/ai-evaluation | L3 | AI 工程化 |
| 25 | 多模态 | 02-model-architecture/multimodal-llm | L3 | AI 工程化 |
| 26 | 分布式选型 | 05-distributed-inference/distributed-overview | L2 | 分布式 |
| 27 | 生产部署 | 07-production-deployment/deployment-architecture | L4 | 生产 |
| 28 | Prefill-Decode | 07-production-deployment/prefill-decode-separation | L4 | 生产 |
| 29 | 自动扩缩容 | 07-production-deployment/autoscaling | L4 | 生产 |
| 30 | 容灾高可用 | 07-production-deployment/disaster-recovery | L4 | 生产 |
| 31 | 多租户 | 07-production-deployment/multi-tenant | L4 | 生产 |
| 32 | 可观测性 | 07-production-deployment/observability | L4 | 生产 |
| 33 | 成本拆解 | 08-cost-operations/cost-breakdown | L4 | 成本 |
| 34 | 容量规划 | 08-cost-operations/capacity-planning | L4 | 成本 |
| 35 | 自建 vs 云端 | 08-cost-operations/self-hosted-vs-cloud | L4 | 成本 |
| 36 | 数据隐私 | 11-compliance-security/data-privacy | L4.5 | 安全 |
| 37 | 面试攻略 | 12-interview/interview-framework | L5 | 面试 |
| 38 | 成长路径 | 01-basics/02-learning-path | L5 | 面试 |
| 39 | STAR 法则 | 12-interview/project-stories | L5 | 面试 |

---

## 小红书发布建议

- **风格**：漫画多格，有角色"小白"（新手）和"老F"（FDE 专家）
- **标题**：用对话式标题，比如"GPU 挂了怎么办？"
- **封面统一**：紫色主色调（#646cff），角色形象一致
- **系列标签**：#FDE #AI工程师 #大模型 #AI部署 #AI优化 #漫画学AI
- **发布节奏**：入门篇先发（01-10），每周 3-5 张
- **互动引导**：底部加"你觉得哪个最难？评论区聊聊 👇"
- **文案配合**：发布时配一段文字"第 X 张：用最白的话讲清楚最难的技术"
