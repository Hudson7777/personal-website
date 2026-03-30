# Website Improvements Design Spec

## Goal

Clean up technical debt, eliminate code duplication, improve type safety, and add missing production infrastructure (Toast, ErrorBoundary, 404 page) to the personal website for long-term maintainability.

## Architecture

Six self-contained improvement tasks targeting the frontend (`apps/frontend/src`). No backend changes required. All tasks are independent and can be executed sequentially without conflicts.

## Tech Stack

React 18, TypeScript, Tailwind CSS v3, Zustand, React Router v6

---

## Task 1: Delete orphaned styles/theme.ts

**Problem:** `apps/frontend/src/styles/theme.ts` defines a completely different color system (Emerald Green palette) that is never imported by any file. It contradicts the Monet sage theme in `tailwind.config.js` and creates cognitive confusion.

**Action:** Delete the file. Zero side effects — confirmed by grep (0 imports found).

**Files:**
- Delete: `apps/frontend/src/styles/theme.ts`

---

## Task 2: Merge Travel / Photography / History into CategoryPage

**Problem:** Three pages are byte-for-byte identical except for the `category` string, SEO description, subtitle, and empty message. Any future change (new prop, layout tweak) must be applied three times.

**Solution:** Create `apps/frontend/src/pages/CategoryPage.tsx` that accepts props:
```ts
interface CategoryPageProps {
  category: ArticleCategory
  title: string
  subtitle: string
  seoDescription: string
  emptyMessage: string
}
```

Each of Travel, Photography, History becomes a one-liner that renders `<CategoryPage>` with its specific values. App.tsx routes are unchanged.

**Files:**
- Create: `apps/frontend/src/pages/CategoryPage.tsx`
- Modify: `apps/frontend/src/pages/Travel.tsx`
- Modify: `apps/frontend/src/pages/Photography.tsx`
- Modify: `apps/frontend/src/pages/History.tsx`

---

## Task 3: Delete LatestArticles, use ArticleGrid everywhere

**Problem:** `LatestArticles.tsx` is a hand-written duplicate of `ArticleGrid` + `ArticleCard`. It renders a 3-column grid with cover images, badges, excerpts, and read time — identical to what `ArticleGrid` already does. Maintaining two implementations is wasteful.

**Solution:** In `Home.tsx`, replace `<LatestArticles articles={articles} isLoading={isLoading} />` with `<ArticleGrid articles={articles} isLoading={isLoading} />`. Then delete `LatestArticles.tsx`.

**Files:**
- Modify: `apps/frontend/src/pages/Home.tsx`
- Delete: `apps/frontend/src/components/LatestArticles.tsx`

---

## Task 4: Fix type safety — export BadgeVariant, eliminate `as any`

**Problem:** Six `as any` casts exist in the codebase. Root cause: `Badge` accepts `variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error'` but callers store variants in `Record<string, string>` maps, requiring a cast. `AdminArticleEditor` also casts `payload as any` due to missing proper types.

**Solution:**
1. Export `BadgeVariant` type from `Badge.tsx`
2. Change all category→badge variant maps from `Record<string, string>` to `Record<string, BadgeVariant>`
3. Remove all 4 Badge-related `as any` casts (ArticleCard ×2, ArticleDetail ×1, and after Task 3 removes LatestArticles ×1)
4. Fix `AdminArticleEditor`: use `CreateArticleInput` / `UpdateArticleInput` from `@personal-website/shared` instead of `payload as any`

**Files:**
- Modify: `apps/frontend/src/components/Badge.tsx`
- Modify: `apps/frontend/src/components/ArticleCard.tsx`
- Modify: `apps/frontend/src/pages/ArticleDetail.tsx`
- Modify: `apps/frontend/src/pages/AdminArticleEditor.tsx`

---

## Task 5: Add Toast notification system

**Problem:** No user feedback on async operations (save article, delete comment, etc.). Admin actions silently succeed or fail.

**Solution:** Lightweight Zustand-based Toast system with no new dependencies.

**Architecture:**
- `stores/toast.ts` — Zustand store managing a queue of `{ id, message, type, duration }` toasts. Exposes `addToast`, `removeToast`. Auto-removes after duration.
- `hooks/useToast.ts` — Convenience hook exposing `toast.success(msg)`, `toast.error(msg)`, `toast.info(msg)`.
- `components/ToastContainer.tsx` — Fixed bottom-right container rendering active toasts. Each toast has enter/exit CSS animation. Colors match Monet theme: success=sage green, error=lavender red, info=mist blue.

**Integration:** Mount `<ToastContainer />` in `Layout.tsx`. Use `useToast` in `AdminArticles.tsx`, `AdminComments.tsx`, and `AdminArticleEditor.tsx` for save/delete success and error feedback.

**Files:**
- Create: `apps/frontend/src/stores/toast.ts`
- Create: `apps/frontend/src/hooks/useToast.ts`
- Create: `apps/frontend/src/components/ToastContainer.tsx`
- Modify: `apps/frontend/src/components/Layout.tsx`
- Modify: `apps/frontend/src/pages/AdminArticles.tsx`
- Modify: `apps/frontend/src/pages/AdminComments.tsx`
- Modify: `apps/frontend/src/pages/AdminArticleEditor.tsx`

---

## Task 6: Add ErrorBoundary + NotFound 404 page

**Problem:** Unhandled render errors crash the entire app with a blank screen. Unmatched routes render nothing (no 404 page).

**Solution:**
- `components/ErrorBoundary.tsx` — React class component (required for error boundaries). Catches render errors, displays a friendly Monet-themed error UI with "Reload page" button. Accepts optional `fallback` prop for custom error UI.
- `pages/NotFound.tsx` — Clean 404 page with Monet styling, "404" heading, message, and "← Back to Home" button.

**Integration:**
- Wrap `<Router>` in `App.tsx` with `<ErrorBoundary>`
- Add `<Route path="*" element={<NotFound />} />` as last route inside the public `<Route element={<Layout />}>` group

**Files:**
- Create: `apps/frontend/src/components/ErrorBoundary.tsx`
- Create: `apps/frontend/src/pages/NotFound.tsx`
- Modify: `apps/frontend/src/App.tsx`
