import { useContacts, useMarkAsRead, useDeleteContact } from '../../hooks/useContact'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Loading from '../../components/ui/Loading'
import { useState } from 'react'

const AdminInboxPage = () => {
    const { data: contacts, isLoading } = useContacts()
    const markAsRead = useMarkAsRead()
    const deleteContact = useDeleteContact()
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const unread = contacts?.filter(c => !c.is_read).length ?? 0

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {unread > 0
                            ? <span className="text-blue-600 font-medium">{unread} pesan belum dibaca</span>
                            : 'Semua pesan sudah dibaca'
                        }
                    </p>
                </div>
            </div>

            {isLoading && <Loading />}

            <div className="space-y-4">
                {contacts?.map((c) => (
                    <div
                        key={c.id}
                        className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 transition-colors ${c.is_read ? 'border-gray-100' : 'border-blue-500'
                            }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-gray-800">{c.name}</h3>
                                    {!c.is_read && (
                                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                                            Baru
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">{c.email}</p>
                                {c.subject && (
                                    <p className="text-sm font-medium text-gray-700 mt-2">
                                        Re: {c.subject}
                                    </p>
                                )}
                                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{c.message}</p>
                                <p className="text-xs text-gray-400 mt-3">
                                    {new Date(c.created_at).toLocaleString('id-ID')}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 shrink-0">
                                {!c.is_read && (
                                    <button
                                        onClick={() => markAsRead.mutate(c.id)}
                                        className="text-xs text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50"
                                    >
                                        Tandai Dibaca
                                    </button>
                                )}
                                <button
                                    onClick={() => setDeleteId(c.id)}
                                    className="text-xs text-red-500 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {contacts?.length === 0 && !isLoading && (
                    <p className="text-center text-gray-400 py-12">Belum ada pesan masuk.</p>
                )}
            </div>

            <ConfirmDialog
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (deleteId) await deleteContact.mutateAsync(deleteId)
                    setDeleteId(null)
                }}
                loading={deleteContact.isPending}
                message="Yakin ingin menghapus pesan ini?"
            />
        </div>
    )
}

export default AdminInboxPage