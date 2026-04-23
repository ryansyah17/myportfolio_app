import { useState } from 'react'
import {
    useEducations,
    useCreateEducation,
    useDeleteEducation,
} from '../../hooks/useEducation'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import FormField from '../../components/ui/FormField'
import Loading from '../../components/ui/Loading'
import type { Education } from '../../types'

type EduForm = Omit<Education, 'id' | 'created_at' | 'updated_at'>
const empty: EduForm = {
    school: '', degree: '', field_of_study: '',
    start_year: '', end_year: '', description: '', logo_url: '',
}

const AdminEducationPage = () => {
    const { data: educations, isLoading } = useEducations()
    const createMutation = useCreateEducation()
    const deleteMutation = useDeleteEducation()

    const [modalOpen, setModalOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [form, setForm] = useState<EduForm>(empty)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

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
                    <h1 className="text-2xl font-bold text-gray-800">Education</h1>
                    <p className="text-gray-500 text-sm mt-1">{educations?.length ?? 0} data</p>
                </div>
                <button onClick={() => setModalOpen(true)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700">
                    + Tambah Pendidikan
                </button>
            </div>

            {isLoading && <Loading />}

            <div className="space-y-4">
                {educations?.map((edu) => (
                    <div key={edu.id} className="bg-white rounded-2xl p-6 shadow-sm flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-gray-800">{edu.school}</h3>
                            <p className="text-blue-600 text-sm">{edu.degree} — {edu.field_of_study}</p>
                            <p className="text-gray-400 text-xs mt-1">{edu.start_year} — {edu.end_year}</p>
                            {edu.description && <p className="text-gray-500 text-sm mt-2">{edu.description}</p>}
                        </div>
                        <button onClick={() => setDeleteId(edu.id)}
                            className="text-red-500 hover:text-red-700 text-sm shrink-0">
                            Hapus
                        </button>
                    </div>
                ))}
                {educations?.length === 0 && !isLoading && (
                    <p className="text-center text-gray-400 py-12">Belum ada data pendidikan.</p>
                )}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Tambah Pendidikan">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField label="Nama Sekolah / Universitas *">
                        <input name="school" value={form.school} onChange={handleChange} required
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </FormField>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Jenjang">
                            <input name="degree" value={form.degree} onChange={handleChange}
                                placeholder="S1 / S2 / SMK"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </FormField>
                        <FormField label="Jurusan">
                            <input name="field_of_study" value={form.field_of_study} onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </FormField>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Tahun Mulai">
                            <input name="start_year" value={form.start_year} onChange={handleChange}
                                placeholder="2020"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </FormField>
                        <FormField label="Tahun Selesai">
                            <input name="end_year" value={form.end_year} onChange={handleChange}
                                placeholder="2024"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </FormField>
                    </div>
                    <FormField label="Deskripsi">
                        <textarea name="description" value={form.description} onChange={handleChange} rows={2}
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
                message="Yakin ingin menghapus data pendidikan ini?"
            />
        </div>
    )
}

export default AdminEducationPage