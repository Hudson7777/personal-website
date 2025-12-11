# 快速部署指南 - Railway

这是一份简化的部署指南，帮助你快速将后端部署到 Railway。

## 5 分钟快速部署

### 1. 准备工作（1 分钟）

```bash
# 确保所有代码已提交到 GitHub
git add .
git commit -m "Prepare for Railway deployment"
git push origin MVP
```

### 2. Railway 项目设置（2 分钟）

1. 访问 https://railway.app
2. 登录或注册
3. 点击 "New Project" → "Deploy from GitHub repo"
4. 选择 `personal-website` 仓库
5. 选择 `MVP` 分支
6. 等待项目创建完成

### 3. 添加 PostgreSQL 数据库（1 分钟）

1. 在 Railway 项目中，点击 "+ Add"
2. 选择 "Database" → "PostgreSQL"
3. 等待数据库创建完成

### 4. 配置后端服务（1 分钟）

1. 点击后端服务
2. 进入 "Settings" 标签
3. 设置 "Root Directory" 为 `apps/backend`
4. 设置 "Build Command" 为 `pnpm install && pnpm build`
5. 设置 "Start Command" 为 `pnpm start`

### 5. 配置环境变量（1 分钟）

1. 点击后端服务
2. 进入 "Variables" 标签
3. 添加以下变量：

```
NODE_ENV=production
PORT=3001
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

**重要：DATABASE_URL 会自动添加**

## 初始化数据库

部署完成后，运行以下命令初始化数据库：

### 方式 1：使用 Railway CLI（推荐）

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 进入项目
railway link

# 运行迁移
railway run pnpm db:push

# 初始化数据
railway run pnpm db:init-production
```

### 方式 2：使用 Railway 网页界面

1. 在 Railway 项目中，点击后端服务
2. 进入 "Deployments" 标签
3. 点击最新的部署
4. 进入 "Logs" 查看部署状态

## 验证部署

```bash
# 获取后端 URL（在 Railway 项目中查看）
BACKEND_URL=https://your-backend-url

# 测试健康检查
curl $BACKEND_URL/api/health

# 测试文章列表
curl $BACKEND_URL/api/articles
```

## 更新前端

获取后端 URL 后，更新前端配置：

```typescript
// apps/frontend/src/lib/api.ts
const api = axios.create({
  baseURL: 'https://your-backend-url/api',
})
```

## 常见问题

### Q: 部署失败了怎么办？
A: 检查 Railway Logs，查看具体错误信息。常见原因：
- Node.js 版本不兼容
- 依赖安装失败
- 构建命令错误

### Q: 如何查看数据库连接字符串？
A: 点击 PostgreSQL 服务 → "Connect" 标签 → 复制连接字符串

### Q: 如何重新部署？
A: 推送代码到 GitHub，Railway 会自动部署。或在 Railway 中手动点击 "Redeploy"。

### Q: 如何查看日志？
A: 点击后端服务 → "Logs" 标签

### Q: 如何更新环境变量？
A: 点击后端服务 → "Variables" 标签 → 修改后自动重新部署

## 下一步

- [ ] 部署后端到 Railway
- [ ] 初始化数据库
- [ ] 验证 API 端点
- [ ] 更新前端 API 地址
- [ ] 测试前后端集成

## 需要帮助？

- Railway 文档：https://docs.railway.app
- 项目 GitHub：https://github.com/your-username/personal-website
- 查看完整部署指南：`DEPLOYMENT.md`
- 查看部署检查清单：`DEPLOYMENT_CHECKLIST.md`
