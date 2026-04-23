import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogService } from '../services/blogService'
import type { Blog } from '../types'

export const useBlogs = (all = false) => useQuery({
  queryKey: ['blogs', all],
  queryFn: () => blogService.getAll(all),
})

export const useBlogBySlug = (slug: string) => useQuery({
  queryKey: ['blogs', slug],
  queryFn: () => blogService.getBySlug(slug),
  enabled: !!slug,
})

export const useCreateBlog = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: blogService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  })
}

export const useUpdateBlog = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Blog, 'id' | 'created_at' | 'updated_at'> }) =>
      blogService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  })
}

export const useDeleteBlog = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: blogService.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  })
}