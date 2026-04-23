import { Link } from 'react-router-dom'
import { usePortfolios } from '../../hooks/usePortfolio'
import PortfolioCard from '../../components/ui/PortfolioCard'
import Loading from '../../components/ui/Loading'

const HomePage = () => {
  // Ambil portfolio featured saja untuk ditampilkan di home
  const { data: portfolios, isLoading } = usePortfolios()
  const featured = portfolios?.filter((p) => p.is_featured).slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <div className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1 rounded-full mb-6">
          Available for work 🟢
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Hi, I'm{' '}
          <span className="text-blue-600">Ryansyah Putra</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mb-10">
          Flutter Developer yang sedang belajar Go & React. 
          Saya membangun aplikasi mobile dan web yang clean dan fungsional.
        </p>
        <div className="flex gap-4">
          <Link
            to="/portfolio"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Lihat Portfolio
          </Link>
          <Link
            to="/contact"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Hubungi Saya
          </Link>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Projects</h2>
          <Link to="/portfolio" className="text-blue-600 text-sm hover:underline">
            Lihat Semua →
          </Link>
        </div>

        {isLoading && <Loading />}

        {featured && featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        )}

        {featured && featured.length === 0 && !isLoading && (
          <p className="text-gray-400 text-center py-10">
            Belum ada featured project.
          </p>
        )}
      </section>
    </div>
  )
}

export default HomePage