# 第 8 篇：AI 工程化①——Prompt 到 Agent

---

## 发布方案

### 标题（选一）

- Prompt 工程 → RAG → Agent → 一条漫画走完 AI 应用全链路
- 从写好提示词到让 AI 自己干活，中间差了多远？
- Function Calling + MCP + Multi-Agent——AI 进阶指南

---

### 小红书正文

```
从写好 Prompt 到让 AI 自己干活，中间要学多少？
这篇 13 张漫画带你走完 AI 工程化全链路：
① Prompt Chaining —— 复杂任务怎么拆？
② Prompt 工程 —— 怎么写好提示词
③ Function Calling —— 怎么让模型调用工具？
④ Structured Output —— 模型输出怎么 parse？
⑤ RAG —— 从"闭卷考试"到"开卷考试"
⑥ Embedding 与向量数据库 —— 知识怎么存？
⑦ Advanced RAG —— RAG 效果不好怎么办？
⑧ 上下文工程 —— Prompt 工程的升级版
⑨ Agent —— 不只是聊天，让 AI 自己干活
⑩ 流式响应 —— 首字太慢用户等不及？
⑪ MCP 协议 —— 给 AI 装一个"万能插座"
⑫ Multi-Agent —— 多个 Agent 怎么协作？
⑬ Agent vs Workflow —— 企业 AI 怎么选？
收藏这篇，AI 应用开发不迷路！
#Prompt工程 #RAG #Agent #FunctionCalling #MCP #AI工程化
```

---

### 图片内容（共 14 张）

---

# 封面

```
Create a vertical cover image for Xiaohongshu (3:4 ratio). Cute cartoon style.
Title in large bold text at center: "从 Prompt 到 Agent"
Subtitle below: "AI 应用全链路"
Characters:
- 小白 (grey hoodie, glasses, curious)
- 老F (purple T-shirt with "FDE" logo, confident)
Style: Clean, modern, purple/white color scheme. Text must be clear and readable.
```

---

## 第 41 话：复杂任务怎么拆？—— Prompt Chaining

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Prompt Chaining"
Panel 1:小白: "Prompt 搞好了，但'分析这篇文章并总结优缺点并给出改进建议'——一个 Prompt 写出来效果很差"
"老F: "因为你让模型同时做三件事——拆成三个 Prompt，一个接一个跑"小白: "一个接一个？"
Panel 2:老F shows a chain.Prompt 1: "分析这篇文章的主要论点" → 输出: "论点 A, B, C"
Prompt 2: "基于论点 A,B,C，总结优缺点" → 输出: "优点 X,Y; 缺点 Z"Prompt 3: "基于优缺点，给出改进建议" → 输出: "建议 1,2,3"
"小白: "每一步都只做一件事——质量高多了！"
Panel 3:老F explains why.老F: "单个 Prompt 做太多事，模型会：""1. 注意力分散——不知道重点在哪""2. 漏掉步骤——忘记做某件事""3. 质量下降——每个都做不好"
"老F: "Chain 的好处——每一步都能专注，上一步的输出就是下一步的输入"
Panel 4:老F shows advanced patterns.老F: "进阶玩法：""分支：一个输出 → 多个 Prompt 并行处理"
""汇聚：多个输出 → 一个汇总 Prompt"老F: "还能加判断——如果上一步结果不好，换不同的 Prompt 重试"
"小白: "就像流水线——每个工位只做一个工序"
Panel 5:老F: "什么时候用 Chain？""任务需要多个步骤""每步的输出影响下一步""想分别控制每步的质量"老F: "记住——一个 Prompt 只做一件事，复杂的事拆成 Chain"
"小白: "化繁为简——拆了再串起来！"

Bottom caption: "Prompt Chaining = 复杂任务拆成多步，每步只做一件事——上一步的输出是下一步的输入
```

## 第 42 话：Prompt 工程 —— 怎么写好提示词

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Prompt 工程"
Panel 1:小白 types: "帮我写代码"AI returns: 一段乱七八糟的代码小白: "好不容易把 Agent 对接完了，但 AI 回答的一塌糊涂！这啥啊！"
"老F: "Prompt 写得好不好，效果差十万八千里"
Panel 2:老F takes over the keyboard:老F types:"你是一个资深 Python 工程师 背景：我们需要一个数据清洗脚本 任务：读取 CSV，去除空值，输出清洗后数据 要求：有注释、有异常处理、符合 PEP8"AI returns: 完美代码！
 "差这么多？！"
"
Panel 3:老F adds one more thing:"请一步步思考，先理解需求，再设计方案，最后写代码"AI: "让我一步步来..."（更好的代码）
 "加一句'一步步思考'，效果提升 20-50%！"
"小白: "这么神奇？"
"
Panel 4:老F writes on a board - 万能模板:"你是[角色]——给 AI 一个身份""
"背景是[背景信息]——让 AI 理解场景""
"任务是[具体任务]——告诉 AI 做什么""
"要求是[格式/风格/长度]——限定输出""
"参考示例是[Few-shot]——给 AI 看例子"小白: "以后就按这个写！"
"
Panel 5:
 "再教你一个进阶技巧——工具调用"
 "告诉模型有哪些工具可用，让它自己选"
 "'你可以使用数据库查询工具和邮件发送工具'"
 "模型会自动选择用什么工具——这就是 Agent 的基础"
 "Prompt 不只是'说话'——是'下指令'！"
"
Bottom caption: "角色 + 背景 + 任务 + 要求 + 示例 + 工具 = 好 Prompt 六件套
```

## 第 43 话：怎么让模型调用工具？—— Function Calling

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Function Calling"
Panel 1:小白: "Prompt Chain 搞好了——但模型怎么查天气、搜数据库、发邮件？它又不是能上网"
"老F: "Function Calling——模型说'我要用这个工具'，然后你来执行"小白: "模型会'点菜'？"
Panel 2:老F shows the flow.老F: "第一步：你告诉模型有哪些工具"
"Visual: 工具列表 → [get_weather(city), search_db(query), send_email(to, subject, body)]"
"老F: "每个工具都有名字、参数、说明"模型: "我需要用 get_weather，参数 city='北京'"
Panel 3:老F shows the execution flow.User → 模型: "北京今天天气怎么样？"模型 → User: "我想调用 get_weather(city='北京')"User → 执行 get_weather("北京") → 结果: "晴，25°C"
User → 模型: 返回结果"北京今天天气晴，25°C"模型 → User: "北京今天晴天，25度"
小白: "模型不自己查，而是告诉我该查什么——我来跑腿！"
Panel 4:老F explains best practices.老F: "Function Calling 的关键：""1. 工具说明要清楚——模型靠描述决定用什么""
"2. 参数类型要明确——字符串、数字、枚举""3. 错误要反馈——调用失败告诉模型，它会换方案"
"老F: "大部分主流模型都支持——GPT-4、Claude、Gemini"
Panel 5:老F: "Function Calling 是 Agent 的基础——模型能'说话'了，下一步就是让它'动手'""
"后面学的 Agent、MCP——都是在这个基础上扩展的"小白: "模型说，我来做——这就是 AI 应用的精髓！"

Bottom caption: "Function Calling = 模型'点菜'（选工具+参数）→ 你来'上菜'（执行）→ 结果反馈——AI 动手的第一步
```

## 第 44 话：模型输出怎么 parse？—— Structured Output

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Structured Output"
Panel 1:小白: "之前学了 Function Calling——但模型直接返回文本时，我怎么提取数据？"
代码解析: '{"name": "张三", "age": 25}' → 成功
代码解析: '好的，这个人名叫张三，大概25岁左右吧' → 解析失败！
小白: "模型又不好好按 JSON 格式返回！"
Panel 2:老F shows the solution.老F: "Structured Output——让模型必须按格式输出"
"方法 1：JSON Mode——强制输出合法 JSON"
"方法 2：JSON Schema——限定字段名、类型、必填项"
Visual: JSON Schema 定义 → 模型输出完全匹配 schema
小白: "加了 schema 之后呢？"老F: "模型输出 100% 符合 schema——否则重新生成"
Panel 3:老F explains the deployment impact:老F: "为什么生产系统必须用 Structured Output？"
"1. 下游系统需要固定格式——数据库字段不能变"
"2. 自由文本不可靠——模型今天这样写，明天那样写"
"3. 解析失败 = 系统崩溃——不能靠运气"
Visual: Before → 自由文本 → 解析失败 → 报错
Visual: After → JSON Schema → 100% 解析成功 → 正常处理
Panel 4:老F shows advanced usage:老F: "进阶用法："
"多步校验：Schema 验证 + 业务逻辑验证"
"重试机制：格式不对自动重试（max 3 次）"
"兜底方案：重试失败走人工审核"
小白: "就像表单验证——前端校验 + 后端校验 + 异常处理"
Panel 5:老F总结:老F: "三个原则："
"1. 能 Structured 就不自由——输出格式必须约束"
"2. Schema 即合约——前后端都按这个定义"
"3. 永远做校验——不要信任模型输出"
小白: "模型输出不可信——校验是必须的！"

Bottom caption: "Structured Output = JSON Schema 约束输出——能约束就不自由，永远做校验
```

## 第 45 话：RAG —— 从"闭卷考试"到"开卷考试"

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "RAG 原理"
Panel 1:小白: "模型部署都搞定了——但我想做一个基于公司文档的智能问答，怎么做？"老F: "用 RAG！检索增强生成"小白: "那是什么？"
"
Panel 2:闭卷考试 vs 开卷考试:Student A (闭卷): Sweating.Question: "你公司去年营收是多少？"
"Student A: "我...不知道...大概 50 亿？"
"老F: "这是不用 RAG 的大模型——可能瞎编"
Panel 3:Student B (开卷): Opens a book.Student B: "让我查一下..."Student B: "根据 2023 年报第 42 页，营收是 68 亿元"
 "这是用了 RAG——准确、有出处！"
"小白: "就是让大模型先查资料再回答！"
"
Panel 4:RAG 流程图:1 💬 "用户提问" → 2 🔄 "向量化" → 3 📚 "检索知识库" → 4 📝 "拼装 Prompt"
" → 5 🤖 "模型生成"老F explains each step:"把问题变成向量 → 在数据库找相关文档 → 把文档和问题一起给模型 → 模型基于资料回答"
Panel 5:小白: "企业为什么都要用 RAG？"
"老F: "三个原因""
"1. 准确——基于真实数据，不瞎编""
"2. 有时效性——不用重新训练，更新文档就行""
"3. 有出处——可以说'根据某某文档'"小白: "比让模型'记住'所有东西靠谱多了！"
"老F: "再加一招——语义缓存"老F: "同样的问题来了，直接返回之前的答案"老F: "不是完全相同的才算——意思相近的就复用"小白: "比如'公司去年赚多少'和'去年营收'——意思一样？"
"老F: "对！语义缓存能再省 30-50% 的计算！"
"
Bottom caption: "RAG = 先检索相关资料，再让模型回答——从闭卷变开卷
```

## 第 46 话：知识怎么存？—— Embedding 模型与向量数据库

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Embedding 与向量数据库"
Panel 1:小白: "之前说 RAG 要先'检索'再'生成'——那检索是怎么找到相关文档的？"
"老F: "两步：Embedding 模型把文档变成向量 + 向量数据库帮你快速找到最相似的"小白: "像之前学的 Embedding？"
"老F: "对！但用的是专门的 Embedding 模型"
Panel 2:老F shows embedding models.老F: "不同的 Embedding 模型，擅长的不一样"
"OpenAI text-embedding-3-large: 3072 维，多语言最强""
"Cohere embed-v3: 擅长企业文档搜索"
"开源 BGE-m3: 免费，中文好，1024 维"老F: "选 Embedding 模型看三点：语言支持、维度、场景匹配"
Panel 3:老F shows vector DB.老F: "向量存好了，怎么快速找到最相似的？——向量数据库"
"Milvus: 开源最强，十亿级向量""Pinecone: 全托管，开箱即用""Qdrant: Rust 写的，超快"Visual: 用户查询向量 → 向量数据库 → 返回 Top 10 最相似的文档向量
"小白: "就像在图书馆里一秒找到你要的书"
Panel 4:老F shows the indexing.老F: "向量数据库的核心——索引算法"
"HNSW: 图搜索，精度最高，最常用""IVF: 聚类分桶，适合海量数据"
"老F: "不需要遍历所有向量——索引让它只看一小部分就能找到答案"小白: "就像不翻完所有书就能找到你要的那本"
Panel 5:老F shows complete flow.老F: "完整流程：""1. 文档切块 → Embedding → 存入向量库""2. 用户查询 → Embedding → 向量库搜索 Top-K""3. Top-K 文档 → 拼成 Prompt → 模型生成"
"老F: "这就是 RAG 的知识基础设施——Embedding + 向量库，缺一不可"小白: "原来 RAG 背后这么多学问！"

Bottom caption: "Embedding 模型把文本变向量 + 向量数据库快速检索 = RAG 的知识基础设施
```

## 第 47 话：RAG 效果不好怎么办？—— 高级检索技巧

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Advanced RAG"
Panel 1:小白: "上回搭好了 RAG——但用户说搜不到想要的东西！"
用户问: "公司的年假政策是什么？"
RAG 返回: "员工手册第3章：考勤制度"（不相关）
小白: "向量搜索不是应该找最相关的吗？"
老F: "基础 RAG 还不够——需要进阶技巧"
Panel 2:老F explains Hybrid Search:老F: "第一招：混合检索（Hybrid Search）"
"语义搜索：'年假政策' → 向量相似度 → 找到语义相关的内容"
"关键词搜索（BM25）：'年假' → 精确匹配关键词 → 找到含'年假'的段落"
"结果合并 + 加权排序 = 既懂语义又精确定位"
小白: "两个搜索引擎一起用！"
Panel 3:老F explains Reranking:老F: "第二招：重排序（Reranker）"
"第一步：混合检索 → 召回 top 50 个候选段落"
"第二步：Reranker 模型 → 精排，给每个段落打分"
"第三步：取 top 5 给大模型"
"准确率提升 30-50%——召回便宜，精排准"
Visual: 50 candidates → Reranker filter → Top 5
Panel 4:老F explains GraphRAG:老F: "第三招：GraphRAG（知识图谱增强）"
"传统 RAG：按段落切分，关系丢失"
"GraphRAG：先建知识图谱——实体、关系、层级"
"搜索'年假' → 图谱找到：年假→属于→福利→关联→职级→对应天数"
小白: "不仅找到相关段落，还找到了关系链！"
Panel 5:老F总结:老F: "RAG 进阶路线图："
"基础版：向量搜索 → 能用但不够准"
"进阶版：混合检索 + Reranker → 准确率大幅提升"
"高级版：GraphRAG + Parent Document → 关系+上下文都保留"
小白: "RAG 不是搭好就行——得不断优化检索质量！"

Bottom caption: "Advanced RAG = 混合检索 + 重排序 + GraphRAG——从能用变好用
```

## 第 48 话：上下文工程 —— Prompt 工程的升级版

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Context Engineering"
Panel 1:小白: "之前学了怎么写好 Prompt——但 Agent 聊着聊着就忘了之前的内容！"
老F: "这不是 Prompt 的问题——是上下文的问题"
老F: "Karpathy 说了：大多数 AI Agent 失败不是因为模型差，而是上下文设计差"
Panel 2:老F draws on a board:老F: "Prompt 工程 = 写好一句话"
老F: "上下文工程 = 设计整个信息环境"
"Prompt → 记忆 → 工具 → 知识 → 约束"
老F: "不只是'怎么说'，而是'给什么、什么时候给、怎么组织'"
Panel 3:Five elements of Context Engineering:1. Prompt: "好的指令（之前学过了）"
2. Memory: "记住之前的对话和偏好——短期/长期记忆"
3. Tools: "知道能用什么工具——工具列表和描述"
4. Knowledge: "可以检索的知识库（RAG）"
5. Constraints: "边界和规则——什么不能做"
小白: "Prompt 只是其中一环！还有这么多！"
Panel 4:老F: "再教你一个——上下文压缩"
老F: "对话太长超出限制怎么办？"
"方法 1：自动摘要——把前面的对话浓缩成要点"
"方法 2：分层记忆——重要的保留，细节的可以丢弃"
"方法 3：外部记忆——存在数据库里，需要时检索"
小白: "就像人脑——重要的记住，不重要的忘掉，需要的再查！"
Panel 5:小白 summarizes:"上下文工程 = 设计 AI 的'工作环境'"
"不只是写好 prompt——还要管记忆、工具、知识、约束"
老F: "2026 年最重要的 AI 技能——不是 prompt，是 context"
老F: "给 AI 一个好环境，比教它说话更重要"

Bottom caption: "上下文工程 = Prompt + 记忆 + 工具 + 知识 + 约束——给 AI 设计好整个工作环境
```

## 第 49 话：Agent —— 不只是聊天，让 AI 自己干活

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Agent 架构"
Panel 1:小白: "RAG 只是回答问题——我想让 AI 自己干活"老F: "那就用 Agent！"
"小白: "Agent 和 RAG 有什么区别？"
"
Panel 2:普通大模型 vs Agent:Intern sitting at desk (普通大模型):
 "帮我分析上周销售数据"Intern: "好的，但我查不到数据..."
 "聪明但没工具"
Panel 3:老F给实习生配了一个工具腰带:Tool belt has: 🔍 数据库, 📊 图表工具, 📧 邮件Agent (with tool belt) now thinking:"先查数据库 → 再做分析 → 最后发邮件"
Panel 4:Agent in action:🔍 查数据库 → 拿到销售数据📊 生成图表 → 做出分析报告📧 发送邮件 → "分析报告已发到您邮箱"小白: "太厉害了！它自己完成了整个流程！"
"
Panel 5:
 "Agent 的核心不是模型更强"
 "而是'会用什么工具'和'知道什么时候用'"
 "Agent 循环：接收任务 → 思考规划 → 选择工具 → 执行 → 观察 → 决定下一步"
 "不是知道多少——而是会用工具！"
"
Bottom caption: "Agent = 大模型 + 工具 + 规划能力——让 AI 自己干活
```

## 第 50 话：首字太慢用户等不及？—— 流式响应

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Streaming Response"
Panel 1:小白: "Agent 功能做好了——但用户说'点了之后等好久才看到回复'！"
用户等待 5 秒... 10 秒... 然后整个回答一下子出来
用户: "卡住了？关了关了"
小白: "Prefill 阶段首字延迟 8 秒——用户全跑了"
老F: "上流式响应！"
Panel 2:老F explains the difference:老F: "普通模式 vs 流式模式"
"普通：等全部生成完 → 一次性返回 → 用户等 20 秒"
"流式：生成一个字 → 推一个字 → 用户 0.5 秒看到第一个字"
Visual: 进度条对比。普通: [===========] 20s → 一次显示。流式: ▌▌▌▌▌ 逐字出现，0.5s 开始
小白: "用户感觉快多了！"
Panel 3:老F shows how to implement:老F: "实现方式——SSE（Server-Sent Events）"
"服务端：每生成一个 token 就 push 给客户端"
"客户端：收到 token 就追加显示"
"代码就几行——但体验天差地别"
Visual: Python code snippet showing SSE stream
老F: "WebSocket 也行——但 SSE 更简单，单向推送够用"
Panel 4:老F explains the challenges:老F: "流式响应有三个坑："
"1. 结构化输出不能流——JSON 必须完整才能 parse"
"  解法：先流式生成文本，最后再结构化"
"2. 中间内容可能不合适——用户看到了一半但出错了"
"  解法：加'生成中'状态，失败时整段替换"
"3. 流式下 TTFT 依然取决于 Prefill——要配合 KV Cache 优化"
小白: "流式不是万能药——Prefill 该优化还得优化"
Panel 5:小白总结:小白: "流式响应的价值："
"TTFT（首字延迟）从 20s → 0.5s"
"用户感知等待时间减少 95%"
"虽然总时间不变，但体验完全不同"
老F: "用户体验 = 首字延迟，不是总延迟——先让用户看到东西"
小白: "快 ≠ 总时间短，= 先让用户看到第一个字！"

Bottom caption: "Streaming = SSE 逐字推送——总时间不变，但首字 0.5s，用户体验提升 95%
```

## 第 51 话：MCP 协议 —— 给 AI 装一个"万能插座"

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "MCP 协议"
Panel 1:小白 writing code frantically.之前学了 Agent 能让AI自己干活，但每接一个新工具都要写代码。
 "接入数据库写一个 connector，接入邮件写一个 connector..."
 "每接一个新工具都要写代码——太麻烦了！"
"老F: "试试 MCP——Model Context Protocol"
"
Panel 2:老F shows a universal adapter plug.老F: "MCP 就是一个'万能插座'"老F: "以前：每个工具写一个 connector（1对1）"
"老F: "现在：所有工具通过 MCP 标准接入（1对N）"
"
Visual: Before = messy cables everywhere. After = everything plugs into one standard socket.
Panel 3:MCP architecture shown simply:AI Model ↔ MCP Protocol ↔ Tools老F: "MCP 有三层""
"Server 端：暴露工具（数据库、API、文件系统）"
""
"Protocol：统一的请求/响应格式""
"Client 端：AI 模型通过 MCP 调用工具"小白: "就像 USB——不管什么设备，插上就能用！"
"
Panel 4:小白 implements MCP:小白: "我用 MCP 接了数据库、邮件、日历三个工具"小白: "新工具？写一个 MCP Server 就行——模型自动发现和使用！"
"老F: "Claude、GPT、Gemini 都支持 MCP——模型无关！"
"
Panel 5:老F shows the ecosystem:"MCP 已经是 AI 工具集成的行业标准了""
"所有主流模型和工具都支持——不用它才奇怪""
"以后做 Agent，不需要每个工具写 connector"
"小白: "一次接入，所有模型通用——这才是标准的力量！"
"
Bottom caption: "MCP = AI 工具的 USB 标准——一次接入，所有模型通用，不用每个工具写 connector"
```

## 第 52 话：多个 Agent 怎么协作？—— Multi-Agent

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Multi-Agent"
Panel 1:小白: "单个 Agent 能查数据、发邮件——但'分析销售数据→写报告→做PPT→发老板'一个 Agent 搞不定"
老F: "那就用 Multi-Agent！多个 Agent 分工协作"
小白: "一群 AI 一起干活？"
老F: "就像一个团队——每个 Agent 有自己的角色和工具"
Panel 2:老F shows Supervisor 模式:老F: "模式一：Supervisor（主管模式）"
"主管 Agent 接收任务 → 分解成子任务 → 分给子 Agent"
"子 Agent 执行 → 返回结果 → 主管汇总"
Visual: Supervisor Agent at top, with arrows to Researcher, Writer, Reviewer agents
小白: "就像项目经理管几个工程师"
Panel 3:老F shows Orchestrator-Workers 模式:老F: "模式二：Orchestrator-Workers（编排者-工人）"
"编排者收到任务 → 并行分配给多个 Worker"
"Worker 各自执行 → 结果聚合"
"适合并行任务——比如同时查 10 个数据源"
Visual: Orchestrator splits query → 3 Workers in parallel → Results merge
小白: "并行执行——速度快！"
Panel 4:老F shows evaluation pattern:老F: "模式三：Reviewer-Refiner（评审-优化）"
"Agent A 生成答案 → Agent B 评审质量"
"如果不合格 → 打回 Agent A 重写"
"直到通过评审 → 最终输出"
Visual: Agent A → Answer → Agent B (check) → Pass: output / Fail: retry
小白: "就像 code review——写完要审，不合格重写"
Panel 5:老F总结:老F: "Multi-Agent 的选型指南："
"简单任务 → 单个 Agent 就够了"
"多步骤复杂任务 → Supervisor 模式"
"需要并行处理 → Orchestrator-Workers"
"对质量要求高 → Reviewer-Refiner"
老F: "但注意——Agent 越多，通信开销越大，延迟越高"
小白: "不是越多越好——够用就行！"

Bottom caption: "Multi-Agent = 主管/编排/评审——分工协作但通信有开销，够用就行
```

## 第 53 话：Agent vs Workflow —— 企业 AI 怎么选？

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Agent vs Workflow"
Panel 1:小白: "Agent 能自己选工具、自己规划——但公司说'太不可控了，要能审计'"
老F: "这就是 Agent vs Workflow 的核心矛盾"
小白: "Workflow 是什么？"
Panel 2:Workflow (工作流):老F: "Workflow = 预设的流程"
"步骤 A → 判断 → 步骤 B → 步骤 C"
"每一步都是确定的——可审计、可回溯"
"工具：Dify、LangGraph、Temporal"
"优点：稳定、可控、合规"
"缺点：不够灵活——遇到预设外的情况就卡住"
Panel 3:Agent (智能体):老F: "Agent = 自主规划"
"接收任务 → 自己选工具 → 执行 → 观察 → 决定下一步"
"优点：灵活——能处理未知情况"
"缺点：不可预测——同一次输入可能走不同路径"
"合规风险：审计时说不清它为什么这么做"
Panel 4:企业选型指南:老F draws a decision matrix:
"场景 | 推荐"
"客服回答标准问题 → Workflow（固定流程）"
"数据分析探索 → Agent（灵活探索）"
"审批流程 → Workflow（必须可审计）"
"创意设计 → Agent（需要自由度）"
"合规要求高 → Workflow 为主 + Agent 辅助"
Panel 5:老F总结:老F: "最佳实践：混合使用"
"外层用 Workflow 保证合规和可审计"
"内层用 Agent 处理复杂决策"
"Agent 的每次调用都记录日志——事后审计"
小白: "Workflow 是框架，Agent 是填充——两者结合！"
老F: "企业 AI = 可控的灵活性——不是非黑即白"

Bottom caption: "Workflow = 可控可审计，Agent = 灵活不可预测——企业推荐 Workflow 为主 + Agent 辅助
```


---

### 系列引导（评论区置顶）

```
📚 FDE 漫画系列 · 81 话持续更新中！
全系列 81 话，关注我看后续更新！
```
