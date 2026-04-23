import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { educationService } from '../services/educationService'
import toast from 'react-hot-toast'
import type { Education } from '../types'

export const useEducations = () => useQuery({
  queryKey: ['educations'],
  queryFn: educationService.getAll,
})

export const useCreateEducation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: educationService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['educations'] })
      toast.success('Data pendidikan berhasil ditambahkan!')
    },
    onError: () => toast.error('Gagal menambahkan data pendidikan.'),
  })
}

export const useUpdateEducation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Education, 'id' | 'created_at' | 'updated_at'> }) =>
      educationService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['educations'] })
      toast.success('Data pendidikan berhasil diupdate!')
    },
    onError: () => toast.error('Gagal mengupdate data pendidikan.'),
  })
}

export const useDeleteEducation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: educationService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['educations'] })
      toast.success('Data pendidikan berhasil dihapus.')
    },
    onError: () => toast.error('Gagal menghapus data pendidikan.'),
  })
}