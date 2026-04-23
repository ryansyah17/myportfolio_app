import { useTranslation } from 'react-i18next'
import { usePortfolios } from '../../hooks/usePortfolio'
import PortfolioCard from '../../components/ui/PortfolioCard'
import Loading from '../../components/ui/Loading'
import SEO from '../../components/ui/SEO'

const PortfolioPage = () => {
  const { t } = useTranslation()
  const { data: portfolios, isLoading, isError } = usePortfolios()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SEO
        title="Portfolio"
        description="Kumpulan project yang pernah dikerjakan Ryansyah Putra."
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          {t('portfolio.title')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          {t('portfolio.subtitle')}
        </p>
      </div>

      {isLoading && <Loading />}

      {isError && (
        <p className="text-center py-20 text-red-500">{t('common.backend_error')}</p>
      )}

      {portfolios && portfolios.length === 0 && (
        <p className="text-center py-20 text-gray-400">{t('portfolio.empty')}</p>
      )}

      {portfolios && portfolios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((p) => <PortfolioCard key={p.id} portfolio={p} />)}
        </div>
      )}
    </div>
  )
}

export default PortfolioPage