---
sidebar_position: 2
---

# Speculative Decoding

用小模型或特征层预测接下来几个 token，大模型验证。预测正确就跳过大模型的 decode 步骤。

适合场景：短回复（< 200 tokens），加速 1.5-3x。

---

*下一节：[FP8 推理](./fp8-inference.md)*
