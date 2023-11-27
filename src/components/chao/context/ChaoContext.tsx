import { createContext, memo, ReactNode, useCallback, useContext } from 'react'
import { 
  Chao, 
  useChaoHasChangesAtIndex,
  useChaoOrganizing as useStoreChaoOrganizing, UseChaoOrganizing as UseStoreChaoOrganizing,
  useReadChaoAtIndex, UseReadChaoData, 
  useWriteChaoAtIndex, UseWriteChaoData 
} from '../../../store'
import { getValue, setValue } from '../../../util/object_path'

interface ChaoProviderData extends UseWriteChaoData {
  index: number
}

interface UseChao<R> extends UseReadChaoData<R>, ChaoProviderData {
}

const Context = createContext<ChaoProviderData | null>(null)

interface ChaoProviderProps {
  index: number
  children?: ReactNode
}

const ChaoProvider = memo(({ index, children }: ChaoProviderProps) => {
  const data = useWriteChaoAtIndex(index)

  return (
    <Context.Provider value={{ index, ...data }}>
      {children}
    </Context.Provider>
  )
})

function useChao<R>(selector: (_: Chao) => R): UseChao<R> {
  const data = useContext(Context)!
  const readChao = useReadChaoAtIndex(data.index, selector)
  return {
    ...readChao,
    ...data
  }
}

interface UseChaoPath<RW> extends UseReadChaoData<RW> {
  index: number
  updateChao: (value: RW) => void
  commitChao: () => void
}

function useChaoPath<RW>(path: string): UseChaoPath<RW> {
  const { updateChao, ...useChaoData } = useChao((c) => getValue(c, path) as RW)
  const updateChaoPath = useCallback((value: RW) => {
    updateChao((c) => setValue(c, path, value))
  }, [path, updateChao])

  return {
    updateChao: updateChaoPath,
    ...useChaoData
  }
}

interface UseChaoHasChanges extends ChaoProviderData {
  hasChanges: boolean
}

function useChaoHasChanges(): UseChaoHasChanges {
  const data = useContext(Context)!
  const hasChanges = useChaoHasChangesAtIndex(data.index)
  return {
    ...hasChanges,
    ...data
  }
}

interface UseChaoOrganizing extends UseStoreChaoOrganizing {
  isValid: boolean
  isFirstInvalid: boolean
}

function useChaoOrganizing(): UseChaoOrganizing {
  const { index } = useContext(Context)!
  const chaoOrganizing = useStoreChaoOrganizing()
  return {
    isValid: index >= (chaoOrganizing.chaoCount - 1),
    isFirstInvalid: index === chaoOrganizing.chaoCount,
    ...chaoOrganizing,
  }
}

export { ChaoProvider, useChao, useChaoPath, useChaoHasChanges, useChaoOrganizing }
