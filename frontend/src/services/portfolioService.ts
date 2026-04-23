import api from './api'
import type { Portfolio, ApiResponse } from '../types'

export const portfolioService = {
  // Ambil semua portfolio
  getAll: async (): Promise<Portfolio[]> => {
    const res = await api.get<ApiResponse<Portfolio[]>>('/portfolios')
    return res.data.data
  },

  // Ambil portfolio by ID
  getById: async (id: number): Promise<Portfolio> => {
    const res = await api.get<ApiResponse<Portfolio>>(`/portfolios/${id}`)
    return res.data.data
  },

  // Buat portfolio baru (untuk admin)
  create: async (data: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>): Promise<Portfolio> => {
    const res = await api.post<ApiResponse<Portfolio>>('/portfolios', data)
    return res.data.data
  },

  // Update portfolio (untuk admin)
  update: async (id: number, data: Partial<Portfolio>): Promise<Portfolio> => {
    const res = await api.put<ApiResponse<Portfolio>>(`/portfolios/${id}`, data)
    return res.data.data
  },

  // Hapus portfolio (untuk admin)
  delete: async (id: number): Promise<void> => {
    await api.delete(`/portfolios/${id}`)
  },
}