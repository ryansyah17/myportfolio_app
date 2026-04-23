import { useState } from 'react'
import { useBlogs, useCreateBlog, useDeleteBlog } from '../../hooks/useBlog'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import FormField from '../../components/ui/FormField'
import Loading from '../../components/ui/Loading'
import type { Blog } from '../../types'

type BlogForm = Omit<Blog, 'id' | 'created_at' | 'updated_at'>
const empty: BlogForm = {
    title: '', slug: '', content: '', excerpt: '',
    image_url: '', category: '', is_published: false,
}

const AdminBlogPage = () => {
    // all=true agar admin lihat draft juga
    const { data: blogs, isLoading } = useBlogs(true)
    const createMutation = useCreateBlog()
    const deleteMutation = useDeleteBlog()

    const [modalOpen, setModalOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [form, setForm] = useState<BlogForm>(empty)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Blog</h1>
                    <p className="text-gray-500 text-sm mt-1">{blogs?.length ?? 0} artikel</p>
                </div>
                <button onClick={() => setModalOpen(true)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
                    + Tulis Artikel
                </button>
            </div>

            {isLoading && <Loading />}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Judul</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {blogs?.map((b) => (
                            <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-800">{b.title}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{b.slug}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                                        {b.category || 'General'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {b.is_published
                                        ? <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">Published</span>
                                        : <span className="text-xs bg-yellow-50 text-yellow-600 px-2 py-1 rounded-full">Draft</span>
                                    }
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(b.created_at).toLocaleDateString('id-ID')}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => setDeleteId(b.id)}
                                        className="text-red-500 hover:text-red-700 text-sm">
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {blogs?.length === 0 && !isLoading && (
                    <p className="text-center text-gray-400 py-12">Belum ada artikel.</p>
                )}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Tulis Artikel Baru">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Judul *">
                        <input name="title" value={form.title} onChange={handleChange} required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <FormField label="Slug (kosongkan untuk auto-generate)">
                        <input name="slug" value={form.slug} onChange={handleChange}
                            placeholder="judul-artikel-saya"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <FormField label="Kategori">
                        <input name="category" value={form.category} onChange={handleChange}
                            placeholder="Tutorial / Tips / dll"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <FormField label="Excerpt (ringkasan singkat)">
                        <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    </FormField>
                    <FormField label="Konten *">
                        <textarea name="content" value={form.content} onChange={handleChange} rows={6} required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    </FormField>
                    <FormField label="URL Gambar Cover">
                        <input name="image_url" value={form.image_url} onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_published" checked={form.is_published}
                            onChange={handleChange} className="w-4 h-4 accent-blue-600" />
                        <span className="text-sm text-gray-700">Publish sekarang</span>
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

            <ConfirmDialog
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (deleteId) await deleteMutation.mutateAsync(deleteId)
                    setDeleteId(null)
                }}
                loading={deleteMutation.isPending}
                message="Yakin ingin menghapus artikel ini?"
            />
        </div>
    )
}

export default AdminBlogPage