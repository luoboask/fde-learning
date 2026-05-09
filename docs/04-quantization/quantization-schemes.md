---
sidebar_position: 2
---

# 量化方案详解

## AWQ（Activation-aware Weight Quantization）

保护大激活值对应的权重，其他权重量化。精度高，速度快。

## GPTQ

逐层量化，考虑层间误差累积。压缩率最高（INT4），但量化过程慢。

## SmoothQuant

在激活值和权重之间做平滑变换，同时量化两者。推理时不需要反量化。

## FP8

H100 原生支持，硬件直接加速。精度接近 FP16，速度提升 1.5-2x。

---

*下一节：[KV Cache 量化](./kv-cache-quant.md)*
