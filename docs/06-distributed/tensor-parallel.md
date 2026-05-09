---
sidebar_position: 2
---

# 张量并行（TP）

把每个层的权重矩阵切分到多个 GPU，每层计算后需 AllReduce 同步。

**关键限制：必须在 NVLink 域内，跨 PCIe/网络会很慢。**

```
vLLM: vllm serve model --tensor-parallel-size 4
```

---

*下一节：[流水线并行](./pipeline-parallel.md)*
