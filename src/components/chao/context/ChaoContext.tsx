import { createContext, ReactNode, useCallback, useContext } from 'react'
import {
  useChaoSavePath, UseSavePath,
  useWriteChaoAtIndex, UseWriteChaoData,
  useChaoOrganizing as useStoreChaoOrganizing
} from '../../../store'

interface ChaoProviderData {
  index: number
}

const Context = createContext<ChaoProviderData | null>(null)

interface ChaoProviderProps {
  index: number
  children?: ReactNode
}

const ChaoProvider = ({ index, children }: ChaoProviderProps) => {
  return (
    <Context.Provider value={{ index }}>
      {children}
    </Context.Provider>
  )
}

interface UseChao extends ChaoProviderData {
}

function useChao(): UseChao | null {
  return useContext(Context)
}

interface UseChaoPath<RW> extends UseChao, UseSavePath<RW> {
}

function useChaoPath<RW>(path: any[], shallow: boolean = false): UseChaoPath<RW> {
  const chao = useChao()!
  const savePath = useChaoSavePath<RW>(['chao', chao.index, ...path], shallow)
  return {
    ...chao,
    ...savePath
  }
}

interface UseChaoOrganizing extends ChaoProviderData, UseWriteChaoData {
  isValid: boolean
  isLastValid: boolean
  isFirstInvalid: boolean
  copyChao: (offset: number) => void
  swapChao: (offset: number) => void
}

function useChaoOrganizing(): UseChaoOrganizing {
  const { index } = useContext(Context)!
  const { chaoCount, copyChao, swapChao } = useStoreChaoOrganizing()
  const writeChao = useWriteChaoAtIndex(index)
  const copyChaoOffset = useCallback((offset: number) => {
    copyChao(index, index + offset)
  }, [copyChao, index])
  const swapChaoOffset = useCallback((offset: number) => {
    swapChao(index, index + offset)
  }, [swapChao, index])
  
  return {
    index,
    isValid: index <= (chaoCount - 1),
    isLastValid: index === (chaoCount - 1),
    isFirstInvalid: index === chaoCount,
    copyChao: copyChaoOffset,
    swapChao: swapChaoOffset,
    ...writeChao,
  }
}

export { ChaoProvider, useChao, useChaoPath, useChaoOrganizing }
