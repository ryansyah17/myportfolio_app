import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePortfolios } from '../../hooks/usePortfolio'
import PortfolioCard from '../../components/ui/PortfolioCard'
import Loading from '../../components/ui/Loading'
import SEO from '../../components/ui/SEO'

const HomePage = () => {
  const { t } = useTranslation()
  const { data: portfolios, isLoading } = usePortfolios()
  const featured = portfolios?.filter((p) => p.is_featured).slice(0, 3)

  return (

    <div>
      <SEO
        title="Home"
        description="Ryansyah Putra — Flutter Developer yang sedang belajar Go & React."
      />
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium px-4 py-1 rounded-full mb-6">
          {t('home.badge')} 🟢
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
          {t('home.greeting')}{' '}
          <span className="text-blue-600 dark:text-blue-400">Ryansyah Putra</span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mb-10">
          {t('home.bio')}
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/portfolio"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
            {t('home.cta_portfolio')}
          </Link>
          <Link to="/contact"
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            {t('home.cta_contact')}
          </Link>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t('home.featured_title')}
          </h2>
          <Link to="/portfolio" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
            {t('home.featured_link')} →
          </Link>
        </div>

        {isLoading && <Loading />}

        {featured && featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p) => <PortfolioCard key={p.id} portfolio={p} />)}
          </div>
        )}

        {featured?.length === 0 && !isLoading && (
          <p className="text-gray-400 text-center py-10">{t('portfolio.empty')}</p>
        )}
      </section>
    </div>
  )
}

export default HomePage