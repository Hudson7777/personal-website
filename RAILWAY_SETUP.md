# Railway 部署配置指南

## ✅ 已完成的修改

1. ✅ 修改 `packages/database/prisma/schema.prisma` - 切换到 PostgreSQL
2. ✅ 更新 `packages/database/package.json` - 添加部署脚本
3. ✅ 更新 `.env.example` 文件 - PostgreSQL 配置说明

## 🚀 接下来的步骤

### 步骤 1：在 Railway 创建 PostgreSQL 数据库

1. **登录 Railway**
   - 访问 https://railway.app
   - 进入你的项目

2. **添加 PostgreSQL 服务**
   - 点击 `+ New`
   - 选择 `Database`
   - 选择 `Add PostgreSQL`
   - 等待数据库创建完成（约 1-2 分钟）

3. **获取数据库连接 URL**
   - 点击新创建的 `PostgreSQL` 服务
   - 进入 `Connect` 标签
   - 找到 `DATABASE_URL` 变量
   - 点击复制按钮（格式类似：`postgresql://postgres:xxx@xxx.railway.app:5432/railway`）

### 步骤 2：配置本地开发环境

1. **更新本地 `.env` 文件**

   在 `apps/backend/.env` 中（如果没有则创建）：
   ```bash
   # 粘贴从 Railway 复制的 DATABASE_URL
   DATABASE_URL="postgresql://postgres:xxx@xxx.railway.app:5432/railway"
   
   # 其他配置
   PORT=3001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   JWT_SECRET=your-local-secret-key
   JWT_EXPIRES_IN=7d
   ```

2. **重新生成 Prisma Client**
   ```bash
   cd /Users/haoran/Desktop/personal-website
   pnpm install
   pnpm --filter @database/prisma db:generate
   ```

### 步骤 3：初始化数据库

1. **推送 Schema 到数据库**
   ```bash
   pnpm --filter @database/prisma db:push
   ```
   
   这会创建所有的表结构。

2. **验证数据库**
   ```bash
   pnpm --filter @database/prisma db:studio
   ```
   
   这会打开 Prisma Studio，你可以可视化查看数据库。

### 步骤 4：配置 Railway 后端服务环境变量

1. **进入后端服务配置**
   - 在 Railway 项目中，点击你的后端服务
   - 进入 `Variables` 标签

2. **添加环境变量**
   ```
   NODE_ENV=production
   PORT=3001
   JWT_SECRET=your-production-secret-key-change-this-to-random-string
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://your-frontend-domain.com
   ```

3. **连接数据库**
   - 点击 `+ New Variable`
   - 选择 `Add Reference`
   - 选择 PostgreSQL 服务
   - 选择 `DATABASE_URL`
   - 这会自动将数据库 URL 注入到后端服务

### 步骤 5：重新部署

1. **触发重新部署**
   - 方式 1：推送代码到 GitHub
     ```bash
     git add .
     git commit -m "chore: 切换到 PostgreSQL"
     git push origin MVP
     ```
   
   - 方式 2：在 Railway 中手动重新部署
     - 进入后端服务
     - 点击 `Deployments` 标签
     - 点击 `Deploy` 按钮

2. **查看部署日志**
   - 进入 `Deployments` 标签
   - 点击最新的部署
   - 查看 `Build Logs` 和 `Deploy Logs`
   - 确保没有错误

### 步骤 6：初始化生产数据库

部署成功后，需要初始化数据库 Schema：

**方式 1：使用 Railway CLI（推荐）**
```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 链接项目
railway link

# 推送数据库 Schema
railway run --service=backend pnpm --filter @database/prisma db:push
```

**方式 2：在 Railway 控制台执行**
- 进入后端服务
- 点击 `Settings` 标签
- 找到 `Deploy Command` 或使用 Railway 的 Shell 功能

### 步骤 7：验证部署

1. **测试健康检查**
   ```bash
   curl https://your-backend-url.railway.app/api/health
   ```

2. **测试 API**
   ```bash
   curl https://your-backend-url.railway.app/api/articles
   curl https://your-backend-url.railway.app/api/categories
   ```

## 🔧 本地开发工作流

现在你的本地开发会连接到 Railway 的 PostgreSQL 数据库：

```bash
# 启动后端
cd apps/backend
pnpm dev

# 启动前端
cd apps/frontend
pnpm dev

# 查看数据库
pnpm --filter @database/prisma db:studio
```

## ⚠️ 注意事项

1. **数据库连接**
   - 本地和生产环境现在都使用 PostgreSQL
   - 本地开发会连接到 Railway 的数据库
   - 确保不要在本地误删生产数据

2. **环境隔离（可选）**
   - 如果需要，可以在 Railway 创建两个 PostgreSQL 实例
   - 一个用于开发，一个用于生产
   - 本地连接开发数据库

3. **JWT_SECRET**
   - 生产环境务必使用强随机字符串
   - 可以使用以下命令生成：
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```

## 🎯 下一步

部署成功后：
1. 更新前端 API 配置指向 Railway 后端 URL
2. 考虑部署前端到 Vercel 或 Railway
3. 配置自定义域名（可选）

## 🆘 遇到问题？

### 问题 1：本地无法连接数据库
- 检查 `DATABASE_URL` 是否正确
- 确保 Railway 数据库允许外部连接（默认允许）
- 检查网络连接

### 问题 2：部署失败
- 查看 Railway 部署日志
- 确保所有环境变量已配置
- 确保 `DATABASE_URL` 已正确引用

### 问题 3：数据库 Schema 未创建
- 运行 `railway run pnpm --filter @database/prisma db:push`
- 或在 Railway 控制台手动执行迁移命令

## 📚 相关命令

```bash
# 生成 Prisma Client
pnpm --filter @database/prisma db:generate

# 推送 Schema（开发）
pnpm --filter @database/prisma db:push

# 创建迁移（生产）
pnpm --filter @database/prisma db:migrate

# 部署迁移（生产）
pnpm --filter @database/prisma db:migrate:deploy

# 打开 Prisma Studio
pnpm --filter @database/prisma db:studio
```
