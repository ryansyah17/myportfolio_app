import type { Portfolio } from '../../types'
import { useTranslation } from 'react-i18next'

interface Props {
  portfolio: Portfolio
}

const PortfolioCard = ({ portfolio }: Props) => {
  const { t } = useTranslation()
  const techList = portfolio.tech_stack
    ? portfolio.tech_stack.split(',').map((t) => t.trim())
    : []

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
        {portfolio.image_url ? (
          <img src={portfolio.image_url} alt={portfolio.title}
            className="w-full h-full object-cover" />
        ) : (
          <span className="text-white text-5xl">🚀</span>
        )}
      </div>

      <div className="p-6">
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
          {portfolio.category || 'Project'}
        </span>

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-3 mb-2">
          {portfolio.title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {portfolio.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {techList.map((tech) => (
            <span key={tech}
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {portfolio.project_url && (
            <a href={portfolio.project_url} target="_blank" rel="noopener noreferrer"
              className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              {t('portfolio.live')}
            </a>
          )}
          {portfolio.github_url && (
            <a href={portfolio.github_url} target="_blank" rel="noopener noreferrer"
              className="text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors">
              {t('portfolio.github')}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default PortfolioCard