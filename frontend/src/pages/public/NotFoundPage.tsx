import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
    useTranslation()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6">
            <div className="text-center">
                {/* Big 404 */}
                <div className="relative mb-8">
                    <p className="text-[160px] font-black text-gray-100 dark:text-gray-800 leading-none select-none">
                        404
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">🚀</span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                    Halaman Tidak Ditemukan
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Sepertinya halaman yang kamu cari tidak ada atau sudah dipindahkan.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link to="/"
                        className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                        Kembali ke Beranda
                    </Link>
                    <Link to="/portfolio"
                        className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        Lihat Portfolio
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage