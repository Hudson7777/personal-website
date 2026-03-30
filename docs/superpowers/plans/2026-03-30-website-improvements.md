# Website Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 7 identified issues in the personal website — from mock data replacement to animation timing, prose rendering, and API efficiency.

**Architecture:** Changes span frontend (React/Tailwind) and backend (Express/TypeScript). Each task is independent and can be committed separately. No new dependencies required except `@tailwindcss/typography` for Task 4.

**Tech Stack:** React 18 + TypeScript + Tailwind CSS v3 + Express + Prisma + Zod

---

## File Map

| File | Task(s) | Change |
|------|---------|--------|
| `apps/frontend/src/data/mockProfile.ts` | 1 | Replace placeholder data with real info |
| `apps/frontend/src/hooks/useProfile.ts` | 1 | Remove fake 300ms delay |
| `apps/frontend/src/hooks/useArticles.ts` | 2 | Pass `limit` to backend, remove client-side slice |
| `apps/frontend/src/services/articleService.ts` | 2 | Pass `limit` param in `getAllArticles` and `getLatestArticles` |
| `apps/frontend/src/pages/Articles.tsx` | 3 | Show all categories with filter tabs |
| `apps/frontend/tailwind.config.js` | 4 | Add `@tailwindcss/typography` plugin |
| `apps/frontend/src/pages/ArticleDetail.tsx` | 4 | Fix prose rendering: remove `whitespace-pre-wrap`, add `prose` classes |
| `apps/frontend/tailwind.config.js` | 5 | Shorten animation durations |
| `apps/frontend/src/index.css` | 5 | Shorten scroll reveal transition durations |
| `apps/backend/src/middleware/auth.ts` | 6 | Use `sendError` util for consistent response format |

---

## Task 1: Replace Mock Profile Data with Real Content

**Files:**
- Modify: `apps/frontend/src/data/mockProfile.ts`
- Modify: `apps/frontend/src/hooks/useProfile.ts`

The profile hook currently simulates a 300ms API call and returns hardcoded Unsplash placeholder data. Replace with real personal information.

- [ ] **Step 1: Update mockProfile.ts with real data**

Replace the entire `mockProfile` export with actual personal information. The `useProfile` hook reads from this file directly, so this is the single source of truth.

```ts
// apps/frontend/src/data/mockProfile.ts
// Replace mockProfile object — keep the interfaces and mockInterests unchanged

export const mockProfile: Profile = {
  name: 'Haoran',                          // ← your real name
  title: 'Software Engineer',              // ← your real title
  bio: 'Exploring AI, technology, and the world around us.',  // ← your real bio
  avatar: '/avatar.jpg',                   // ← upload your photo to apps/frontend/public/avatar.jpg
                                           //   OR keep an Unsplash URL if preferred
  backgroundImage: '/hero-bg.jpg',         // ← upload hero image to apps/frontend/public/hero-bg.jpg
                                           //   OR keep an Unsplash URL
  email: 'your@email.com',                 // ← your real email
  location: 'Beijing, China',              // ← your real location
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/Hudson7777',  // ← your real GitHub URL
      icon: 'github',
    },
    {
      name: 'Email',
      url: 'mailto:your@email.com',          // ← your real email
      icon: 'email',
    },
    // Remove Twitter/LinkedIn entries if you don't use them,
    // or replace with real URLs
  ],
}
```

- [ ] **Step 2: Remove the fake delay from useProfile.ts**

```ts
// apps/frontend/src/hooks/useProfile.ts
// Replace the entire fetchProfile function body:

const fetchProfile = async () => {
  try {
    setIsLoading(true)
    setError(null)
    setProfile(mockProfile)
    setInterests(mockInterests)
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to fetch profile')
  } finally {
    setIsLoading(false)
  }
}
```

- [ ] **Step 3: Verify in browser**

Start the frontend: `cd apps/frontend && pnpm dev`

Open http://localhost:5173 — the Hero section should show your real name, title, bio, and social links immediately (no 300ms flash).

- [ ] **Step 4: Commit**

```bash
cd /Users/haoran/Desktop/personal-website
git add apps/frontend/src/data/mockProfile.ts apps/frontend/src/hooks/useProfile.ts
git commit -m "fix: replace mock profile data with real personal information"
```

---

## Task 2: Fix useArticles — Pass limit to Backend

**Files:**
- Modify: `apps/frontend/src/hooks/useArticles.ts`
- Modify: `apps/frontend/src/services/articleService.ts`

Currently `getAllArticles()` always fetches `limit: 100` items and the hook slices client-side. The backend already supports pagination — use it.

- [ ] **Step 1: Update useArticles.ts to pass limit to the service**

```ts
// apps/frontend/src/hooks/useArticles.ts
// Full file replacement:

import { useState, useEffect } from 'react'
import { Article, ArticleCategory } from '@/data/mockArticles'
import articleService from '@/services/articleService'

interface UseArticlesOptions {
  category?: ArticleCategory
  limit?: number
}

export const useArticles = (options?: UseArticlesOptions) => {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        setError(null)

        let data: Article[]
        if (options?.category) {
          data = await articleService.getArticlesByCategory(options.category, options.limit)
        } else {
          data = await articleService.getAllArticles(options?.limit)
        }

        setArticles(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [options?.category, options?.limit])

  return { articles, isLoading, error }
}
```

- [ ] **Step 2: Update articleService.ts to accept and use limit param**

```ts
// apps/frontend/src/services/articleService.ts
// Update getAllArticles and getArticlesByCategory signatures:

async getAllArticles(limit?: number): Promise<Article[]> {
  const response = await api.get<ApiResponse<PaginatedResponse<Article>>>('/articles', {
    params: { published: true, limit: limit ?? 100 },
  })
  return response.data.data.items.map(a => this.withReadTime(a))
}

async getArticlesByCategory(category: ArticleCategory, limit?: number): Promise<Article[]> {
  const response = await api.get<ApiResponse<PaginatedResponse<Article>>>('/articles', {
    params: { category, published: true, limit: limit ?? 100 },
  })
  return response.data.data.items.map(a => this.withReadTime(a))
}
```

- [ ] **Step 3: Verify — Home page should only request 3 articles**

With both frontend and backend running, open browser DevTools → Network tab.

Navigate to http://localhost:5173 — you should see a request to `/api/articles?published=true&limit=3` (not `limit=100`).

- [ ] **Step 4: Commit**

```bash
git add apps/frontend/src/hooks/useArticles.ts apps/frontend/src/services/articleService.ts
git commit -m "perf: pass limit param to backend instead of slicing client-side"
```

---

## Task 3: Fix Articles Page — Show All Articles with Category Filter

**Files:**
- Modify: `apps/frontend/src/pages/Articles.tsx`

The `/articles` page is hardcoded to `category: 'ai'`. It should show all articles and let the user filter by category.

- [ ] **Step 1: Rewrite Articles.tsx with category filter tabs**

```tsx
// apps/frontend/src/pages/Articles.tsx
// Full file replacement:

import { useState } from 'react'
import { useArticles } from '@/hooks/useArticles'
import { ArticleCategory } from '@/data/mockArticles'
import Section from '@/components/Section'
import Container from '@/components/Container'
import ArticleGrid from '@/components/ArticleGrid'
import SEO from '@/components/SEO'
import { cn } from '@/lib/utils'

type FilterCategory = ArticleCategory | 'all'

const CATEGORY_LABELS: Record<FilterCategory, string> = {
  all: 'All',
  ai: 'AI',
  travel: 'Travel',
  photography: 'Photography',
  history: 'History',
}

const FILTER_TABS: FilterCategory[] = ['all', 'ai', 'travel', 'photography', 'history']

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all')

  const { articles, isLoading } = useArticles(
    activeCategory === 'all' ? undefined : { category: activeCategory as ArticleCategory }
  )

  return (
    <div>
      <SEO
        title="Articles"
        description="Thoughts and insights on AI, travel, photography, and history."
        url="/articles"
        type="website"
      />

      <Section
        title="Articles"
        subtitle="Thoughts and insights across topics I care about"
        padding="lg"
      >
        <Container>
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTER_TABS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-base',
                  activeCategory === cat
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <ArticleGrid
            articles={articles}
            isLoading={isLoading}
            emptyMessage={`No ${activeCategory === 'all' ? '' : CATEGORY_LABELS[activeCategory] + ' '}articles yet. Check back soon!`}
          />
        </Container>
      </Section>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to http://localhost:5173/articles — you should see all articles and clicking category tabs should filter them.

- [ ] **Step 3: Commit**

```bash
git add apps/frontend/src/pages/Articles.tsx
git commit -m "feat: articles page now shows all categories with filter tabs"
```

---

## Task 4: Fix Article Prose Rendering

**Files:**
- Modify: `apps/frontend/tailwind.config.js`
- Modify: `apps/frontend/src/pages/ArticleDetail.tsx`

The article content uses `whitespace-pre-wrap` which breaks HTML rendering from TipTap. The `prose` class requires `@tailwindcss/typography` to work.

- [ ] **Step 1: Install @tailwindcss/typography**

```bash
cd /Users/haoran/Desktop/personal-website/apps/frontend
pnpm add -D @tailwindcss/typography
```

Expected output: `devDependencies` updated in `package.json`.

- [ ] **Step 2: Add typography plugin to tailwind.config.js**

```js
// apps/frontend/tailwind.config.js
// Change the last line of the file from:
//   plugins: [],
// to:

plugins: [
  require('@tailwindcss/typography'),
],
```

- [ ] **Step 3: Update ArticleDetail.tsx — fix content div**

Find this block in `apps/frontend/src/pages/ArticleDetail.tsx` around line 196-200:

```tsx
// BEFORE:
<div className="prose max-w-none mb-12">
  <div
    className="text-foreground/80 leading-relaxed whitespace-pre-wrap"
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
  />
</div>
```

Replace with:

```tsx
// AFTER:
<div
  className="prose prose-sage max-w-none mb-12
             prose-headings:text-foreground prose-headings:font-semibold
             prose-p:text-foreground/80 prose-p:leading-relaxed
             prose-a:text-accent prose-a:no-underline hover:prose-a:underline
             prose-strong:text-foreground
             prose-code:text-accent prose-code:bg-muted prose-code:px-1 prose-code:rounded
             prose-pre:bg-sage-900 prose-pre:text-sage-50
             prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground
             prose-img:rounded-xl prose-img:shadow-md"
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
/>
```

- [ ] **Step 4: Verify in browser**

Navigate to any article detail page — headings, paragraphs, code blocks, and lists should render with proper spacing and typography. There should be no extra blank lines between elements.

- [ ] **Step 5: Commit**

```bash
cd /Users/haoran/Desktop/personal-website
git add apps/frontend/tailwind.config.js apps/frontend/src/pages/ArticleDetail.tsx apps/frontend/package.json pnpm-lock.yaml
git commit -m "fix: install @tailwindcss/typography and fix article prose rendering"
```

---

## Task 5: Fix Animation Durations

**Files:**
- Modify: `apps/frontend/tailwind.config.js`
- Modify: `apps/frontend/src/index.css`

Entry animations are 1.5-1.75s and scroll reveal is 2s — too slow. Target: 0.5-0.6s for entries, 0.7s for scroll reveal.

- [ ] **Step 1: Update animation durations in tailwind.config.js**

Find the `animation` block in `apps/frontend/tailwind.config.js` and replace it:

```js
// BEFORE:
animation: {
  "fade-in":       "fadeIn 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
  "slide-up":      "slideUp 1.75s cubic-bezier(0.4, 0, 0.2, 1)",
  "slide-down":    "slideDown 1.25s cubic-bezier(0.4, 0, 0.2, 1)",
  "slide-in-left": "slideInLeft 1.25s cubic-bezier(0.4, 0, 0.2, 1)",
  "scale-in":      "scaleIn 1.25s cubic-bezier(0.4, 0, 0.2, 1)",
  "bounce-in":     "bounceIn 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  "float":         "float 5s ease-in-out infinite",
  "shimmer":       "shimmer 2s linear infinite",
  "glow-pulse":    "glowPulse 3s ease-in-out infinite",
},

// AFTER:
animation: {
  "fade-in":       "fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  "slide-up":      "slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  "slide-down":    "slideDown 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
  "slide-in-left": "slideInLeft 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
  "scale-in":      "scaleIn 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
  "bounce-in":     "bounceIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)",
  "float":         "float 5s ease-in-out infinite",
  "shimmer":       "shimmer 2s linear infinite",
  "glow-pulse":    "glowPulse 3s ease-in-out infinite",
},
```

- [ ] **Step 2: Update scroll reveal durations in index.css**

Find and replace the three `.reveal` blocks in `apps/frontend/src/index.css`:

```css
/* BEFORE: */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 2s cubic-bezier(0.4,0,0.2,1),
              transform 2s cubic-bezier(0.4,0,0.2,1);
}

.reveal-left {
  opacity: 0;
  transform: translateX(-22px);
  transition: opacity 1.75s cubic-bezier(0.4,0,0.2,1),
              transform 1.75s cubic-bezier(0.4,0,0.2,1);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.95) translateY(14px);
  transition: opacity 1.75s cubic-bezier(0.4,0,0.2,1),
              transform 1.75s cubic-bezier(0.4,0,0.2,1);
}

/* AFTER: */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1),
              transform 0.7s cubic-bezier(0.4,0,0.2,1);
}

.reveal-left {
  opacity: 0;
  transform: translateX(-22px);
  transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1),
              transform 0.6s cubic-bezier(0.4,0,0.2,1);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.95) translateY(14px);
  transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1),
              transform 0.65s cubic-bezier(0.4,0,0.2,1);
}
```

- [ ] **Step 3: Verify in browser**

Navigate to http://localhost:5173 — the Hero section should animate in quickly (~0.5s), and scrolling down should trigger section reveals that feel snappy rather than sluggish.

- [ ] **Step 4: Commit**

```bash
cd /Users/haoran/Desktop/personal-website
git add apps/frontend/tailwind.config.js apps/frontend/src/index.css
git commit -m "fix: shorten animation durations from 1.5-2s to 0.5-0.7s"
```

---

## Task 6: Fix Auth Middleware Error Response Format

**Files:**
- Modify: `apps/backend/src/middleware/auth.ts`

The auth middleware returns `{ message: '...' }` directly instead of using the `sendError` utility, creating inconsistent API responses.

- [ ] **Step 1: Update auth.ts to use sendError**

```ts
// apps/backend/src/middleware/auth.ts
// Full file replacement:

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { sendError } from '../utils/response'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return sendError(res, 'Unauthorized', 'No token provided', 401)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = decoded as any
    return next()
  } catch (error) {
    return sendError(res, 'Unauthorized', 'Invalid token', 401)
  }
}

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return sendError(res, 'Unauthorized', 'No token provided', 401)
  }

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(email => email.trim())
  if (!adminEmails.includes(req.user.email)) {
    return sendError(res, 'Forbidden', 'Admin access required', 403)
  }

  return next()
}
```

- [ ] **Step 2: Verify the response format**

With the backend running (`cd apps/backend && pnpm dev`), test an unauthorized request:

```bash
curl -s http://localhost:3001/api/articles -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"test"}' | jq .
```

Expected response shape:
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "No token provided"
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/haoran/Desktop/personal-website
git add apps/backend/src/middleware/auth.ts
git commit -m "fix: use sendError util in auth middleware for consistent response format"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Task 1 — Profile data mock replacement
- ✅ Task 2 — useArticles limit efficiency
- ✅ Task 3 — Articles page category filter
- ✅ Task 4 — prose rendering + @tailwindcss/typography
- ✅ Task 5 — Animation duration reduction
- ✅ Task 6 — Auth middleware response format
- ⏭ Tags comma-separated storage (deferred — noted as acceptable tech debt for now)
- ⏭ Dark mode (deferred — separate larger effort)

**Placeholder scan:** No TBDs or incomplete steps found.

**Type consistency:** `ArticleCategory`, `Article`, `UseArticlesOptions` types are consistent across Tasks 2 and 3. `sendError` signature `(res, error, message, statusCode)` matches `utils/response.ts` in Task 6.
