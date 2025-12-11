# Database

Prisma 数据库配置和迁移管理。支持 SQLite（本地开发）和 PostgreSQL（生产环境）。

## 🚀 快速开始

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

## 💾 数据库支持

### 本地开发（SQLite）

```
DATABASE_URL="file:./dev.db"
```

**优点**：
- 无需额外配置
- 开发快速
- 文件存储，易于备份

### 生产环境（PostgreSQL）

```
DATABASE_URL="postgresql://user:password@host:port/database"
```

**优点**：
- 性能好
- 支持并发
- 企业级可靠性

## 📊 Schema 说明

### User（用户）
- `id` - 用户 ID（CUID）
- `email` - 邮箱（唯一）
- `password` - 密码（加密存储）
- `name` - 用户名
- `bio` - 个人简介（可选）
- `avatar` - 头像 URL（可选）
- `createdAt` - 创建时间
- `updatedAt` - 更新时间
- **关系**: articles, comments

### Article（文章）
- `id` - 文章 ID（CUID）
- `title` - 标题
- `content` - 内容（JSON 字符串格式，TipTap 编辑器内容）
- `category` - 分类（ai/travel/photography/history）
- `tags` - 标签（逗号分隔的字符串）
- `excerpt` - 摘要（可选）
- `coverImage` - 封面图片 URL（可选）
- `published` - 是否发布（默认 false）
- `authorId` - 作者 ID（外键）
- `createdAt` - 创建时间
- `updatedAt` - 更新时间
- **关系**: author (User), comments (Comment[])
- **索引**: authorId, category, published

### Category（分类）
- `id` - 分类 ID（CUID）
- `name` - 分类名称（唯一）
- `description` - 分类描述（可选）
- `createdAt` - 创建时间
- `updatedAt` - 更新时间

### Tag（标签）
- `id` - 标签 ID（CUID）
- `name` - 标签名称（唯一）
- `createdAt` - 创建时间

### Comment（评论）
- `id` - 评论 ID（CUID）
- `content` - 评论内容
- `authorId` - 评论者 ID（外键）
- `articleId` - 文章 ID（外键）
- `createdAt` - 创建时间
- `updatedAt` - 更新时间
- **关系**: author (User), article (Article)
- **索引**: authorId, articleId

## 🔄 迁移流程

### 开发环境

```bash
# 1. 修改 schema.prisma
# 2. 推送到数据库
pnpm db:push

# 3. 初始化测试数据
pnpm db:seed
```

### 生产环境

```bash
# 1. 创建迁移文件
pnpm db:migrate

# 2. 应用迁移
pnpm db:migrate deploy

# 3. 初始化生产数据
pnpm db:init-production
```

## 📝 初始化脚本

### seed.ts（本地开发）
- 创建测试用户
- 创建分类和标签
- 创建示例文章

### init-production.ts（生产环境）
- 检查数据库连接
- 检查数据库 schema
- 初始化生产数据（如果数据库为空）

## 🔗 关系图

```
User
├── articles (1:N) → Article
└── comments (1:N) → Comment

Article
├── author (N:1) → User
├── comments (1:N) → Comment
└── tags (String, 逗号分隔)

Comment
├── author (N:1) → User
└── article (N:1) → Article

Category
└── 独立模型

Tag
└── 独立模型
```
