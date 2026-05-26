# 第 4 篇：模型原理③——架构对比

---

## 发布方案

### 标题（选一）

- 模型怎么"选词"的？解码策略大解析
- MoE + MLA + 多模态——DeepSeek 为什么这么便宜？
- Llama vs DeepSeek vs Qwen——架构怎么选？

---

### 小红书正文

```
同样是 Decoder-only，为什么 Llama、DeepSeek、Qwen 部署起来完全不一样？
这篇 8 张漫画带你了解主流模型架构：
① 解码策略 —— Greedy / Top-k / Top-p
② MoE —— 大模型的"找专家"模式
③ MLA —— DeepSeek 的独门秘籍
④ 多模态模型 —— 图片+文字怎么部署？
⑤ Decoder-only 架构演进
⑥ Llama vs DeepSeek vs Qwen —— 架构怎么选
收藏这篇，选对模型不踩坑！
#MoE #DeepSeek #Llama #Qwen #模型架构 #AI科普
```

---

### 图片内容（共 9 张）

---

# 封面

```
Create a vertical cover image for Xiaohongshu (3:4 ratio). Cute cartoon style.
Title in large bold text at center: "Llama vs DeepSeek vs Qwen"
Subtitle below: "三家三种思路，怎么选？"
Characters:
- 小白 (grey hoodie, glasses, curious)
- 老F (purple T-shirt with "FDE" logo, confident)
Style: Clean, modern, purple/white color scheme. Text must be clear and readable.
```

---

## 第 17 话：Scaling Law —— 参数越大模型越聪明？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Scaling Law"
Panel 1:小白: "训练三阶段搞懂了——但到底要多大模型？数据要多少？算力要多少？"
老F: "Scaling Law——告诉你这三个数的关系"小白: "听着像物理定律？"老F: "就是 AI 界的物理定律——参数、数据、算力，三者的黄金比例"
Panel 2:老F draws a chart:老F: "Kaplan 等人 2020 年发现：模型损失和三个因素有幂律关系"
"参数越大 → 模型越聪明""数据越多 → 模型越博学"
"算力越多 → 模型练得越好"Visual: A graph showing loss decreasing as parameters/data/compute increase
Panel 3:黄金比例:老F: "关键结论——参数和数据要匹配"
"7B 参数 → 约 140B tokens 训练数据"
"70B 参数 → 约 1.4T tokens 训练数据"
"参数翻倍，数据也要翻倍"小白: "如果数据不够会怎样？"老F: "浪费参数——模型学不到更多东西"
Panel 4:Chinchilla 定律:老F: "2022 年 DeepMind 发现 Chinchilla 最优——给定算力，参数和数据的最佳分配是 1:20"
"1 个参数 ≈ 20 个 training tokens"
"所以 70B 模型最优数据量 = 1.4T tokens"老F: "违反这个比例 → 算力浪费"小白: "就像大马拉小车——参数太多数据太少，白搭"
Panel 5:小白 asks about model selection:小白: "那我选模型时怎么用 Scaling Law？"
老F: "三个原则：""
1. 不要盲目选大模型——你的任务可能 7B 就够了"
"2. 数据量要匹配——微调数据太少，大模型学不到东西"
"3. 算力规划——训练/微调前按 Scaling Law 算需要多少 GPU"老F: "不是越大越好——是搭配好才最好"小白: "参数×数据×算力 = 铁三角——缺一不可！"

Bottom caption: "Scaling Law = 参数/数据/算力的黄金比例——不是越大越好，是搭配好才最好
```

## 第 18 话：微调方法大全 —— 不用从头来

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "微调方法"
Panel 1:小白: "之前学了训练三阶段——如果我想微调一个模型做客服，要花多少钱？"
"老F: "看用什么方法——三种"Three repair shops appear.
Panel 2:Shop 1 - 全量微调:Workers rebuilding the ENTIRE robot.老板: "所有参数都重新调！效果最好！"
"小白: "要多少钱？"
"老板: "8 块 GPU，10 万块"小白: "太贵了！"
"
Panel 3:Shop 2 - LoRA:A mechanic adds a small adapter piece.老板: "原模型不动，加个小补丁"小白: "效果呢？"
"老板: "差不多！一块 GPU，1 万块"小白: "这个好！"
"老F: ""
"
A 就是在模型上挂个小外挂"
Panel 4:Shop 3 - QLoRA:Mechanic first squishes the robot, then adds adapter.
 "先压缩模型再加 LoRA 补丁"
 "效果会差吗？"
"老板: "差一丢丢，但 4090 就能跑！2 千块！"
"小白: "这也太便宜了！"
"
Panel 5:小白 making a decision chart:"全量：效果💯 成本💸💸💸 — 大公司用""
""
"
A： 效果💯- 成本💸 — 大多数场景""
"QLoRA：效果💯-- 成本💸-- — 个人开发者"小白: "我先从 QLoRA 开始试试！"
"老F: "对！入门首选"
Bottom caption: "全量微调最贵，LoRA 性价比高，QLoRA 最便宜——选适合你的
```

## 第 19 话：大模型怎么"说话"的？—— 解码策略

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Decoding Strategies"
Panel 1:小白: "模型预测了每个词的概率——然后呢？选概率最高的？"
老F: "这就是解码策略——不同的选法，效果完全不一样"
Panel 2:Greedy Search (贪心):老F: "贪心——永远选概率最高的"
"'我想去' → '公园'(60%) > '吃饭'(30%) > '旅行'(10%)"
"优点：确定性、快"
"缺点：可能重复、无聊、不够好"
Panel 3:Top-k Sampling:老F: "Top-k——从前 k 个里随机选"
"'我想去' → 从 top 3 里选——可能选'吃饭'(30%)"
"加了随机性——回答更多样"
"k=50 常用——太大会离谱，太小会无聊"
Panel 4:Top-p (Nucleus) Sampling:老F: "Top-p——选累计概率达到 p 的最小集合"
"不固定 k，而是看概率分布"
"概率集中 → 选少的；概率分散 → 选多的"
"比 Top-k 更智能——根据情况自适应"
Panel 5:老F总结:老F: "部署建议："
"需要确定性（代码、翻译）→ Greedy 或 Beam Search"
"需要创意（写故事）→ Top-p 0.9, temperature 0.7"
"通用对话 → Top-p 0.95, temperature 0.5-0.7"老F: "温度=随机性，Top-p=选择范围——调这两个就够了"

Bottom caption: "Decoding = Greedy/Top-k/Top-p——确定性任务用 Greedy，创意任务用 Top-p
```

## 第 20 话：MoE —— 大模型的"找专家"模式

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "MoE 混合专家"
Panel 1:小白: "之前学的 Transformer 每次都要所有参数一起算——模型越大越贵吧？"
"老F: "所以有了 MoE——混合专家架构"小白: "什么意思？"
"
Panel 2:Hospital analogy:小白 in hospital hallway.小白: "我肚子疼，要所有科室都看一遍吗？"
"护士: "不用！挂消化科就行"Caption: "医院就是这样——找对口的专家"
Panel 3:MoE in action:A question appears: "苹果股票涨了吗？"
"A Router character (like a traffic cop with a whistle) directs it.Router: "金融问题！金融专家上！"
"金融 Expert 💪: "来了！"
" (glowing, active)医疗 Expert 😴: "zzz..."体育 Expert 😴: "zzz..."烹饪 Expert 😴: "zzz..."
Panel 4:小白: "其他专家在睡觉？！"
"老F: "对！不相关的专家不干活——省电！"
"老F: "传统模型：100% 参数都计算"老F: ""
"
：只激活 10-20% 参数"Visual comparison: All experts active vs. only one active
Panel 5:小白: "省了多少？！"
"老F: "同样效果，1/5 算力！"
"老F: "这就是 DeepSeek 为什么这么便宜"老F: "参数 671B，但每次只调用 37B"
"小白: "相当于雇了 100 个专家，每次只用 10 个——太聪明了！"
"
Bottom caption: ""
"
 = 不是所有问题都要所有人答，找到对的人，事半功倍
```

## 第 21 话：MLA —— DeepSeek 的独门秘籍

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "MLA 多头潜在注意力"
Panel 1:小白: "之前说 DeepSeek 用 MoE 省了一大半算力——它还有别的省钱招数吗？"
"老F: "MLA——多头潜在注意力，这是它自己的创新"小白: "听着好复杂..."
Panel 2:老F draws on a board:"传统 Attention 有 3 组参数"Q (Query): [████████████] 32 组K (Key):   [████████████] 32 组V (Value): [████████████] 32 组
 "总共 96 组——显存占用很大"
Panel 3:MLA approach:老F: "MLA 的思路：先压缩，再展开"压缩: [████] 一个"潜向量"用时展开: Q + K + V老F: "就像压缩包——用的时候再解压"
Visual: A zip file icon that expands into Q, K, V
Panel 4:小白: "有什么好处？"
"
 "显存降低 50%+，推理速度提升"
 "训练成本大降——这就是 DeepSeek 为什么便宜"Visual comparison:传统: 96 组参数 → 💰💰💰MLA:  压缩后 → 💰
Panel 5:小白: ""
"
 + MLA = DeepSeek 省钱的两个大招"
 "对！MoE 负责'只请必要的专家'"
 "MLA 负责'每个专家少占显存'"
 "两个加起来——成本降到原来的几分之一"
 "技术就是金钱啊！"
"
Bottom caption: "MLA = 把 Q/K/V 压缩到一个向量里，用的时候再展开——省显存、省成本
```

## 第 22 话：多模态模型 —— 图片+文字怎么部署？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "多模态模型"
Panel 1:小白 uploads a photo to the model.小白: "模型刚学完怎么'练'出来——现在居然还能看图？"
"模型: "一只橘猫坐在窗台上，阳光照在它身上"小白: "它还能看图？！"
"老F: "现在的大模型不只是文字了——多模态"
Panel 2:老F explains how it works:老F: "多模态模型有三只眼睛""
"👁️ 视觉编码器：把图片变成向量""
"👁️ 文字编码器：把文字变成向量""
"🧠 融合层：把图片和文字的向量放在一起理解"
Visual: Image → Vision Encoder → Vector; Text → Text Encoder → Vector; Both → Fusion → Answer
Panel 3:小白: "部署的时候有什么区别？"
"老F: "区别很大！"
""
"1. 视觉 token 很多——一张图 = 256 个文字 token""
"2. 图片也要缓存——和文字一样的原理""
"3. 同样一块 GPU，图片占更多显存，能服务的用户更少"小白: "所以多模态模型更吃资源？"
"
Panel 4:老F: "优化方法有三个""
"1. 图片特征缓存——同样的图只编码一次""
"2. 分辨率自适应——小图少用 token，大图多用""
"3. 根据场景选择——聊天用低分辨率，分析用高分辨率"小白: "图片可以压缩？！"
"老F: "就像发微信——小图随便发，大图才高清"
Panel 5:老F shows the trend:"GPT-4o、Claude、Gemini 都支持多模态""
"未来不只是文字——图片、音频、视频都能理解"
 "部署多模态模型，显存规划要重新算"
 "一张 A100 跑文字 7B 很轻松，跑多模态就要留更多余量"
 "多模态 = 更强大，但也更吃资源！"
"
Bottom caption: "多模态模型 = 文字+图片+音频都能理解——更强大，但也更吃显存
```

## 第 23 话：从 BERT 到 Llama —— 为什么现在全是 Decoder-only？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Decoder-only 架构演进"
Panel 1:小白 looking at model names on a whiteboard.小白: "Llama、DeepSeek、Qwen、GPT——全都是一个架构出来的？没有别的？"
老F: "还真不是——Transformer 原本有三种形态"Visual: Three building blueprints.老F: "Encoder-only、Encoder-Decoder、Decoder-only——但现在只剩下最后一种"
Panel 2:时代1 - Encoder-only (BERT, 2018):模型 reads a whole paragraph and understands.老F: "BERT——把整段文字吃进去，理解每个词的意思"
"优点：阅读理解超强""缺点：不能生成文字，只能分类或填空"老F: "就像学霸——能看懂但不能写作文"
Panel 3:时代2 - Encoder-Decoder (T5/BART, 2020):模型 reads input → processes → generates output.老F: "T5、BART——先理解再生成"
"优点：翻译、摘要效果好""缺点：输入输出要分开算，推理慢"老F: "就像翻译官——先看原文再写译文，两步走"
Panel 4:时代3 - Decoder-only (GPT 2018→Llama 2023):模型 generates text one word at a time.老F: "GPT 2018 年提出了 Decoder-only——只用生成部分"
"优点：什么都能做——对话、补全、翻译、摘要"
"缺点：长文本理解不如 BERT 精确"老F: "但 2023 年后，Decoder-only 彻底碾压一切"
Panel 5:老F explains why:老F: "为什么 Decoder-only 赢了？""
1. 训练简单——一个架构搞定所有任务"
"2. 推理简单——自回归，一个一个生成"
"3. 规模效应——数据越多、模型越大，效果越好"
"4. 部署简单——不需要 Encoder 和 Decoder 两部分"小白: "就像瑞士军刀——不是每项最强，但全能且好部署"
老F: "FDE 每天部署的模型，99% 都是 Decoder-only"

Bottom caption: "Encoder 能理解但不能生成 → Encoder-Decoder 两步走慢 → Decoder-only 全能又简单——2023 年后一家独大
```

## 第 24 话：Llama vs DeepSeek vs Qwen —— 架构怎么选？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "主流模型架构对比"
Panel 1:小白 looking at three model cards.小白: "都是 Decoder-only，但 Llama、DeepSeek、Qwen 部署起来完全不一样——到底差在哪？"
老F: "三家三种思路——就像三家车企造不同的车"
Panel 2:Llama 3 - 保守派:The sturdy sedan (Llama 3).老F: "Llama 3.1——保守但可靠"
"架构：Dense（所有参数都参与计算）"
"注意力：GQA（分组查询注意力）""
"最大 405B 参数——暴力堆规模"老F: "部署简单——就是一台大 Dense 模型"
"缺点：显存需求大，405B FP16 = 810GB"小白: "大力出奇迹——简单粗暴但有效"
Panel 3:DeepSeek V3 - 创新派:The futuristic sports car (DeepSeek).老F: "DeepSeek V3——处处创新"
"架构：MoE（671B 总参数，每次只用 37B）"
"注意力：MLA（多头潜在注意力——KV Cache 压缩 70%）"
"专家：256 个专家，每次选 9 个"老F: "部署复杂——要考虑 expert 分布和 AllToAll 通信"
"但省显存——671B 的模型只要 37B 的显存"小白: "花小钱办大事——但运维难度高"
Panel 4:Qwen 2.5 - 均衡派:The reliable family SUV (Qwen).老F: "Qwen 2.5——均衡路线"
"架构：Dense（和 Llama 类似）"
"注意力：GQA（和 Llama 类似）""
"独特之处：QKV bias（注意力里多三个偏置项）"
"最大 72B——不大不小，性价比最高"老F: "部署最简单——和 Llama 一样的流程"小白: "不强不弱但好用——性价比之选"
Panel 5:老F summary table on board:"架构选型三问：""
1. 追求极限效果且不在乎成本？→ Llama 405B"
"2. 追求性价比且愿意折腾？→ DeepSeek 671B"
"3. 追求部署简单且够用就行？→ Qwen 72B"小白: "不是'谁更好'——是'你的场景需要什么'"
老F: "FDE 的核心能力——不是选最强的模型，是选最适合部署的模型"

Bottom caption: "Llama 保守堆规模 → DeepSeek 创新省显存 → Qwen 均衡好部署——没有最好，只有最适合
```


---

### 系列引导（评论区置顶）

```
📚 FDE 漫画系列 · 81 话持续更新中！
全系列 81 话，关注我看后续更新！
```
