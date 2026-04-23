import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contactService } from '../services/contactService'
import toast from 'react-hot-toast'

export const useContacts = () => useQuery({
    queryKey: ['contacts'],
    queryFn: contactService.getAll,
})

export const useMarkAsRead = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: contactService.markAsRead,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['contacts'] })
            toast.success('Pesan ditandai sudah dibaca.')
        },
    })
}

export const useDeleteContact = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: contactService.delete,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['contacts'] })
            toast.success('Pesan berhasil dihapus.')
        },
        onError: () => toast.error('Gagal menghapus pesan.'),
    })
}