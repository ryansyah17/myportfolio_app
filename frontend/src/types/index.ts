// Harus sama dengan struct Go di backend
export interface Portfolio {
  id: number
  title: string
  description: string
  image_url: string
  project_url: string
  github_url: string
  tech_stack: string
  category: string
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}