import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // timeout 10 detik
})

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth-storage')
  if (raw) {
    try {
      const { state } = JSON.parse(raw)
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`
      }
    } catch {
      // abaikan
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — bersihkan dan redirect ke login
      localStorage.removeItem('auth-storage')
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login'
      }
    }

    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout — backend tidak merespons')
    }

    if (!error.response) {
      console.error('Network error — pastikan backend berjalan di port 8080')
    }

    return Promise.reject(error)
  }
)

export default api