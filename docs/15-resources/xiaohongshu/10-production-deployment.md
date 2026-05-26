# 第 10 篇：生产部署架构

---

## 发布方案

### 标题（选一）

- 从 demo 到线上——生产部署架构怎么搭？
- Prefill-Decode 分离 + 自动扩缩容 + 多租户——线上服务怎么搭
- GPU 挂了怎么办？容灾高可用实战

---

### 小红书正文

```
AI 模型做好，线上服务怎么搭才能不崩？
这篇 6 张漫画带你搞定生产部署：
① 生产部署架构 —— 线上服务怎么搭？
② Prefill-Decode 分离 —— 专机专用
③ 自动扩缩容 —— 高峰不崩，闲时省钱
④ 容灾高可用 —— GPU 挂了怎么办？
⑤ 可观测性三板斧 —— 出了问题怎么排查？
⑥ 多租户架构 —— 一块 GPU 多人怎么用？
收藏这篇，线上服务不翻车！
#生产部署 #自动扩缩容 #高可用 #多租户 #可观测性 #AI服务
```

---

### 图片内容（共 7 张）

---

# 封面

```
Create a vertical cover image for Xiaohongshu (3:4 ratio). Cute cartoon style.
Title in large bold text at center: "从 demo 到线上"
Subtitle below: "生产部署架构怎么搭？"
Characters:
- 小白 (grey hoodie, glasses, curious)
- 老F (purple T-shirt with "FDE" logo, confident)
Style: Clean, modern, purple/white color scheme. Text must be clear and readable.
```

---

## 第 61 话：生产部署架构 —— 线上服务怎么搭

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "生产部署架构"
Panel 1:小白 showing a demo on his laptop:小白: "AI 应用做好了，也在本地跑通了——可以上线了吧？"
"老F: "生产环境要复杂得多——要搭 6 层"
Panel 2:老F drawing a building layer by layer:Layer 1 (top) 🌐 接入层:"Nginx/API Gateway"
""
"负载均衡、限流、鉴权""
"就像大楼的门卫——谁来都管"Layer 2 🔄 调度层:"路由请求到不同模型""
"灰度发布、A/B 测试""
"就像大楼的电梯——送到正确的楼层"
Panel 3:Layer 3 🏎️ 推理层:"vLLM/SGLang 推理引擎""
"模型加载、推理服务""
"就像大楼的核心——真正干活的地方"Layer 4 💾 缓存层:"Redis：高频答案缓存""
"向量缓存：RAG 检索缓存""
"就像大楼的储物间——常用的放这里"
Panel 4:Layer 5 📊 监控层:"Prometheus + Grafana"
""
"延迟、QPS、GPU 利用率""
"就像大楼的监控摄像头——随时看着"Layer 6 📝 日志层:"Loki——请求日志""
"模型输入输出记录""
"就像大楼的访客登记——出了事能查"
Panel 5:
 "demo 和生产的区别..."
 "demo 跑起来就行"
 "生产要稳、要快、要省钱、要可追溯"
 "少一层，线上出问题你就知道了"
 "6 层一层都不能少！"
"
Bottom caption: "6 层架构 = 生产级大模型服务的标准——少一层都不行
```

## 第 62 话：Prefill-Decode 分离 —— 专机专用

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "Prefill-Decode 分离"
Panel 1:小白: "好不容易搭好了6层架构——但线上用户多了吞吐量不够，怎么办？"
"老F: "你有没有把 Prefill 和 Decode 分开？"
"小白: "那是啥？"
"
Panel 2:老F explains the two phases:老F: "大模型生成一句话，分两个阶段"Phase 1 🧠 Prefill（预填充）:"一次性处理用户输入的所有词""
"计算密集型——需要 GPU 算力""
"耗时：几十毫秒"
Panel 3:Phase 2 🗣️ Decode（解码生成）:"一个一个词往外蹦""
"显存密集型——需要显存带宽""
"耗时：几百毫秒到几秒"小白: "完全不同的需求！"
"
Panel 4:Traditional vs Separated:传统部署: One worker doing both jobs, sweating."一台机器干两件事——效率低"分离部署: Two specialized workers.Worker A (Prefill): "我专管理解输入，用算力强的 GPU！"
"Worker B (Decode): "我专管往外蹦词，用显存大的 GPU！"
"
Panel 5:老F: "分离后的效果""
"吞吐量提升 2-3 倍！"
""
"成本降低 40%！"
""
""
"
erve、MoonCake 都是这个思路"小白: "专机专用——各司其职效率翻倍！"
"
Bottom caption: "Prefill 和 Decode 需求不同——分开来干，吞吐量翻倍，成本降 40%
```

## 第 63 话：自动扩缩容 —— 高峰不崩，闲时省钱

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "自动扩缩容"
Panel 1:小白: "之前把 Prefill 和 Decode 分开了——但早上用户多晚上用户少，手动调机器太麻烦了"老F: "那就让它自己调——自动扩缩容"
Panel 2:Morning 9am - peak:Office getting crowded with users.老F: "早高峰！QPS 飙升！"
"Servers automatically spawn new instances. 🌱🌱🌱老F: "自动扩容——加机器！"
"Caption: "HPA 检测到 GPU 利用率 
> 80%，自动加实例"
Panel 3:2am - off-peak:Office almost empty.
 "凌晨没人了"Servers automatically shrink back. 💤💤
 "自动缩容——省钱！"
"Caption: "利用率 < 20%，自动减实例"
Panel 4:小白: "怎么实现？"
"老F shows tools:"HPA：根据 GPU 利用率自动扩缩""
"KEDA：根据消息队列长度——有请求才扩容""
"Warm Pool：提前备好热实例""
"冷启动从 2 分钟降到 5 秒"
Panel 5:小白: "高峰期不崩，闲时省钱"老F: "对！这就是生产环境的标配"小白: "不是'要不要做'——是'必须做'！"
"老F: "没错——不做就是人肉运维，迟早累死"
Bottom caption: "自动扩缩容 = 高峰加机器不崩 + 闲时减机器省钱——生产环境标配
```

## 第 64 话：容灾高可用 —— GPU 挂了怎么办

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "容灾高可用"
Panel 1:小白 panicking - alarm ringing!小白: "自动扩缩容搞好了——但 GPU2 挂了！用户投诉了！"
"老F calmly: "别慌——你的容灾方案是什么？"
"小白: "容...容灾？我没做..."
Panel 2:老F shows the ideal scenario:Normal state: 🟢 GPU0 ✅ GPU1 ✅ GPU2 ✅ GPU3 ✅GPU2 fails: 🔴 GPU2: "Xid Error! 我挂了！"
"System automatically isolates GPU2.🟢 GPU0 ✅ GPU1 ✅ 🔴 GPU2 ❌(隔离) ✅ GPU3老F: "自动隔离，用户无感知"
Panel 3:More GPUs fail:🟢 GPU0 ✅ 🔴 GPU1 ❌ 🔴 GPU2 ❌ ✅ GPU3
 "降级服务——降低 batch size 或切换到小模型"
 "能用比不能用好"
 "至少还能服务！"
"
Panel 4:老F: "高可用 = 冗余 + 自动切换 + 降级策略"老F: "设计时就想好——最坏情况怎么办？"
"老F: "不是'会不会挂'——是'挂了怎么办'"小白: "我马上加容灾方案！"
"
Panel 5:老F's checklist:"✅ 单 GPU 故障：自动隔离""
"✅ 多 GPU 故障：降级服务""
"✅ 机房级故障：多 AZ 部署""
"✅ 定期演练：别等出事才发现方案不行"小白: "不是'如果'会出问题——是'什么时候'出问题"
Bottom caption: "GPU 一定会挂——自动隔离、降级服务、多 AZ 部署——别等出事才想
```

## 第 65 话：可观测性三板斧 —— 出了问题怎么排查

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "可观测性"
Panel 1:小白 panicking.小白: "容灾方案做了，服务没挂——但变慢了！不知道哪里出了问题！"
"老F: "你需要可观测性三板斧"小白: "三板斧？"
"
Panel 2:第一斧 📈 - Metrics（指标）:A dashboard showing numbers.老F: "Metrics 告诉你'现在怎么样'""
"GPU 利用率 92%""
"首字延迟 200ms"
""
"QPS 150"老F: "Prometheus + Grafana + DCGM"
"小白: "数字告诉我状态——但不知道为什么慢"
Panel 3:第二斧 📋 - Logs（日志）:A log file scrolling.老F: "Logs 告诉你'发生了什么'""
"Error: OOM at layer 24""
"Request ID: abc123""
"Model version: v2.1"老F: "Loki + ELK"
"小白: "日志告诉我原因——但不知道哪一步慢"
Panel 4:第三斧 🔗 - Traces（链路追踪）:A path showing request flowing through services.
 "Traces 告诉你'慢在哪一步'""
"接入层 5ms → 调度层 10ms → 推理层 180ms ← 瓶颈在这！"
"老F: "Jaeger"
"小白: "找到瓶颈了——推理层！"
"
Panel 5:老F summary:"Metrics：'哪里有问题？'——发现问题""
"Logs：'什么出了问题？'——定位原因""
"Traces：'怎么慢的？'——找到瓶颈"小白: "三板斧齐了！以后出问题不怕了！"
"老F: "不是'怕不怕'的问题——是可观测性是生产环境的底线"
Bottom caption: "Metrics 发现问题 + Logs 定位原因 + Traces 找到瓶颈——三板斧缺一不可
```

## 第 66 话：多租户架构 —— 一块 GPU 多人怎么用

```
Create a vertical 5-panel comic strip for Xiaohongshu (3:4 ratio). Cute cartoon style.
Series indicator at top-left corner: "多租户"
Panel 1:小白: "好不容易把可观测性搭好了——但一块 A100 好贵，三个团队都想用——怎么共享？"老F: "4 种共享方式"
Panel 2:方式 1 - MIG（多实例 GPU）:A GPU being sliced into 7 small pieces like a cake.
 "MIG——把一块 GPU 切成 7 块""
"每人一块，互不影响""
"物理隔离，最安全""
"就像把一个大房子隔成 7 个独立房间"
Panel 3:方式 2 - 时间片:A timer switching between users.User A (100ms) → User B (100ms) → User C (100ms)
 "轮流用——像分时复用""
"最灵活，但性能不稳定""
"就像三个人共用一台电脑，轮流操作"
Panel 4:方式 3 + 4:Priority: VIP user gets served first, others wait in line.
 "优先级——VIP 优先，普通人排队"Quota: Each user has a fixed budget meter.
 "配额——每人固定额度，用完等释放"
 "实际怎么组合？"
"
Panel 5:老F: "推荐方案：MIG + Priority + Quota"
""
"MIG 切块保证隔离""
"Priority 保证重要任务优先""
"Quota 控制每个团队的成本"小白: "一块 GPU 服务三个团队——省钱了！"
"老F: "但要注意——隔离不到位，数据会泄露"
Bottom caption: "MIG 切片隔离 + 优先级排队 + 配额限用——一块 GPU 多人安全共享
```


---

### 系列引导（评论区置顶）

```
📚 FDE 漫画系列 · 81 话持续更新中！
全系列 81 话，关注我看后续更新！
```
