import api from './api'
import type { ApiResponse } from '../types'

interface LoginRequest {
  email: string
  password: string
}

interface AuthUser {
  user_id: number
  email: string
  role: string
  name: string
}

interface AuthResponse {
  token: string
  user: AuthUser
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', data)
    return res.data.data
  },

  register: async (data: LoginRequest & { name: string }): Promise<AuthResponse> => {
    const res = await api.post<ApiResponse<AuthResponse>>('/auth/register', data)
    return res.data.data
  },
}