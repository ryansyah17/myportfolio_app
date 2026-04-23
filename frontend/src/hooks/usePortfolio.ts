import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { portfolioService } from '../services/portfolioService'

// Hook untuk ambil semua portfolio
export const usePortfolios = () => {
  return useQuery({
    queryKey: ['portfolios'],
    queryFn: portfolioService.getAll,
  })
}

// Hook untuk ambil portfolio by ID
export const usePortfolio = (id: number) => {
  return useQuery({
    queryKey: ['portfolios', id],
    queryFn: () => portfolioService.getById(id),
    enabled: !!id, // hanya fetch kalau id ada
  })
}

// Hook untuk create (dipakai di admin nanti)
export const useCreatePortfolio = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: portfolioService.create,
    onSuccess: () => {
      // Otomatis refresh list setelah create
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
    },
  })
}

// Hook untuk delete (dipakai di admin nanti)
export const useDeletePortfolio = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: portfolioService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
    },
  })
}