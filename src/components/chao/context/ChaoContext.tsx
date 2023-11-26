import { createContext, memo, ReactNode, useContext } from 'react'
import { Chao, useReadChaoAtIndex, UseReadChaoData, useWriteChaoAtIndex, UseWriteChaoData } from '../../../store'

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

export { ChaoProvider, useChao }
