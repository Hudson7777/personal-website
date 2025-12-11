# 部署前端到 Vercel

## 概述
将前端应用部署到 Vercel，实现生产环境访问。同时保持本地开发环境可用。

## 实施步骤

### 步骤 1：创建 Vercel 配置文件

在项目根目录创建 `vercel.json`：

```json
{
  "buildCommand": "pnpm install && pnpm --filter frontend build",
  "outputDirectory": "apps/frontend/dist",
  "installCommand": "pnpm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**说明**：
- `buildCommand`: 安装依赖并构建前端
- `outputDirectory`: 指定构建输出目录
- `rewrites`: 配置 SPA 路由重写，确保前端路由正常工作

### 步骤 2：创建 Vercel 项目配置文件（可选）

在 `apps/frontend` 目录创建 `.vercelignore`：

```
node_modules
.env.local
.env*.local
```

### 步骤 3：更新 Railway 后端 CORS 配置

在 Railway 项目的后端服务环境变量中，更新 `CORS_ORIGIN`：

**当前值**：
```
CORS_ORIGIN=http://localhost:5173
```

**更新为**（支持多个域名）：
```
CORS_ORIGIN=*
```

或者更安全的方式（部署后替换 your-site）：
```
CORS_ORIGIN=https://your-site.vercel.app,http://localhost:5173
```

### 步骤 4：在 Vercel 创建项目

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 选择 `Hudson7777/personal-website` 仓库
5. 点击 "Import"

### 步骤 5：配置 Vercel 项目设置

在 Vercel 项目配置页面：

**Framework Preset**: 选择 "Other"

**Root Directory**: 保持为根目录（不要选择子目录）

**Build and Output Settings**:
- Build Command: `pnpm install && pnpm --filter frontend build`
- Output Directory: `apps/frontend/dist`
- Install Command: `pnpm install`

**Environment Variables**:
添加以下环境变量：
```
VITE_API_URL=https://personal-website-production-79ad.up.railway.app/api
```

### 步骤 6：部署

点击 "Deploy" 按钮，等待部署完成（约 2-3 分钟）。

### 步骤 7：验证部署

部署完成后：
1. 访问 Vercel 提供的 URL（如 `https://personal-website-xxx.vercel.app`）
2. 检查页面是否正常加载
3. 测试 API 调用是否正常（查看浏览器控制台）

### 步骤 8：更新 Railway CORS（如果使用具体域名）

如果步骤 3 使用了通配符 `*`，现在可以更新为具体的 Vercel 域名：

```
CORS_ORIGIN=https://personal-website-xxx.vercel.app,http://localhost:5173
```

### 步骤 9：提交配置文件到 Git

```bash
git add vercel.json apps/frontend/.vercelignore
git commit -m "chore: 添加 Vercel 部署配置"
git push origin MVP
```

## 注意事项

1. **pnpm 版本**：Vercel 会自动检测 `packageManager` 字段使用 pnpm
2. **环境变量**：生产环境的 `VITE_API_URL` 必须在 Vercel 配置
3. **CORS**：确保 Railway 后端允许 Vercel 域名访问
4. **自动部署**：配置完成后，每次推送到 GitHub 都会自动触发 Vercel 部署

## 预期结果

- ✅ 前端部署到 Vercel，可公开访问
- ✅ 前端通过 Railway 后端 API 获取数据
- ✅ 本地开发环境仍然可用
- ✅ 推送代码自动部署到 Vercel


## Todos

- [ ] 创建 vercel.json 配置文件
- [ ] 创建 .vercelignore 文件
- [ ] 更新 Railway 后端 CORS_ORIGIN 环境变量
- [ ] 提交配置文件到 Git
