import { useState } from 'react'
import {
    usePortfolios,
    useCreatePortfolio,
    useDeletePortfolio,
} from '../../hooks/usePortfolio'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import FormField from '../../components/ui/FormField'
import Loading from '../../components/ui/Loading'
import type { Portfolio } from '../../types'

type PortfolioForm = Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>

const empty: PortfolioForm = {
    title: '', description: '', image_url: '', project_url: '',
    github_url: '', tech_stack: '', category: '', is_featured: false,
}

const AdminPortfolioPage = () => {
    const { data: portfolios, isLoading } = usePortfolios()
    const createMutation = useCreatePortfolio()
    const deleteMutation = useDeletePortfolio()

    const [modalOpen, setModalOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [form, setForm] = useState<PortfolioForm>(empty)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await createMutation.mutateAsync(form)
        setModalOpen(false)
        setForm(empty)
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Portfolio</h1>
                    <p className="text-gray-500 text-sm mt-1">{portfolios?.length ?? 0} project</p>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                    + Tambah Portfolio
                </button>
            </div>

            {isLoading && <Loading />}

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Judul</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Tech Stack</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Featured</th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {portfolios?.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-800">{p.title}</td>
                                <td className="px-6 py-4">
                                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                        {p.category || '-'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{p.tech_stack}</td>
                                <td className="px-6 py-4">
                                    {p.is_featured
                                        ? <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">Ya</span>
                                        : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Tidak</span>
                                    }
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => setDeleteId(p.id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {portfolios?.length === 0 && !isLoading && (
                    <p className="text-center text-gray-400 py-12">Belum ada portfolio.</p>
                )}
            </div>

            {/* Modal Tambah */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Portfolio">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Judul *">
                        <input name="title" value={form.title} onChange={handleChange} required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <FormField label="Deskripsi">
                        <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    </FormField>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Kategori">
                            <input name="category" value={form.category} onChange={handleChange}
                                placeholder="Web / Mobile / dll"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </FormField>
                        <FormField label="Tech Stack">
                            <input name="tech_stack" value={form.tech_stack} onChange={handleChange}
                                placeholder="Go, React, MySQL"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </FormField>
                    </div>
                    <FormField label="URL Project">
                        <input name="project_url" value={form.project_url} onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <FormField label="URL GitHub">
                        <input name="github_url" value={form.github_url} onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <FormField label="URL Gambar">
                        <input name="image_url" value={form.image_url} onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_featured" checked={form.is_featured}
                            onChange={handleChange} className="w-4 h-4 accent-blue-600" />
                        <span className="text-sm text-gray-700">Tampilkan sebagai Featured</span>
                    </label>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setModalOpen(false)}
                            className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm hover:bg-gray-50">
                            Batal
                        </button>
                        <button type="submit" disabled={createMutation.isPending}
                            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50">
                            {createMutation.isPending ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Confirm Delete */}
            <ConfirmDialog
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (deleteId) await deleteMutation.mutateAsync(deleteId)
                    setDeleteId(null)
                }}
                loading={deleteMutation.isPending}
                message="Yakin ingin menghapus portfolio ini? Tindakan ini tidak bisa dibatalkan."
            />
        </div>
    )
}

export default AdminPortfolioPage