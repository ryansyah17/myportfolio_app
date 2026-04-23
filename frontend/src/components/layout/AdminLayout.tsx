import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const AdminLayout = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="font-bold text-lg">Admin Panel</h2>
          <p className="text-gray-400 text-xs mt-1">{user?.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: 'Dashboard', path: '/admin/dashboard' },
            { label: 'Portfolio', path: '/admin/portfolio' },
            { label: 'Blog', path: '/admin/blog' },
            { label: 'Education', path: '/admin/education' },
            { label: 'Work History', path: '/admin/work' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-sm text-gray-400 hover:text-white py-2 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout