---
sidebar_position: 1
---

# 部署架构设计

## 典型架构

```
Client → API Gateway → Load Balancer → vLLM Pod → GPU
```

## K8s 部署要点

- GPU 资源申请：`nvidia.com/gpu: 1`
- 就绪探针：模型加载需要时间（30s-3min）
- 存活探针：定期健康检查

## 多 GPU 配置

```yaml
resources:
  limits:
    nvidia.com/gpu: 4
    memory: "128Gi"
```

---

*下一节：[弹性扩缩容](./autoscaling.md)*
