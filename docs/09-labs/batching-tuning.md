---
sidebar_position: 2
---

# 实验：连续批处理调优

## 目标

通过调整 vLLM 的 batch 策略，观察吞吐量和延迟的变化。

## 背景

vLLM 默认使用 Continuous Batching（持续批处理），但有几个关键参数影响性能：

- `max-num-seqs`：最大并发序列数
- `gpu-memory-utilization`：GPU 显存分配比例
- `max-model-len`：最大序列长度

## 实验步骤

### 1. 基准测试

```bash
# 默认配置
vllm serve Qwen/Qwen2.5-7B-Instruct \
  --gpu-memory-utilization 0.90 \
  --max-num-seqs 256 \
  --max-model-len 4096
```

用 vLLM 自带的 benchmark 工具测试：

```bash
python -m vllm.entrypoints.openai.benchmark \
  --backend vllm \
  --model Qwen/Qwen2.5-7B-Instruct \
  --dataset-name random \
  --random-input 1024 \
  --random-output 128 \
  --max-num-seqs 256
```

### 2. 调整 max-num-seqs

| max-num-seqs | 吞吐 (tok/s) | P99 延迟 (ms) | 显存利用率 |
|--------------|-------------|---------------|-----------|
| 32 | 基准值 | 最低 | 低 |
| 128 | 提升 ~2x | 略高 | 中 |
| 256 | 提升 ~3x | 较高 | 高 |
| 512 | 可能 OOM | 很高 | 极高 |

### 3. 调整 gpu-memory-utilization

| utilization | 效果 |
|-------------|------|
| 0.80 | 留 20% 余量，安全但浪费 |
| 0.90 | 推荐值，平衡安全与性能 |
| 0.95 | 激进，可能偶尔 OOM |

### 4. 分析结果

```
结论：
  - 吞吐随 batch size 增加而提升，但不是线性的
  - 延迟也随 batch size 增加而增加
  - 最优值取决于请求长度分布
  - 需要根据实际业务的 QPS 和延迟要求找到平衡点
```

## 思考题

1. 如果你的业务要求 P99 < 500ms，最大 batch 能设多大？
2. 短回复场景（< 50 tokens）vs 长回复场景（> 500 tokens），最优 batch 有什么不同？
3. Continuous Batching 和 In-flight Batching 的核心差异是什么？
