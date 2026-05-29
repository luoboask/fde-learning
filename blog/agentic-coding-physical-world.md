# Agentic Coding 之后：AI 如何走进物理世界

> 代码写完了只是开始。物理世界的挑战才是真正的试金石。

<!-- truncate -->

---

## 前言

2026 年初，飞猪 CTO 线在一场 ATA 分享中抛出了一个判断：AI 已经解决了信息搜索和代码的问题，PMF 已经找到了。但我们认为，更大的机会在于物理世界的真实消费和生活。

这个判断听起来有些激进。但它背后有一组非常扎眼的数据：OpenAI 的周活是 Anthropic 的 30 倍，但 Anthropic 的年收入（600 亿美金）是 OpenAI（250 亿美金）的 2.4 倍。为什么？因为 Anthropic 的用户在做 coding——每次对话消耗 300K 到 1.5M tokens，而普通聊天只有 25-40K tokens。

Agentic Coding 不仅仅是一个工具升级，它是一个商业模式的颠覆者。而它指向的下一个方向——物理世界的真实消费——比 coding 更大，也更难。

---

## 一、Agentic Coding 为什么是通向 AGI 的第一道光

唐杰教授在 2026 年 AGI-Next 前沿峰会上提出了一个精练的三维框架来描述 AI 技术演进的阶段性：

**第一条：数据/参数 Scaling（系统一）。** 大规模语料加 Transformer 参数堆叠，逼近模式匹配的上限。这是 2020-2024 的主旋律，现在已经进入收益递减区。

**第二条：推理 Scaling（系统二）。** 通过强化学习、思维链、Test-Time Compute 让模型"想得更深"。这是 2024-2025 的焦点——DeepSeek-R1、o1/o3 系列——仍在快速演进，但可预见天花板。

**第三条：自学习环境 Scaling（Agent Scaling）。** 让模型与外部世界持续交互、从环境反馈中自我进化。这条路指向的正是 Agent Scaling Law，是当下和未来 2-3 年的核心增长引擎。

杨植麟在 GTC 2026 上用 Kimi K2.5 的实践将第三条路线具象化为三个工程维度的"共振"：Token 效率、长上下文、以及智能体集群。三个维度的乘积效应，构成了 Agent Scaling 的技术注解。

这三条 Scaling Law 是递进关系。第一条已进入收益递减区；第二条仍在快速演进但可预见天花板；第三条——Agent Scaling Law——是当下真正的增长引擎。

而 Agentic Coding 恰好是第三条路线的第一块试验田。代码世界天然适合 Agent：环境确定（编译器告诉你行不行）、反馈即时（测试跑不跑得通）、试错成本低（改完再跑就是了）。一旦 Agent 在代码世界验证了"自主执行 + 环境反馈 + 自我进化"这条链路，它就具备了走向更广阔物理世界的资格。

---

## 二、物理世界的问题有多难

但物理世界比代码世界难得多。

Coding 和数学问题的特点是：Hard to solve，但 Easy to verify。你写一个哈希排序，对不对一眼就能看出来。而且它是一次性的、静态的——答案和 setup 永远不变。

物理世界消费问题的特点是：同样 Hard to solve，但更头疼的是 Hard to verify。我出两个去巴黎七天的行程规划，或者美加墨看世界杯十天的行程，让两个模型各出一个方案——一眼很难看出谁好谁坏。

还有高度时效性。今天搜酒店和明天搜，库存、价格完全不同，天气、打车能不能打到，都是不可控因素。这对 RL training 来说会引入大量噪声。

还有主观性。我推荐两个景点，我推荐两台扫地机器人，每个人的评判角度都不一样。

这就是用 Coding 方法解决真实物理世界消费问题时面临的核心挑战：你不仅需要解决"怎么做"，还需要解决"怎么判断做得好不好"。

飞猪团队在实践中发现了三个架构创新：

**Least Squares 模型合并。** 现在很多 expert 模型相对于基座的权重更新彼此几乎是 disjoint 的——它们学到了不同的东西。基于这个观察，可以用一种更便宜的合并方式——用激活值信息做加权的最小二乘合并——把多个 expert 的能力拼起来，效果和昂贵的 OPD 蒸馏很接近。

**用大模型取代小模型的 Quick Instruction。** 以前用户 query 进来，先用小模型做意图识别、实体抽取、分流……维护一堆小模型。新的思路是：直接在 user prompt 后面加上语义 token，one-shot 给出意图、领域、是否需要搜索等信息，大模型一次推理全部搞定。对旅行电商来说，用户的画像和实时行为数据本来就很长，如果有 10 个小模型，Context prefill 10 次，可能 1 秒都出不来。

**三层 KV Cache。** 同一个 session 内，前两层保持不变，第三层实时更新。这对旅行购物场景的个性化非常关键。

---

## 三、Trip-Bench：把真实世界变成可训练的 simulator

面对物理世界"hard to verify"的难题，飞猪团队给出的解法是 Trip-Bench——一个 Agentic-RL Pipeline for Physical-World Tasks。

Trip-Bench 的核心思路是：把真实 Agent 的历史轨迹"冻结"为离线世界，让 Agent 自博弈来自动撰写评分器，再把这个评分器直接用作 RL 奖励函数。

从真实的线上轨迹出发，把工具调用的输出冻结成一个离线 SQLite 数据库。用 Agent 自博弈来自动写评分器（rubric），让 RL 有一个确定性的、可复现的奖励信号。把物理世界"hard-to-verify"的问题，转化成了程序可执行的 coding 问题。

但 Trip-Bench 目前还是局部的——数据来自单次 API 调用的快照，reward 信号仍然偏稀疏。下一步是 Shopping-Bench，目标是一个可以无限自我对弈的 world simulator：集成全部消费级 API（旅行、购物、地图、娱乐），让模型在更接近真实世界的环境里学习。

Trip-Bench 最有趣的设计是 Agent self-play writes the grader——三个 Agent 自己跟自己玩：一个出题、一个解题、一个是老师，这样循环。当它达到一定的均衡——环境基本固化了，数据基本固化了，评判标准基本固化了——就认为这是最优的。

这个思路的精妙之处在于：它用博弈论的思想解决了"怎么评判一个旅行规划好不好"这个主观问题。不是人写 rubric，而是 Agent 在自博弈中自然涌现出评判标准。这和"铁律"文章中讨论的确定性 vs 概率性问题一脉相承——Trip-Bench 的本质是把物理世界的概率性问题，转化为 coding 的确定性问题。

---

## 四、从单域 Expert 到跨域 Virtuoso——Agent Harness Cluster

Agent Scaling Law 的真正目标是什么？是提升 Agent 集体的智力等级——从单域 Expert 到跨域 Virtuoso。

Google DeepMind 的 Levels of AGI 框架定义了 AI 系统的智力分级。当前前沿系统（Claude Code、Cursor、Devin 等）在代码、写作、数据分析等结构化领域已经到达 Level 3（Expert）——达到第 90 百分位人类专家的水平。但从 Expert 到 Virtuoso（第 99 百分位）的跃迁，面临一个根本性的困难：

Virtuoso 级别的决策，不是单个专家能独立完成的，而是需要多个不同领域专家团的协作寻优。这恰恰是单 Agent 加单 Harness 架构的物理极限。

Agent Harness Cluster 的技术体系包含三个核心层：

**Layer 1：Agent Harness Scale-Out。** 能力横向扩展层，包含 Multi-Agent Scaling（拓扑优化、调度优化、Agent 动态生成）、Memory & Skill Scaling（经验积累、技能组合、生命周期治理）、Meta-Harness Scaling（架构搜索、工作流自动生成）。

**Layer 2：Data Scale-Out。** 数据横向扩展层，数仓层到语义层到本体层。Agent 的智力不仅取决于模型能力，还取决于它能获取和理解的数据质量。

**Layer 3：Agent Harness Runtime。** 运行时支撑层，包含 Agent 生命周期管理、资源调度与隔离、可观测性与安全治理。

Agent 数量的爆发是必然趋势。原因有三：context 隔离需要 Agent 分裂（按 context 边界切，不按问题类型切）；多视角决策寻优需要 Agent 扩增（多个 Agent 独立推理后综合，决策质量显著优于单 Agent 深度思考）；专精避免 tool 过载（单 Agent 持有超过 15 个工具时，调用正确率显著下降）。

---

## 五、组织升级——AI Native 新基建与三层治理

技术层面的升级，最终要落到组织层面。

Yoho.AI 是阿里内部的一个 AI Native 基础设施项目，覆盖需求分析到设计到编码到验证到归档的全链路。它不是又一个 AI IDE 插件，而是一套完整的 AI Native 工作流。

Yoho.AI 的设计哲学是 Harness，而非 Workflow。传统的 AI 编码工具采用 Workflow 思路——固定 A 到 B 到 C 的步骤。但在复杂业务场景中，这种"流水线上的螺丝钉"思路太脆弱了。Yoho 采用 Harness 模型：定义硬性不变量（改了代码就必须编译、编译不过不许安装），在不变量范围内，AI 有完全的战术决策自由。通过 Hook 系统实时感知 AI 行为，违规时硬性拦截。这就像赛车比赛——不规定你怎么开，但必须在赛道里。

C3 不变量守卫系统（Compile-Commit-Check）是这套哲学的具体实现：改源码必须编译通过、进入下一阶段必须满足前置条件、AI 只能访问声明的工作空间、未完成必要阶段不许停止。这些守卫不是"建议"，是"法律"。

在产品、设计、开发、测试四个角色全面面向 AI Native 升级的过程中，每种角色的核心产出都在发生变化：产品从需求文档变成 Agent 自然语言到结构化 Spec 的自动转换；设计从设计稿变成设计稿到代码的 Skill 链路；开发从写代码变成约束环境下的 AI 自主编码；测试从手动验证变成自动化加 AI 标定失败分类。

一个有趣的信号是：已经有公司开始为 AI Agent 卖保险了。AGT-Lab 的行业调研显示，Mount Insure 推出了面向 AI Agent 的保险产品。当有人开始为 Agent 的行为卖保险时，说明这个生态正在从"实验玩具"走向"商业责任"——可靠性已经是可定价的商品。

---

## 结语

Agentic Coding 不仅仅是"让 AI 写代码"。它是 Agent Scaling Law 的第一块试验田，是通向物理世界真实应用的第一道桥。

Token Multiplier 的经济学证明了这条路走得通——coding 的 token 消耗是聊天的 10 倍到 50 倍，商业价值也是 10 倍量级。Trip-Bench 的 simulator 方法证明了物理世界的"hard to verify"可以被转化为 coding 的"easy to verify"。Harness Cluster 证明了从单域 Expert 到跨域 Virtuoso 的路径不是更好的单 Agent，而是多个专精 Agent 的协作寻优。

代码写完了只是开始。物理世界的挑战——hard to verify、高度时效性、强主观性——才是真正的试金石。

而那个在 Trip-Bench 中自博弈涌现评判标准的 Agent，那个在 Harness Cluster 中协作寻优的 Expert 团队，那个在 Yoho.AI 中被不变量约束的自主执行者——它们正在证明一件事：AI 走进物理世界，不是模型变得更聪明，而是系统变得更可靠。
