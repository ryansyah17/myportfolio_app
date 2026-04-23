import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'

// Public pages
import HomePage from './pages/public/HomePage'
import PortfolioPage from './pages/public/PortfolioPage'
import AboutPage from './pages/public/AboutPage'
import BlogPage from './pages/public/BlogPage'
import ContactPage from './pages/public/ContactPage'

// Admin pages
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'

function App() {
  return (
    <Routes>
      {/* ── Public Routes ── */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* ── Admin Login (tidak pakai Layout publik) ── */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* ── Admin Protected Routes ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          {/* Phase 6: tambah route admin lainnya di sini */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App