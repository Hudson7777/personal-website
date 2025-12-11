# 认证、评论、SEO 三功能实现计划

## 📊 整体架构

### 第一阶段：数据库和后端基础
1. 扩展 Comment 模型支持回复
2. 实现认证系统（登录、Token 管理）
3. 实现评论 API（CRUD + 编辑）
4. 实现 SEO 端点（Sitemap）

### 第二阶段：前端实现
1. 登录页面和受保护路由
2. 评论组件（列表、表单、树形结构）
3. Meta 标签集成（所有页面）
4. 管理员后台基础框架

---

## 🔧 详细实现步骤

### **模块 1：数据库迁移**

#### 1.1 修改 Prisma Schema
**文件**: `packages/database/prisma/schema.prisma`

需要修改的内容：
- Comment 模型添加 `parentId` 字段（可选，用于回复）
- Comment 模型添加 `updatedAt` 字段（已有，用于编辑）
- 添加自关联关系支持回复

#### 1.2 执行数据库迁移
运行命令：
```bash
pnpm db:push  # 开发环境
# 或
pnpm db:migrate  # 生产环境
```

---

### **模块 2：后端认证系统**

#### 2.1 创建认证控制器
**文件**: `apps/backend/src/controllers/authController.ts`

需要实现：
- `login(email, password)` - 验证邮箱密码，返回 tokens
- `refresh(refreshToken)` - 使用 refreshToken 获取新 accessToken
- `logout()` - 可选，用于前端清理

#### 2.2 创建认证路由
**文件**: `apps/backend/src/routes/auth.ts`

需要实现：
- `POST /api/auth/login` - 登录端点
- `POST /api/auth/refresh` - Token 刷新端点

#### 2.3 增强权限中间件
**文件**: `apps/backend/src/middleware/auth.ts`

需要修改：
- 添加 `adminMiddleware` 检查是否为管理员邮箱
- 在文章的 POST/PUT/DELETE 路由上应用此中间件

#### 2.4 创建管理员初始化脚本
**文件**: `apps/backend/src/scripts/init-admin.ts`

需要实现：
- 检查三个管理员邮箱是否存在
- 不存在则创建，密码为 `XuhaoraN2000`（bcrypt 加密）
- 运行命令：`pnpm db:init-admin`

#### 2.5 更新环境变量
**文件**: `apps/backend/.env.example` 和 `.env`

需要添加：
```
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=30m
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=90d
ADMIN_EMAILS=yanyurrnpingsheng@gmail.com,3158525512@qq.com,haoran7.xu@gmail.com
```

---

### **模块 3：后端评论系统**

#### 3.1 创建评论控制器
**文件**: `apps/backend/src/controllers/commentController.ts`

需要实现：
- `getComments(articleId)` - 获取文章的所有评论（树形结构）
- `createComment(articleId, content, parentId)` - 创建评论或回复
- `updateComment(commentId, content)` - 编辑评论（只有作者可编辑）
- `deleteComment(commentId)` - 删除评论（只有作者或管理员可删除）

#### 3.2 创建评论路由
**文件**: `apps/backend/src/routes/comments.ts`

需要实现：
- `GET /api/articles/:articleId/comments` - 获取评论列表
- `POST /api/articles/:articleId/comments` - 创建评论（需认证）
- `PUT /api/articles/:articleId/comments/:commentId` - 编辑评论（需认证）
- `DELETE /api/articles/:articleId/comments/:commentId` - 删除评论（需认证）

#### 3.3 创建评论服务
**文件**: `apps/backend/src/services/commentService.ts`

需要实现：
- 评论的 CRUD 操作
- 树形结构转换（将平铺的评论转换为树形）
- 权限检查逻辑

#### 3.4 创建评论验证 Schema
**文件**: `apps/backend/src/schemas/commentSchema.ts`

需要定义：
- `createCommentSchema` - 验证创建评论的数据
- `updateCommentSchema` - 验证编辑评论的数据

---

### **模块 4：后端 SEO 优化**

#### 4.1 创建 Sitemap 端点
**文件**: `apps/backend/src/controllers/seoController.ts`

需要实现：
- `getSitemap()` - 生成 XML 格式的 Sitemap
- 包含所有已发布文章的 URL
- 包含首页、分类页面的 URL

#### 4.2 创建 SEO 路由
**文件**: `apps/backend/src/routes/seo.ts`

需要实现：
- `GET /sitemap.xml` - 返回 Sitemap

#### 4.3 创建 robots.txt
**文件**: `apps/backend/public/robots.txt`

内容：
```
User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
```

---

### **模块 5：前端认证系统**

#### 5.1 创建登录页面
**文件**: `apps/frontend/src/pages/AdminLogin.tsx`

需要实现：
- 邮箱和密码输入框
- 登录按钮
- 错误提示
- 调用 `/api/auth/login` 端点
- 登录成功后重定向到 `/admin/dashboard`

#### 5.2 创建受保护路由组件
**文件**: `apps/frontend/src/components/ProtectedRoute.tsx`

需要实现：
- 检查 token 是否存在
- 不存在则重定向到 `/admin/login`
- 存在则渲染子组件

#### 5.3 更新路由配置
**文件**: `apps/frontend/src/App.tsx`

需要修改：
- 添加 `/admin/login` 路由
- 添加 `/admin/dashboard` 路由（受保护）
- 其他管理员路由（后续添加）

#### 5.4 更新认证 Store
**文件**: `apps/frontend/src/stores/auth.ts`

需要修改：
- 完善 `login` 方法，调用真实 API
- 添加 `refreshToken` 存储和刷新逻辑
- 添加 `isAdmin` 计算属性

---

### **模块 6：前端评论系统**

#### 6.1 创建评论列表组件
**文件**: `apps/frontend/src/components/CommentList.tsx`

需要实现：
- 树形结构显示评论和回复
- 支持展开/收起回复
- 显示评论者信息、时间、内容
- 编辑和删除按钮（仅对作者显示）

#### 6.2 创建评论表单组件
**文件**: `apps/frontend/src/components/CommentForm.tsx`

需要实现：
- 文本输入框
- 提交按钮
- 未登录时显示登录提示
- 支持回复某个评论（显示"回复 @用户名"）

#### 6.3 创建评论编辑组件
**文件**: `apps/frontend/src/components/CommentEditor.tsx`

需要实现：
- 编辑模式的文本框
- 保存和取消按钮
- 调用更新 API

#### 6.4 集成到文章详情页
**文件**: `apps/frontend/src/pages/ArticleDetail.tsx`

需要修改：
- 在文章内容下方添加评论区
- 显示评论列表和表单
- 处理评论的加载、创建、编辑、删除

#### 6.5 创建评论服务
**文件**: `apps/frontend/src/services/commentService.ts`

需要实现：
- `getComments(articleId)` - 获取评论列表
- `createComment(articleId, content, parentId)` - 创建评论
- `updateComment(commentId, content)` - 编辑评论
- `deleteComment(commentId)` - 删除评论

---

### **模块 7：前端 SEO 优化**

#### 7.1 安装 React Helmet
**文件**: `apps/frontend/package.json`

需要添加依赖：
```json
"react-helmet-async": "^1.3.0"
```

#### 7.2 创建 SEO 组件
**文件**: `apps/frontend/src/components/SEO.tsx`

需要实现：
- 接收 `title`, `description`, `image`, `url` 等参数
- 使用 React Helmet 设置 Meta 标签
- 支持 Open Graph 标签

#### 7.3 更新首页 Meta 标签
**文件**: `apps/frontend/src/pages/Home.tsx`

需要修改：
- 添加 SEO 组件
- 设置网站标题、描述、图片

#### 7.4 更新分类页面 Meta 标签
**文件**: `apps/frontend/src/pages/Articles.tsx`, `Travel.tsx`, `Photography.tsx`, `History.tsx`

需要修改：
- 添加 SEO 组件
- 设置分类标题、描述

#### 7.5 更新文章详情页 Meta 标签
**文件**: `apps/frontend/src/pages/ArticleDetail.tsx`

需要修改：
- 添加 SEO 组件
- 动态设置文章标题、描述、图片

#### 7.6 更新 App.tsx
**文件**: `apps/frontend/src/App.tsx`

需要修改：
- 包装 App 组件在 `HelmetProvider` 中

---

### **模块 8：管理员后台基础框架**

#### 8.1 创建后台布局
**文件**: `apps/frontend/src/components/AdminLayout.tsx`

需要实现：
- 侧边栏导航
- 顶部栏（显示用户信息、登出按钮）
- 主内容区域

#### 8.2 创建后台首页
**文件**: `apps/frontend/src/pages/AdminDashboard.tsx`

需要实现：
- 显示统计信息（文章数、评论数等）
- 快速操作链接

#### 8.3 创建文章管理页面
**文件**: `apps/frontend/src/pages/AdminArticles.tsx`

需要实现：
- 文章列表（表格形式）
- 创建、编辑、删除按钮
- 发布/草稿切换

---

## 📈 实现顺序

1. **数据库迁移** - 添加 Comment.parentId 字段
2. **后端认证** - 登录、Token 管理、权限中间件
3. **后端评论** - 评论 CRUD、树形结构
4. **后端 SEO** - Sitemap 生成
5. **前端认证** - 登录页、受保护路由、Store 更新
6. **前端评论** - 评论组件、集成到文章详情页
7. **前端 SEO** - Meta 标签集成
8. **管理员后台** - 基础框架和文章管理

---

## 🎯 关键技术细节

### Token 配置
- **AccessToken**: 30 分钟过期
- **RefreshToken**: 90 天过期
- 前端自动刷新 AccessToken（在 401 时）

### 评论树形结构
- 后端返回平铺的评论列表 + parentId
- 前端负责转换为树形结构
- 支持无限层级嵌套

### 权限检查
- 管理员邮箱列表存储在环境变量
- 中间件检查 JWT 中的 email 是否在列表中
- 文章的 POST/PUT/DELETE 需要管理员权限
- 评论的 PUT/DELETE 需要是作者或管理员

### SEO Meta 标签
- 首页：网站标题、描述、logo
- 分类页：分类标题、描述
- 文章页：文章标题、描述、封面图、作者信息
- 所有页面：Open Graph 标签用于社交分享

## Todos

- [ ] 修改 Prisma Schema，添加 Comment.parentId 字段支持回复，执行数据库迁移
- [ ] 创建认证控制器和路由，实现登录和 Token 刷新端点
- [ ] 增强认证中间件，添加 adminMiddleware 检查管理员权限
- [ ] 创建管理员初始化脚本，设置三个管理员账户
- [ ] 创建评论控制器、服务、路由，实现评论 CRUD 和树形结构
- [ ] 创建 SEO 控制器和路由，实现 Sitemap 生成和 robots.txt
- [ ] 创建登录页面、受保护路由组件、更新认证 Store
- [ ] 创建评论组件（列表、表单、编辑器），集成到文章详情页
- [ ] 安装 React Helmet，创建 SEO 组件，更新所有页面的 Meta 标签
- [ ] 创建管理员后台基础框架（布局、首页、文章管理页面）
