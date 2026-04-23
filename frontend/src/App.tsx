import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ui/ErrorBoundary'
import Layout from './components/layout/Layout'
import AdminLayout from './components/layout/AdminLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'

// Public pages
import HomePage from './pages/public/HomePage'
import PortfolioPage from './pages/public/PortfolioPage'
import AboutPage from './pages/public/AboutPage'
import BlogPage from './pages/public/BlogPage'
import BlogDetailPage from './pages/public/BlogDetailPage'
import ContactPage from './pages/public/ContactPage'
import NotFoundPage from './pages/public/NotFoundPage'

// Admin pages
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import AdminPortfolioPage from './pages/admin/AdminPortfolioPage'
import AdminBlogPage from './pages/admin/AdminBlogPage'
import AdminEducationPage from './pages/admin/AdminEducationPage'
import AdminWorkPage from './pages/admin/AdminWorkPage'
import AdminInboxPage from './pages/admin/AdminInboxPage'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* ── Public ── */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* ── Admin Login ── */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ── Admin Protected ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/portfolio" element={<AdminPortfolioPage />} />
            <Route path="/admin/blog" element={<AdminBlogPage />} />
            <Route path="/admin/education" element={<AdminEducationPage />} />
            <Route path="/admin/work" element={<AdminWorkPage />} />
            <Route path="/admin/inbox" element={<AdminInboxPage />} />
          </Route>
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App