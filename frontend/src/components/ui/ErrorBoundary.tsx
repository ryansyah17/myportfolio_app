import { Component, type ReactNode } from 'react'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6">
                    <div className="text-center max-w-md">
                        <p className="text-6xl mb-6">⚠️</p>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                            Terjadi Kesalahan
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                            {this.state.error?.message}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors mt-4"
                        >
                            Muat Ulang Halaman
                        </button>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary