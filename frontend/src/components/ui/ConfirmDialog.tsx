import Modal from './Modal'

interface Props {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    message: string
    loading?: boolean
}

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message, loading }: Props) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi">
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
            <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
            >
                Batal
            </button>
            <button
                onClick={onConfirm}
                disabled={loading}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
                {loading ? 'Menghapus...' : 'Hapus'}
            </button>
        </div>
    </Modal>
)

export default ConfirmDialog