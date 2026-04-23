import api from './api'
import type { Contact, ApiResponse } from '../types'

interface SendContactData {
  name: string
  email: string
  subject: string
  message: string
}

export const contactService = {
  send: async (data: SendContactData): Promise<void> => {
    await api.post<ApiResponse<null>>('/contacts', data)
  },
  getAll: async (): Promise<Contact[]> => {
    const res = await api.get<ApiResponse<Contact[]>>('/contacts')
    return res.data.data
  },
  markAsRead: async (id: number): Promise<void> => {
    await api.put(`/contacts/${id}/read`)
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/contacts/${id}`)
  },
}