# Bash 安全

> 源码: `tools/BashTool/` (160KB)

## 1. 安全架构

BashTool 是 Claude Code 中最复杂的安全敏感工具，包含 24 层安全检查：

```
用户请求执行: rm -rf /tmp/foo
       │
       ↓
┌─────────────────────┐
│ 1. 命令解析          │ ← 识别命令结构
├─────────────────────┤
│ 2. 危险命令检测      │ ← 检查 rm -rf, dd, mkfs 等
├─────────────────────┤
│ 3. 路径验证          │ ← 验证路径是否在允许范围
├─────────────────────┤
│ 4. 权限检查          │ ← 检查文件系统权限
├─────────────────────┤
│ 5. 策略匹配          │ ← 匹配安全策略规则
├─────────────────────┤
│ 6. 用户确认          │ ← 需要用户 Approve/Deny
├─────────────────────┤
│ 7. 沙箱执行          │ ← 受限环境执行
├─────────────────────┤
│ 8. 输出过滤          │ ← 过滤敏感信息
└─────────────────────┘
```

## 2. 危险命令黑名单

```typescript
const DANGEROUS_COMMANDS = [
  /^rm\s+(-rf?|--force)\s/i,     // 强制删除
  /^dd\s/i,                       // 磁盘写入
  /^mkfs/i,                       // 格式化
  /^>\s*\/etc\//,                // 覆盖系统文件
  /^sudo\s/i,                     // 提权
  /^curl.*\|\s*bash/i,           // 管道执行远程脚本
  /^wget.*\|\s*sh/i,             // 同上
  /^chmod\s+777/i,               // 开放所有权限
  /^chmod\s+\+s/i,               // 设置 SUID
]
```

## 3. 路径保护

```typescript
const PROTECTED_PATHS = [
  '/', '/etc', '/usr', '/var', '/boot',
  '/root', '/home', '/sys', '/proc',
]

function isPathProtected(path: string): boolean {
  return PROTECTED_PATHS.some(
    protected => path.startsWith(protected + '/') || path === protected
  )
}
```

## 4. 安全检查流程

```typescript
async function validateCommand(cmd: string): Promise<ValidationResult> {
  // 1. 解析命令
  const parsed = parseCommand(cmd)

  // 2. 检查黑名单
  if (matchesBlacklist(parsed)) {
    return { valid: false, reason: '命令在危险黑名单中' }
  }

  // 3. 检查路径
  const paths = extractPaths(parsed)
  if (paths.some(isPathProtected)) {
    return { valid: false, reason: '操作受保护路径' }
  }

  // 4. 评估风险等级
  const risk = assessRisk(parsed)
  if (risk === 'high') {
    return { valid: false, reason: '高风险操作', requiresApproval: true }
  }

  return { valid: true }
}
```

## 5. 风险等级

| 等级 | 描述 | 处理方式 |
|------|------|---------|
| low | 只读操作 (ls, cat, grep) | 自动执行 |
| medium | 写入操作 (touch, mkdir) | 自动执行（允许模式下） |
| high | 删除/修改系统文件 | 需要用户确认 |
| critical | 危险黑名单 | 拒绝执行 |

## 6. 沙箱执行

```typescript
// 沙箱执行选项
const SANDBOX_OPTIONS = {
  timeout: 30000,           // 30 秒超时
  maxOutputSize: 1024 * 10, // 10KB 输出限制
  allowedEnv: {},           // 清空环境变量
  workingDir: projectRoot,  // 限制工作目录
  network: false,           // 禁止网络访问
}
```

---

*上一节：[09 扩展系统](../09-扩展系统/03-命令系统.md) | 下一节：[权限控制](./02-权限控制.md)*
