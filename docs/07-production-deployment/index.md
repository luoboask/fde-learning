---
sidebar_position: 1
---

# 生产环境部署架构

> 从本地推理到线上服务，需要解决高可用、扩缩容、可观测性等一系列工程问题。

## 为什么这个模块对 FDE 至关重要

"模型跑起来了"和"服务稳定跑了 99.9% 的 SLA"之间有巨大的工程鸿沟。FDE 候选人经常能部署 vLLM，但回答不了：

- "70B INT4 模型部署到 4× A100，冷启动需要多长时间？怎么优化？"
- "GPU 出现 Xid Error 79 (Fallen Off Bus)，从检测到恢复需要几步？多久？"
- "P99 延迟突然从 200ms 飙升到 2s，怎么排查？"
- "Prefill-Decode 分离架构能带来多大收益？什么场景下值得做？"

**生产环境部署的核心不是"能跑"，而是"怎么在故障、峰值、升级时不中断地跑"。**

```mermaid
flowchart TD
    subgraph L1["生产部署全景图"]
        A["部署架构\n组件拆解 + 生命周期"] --> B["Prefill-Decode 分离\n性能优化架构"]
        B --> C["自动扩缩容\n弹性应对峰值"]
        C --> D["可观测性\n指标 + 日志 + 追踪"]
        D --> E["容灾高可用\n故障检测 + 恢复"]
        E --> F["多租户架构\n隔离 + 计费"]
    end

    subgraph L2["关键 SLA 指标"]
        S1["TTFT P99 < 800ms\n首 token 延迟"]
        S2["TPOT P99 < 100ms\n每 token 延迟"]
        S3["可用性 99.9%\n全年宕机 < 8.76 小时"]
        S4["GPU 利用率 70-95%\n太低浪费太高 OOM"]
    end

    A -. "模型加载 60s\n滚动更新零中断" .-> S1
    B -. "P/D 分离 2.4x 吞吐\nTTFT/TPOT 降低 40%" .-> S2
    C -. "冷启动 80s\nWarm Pool 2s 响应" .-> S4
    D -. "Xid Error 实时告警\nGPU 故障自动隔离" .-> S3
    E -. "多 AZ < 30s 切换\n四级降级策略" .-> S3
    F -. "MIG 分区\nGPU 共享隔离" .-> S4

    style A fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style B fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style C fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style D fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style E fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style F fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
```

## 生产环境部署架构全景

```mermaid
flowchart TB
    subgraph Client["客户端"]
        C1["Web / App / API Consumer"]
    end

    subgraph Edge["边缘层"]
        E1["CDN / WAF\n静态资源 + 安全"]
        E2["API Gateway\nKong / APISIX\n限流 / 鉴权 / 路由"]
    end

    subgraph LB["负载均衡"]
        L1["Nginx / HAProxy / ALB\nleast_conn 策略"]
    end

    subgraph Services["服务层"]
        S1["vLLM Pod × N\n推理服务"]
        S2["Embedding Pod\n向量服务"]
        S3["Router Pod\n模型版本路由"]
    end

    subgraph Storage["存储层"]
        M1["S3 / MinIO\n模型权重 (40GB+)"]
        M2["MLflow\n模型版本管理"]
    end

    subgraph Monitor["可观测性"]
        O1["Prometheus\n指标采集"]
        O2["Grafana\n可视化仪表盘"]
        O3["Loki\n日志聚合"]
        O4["Jaeger\n分布式追踪"]
    end

    subgraph Infra["基础设施"]
        I1["Kubernetes\nPod 调度"]
        I2["NVIDIA Device Plugin\nGPU 资源管理"]
        I3["DCGM Exporter\nGPU 硬件指标"]
    end

    Client --> C1
    C1 --> E1
    E1 --> E2
    E2 --> L1
    L1 --> S1
    L1 --> S2
    L1 --> S3
    S1 --> M1
    S2 --> M1
    M1 --> M2
    S1 --> O1
    S2 --> O1
    O1 --> O2
    O1 --> O3
    O1 --> O4
    I1 --> I2
    I2 --> S1
    I3 --> O1

    style Client fill:#f8f9fa,stroke:#666
    style Edge fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style LB fill:#e8f5e9,stroke:#388e3c
    style Services fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style Storage fill:#e3f2fd,stroke:#1976d2
    style Monitor fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style Infra fill:#e1f5fe,stroke:#0288d1
```

## 模型生命周期管理

```mermaid
flowchart LR
    subgraph Pipeline["模型部署流水线"]
        S1["HuggingFace\n下载原始模型"]
        S2["量化处理\nAWQ/GPTQ/FP8"]
        S3["精度验证\nMMLU/GSM8K 测试"]
        S4["上传 S3\n带版本号"]
        S5["CI/CD\n滚动更新"]
        S6["Pod 加载模型\n预热 + 就绪探针"]
        S7["流量切换\n灰度发布"]
    end

    S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7

    subgraph Timing["70B AWQ INT4 @ 4×A100 加载耗时"]
        T1["下载: ~30s"]
        T2["加载到 VRAM: ~20s"]
        T3["KV Cache 分配: ~5s"]
        T4["模型预热: ~3s"]
        T5["总: ~60s"]
    end

    S6 -. "总计 ~60s" .-> Timing

    style Pipeline fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style Timing fill:#fff3e0,stroke:#f57c00
```

**冷启动 80 秒是自动扩缩容的最大瓶颈。** 70B INT4 在 4× A100 上的完整冷启动：10s 镜像拉取 + 15s 初始化 + 5s 主容器启动 + 25s 权重加载 + 15s VRAM 加载 + 5s KV Cache 分配 + 3s 预热 + 2s 就绪探针。

## Prefill-Decode 分离架构

```mermaid
flowchart LR
    subgraph Request["用户请求"]
        R1["长 Prompt\n高并发"]
    end

    subgraph Router["请求路由器"]
        RT["根据请求特征\n路由到 P 或 D 集群"]
    end

    subgraph Prefill["Prefill 集群\nCompute-Optimized"]
        P1["GPU: 高算力\n利用率 80-95%"]
        P2["任务: 矩阵乘法\ncompute-bound"]
        P3["输出: KV Cache"]
    end

    subgraph Transfer["KV Cache 传输"]
        T1["高速网络 / 共享内存\nDistServe / MoonCake"]
    end

    subgraph Decode["Decode 集群\nMemory-Optimized"]
        D1["GPU: 大显存\n利用率 10-30%"]
        D2["任务: KV Cache 访问\nmemory-bound"]
        D3["输出: 生成 Token"]
    end

    Request --> R1
    R1 --> RT
    RT --> P1
    P1 --> P2 --> P3
    P3 --> T1
    T1 --> D1
    D1 --> D2 --> D3

    style Prefill fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style Decode fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    style Transfer fill:#fff3e0,stroke:#f57c00
```

### P/D 分离效果（Llama-3-70B @ A100×8）

| 指标 | 混合部署 | 分离部署 | 提升 |
|------|---------|---------|------|
| 最大 QPS | ~5 | ~12 | **2.4x** |
| TTFT | 基准 | -40% | 降低 40% |
| TPOT | 基准 | -40% | 降低 40% |

### P/D 分离方案对比

| 方案 | 架构 | 部署复杂度 | 吞吐提升 | 网络要求 |
|------|------|-----------|---------|---------|
| DistServe | 独立 P/D 节点 | 高 (RDMA) | 2x+ | RDMA |
| MoonCake | KV Cache 池化 | 中 (KVStore) | 1.5-2x | 高速网络 |
| ChunkFuse | 实例内调度 | 低 (vLLM 配置) | 1.3-1.5x | 无 |

## 可观测性三层体系

```mermaid
flowchart TD
    subgraph Metrics["Metrics 指标\n系统健康吗?"]
        M1["Prometheus 采集"]
        M2["GPU 利用率 / 显存 / 温度"]
        M3["TTFT / TPOT / Token 吞吐"]
        M4["KV Cache 使用率"]
    end

    subgraph Traces["Traces 追踪\n哪里慢?"]
        T1["OpenTelemetry + Jaeger"]
        T2["Span 树: Gateway → vLLM → GPU"]
        T3["慢请求根因分析"]
    end

    subgraph Logs["Logs 日志\n发生了什么?"]
        L1["FluentBit + Loki"]
        L2["结构化日志\nGPU Xid Error"]
        L3["Pod 日志\nOOM Killed"]
    end

    subgraph Alerts["告警规则"]
        A1["TTFT P99 > 0.8s"]
        A2["GPU 显存 > 95%"]
        A3["GPU 温度 > 85°C"]
        A4["Xid Error != 0"]
        A5["请求队列 > 50"]
    end

    Metrics -->|"触发"| Alerts
    Traces -->|"关联"| Metrics
    Logs -->|"补充"| Traces

    style Metrics fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style Traces fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style Logs fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style Alerts fill:#fce4ec,stroke:#c2185b,stroke-width:2px
```

## GPU 故障自动恢复流程

```mermaid
sequenceDiagram
    participant D as DCGM Exporter
    participant P as Prometheus
    participant A as AlertManager
    participant K as Kubernetes
    participant G as GPU Node
    participant N as New Pod

    Note over D,G: GPU 发生 Xid Error 79
    D->>P: 采集到 Xid Error (每 15s)
    P->>A: 告警规则触发
    A->>K: Webhook: cordon + drain
    K->>G: 隔离故障 GPU
    K->>N: 调度到健康节点
    N->>N: 加载模型 (~60s)
    N->>K: 就绪探针通过
    K->>A: 服务恢复

    Note over D,N: 总恢复时间: 0-180s
```

### 四级降级策略

| 级别 | 策略 | 效果 | 适用场景 |
|------|------|------|---------|
| Level 1 | 减小 batch size (256→64) | 降低延迟，减少吞吐 | 轻度过载 |
| Level 2 | 切换小模型 (70B→7B) | 大幅降低计算量 | 中度过载 |
| Level 3 | 限流 + 排队 | 核心用户白名单 | 严重过载 |
| Level 4 | 规则引擎兜底 | FAQ 匹配，不依赖 GPU | 完全不可用 |

## 学习路径

| 顺序 | 文档 | 核心内容 | 面试考点 |
|------|------|---------|---------|
| 1 | [部署架构概述](./deployment-architecture.md) | 生产环境架构设计、组件拆解 | 如何设计高可用 LLM 服务 |
| 2 | [Prefill-Decode 分离](./prefill-decode-separation.md) | 分离架构的原理和实现 | 为什么 P/D 分离能提升吞吐 |
| 3 | [自动扩缩容](./autoscaling.md) | K8s HPA、基于 QPS/延迟的扩缩容 | 如何设置自动扩容阈值 |
| 4 | [可观测性](./observability.md) | 指标监控、日志、分布式追踪 | 如何监控 LLM 服务健康状态 |
| 5 | [容灾与高可用](./disaster-recovery.md) | 故障恢复、降级策略 | 服务挂了如何快速恢复 |
| 6 | [多租户架构](./multi-tenant.md) | 资源共享、QoS、优先级 | 如何隔离不同用户的资源 |

## 模块知识结构图

```mermaid
mindmap
  root(("生产部署"))
    部署架构
      API Gateway
      Load Balancer
      vLLM Pods
      Model Registry S3
      K8s 调度
    P/D 分离
      DistServe
      MoonCake
      ChunkFuse
    自动扩缩容
      KEDA
      Warm Pool
      冷启动 80s
      优雅关闭
    可观测性
      Metrics Prometheus
      Traces Jaeger
      Logs Loki
      GPU DCGM
      告警规则
    容灾高可用
      Xid Error 检测
      自动隔离
      多 AZ 部署
      四级降级
      模型回滚
    多租户
      MIG 分区
      Time-Slicing
      Priority Class
      计量计费
```

## 前置知识

建议先完成 [用 LLM 构建应用](/06-ai-engineering/) 了解应用层架构。

---

*上一节：[用 LLM 构建应用](/06-ai-engineering/)*
*下一节：[部署架构概述](./deployment-architecture.md)*
