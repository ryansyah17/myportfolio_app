import api from './api'
import type { Education, ApiResponse } from '../types'

type EducationPayload = Omit<Education, 'id' | 'created_at' | 'updated_at'>

export const educationService = {
  getAll: async (): Promise<Education[]> => {
    const res = await api.get<ApiResponse<Education[]>>('/education')
    return res.data.data
  },
  create: async (data: EducationPayload): Promise<Education> => {
    const res = await api.post<ApiResponse<Education>>('/education', data)
    return res.data.data
  },
  update: async (id: number, data: EducationPayload): Promise<Education> => {
    const res = await api.put<ApiResponse<Education>>(`/education/${id}`, data)
    return res.data.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/education/${id}`)
  },
}