# MCP 集成

> 源码: `services/mcp/` | `tools/MCPTool/`

## 1. MCP 协议

Model Context Protocol (MCP) 允许 Claude Code 连接外部 MCP 服务器，扩展工具能力。

## 2. 架构

```
Claude Code
    │
    ↓
┌──────────────────┐
│ MCP Client       │
│ (services/mcp/)  │
└────────┬─────────┘
         │ JSON-RPC
         ↓
┌──────────────────┐
│ MCP Server       │
│ (外部进程)        │
└────────┬─────────┘
         │
         ↓
    工具列表
```

## 3. MCP 工具

| 工具 | 用途 |
|------|------|
| MCPTool | 调用远程 MCP 工具 |
| ListMcpResourcesTool | 列出 MCP 资源 |
| ReadMcpResourceTool | 读取 MCP 资源 |
| McpAuthTool | MCP 认证 |

---

*上一节：[04 工具系统](../04-工具系统/06-权限系统.md) | 下一节：[LSP 集成](./02-LSP集成.md)*
