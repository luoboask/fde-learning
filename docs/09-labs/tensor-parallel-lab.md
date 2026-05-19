---
sidebar_position: 3
---

# 实验：多卡 TP 部署

## 目标

在 4 张 GPU 上用 Tensor Parallel 部署 70B 模型。

## 环境

- 4 × A100-80G，NVLink 互联

## 步骤

### 1. 计算显存需求

```
70B FP16 模型：
  权重：70 × 2 = 140 GB
  TP=4 时，每张卡存 35 GB
  KV Cache（batch=32, seq=4096）：每张卡 ~8 GB
  每张卡总计：~43 GB ← 远低于 80 GB，可行

如果 TP=2：
  每卡权重 70 GB + KV Cache ~16 GB = ~86 GB
  → OOM，不行
```

### 2. 启动

```bash
vllm serve Qwen/Qwen2.5-72B-Instruct \
  --tensor-parallel-size 4 \
  --quantization fp8 \
  --gpu-memory-utilization 0.90 \
  --max-model-len 8192
```

### 3. 验证

```bash
# 查看 4 张 GPU 的显存使用
nvidia-smi
# 应该 4 张卡的显存占用基本相同

# 测试推理
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "Qwen/Qwen2.5-72B-Instruct", "messages": [{"role": "user", "content": "你好"}], "max_tokens": 100}'
```

### 4. 性能对比

| 配置 | 吞吐 (tok/s) | P99 延迟 (ms) | GPU 数量 |
|------|-------------|---------------|----------|
| TP=2（不可能，OOM） | - | - | 2 |
| TP=4 | 基准 | 基准 | 4 |
| TP=8 | ~60% of 4-card | ~1.5x | 8 |

TP 越大，通信开销占比越高，scaling efficiency 下降。

## 思考题

1. 为什么 TP=2 放不下 70B 模型？
2. 如果 8 张卡在同一服务器，TP=8 可行吗？跨服务器 TP=8 呢？
3. 能不能用 TP=4 + DP=2（即 8 张卡，两组 TP=4 副本）？
