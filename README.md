# Personal Website

一个现代化的个人主页网站，用于分享 AI 文章、旅游见闻、摄影作品和历史内容。

**状态**: ✅ MVP 完成 | 🚀 准备部署

## 🎯 项目概述

这是一个全栈 Monorepo 项目，包含前端、后端和共享包。采用 MVC 架构，提供完整的内容管理系统。

### 核心功能

- **个人介绍展示**: 首页展示个人概况和兴趣爱好
- **多分类内容管理**: AI 文章、旅游、摄影、历史四大分类
- **文章 CRUD 操作**: 完整的创建、读取、更新、删除功能
- **分类和标签管理**: 灵活的内容分类和标签系统
- **文件上传**: 支持图片上传和管理（本地存储）
- **分页和筛选**: 文章列表支持分页、分类筛选、排序
- **相关文章推荐**: 自动推荐相关文章
- **响应式设计**: 现代、简洁、美观的 UI
- **类型安全**: 完整的 TypeScript 支持
- **数据验证**: 使用 Zod 进行请求数据验证

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
- **数据库**: SQLite（本地开发）/ PostgreSQL（生产环境）
- **ORM**: Prisma
- **文件上传**: Multer
- **数据验证**: Zod
- **架构**: MVC（Model-View-Controller）
- **错误处理**: 统一的错误处理和响应格式

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

### 快速部署指南

详见 [QUICK_START_DEPLOYMENT.md](./QUICK_START_DEPLOYMENT.md) - 5 分钟快速部署到 Railway

### 详细部署指南

- [完整部署指南](./DEPLOYMENT.md) - 详细的部署步骤和配置说明
- [部署检查清单](./DEPLOYMENT_CHECKLIST.md) - 部署前后的检查项

### 部署架构

```
GitHub (MVP 分支)
    ↓
Railway CI/CD
    ├── PostgreSQL 数据库
    └── Node.js 后端 (apps/backend)

前端 (本地开发或 Vercel)
    └── React 应用 (apps/frontend)
```

## 📚 文档

### 项目文档
- [项目总结](./PROJECT_SUMMARY.md) - 完整的项目概览和统计
- [快速开始部署](./QUICK_START_DEPLOYMENT.md) - 5 分钟快速部署
- [详细部署指南](./DEPLOYMENT.md) - 完整的部署步骤
- [部署检查清单](./DEPLOYMENT_CHECKLIST.md) - 部署检查项

### 应用文档
- [前端开发指南](./apps/frontend/README.md)
- [后端开发指南](./apps/backend/README.md)
- [共享包文档](./packages/shared/README.md)

### API 文档

#### 文章 API
```
GET    /api/articles              # 获取文章列表（支持分页、筛选）
GET    /api/articles/:id          # 获取单篇文章
GET    /api/articles/:id/related  # 获取相关文章
POST   /api/articles              # 创建文章
PUT    /api/articles/:id          # 更新文章
DELETE /api/articles/:id          # 删除文章
```

#### 分类 API
```
GET    /api/categories            # 获取所有分类
POST   /api/categories            # 创建分类
PUT    /api/categories/:id        # 更新分类
DELETE /api/categories/:id        # 删除分类
```

#### 标签 API
```
GET    /api/tags                  # 获取所有标签
POST   /api/tags                  # 创建标签
PUT    /api/tags/:id              # 更新标签
DELETE /api/tags/:id              # 删除标签
```

#### 文件上传 API
```
POST   /api/upload                # 上传单个文件
POST   /api/upload/multiple       # 上传多个文件
DELETE /api/upload/:filename      # 删除文件
```

## 💡 开发指南

### 本地开发

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev

# 前端: http://localhost:5173
# 后端: http://localhost:3001
```

### 数据库操作

```bash
# 初始化数据库
pnpm db:push

# 初始化测试数据
pnpm db:seed

# 打开 Prisma Studio
pnpm db:studio
```

### 代码质量

```bash
# TypeScript 类型检查
pnpm type-check

# ESLint 代码检查
pnpm lint

# 构建项目
pnpm build
```

## 📊 项目统计

- **后端代码**: ~2000+ 行
- **前端代码**: ~1500+ 行
- **API 端点**: 20+ 个
- **数据库模型**: 5 个
- **React 组件**: 15+ 个

## 🎯 下一步

### 短期（1-2 周）
- [ ] 部署后端到 Railway
- [ ] 测试生产环境 API
- [ ] 部署前端到 Vercel

### 中期（1-2 个月）
- [ ] 实现用户认证系统
- [ ] 添加评论功能
- [ ] 实现搜索功能

### 长期（3-6 个月）
- [ ] 性能优化
- [ ] SEO 优化
- [ ] 移动端适配

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

- **GitHub**: https://github.com/Hudson7777/personal-website
- **Email**: hudson@example.com

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件
