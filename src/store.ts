import { useCallback } from "react";
import { create } from "zustand";
import { useShallow } from 'zustand/react/shallow'
import { produce, enableMapSet } from 'immer'

enableMapSet()

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
  modifiedChao: Map<number, Chao>
  setLoadedSaves: (saves: LoadedSaves) => void
  updateChaoAtIndex: (index: number, update: (_: Chao) => void) => void
  commitChaoAtIndex: (index: number) => void
}

export const useAppState = create<AppState>()((set) => ({
  loadedSaves: null,
  modifiedChao: new Map<number, Chao>(),
  setLoadedSaves: (saves: LoadedSaves) => set((_) => ({ loadedSaves: saves })),
  updateChaoAtIndex: (index: number, update: (_: Chao) => void) => set((state) => {
    var withMod = state
    if (!state.modifiedChao.has(index)) {
      withMod = produce(state, (state: AppState) => {
        state.modifiedChao.set(index, state.loadedSaves!.chaoSave.chao[index])
      })
    }

    return produce(withMod, (state: AppState) => {
      update(state.modifiedChao.get(index)!)
    })
  }),
  commitChaoAtIndex: (index: number) => set(produce((state: AppState) => {
    state.loadedSaves!.chaoSave.chao[index] = state.modifiedChao.get(index)!
    state.modifiedChao.delete(index)
  })),
}))

export interface UseReadChaoData<R> {
  chaoData: R
  originalData: R
  hasChanges: boolean
}

export interface UseWriteChaoData {
  updateChao: (update: (_: Chao) => void) => void
  commitChao: () => void
}

export function useWriteChaoAtIndex(index: number): UseWriteChaoData {
  const updateChaoAtIndex = useAppState((state) => state.updateChaoAtIndex)
  const commitChaoAtIndex = useAppState((state) => state.commitChaoAtIndex)
  const updateChao = useCallback((update: (_: Chao) => void) => updateChaoAtIndex(index, update), [index, updateChaoAtIndex])
  const commitChao = useCallback(() => commitChaoAtIndex(index), [index, commitChaoAtIndex])
  return {
    updateChao,
    commitChao
  }
}

export function useReadChaoAtIndex<R>(index: number, selector: (_: Chao) => R): UseReadChaoData<R> {
  const chaoData = useAppState(useShallow((state) => selector(state.loadedSaves!.chaoSave.chao[index])))
  const modifiedData = useAppState(useShallow((state) => {
    const chao = state.modifiedChao.get(index)
    if (chao !== undefined) {
      return selector(chao)
    } else {
      return undefined
    }
  }))
  return {
    chaoData: modifiedData || chaoData,
    originalData: chaoData,
    hasChanges: modifiedData !== undefined
  }
}
