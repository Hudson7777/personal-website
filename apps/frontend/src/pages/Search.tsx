import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Article } from '@/data/mockArticles'
import Container from '@/components/Container'
import Section from '@/components/Section'
import ArticleGrid from '@/components/ArticleGrid'
import SEO from '@/components/SEO'
import api from '@/lib/api'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [inputValue, setInputValue] = useState(query)
  const [results,    setResults]    = useState<Article[]>([])
  const [isLoading,  setIsLoading]  = useState(false)
  const [total,      setTotal]      = useState(0)
  const [searched,   setSearched]   = useState(false)

  useEffect(() => {
    if (query) {
      setInputValue(query)
      doSearch(query)
    }
  }, [query])

  const doSearch = async (q: string) => {
    if (!q.trim()) return
    try {
      setIsLoading(true)
      setSearched(true)
      const res = await api.get('/articles', {
        params: { search: q.trim(), published: true, limit: 50 },
      })
      const items = (res.data.data.items || []).map((a: Article) => ({
        ...a,
        readTime: Math.max(1, Math.ceil(
          (a.content || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200
        )),
      }))
      setResults(items)
      setTotal(res.data.data.total || items.length)
    } catch {
      setResults([])
      setTotal(0)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() })
    }
  }

  return (
    <div>
      <SEO title={query ? `Search: ${query}` : 'Search'} description="Search articles" url="/search" />

      <Section padding="lg">
        <Container>
          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
              Search Articles
            </h1>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Search for articles..."
                autoFocus
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent shadow-sm text-base"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-colors shadow-sm"
              >
                Search
              </button>
            </form>
          </div>

          {/* Results */}
          {searched && !isLoading && (
            <p className="text-sm text-muted-foreground mb-6 text-center">
              {total > 0
                ? `Found ${total} article${total === 1 ? '' : 's'} for "${query}"`
                : `No results for "${query}"`}
            </p>
          )}

          <ArticleGrid
            articles={results}
            isLoading={isLoading}
            variant="grid"
            emptyMessage={searched ? `No articles found for "${query}". Try a different keyword.` : 'Enter a search term above to find articles.'}
          />
        </Container>
      </Section>
    </div>
  )
}
