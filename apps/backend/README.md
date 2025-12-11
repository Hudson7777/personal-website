# Backend

Express + TypeScript 后端应用

## 快速开始

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

### 构建

```bash
pnpm build
```

### 启动生产环境

```bash
pnpm start
```

## 数据库操作

```bash
# 推送 Schema 到数据库
pnpm db:push

# 运行迁移
pnpm db:migrate

# 打开 Prisma Studio
pnpm db:studio
```

## 项目结构

```
src/
├── index.ts           # 应用入口
├── middleware/        # 中间件
├── routes/            # 路由
├── utils/             # 工具函数
├── types/             # TypeScript 类型定义
└── services/          # 业务逻辑（待添加）
```

## API 端点

### 认证
- `POST /api/auth/login` - 登录
- `POST /api/auth/register` - 注册
- `POST /api/auth/refresh` - 刷新 Token

### 文章
- `GET /api/articles` - 获取文章列表
- `POST /api/articles` - 创建文章
- `GET /api/articles/:id` - 获取单篇文章
- `PUT /api/articles/:id` - 更新文章
- `DELETE /api/articles/:id` - 删除文章
