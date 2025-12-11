import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Articles from './pages/Articles'
import Travel from './pages/Travel'
import Photography from './pages/Photography'
import History from './pages/History'
import ArticleDetail from './pages/ArticleDetail'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
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
      </Routes>
    </Router>
  )
}

export default App
