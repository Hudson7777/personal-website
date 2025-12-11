# Database

Prisma 数据库配置和迁移管理。

## 快速开始

### 环境配置

复制 `.env.example` 为 `.env` 并填入数据库连接字符串：

```bash
cp .env.example .env
```

### 数据库操作

```bash
# 推送 Schema 到数据库（开发环境）
pnpm db:push

# 创建迁移（生产环境）
pnpm db:migrate

# 打开 Prisma Studio（可视化数据库管理）
pnpm db:studio

# 生成 Prisma Client
pnpm db:generate
```

## Schema 说明

### User（用户）
- `id` - 用户 ID
- `email` - 邮箱（唯一）
- `password` - 密码（加密存储）
- `name` - 用户名
- `bio` - 个人简介
- `avatar` - 头像 URL
- `createdAt` - 创建时间
- `updatedAt` - 更新时间

### Article（文章）
- `id` - 文章 ID
- `title` - 标题
- `content` - 内容（TipTap JSON 格式）
- `category` - 分类（ai/travel/photography/history）
- `tags` - 标签数组
- `excerpt` - 摘要
- `coverImage` - 封面图片 URL
- `published` - 是否发布
- `authorId` - 作者 ID
- `createdAt` - 创建时间
- `updatedAt` - 更新时间

### Comment（评论）
- `id` - 评论 ID
- `content` - 评论内容
- `authorId` - 评论者 ID
- `articleId` - 文章 ID
- `createdAt` - 创建时间
- `updatedAt` - 更新时间

### Tag（标签）
- `id` - 标签 ID
- `name` - 标签名称（唯一）
- `createdAt` - 创建时间

## 迁移流程

### 开发环境

```bash
# 修改 schema.prisma
# 推送到数据库
pnpm db:push
```

### 生产环境

```bash
# 创建迁移文件
pnpm db:migrate

# 应用迁移
pnpm db:migrate deploy
```
