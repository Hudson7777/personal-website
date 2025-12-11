import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Articles from './pages/Articles'
import Travel from './pages/Travel'
import Photography from './pages/Photography'
import History from './pages/History'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
