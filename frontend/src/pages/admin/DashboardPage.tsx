import { useAuthStore } from '../../store/authStore'

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Selamat datang, {user?.email} 👋
      </h1>
      <p className="text-gray-500 mb-8">
        Kelola konten portfolio kamu dari sini.
      </p>

      {/* Stats placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Portfolio', value: '-', color: 'blue' },
          { label: 'Total Blog', value: '-', color: 'purple' },
          { label: 'Pesan Masuk', value: '-', color: 'green' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage