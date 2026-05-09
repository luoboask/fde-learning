---
sidebar_position: 4
---

# FFN、Normalization 与位置编码

## FFN（Feed-Forward Network）

- 占模型参数 ~2/3
- 现代模型用 **SwiGLU**，比传统 FFN 质量更好
- Prefill 阶段的主要计算量来源

## Normalization

- **RMSNorm**（Llama、Qwen）— 比 LayerNorm 计算量更小
- 放在 Attention/FFN 之前（pre-norm）

## 位置编码：RoPE

- 通过旋转矩阵注入位置信息
- 支持外推（训练 4K → 推理 32K+）
- RoPE Scaling：NTK-aware、YaRN

---

*下一节：[MoE 架构](./moe-architecture.md)*
