---
sidebar_position: 4
---

# 容灾与降级

> LLM 推理服务的容灾不只是"备用服务器"，还涉及 GPU 硬件故障、模型权重损坏、显存泄漏等特有风险，需要分层次的防御体系。

## 核心概念（含架构图）

### 故障场景全景分析

```mermaid
graph TD
    A["故障类型"] --> B["硬件层"]
    A --> C["软件层"]
    A --> D["数据层"]
    A --> E["外部依赖"]

    B --> B1["GPU Xid Error\nECC 错误 / 过热降频"]
    B --> B2["NVLink 故障\n多卡通信中断"]
    B --> B3["节点宕机\n电源 / 网络故障"]

    C --> C1["Pod OOM Killed\n显存不足"]
    C --> C2["GPU 显存泄漏\n长期运行积累"]
    C --> C3["vLLM 进程死锁\n推理卡死"]

    D --> D1["模型权重损坏\nS3 数据不一致"]
    D --> D2["KV Cache 污染\n异常输入导致"]

    E --> E1["HuggingFace 下载中断"]
    E --> E2["S3/MinIO 不可用"]
    E --> E3["DNS / 网络分区"]

```

## 部署视角

### GPU 故障处理（Xid Error 检测与自动隔离）

#### Xid Error 类型

| Xid | 含义 | 严重性 | 处理方式 |
|-----|------|--------|----------|
| 13 | Graphics Engine Exception | 中 | 重启 CUDA 上下文 |
| 31 | GPU Memory Page Fault | 高 | 重启进程 |
| 43 | GPU Stopped Processing | 高 | Pod 重建 |
| 63 | ECC Page Uncorrectable Error | 极高 | 隔离 GPU，换卡 |
| 79 | GPU Has Fallen Off Bus | 极高 | 节点隔离，报修 |

#### 自动检测与隔离流程

```mermaid
graph TD
    A["DCGM 持续监控\nXid Error 指标"] --> B{检测到 Xid Error?}
    B -->|否| A
    B -->|是| C["记录日志 + 触发告警"]
    C --> D{错误严重?}
    D -->|低/中| E["记录 + 观察\n不隔离"]
    D -->|高/极高| F["立即隔离 GPU"]

    F --> G["kubectl cordon 故障节点"]
    G --> H["排空该节点上的 Pod"]
    H --> I["Pod 调度到其他健康 GPU 节点"]
    I --> J["验证新 Pod 正常服务"]
    J --> K["通知运维团队\n安排硬件检修"]
```

```python
# 自动化脚本：Xid Error 检测 + 节点隔离
import subprocess
import json

def check_gpu_health():
    """通过 DCGM 检查 GPU 健康状态"""
    result = subprocess.run(
        ['dcgmi', 'diag', '-r', '1', '-j'],
        capture_output=True, text=True
    )
    diagnostics = json.loads(result.stdout)

    for gpu_id, diag in diagnostics.items():
        if diag.get('error_count', 0) > 0:
            xid_errors = diag.get('xid_errors', [])
            for err in xid_errors:
                if err['xid'] in [13, 31, 43, 63, 79]:
                    isolate_gpu(gpu_id, err['xid'])

def isolate_gpu(gpu_id, xid):
    """隔离故障 GPU 所在节点"""
    node = get_node_for_gpu(gpu_id)
    # 1. 标记节点不可调度
    subprocess.run(['kubectl', 'cordon', node])
    # 2. 排空 Pod
    subprocess.run(['kubectl', 'drain', node,
                    '--ignore-daemonsets',
                    '--delete-emptydir-data',
                    '--grace-period=120'])
    # 3. 发送告警
    send_alert(f"GPU {gpu_id} on {node} Xid={xid}, node cordoned")
```

#### Kubernetes 侧实现（Node Problem Detector + 自动恢复）

```yaml
# Node Problem Detector：自动将不健康的 GPU 节点标记为 NotReady
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-problem-detector
  namespace: kube-system
spec:
  template:
    spec:
      containers:
      - name: node-problem-detector
        image: registry.k8s.io/node-problem-detector/node-problem-detector:v0.8.14
        env:
        - name: CUSTOM_PLUGINS
          value: |
            # 自定义 GPU 健康检查插件
            # 当检测到 Xid Error 时，向 K8s 报告 Condition
---
# 自动恢复：GPU 故障后 Pod 自动调度到健康节点
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      # 容忍短暂的 NotReady 状态，给节点恢复时间
      tolerations:
      - key: "node.kubernetes.io/not-ready"
        operator: "Exists"
        effect: "NoExecute"
        timeoutSeconds: 60  # 60 秒后 K8s 自动迁移 Pod
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values: ["vllm"]
            topologyKey: "kubernetes.io/hostname"
```

### 容灾策略：多 AZ 部署

```mermaid
graph TD
    subgraph "Region: us-east-1"
        subgraph "AZ-a"
            A1["GPU 节点 × 4\nA100 80GB"]
            S1["S3 模型存储\n跨区域复制"]
        end
        subgraph "AZ-b"
            B1["GPU 节点 × 4\nA100 80GB"]
            S2["S3 副本"]
        end
    end

    LB["Global Load Balancer\n健康检查 + 故障转移"]
    LB --> A1
    LB --> B1

    A1 -.-> S1
    B1 -.-> S2
    S1 -.->|"复制"| S2
```

**多 AZ 部署要点**：

| 维度 | 配置 | 说明 |
|------|------|------|
| 流量分配 | 80/20 或 50/50 | 取决于成本和延迟要求 |
| 故障切换 | < 30 秒 | DNS TTL + 健康检查 |
| 模型同步 | S3 Cross-Region Replication | 保证模型权重一致 |
| 数据一致性 | 只读模型 + 主区域更新 | 避免脑裂 |

```yaml
# Pod 拓扑分布约束：确保跨 AZ 均匀分布
topologySpreadConstraints:
- maxSkew: 1
  topologyKey: topology.kubernetes.io/zone
  whenUnsatisfiable: DoNotSchedule
  labelSelector:
    matchLabels:
      app: vllm
```

### 降级策略详解

```mermaid
graph TD
    A["正常服务\n70B 全量模型"] --> B{检测到异常?}

    B -->|"延迟升高"| C["第 1 级降级\n降低 batch size"]
    C --> D["延迟恢复正常?"]
    D -->|是| E["恢复"]
    D -->|否| F["第 2 级降级\n切换小模型 7B"]

    B -->|"GPU 故障"| F

    F --> G["小模型服务正常?"]
    G -->|是| H["通知用户模型降级"]
    G -->|否| I["第 3 级降级\n限流 + 排队"]

    I --> J["核心用户白名单\n优先保障"]
    J --> K["非核心用户返回排队提示"]

    B -->|"完全不可用"| L["第 4 级降级\n规则引擎兜底\nFAQ 匹配"]
```

**各级降级详细说明**：

#### 第 1 级：降低 Batch Size

```yaml
# 通过 ConfigMap 热更新 vLLM 配置
# max-num-seqs: 256 → 64
# 效果：单请求延迟降低，总吞吐下降
# 适用：延迟升高但 GPU 仍有能力
```

#### 第 2 级：切换小模型

```mermaid
graph LR
    A["API Gateway"] --> B{路由规则}
    B -->|正常| C["vLLM 70B\n主服务"]
    B -->|降级| D["vLLM 7B\n备用服务"]
    B -->|不可用| E["规则引擎\nFAQ 匹配"]

    D -.-> F["响应中标注\n'服务降级模式'"]
```

```yaml
# API Gateway 降级路由
# 正常路由
- match: { prefix: "/v1/chat/completions" }
  route: { cluster: vllm-70b }
# 降级路由（通过 feature flag 切换）
# - match: { prefix: "/v1/chat/completions" }
#   route: { cluster: vllm-7b }
```

#### 第 3 级：限流 + 排队

```python
# Token Bucket 限流（API Gateway 层）
# 核心用户：100 req/min
# 普通用户：10 req/min
# 降级期间：核心用户 50 req/min, 普通用户 2 req/min

# 排队响应
{
  "status": "queued",
  "position": 15,
  "estimated_wait_seconds": 45,
  "task_id": "task-xyz789",
  "poll_url": "/v1/tasks/task-xyz789/status"
}
```

### 数据恢复与模型回滚

#### 模型权重备份策略

```mermaid
graph TD
    A["生产模型权重\nS3 us-east-1"] -->|"跨区域复制"| B["备份 S3 us-west-2"]
    A -->|"版本控制"| C["S3 历史版本"]
    C --> D["v1.0: Qwen2.5-70B-AWQ"]
    C --> E["v1.1: Qwen2.5-70B-AWQ (更新)"]
    C --> F["v1.2: 回滚目标"]

    G["MinIO 本地备份\n每日快照"] --> H["7 天保留"]
```

**关键措施**：

| 措施 | 频率 | RPO | 说明 |
|------|------|-----|------|
| S3 版本控制 | 实时 | 0 | 每次上传自动生成新版本 |
| 跨区域复制 | 实时 | < 1 分钟 | 防单区域故障 |
| 本地快照 | 每日 | 24 小时 | MinIO snapshot |
| 离线备份 | 每周 | 7 天 | 冷存储（Glacier） |

#### 模型回滚流程

```yaml
# 回滚命令（K8s 原生支持）
kubectl rollout undo deployment/vllm-llm --to-revision=2
# 回滚到第 2 个版本（即上一版本）

# 回滚验证
# 1. 检查新 Pod 状态: kubectl get pods -l app=vllm
# 2. 验证健康: curl http://vllm-service/health
# 3. 冒烟测试: 发几个标准 prompt 验证输出
# 4. 监控 SLO: 确认延迟恢复正常
```

## 面试视角

### 面试题：GPU 故障导致 Pod 崩溃，如何自动恢复？

**标准答案**：

```mermaid
sequenceDiagram
    participant D as DCGM Exporter
    participant P as Prometheus
    participant A as AlertManager
    participant K as Kubernetes
    participant Pod as vLLM Pod
    participant GPU as GPU 节点

    Note over Pod,GPU: 正常运行中
    GPU->>D: 产生 Xid Error 63
    D->>P: 指标 DCGM_FI_DEV_XID_ERRORS=63
    P->>A: 告警规则触发 (GPUXidError)
    A->>K: Webhook → cordon 节点
    K->>Pod: Pod 被驱逐 (NotReady)
    K->>K: Deployment 检测到 replicas < 期望值
    K->>K: 在健康 GPU 节点上创建新 Pod
    Note over Pod: 新 Pod 加载模型 (~60s)
    Pod->>Pod: Readiness Probe 通过
    Note over Pod: 服务恢复
```

**完整自动恢复链**：

1. **检测（0-15 秒）**：DCGM Exporter 每 15 秒 scrape 一次 Xid Error 指标
2. **告警（15-30 秒）**：Prometheus 告警规则 `increase(DCGM_FI_DEV_XID_ERRORS[5m]) > 0` 触发
3. **隔离（30-60 秒）**：AlertManager Webhook 调用脚本执行 `kubectl cordon + drain`
4. **迁移（60-120 秒）**：K8s Deployment 自动在健康节点重建 Pod
5. **恢复（120-180 秒）**：新 Pod 加载模型完成，通过 Readiness Probe

**如果只有有限 GPU 资源无法调度怎么办？**

1. **优先保障**：通过 PriorityClass，核心业务优先调度
2. **降级运行**：自动切换到小模型部署（7B 只需 1 张 A100，70B 需要 4 张）
3. **排队等待**：请求进入队列，待资源释放后自动处理
4. **弹性扩容**：触发 Cluster Autoscaler 申请新 GPU 实例（云厂商，5-15 分钟）

### 常见追问

**Q: GPU 显存泄漏如何检测和处理？**

A：
- **检测**：监控 `DCGM_FI_DEV_FB_USED` 的趋势，正常情况下 Pod 重启后显存应该完全释放。如果发现显存使用量随时间线性增长（Pod 不重启也不释放），说明存在泄漏
- **处理**：设置定期 Pod 滚动重启（`maxSurge: 1` 保证不停机）；在 vLLM 层面检查是否有未释放的 CUDA 上下文
- **预防**：使用 `nvidia-smi` 定期检查进程 - 显存映射，确保每个进程退出后显存完全释放

**Q: 多 AZ 部署时模型权重如何保证一致性？**

A：
1. S3 跨区域复制（CRR）保证模型文件的最终一致性
2. 每次部署前校验模型 hash（SHA256）
3. Pod 启动时从本地缓存加载，不实时依赖 S3
4. 更新时滚动发布：先更新 AZ-a 验证通过，再更新 AZ-b

**Q: 如何避免降级期间的"降级雪崩"（小模型也被压垮）？**

A：
1. 小模型部署保持独立的资源池（不被 70B 挤占）
2. 降级时同步收紧限流策略（70B 的限流 > 7B 的限流）
3. 监控小模型的 GPU 利用率，如果也在升高，触发第 3 级降级
4. 保留最低限度的规则引擎兜底（完全不依赖 GPU）

---

*下一节：[多租户与平台化](./multi-tenant.md)*
