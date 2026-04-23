import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
    isDark: boolean
    toggle: () => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            isDark: false,
            toggle: () => {
                const next = !get().isDark
                // Tambah/hapus class 'dark' di <html>
                document.documentElement.classList.toggle('dark', next)
                set({ isDark: next })
            },
        }),
        { name: 'theme-storage' }
    )
)

// Inisialisasi saat app load — terapkan tema yang tersimpan
export const initTheme = () => {
    const raw = localStorage.getItem('theme-storage')
    if (raw) {
        try {
            const { state } = JSON.parse(raw)
            if (state?.isDark) {
                document.documentElement.classList.add('dark')
            }
        } catch {
            // abaikan error parsing
        }
    }
}