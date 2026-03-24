import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '@/lib/api'
import Button from '@/components/Button'

interface Stats {
  articles: number
  comments: number
  categories: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    articles: 0,
    comments: 0,
    categories: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const statsRes = await api.get('/admin/stats')
        const { articleCount, commentCount, categoryCount } = statsRes.data.data
        setStats({ articles: articleCount, comments: commentCount, categories: categoryCount })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const StatCard = ({ title, value, icon }: { title: string; value: number; icon: string }) => (
    <div className="card-base p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{isLoading ? '-' : value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Articles" value={stats.articles} icon="📝" />
        <StatCard title="Comments" value={stats.comments} icon="💬" />
        <StatCard title="Categories" value={stats.categories} icon="📂" />
      </div>

      {/* Quick Actions */}
      <div className="card-base p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/admin/articles/new">
            <Button className="w-full">
              ✏️ New Article
            </Button>
          </Link>
          <Link to="/admin/articles">
            <Button variant="secondary" className="w-full">
              📝 All Articles
            </Button>
          </Link>
          <Link to="/admin/comments">
            <Button variant="secondary" className="w-full">
              💬 Comments
            </Button>
          </Link>
          <Link to="/" target="_blank">
            <Button variant="ghost" className="w-full">
              🌐 View Site
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
