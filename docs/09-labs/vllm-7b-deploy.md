---
sidebar_position: 1
---

# 实验：用 vLLM 部署 7B 模型

## 目标

在一台有 GPU 的机器上，30 分钟内把一个 7B 模型跑起来。

## 环境要求

- GPU：A100-80G / RTX 4090 / 任意 >= 24GB 显存的 GPU
- Python >= 3.10
- CUDA >= 12.1

## 步骤

### 1. 安装

```bash
pip install vllm
```

### 2. 单 GPU 启动

```bash
vllm serve Qwen/Qwen2.5-7B-Instruct \
  --host 0.0.0.0 \
  --port 8000
```

### 3. 测试推理

```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen2.5-7B-Instruct",
    "messages": [
      {"role": "system", "content": "你是一个助手"},
      {"role": "user", "content": "解释一下什么是 KV Cache？"}
    ],
    "max_tokens": 200
  }'
```

### 4. 观察显存

```bash
watch -n 1 nvidia-smi
```

注意观察：
- 模型加载后显存占了多少？
- 发起请求后显存变化？

## 关键配置

```bash
vllm serve Qwen/Qwen2.5-7B-Instruct \
  --gpu-memory-utilization 0.90 \
  --max-model-len 4096 \
  --max-num-seqs 256 \
  --enforce-eager false \
  --host 0.0.0.0 \
  --port 8000
```

| 参数 | 含义 | 调优建议 |
|------|------|----------|
| `gpu-memory-utilization` | GPU 显存使用比例 | 留 10% 余量给波动 |
| `max-model-len` | 最大序列长度 | 根据业务需要调整 |
| `max-num-seqs` | 最大并发序列数 | 受 KV Cache 限制 |
| `enforce-eager` | 是否禁用 Graph 优化 | 默认 False（更快），调试时开 |

## 验证成功

1. 启动无报错 → OK
2. curl 能返回推理结果 → OK
3. `nvidia-smi` 显示显存已占用 → OK
4. GPU 利用率 > 50%（有请求时）→ OK

## 思考题

1. 如果显存只有 16GB，7B FP16 模型放得下吗？
2. `max-num-seqs` 设为 1 和设为 256，延迟会有什么区别？
3. 如果 GPU 利用率只有 30%，可能是什么原因？
