import { create } from "zustand";
import { devtools } from 'zustand/middleware'

interface ChaoSave extends Record<string, any> {
}

interface LoadedSaves {
  chaoSave: ChaoSave
}

interface AppState {
  loadedSaves: LoadedSaves | null
  setLoadedSaves: (saves: LoadedSaves) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      loadedSaves: null,
      setLoadedSaves: (saves: LoadedSaves) => set((_) => ({ loadedSaves: saves })),
    })
  )
)
