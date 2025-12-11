# 部署检查清单

## 部署前检查

### 代码准备
- [ ] 所有代码已提交到 GitHub
- [ ] 没有未提交的更改
- [ ] 分支是 `MVP`
- [ ] TypeScript 编译无错误：`pnpm type-check`
- [ ] 代码格式正确：`pnpm lint`

### 本地测试
- [ ] 后端本地运行正常：`pnpm dev`
- [ ] 前端本地运行正常：`pnpm dev`
- [ ] API 端点可访问
- [ ] 数据库连接正常
- [ ] 没有控制台错误

### 环境配置
- [ ] `.env` 文件已创建（本地开发）
- [ ] `.env.production` 文件已创建（生产参考）
- [ ] `railway.json` 已创建
- [ ] `DEPLOYMENT.md` 已创建

## Railway 部署步骤

### 账户和项目设置
- [ ] Railway 账户已创建
- [ ] GitHub 已授权给 Railway
- [ ] 项目已在 Railway 上创建
- [ ] 仓库已连接

### 数据库配置
- [ ] PostgreSQL 数据库已添加
- [ ] 数据库连接字符串已获取
- [ ] 数据库名称确认为 `railway`

### 后端服务配置
- [ ] 后端服务已创建
- [ ] Root Directory 设置为 `apps/backend`
- [ ] Build Command 设置为 `pnpm install && pnpm build`
- [ ] Start Command 设置为 `pnpm start`

### 环境变量配置
- [ ] `DATABASE_URL` 已设置（PostgreSQL 连接字符串）
- [ ] `NODE_ENV` 设置为 `production`
- [ ] `PORT` 设置为 `3001`
- [ ] `CORS_ORIGIN` 已设置
- [ ] `JWT_SECRET` 已设置为强密钥

### 部署和初始化
- [ ] 后端已部署成功
- [ ] 部署日志无错误
- [ ] 数据库迁移已运行：`railway run pnpm db:push`
- [ ] 种子数据已初始化：`railway run pnpm db:seed`

### 验证
- [ ] 健康检查端点可访问：`GET /api/health`
- [ ] 文章列表 API 可访问：`GET /api/articles`
- [ ] 分类列表 API 可访问：`GET /api/categories`
- [ ] 标签列表 API 可访问：`GET /api/tags`
- [ ] 后端 URL 已获取

## 前端配置

### 更新 API 地址
- [ ] 获取后端 URL（格式：`https://xxx.railway.app`）
- [ ] 更新 `apps/frontend/src/lib/api.ts` 中的 `baseURL`
- [ ] 或配置环境变量 `VITE_API_URL`

### 本地测试
- [ ] 前端可以连接到生产后端
- [ ] 文章列表可以正常加载
- [ ] 没有 CORS 错误
- [ ] 没有 API 错误

## 生产环境验证

### 功能测试
- [ ] 首页可以正常加载
- [ ] 文章列表可以正常显示
- [ ] 可以按分类筛选文章
- [ ] 可以查看文章详情
- [ ] 可以查看相关文章

### 性能检查
- [ ] 页面加载速度正常
- [ ] API 响应时间正常
- [ ] 没有 N+1 查询问题

### 安全检查
- [ ] CORS 配置正确
- [ ] JWT 密钥已更改
- [ ] 数据库密码已更改
- [ ] 没有敏感信息在日志中

## 故障排查

### 部署失败
- [ ] 检查构建日志：Railway Logs
- [ ] 检查 `pnpm install` 是否成功
- [ ] 检查 `pnpm build` 是否成功
- [ ] 检查 Node.js 版本兼容性

### 数据库连接失败
- [ ] 检查 `DATABASE_URL` 是否正确
- [ ] 检查数据库是否已创建
- [ ] 检查网络连接
- [ ] 运行 `railway run pnpm db:push` 检查迁移

### API 无法访问
- [ ] 检查后端服务是否运行
- [ ] 检查 PORT 是否正确
- [ ] 检查日志中的错误信息
- [ ] 检查 CORS 配置

### 前端无法连接后端
- [ ] 检查 API 基础 URL 是否正确
- [ ] 检查 CORS_ORIGIN 是否包含前端 URL
- [ ] 检查网络连接
- [ ] 检查浏览器控制台错误

## 完成后

- [ ] 记录后端 URL
- [ ] 记录数据库连接信息
- [ ] 更新项目文档
- [ ] 通知团队成员
- [ ] 备份数据库连接字符串

## 回滚计划

如果出现严重问题：
1. 在 Railway 中找到上一个成功的部署
2. 点击 "Redeploy"
3. 等待部署完成
4. 验证功能是否恢复

## 联系方式

- Railway 支持：https://railway.app/support
- 项目 GitHub：https://github.com/your-username/personal-website
