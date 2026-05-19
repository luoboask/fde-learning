# Skills 系统

> 源码: `skills/` 目录

## 1. Skill 概述

Skill 是 Claude Code 的可复用能力单元，允许用户定义一组命令、Prompt 模板或工作流程。

```
skills/
├── builtin/          # 内置技能
│   ├── commit/       # 代码提交
│   ├── review/       # 代码审查
│   └── ...
└── user/             # 用户自定义技能
    └── ...
```

## 2. Skill 定义

每个技能通过配置文件定义：

```yaml
# skills/commit/skill.yaml
name: commit
description: "智能提交代码到 git"
prompt: |
  检查当前 git 状态，暂存所有更改，
  生成规范的 commit message，提交。
allowed_tools:
  - Bash
category: workflow
```

## 3. Skill 加载

```typescript
// 加载内置技能
function loadBuiltinSkills(): Skill[] {
  return [
    loadSkill('commit'),
    loadSkill('review'),
    // ...
  ]
}

// 加载用户技能
function loadUserSkills(): Skill[] {
  const userDir = getConfig().skillsDir
  return globSync('**/skill.yaml', { cwd: userDir })
    .map(path => loadSkill(path))
}
```

## 4. Skill 触发

用户通过 `/skill-name` 命令触发技能：

```
/commit    → 执行 commit 技能
/review    → 执行 review 技能
```

触发流程：
```
用户输入 /commit
    │
    ↓
解析命令 → 查找对应 Skill
    │
    ↓
注入 Skill Prompt 到系统上下文
    │
    ↓
Claude 按照 Skill 定义执行工作流
```

## 5. Skill 与 Hook 系统

Skill 与记忆系统联动：

```typescript
// Skill 执行时会记录到记忆
function executeSkill(skill: Skill) {
  const prompt = buildSkillPrompt(skill)
  // 注入到对话上下文
  appendContext(prompt)
  // 记录执行历史
  recordSkillExecution(skill.name)
}
```

## 6. 内置技能列表

| 技能 | 功能 | 类别 |
|------|------|------|
| `/commit` | 智能 git 提交 | workflow |
| `/review` | 代码审查 | workflow |
| `/explain` | 解释代码 | knowledge |
| `/refactor` | 重构代码 | workflow |
| `/test` | 生成测试 | workflow |
| `/search` | 搜索代码 | knowledge |

---

*上一节：[08 服务集成](../08-服务集成/03-OAuth认证.md) | 下一节：[Plugins 系统](./02-Plugins系统.md)*
