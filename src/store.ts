import { useCallback } from "react";
import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'

export interface Chao extends Record<string, any> {

}

interface ChaoSave {
  chao: Chao[]
}

interface LoadedSaves {
  chaoSave: ChaoSave
}

interface AppState {
  loadedSaves: LoadedSaves | null
  setLoadedSaves: (saves: LoadedSaves) => void
  setChaoAtIndex: (chao: Chao, index: number) => void
}

export const useAppState = create<AppState>()(
  devtools(
    (set) => ({
      loadedSaves: null,
      setLoadedSaves: (saves: LoadedSaves) => set((_) => ({ loadedSaves: saves })),
      setChaoAtIndex: (chao: Chao, index: number) => set(produce((state) => {
        state.loadedSaves!.chaoSave.chao[index] = chao;
      })),
    })
  )
)

export function useChaoAtIndex(index: number): [Chao, (_: Chao) => void] {
  const chao = useAppState((state) => state.loadedSaves!.chaoSave.chao[index])
  const setChaoAtIndex = useAppState((state) => state.setChaoAtIndex)
  const setChao = useCallback((chao: Chao) => setChaoAtIndex(chao, index), [index, setChaoAtIndex])
  return [chao, setChao]
}
