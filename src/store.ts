import { useCallback } from "react";
import { create } from "zustand";
import { useShallow } from 'zustand/react/shallow'
import { produce, enableMapSet } from 'immer'
import { readInChao, writeOutChao, writeOutChaoSave } from "./backend";
import { chaoBytesToString } from "./util/chao/name";

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
  isReading: boolean
  isWriting: boolean
  setLoadedSaves: (saves: LoadedSaves) => void
  updateChaoAtIndex: (index: number, update: (_: Chao) => void) => void
  commitChaoAtIndex: (index: number) => void
  readChaoAtIndex: (index: number) => void
  writeChaoAtIndex: (index: number) => void
  abandonChangesAtIndex: (index: number) => void
  swapChao: (index1: number, index2: number) => void
  copyChao: (src: number, dst: number) => void
  writeChanges: () => Promise<void>
}

export const useAppState = create<AppState>()((set, get) => ({
  loadedSaves: null,
  modifiedChao: new Map<number, Chao>(),
  isReading: false,
  isWriting: false,
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
  readChaoAtIndex: async (index: number) => {
    set(produce((state: AppState) => {
      state.isReading = true
    }))
    const chao = JSON.parse(await readInChao())
    set(produce((state: AppState) => {
      state.loadedSaves!.chaoSave.chao[index] = chao
      state.isReading = false
    }))
  },
  writeChaoAtIndex: async (index: number) => {
    set(produce((state: AppState) => {
      state.isWriting = true
    }))
    const chao = get().loadedSaves!.chaoSave.chao[index]
    const chaoName = chaoBytesToString(chao.name)
    await writeOutChao(chaoName, JSON.stringify(chao))
    set(produce((state: AppState) => {
      state.isWriting = false
    }))
  },
  abandonChangesAtIndex: (index: number) => set(produce((state: AppState) => {
    state.modifiedChao.delete(index)
  })),
  swapChao: (index1: number, index2: number) => set(produce((state: AppState) => {
    const chao1 = state.loadedSaves!.chaoSave.chao[index1]
    const chao2 = state.loadedSaves!.chaoSave.chao[index2]
    state.loadedSaves!.chaoSave.chao[index1] = chao2
    state.loadedSaves!.chaoSave.chao[index2] = chao1
    const modifiedChao1 = state.modifiedChao.get(index1)
    const modifiedChao2 = state.modifiedChao.get(index2)
    if (modifiedChao2) {
      state.modifiedChao.set(index1, modifiedChao2)
    } else {
      state.modifiedChao.delete(index1)
    }
    if (modifiedChao1) {
      state.modifiedChao.set(index2, modifiedChao1)
    } else {
      state.modifiedChao.delete(index2)
    }
  })),
  copyChao: (src: number, dst: number) => set(produce((state: AppState) => {
    const srcChao = state.loadedSaves!.chaoSave.chao[src]
    state.loadedSaves!.chaoSave.chao[dst] = srcChao
    const srcModifiedChao = state.modifiedChao.get(src)
    if (srcModifiedChao) {
      state.modifiedChao.set(dst, srcModifiedChao)
    } else {
      state.modifiedChao.delete(dst)
    }
  })),
  writeChanges: async () => {
    set(produce((state: AppState) => {
      state.isWriting = true
    }))
    await writeOutChaoSave(JSON.stringify(get().loadedSaves!.chaoSave))
    set(produce((state: AppState) => {
      state.isWriting = false
    }))
  }
}))

export interface UseReadChaoData<R> {
  chaoData: R
  originalData: R
  hasChanges: boolean
}

export interface UseWriteChaoData {
  updateChao: (update: (_: Chao) => void) => void
  commitChao: () => void
  readChao: () => void
  writeChao: () => void
  abandonChanges: () => void
}

export function useWriteChaoAtIndex(index: number): UseWriteChaoData {
  const updateChaoAtIndex = useAppState((state) => state.updateChaoAtIndex)
  const commitChaoAtIndex = useAppState((state) => state.commitChaoAtIndex)
  const readChaoAtIndex = useAppState((state) => state.readChaoAtIndex)
  const writeChaoAtIndex = useAppState((state) => state.writeChaoAtIndex)
  const abandonChangesAtIndex = useAppState((state) => state.abandonChangesAtIndex)
  const updateChao = useCallback(
    (update: (_: Chao) => void) => updateChaoAtIndex(index, update),
    [index, updateChaoAtIndex])
  const commitChao = useCallback(
    () => commitChaoAtIndex(index),
    [index, commitChaoAtIndex])
  const readChao = useCallback(
    () => readChaoAtIndex(index),
    [index, readChaoAtIndex])
  const writeChao = useCallback(
    () => writeChaoAtIndex(index),
    [index, writeChaoAtIndex])
  const abandonChanges = useCallback(
    () => abandonChangesAtIndex(index),
    [index, abandonChangesAtIndex])
  return {
    updateChao,
    commitChao,
    readChao,
    writeChao,
    abandonChanges
  }
}

export function useReadChaoAtIndex<R>(index: number, selector: (_: Chao) => R): UseReadChaoData<R> {
  const [chaoData, modifiedData] = useAppState(useShallow((state) => {
    return [
      selector(state.loadedSaves!.chaoSave.chao[index]),
      (() => {
        const chao = state.modifiedChao.get(index)
        if (chao) {
          return selector(chao)
        } else {
          return undefined
        }
      })()]
  }))
  return {
    chaoData: modifiedData ?? chaoData,
    originalData: chaoData,
    hasChanges: modifiedData !== undefined
  }
}

export interface UseChaoHasChanges {
  hasChanges: boolean
}

export function useChaoHasChangesAtIndex(index: number): UseChaoHasChanges {
  const hasChanges = useAppState((state) => state.modifiedChao.has(index))
  return {
    hasChanges
  }
}

export interface UseChaoOrganizing {
  chaoCount: number
  swapChao: (index1: number, index2: number) => void
  copyChao: (src: number, dst: number) => void
  writeChaoSave: () => Promise<void>
}

export function useChaoOrganizing(): UseChaoOrganizing {
  const chaoCount = useAppState((state) => state.loadedSaves!.chaoSave.chao.findIndex((c) => c.garden === 0))
  const swapChao = useAppState((state) => state.swapChao)
  const copyChao = useAppState((state) => state.copyChao)
  const writeChaoSave = useAppState((state) => state.writeChanges)
  return {
    chaoCount,
    swapChao,
    copyChao,
    writeChaoSave,
  }
}
