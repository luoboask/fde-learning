---
sidebar_position: 2
---

# 实验：量化部署工作流

## 目标

把 7B 模型从 FP16 量化到 INT8，验证精度和性能差异。

## 环境

- GPU：A100-80G 或 RTX 4090
- Python >= 3.10

## 步骤

### 1. 安装量化工具

```bash
pip install autoawq vllm
```

### 2. 使用预量化模型

```bash
# 直接从 HuggingFace 拉取 INT4 量化版本
vllm serve hugging-quants/Meta-Llama-3-8B-Instruct-AWQ-INT4 \
  --quantization awq \
  --host 0.0.0.0 \
  --port 8000
```

### 3. 对比 FP16 vs 量化版

| 指标 | FP16 | INT4 (AWQ) |
|------|------|------------|
| 模型权重显存 | 16 GB | 4 GB |
| 推理速度 | 基准 | 略慢（需反量化） |
| MMLU 分数 | 基准 | 下降 1-3% |
| 最大 batch | 受限 | 可大幅增大 |

### 4. 精度验证

```python
from lm_eval import evaluator
from transformers import AutoModelForCausalLM

# 分别跑 FP16 和 INT4 的 MMLU 测试
# 对比分数差异
```

### 5. 性能测试

```bash
# 用 ab 或 wrk 进行压测
ab -n 100 -c 10 http://localhost:8000/v1/chat/completions
```

记录：
- P50 延迟
- P99 延迟
- Throughput (tokens/sec)

## 思考题

1. 量化后精度下降 5%，你会怎么处理？
2. 为什么 INT4 量化后推理速度不一定更快？
3. 什么场景下应该用量化，什么时候不应该？
