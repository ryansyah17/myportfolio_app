import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { portfolioService } from '../services/portfolioService'
import toast from 'react-hot-toast'
import type { Portfolio } from '../types'

export const usePortfolios = () => useQuery({
  queryKey: ['portfolios'],
  queryFn: portfolioService.getAll,
})

export const usePortfolio = (id: number) => useQuery({
  queryKey: ['portfolios', id],
  queryFn: () => portfolioService.getById(id),
  enabled: !!id,
})

export const useCreatePortfolio = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: portfolioService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['portfolios'] })
      toast.success('Portfolio berhasil ditambahkan!')
    },
    onError: () => toast.error('Gagal menambahkan portfolio.'),
  })
}

export const useDeletePortfolio = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: portfolioService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['portfolios'] })
      toast.success('Portfolio berhasil dihapus.')
    },
    onError: () => toast.error('Gagal menghapus portfolio.'),
  })
}