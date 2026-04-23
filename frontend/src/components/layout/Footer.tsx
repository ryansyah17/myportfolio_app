import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">
              Ryansyah<span className="text-blue-400">.</span>
            </h3>
            <p className="text-sm text-gray-500">
              Flutter · Go · React
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Pages</h4>
            <div className="space-y-2">
              {[
                { label: t('nav.portfolio'), path: '/portfolio' },
                { label: t('nav.blog'), path: '/blog' },
                { label: t('nav.about'), path: '/about' },
                { label: t('nav.contact'), path: '/contact' },
              ].map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Contact</h4>
            <p className="text-sm">admin@ryansyah.com</p>
            <div className="flex gap-4 mt-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Ryansyah Putra. Built with Go + React.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer