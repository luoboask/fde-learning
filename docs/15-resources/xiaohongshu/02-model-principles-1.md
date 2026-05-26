# 第 2 篇：模型原理①——文字变智能

---

## 发布方案

### 标题（选一）

- 漫画搞懂大模型原理：文字是怎么变成智能的？
- 别只调用 API 了——搞懂大模型内部到底在干什么
- Tokenization → Embedding → Attention → 一条漫画看懂 Transformer

---

### 小红书正文

```
大模型到底是怎么"理解"你说的话的？
不是魔法——是一套精密的信息加工流程
这篇用 5 张连贯漫画带你走完全流程：
① Tokenization —— 文字怎么变成数字
② Embedding —— 数字怎么变成"意义"
③ 自回归循环 —— 模型怎么一个字一个字生成
④ Prefill vs Decode —— 推理的两个阶段
⑤ Context Window —— 模型一次能装多少内容
收藏这篇，搞懂大模型最核心的原理！
#大模型原理 #Transformer #AI科普 #漫画学AI #Tokenization #Embedding
```

---

### 图片内容（共 6 张）

---

# 封面

```
Create a vertical cover image for Xiaohongshu (3:4 ratio). Cute cartoon style.
Title in large bold text at center: "大模型是怎么工作的？"
Subtitle below: "文字怎么变成智能的？一条漫画讲清楚"
Characters:
- 小白 (grey hoodie, glasses, curious)
- 老F (purple T-shirt with "FDE" logo, confident)
Style: Clean, modern, purple/white color scheme. Text must be clear and readable.
```

---

## 第 4 话：文字如何变成数字？—— Tokenization

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Tokenization"
Panel 1:小白 typing: "大模型怎么'理解'我说的话的？"
"老F: "第一步——把文字变成数字，叫 Tokenization"小白: "文字怎么变数字？"
Panel 2:老F shows a word factory.老F: "模型不认识文字，它只认识数字 ID"
"Visual: '今天天气真好' → Tokenizer → ['今天', '天气', '真', '好'] → [1234, 5678, 901, 234]"
"小白: "一句话被拆成好几块？"
"老F: "对！这些碎片叫 Token——可以是字、词、或者子词"
Panel 3:老F explains BPE.老F: "模型怎么决定怎么拆？看训练时的规则"
"Visual: BPE algorithm merging characters step by step:"
"  t, h, e → th, e → the"
"  今, 天, 天, 气 → 今天, 天气"
"老F: "最常见的字符对会被合并——这叫 BPE（Byte Pair Encoding）"
"小白: "就像最常见的偏旁会组成一个字"
Panel 4:老F shows special tokens.老F: "还有一些特殊 token——模型用来'听懂指令'的"
"<s> —— 对话开始""
"</s> —— 对话结束""
"<|user|> —— 这是用户说的""
"<|assistant|> —— 这是模型回答的"
"小白: "就像交通信号灯，告诉模型什么时候该干嘛"
Panel 5:老F shows vocab size comparison.老F: "不同模型词表大小不同""
"GPT-4: 100K tokens — 能处理更多语言""
"中文模型: 150K+ tokens — 中文子词更多"老F: "词表越大，能理解的语言越多，但计算也更复杂"
"小白: "原来我打字的那一刻，文字已经在变成数字了！"

Bottom caption: "Tokenizer = 文字工厂：句子 → Token → 数字ID——模型只认识数字，不认识文字
```

## 第 5 话：数字如何变成向量？—— Embedding 与位置编码

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Embedding 与位置编码"
Panel 1:小白: "文字变成数字 ID 了——但 1234 这个数字能代表'今天'的意思吗？"
"老F: "不能！下一步——把数字变成向量"小白: "向量？"
"老F: "一组数字，描述一个词在'意义空间'里的位置"
Panel 2:老F shows an embedding lookup table.老F: "每个 token 都有一个对应的向量"
"Visual: Token ID 1234 → [0.23, -0.45, 0.78, ... 4096个数字]"
"老F: "这些数字是训练时学到的——相似的词，向量也相似"
"小白: "就像 GPS 坐标？"老F: "差不多！'猫'和'狗'的向量靠得很近，'猫'和'汽车'就差得远"
Panel 3:老F shows a 3D visualization.小白 looks at floating words in space.小白: "'今天'和'明天'在一起... '开心'和'高兴'在一起... 好神奇！"
"老F: "这就是词向量的魔力——语义变成了距离"
Panel 4:老F adds position.老F: "但还有个问题——向量里没有'位置'信息"
"'我今天开心'和'开心我今天'——词都一样，意思完全不同"小白: "那怎么办？"
"老F: "给每个 token 加上位置编码——RoPE"Visual: token vector + position vector = final input
"就像给每个词贴上座位号"
Panel 5:老F shows the complete pipeline.老F: "完整流程：""文字 → Tokenizer → Token ID → Embedding → +位置编码 → 输入模型"
"小白: "文字→数字→向量→加位置——三步变成模型能吃的东西"老F: "对！这三步之后，模型才真正'看到'了你说的话"

Bottom caption: "Embedding = 数字变向量（词的意义），RoPE = 加位置信息（词的顺序）——缺一不可
```

## 第 6 话：模型怎么"一个字一个字"生成？—— 自回归循环

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Autoregressive Generation"
Panel 1:小白: "Embedding 把文字变成向量了——但模型怎么从向量变回文字的？"
老F: "一个字一个字地猜——自回归生成"小白: "猜？"
Panel 2:老F shows the process.老F: "模型不'知道'答案——它在预测下一个最可能的词"
"'今天天气很好，我想去...' → 模型预测下一个词""公园？""户外？""散步？""——选概率最高的"
Panel 3:老F: "每生成一个字，就把它加到输入里，再预测下一个"
"'今天天气很好，我想去公园' → 预测 → '散'""今天天气很好，我想去公园散" → 预测 → '步'"小白: "就像接龙游戏——接完一个接下一个！"
Panel 4:老F: "这也解释了为什么模型会'胡说八道'"老F: "每个词都是猜的，猜错了就一路错下去"
"所以长回答更容易出问题——错误累积"小白: "所以对话要短——越短越准！"
Panel 5:小白 summarizes:"自回归 = 每步猜一个字 + 加入输入 + 继续猜"老F: "不是'知道'——是'预测'。理解了这个，就理解了一切"

Bottom caption: "Autoregressive = 逐字预测，不是'知道'而是'猜'——理解了这个就理解了LLM的本质
```

## 第 7 话：推理的两个阶段 —— Prefill vs Decode

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Prefill vs Decode"
Panel 1:小白: "多卡通信搞懂了——但模型推理到底是怎么跑的？我听说有什么 Prefill 和 Decode？"
"老F: "生成一句话，其实是两个完全不同的阶段"
Panel 2:Phase 1 - Prefill（预填充）:老F points to a diagram.老F: "第一步：一次性看完你写的所有话"
"Visual: '请帮我写一首关于春天的诗' → 全部送入模型 → 一次性计算"
"老F: "所有 input token 同时算一遍，得到第一个输出"
"小白: "就像看完题目再答题？"
"老F: "对！这一步——计算密集，GPU 算力全开，几十毫秒搞定"
Panel 3:Phase 2 - Decode（解码生成）:老F: "第二步：一个一个词往外蹦"
"Visual: 春天 → → 来了 → → 花儿 → → 开了（每次只算一个词）"
"老F: "每生成一个词，都要把之前所有的结果重新算一遍——除非用了 KV Cache"
"小白: "每步都在等显存取数据？"
"老F: "对！这一步——显存密集，速度取决于显存带宽，最慢！"
Panel 4:老F draws a timeline bar chart:Prefill: ██████████ 80ms (计算密集型)
Decode:  █  █  █  █  █  █  █  █  █  █  (每个词 5-20ms，显存密集型)
老F: "Prefill 只算一次——很快""Decode 每一步都慢——总延迟的大头"
小白: "所以用户感到的'慢'，基本都是 Decode 阶段拖的？"
Panel 5:老F summary:"理解阶段（Prefill）→ 计算瓶颈 → GPU 算力决定快慢""生成阶段（Decode）→ 显存瓶颈 → 显存带宽决定快慢"老F: "两个阶段瓶颈完全不同——优化方法也完全不同"
"老F: "后面学的 KV Cache、vLLM、P-D 分离——全都是围绕这两个阶段来的"
小白: "先搞懂瓶颈在哪，再对症下药——明白了！"

Bottom caption: "推理 = Prefill（一次算完，快）+ Decode（逐个生成，慢）——瓶颈不同，优化方法不同
```

## 第 8 话：你的话太长模型装不下了？—— Context Window

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Context Window"
Panel 1:小白 typing a VERY long document into the model.小白: "我把50页的文档全塞进去了，让AI帮我总结！"
模型: "ERROR！超出上下文窗口限制！"
小白: "什么窗口？"老F: "Context Window——模型能一次处理的长度上限"
Panel 2:老F shows different context windows:GPT-3.5: "4K tokens ≈ 3000字"GPT-4: "128K tokens ≈ 10万字"Claude: "200K tokens ≈ 15万字"小白: "200K 不是很大吗？"
老F: "10万字差不多是一本中篇小说——但50页文档加对话历史轻松就超了"
Panel 3:老F shows what happens when exceeded:老F: "超了之后会发生什么？""
方案1：截断——丢弃最前面的内容（可能丢重要信息）"
"方案2：报错——直接拒绝（安全但体验差）"
"方案3：摘要压缩——用模型自己总结前面的内容"小白: "就像人脑——记不住全部，只能记住重点"
Panel 4:老F explains the deployment impact:老F: "部署时要注意三件事：""
1. Context越长，KV Cache越大——200K的显存是4K的50倍"
"2. 长context下，Prefill阶段计算量暴增——首字延迟变慢"
"3. 注意力机制在长文本上'注意力分散'——模型会漏看中间的内容"
Visual: GPU memory growing as context length increases小白: "所以不是'越大越好'——越大越贵！"
Panel 5:老F shows the solution:老F: "最佳实践：""
能短则短——prompt精简到必要的"
"超出限制用RAG——先检索相关段落再总结"
"真要超长——选支持长context的模型（Claude、GLM）"小白: "先评估用户输入长度，再选模型和方案——明白了！"

Bottom caption: "Context Window = 模型一次能处理的长度上限——越长越贵，能短则短，超长用RAG
```


---

### 系列引导（评论区置顶）

```
📚 FDE 漫画系列 · 81 话持续更新中！

上一篇：FDE 入门篇 —— AI 简史 → FDE 岗位定义
下一篇：GPU 与推理优化篇 —— 量化、vLLM、多卡并行
全系列 81 话，关注我看后续更新！
```
