import api from './api'
import type { Blog, ApiResponse } from '../types'

type BlogPayload = Omit<Blog, 'id' | 'created_at' | 'updated_at'>

export const blogService = {
  getAll: async (all = false): Promise<Blog[]> => {
    const res = await api.get<ApiResponse<Blog[]>>(`/blogs${all ? '?all=true' : ''}`)
    return res.data.data
  },
  getBySlug: async (slug: string): Promise<Blog> => {
    const res = await api.get<ApiResponse<Blog>>(`/blogs/slug/${slug}`)
    return res.data.data
  },
  create: async (data: BlogPayload): Promise<Blog> => {
    const res = await api.post<ApiResponse<Blog>>('/blogs', data)
    return res.data.data
  },
  update: async (id: number, data: BlogPayload): Promise<Blog> => {
    const res = await api.put<ApiResponse<Blog>>(`/blogs/${id}`, data)
    return res.data.data
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/blogs/${id}`)
  },
}