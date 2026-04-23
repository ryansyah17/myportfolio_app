import { useState } from 'react'
import {
    useWorkHistories,
    useCreateWork,
    useDeleteWork,
} from '../../hooks/useWork'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import FormField from '../../components/ui/FormField'
import Loading from '../../components/ui/Loading'
import type { WorkHistory } from '../../types'

type WorkForm = Omit<WorkHistory, 'id' | 'created_at' | 'updated_at'>
const empty: WorkForm = {
    company: '', position: '', start_date: '', end_date: '',
    is_current: false, description: '', logo_url: '',
}

const AdminWorkPage = () => {
    const { data: works, isLoading } = useWorkHistories()
    const createMutation = useCreateWork()
    const deleteMutation = useDeleteWork()

    const [modalOpen, setModalOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [form, setForm] = useState<WorkForm>(empty)

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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Work History</h1>
                    <p className="text-gray-500 text-sm mt-1">{works?.length ?? 0} data</p>
                </div>
                <button onClick={() => setModalOpen(true)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
                    + Tambah Pengalaman
                </button>
            </div>

            {isLoading && <Loading />}

            <div className="space-y-4">
                {works?.map((w) => (
                    <div key={w.id} className="bg-white rounded-2xl p-6 shadow-sm flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-gray-800">{w.position}</h3>
                            <p className="text-blue-600 text-sm">{w.company}</p>
                            <p className="text-gray-400 text-xs mt-1">
                                {w.start_date} — {w.is_current ? 'Sekarang' : w.end_date}
                            </p>
                            {w.description && <p className="text-gray-500 text-sm mt-2">{w.description}</p>}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            {w.is_current && (
                                <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                                    Current
                                </span>
                            )}
                            <button onClick={() => setDeleteId(w.id)}
                                className="text-red-500 hover:text-red-700 text-sm">
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
                {works?.length === 0 && !isLoading && (
                    <p className="text-center text-gray-400 py-12">Belum ada work history.</p>
                )}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Pengalaman Kerja">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Nama Perusahaan *">
                        <input name="company" value={form.company} onChange={handleChange} required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <FormField label="Posisi / Jabatan *">
                        <input name="position" value={form.position} onChange={handleChange} required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Tanggal Mulai">
                            <input name="start_date" value={form.start_date} onChange={handleChange}
                                placeholder="Jan 2022"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </FormField>
                        <FormField label="Tanggal Selesai">
                            <input name="end_date" value={form.end_date} onChange={handleChange}
                                placeholder="Des 2023"
                                disabled={form.is_current}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
                        </FormField>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_current" checked={form.is_current}
                            onChange={handleChange} className="w-4 h-4 accent-blue-600" />
                        <span className="text-sm text-gray-700">Masih bekerja di sini</span>
                    </label>
                    <FormField label="Deskripsi">
                        <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    </FormField>
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
                message="Yakin ingin menghapus data pengalaman kerja ini?"
            />
        </div>
    )
}

export default AdminWorkPage