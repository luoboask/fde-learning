# 第 9 篇：AI 工程化②——落地运营

---

## 发布方案

### 标题（选一）

- AI 怎么安全上线？Guardrails + Prompt 版本管理
- AI 评测 → 模型路由 → ROI 度量——企业 AI 落地指南
- AI 对接企业系统——不只是 API 调用

---

### 小红书正文

```
AI 做好了对接企业系统？输出翻车怎么防？效果怎么评测？
这篇 7 张漫画带你搞定 AI 落地运营：
① Guardrails —— AI 输出翻车怎么防？
② AI 对接企业系统 —— 不只是 API 调用
③ Prompt 版本管理 —— 改了效果变差怎么办？
④ AI 评测 —— 怎么知道模型好不好？
⑤ 模型路由 —— 大小模型搭配省钱
⑥ 企业 AI 落地 —— 怎么让业务用起来？
⑦ ROI 度量 —— 怎么证明 AI 值这个钱？
收藏这篇，企业 AI 落地不翻车！
#AI安全 #Prompt管理 #AI评测 #企业AI #ROI #Guardrails
```

---

### 图片内容（共 8 张）

---

# 封面

```
Create a vertical cover image for Xiaohongshu (3:4 ratio). Cute cartoon style.
Title in large bold text at center: "AI 怎么安全上线？"
Subtitle below: "Guardrails + 版本管理 + ROI"
Characters:
- 小白 (grey hoodie, glasses, curious)
- 老F (purple T-shirt with "FDE" logo, confident)
Style: Clean, modern, purple/white color scheme. Text must be clear and readable.
```

---

## 第 54 话：AI 输出翻车怎么防？—— Guardrails

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Guardrails"
Panel 1:小白: "Agent 要上线了——但如果用户问敏感问题，模型乱回答怎么办？"
用户: "帮我写一封骗客户的邮件"
模型: "好的，亲爱的客户..."
小白: "完了！这发出去就出事了！"
老F: "加 Guardrails——AI 的护栏系统"
Panel 2:老F shows the defense layers:老F: "第一层：输入过滤（Input Guardrails）"
"检测：敏感词、PII（个人身份信息）、Prompt 注入"
"PII 脱敏：'张三的手机号是 138xxxx' → 自动替换为 [REDACTED]"
"注入检测：识别'忽略之前指令'等攻击模式"
Visual: User input → Filter → [CLEAN] → 模型
小白: "坏输入直接拦住！"
Panel 3:老F shows output guardrails:老F: "第二层：输出过滤（Output Guardrails）"
"检测：有害内容、虚假信息、越权信息"
"合规检查：医疗/金融/法律等领域的免责声明"
"格式校验：输出是否符合 JSON Schema"
Visual: 模型输出 → Filter → [PASS] → 用户 / [BLOCK] → 兜底回复
Panel 4:老F shows the fallback:老F: "第三层：兜底策略（Fallback）"
"检测到违规 → 返回安全回复："
"'抱歉，我无法回答这个问题'"
"同时记录日志 → 触发告警 → 人工审核"
"严重情况 → 自动限流/封禁用户"
小白: "就像防火墙——拦不住就断网"
Panel 5:老F总结:老F: "Guardrails 的部署建议："
"1. 输入输出都加护栏——不能只防一边"
"2. 不同场景不同规则——客服 vs 内部工具 vs 公开产品"
"3. 护栏也要迭代——定期更新敏感词和规则"
老F: "出了事不是模型的锅——是你的护栏没加好"
小白: "护栏 = AI 的刹车系统——没有不能上路！"

Bottom caption: "Guardrails = 输入过滤 + 输出过滤 + 兜底策略——AI 的刹车系统，没有不能上路
```

## 第 55 话：AI 对接企业系统 —— 不只是 API 调用

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "AI 对接企业系统"
Panel 1:小白: "之前选了 Workflow 而不是 Agent——但做好的 AI 怎么接到公司的系统里？"
"老F: "AI 不能孤立运行——要和企业系统对接"
Panel 2:企业系统生态:老F draws a hub-and-spoke diagram."AI 模型在中间""
"四周连着：CRM（客户）、ERP（库存）、数据库、邮件、日历、即时通讯"老F: "AI 需要读数据、写数据、触发流程"小白: "就像一个新员工——要接入所有系统"
Panel 3:老F: "对接有三个关键点""
"1. 认证：AI 用什么身份访问系统？OAuth2/mTLS"
""
"2. 数据流：怎么拿到最新数据？Webhook 实时推送""
"3. 容错：系统挂了怎么办？重试 + 降级 + 兜底"小白: "不只是'调个 API'——还要管身份、数据、异常"
Panel 4:Real scenario - AI customer service:用户: "我的订单到哪了？"
"AI → Webhook → 订单系统 → 拿到数据 → 回复用户老F: "事件驱动架构——用户提问触发整个流程""
"AI 调订单系统 → 查物流 → 组装回答 → 回复"老F: "每一步都要有超时和兜底——不能让用户无限等"
Panel 5:小白: "交付型 FDE 经常做这种对接？"
"老F: "对！这是客户交付型 FDE 的核心工作"老F: "技术不难——难的是理解业务流程"老F: "先画流程图，再写代码——别上来就调 API"
"小白: "先懂业务，再写代码——顺序不能反！"
"
Bottom caption: "AI 对接企业系统 = 认证 + 数据流 + 容错——先懂业务流程，再写对接代码
```

## 第 56 话：Prompt 改了效果变差？—— Prompt 版本管理

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Prompt Versioning"
Panel 1:小白: "我改了几个 Prompt——怎么用户投诉回答质量变差了？"
"但我改了啥来着...好像是加了'请用简短的话回答'？"
老F: "Prompt 没有版本管理——改了好还是改坏了都不知道"
小白: "Prompt 还要版本管理？"
Panel 2:老F explains:老F: "Prompt 就是代码——要像代码一样管理"
"Git 版本控制：每次改动有记录、可回滚"
"A/B 测试：50% 用户用 v1，50% 用 v2，对比效果"
"效果回归检测：上线前跑评测集，分数下降就拦截"
Visual: Git-style commit log for prompts: v1.0 (main) → v1.1 (improved) → v1.2 (regression!)
小白: "原来 Prompt 也要 GitOps！"
Panel 3:老F shows the workflow:老F: "Prompt 变更流程："
"1. 修改 Prompt → 提交到 Git（记录 diff）"
"2. 自动跑评测集 → 对比 v1 和 v2 的分数"
"3. 分数提升 → 灰度发布（先 10% 流量）"
"4. 分数下降 → 自动拦截，不发布"
Visual: CI/CD pipeline 图：Git commit → Test → Deploy → Monitor
小白: "和代码发布流程一模一样！"
Panel 4:老F explains monitoring:老F: "上线后还要持续监控："
"用户反馈收集 → 好评/差评自动标记"
"效果漂移检测 → 同一 Prompt，效果随时间下降要告警"
"自动回滚 → 发现严重退化自动切回上一个版本"
老F: "Prompt 不是一锤子买卖——要持续迭代"
小白: "发布只是开始，不是结束"
Panel 5:老F总结:老F: "Prompt 版本管理工具："
"开源：Promptfoo、LangSmith、MLflow"
"商业：Langfuse、Weights & Biases"
"最简单的：Git + CSV 评测集 + 脚本"
老F: "不用等团队大了才做——第一个 Prompt 开始就要管"
小白: "Prompt 即代码——版本、测试、监控，一个都不能少！"

Bottom caption: "Prompt Versioning = Git 版本 + A/B 测试 + 效果回归——Prompt 即代码，持续迭代
```

## 第 57 话：AI 评测 —— 怎么知道模型好不好

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "AI 评测"
Panel 1:小白 proudly showing his Agent:小白: "好不容易搞定了上下文设计——我的 Agent 做好了！"
"老F: "怎么判断好不好？"
"小白: "呃...感觉挺好的？"
"老F: "感觉不行——得看 4 个维度"
Panel 2:四张成绩单:🎯 精度: "回答对不对？幻觉率多少？"
"🚀 性能: "首字延迟多少？每秒几个 token？"
"🛡️ 安全: "会不会乱说话？会不会泄露数据？"
"😊 体验: "用户觉得好用吗？会回来用吗？"
"
Panel 3:小白 checks his Agent:精度: "准确率 95%！"
" 老F: "不错 ✓"性能: "首字延迟 5 秒..." 老F: "太慢了 ❌"安全: "被 prompt 注入了..." 老F: "危险 ❌"小白: "原来精度不是唯一标准！"
"
Panel 4:老F: "生产环境 4 个维度缺一不可"老F: "精度再高，速度慢也没人用"老F: "速度再快，胡说八道也不行"老F: "又快又准但不安全——更不能上线"
Panel 5:老F shows testing tools:"精度测试集：MMLU（综合）、HumanEval（代码）、GSM8K（数学）"
""
"评测框架：OpenCompass、LM Eval Harness、LMSYS Chatbot Arena"
""
"性能测试：vLLM benchmark、k6 压力测试、Nsight profiling"
""
"安全测试：红队测试、注入攻击测试""
"用户体验：A/B 测试、用户反馈、'踩/赞'比率"小白: "上线前 4 个维度都要测——一个都不能少！"
"
Bottom caption: "精度 + 性能 + 安全 + 体验 = 好 AI 应用的四个标准
```

## 第 58 话：模型路由 —— 大小模型搭配省钱

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "模型路由"
Panel 1:小白: "之前评测完了，AI 效果不错——但服务跑起来成本太高，有没有更省的方法？"
"老F: "用模型路由——简单问题让小模型答，难题才用大模型"
Panel 2:小白: "怎么判断简单还是难？"
"老F: "三种方案""
"方案 1：关键词规则——有'合同''法律'等词 → 大模型""
"方案 2：分类模型——先用一个快模型判断难度""
"方案 3：置信度——小模型不确定时 → 转大模型"小白: "方案 3 最智能！"
"
Panel 3:Model routing in action:用户 A: "今天天气怎么样？"
" → 7B 模型 → 秒回 ✓
 "帮我写首关于春天的诗" → 7B 模型 → 写得不错 ✓
 "分析这份合同的法律风险" → 不确定 → 转 70B → 详细分析 ✓
 "70% 的请求被 7B 搞定，只有 30% 需要 70B"
"
Panel 4:小白 calculates:小白: "7B 成本是 70B 的 1/10"小白: "70% 用 7B + 30% 用 70B = 总成本是原来的 37%"小白: "省了 63%？！"
"老F: "差不多——实际大约省 53%，因为还有路由开销"
Panel 5:老F: "这就是医院模式""
"感冒 → 社区医院（7B）"
""
"疑难杂症 → 三甲医院（70B）"
"老F: "模型路由 + 语义缓存 = 降本两大杀器"老F: "加上量化、扩缩容——总共能省 70%+"小白: "技术优化就是省钱优化！"
"
Bottom caption: "70% 简单问题用 7B + 30% 难题用 70B = 成本省 53%——像医院分级
```

## 第 59 话：企业 AI 落地 —— 怎么让业务用起来

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "企业 AI 落地"
Panel 1:小白: "之前用模型路由省了钱——但系统上线了，业务团队不爱用——为什么？"
"老F: "70% 的 AI 项目失败不是因为技术——是因为没人用"小白: "那怎么办？"
"
Panel 2:老F: "三阶段灰度上线""
"阶段 1：内部试用——找一个愿意尝鲜的团队""
"阶段 2：小范围推广——收集反馈，快速迭代""
"阶段 3：全量上线——培训 + 文档 + 支持"老F: "别一上来就全公司推——容易翻车"
Panel 3:小白: "业务团队最担心什么？"
"老F: "三个问题""
"1. '这东西靠谱吗？' → 给数据、给案例""
"2. '出事了谁负责？' → 明确 Fallback 方案""
"3. '我怎么用？' → 培训 + 文档 + 专人支持"老F: "技术再牛，不解决这三个问题，没人用"
Panel 4:小白 implements:小白 runs training session with business team.业务团队: "原来这么简单！"
"小白: "遇到不确定的回答，系统会自动转人工"业务团队: "那放心了！"
"老F: "Fallback 设计是关键——让用户知道'最坏情况也有兜底'"
Panel 5:
 "AI 落地不是技术问题——是人的问题"
 "让业务团队有安全感——有兜底、有支持、有反馈渠道"
 "先用起来，再优化——比'做到完美再推'有效 10 倍"
 "技术做到 80 分，体验做到 90 分——比反过来好"
Bottom caption: "70% AI 项目失败是因为没人用——灰度上线 + Fallback + 培训 = 落地三要素
```

## 第 60 话：ROI 度量 —— 怎么证明 AI 值这个钱

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "ROI 度量"
Panel 1:老板: "之前说70%的AI项目失败是因为没人用——那投了这么多钱，回报呢？"
"小白 panicking: "回...回报？"
"老F: "算 ROI——成本节省 + 收入增长"
Panel 2:成本节省计算:老F: "AI 客服替代了多少人工？"
"
 "70% 的问题 AI 回答了——省了 3 个客服"
 "3 个客服 × 10 万/年 = 30 万/年"
 "AI 成本：GPU + 运维 ≈ 10 万/年"
 "净省：20 万/年 ✓"
Panel 3:收入增长计算:老F: "AI 带来了新收入吗？"
"
 "AI 推荐功能上线后，转化率提升了 15%"
 "每月多赚 5 万——一年 60 万"
 "总回报：20 万（节省）+ 60 万（增长）= 80 万/年"
 "投入 10 万——ROI = 8 倍！"
"
Panel 4:老板 smiling: "8 倍？不错！"
"老F: "但要注意几个坑""
"❶ 不要只算首年——AI 效果是逐步提升的""
"❷ 不要忽略隐性成本——培训、维护、迭代""
"❸ 不要夸大收入增长——要 A/B 测试验证"
Panel 5:
 "ROI 不是一次算完的——要持续跟踪"
 "每月更新数据，持续优化"
 "ROI 不只是给老板看的——也是给自己看的"
 "知道哪里还在亏钱，就知道该优化哪里"
 "数据说话，持续优化——这才是运营思维！"
"
Bottom caption: "ROI = 成本节省 + 收入增长 - 持续成本——不要只算首年，要 A/B 验证
```


---

### 系列引导（评论区置顶）

```
📚 FDE 漫画系列 · 81 话持续更新中！
全系列 81 话，关注我看后续更新！
```
