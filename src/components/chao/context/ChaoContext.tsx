import { createContext, memo, ReactNode, useCallback, useContext } from 'react'
import { Chao, useReadChaoAtIndex, UseReadChaoData, useWriteChaoAtIndex, UseWriteChaoData } from '../../../store'
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

export { ChaoProvider, useChao, useChaoPath }
