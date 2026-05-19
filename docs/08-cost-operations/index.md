---
sidebar_position: 1
---

# 成本与运营

> 推理成本是 LLM 商业化的核心瓶颈。理解成本构成、优化策略和容量规划，才能在保证服务质量的同时控制成本。

## 为什么这个模块对 FDE 至关重要

FDE 不是纯粹的工程师，而是**技术决策者**。你需要回答 CEO/CFO 的问题：

- "70B 模型的每 1K token 成本是多少？怎么降到原来的 1/10？"
- "月调用量 5 亿 token，应该自建集群还是用云 API？多久回本？"
- "GPU 利用率只有 30%，是浪费了还是正常的？"
- "未来半年 QPS 预计翻倍，需要采购多少 GPU？"

**推理优化的最终目标不是"跑得快"，而是"在 SLA 约束下跑得最便宜"。**

```mermaid
flowchart TD
    subgraph L1["成本与运营全景"]
        A["成本拆解\nGPU 60-80%\n电费 5-10%\n网络 5-10%\n运维 10-20%"] --> B["优化策略\n五层优化框架\n80-95% 总降幅"]
        B --> C["容量规划\nQPS 估算\nGPU 数量计算\n缓冲分配"]
        C --> D["自建 vs 云端\nTCO 对比\n混合架构"]
    end

    subgraph L2["优化优先级"]
        P1["1. 选对模型尺寸\n30-50% 降幅"]
        P2["2. Continuous Batching\n50-70% 降幅"]
        P3["3. 量化 INT8/FP8\n30-50% 降幅"]
        P4["4. 语义缓存\n5-40% 降幅"]
        P5["5. 自动扩缩 + Spot\n30-50% 降幅"]
    end

    A -. "GPU 占比最高\n所以优化聚焦 GPU" .-> B
    B -. "优化后\nGPU 数量减少" .-> C
    C -. "GPU 数量×单价\n驱动 TCO 决策" .-> D
    P1 --> P2 --> P3 --> P4 --> P5

    style A fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style B fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style C fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style D fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style P1 fill:#c8e6c9
    style P2 fill:#c8e6c9
    style P3 fill:#c8e6c9
    style P4 fill:#fff9c4
    style P5 fill:#fff9c4
```

## 成本拆解全景

```mermaid
flowchart TB
    subgraph CostComponents["推理成本构成"]
        GPU["GPU 硬件/租赁\n60-80%\nA100-80G: $15K-25K/台\nH100-80G: $35K-50K/台"]
        PWR["电力\n5-10%\n单台 8 卡: ~6KW\n月电费 ~$500"]
        NET["网络\n5-10%\n带宽 + IP + CDN"]
        OPS["运维人力\n10-20%\nMLOps + SRE"]
        STO["存储\n3-5%\n模型权重 + 日志"]
    end

    subgraph TokenCost["每 1K token 成本示例"]
        T1["H100 70B FP16\n150 tok/s → $0.023/1K"]
        T2["+ Continuous Batching\n750 tok/s → $0.0046/1K"]
        T3["+ INT8 量化\n1.5x 吞吐 → $0.0031/1K"]
    end

    GPU --> T1
    PWR --> T1
    NET --> T1
    OPS --> T1
    STO --> T1

    T1 -. "5x 吞吐提升"| T2
    T2 -. "1.5x 吞吐提升"| T3

    style CostComponents fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style TokenCost fill:#fff3e0,stroke:#f57c00,stroke-width:2px
```

## 五层优化框架

```mermaid
flowchart TD
    subgraph Layer1["Layer 1: 模型层"]
        L1A["量化: FP16 → INT8 省 50%\nINT4 省 75%"]
        L1B["蒸馏: 175B → 70B → 7B"]
        L1C["混合精度: 敏感层保持 FP16"]
    end

    subgraph Layer2["Layer 2: 推理引擎层"]
        L2A["Continuous Batching: 2-5x 吞吐"]
        L2B["投机解码: 2-3x decode 加速"]
        L2C["最优 batch size: 7B→32-64, 70B→4-8"]
    end

    subgraph Layer3["Layer 3: 基础设施层"]
        L3A["按时段扩缩容\n白天峰值夜间低谷"]
        L3B["预留 + 按需 + Spot 混合\n节省 40-56%"]
    end

    subgraph Layer4["Layer 4: 模型选择层"]
        L4A["80% 场景 7B-13B 足够\n成本 10-20%"]
        L4B["路由模式: 70% 7B + 30% 70B\n省 53%"]
    end

    subgraph Layer5["Layer 5: 缓存层"]
        L5A["语义缓存: 命中率 30-60%\nGPU 成本 = 0"]
        L5B["Prompt 前缀缓存\nPrefill 从 100ms → <5ms"]
    end

    L1A --> L2A
    L2A --> L3A
    L3A --> L4A
    L4A --> L5A

    style Layer1 fill:#e8f5e9,stroke:#388e3c
    style Layer2 fill:#e8f5e9,stroke:#388e3c
    style Layer3 fill:#fff3e0,stroke:#f57c00
    style Layer4 fill:#e3f2fd,stroke:#1976d2
    style Layer5 fill:#fce4ec,stroke:#c2185b
```

### 优化效果累计

| 优化步骤 | 累计降幅 | 剩余成本 |
|---------|---------|---------|
| 基线 (FP16, 静态 batch) | 0% | 100% |
| 选对模型 (70B→13B for 80% requests) | 30-50% | 50-70% |
| + Continuous Batching | 50-70% | 15-35% |
| + INT8 量化 | 30-50% | 8-25% |
| + 语义缓存 | 5-40% | 5-20% |
| + 自动扩缩 + Spot | 30-50% | **5-20%** |

**综合优化效果：总成本可降低 80-95%。**

## 自建 vs 云端决策框架

```mermaid
flowchart TD
    subgraph Schemes["三种部署方案"]
        S1["Serverless API\nOpenAI / Anthropic / Gemini\n零启动, 零运维\n最高 per-token 成本"]
        S2["云 GPU IaaS\nAWS p5 / GCP A2\n中运维, 好弹性\n中等成本"]
        S3["自建 GPU 集群\n采购 + 托管\n高运维, 低延迟\n最低长期成本"]
    end

    subgraph Decision["决策树"]
        Q1{"月 token 量?"}
        A1["< 100 万\n→ Serverless API"]
        A2["100 万 - 1 亿\n→ 混合方案"]
        A3["> 1 亿\n→ 自建集群"]
    end

    subgraph TCO["3 年 TCO 对比\n70B 模型, 5 亿 token/月"]
        T1["Serverless: $90M (100%)"]
        T2["云 GPU 按需: $20M (20%)"]
        T3["云 GPU 70% Spot: $7.4M (7%)"]
        T4["自建 A100: $4.4M (5%)"]
        T5["自建 H100: $4.8M (7%)"]
        T6["混合方案: $5.6M (6%)"]
    end

    Q1 --> A1
    Q1 --> A2
    Q1 --> A3
    S1 -. "成本对比"| TCO
    S2 -. "成本对比"| TCO
    S3 -. "成本对比"| TCO

    style Schemes fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style Decision fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style TCO fill:#fce4ec,stroke:#c2185b,stroke-width:2px
```

### 混合架构（推荐）

```mermaid
flowchart LR
    subgraph Hybrid["70/20/10 混合架构"]
        R["流量路由器\n监控队列深度 + P99 延迟"]
        B1["70% 自建\n基础负载\n最低成本"]
        B2["20% 云 GPU Spot\n峰值弹性\n按需付费"]
        B3["10% Serverless\n降级兜底\n永不宕机"]
    end

    R --> B1
    R --> B2
    R --> B3

    style Hybrid fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style B1 fill:#c8e6c9
    style B2 fill:#fff9c4
    style B3 fill:#ffccbc
```

### 迁移路径

```mermaid
gantt
    title 从 Serverless 到自建的迁移路径
    dateFormat YYYY-MM
    axisFormat %Y年%m月

    section 阶段一
    纯 Serverless API           :2026-01, 3M

    section 阶段二
    Serverless + 云 GPU 弹性     :2026-04, 3M

    section 阶段三
    自建 + 云弹性混合            :2026-07, 6M

    section 阶段四
    自建为主 + Serverless 兜底   :2027-01, 6M
```

## 容量规划三步法

```mermaid
flowchart LR
    subgraph Step1["Step 1: QPS 估算"]
        Q1["历史数据分析\n均值 250 QPS\n峰值 P99 600 QPS (2.4x)"]
    end

    subgraph Step2["Step 2: 吞吐建模"]
        Q2["单卡吞吐 × 利用系数\n7B batch=16: 3,500 tok/s\n70B batch=16: 350 tok/s"]
    end

    subgraph Step3["Step 3: GPU 数量"]
        Q3["GPU 数 = ⌈峰值QPS × 平均输出 × 延迟 / 单卡吞吐⌉\n7B: 23 GPU\n70B: 220 GPU"]
    end

    subgraph Buffer["缓冲区"]
        Q4["正常缓冲: +30%\n峰值缓冲: +50-100%\nGPU 组合: 60% 预留 + 25% 按需 + 15% Spot"]
    end

    Q1 --> Q2 --> Q3 --> Q4

    style Step1 fill:#e8f5e9,stroke:#388e3c
    style Step2 fill:#e8f5e9,stroke:#388e3c
    style Step3 fill:#fff3e0,stroke:#f57c00
    style Buffer fill:#fce4ec,stroke:#c2185b
```

### 不同 SLA 对 GPU 数量的影响

| SLA 要求 | GPU 超额配置 | Batch Size | GPU 利用率 | 冗余 | GPU 数量差异 |
|---------|------------|-----------|-----------|------|-------------|
| 严格 (P99 < 500ms) | 2.0x | 4-8 | 40-50% | N+2 | 基准 |
| 宽松 (P99 < 2s) | 1.3-1.5x | 16-32 | 70-85% | N+1 | **省 40-50%** |

## 学习路径

| 顺序 | 文档 | 核心内容 | 面试考点 |
|------|------|---------|---------|
| 1 | [成本拆解](./cost-breakdown.md) | GPU 成本、推理成本构成、单位 token 成本 | 如何估算 70B 模型的推理成本 |
| 2 | [优化策略](./optimization-strategies.md) | 量化、批处理、模型选择 | 降本增效的最佳实践 |
| 3 | [容量规划](./capacity-planning.md) | 预测未来资源需求 | 如何规划 GPU 采购计划 |
| 4 | [自建 vs 云端](./self-hosted-vs-cloud.md) | 自建集群 vs 云服务商对比 | 什么时候选自建、什么时候选云端 |

## 模块知识结构图

```mermaid
mindmap
  root(("成本与运营"))
    成本拆解
      GPU 60-80%
      电费 5-10%
      网络 5-10%
      运维 10-20%
      per-token 成本公式
    优化策略
      模型层 量化/蒸馏
      引擎层 Continuous Batching
      基础设施 弹性+Spot
      模型选择 路由模式
      缓存层 语义缓存
    容量规划
      QPS 估算
      吞吐建模
      GPU 数量计算
      缓冲分配
      SLA 驱动
    自建 vs 云端
      Serverless API
      云 GPU IaaS
      自建集群
      混合架构 70/20/10
      迁移路径
```

## 前置知识

建议先完成 [动手实验](/09-labs/) 积累实际操作经验。

---

*上一节：[动手实验](/09-labs/)*
*下一节：[成本拆解](./cost-breakdown.md)*
