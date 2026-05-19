---
sidebar_position: 3
---

# 实验：性能 Profiling 工作流

## 目标

学会用工具定位推理服务的性能瓶颈。

## 工具链

| 工具 | 层级 | 用途 |
|------|------|------|
| `nvidia-smi` | 系统级 | 实时监控 GPU 状态 |
| `nvtop` | 系统级 | 交互式 GPU 监控 |
| `nsys` (Nsight Systems) | 系统级 | CPU+GPU 时间线分析 |
| `ncu` (Nsight Compute) | Kernel 级 | 每个 kernel 的性能详情 |

## 步骤

### 1. 实时监控

```bash
# 终端 1：监控 GPU
watch -n 1 nvidia-smi

# 终端 2：启动推理服务
vllm serve Qwen/Qwen2.5-7B-Instruct

# 终端 3：发起请求
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "Qwen/Qwen2.5-7B-Instruct", "messages": [{"role": "user", "content": "讲一个故事"}], "max_tokens": 500}'
```

观察：
- GPU 利用率：> 70% 为健康
- 显存占用：是否符合预期？

### 2. 系统级 Profiling

```bash
# 使用 nsys 分析推理服务
nsys profile --stats=true \
  --sample=cpu \
  --trace=cuda,nvtx \
  python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-7B-Instruct
```

生成报告后，查看：
- CPU 和 GPU 的时间占比
- kernel 执行时间分布
- 是否有 CPU 阻塞 GPU 的情况

### 3. 判断瓶颈类型

```
GPU 利用率 > 80% → Compute-bound
GPU 利用率 < 50%，显存带宽满 → Memory-bound
GPU 利用率 < 50%，带宽也空闲 → IO-bound 或 batch 太小

对应优化：
  Compute-bound → Flash Attention、更大的模型
  Memory-bound  → 量化、减少显存读写
  IO-bound      → 批量传输、Pin Memory
```

## 思考题

1. 如果 decode 阶段 GPU 利用率只有 40%，瓶颈在哪？
2. 什么情况下应该用 nsys，什么情况下用 ncu？
3. profiling 数据怎么看？哪些指标最重要？
