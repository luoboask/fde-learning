---
sidebar_position: 4
---

# 实验：OOM 排查演练

## 场景

你的 vLLM 服务突然 OOM 了，怎么排查？

## 现象

```
vllm 启动时报错：
  torch.cuda.OutOfMemoryError: CUDA out of memory.
  Tried to allocate 2.00 GiB. GPU 0 has a total capacity of 79.13 GiB
  of which 1.50 GiB is free.
```

## 排查步骤

### 1. 看显存分配

```bash
nvidia-smi
# 查看当前显存占用
```

```
+-----------------------------------------------------------------------------+
| GPU  Name        | Memory-Usage | GPU-Util |
|------------------+--------------+----------|
|   0  A100-80G    |  79000MiB    |   0%     |
+-----------------------------------------------------------------------------+
```

### 2. 分析显存构成

```
模型权重（FP16）: 7B × 2 bytes = 14 GB
KV Cache（估算）: 取决于 batch 和 seq_len
其他: ~1-2 GB

如果 KV Cache 配置为 max_num_seqs=256, max_model_len=4096:
  KV Cache ≈ 4-8 GB

总计: 14 + 8 + 2 = 24 GB ← 远低于 80 GB，不应该 OOM
```

### 3. 常见原因

| 原因 | 排查方法 | 解决方案 |
|------|----------|----------|
| 多进程加载了多个模型 | `ps aux | grep vllm` | 确保只有一个进程 |
| 前一个进程没释放显存 | `fuser -v /dev/nvidia*` | `kill` 旧进程 |
| `max-model-len` 设置过大 | 检查启动参数 | 降低 max-model-len |
| `max-num-seqs` 太大 | 检查启动参数 | 降低 max-num-seqs |
| 其他进程占用了显存 | `nvidia-smi` 看进程列表 | 清理无关进程 |

### 4. 解决

```bash
# 清理残留进程
ps aux | grep vllm | grep -v grep | awk '{print $2}' | xargs kill -9

# 重新启动，保守配置
vllm serve model_name \
  --gpu-memory-utilization 0.90 \
  --max-model-len 4096 \
  --max-num-seqs 128
```

## 预防

- 启动时设 `gpu-memory-utilization 0.90`（留 10% 余量）
- 根据模型大小合理配置 `max-model-len` 和 `max-num-seqs`
- 监控脚本定期检查显存使用
