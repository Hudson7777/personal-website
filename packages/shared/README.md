# Shared Types and Constants

前后端共享的类型定义和常量。

## 📦 使用方法

### 在前端使用

```typescript
import { 
  Article, 
  ArticleCategory,
  User,
  Comment,
  ApiResponse,
  PaginatedResponse 
} from '@shared/types'

import {
  ARTICLE_CATEGORIES,
  CATEGORY_LABELS,
  DEFAULT_PAGE_SIZE,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES
} from '@shared/constants'
```

### 在后端使用

```typescript
import { 
  Article, 
  ArticleCategory,
  User,
  Comment,
  ApiResponse,
  PaginatedResponse 
} from '@shared/types'

import {
  ARTICLE_CATEGORIES,
  CATEGORY_LABELS,
  DEFAULT_PAGE_SIZE,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES
} from '@shared/constants'
```

## 📋 导出内容

### Types（类型定义）

#### 用户相关
- `User` - 用户类型
  - `id: string`
  - `email: string`
  - `password: string`
  - `name: string`
  - `bio?: string`
  - `avatar?: string`
  - `createdAt: Date`
  - `updatedAt: Date`

#### 文章相关
- `Article` - 文章类型
  - `id: string`
  - `title: string`
  - `content: string`
  - `category: ArticleCategory`
  - `tags: string[]`
  - `excerpt?: string`
  - `coverImage?: string`
  - `published: boolean`
  - `author: User`
  - `authorId: string`
  - `comments: Comment[]`
  - `createdAt: Date`
  - `updatedAt: Date`

- `ArticleCategory` - 文章分类枚举
  - `'ai'` - AI 文章
  - `'travel'` - 旅游
  - `'photography'` - 摄影
  - `'history'` - 历史

#### 评论相关
- `Comment` - 评论类型
  - `id: string`
  - `content: string`
  - `author: User`
  - `authorId: string`
  - `article: Article`
  - `articleId: string`
  - `createdAt: Date`
  - `updatedAt: Date`

#### 分类和标签
- `Category` - 分类类型
  - `id: string`
  - `name: string`
  - `description?: string`
  - `createdAt: Date`
  - `updatedAt: Date`

- `Tag` - 标签类型
  - `id: string`
  - `name: string`
  - `createdAt: Date`

#### API 响应
- `ApiResponse<T>` - API 响应类型
  - `success: boolean`
  - `data?: T`
  - `error?: string`
  - `message: string`

- `PaginatedResponse<T>` - 分页响应类型
  - `items: T[]`
  - `total: number`
  - `page: number`
  - `limit: number`
  - `totalPages: number`

- `AuthResponse` - 认证响应类型
  - `token: string`
  - `refreshToken: string`
  - `user: User`

### Constants（常量）

#### 分类常量
- `ARTICLE_CATEGORIES` - 文章分类数组
  ```typescript
  ['ai', 'travel', 'photography', 'history']
  ```

- `CATEGORY_LABELS` - 分类标签映射
  ```typescript
  {
    'ai': 'AI',
    'travel': '旅游',
    'photography': '摄影',
    'history': '历史'
  }
  ```

#### 分页常量
- `DEFAULT_PAGE_SIZE` - 默认分页大小（10）
- `MAX_PAGE_SIZE` - 最大分页大小（100）

#### 文件上传常量
- `MAX_FILE_SIZE` - 最大文件大小（10MB）
- `ALLOWED_IMAGE_TYPES` - 允许的图片类型
  ```typescript
  ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  ```

- `ALLOWED_IMAGE_EXTENSIONS` - 允许的图片扩展名
  ```typescript
  ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  ```

## 🔄 数据流

```
Types（类型定义）
    ↓
前端 ← → 后端
    ↓
Constants（常量）
```

## 📝 最佳实践

1. **始终使用共享类型**
   ```typescript
   // ✅ 好
   import { Article } from '@shared/types'
   const article: Article = { ... }
   
   // ❌ 不好
   const article: any = { ... }
   ```

2. **使用常量而不是硬编码值**
   ```typescript
   // ✅ 好
   import { ARTICLE_CATEGORIES } from '@shared/constants'
   if (ARTICLE_CATEGORIES.includes(category)) { ... }
   
   // ❌ 不好
   if (['ai', 'travel', 'photography', 'history'].includes(category)) { ... }
   ```

3. **保持类型同步**
   - 修改类型时，同时更新前后端
   - 使用 TypeScript 编译检查确保类型安全

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT
