import { useCallback } from "react";
import { create } from "zustand";
import { useShallow } from 'zustand/react/shallow'
import { produce, enableMapSet } from 'immer'
import { processFiles, createDeletedChao, createNewChao, readInChao, writeOutChao, writeOutChaoSave } from "./backend";
import { chaoBytesToString } from "./util/chao/name";
import { getValue, setValue } from "./util/object_path";

enableMapSet()

interface LoadedSave {
  chaoSave: ChaoSave
}

interface ChaoSave extends Record<string, any> {
  chao: Chao[]
}

export interface Chao extends Record<string, any> {
}

export type ObjectPath = string | any[]

interface AppState {
  loadedSave: LoadedSave | null
  isReading: boolean
  isWriting: boolean
  currentError: any | null
  setCurrentError: (e: any | null) => void
  processFiles: (paths: string[]) => void
  getSavePathValue: (path: ObjectPath) => any
  setSavePathValue: (path: ObjectPath, value: any | ((value: any) => void)) => void

  readChaoAtIndex: (index: number, useNew: boolean) => void
  writeChaoAtIndex: (index: number) => void
  deleteChaoAtIndex: (index: number) => void

  swapChao: (index1: number, index2: number) => void
  copyChao: (src: number, dst: number) => void
  writeChaoSave: () => void
}

export const useAppState = create<AppState>()((set, get) => ({
  loadedSave: null,
  isReading: false,
  isWriting: false,
  currentError: null,
  setCurrentError: (e) => set(produce((state: AppState) => {
    state.currentError = e
  })),
  processFiles: async (paths: string[]) => {
    try {
      const save = JSON.parse(await processFiles(paths)) as LoadedSave
      set(produce((state: AppState) => {
        state.loadedSave = save
      }))
    } catch (e: any) {
      set(produce((state: AppState) => {
        state.loadedSave = null
        state.currentError = e
      }))
    }
  },
  getSavePathValue: (path) => getValue(get().loadedSave!, path),
  setSavePathValue: (path, value) => set(produce((state: AppState) => {
    if (typeof value === "function") {
      const existingValue = getValue(state.loadedSave!, path)
      setValue(state.loadedSave!, path, value(existingValue))
    } else {
      setValue(state.loadedSave!, path, value)
    }
  })),
  readChaoAtIndex: async (index: number, useNew: boolean) => {
    set(produce((state: AppState) => {
      state.isReading = true
    }))
    try {
      const chao = JSON.parse(useNew ? await createNewChao() : await readInChao())
      set(produce((state: AppState) => {
        state.loadedSave!.chaoSave.chao[index] = chao
      }))
    } catch (e: any) {
      set(produce((state: AppState) => {
        state.currentError = e
      }))
    }
    set(produce((state: AppState) => {
      state.isReading = false
    }))
  },
  writeChaoAtIndex: async (index: number) => {
    set(produce((state: AppState) => {
      state.isWriting = true
    }))
    const chao = get().loadedSave!.chaoSave.chao[index]
    const chaoName = chaoBytesToString(chao.name)
    try {
      await writeOutChao(chaoName, JSON.stringify(chao))
    } catch (e: any) {
      set(produce((state: AppState) => {
        state.currentError = e
      }))
    }
    set(produce((state: AppState) => {
      state.isWriting = false
    }))
  },
  deleteChaoAtIndex: async (index: number) => {
    set(produce((state: AppState) => {
      state.isWriting = true
    }))
    try {
      const deletedChao = JSON.parse(await createDeletedChao())
      set(produce((state: AppState) => {
        state.isWriting = false
        for (let i = index; i < 23; i++) {
          const srcChao = state.loadedSave!.chaoSave.chao[i + 1]
          state.loadedSave!.chaoSave.chao[i] = srcChao
        }
        state.loadedSave!.chaoSave.chao[23] = deletedChao
      }))
    } catch (e: any) {
      set(produce((state: AppState) => {
        state.currentError = e
      }))
    }
    set(produce((state: AppState) => {
      state.isWriting = false
    }))
  },
  swapChao: (index1: number, index2: number) => set(produce((state: AppState) => {
    const chao1 = state.loadedSave!.chaoSave.chao[index1]
    const chao2 = state.loadedSave!.chaoSave.chao[index2]
    state.loadedSave!.chaoSave.chao[index1] = chao2
    state.loadedSave!.chaoSave.chao[index2] = chao1
  })),
  copyChao: (src: number, dst: number) => set(produce((state: AppState) => {
    const srcChao = state.loadedSave!.chaoSave.chao[src]
    state.loadedSave!.chaoSave.chao[dst] = srcChao
  })),
  writeChaoSave: async () => {
    set(produce((state: AppState) => {
      state.isWriting = true
    }))
    try {
      await writeOutChaoSave(JSON.stringify(get().loadedSave))
    } catch (e: any) {
      set(produce((state: AppState) => {
        state.currentError = e
      }))
    }
    set(produce((state: AppState) => {
      state.isWriting = false
    }))
  }
}))

export interface UseCurrentError {
  error: any | null
  setError: (e: any | null) => void
}

export function useCurrentError(): UseCurrentError {
  const error = useAppState((state) => state.currentError)
  const setError = useAppState((state) => state.setCurrentError)
  return {
    error,
    setError
  }
}

export interface UseProcessFiles {
  processFiles: (paths: string[]) => void
}

export function useProcessFiles(): UseProcessFiles {
  const processFiles = useAppState((state) => state.processFiles)
  return {
    processFiles
  }
}

export interface UseLoadedSave extends LoadedSave {
}

export function useLoadedSave(): UseLoadedSave | null {
  return useAppState((state) => state.loadedSave)
}

export interface UseSavePath<RW> {
  value: RW
  setValue: (value: RW | ((value: RW) => void)) => void
}

export function useSavePath<RW>(path: ObjectPath, shallow: boolean = false): UseSavePath<RW> {
  const value = useAppState(shallow ?
    useShallow((state) => state.getSavePathValue(path) as RW) :
    (state) => state.getSavePathValue(path) as RW)
  const setSavePathValue = useAppState((state) => state.setSavePathValue)
  const setValue = useCallback((value: RW | ((value: RW) => void)) => {
    setSavePathValue(path, value)
  }, [path, setSavePathValue])

  return {
    value,
    setValue
  }
}

export function useChaoSavePath<RW>(path: ObjectPath, shallow: boolean = false): UseSavePath<RW> {
  return useSavePath<RW>(['chaoSave', ...path], shallow)
}

export interface UseWriteChaoData {
  createChao: () => void
  deleteChao: () => void
  readChao: () => void
  writeChao: () => void
}

export function useWriteChaoAtIndex(index: number): UseWriteChaoData {
  const readChaoAtIndex = useAppState((state) => state.readChaoAtIndex)
  const writeChaoAtIndex = useAppState((state) => state.writeChaoAtIndex)
  const deleteChaoAtIndex = useAppState((state) => state.deleteChaoAtIndex)

  const createChao = useCallback(
    () => readChaoAtIndex(index, true),
    [index, readChaoAtIndex])
  const readChao = useCallback(
    () => readChaoAtIndex(index, false),
    [index, readChaoAtIndex])
  const writeChao = useCallback(
    () => writeChaoAtIndex(index),
    [index, writeChaoAtIndex])
  const deleteChao = useCallback(
    () => deleteChaoAtIndex(index),
    [index, deleteChaoAtIndex])

  return {
    createChao,
    readChao,
    writeChao,
    deleteChao
  }
}

export interface UseChaoOrganizing {
  chaoCount: number
  createChao: () => void
  swapChao: (index1: number, index2: number) => void
  copyChao: (src: number, dst: number) => void
  writeChaoSave: () => void
}

export function useChaoOrganizing(): UseChaoOrganizing {
  const chaoCount = useAppState((state) => Math.max(state.loadedSave!.chaoSave.chao.findIndex((c) => c.chaoType === 0), 0))
  const readChaoAtIndex = useAppState((state) => state.readChaoAtIndex)
  const createChao = useCallback(() => {
    readChaoAtIndex(chaoCount, true)
  }, [chaoCount, readChaoAtIndex])
  const swapChao = useAppState((state) => state.swapChao)
  const copyChao = useAppState((state) => state.copyChao)
  const writeChaoSave = useAppState((state) => state.writeChaoSave)
  return {
    chaoCount,
    createChao,
    swapChao,
    copyChao,
    writeChaoSave,
  }
}
