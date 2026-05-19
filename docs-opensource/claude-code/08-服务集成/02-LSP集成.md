# LSP 集成

> 源码: `services/lsp/`

## 1. LSP 协议

Language Server Protocol (LSP) 提供代码分析能力：

- 代码诊断（错误/警告）
- 符号跳转
- 自动补全
- 悬停文档

## 2. 架构

```
Claude Code ──→ LSP Client ──→ Language Server (tsserver, pyright...)
```

---

*上一节：[MCP 协议](./01-MCP协议.md) | 下一节：[OAuth 认证](./03-OAuth认证.md)*
