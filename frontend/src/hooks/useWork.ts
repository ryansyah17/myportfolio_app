import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { workService } from '../services/workService'
import toast from 'react-hot-toast'
import type { WorkHistory } from '../types'

export const useWorkHistories = () => useQuery({
  queryKey: ['work-histories'],
  queryFn: workService.getAll,
})

export const useCreateWork = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: workService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['work-histories'] })
      toast.success('Pengalaman kerja berhasil ditambahkan!')
    },
    onError: () => toast.error('Gagal menambahkan pengalaman kerja.'),
  })
}

export const useUpdateWork = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<WorkHistory, 'id' | 'created_at' | 'updated_at'> }) =>
      workService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['work-histories'] })
      toast.success('Pengalaman kerja berhasil diupdate!')
    },
    onError: () => toast.error('Gagal mengupdate pengalaman kerja.'),
  })
}

export const useDeleteWork = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: workService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['work-histories'] })
      toast.success('Pengalaman kerja berhasil dihapus.')
    },
    onError: () => toast.error('Gagal menghapus pengalaman kerja.'),
  })
}