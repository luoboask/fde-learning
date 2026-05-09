---
sidebar_position: 3
---

# 可观测性体系

## 三层监控

| 层级 | 内容 | 工具 |
|------|------|------|
| Metrics | GPU 利用率、延迟、吞吐 | Prometheus + Grafana |
| Tracing | 请求全链路 | Jaeger / SkyWalking |
| Logging | 详细日志 | ELK / Loki |

## 关键 SLO

| 指标 | 建议值 |
|------|--------|
| P99 TTFT | < 400ms |
| P99 总延迟 | < 3s |
| 可用性 | > 99.9% |
| GPU 利用率 | > 70% |

---

*下一节：[容灾与降级](./disaster-recovery.md)*
