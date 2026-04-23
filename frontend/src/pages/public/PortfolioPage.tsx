import { usePortfolios } from '../../hooks/usePortfolio'
import PortfolioCard from '../../components/ui/PortfolioCard'
import Loading from '../../components/ui/Loading'

const PortfolioPage = () => {
  const { data: portfolios, isLoading, isError } = usePortfolios()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Portfolio</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Kumpulan project yang pernah saya kerjakan — dari mobile app hingga web app.
        </p>
      </div>

      {/* States */}
      {isLoading && <Loading />}

      {isError && (
        <div className="text-center py-20 text-red-500">
          Gagal memuat data. Pastikan backend berjalan.
        </div>
      )}

      {/* Grid Portfolio */}
      {portfolios && portfolios.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          Belum ada portfolio. Tambahkan lewat admin dashboard.
        </div>
      )}

      {portfolios && portfolios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PortfolioPage