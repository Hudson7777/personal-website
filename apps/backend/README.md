# Backend

Express + TypeScript 后端应用，采用 MVC 架构，提供完整的内容管理 API。

**状态**: ✅ MVP 完成 | 🚀 准备部署

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 环境配置

复制 `.env.example` 为 `.env` 并填入相应的配置：

```bash
cp .env.example .env
```

### 开发模式

```bash
pnpm dev
```

服务器运行在 `http://localhost:3001`

### 构建

```bash
pnpm build
```

### 启动生产环境

```bash
pnpm start
```

## 📦 数据库操作

### 本地开发（SQLite）

```bash
# 推送 Schema 到数据库
pnpm db:push

# 初始化测试数据
pnpm db:seed

# 打开 Prisma Studio
pnpm db:studio
```

### 生产环境（PostgreSQL）

```bash
# 运行迁移
pnpm db:migrate

# 初始化生产数据
pnpm db:init-production
```

## 🏗️ 项目结构

```
src/
├── controllers/       # 控制器层（处理请求）
│   ├── articleController.ts
│   ├── categoryController.ts
│   ├── tagController.ts
│   └── uploadController.ts
├── services/          # 业务逻辑层
│   ├── articleService.ts
│   ├── categoryService.ts
│   ├── tagService.ts
│   └── uploadService.ts
├── routes/            # 路由层
│   ├── articles.ts
│   ├── categories.ts
│   ├── tags.ts
│   └── upload.ts
├── schemas/           # 数据验证（Zod）
│   ├── articleSchema.ts
│   ├── categorySchema.ts
│   └── tagSchema.ts
├── middleware/        # 中间件
│   └── upload.ts      # Multer 文件上传配置
├── utils/             # 工具函数
│   ├── response.ts    # 统一响应格式
│   └── errors.ts      # 自定义错误类
├── scripts/           # 脚本
│   ├── seed.ts        # 本地数据初始化
│   └── init-production.ts # 生产环境初始化
├── types/             # TypeScript 类型定义
└── index.ts           # 应用入口
```

## 🔌 API 端点

### 健康检查
- `GET /api/health` - 健康检查

### 文章 API
- `GET /api/articles` - 获取文章列表（支持分页、分类筛选、排序）
- `GET /api/articles/:id` - 获取单篇文章
- `GET /api/articles/:id/related` - 获取相关文章
- `POST /api/articles` - 创建文章
- `PUT /api/articles/:id` - 更新文章
- `DELETE /api/articles/:id` - 删除文章

### 分类 API
- `GET /api/categories` - 获取所有分类
- `GET /api/categories/:id` - 获取单个分类
- `POST /api/categories` - 创建分类
- `PUT /api/categories/:id` - 更新分类
- `DELETE /api/categories/:id` - 删除分类

### 标签 API
- `GET /api/tags` - 获取所有标签
- `GET /api/tags/:id` - 获取单个标签
- `POST /api/tags` - 创建标签
- `PUT /api/tags/:id` - 更新标签
- `DELETE /api/tags/:id` - 删除标签

### 文件上传 API
- `POST /api/upload` - 上传单个文件
- `POST /api/upload/multiple` - 上传多个文件
- `DELETE /api/upload/:filename` - 删除文件
- `GET /uploads/:filename` - 访问上传的文件

## 💾 数据库支持

### 本地开发
- **数据库**: SQLite
- **文件**: `dev.db`
- **优点**: 无需额外配置，开发快速

### 生产环境
- **数据库**: PostgreSQL
- **配置**: 通过 `DATABASE_URL` 环境变量
- **优点**: 性能好，支持并发

## 🔧 技术栈

- **框架**: Express + TypeScript
- **ORM**: Prisma
- **数据验证**: Zod
- **文件上传**: Multer
- **架构**: MVC（Model-View-Controller）
- **错误处理**: 统一的错误处理和响应格式

## 📊 项目统计

- **代码行数**: ~2000+ 行
- **API 端点**: 20+ 个
- **数据库模型**: 5 个
- **控制器**: 4 个
- **服务**: 4 个
- **路由**: 4 个

## 🚀 部署

详见项目根目录的部署文档：
- [快速开始部署](../../QUICK_START_DEPLOYMENT.md) - 5 分钟快速部署
- [详细部署指南](../../DEPLOYMENT.md) - 完整的部署步骤
- [部署检查清单](../../DEPLOYMENT_CHECKLIST.md) - 部署检查项

## 📝 开发规范

- 使用 TypeScript 进行类型安全
- 遵循 ESLint 规则
- 使用 Zod 进行数据验证
- 统一的错误处理和响应格式
- MVC 架构分离关注点

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT
