# 部署个人网站到 Railway - 详细计划

## 📋 部署前准备

### 1. 账户和仓库准备
- ✅ GitHub 账户已有（Hudson7777/personal-website）
- ✅ 代码已提交到 MVP 分支
- ✅ 所有文档已完善

### 2. 需要准备的信息
- Railway 账户（需要创建）
- GitHub 授权令牌（可选，但推荐）

## 🚀 部署步骤

### 第一步：创建 Railway 账户和项目（5-10 分钟）

1. **访问 Railway**
   - 打开 https://railway.app
   - 点击 "Sign Up"
   - 使用 GitHub 账户登录（推荐）

2. **创建新项目**
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 授权 Railway 访问 GitHub
   - 选择 `personal-website` 仓库
   - 选择 `MVP` 分支

3. **等待项目创建**
   - Railway 会自动检测项目结构
   - 可能需要 1-2 分钟

### 第二步：添加 PostgreSQL 数据库（3-5 分钟）

1. **在 Railway 项目中添加数据库**
   - 点击 "+ Add"
   - 选择 "Database"
   - 选择 "PostgreSQL"
   - 等待数据库创建完成

2. **获取数据库连接信息**
   - 点击 PostgreSQL 服务
   - 进入 "Connect" 标签
   - 复制 `DATABASE_URL`
   - 格式：`postgresql://postgres:PASSWORD@HOST:PORT/railway`

### 第三步：配置后端服务（5-10 分钟）

1. **配置构建和启动命令**
   - 点击后端服务
   - 进入 "Settings" 标签
   - 设置 "Root Directory"：`apps/backend`
   - 设置 "Build Command"：`pnpm install && pnpm build`
   - 设置 "Start Command"：`pnpm start`

2. **配置环境变量**
   - 点击后端服务
   - 进入 "Variables" 标签
   - 添加以下环境变量：

   ```
   NODE_ENV=production
   PORT=3001
   CORS_ORIGIN=http://localhost:5173
   JWT_SECRET=your-production-secret-key-change-this
   JWT_EXPIRES_IN=7d
   ```

   **注意**：`DATABASE_URL` 会自动从 PostgreSQL 服务添加

3. **验证配置**
   - 确保所有环境变量都已设置
   - 检查 Root Directory 是否正确

### 第四步：部署和初始化（10-15 分钟）

1. **等待自动部署**
   - Railway 会自动开始部署
   - 进入 "Deployments" 标签查看进度
   - 等待部署完成（通常 2-5 分钟）

2. **查看部署日志**
   - 点击最新的部署
   - 进入 "Logs" 查看构建日志
   - 确保没有错误

3. **获取后端 URL**
   - 部署完成后，点击后端服务
   - 进入 "Connect" 标签
   - 复制公开 URL（格式：`https://xxx.railway.app`）

4. **初始化数据库**
   - 使用 Railway CLI 或 Web 界面运行迁移

   **方式 1：使用 Railway CLI（推荐）**
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

   **方式 2：使用 Web 界面**
   - 在 Railway 项目中，点击后端服务
   - 进入 "Deployments"
   - 点击最新部署
   - 进入 "Logs" 查看初始化状态

### 第五步：验证部署（5 分钟）

1. **测试健康检查端点**
   ```bash
   curl https://your-backend-url/api/health
   ```
   
   预期响应：
   ```json
   {"status":"ok","timestamp":"2025-12-11T..."}
   ```

2. **测试文章列表 API**
   ```bash
   curl https://your-backend-url/api/articles
   ```
   
   预期响应：包含文章列表的 JSON

3. **测试分类 API**
   ```bash
   curl https://your-backend-url/api/categories
   ```

4. **测试标签 API**
   ```bash
   curl https://your-backend-url/api/tags
   ```

### 第六步：更新前端配置（2-3 分钟）

1. **更新 API 基础 URL**
   - 编辑 `apps/frontend/src/lib/api.ts`
   - 修改 `baseURL` 为后端 URL

   ```typescript
   const api = axios.create({
     baseURL: 'https://your-backend-url/api',
   })
   ```

2. **本地测试**
   - 启动前端开发服务器
   - 验证是否能正常加载数据

## ⏱️ 预计总时间

- 创建账户和项目：10 分钟
- 添加数据库：5 分钟
- 配置后端服务：10 分钟
- 部署和初始化：15 分钟
- 验证部署：5 分钟
- 更新前端配置：3 分钟
- **总计：约 48 分钟**

## 🔍 常见问题

### Q: 部署失败了怎么办？
A: 检查 Railway Logs，常见原因：
- Node.js 版本不兼容
- 依赖安装失败
- 构建命令错误
- 环境变量缺失

### Q: 如何查看实时日志？
A: 在 Railway 项目中，点击后端服务 → "Logs" 标签

### Q: 如何重新部署？
A: 推送代码到 GitHub，Railway 会自动部署。或在 Railway 中手动点击 "Redeploy"

### Q: 如何更新环境变量？
A: 在后端服务 → "Variables" 标签修改，自动重新部署

## 📝 检查清单

部署前：
- [ ] 代码已提交到 GitHub MVP 分支
- [ ] 所有文档已完善
- [ ] 本地测试通过

部署中：
- [ ] Railway 账户已创建
- [ ] 项目已连接到 GitHub
- [ ] PostgreSQL 数据库已添加
- [ ] 环境变量已配置
- [ ] 后端服务已部署

部署后：
- [ ] 健康检查端点可访问
- [ ] 文章列表 API 可访问
- [ ] 分类 API 可访问
- [ ] 标签 API 可访问
- [ ] 前端 API URL 已更新
- [ ] 前端可正常加载数据

## 🎯 下一步

部署完成后：
1. 测试所有 API 端点
2. 更新前端配置
3. 本地测试前后端集成
4. 考虑部署前端到 Vercel
5. 配置自定义域名（可选）
