# 第 3 篇：模型原理②——Transformer 深入

---

## 发布方案

### 标题（选一）

- 拆一层 Transformer 看看——大模型内部到底长什么样？
- Attention + 思维链 + 训练三阶段——8 张漫画搞懂大模型进阶
- 模型是怎么"学会思考"的？

---

### 小红书正文

```
大模型怎么"理解"文字？Attention 是怎么"划重点"的？
思维链为什么让模型变聪明？训练三阶段花了多少钱？
这篇 8 张漫画带你深入 Transformer 内部：
① Attention 机制 —— AI 的"划重点"能力
② KV Cache —— 大模型的"小抄"
③ 思维链 —— 模型也能"想"了
④ 预训练 vs 后训练 —— 有什么区别？
⑤ Base vs Instruct 模型
⑥ 训练三阶段 —— 预训练 → 微调 → 对齐
⑦ Scaling Law —— 参数越大越聪明？
⑧ 微调方法大全 —— 不用从头来
收藏这篇，搞懂大模型进阶原理！
#Attention #KVCache #思维链 #大模型训练 #Transformer #AI科普
```

---

### 图片内容（共 9 张）

---

# 封面

```
Create a vertical cover image for Xiaohongshu (3:4 ratio). Cute cartoon style.
Title in large bold text at center: "Transformer 内部长什么样？"
Subtitle below: "拆一层给你看"
Characters:
- 小白 (grey hoodie, glasses, curious)
- 老F (purple T-shirt with "FDE" logo, confident)
Style: Clean, modern, purple/white color scheme. Text must be clear and readable.
```

---

## 第 9 话：大模型怎么"理解"我说的话？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Embedding"
Panel 1:小白: "之前把文字拆成 token 了——但一堆数字 token 怎么变成'意思'的？"
老F: "Embedding——把每个 token 变成高维向量"小白: "高维向量？说人话！"
Panel 2:老F draws a map.老F: "Embedding 把每个词变成一个坐标"
"'猫'和'狗'靠得近——都是动物""
"'猫'和'汽车'离得远——不同类别""
"'国王'-'男人'+'女人'='女王'——向量运算有意义！"
Visual: 2D projection showing word clusters
Panel 3:老F explains dimensions:老F: "现代模型用几千维的向量"
"'猫' = [0.2, -0.8, 1.3, 0.1, ...] (4096 个数字)"
"每个维度编码不同的语义特征"
"动物性？大小？颜色？情感？——模型自己学会的"小白: "几千维？人脑只能想象三维！"
Panel 4:老F: "加上 RoPE（旋转位置编码）——让模型知道词的顺序"
"'猫追狗'和'狗追猫'——同样的词，不同的位置编码"
"位置编码让模型理解'谁对谁做了什么'"小白: "同样的词，不同的顺序 = 完全不同的意思！"
Panel 5:小白 summarizes:"Token → Embedding 向量 → 带位置 → 模型理解语义"老F: "数字不是'理解'——但高维空间里，语义有了几何意义"

Bottom caption: "Embedding = 把词变成高维向量——语义变成几何，位置编码让模型懂顺序
```

## 第 10 话：拆一层 Transformer 看看——残差、归一化、激活函数

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Transformer 内部结构"
Panel 1:小白: "之前看了整体流程——但每一层到底怎么加工的？"
老F: "来，我们用显微镜看一层 Transformer"Visual: A Transformer layer under a microscope.老F: "四层结构——Attention、残差、归一化、FFN"
Panel 2:Step 1 - Attention (下话会展开讲):老F: "Attention = 找关系——每个词看上下文"
"Input: '苹果很好吃'""
"'苹果'看到'好吃'→这是水果"Visual: Attention highlighting words in sentence
Panel 3:Step 2 - 残差连接 (Residual Connection):老F shows a 'skip' connection.老F: "残差连接——原始信息绕一圈直接传下去"
"公式: output = Attention(input) + input"老F: "如果没有残差，信息在深层会慢慢消失"老F: "就像传话游戏——原版话本必须保留"
Visual: Information flowing through with a shortcut path skipping around
Panel 4:Step 3 - RMSNorm（归一化）:老F: "RMSNorm = 防止信息爆炸或消失"
"如果Attention输出太大 → 归一化缩小"
"如果Attention输出太小 → 归一化放大"老F: "就像稳压器——让信号保持正常范围"
Panel 5:Step 4 - FFN + SwiGLU激活函数:老F: "FFN = 独立加工每个词"老F: "核心是 SwiGLU 激活函数——给模型'非线性'能力"
"公式: SwiGLU(x) = x · sigmoid(βx) · γx"老F: "有了它，模型才能表达复杂的关系"
"没有它，多层Transformer = 单层线性模型"小白: "难怪 SwiGLU 是现代模型的标配！"

Bottom caption: "Attention找关系 → 残差保留信息 → RMSNorm稳压 → FFN+SwiGLU加工——一层Transformer的完整加工流程
```

## 第 11 话：Attention —— AI 的"划重点"超能力

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Attention 机制"
Panel 1:小白: "前几话学了思维链、后训练、多模态——但Transformer 里的"自注意力"我还没搞懂！"
"老F: "想象老师让你读一篇长文章，然后问你问题"Teacher holding a long essay.老师: "读完回答问题！"
"
Panel 2:A student reading.Student's thought: "我不会每句话平均用力——我会找关键词！"
"老F: "Attention 就是 AI 版的'找重点'能力""
"它知道哪些词重要，哪些不重要"
Panel 3:老F shows how Attention works with Q, K, V:Sentence: "苹果手机是一家科技公司"
 "Attention 用三个东西来工作"Q (Query): "我在想什么？"
" → 想找'苹果'的意思K (Key): "这里有什么线索？"
" → '手机'和'公司'是线索V (Value): "实际含义是什么？"
" → '电子产品公司'Visual: Q → K → V flow with highlights
Panel 4:小白: "所以 Attention = 用 Q 去找 K，然后用 K 的相似度来取 V？"
"老F: "完全正确！就这么简单！"
"老F writes formula: "Attention(Q,K,V) = softmax(Q×K) × V"
"小白: "看着复杂，其实就是在'划重点'！"
"
Panel 5:老F shows different types of Attention:"MHA（多头注意力）：多个'重点视角'同时看""
"GQA（分组查询注意力）：分组看，省资源""
"MQA（多查询注意力）：共享线索，更快"
 "还有 FlashAttention——硬件优化版，把 Attention 的计算方式改了"
 "传统 Attention：先把所有注意力矩阵算出来——特别占显存"
 ""
"
ttention：边算边存，不需要完整的矩阵——显存省一半，速度翻倍"小白: "所以 FlashAttention 不是算法变了，是计算方式变了？"
"老F: "对！IO 感知——让计算适应硬件，而不是反过来"
Bottom caption: "Attention = AI 的'划重点'能力——Q 找 K，取 V，就这么简单
```

## 第 12 话：KV Cache —— 大模型的"小抄"

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "KV Cache"
"
Panel 1:小白: "多卡通信搞懂了——但模型生成文字为什么还是这么慢？每次都在重复计算同样的东西？"
"老F: "因为每次都在重复计算——看我演示"
Panel 2:餐厅场景 - 没有 KV Cache:小白: "今天天气怎么样？"
"模型 waiter writes everything on a fresh paper.
 "从头算"
 "真好"模型 waiter THROWS AWAY the paper and starts a NEW one.
 "等等你为什么从头写？！"
"模型: "因为每次都是新对话啊"小白: "太蠢了吧！！"
"
Panel 3:有 KV Cache:老F appears with a clipboard.老F: "让我来——算完的存起来！"
"小白: "今天天气怎么样？"
"老F writes and keeps the paper.小白: "真好"老F just adds "真好" to the existing paper.小白: "快多了！"
"
Panel 4:老F shows the trade-off on a balance scale:Left side: "显存 ↑ 多占 30-50%"Right side: "速度 ↑ 快 3-10 倍"
 "用空间换时间——绝对值！"
"小白: "就像考试带小抄！"
"
Panel 5:老F shows a real calculation:老F: "70B 模型，32 个用户，4096 长度"老F: "KV Cache ≈ 36GB！"
"老F: "一块 A100（80GB）将近一半被它占了！"
"小白: "所以优化 KV Cache 特别重要——占这么多显存"老F: "对！后面会讲到怎么优化它"
Bottom caption: "KV Cache = 算过的存起来，下次直接拿来用——用空间换时间
```

## 第 13 话：模型也能"想"了？—— 思维链与推理模型

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Chain of Thought"
Panel 1:小白: "模型不是逐个字猜的吗？——但有些模型会'一步步思考'，怎么做到的？"
老F: "思维链（Chain of Thought）——让模型把思考过程写出来"
Panel 2:对比两种回答:普通模型: "9.11 和 9.8 哪个大？" → "9.11"
思维链模型: "让我比较一下...9.11 = 9 + 0.11, 9.8 = 9 + 0.8...0.8 > 0.11...所以 9.8 更大"
小白: "写出来反而对了？！"
Panel 3:老F explains why:老F: "写思考过程 = 把大问题拆成小步骤"
"每步都正确 → 最终正确"
"直接答 → 容易跳步出错"老F: "研究发现：思维链让数学能力提升 20-50%"
Panel 4:老F: "推理模型（o1/R1）更进一步——先'想'再'答'"
"思考过程对用户隐藏，只显示最终答案"
"部署时：思考 tokens 也要计算——更贵更慢"老F: "但质量大幅提升——值得"
Panel 5:小白: "所以推理模型 = 更长的思维链 + 更好的推理训练？"
老F: "对！部署时注意——思考 tokens 也占 context window"老F: "用户看不到思考过程，但你要为它付钱"

Bottom caption: "Chain of Thought = 把思考过程写出来——拆小步，降错误，推理模型的核心技术
```

## 第 14 话：预训练 vs 后训练 —— 有什么区别？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "预训练 vs 后训练"
Panel 1:小白: "之前说推理模型的'思考能力'是后训练加上的——后训练到底是什么？"
"老F: "预训练是让模型'知道很多东西'"老F: "后训练是让模型'会做具体事情'"
Panel 2:预训练:A baby robot reading thousands of books."从互联网海量文本中学""
"目标：猜下一个词""
"结果：知识丰富但不会聊天"老F: "就像一个人读了全世界书但不会社交"
Panel 3:后训练（Post-training）:Three methods shown:SFT（监督微调）:Teacher: "按这个格式回答"Model: "学会了！"
"
 "教模型按正确格式做事"RLHF（人类反馈强化学习）:Human gives thumbs up or down."人类评价：哪个回答更好"Model adjusts to get thumbs up.
 "让模型学会'什么样的回答是好回答'"DPO（直接偏好优化）:No human needed during training."直接用偏好数据训练，不需要奖励模型"
 "RLHF 的简化版——效果差不多，更简单"
Panel 4:小白: "RLHF 和 DPO 选哪个？"
"老F: "DPO 更简单——不需要训练奖励模型"老F: "但 RLHF 上限更高——奖励模型能学到更细的偏好"老F: "大部分场景 DPO 够了——简单好用"
Panel 5:小白 summarizes:"预训练 = 学知识（基础能力）"
""
"后训练 = 学行为（对齐人类偏好）"
"老F: "FDE 主要关注推理阶段，但理解训练区别很重要"老F: "因为不同训练阶段的模型，推理特性不同"老F: "比如推理模型的思考过程就是后训练加上的能力"
Bottom caption: "预训练 = 学知识（基础能力），后训练 = 学行为（对齐人类偏好）——RLHF/DPO 是后训练方法
```

## 第 15 话：Base 模型 vs Instruct 模型 —— 有什么区别？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Base vs Instruct 模型"
Panel 1:小白: "我下载了 LLaMA-70B 模型——怎么只会续写文章，不会回答问题？"
老F: "你下的是 Base 模型——它只会续写，不会对话"小白: "还有另一种？"
老F: "Instruct 模型——对话版"
Panel 2:Base 模型表现:用户: "法国的首都是哪里？"
Base模型: "法国是一个美丽的国家，拥有丰富的历史和文化..."小白: "它在续写！不是在回答！"
老F: "Base 模型看到'法国的首都是'就自动续写——它不知道这是个问题"
Panel 3:Instruct 模型表现:Same question → Instruct模型: "法国的首都是巴黎。"
老F: "Instruct 模型经过了 SFT（监督微调）——它知道这是问题，要回答"小白: "同一个模型，训练之后就能对话了？"
老F: "对！训练数据不同，行为完全不同"
Panel 4:老F explains the difference:老F: "Base 模型训练数据：互联网文本（维基百科、书籍、网页）"
"Instruct 模型额外训练：问答对、对话格式、指令遵循"
"训练方式：SFT + RLHF/DPO"Visual: Base → +指令数据 → Instruct
Panel 5:小白 asks about deployment:小白: "部署的时候选哪个？"
老F: "看用途：""
做续写、翻译、补全 → Base 模型"
"做对话、问答、助手 → Instruct/Chat 模型"小白: "千万别用 Base 做对话——它只会续写！"
老F: "对！这是新手最容易踩的坑"

Bottom caption: "Base 模型只会续写，Instruct 模型能对话——同一个模型，训练不同，行为不同
```

## 第 16 话：大模型是怎么"练"出来的？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Training Pipeline"
Panel 1:小白: "Base 模型只会续写，Instruct 能对话——怎么从一个变成另一个的？"
老F: "三阶段训练——预训练、微调、对齐"
Panel 2:Stage 1 - 预训练 (Pre-training):老F: "第一阶段：预训练——读万卷书"
"数据：万亿 token 的互联网文本"
"目标：预测下一个词——学语言和世界知识""
"成本：几千万美元，几千张 GPU，几个月"
小白: "这是最贵的阶段！"
Panel 3:Stage 2 - 监督微调 (SFT):老F: "第二阶段：SFT——学技能"
"数据：几万到几十万高质量问答对"
"目标：学会对话格式——知道问题是问题，要回答""
"成本：几十万美元，几周"小白: "就像实习生——学了基础再学干活！"
Panel 4:Stage 3 - 对齐 (RLHF/DPO):老F: "第三阶段：对齐——学做人"
"数据：人类偏好排序（A 回答比 B 好）"
"目标：回答符合人类价值观——安全、有用、诚实""
"方法：RLHF 或 DPO"小白: "从'会说话'变成'说对话'！"
Panel 5:小白 summarizes:"预训练学知识 → 微调学技能 → 对齐学做人"老F: "三个阶段，成本差 100 倍——理解了这个就知道模型为什么这么贵"

Bottom caption: "训练三阶段 = 预训练学知识 → 微调学技能 → 对齐学做人——每阶段成本差百倍
```


---

### 系列引导（评论区置顶）

```
📚 FDE 漫画系列 · 81 话持续更新中！

上一篇：模型原理篇 —— 从 Tokenization 到训练三阶段
下一篇：推理优化篇 —— 量化、vLLM、SGLang
全系列 81 话，关注我看后续更新！
```
