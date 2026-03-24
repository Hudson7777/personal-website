# Personal Website

一个现代化的个人主页网站，用于分享 AI 文章、旅游见闻、摄影作品和历史内容。

**状态**: ✅ 功能完整 | 🟢 本地可用 | 🚀 待云端部署

## 🎯 项目概述

全栈 Monorepo 项目，React 前端 + Express 后端 + Neon PostgreSQL。提供完整的内容管理后台，支持富文本写作、图片上传、评论审核、全站搜索。

### 核心功能

**公开页面**
- 首页：个人介绍 Hero + 最新文章 + 兴趣爱好 + 关于我
- 四大内容分类：AI 文章 / 旅游 / 摄影 / 历史
- 文章详情：富文本内容、标签、相关文章推荐、嵌套评论
- 全站搜索（`/search`）
- 响应式设计，支持移动端

**管理后台** (`/admin`)
- 文章编辑器：TipTap 富文本，支持图片上传、标签、分类、草稿/发布
- 评论管理：查看全部评论、一键删除、分页
- 数据统计：文章数 / 评论数 / 分类数

## 🏗️ 项目结构

```
personal-website/
├── apps/
│   ├── frontend/          # React 18 + Vite 前端
│   └── backend/           # Express + TypeScript 后端
│       └── src/
│           ├── controllers/
│           ├── lib/         # 共享 Prisma 实例
│           ├── middleware/
│           ├── routes/
│           ├── schemas/
│           ├── services/
│           └── utils/
├── packages/
│   ├── shared/            # 共享类型和常量
│   └── database/          # Prisma schema（PostgreSQL）
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 🛠️ 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **样式**: Tailwind CSS（莫奈哑光绿主题）
- **编辑器**: TipTap 富文本编辑器
- **状态管理**: Zustand
- **构建工具**: Vite
- **安全**: DOMPurify（XSS 防护）

### 后端
- **框架**: Express + TypeScript
- **数据库**: Neon PostgreSQL（免费 Serverless）
- **ORM**: Prisma
- **认证**: JWT（access token 30min + refresh token 90d）
- **安全**: Helmet + express-rate-limit
- **文件上传**: Multer
- **数据验证**: Zod

### 部署（规划）
- **前端**: Vercel（免费）
- **后端**: Render（免费）
- **数据库**: Neon（免费，永不休眠）

## 📦 快速开始

### 前置要求
- Node.js >= 18
- pnpm >= 8.0.0
- Neon 数据库账号（[neon.tech](https://neon.tech) 免费注册）

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

复制并填写后端配置：

```bash
cp apps/backend/.env.example apps/backend/.env
```

`.env` 必填项：

```env
DATABASE_URL="postgresql://..."   # 从 Neon 复制连接字符串
JWT_SECRET="your-random-secret"
JWT_REFRESH_SECRET="your-random-secret-2"
ADMIN_EMAILS="your@email.com"
ADMIN_PASSWORD="your-password"
```

前端 `.env`（本地开发留空，走 Vite proxy）：

```env
# 本地开发不需要设置 VITE_API_URL
# 生产部署时设置: VITE_API_URL=https://your-backend.onrender.com/api
```

### 3. 初始化数据库

```bash
# 创建所有表
pnpm db:push

# 创建管理员账号
pnpm --filter=backend db:init-admin
```

### 4. 启动开发服务器

```bash
pnpm dev
# 前端: http://localhost:5173
# 后端: http://localhost:3001
```

### 5. 登录管理后台

访问 `http://localhost:5173/admin/login`，使用 `.env` 中配置的邮箱和密码登录。

## 🔑 API 文档

### 认证
```
POST   /api/auth/login           # 登录
POST   /api/auth/refresh         # 刷新 token
GET    /api/auth/me              # 获取当前用户信息
PUT    /api/auth/profile         # 更新个人资料
```

### 文章（写操作需 Admin 权限）
```
GET    /api/articles             # 文章列表（分页、筛选、搜索）
GET    /api/articles/:id         # 单篇文章
GET    /api/articles/:id/related # 相关文章
POST   /api/articles             # 创建文章 🔒
PUT    /api/articles/:id         # 更新文章 🔒
DELETE /api/articles/:id         # 删除文章 🔒
```

### 评论
```
GET    /api/articles/:id/comments         # 获取评论（树形结构）
POST   /api/articles/:id/comments         # 发表评论 🔒
PUT    /api/articles/:id/comments/:cid    # 编辑评论 🔒
DELETE /api/articles/:id/comments/:cid   # 删除评论 🔒
```

### 管理员专用
```
GET    /api/admin/stats          # 统计数据 🔒
GET    /api/admin/comments       # 所有评论（跨文章） 🔒
DELETE /api/admin/comments/:id   # 删除任意评论 🔒
```

### 文件上传
```
POST   /api/upload               # 上传图片
DELETE /api/upload/:filename     # 删除图片
```

### SEO
```
GET    /sitemap.xml              # 站点地图
```

> 🔒 需要在 Header 携带 `Authorization: Bearer <token>`

## 🗃️ 数据库模型

| 模型 | 说明 |
|------|------|
| User | 管理员用户（含 name, bio, avatar） |
| Article | 文章（category, tags, content HTML, published） |
| Comment | 评论（支持 parentId 嵌套回复） |
| Category | 分类 |
| Tag | 标签 |

## 🔧 常用命令

```bash
pnpm dev              # 启动开发服务器
pnpm build            # 构建所有包
pnpm type-check       # TypeScript 类型检查
pnpm db:push          # 推送 Schema 到数据库
pnpm db:studio        # 打开 Prisma Studio（可视化数据库）
pnpm --filter=backend db:init-admin   # 初始化管理员账号
pnpm --filter=backend db:seed         # 写入测试数据
```

## 🚀 部署

推荐免费组合：**Vercel（前端）+ Render（后端）+ Neon（数据库）**

**前端 → Vercel**
1. 连接 GitHub 仓库到 Vercel
2. 设置环境变量 `VITE_API_URL=https://your-backend.onrender.com/api`
3. 自动读取 `vercel.json` 构建

**后端 → Render**
1. 创建 Web Service，连接 GitHub 仓库
2. Build Command: `pnpm install && pnpm build`
3. Start Command: `cd apps/backend && pnpm start`
4. 填入所有 `.env` 变量

## 📞 联系方式

- **GitHub**: https://github.com/Hudson7777/personal-website
