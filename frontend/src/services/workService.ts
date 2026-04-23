import api from './api'
import type { WorkHistory, ApiResponse } from '../types'

type WorkPayload = Omit<WorkHistory, 'id' | 'created_at' | 'updated_at'>

export const workService = {
  getAll: async (): Promise<WorkHistory[]> => {
    const res = await api.get<ApiResponse<WorkHistory[]>>('/work')
    return res.data.data
  },
  create: async (data: WorkPayload): Promise<WorkHistory> => {
    const res = await api.post<ApiResponse<WorkHistory>>('/work', data)
    return res.data.data
  },
  update: async (id: number, data: WorkPayload): Promise<WorkHistory> => {
    const res = await api.put<ApiResponse<WorkHistory>>(`/work/${id}`, data)
    return res.data.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/work/${id}`)
  },
}