---
sidebar_position: 3
---

# 流水线并行（PP）

把模型的不同层分到不同 GPU。GPU0 跑 Layer 1-16，GPU1 跑 Layer 17-32。

```
vLLM: vllm serve model --pipeline-parallel-size 2
```

可以跨 PCIe，但不能跨网络。

---

*下一节：[MoE 并行](./moe-parallel.md)*
