import { createContext, memo, ReactNode, useContext } from 'react'
import { Chao, useReadChaoAtIndex, UseReadChaoData, useWriteChaoAtIndex, UseWriteChaoData } from '../../store'

interface ChaoProviderData extends UseWriteChaoData {
  index: number
}

interface UseChao<R> extends UseReadChaoData<R>, UseWriteChaoData {
}

const ChaoContext = createContext<ChaoProviderData | null>(null)

interface ChaoProviderProps {
  index: number
  children?: ReactNode | undefined
}

const ChaoProvider = memo(({ index, children }: ChaoProviderProps) => {
  const data = useWriteChaoAtIndex(index)

  return (
    <ChaoContext.Provider value={{ index, ...data}}>
      {children}
    </ChaoContext.Provider>
  )
})

function useWriteChaoData(): UseWriteChaoData {
  return useContext(ChaoContext)!
}

function useReadChaoData<R>(selector: (_: Chao) => R): UseReadChaoData<R> {
  const index = useContext(ChaoContext)!.index
  return useReadChaoAtIndex(index, selector)
}

function useChao<R>(selector: (_: Chao) => R): UseChao<R> {
  const readChao = useReadChaoData(selector)
  const writeChao = useWriteChaoData()
  return {
    ...readChao,
    ...writeChao
  }
}

export { ChaoProvider, useWriteChaoData, useReadChaoData, useChao }
