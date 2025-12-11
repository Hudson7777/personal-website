import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminArticles from './pages/AdminArticles'
import AdminComments from './pages/AdminComments'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/travel/:id" element={<ArticleDetail />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/photography/:id" element={<ArticleDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<ArticleDetail />} />
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
          <Route path="/admin/comments" element={<AdminComments />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
