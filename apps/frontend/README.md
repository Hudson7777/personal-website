# Frontend - Personal Website

现代化的个人主页网站前端应用，采用 React 18 + TypeScript + Tailwind CSS 构建。

## 🎨 设计系统

### 颜色方案
- **主背景**: 深蓝色 (#0f172a)
- **强调色**: 翡翠绿 (#10b981)
- **文字**: 浅灰白 (#f1f5f9)
- **次要背景**: 深灰蓝 (#1e293b)

### 特性
- ✨ 现代化 UI 设计
- 🎯 响应式布局（移动端、平板、桌面）
- ⚡ 流畅动画效果
- 🎨 统一的设计系统
- 📱 移动端优化

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── Container.tsx
│   ├── Section.tsx
│   ├── Grid.tsx
│   ├── ScrollToTop.tsx
│   ├── SocialLinks.tsx
│   ├── Hero.tsx
│   ├── LatestArticles.tsx
│   ├── InterestsSection.tsx
│   ├── ArticleCard.tsx
│   ├── ArticleGrid.tsx
│   └── Layout.tsx
├── pages/               # 页面组件
│   ├── Home.tsx
│   ├── Articles.tsx
│   ├── Travel.tsx
│   ├── Photography.tsx
│   ├── History.tsx
│   └── ArticleDetail.tsx
├── hooks/               # 自定义 Hooks
│   ├── useArticles.ts
│   ├── useArticle.ts
│   └── useProfile.ts
├── services/            # 数据服务层
│   ├── articleService.ts
│   └── profileService.ts
├── data/                # Mock 数据
│   ├── mockArticles.ts
│   └── mockProfile.ts
├── styles/              # 样式和主题
│   └── theme.ts
├── lib/                 # 工具函数
│   ├── utils.ts
│   └── api.ts
├── App.tsx              # 应用入口
└── main.tsx             # React 入口
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:5173

### 构建

```bash
pnpm build
```

### 类型检查

```bash
pnpm type-check
```

### Lint

```bash
pnpm lint
```

## 📄 页面说明

### 首页 (/)
- 英雄区域：个人照片、背景图、简介、社交链接
- 最新文章：展示最新的 3 篇文章
- 兴趣爱好：可扩展的兴趣卡片网格
- 关于我：个人介绍文本

### 分类页面
- `/articles` - AI 文章
- `/travel` - 旅游见闻
- `/photography` - 摄影作品
- `/history` - 历史内容

每个分类页面都采用网格布局，展示该分类下的所有文章。

### 文章详情页 (/:category/:id)
- 文章封面图
- 文章标题、作者、日期、阅读时间
- 文章内容
- 标签
- 相关文章推荐
- 导航按钮

## 🎯 核心功能

### 组件库
- **Button**: 多种样式的按钮组件
- **Card**: 卡片容器组件
- **Badge**: 标签组件
- **Avatar**: 头像组件
- **Container**: 容器组件
- **Section**: 区域组件
- **Grid**: 网格布局组件
- **ScrollToTop**: 返回顶部按钮

### 页面组件
- **Hero**: 英雄区域
- **LatestArticles**: 最新文章展示
- **InterestsSection**: 兴趣爱好展示
- **ArticleCard**: 文章卡片
- **ArticleGrid**: 文章网格

### 数据管理
- **useArticles**: 获取文章列表
- **useArticle**: 获取单篇文章
- **useProfile**: 获取个人信息
- **articleService**: 文章数据服务
- **profileService**: 个人信息服务

## 🎨 动画效果

- **fade-in**: 淡入动画 (0.3s)
- **slide-up**: 向上滑动动画 (0.4s)
- **slide-down**: 向下滑动动画 (0.4s)
- **scale-in**: 缩放进入动画 (0.3s)
- **hover-lift**: 悬停提升效果
- **hover-glow**: 悬停发光效果

## 📱 响应式设计

- **移动端** (< 640px): 单列布局
- **平板端** (640px - 1024px): 两列布局
- **桌面端** (> 1024px): 三列布局

## 🔄 数据流

```
Mock Data (mockArticles.ts, mockProfile.ts)
    ↓
Services (articleService.ts, profileService.ts)
    ↓
Hooks (useArticles.ts, useArticle.ts, useProfile.ts)
    ↓
Components (ArticleCard.tsx, ArticleGrid.tsx, etc.)
    ↓
Pages (Home.tsx, Articles.tsx, ArticleDetail.tsx, etc.)
```

## 🔌 API 集成准备

所有数据服务都已准备好与后端 API 集成。只需在 `services/` 目录下的服务文件中替换 Mock 数据调用为真实 API 调用：

```typescript
// 当前（Mock 数据）
await new Promise(resolve => setTimeout(resolve, 300))
return Promise.resolve(mockArticles)

// 替换为（真实 API）
const response = await fetch(`${this.baseUrl}/articles`)
return response.json()
```

## 🎯 未来改进

- [ ] 搜索功能
- [ ] 文章筛选和排序
- [ ] 评论系统
- [ ] 用户认证
- [ ] 后台管理系统
- [ ] 深色模式切换
- [ ] 国际化支持
- [ ] SEO 优化

## 📦 依赖

- **React 18**: UI 框架
- **React Router**: 路由管理
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架
- **Zustand**: 状态管理
- **Axios**: HTTP 客户端
- **TipTap**: 富文本编辑器（未来使用）

## 🚀 部署

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 设置构建命令：`pnpm build`
3. 设置输出目录：`dist`
4. 自动部署

## 📝 开发规范

- 使用 TypeScript 进行类型安全
- 遵循 ESLint 规则
- 使用 Tailwind CSS 进行样式
- 组件使用 React.forwardRef 支持 ref
- 使用自定义 Hooks 管理数据逻辑
- 使用 Mock 数据便于开发和测试

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT
