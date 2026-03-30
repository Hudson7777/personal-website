# Website Improvements v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up technical debt (orphaned files, duplicated pages, redundant components, `as any` casts) and add missing production infrastructure (Toast notifications, ErrorBoundary, 404 page).

**Architecture:** Six independent tasks executed sequentially on the frontend only (`apps/frontend/src`). Tasks 1–3 are pure deletions/consolidations; Tasks 4–6 add new infrastructure. No backend changes required.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v3, Zustand, React Router v6

---

## File Map

**Delete:**
- `apps/frontend/src/styles/theme.ts` — orphaned, never imported
- `apps/frontend/src/components/LatestArticles.tsx` — duplicate of ArticleGrid+ArticleCard

**Create:**
- `apps/frontend/src/pages/CategoryPage.tsx` — shared page for Travel/Photography/History
- `apps/frontend/src/stores/toast.ts` — Zustand toast queue
- `apps/frontend/src/hooks/useToast.ts` — convenience hook
- `apps/frontend/src/components/ToastContainer.tsx` — renders active toasts
- `apps/frontend/src/components/ErrorBoundary.tsx` — React error boundary
- `apps/frontend/src/pages/NotFound.tsx` — 404 page

**Modify:**
- `apps/frontend/src/pages/Travel.tsx` — delegate to CategoryPage
- `apps/frontend/src/pages/Photography.tsx` — delegate to CategoryPage
- `apps/frontend/src/pages/History.tsx` — delegate to CategoryPage
- `apps/frontend/src/pages/Home.tsx` — replace LatestArticles with ArticleGrid
- `apps/frontend/src/components/Badge.tsx` — export BadgeVariant type
- `apps/frontend/src/components/ArticleCard.tsx` — use BadgeVariant, remove `as any`
- `apps/frontend/src/pages/ArticleDetail.tsx` — use BadgeVariant, remove `as any`
- `apps/frontend/src/pages/AdminArticleEditor.tsx` — use proper types, remove `as any`
- `apps/frontend/src/components/Layout.tsx` — mount ToastContainer
- `apps/frontend/src/pages/AdminArticles.tsx` — use useToast for feedback
- `apps/frontend/src/pages/AdminComments.tsx` — use useToast for feedback
- `apps/frontend/src/App.tsx` — wrap with ErrorBoundary, add NotFound route

---

## Task 1: Delete orphaned styles/theme.ts

**Files:**
- Delete: `apps/frontend/src/styles/theme.ts`

- [ ] **Step 1: Verify the file has zero imports**

```bash
cd /Users/haoran/Desktop/personal-website
grep -r "styles/theme" apps/frontend/src/
```

Expected: no output (zero matches).

- [ ] **Step 2: Delete the file**

```bash
rm apps/frontend/src/styles/theme.ts
```

- [ ] **Step 3: Verify the build still passes**

```bash
cd apps/frontend && npx tsc --noEmit
```

Expected: no errors related to theme.ts.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove orphaned styles/theme.ts (never imported, contradicts Tailwind theme)"
```

---

## Task 2: Create CategoryPage and simplify Travel/Photography/History

**Files:**
- Create: `apps/frontend/src/pages/CategoryPage.tsx`
- Modify: `apps/frontend/src/pages/Travel.tsx`
- Modify: `apps/frontend/src/pages/Photography.tsx`
- Modify: `apps/frontend/src/pages/History.tsx`

- [ ] **Step 1: Create CategoryPage.tsx**

Create `apps/frontend/src/pages/CategoryPage.tsx`:

```tsx
import { useArticles } from '@/hooks/useArticles'
import { ArticleCategory } from '@/data/mockArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'
import SEO from '@/components/SEO'

interface CategoryPageProps {
  category: ArticleCategory
  title: string
  subtitle: string
  seoDescription: string
  emptyMessage: string
}

export default function CategoryPage({
  category,
  title,
  subtitle,
  seoDescription,
  emptyMessage,
}: CategoryPageProps) {
  const { articles, isLoading } = useArticles({ category })

  return (
    <div>
      <SEO
        title={title}
        description={seoDescription}
        url={`/${category}`}
        type="website"
      />

      <Section title={title} subtitle={subtitle} padding="lg">
        <Container>
          <ArticleGrid
            articles={articles}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />
        </Container>
      </Section>
    </div>
  )
}
```

- [ ] **Step 2: Rewrite Travel.tsx**

Replace the entire content of `apps/frontend/src/pages/Travel.tsx`:

```tsx
import CategoryPage from './CategoryPage'

export default function Travel() {
  return (
    <CategoryPage
      category="travel"
      title="Travel"
      subtitle="Adventures and insights from around the world"
      seoDescription="Adventures and insights from around the world. Explore travel stories and experiences."
      emptyMessage="No travel stories yet. Check back soon!"
    />
  )
}
```

- [ ] **Step 3: Rewrite Photography.tsx**

Replace the entire content of `apps/frontend/src/pages/Photography.tsx`:

```tsx
import CategoryPage from './CategoryPage'

export default function Photography() {
  return (
    <CategoryPage
      category="photography"
      title="Photography"
      subtitle="Visual stories and photography techniques"
      seoDescription="Visual stories and photography techniques. Discover photography insights and visual narratives."
      emptyMessage="No photography content yet. Check back soon!"
    />
  )
}
```

- [ ] **Step 4: Rewrite History.tsx**

Replace the entire content of `apps/frontend/src/pages/History.tsx`:

```tsx
import CategoryPage from './CategoryPage'

export default function History() {
  return (
    <CategoryPage
      category="history"
      title="History"
      subtitle="Historical insights and perspectives"
      seoDescription="Historical insights and perspectives. Explore historical topics and narratives."
      emptyMessage="No history content yet. Check back soon!"
    />
  )
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd /Users/haoran/Desktop/personal-website/apps/frontend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Verify pages render correctly in browser**

Open http://localhost:5175/travel, http://localhost:5175/photography, http://localhost:5175/history — each should show its section title and article grid.

- [ ] **Step 7: Commit**

```bash
cd /Users/haoran/Desktop/personal-website
git add apps/frontend/src/pages/CategoryPage.tsx apps/frontend/src/pages/Travel.tsx apps/frontend/src/pages/Photography.tsx apps/frontend/src/pages/History.tsx
git commit -m "refactor: extract CategoryPage, simplify Travel/Photography/History to one-liners"
```

---

## Task 3: Delete LatestArticles, use ArticleGrid in Home

**Files:**
- Modify: `apps/frontend/src/pages/Home.tsx`
- Delete: `apps/frontend/src/components/LatestArticles.tsx`

- [ ] **Step 1: Update Home.tsx — replace LatestArticles with ArticleGrid**

Replace the entire content of `apps/frontend/src/pages/Home.tsx`:

```tsx
import { useProfile } from '@/hooks/useProfile'
import { useArticles } from '@/hooks/useArticles'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'
import InterestsSection from '@/components/InterestsSection'
import SEO from '@/components/SEO'

export default function Home() {
  const { profile, interests, isLoading: profileLoading } = useProfile()
  const { articles, isLoading: articlesLoading } = useArticles({ limit: 3 })

  if (profileLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-80 bg-muted" />
      </div>
    )
  }

  if (!profile) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load profile</p>
        </div>
      </Container>
    )
  }

  return (
    <div>
      <SEO
        title="Personal"
        description="A personal website showcasing thoughts on AI, travel, photography, and history."
        url="/"
        type="website"
      />

      {/* Hero — gradient fades into unified page background, no dividers */}
      <Hero profile={profile} />

      {/* Latest Articles */}
      <Section
        title="Latest Articles"
        subtitle="Explore my recent thoughts and insights"
        padding="lg"
      >
        <Container>
          <ArticleGrid articles={articles} isLoading={articlesLoading} />
        </Container>
      </Section>

      {/* Interests */}
      <Section
        title="Interests & Hobbies"
        subtitle="Discover what I'm passionate about"
        padding="lg"
      >
        <Container>
          <InterestsSection interests={interests} isLoading={profileLoading} />
        </Container>
      </Section>

      {/* About Me */}
      <Section title="About Me" padding="lg">
        <Container size="sm">
          <div className="card-base p-8 sm:p-10 space-y-5 reveal" style={{ transitionDelay: '80ms' }}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm passionate about exploring the intersection of technology and human experience. Through this website, I share my journey and insights across multiple domains.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Whether it's discussing the latest AI developments, sharing travel stories, showcasing photography, or exploring historical topics, I aim to provide thoughtful and engaging content that inspires and educates.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Feel free to explore my content, connect with me on social media, or reach out if you'd like to collaborate or discuss any topics that interest you.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}
```

- [ ] **Step 2: Delete LatestArticles.tsx**

```bash
rm /Users/haoran/Desktop/personal-website/apps/frontend/src/components/LatestArticles.tsx
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/haoran/Desktop/personal-website/apps/frontend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify homepage renders correctly**

Open http://localhost:5175/ — the "Latest Articles" section should show 3 article cards in a grid.

- [ ] **Step 5: Commit**

```bash
cd /Users/haoran/Desktop/personal-website
git add apps/frontend/src/pages/Home.tsx
git rm apps/frontend/src/components/LatestArticles.tsx
git commit -m "refactor: remove LatestArticles component, use ArticleGrid in Home"
```

---

## Task 4: Fix type safety — export BadgeVariant, eliminate `as any`

**Files:**
- Modify: `apps/frontend/src/components/Badge.tsx`
- Modify: `apps/frontend/src/components/ArticleCard.tsx`
- Modify: `apps/frontend/src/pages/ArticleDetail.tsx`
- Modify: `apps/frontend/src/pages/AdminArticleEditor.tsx`

- [ ] **Step 1: Export BadgeVariant from Badge.tsx**

Replace the entire content of `apps/frontend/src/components/Badge.tsx`:

```tsx
import React from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants: Record<BadgeVariant, string> = {
      primary: 'bg-accent/10 text-accent border border-accent/20',
      secondary: 'bg-muted text-muted-foreground border border-border',
      success: 'bg-mist-100 text-mist-500 border border-mist-200',
      warning: 'bg-apricot-100 text-apricot-400 border border-apricot-200',
      error: 'bg-lavender-100 text-lavender-400 border border-lavender-200',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-colors duration-base',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
```

- [ ] **Step 2: Fix ArticleCard.tsx — use BadgeVariant**

Replace the entire content of `apps/frontend/src/components/ArticleCard.tsx`:

```tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Article } from '@/data/mockArticles'
import Card, { CardBody } from './Card'
import Badge, { BadgeVariant } from './Badge'
import Avatar from './Avatar'

interface ArticleCardProps {
  article: Article
  variant?: 'grid' | 'list'
}

const categoryBadgeVariant: Record<string, BadgeVariant> = {
  ai:          'primary',
  travel:      'success',
  photography: 'warning',
  history:     'error',
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'grid' }) => {
  const badgeVariant = categoryBadgeVariant[article.category] ?? 'secondary'

  if (variant === 'list') {
    return (
      <Link to={`/articles/${article.id}`} className="group">
        {/* card-left-bar: sage line slides from 0 → 100% on hover */}
        <Card hoverable className="overflow-hidden card-left-bar">
          <div className="flex gap-6 p-6">
            {/* Cover Image */}
            <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-muted">
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
                  loading="lazy"
                />
              )}
            </div>

            {/* Content */}
            <CardBody className="flex-1 p-0">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={badgeVariant} size="sm">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </Badge>
                {article.readTime != null && (
                  <span className="text-xs text-muted-foreground">{article.readTime} min</span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-base line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar
                    src={article.author.avatar ?? undefined}
                    alt={article.author.name}
                    size="sm"
                    fallback={article.author.name.charAt(0)}
                  />
                  <span className="text-sm text-muted-foreground">{article.author.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardBody>
          </div>
        </Card>
      </Link>
    )
  }

  // Grid variant
  return (
    <Link to={`/articles/${article.id}`} className="group">
      {/* card-left-bar: sage line slides from 0 → 100% on hover */}
      <Card hoverable className="h-full flex flex-col overflow-hidden card-left-bar">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
              loading="lazy"
            />
          )}
          {/* Subtle bottom-fade for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <CardBody className="flex-1 flex flex-col">
          <div className="mb-3">
            <Badge variant={badgeVariant} size="sm">
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-base">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar
                src={article.author.avatar ?? undefined}
                alt={article.author.name}
                size="sm"
                fallback={article.author.name.charAt(0)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {article.author.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {article.readTime != null && (
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {article.readTime}m
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

export default ArticleCard
```

- [ ] **Step 3: Fix ArticleDetail.tsx — use BadgeVariant, remove `as any`**

In `apps/frontend/src/pages/ArticleDetail.tsx`:

Change the Badge import line (line 10) from:
```tsx
import Badge from '@/components/Badge'
```
to:
```tsx
import Badge, { BadgeVariant } from '@/components/Badge'
```

Change the categoryColors map type (around line 32) from:
```tsx
const categoryColors: Record<string, string> = {
```
to:
```tsx
const categoryColors: Record<string, BadgeVariant> = {
```

Remove the `as any` cast (around line 158) from:
```tsx
variant={categoryColors[article.category] as any}
```
to:
```tsx
variant={categoryColors[article.category]}
```

- [ ] **Step 4: Fix AdminArticleEditor.tsx — use proper types, remove `as any`**

In `apps/frontend/src/pages/AdminArticleEditor.tsx`, add this import after the existing imports:

```tsx
import type { CreateArticleInput, UpdateArticleInput } from '@personal-website/shared'
```

Find the two `as any` casts in `handleSave` (around line 187–189) and replace:
```tsx
// Before:
if (isEditing && id) {
  await articleService.updateArticle(id, payload as any)
} else {
  await articleService.createArticle(payload as any)
}

// After:
if (isEditing && id) {
  await articleService.updateArticle(id, payload as UpdateArticleInput)
} else {
  await articleService.createArticle(payload as CreateArticleInput)
}
```

- [ ] **Step 5: Verify TypeScript compiles with zero errors**

```bash
cd /Users/haoran/Desktop/personal-website/apps/frontend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Verify no remaining `as any` in src**

```bash
grep -r "as any" /Users/haoran/Desktop/personal-website/apps/frontend/src/
```

Expected: no output.

- [ ] **Step 7: Commit**

```bash
cd /Users/haoran/Desktop/personal-website
git add apps/frontend/src/components/Badge.tsx apps/frontend/src/components/ArticleCard.tsx apps/frontend/src/pages/ArticleDetail.tsx apps/frontend/src/pages/AdminArticleEditor.tsx
git commit -m "fix: export BadgeVariant type, eliminate all 'as any' casts"
```

---

## Task 5: Add Toast notification system

**Files:**
- Create: `apps/frontend/src/stores/toast.ts`
- Create: `apps/frontend/src/hooks/useToast.ts`
- Create: `apps/frontend/src/components/ToastContainer.tsx`
- Modify: `apps/frontend/src/components/Layout.tsx`
- Modify: `apps/frontend/src/pages/AdminArticles.tsx`
- Modify: `apps/frontend/src/pages/AdminComments.tsx`
- Modify: `apps/frontend/src/pages/AdminArticleEditor.tsx`

- [ ] **Step 1: Create stores/toast.ts**

Create `apps/frontend/src/stores/toast.ts`:

```ts
import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (message: string, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type, duration = 3500) => {
    const id = Math.random().toString(36).slice(2)
    set((state) => ({ toasts: [...state.toasts, { id, message, type, duration }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, duration)
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
```

- [ ] **Step 2: Create hooks/useToast.ts**

Create `apps/frontend/src/hooks/useToast.ts`:

```ts
import { useToastStore } from '@/stores/toast'

export function useToast() {
  const addToast = useToastStore((s) => s.addToast)

  return {
    success: (message: string) => addToast(message, 'success'),
    error:   (message: string) => addToast(message, 'error'),
    info:    (message: string) => addToast(message, 'info'),
  }
}
```

- [ ] **Step 3: Create components/ToastContainer.tsx**

Create `apps/frontend/src/components/ToastContainer.tsx`:

```tsx
import { useToastStore, Toast } from '@/stores/toast'

const typeStyles: Record<Toast['type'], string> = {
  success: 'bg-sage-50 border-sage-300 text-sage-800',
  error:   'bg-lavender-100 border-lavender-300 text-lavender-800',
  info:    'bg-mist-100 border-mist-300 text-mist-700',
}

const typeIcons: Record<Toast['type'], string> = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg
            text-sm font-medium max-w-sm pointer-events-auto
            animate-slide-up
            ${typeStyles[toast.type]}
          `}
        >
          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-current/10">
            {typeIcons[toast.type]}
          </span>
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 ml-1 opacity-50 hover:opacity-100 transition-opacity text-base leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Mount ToastContainer in Layout.tsx**

In `apps/frontend/src/components/Layout.tsx`, add the import at the top (after existing imports):

```tsx
import ToastContainer from './ToastContainer'
```

Add `<ToastContainer />` just before the closing `</div>` of the root element (after `<ScrollToTop threshold={300} />`):

```tsx
      {/* Scroll to Top Button */}
      <ScrollToTop threshold={300} />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  )
```

- [ ] **Step 5: Update AdminArticles.tsx — add toast feedback**

In `apps/frontend/src/pages/AdminArticles.tsx`:

Add import after existing imports:
```tsx
import { useToast } from '@/hooks/useToast'
```

Add inside the component (after `useState` declarations):
```tsx
const toast = useToast()
```

Remove `const [error, setError] = useState('')` and all `setError(...)` calls and the error JSX block.

Replace `handleDelete`:
```tsx
const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this article?')) return

  try {
    await api.delete(`/articles/${id}`)
    setArticles(articles.filter(a => a.id !== id))
    toast.success('Article deleted successfully')
  } catch (err) {
    toast.error(err instanceof Error ? err.message : 'Failed to delete article')
  }
}
```

Replace `handleTogglePublish`:
```tsx
const handleTogglePublish = async (id: string, published: boolean) => {
  try {
    await api.put(`/articles/${id}`, { published: !published })
    setArticles(articles.map(a => (a.id === id ? { ...a, published: !published } : a)))
    toast.success(published ? 'Article unpublished' : 'Article published')
  } catch (err) {
    toast.error(err instanceof Error ? err.message : 'Failed to update article')
  }
}
```

- [ ] **Step 6: Update AdminComments.tsx — add toast feedback**

In `apps/frontend/src/pages/AdminComments.tsx`:

Add import after existing imports:
```tsx
import { useToast } from '@/hooks/useToast'
```

Add inside the component:
```tsx
const toast = useToast()
```

Remove `const [error, setError] = useState('')` and all `setError(...)` calls and the error JSX block.

Replace `handleDelete`:
```tsx
const handleDelete = async (id: string) => {
  if (!confirm('Delete this comment and all its replies?')) return
  try {
    await api.delete(`/admin/comments/${id}`)
    setComments(prev => prev.filter(c => c.id !== id))
    toast.success('Comment deleted')
  } catch (err) {
    toast.error(err instanceof Error ? err.message : 'Delete failed')
  }
}
```

- [ ] **Step 7: Update AdminArticleEditor.tsx — add toast feedback**

In `apps/frontend/src/pages/AdminArticleEditor.tsx`:

Add import after existing imports:
```tsx
import { useToast } from '@/hooks/useToast'
```

Add inside the component:
```tsx
const toast = useToast()
```

In `handleSave`, update the try/catch block:
```tsx
try {
  if (isEditing && id) {
    await articleService.updateArticle(id, payload as UpdateArticleInput)
  } else {
    await articleService.createArticle(payload as CreateArticleInput)
  }
  toast.success(isEditing ? 'Article updated successfully' : 'Article created successfully')
  navigate('/admin/articles')
} catch (err) {
  const message = err instanceof Error ? err.message : 'Save failed'
  setError(message)
  toast.error(message)
} finally {
  setIsSaving(false)
}
```

- [ ] **Step 8: Verify TypeScript compiles**

```bash
cd /Users/haoran/Desktop/personal-website/apps/frontend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 9: Test toasts manually**

Open http://localhost:5175/admin/articles (after logging in). Toggle publish on an article — a green toast should appear bottom-right and auto-dismiss after ~3.5 seconds.

- [ ] **Step 10: Commit**

```bash
cd /Users/haoran/Desktop/personal-website
git add apps/frontend/src/stores/toast.ts apps/frontend/src/hooks/useToast.ts apps/frontend/src/components/ToastContainer.tsx apps/frontend/src/components/Layout.tsx apps/frontend/src/pages/AdminArticles.tsx apps/frontend/src/pages/AdminComments.tsx apps/frontend/src/pages/AdminArticleEditor.tsx
git commit -m "feat: add Zustand-based Toast notification system with Monet theme styling"
```

---

## Task 6: Add ErrorBoundary + NotFound 404 page

**Files:**
- Create: `apps/frontend/src/components/ErrorBoundary.tsx`
- Create: `apps/frontend/src/pages/NotFound.tsx`
- Modify: `apps/frontend/src/App.tsx`

- [ ] **Step 1: Create ErrorBoundary.tsx**

Create `apps/frontend/src/components/ErrorBoundary.tsx`:

```tsx
import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="card-base p-10 max-w-md w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-lavender-100 flex items-center justify-center mx-auto">
              <svg className="w-7 h-7 text-lavender-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

- [ ] **Step 2: Create NotFound.tsx**

Create `apps/frontend/src/pages/NotFound.tsx`:

```tsx
import { Link } from 'react-router-dom'
import Container from '@/components/Container'

export default function NotFound() {
  return (
    <Container>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
        <div className="text-8xl font-bold text-accent/20 mb-4 font-serif">404</div>
        <h1 className="text-3xl font-semibold text-foreground mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          ← Back to Home
        </Link>
      </div>
    </Container>
  )
}
```

- [ ] **Step 3: Update App.tsx — wrap with ErrorBoundary and add NotFound route**

Replace the entire content of `apps/frontend/src/App.tsx`:

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Articles from './pages/Articles'
import Travel from './pages/Travel'
import Photography from './pages/Photography'
import History from './pages/History'
import ArticleDetail from './pages/ArticleDetail'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminArticles from './pages/AdminArticles'
import AdminComments from './pages/AdminComments'
import AdminArticleEditor from './pages/AdminArticleEditor'
import Search from './pages/Search'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/travel/:id" element={<ArticleDetail />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/photography/:id" element={<ArticleDetail />} />
            <Route path="/history" element={<History />} />
            <Route path="/history/:id" element={<ArticleDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/articles" element={<AdminArticles />} />
            <Route path="/admin/articles/new" element={<AdminArticleEditor />} />
            <Route path="/admin/articles/:id/edit" element={<AdminArticleEditor />} />
            <Route path="/admin/comments" element={<AdminComments />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/haoran/Desktop/personal-website/apps/frontend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Test NotFound page**

Navigate to http://localhost:5175/this-does-not-exist — should show the 404 page with "← Back to Home" button.

- [ ] **Step 6: Commit**

```bash
cd /Users/haoran/Desktop/personal-website
git add apps/frontend/src/components/ErrorBoundary.tsx apps/frontend/src/pages/NotFound.tsx apps/frontend/src/App.tsx
git commit -m "feat: add ErrorBoundary and NotFound 404 page, wire up in App.tsx"
```
