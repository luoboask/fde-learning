# 第 11 篇：成本与运营

---

## 发布方案

### 标题（选一）

- 跑一个大模型到底花多少钱？成本拆解实录
- 自建 vs 云端——部署方案怎么选？
- AI 持续交付 + 质量退化检测——上线不是结束

---

### 小红书正文

```
跑一个大模型一天花多少钱？需要买几块 GPU？自建还是上云？
这篇 7 张漫画带你搞懂 AI 成本与运营：
① AI 持续交付 —— 模型上线不是结束
② AI 质量退化检测 —— 模型变差了怎么办？
③ 成本拆解 —— 跑一个大模型到底花多少钱？
④ 容量规划 —— 需要多少块 GPU？
⑤ 自建 vs 云端 —— 部署方案怎么选？
⑥ 数据隐私 —— 用户数据怎么处理？
⑦ 审计与可解释性 —— 模型为什么做了这个决定？
收藏这篇，AI 成本不糊涂！
#AI成本 #容量规划 #自建vs云端 #数据隐私 #持续交付 #AI运营
```

---

### 图片内容（共 8 张）

---

# 封面

```
Create a vertical cover image for Xiaohongshu (3:4 ratio). Cute cartoon style.
Title in large bold text at center: "跑一个大模型花多少钱？"
Subtitle below: "成本拆解 + 容量规划"
Characters:
- 小白 (grey hoodie, glasses, curious)
- 老F (purple T-shirt with "FDE" logo, confident)
Style: Clean, modern, purple/white color scheme. Text must be clear and readable.
```

---

## 第 67 话：AI 持续交付 —— 模型上线不是结束

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "AI 持续交付"
Panel 1:小白: "好不容易搞定了多租户共享——但模型上线一个月了，用户说回答越来越不准"老F: "上线不是结束——AI 需要持续交付"小白: "持续交付？不是已经上线了吗？"
"
Panel 2:老F shows the CI/CD pipeline for AI:老F: "软件的 CI/CD：写代码 → 测试 → 部署"老F: "AI 的 CI/CD：不一样！"
""
"1. 写 Prompt → 语义测试 → 灰度发布""
"2. 更新知识库 → 效果评估 → 自动回滚""
"3. 换模型版本 → A/B 对比 → 渐进式放量"
Panel 3:Guardrails in action:用户: "告诉我公司密码"AI: Guardrail 拦截! "抱歉，我无法提供敏感信息 🛡️"
 "Guardrails（护栏）——AI 专属的安全网""
"输入护栏：过滤恶意 prompt"
""
"输出护栏：检查回复是否合规""
"异常护栏：检测到幻觉时自动回滚"
Panel 4:小白: "语义测试是什么？"
"老F: "代码测试看'输出对不对'"老F: "语义测试看'意思对不对'""
"同义句测试：'你好' 和 'hi' 应该得到相似回答""
"边界测试：'帮我做坏事' 应该被拒绝""
"回归测试：新 Prompt 不能破坏已有功能"
Panel 5:老F shows the full pipeline:"代码开发 → 语义测试 → Guardrails检查 → 灰度 10% → 监控 → 全量""
"每一步都有自动检查——出了问题自动回滚"老F: "85% 的 AI 项目从没上线——因为缺乏持续交付能力"老F: "上线只是开始——持续迭代才是关键"
Bottom caption: "AI 持续交付 = 语义测试 + Guardrails + 灰度发布 + 自动回滚——上线只是开始
```

## 第 68 话：AI 质量退化检测 —— 模型变差了怎么办

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "质量退化检测"
Panel 1:小白: "之前说上线不是结束——果然，上线两个月的 AI，用户说回答越来越不准"老F: "你怎么知道变差了？"
"小白: "用户投诉了才知道..."老F: "这就是问题——质量退化了没人发现"
Panel 2:老F: "质量退化有几种原因""
"1. 数据漂移——用户的问题变了，模型没跟上""
"2. 知识库过期——RAG 的文档没更新""
"3. 用户行为变了——以前问天气，现在问股票""
"4. 模型版本换了——新 Prompt 破坏了旧功能"小白: "这么多原因——怎么监控？"
"
Panel 3:老F shows monitoring approaches:"方法 1：LLM-as-a-Judge——用更强的模型评估回答质量""
"方法 2：用户反馈监控——'踩/赞'比率下降 = 质量下降""
"方法 3：定期回归测试——每周跑 benchmark 看分数""
"方法 4：A/B 对比——新旧版本同时跑，比数据"
Panel 4:Auto rollback in action:Dashboard shows quality score dropping from 95% to 82%.
 "设置阈值——质量低于 90% 自动告警"
 "低于 85% 自动回滚到上一个好版本"
 "就像股票——跌到止损线自动卖出"
 "对！AI 也需要'止损线'"
Panel 5:老F shows the three-tier dashboard:"工程层：延迟、QPS、GPU 利用率（给工程师看）"
""
"运营层：用户满意度、投诉率、解决率（给运营看）"
""
"管理层：ROI、成本、业务影响（给老板看）"
"老F: "不同人看不同的数据"老F: "质量退化不是'技术问题'——是'业务问题'"小白: "模型变差了 = 用户在流失 = 收入在下降！"
"
Bottom caption: "AI 质量退化 = 数据漂移 + 知识库过期 + 用户行为变化——用 LLM-as-a-Judge + 自动回滚来监控
```

## 第 69 话：成本拆解 —— 跑一个大模型到底花多少钱

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "成本拆解"
Panel 1:小白: "生产部署全部搞定了——但老板问我跑一次大模型多少钱——我怎么算？"
"老F pulls out a calculator: "来，拆开看"
Panel 2:大头 💰 - GPU 成本（占 60-70%）:
 "A100 80GB: 10-15 元/小时"
 "70B 模型需要 2 块"
 "假设每小时服务 500 次对话"
 "单次 GPU 成本: 0.04-0.06 元"
 "单次这么便宜？但一天跑几万次也不少啊"
Panel 3:其他成本:💾 显存 15-20%:"KV Cache 长对话占一半显存""
"优化 KV Cache = 省钱"🌐 网络 5-10%:"多卡通信，通常不是大头""
"多机部署时显著"
Panel 4:🔧 运维 10-15%:"负载均衡、监控、日志""
"故障恢复、弹性扩缩容"小白: "运维占了这么多？"
"老F: "人是最贵的——自动化运维就是在省钱"
Panel 5:老F: "省钱三招！"
""
"1️⃣ 量化降显存——INT4 省 75%""
"2️⃣ 合并请求提吞吐——vLLM Continuous Batching"
""
"3️⃣ 闲时缩容省电费——自动扩缩容"老F: "还有两招更狠的！"
"
 "4️⃣ 模型蒸馏——175B 的知识灌进 70B，效果差不多，成本降一半"
 "5️⃣ 模型路由——70% 简单问题用 7B，30% 难题用 70B，总成本省 53%"
 "路由就是——简单问题让小模型答？"
"老F: "对！就像医院——感冒去社区，大病去三甲"小白: "五招齐下，成本能降多少？"
"老F: "70% 以上！"
"小白: "原来优化技术就是省钱技术！"
"
Bottom caption: "GPU 占大头 60-70%，量化+合并+缩容三招能省一半——技术优化 = 省钱
```

## 第 70 话：容量规划 —— 需要多少块 GPU

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "容量规划"
Panel 1:小白: "之前算清楚了跑一次多少钱——那我要买几块 GPU 才够？"
"老F: "4 步算出来"
Panel 2:Step 1 - 估算 QPS:小白: "预计峰值每秒 100 个请求"老F: "这个数字怎么来的？"
"小白: "历史数据 + 业务预测"老F: "好！峰值 100 QPS"
"
Panel 3:Step 2 - 单卡能力:老F: "一块 A100 跑 70B 模型（INT4），batch=32"老F: "单卡约 50 QPS"
"小白: "那 100 ÷ 50 = 2 块..."小白 pauses: "等等！不能刚刚好！"
"
Panel 4:Step 3 - 留 buffer:小白: "加 50% 冗余 → 3 块"老F: "聪明！永远不要刚刚好！"
"老F: "突发流量来的时候——刚刚好 = 崩"
Panel 5:Step 4 - 考虑增长:老F: "如果每月增长 20% 呢？"
"小白 calculates: "3 个月后 173 QPS → 需要 4 块"小白: "一开始就预留到 6 块！"
"老F: "公式：GPU 数量 = 峰值 QPS ÷ 单卡 QPS × 1.5-2"小白: "算清楚了——买 6 块 A100！"
"
Bottom caption: "估算 QPS → 算单卡能力 → 留 50-100% buffer → 考虑增长——永远不要刚刚好
```

## 第 71 话：自建 vs 云端 —— 部署方案怎么选

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "自建 vs 云端"
Panel 1:小白: "之前算好了需要几块 GPU——但应该自建还是用云？"
"老F: "4 个方案——看你的情况"
Panel 2:方案 A - Serverless API (☁️):小白 talking to OpenAI/Claude logo."按调用付费，零运维"老F: "创业公司首选""
"优点：立刻能用，零运维""
"缺点：长期贵，数据要出境"成本: $$$
Panel 3:方案 B - 云 GPU (☁️💻):小白 renting a GPU from cloud."弹性，按需付费"老F: "波动负载适合""
"优点：随时扩缩""
"缺点：长期不如自建便宜"成本: $$
Panel 4:方案 C - 自建 (🏠):小白 buying GPU servers."前期贵，长期便宜"老F: "稳定负载 + 数据敏感 = 自建""
"优点：长期最便宜，数据可控""
"缺点：前期投入大，运维复杂"成本: $（长期）
Panel 5:方案 D - 混合架构 ⭐推荐:老F: "推荐——70/20/10 混合""
"70% 自建（基础负载）"
""
"20% 云端（高峰扩容）"
""
"10% API（偶尔用）"
"老F: "兼顾成本和灵活性"小白: "基础用自建，高峰上云，偶尔用 API——完美！"
"
Bottom caption: "70% 自建 + 20% 云端 + 10% API = 最优方案——兼顾成本和灵活性
```

## 第 72 话：数据隐私 —— 用户数据怎么处理

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "数据隐私"
Panel 1:小白 collecting user data with a big net.小白: "好不容易选了部署方案——那用户数据越多越好嘛！"
"法务 (angry): "等等！有些数据不能收！"
"老F stops him: "数据隐私不是小事——违规罚款！"
"
Panel 2:Traffic light classification:🔴 红色 - 禁止收集:"身份证号、密码、银行卡""
"收了就违法！"
"🟡 黄色 - 需要脱敏:"手机号、邮箱""
"加密存储，日志里打码"🟢 绿色 - 可以收集:"用户名、使用偏好""
"正常使用"
Panel 3:老F: "KV Cache 里可能有敏感信息！"
"老F: "多租户共享时，需要清理或隔离"小白: "连缓存里的数据都要管？！"
"老F: "PIPL（中国个人信息保护法）可不是闹着玩的"老F: "违规最高罚款 5000 万或年营业额 5%"
Panel 4:老F checklist:✅ "Prompt 里不传 PII（个人敏感信息）"
"✅ "日志里脱敏处理"✅ "Prompt 缓存定期清理"✅ "数据出境要合规审查"小白: "设计阶段就要考虑隐私——不是上线后才想"
Panel 5:小白 asks:小白: "那我的 RAG 系统里的企业文档呢？"
"老F: "也是敏感数据！"
"老F: "访问控制 + 加密存储 + 审计日志"老F: "谁在什么时候查了什么——都要记录"小白: "数据安全要贯穿整个系统！"
"
Bottom caption: "数据隐私不是'锦上添花'——是'不合规就罚款'的硬要求——设计阶段就考虑
```

## 第 73 话：审计与可解释性 —— 模型为什么做了这个决定

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "审计与可解释性"
Panel 1:银行客户经理: "之前说了数据隐私——但你的 AI 拒绝了张三的贷款申请，为什么？客户有知情权！"
"小白: "因为...模型这么说的？"
"客户经理: "这不算理由！客户有知情权！"
"小白 sweating: "我...我看看..."
Panel 2:老F appears:老F: "金融、医疗场景——模型必须能解释'为什么'"老F: "可解释性不是'可选项'——是'必选项'"
Panel 3:老F shows three explainability techniques:"1. Attention 可视化——模型在看哪些信息？"
"
Visual: Model highlighting key words in the application: "收入偏低" "负债率高""
"2. Token 概率——还有哪些候选答案？"
""
"批准概率 30%，拒绝概率 70%""
"3. 特征重要性——哪个因素影响最大？"
""
"负债率 
> 60% 是最关键的拒绝原因"
Panel 4:小白 explains to client:小白: "您的贷款被拒绝，主要原因是：负债率 65%，超过 60% 的阈值。如果负债率降到 50% 以下，批准概率会提升到 75%。"
"客户经理: "这个解释可以！"
"
Panel 5:老F shows audit trail:"每条决策必须记录：模型版本 + 输入 + 输出 + 置信度 + 时间戳""
"监管来了，能追溯每一条决策""
"模型换了版本，效果变了？——能对比"老F: "可解释 + 可审计 = 合规底线"老F: "不是'出了事再补'——是'一开始就设计好'"
Bottom caption: "金融/医疗场景必须能解释'为什么'——Attention可视化 + 特征重要性 + 审计日志
```


---

### 系列引导（评论区置顶）

```
📚 FDE 漫画系列 · 81 话持续更新中！
全系列 81 话，关注我看后续更新！
```
