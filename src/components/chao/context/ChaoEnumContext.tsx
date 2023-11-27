import { createContext, memo, ReactNode, useCallback, useContext } from 'react'
import { useChaoPath } from './ChaoContext'

interface ChaoEnumProviderData {
  value: number
  setValueSelected: (value: number) => void
}

const Context = createContext<ChaoEnumProviderData | null>(null)

interface ChaoEnumProviderProps {
  path: string
  children?: ReactNode
}

const ChaoEnumProvider = memo(({ path, children }: ChaoEnumProviderProps) => {
  const { chaoData, updateChao } = useChaoPath<number>(path)
  const setValueSelected = useCallback((value: number) => {
    if (chaoData === value) {
      return;
    }
    updateChao(value)
  }, [chaoData, updateChao])

  return (
    <Context.Provider value={{ value: chaoData, setValueSelected }}>
      {children}
    </Context.Provider>
  )
})

function useChaoEnum(): ChaoEnumProviderData {
  return useContext(Context)!
}

interface ChaoEnumValueData {
  isSelected: boolean
  setSelected: () => void
}

function useChaoEnumValue(value: number): ChaoEnumValueData {
  const providerData = useChaoEnum()
  const isSelected = (providerData.value === value)
  const setValueSelected = providerData.setValueSelected
  const setSelected = useCallback(() => {
    setValueSelected(value)
  }, [setValueSelected])
  return {
    isSelected,
    setSelected
  }
}

export { ChaoEnumProvider, useChaoEnum, useChaoEnumValue }
