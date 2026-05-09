---
sidebar_position: 2
---

# FDE 的三种类型

> 不同公司的 FDE 定义不同，面试前需要确认你面的是哪一种

---

## Type A: 推理基础设施型

**核心：** 推理引擎优化、GPU 管理、延迟/吞吐优化

### 典型工作

- vLLM / TensorRT-LLM 调优
- GPU 集群运维和调度
- 推理平台开发
- 量化和性能优化

### 技术栈

CUDA、C++、Python、K8s、vLLM/TensorRT-LLM

### 代表公司

字节跳动（AI Infra）、阿里云、腾讯 AI Infra

---

## Type B: 应用部署型

**核心：** RAG 系统、Agent 架构、Prompt Engineering、Eval

### 典型工作

- AI 应用架构设计
- RAG 管线搭建
- Agent 框架开发
- 模型评估体系

### 技术栈

LangChain/LlamaIndex、向量数据库、Eval 框架

### 代表公司

AI 初创公司、ToB AI 服务商

---

## Type C: 客户交付型（Palantir 模式）

**核心：** 在客户现场部署 AI、业务流程改造、技术 + 咨询

### 典型工作

- 客户现场部署
- 业务流程 AI 化改造
- 技术方案 + 咨询服务
- 跨团队协作

### 技术栈

全栈 + 沟通能力 + 行业理解

### 代表公司

OpenAI（Forward Alliance）、Palantir、Databricks

---

## 你怎么判断目标公司的 FDE 类型？

```
看 JD 关键词：
  - "vLLM / TensorRT / GPU / CUDA" → Type A
  - "RAG / Agent / LangChain" → Type B
  - "Customer / Client / Delivery" → Type C

看团队归属：
  - 归属 Infra / Platform 团队 → Type A
  - 归属 AI 应用团队 → Type B
  - 归属 GTM / Enterprise 团队 → Type C
```

**面试策略：** 确认类型后，针对性准备。本学习路径以 Type A（推理基础设施）为主。

---

*下一节：[学习路线图](./02-learning-path.md)*
