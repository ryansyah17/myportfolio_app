import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  // Kalau belum login, redirect ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute