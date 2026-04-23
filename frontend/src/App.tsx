import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/public/HomePage'
import PortfolioPage from './pages/public/PortfolioPage'
import AboutPage from './pages/public/AboutPage'
import BlogPage from './pages/public/BlogPage'
import ContactPage from './pages/public/ContactPage'

function App() {
  return (
    <Routes>
      {/* Public Routes — pakai Layout (ada Navbar & Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App