# 部署指南

本文档说明如何将后端部署到 Railway。

## 前置条件

- GitHub 账户
- Railway 账户（https://railway.app）
- 项目已推送到 GitHub

## 部署步骤

### 1. 在 Railway 上创建项目

1. 访问 https://railway.app
2. 登录或注册账户
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 授权 Railway 访问你的 GitHub 账户
6. 选择 `personal-website` 仓库
7. 选择 `MVP` 分支

### 2. 添加 PostgreSQL 数据库

1. 在 Railway 项目中，点击 "+ Add"
2. 选择 "Database" → "PostgreSQL"
3. 等待数据库创建完成
4. 点击 PostgreSQL 服务，查看连接信息

### 3. 配置环境变量

1. 在 Railway 项目中，点击后端服务
2. 进入 "Variables" 标签
3. 添加以下环境变量：

```
DATABASE_URL=postgresql://postgres:PASSWORD@HOST:PORT/railway
NODE_ENV=production
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-production-secret-key
JWT_EXPIRES_IN=7d
PORT=3001
```

**获取 DATABASE_URL：**
- 点击 PostgreSQL 服务
- 在 "Connect" 标签中复制连接字符串
- 格式：`postgresql://postgres:PASSWORD@HOST:PORT/railway`

### 4. 配置构建和启动命令

1. 在后端服务中，进入 "Settings" 标签
2. 设置以下配置：

**Build Command:**
```bash
pnpm install && pnpm build
```

**Start Command:**
```bash
pnpm start
```

**Root Directory:**
```
apps/backend
```

### 5. 初始化数据库

部署后，需要在 Railway 上运行数据库迁移和种子脚本：

1. 在 Railway 项目中，点击后端服务
2. 进入 "Deployments" 标签
3. 点击最新的部署
4. 进入 "Logs" 查看部署日志

或者通过 Railway CLI：

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 进入项目
railway link

# 运行迁移
railway run pnpm db:push

# 运行种子脚本
railway run pnpm db:seed
```

### 6. 验证部署

1. 在 Railway 项目中，点击后端服务
2. 查看 "Deployments" 状态
3. 点击 "View Logs" 查看日志
4. 访问健康检查端点：`https://your-backend-url/api/health`

## 常见问题

### Q: 如何获取后端 URL？
A: 在 Railway 项目中，点击后端服务，在 "Connect" 标签中查看公开 URL。

### Q: 如何更新代码？
A: 推送代码到 GitHub，Railway 会自动部署。

### Q: 如何查看日志？
A: 在 Railway 项目中，点击后端服务，进入 "Logs" 标签。

### Q: 如何重新部署？
A: 在 Railway 项目中，点击后端服务，进入 "Deployments"，点击 "Redeploy"。

### Q: 如何更新环境变量？
A: 在后端服务中，进入 "Variables" 标签，修改后自动重新部署。

## 前端配置

部署后端后，需要更新前端的 API 基础 URL：

1. 打开 `apps/frontend/src/lib/api.ts`
2. 修改 `baseURL` 为你的后端 URL：

```typescript
const api = axios.create({
  baseURL: 'https://your-backend-url/api',
})
```

或者使用环境变量：

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})
```

然后在 `.env` 中配置：

```
VITE_API_URL=https://your-backend-url/api
```

## 生产环境检查清单

- [ ] PostgreSQL 数据库已创建
- [ ] 环境变量已配置
- [ ] 数据库迁移已运行
- [ ] 种子数据已初始化
- [ ] 健康检查端点可访问
- [ ] API 端点可正常调用
- [ ] 前端 API URL 已更新
- [ ] CORS 配置正确

## 回滚

如果部署出现问题，可以回滚到上一个版本：

1. 在 Railway 项目中，点击后端服务
2. 进入 "Deployments" 标签
3. 点击之前的部署
4. 点击 "Redeploy"

## 支持

- Railway 文档：https://docs.railway.app
- Railway 社区：https://railway.app/community
