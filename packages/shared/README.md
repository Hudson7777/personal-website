# Shared Types and Constants

前后端共享的类型定义和常量。

## 使用方法

### 在前端使用

```typescript
import { Article, ArticleCategory } from '@shared/types'
```

### 在后端使用

```typescript
import { Article, ArticleCategory } from '@shared/types'
```

## 导出内容

### Types
- `User` - 用户类型
- `Article` - 文章类型
- `ArticleCategory` - 文章分类
- `ApiResponse` - API 响应类型
- `PaginatedResponse` - 分页响应类型
- `AuthResponse` - 认证响应类型

### Constants
- `ARTICLE_CATEGORIES` - 文章分类常量
- `CATEGORY_LABELS` - 分类标签
- `DEFAULT_PAGE_SIZE` - 默认分页大小
- `MAX_FILE_SIZE` - 最大文件大小
- `ALLOWED_IMAGE_TYPES` - 允许的图片类型
