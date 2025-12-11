# Personal Website

一个现代化的个人主页网站，用于分享 AI 文章、旅游见闻、摄影作品和历史内容。

## 🎯 项目概述

这是一个全栈 Monorepo 项目，包含前端、后端和共享包。

### 核心功能

- **个人介绍展示**: 首页展示个人概况
- **多分类内容**: AI 文章、旅游、摄影、历史
- **内容管理**: 富文本编辑器（TipTap）
- **图片管理**: 本地存储 + 云存储支持
- **用户认证**: JWT + Refresh Token
- **响应式设计**: 现代、简洁、美观的 UI

## 🏗️ 项目结构

```
personal-website/
├── apps/
│   ├── frontend/          # React 前端应用
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   └── tailwind.config.js
│   └── backend/           # Express 后端应用
│       ├── src/
│       ├── prisma/
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── shared/            # 共享类型和工具
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── database/          # Prisma 数据库配置
│       ├── prisma/
│       └── package.json
├── .github/
│   └── workflows/         # CI/CD 工作流
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

## 🛠️ 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **样式**: Tailwind CSS + Shadcn/ui
- **编辑器**: TipTap 富文本编辑器
- **状态管理**: Zustand
- **构建工具**: Vite
- **HTTP 客户端**: Axios

### 后端
- **框架**: Express + TypeScript
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **认证**: JWT + Refresh Token
- **文件上传**: Multer
- **验证**: Zod

### 共享
- **类型定义**: TypeScript interfaces
- **工具函数**: 通用工具库

### 部署
- **前端**: Vercel
- **后端**: Railway
- **数据库**: Railway PostgreSQL

## 📦 快速开始

### 前置要求
- Node.js >= 18
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动所有应用
pnpm dev

# 启动特定应用
pnpm dev --filter=frontend
pnpm dev --filter=backend
```

### 数据库操作

```bash
# 推送 Schema 到数据库
pnpm db:push

# 运行迁移
pnpm db:migrate

# 打开 Prisma Studio
pnpm db:studio
```

### 构建

```bash
pnpm build
```

### 类型检查

```bash
pnpm type-check
```

### Lint

```bash
pnpm lint
```

## 📝 开发流程

1. 修改代码
2. 运行 `pnpm type-check` 检查类型
3. 运行 `pnpm lint` 检查代码风格
4. 提交代码

## 🚀 部署

### 前端部署到 Vercel

```bash
# 连接 GitHub 仓库到 Vercel
# 自动部署 apps/frontend
```

### 后端部署到 Railway

```bash
# 连接 GitHub 仓库到 Railway
# 自动部署 apps/backend
```

## 📚 文档

- [前端开发指南](./apps/frontend/README.md)
- [后端开发指南](./apps/backend/README.md)
- [共享包文档](./packages/shared/README.md)

## 📄 许可证

MIT
