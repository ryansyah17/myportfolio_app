import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { usePortfolios } from '../../hooks/usePortfolio'
import { useBlogs } from '../../hooks/useBlog'
import { useContacts } from '../../hooks/useContact'

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user)
  const { data: portfolios } = usePortfolios()
  const { data: blogs } = useBlogs(true)
  const { data: contacts } = useContacts()

  const unread = contacts?.filter(c => !c.is_read).length ?? 0

  const stats = [
    { label: 'Total Portfolio', value: portfolios?.length ?? 0, color: 'blue', path: '/admin/portfolio' },
    { label: 'Total Artikel', value: blogs?.length ?? 0, color: 'purple', path: '/admin/blog' },
    {
      label: 'Pesan Masuk', value: contacts?.length ?? 0, color: 'green', path: '/admin/inbox',
      badge: unread > 0 ? unread : null
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Selamat datang 👋
      </h1>
      <p className="text-gray-500 mb-8">{user?.email}</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.path}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              {stat.badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {stat.badge} baru
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Aksi Cepat</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '+ Portfolio', path: '/admin/portfolio', color: 'bg-blue-50 text-blue-700' },
          { label: '+ Artikel', path: '/admin/blog', color: 'bg-purple-50 text-purple-700' },
          { label: '+ Pendidikan', path: '/admin/education', color: 'bg-pink-50 text-pink-700' },
          { label: '+ Pengalaman', path: '/admin/work', color: 'bg-green-50 text-green-700' },
        ].map((item) => (
          <Link key={item.label} to={item.path}
            className={`${item.color} rounded-2xl p-4 text-sm font-semibold text-center hover:opacity-80 transition-opacity`}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage