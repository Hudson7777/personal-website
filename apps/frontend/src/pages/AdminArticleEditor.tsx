import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import api from '@/lib/api'
import articleService from '@/services/articleService'
import { ArticleCategory } from '@/data/mockArticles'
import Button from '@/components/Button'

const lowlight = createLowlight(common)

const CATEGORIES: { value: ArticleCategory; label: string }[] = [
  { value: 'ai',          label: 'AI Articles' },
  { value: 'travel',      label: 'Travel' },
  { value: 'photography', label: 'Photography' },
  { value: 'history',     label: 'History' },
]

// ─── TipTap Toolbar ──────────────────────────────────────────────
function Toolbar({ editor, onImageUpload }: {
  editor: ReturnType<typeof useEditor>
  onImageUpload: () => void
}) {
  if (!editor) return null

  const btnBase = 'px-2 py-1 text-sm rounded border transition-colors'
  const active  = 'bg-accent text-white border-accent'
  const inactive = 'bg-card border-border text-foreground hover:bg-muted'

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/50">
      <button type="button" className={`${btnBase} ${editor.isActive('bold')      ? active : inactive}`} onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
      <button type="button" className={`${btnBase} italic ${editor.isActive('italic')    ? active : inactive}`} onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
      <button type="button" className={`${btnBase} line-through ${editor.isActive('strike')    ? active : inactive}`} onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>
      <div className="w-px bg-border mx-1" />
      <button type="button" className={`${btnBase} ${editor.isActive('heading', { level: 1 }) ? active : inactive}`} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
      <button type="button" className={`${btnBase} ${editor.isActive('heading', { level: 2 }) ? active : inactive}`} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
      <button type="button" className={`${btnBase} ${editor.isActive('heading', { level: 3 }) ? active : inactive}`} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
      <div className="w-px bg-border mx-1" />
      <button type="button" className={`${btnBase} ${editor.isActive('bulletList')  ? active : inactive}`} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
      <button type="button" className={`${btnBase} ${editor.isActive('orderedList') ? active : inactive}`} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
      <button type="button" className={`${btnBase} ${editor.isActive('blockquote')  ? active : inactive}`} onClick={() => editor.chain().focus().toggleBlockquote().run()}>" Quote</button>
      <button type="button" className={`${btnBase} ${editor.isActive('codeBlock')   ? active : inactive}`} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{'<>'} Code</button>
      <div className="w-px bg-border mx-1" />
      <button
        type="button"
        className={`${btnBase} ${inactive}`}
        onClick={() => {
          const url = window.prompt('Enter URL:')
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }}
      >
        Link
      </button>
      <button type="button" className={`${btnBase} ${inactive}`} onClick={onImageUpload}>
        Image
      </button>
      <div className="w-px bg-border mx-1" />
      <button type="button" className={`${btnBase} ${inactive}`} onClick={() => editor.chain().focus().undo().run()}>↩</button>
      <button type="button" className={`${btnBase} ${inactive}`} onClick={() => editor.chain().focus().redo().run()}>↪</button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function AdminArticleEditor() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [title,       setTitle]       = useState('')
  const [category,    setCategory]    = useState<ArticleCategory>('ai')
  const [tags,        setTags]        = useState('')
  const [excerpt,     setExcerpt]     = useState('')
  const [coverImage,  setCoverImage]  = useState('')
  const [published,   setPublished]   = useState(false)
  const [isSaving,    setIsSaving]    = useState(false)
  const [isLoading,   setIsLoading]   = useState(isEditing)
  const [error,       setError]       = useState('')
  const [imageUploading, setImageUploading] = useState(false)

  // ─── TipTap editor ─────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: '<p>Start writing your article here...</p>',
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[400px] p-4 focus:outline-none text-foreground',
      },
    },
  })

  // ─── Load article for editing ───────────────────────────────────
  useEffect(() => {
    if (!id) return
    const load = async () => {
      try {
        const article = await articleService.getArticleById(id)
        if (!article) { setError('Article not found'); return }
        setTitle(article.title)
        setCategory(article.category)
        setTags(Array.isArray(article.tags) ? article.tags.join(', ') : '')
        setExcerpt(article.excerpt || '')
        setCoverImage(article.coverImage || '')
        setPublished(article.published ?? false)
        editor?.commands.setContent(article.content || '')
      } catch {
        setError('Failed to load article')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id, editor])

  // ─── Image upload (into TipTap) ─────────────────────────────────
  const handleImageUpload = useCallback(async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        setImageUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        const res = await api.post<{ success: boolean; data: { url: string } }>('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        const url = res.data.data.url
        editor?.chain().focus().setImage({ src: url }).run()
      } catch {
        alert('Image upload failed')
      } finally {
        setImageUploading(false)
      }
    }
    input.click()
  }, [editor])

  // ─── Cover image upload ──────────────────────────────────────────
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await api.post<{ success: boolean; data: { url: string } }>('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setCoverImage(res.data.data.url)
    } catch {
      alert('Cover image upload failed')
    }
  }

  // ─── Save ────────────────────────────────────────────────────────
  const handleSave = async (publishNow?: boolean) => {
    if (!title.trim()) { setError('Title is required'); return }
    if (!editor)       { setError('Editor not ready');  return }

    setIsSaving(true)
    setError('')

    const payload = {
      title:      title.trim(),
      content:    editor.getHTML(),
      category,
      tags:       tags.split(',').map(t => t.trim()).filter(Boolean).join(','),
      excerpt:    excerpt.trim() || undefined,
      coverImage: coverImage.trim() || undefined,
      published:  publishNow !== undefined ? publishNow : published,
    }

    try {
      if (isEditing && id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await articleService.updateArticle(id, payload as any)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await articleService.createArticle(payload as any)
      }
      navigate('/admin/articles')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-muted rounded-lg w-1/2" />
        <div className="h-64 bg-muted rounded-xl" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            {isEditing ? 'Edit Article' : 'New Article'}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isEditing ? 'Update your article content and settings' : 'Create a new article for your website'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate('/admin/articles')}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => handleSave(false)} isLoading={isSaving}>
            Save Draft
          </Button>
          <Button onClick={() => handleSave(true)} isLoading={isSaving}>
            {published ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Article title..."
              className="w-full px-4 py-2.5 text-lg font-medium rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>

          {/* TipTap Editor */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Content *
              {imageUploading && <span className="ml-2 text-xs text-muted-foreground">Uploading image...</span>}
            </label>
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <Toolbar editor={editor} onImageUpload={handleImageUpload} />
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="Brief summary shown in article cards..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          {/* Publish status */}
          <div className="card-base p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Status</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                className={`relative w-10 h-6 rounded-full transition-colors duration-base cursor-pointer ${
                  published ? 'bg-accent' : 'bg-muted'
                }`}
                onClick={() => setPublished(!published)}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-base ${
                  published ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {published ? 'Published' : 'Draft'}
              </span>
            </label>
          </div>

          {/* Category */}
          <div className="card-base p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Category *</h3>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as ArticleCategory)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="card-base p-4">
            <h3 className="text-sm font-semibold text-foreground mb-1.5">Tags</h3>
            <p className="text-xs text-muted-foreground mb-2">Comma separated</p>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="AI, Machine Learning, ..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>

          {/* Cover Image */}
          <div className="card-base p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Cover Image</h3>
            {coverImage && (
              <div className="mb-3 rounded-lg overflow-hidden aspect-video bg-muted">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-2">
              <label className="block w-full text-center px-3 py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-accent hover:text-accent cursor-pointer transition-colors">
                Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={e => setCoverImage(e.target.value)}
                placeholder="Or paste image URL..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
