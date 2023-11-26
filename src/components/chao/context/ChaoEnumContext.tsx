import { createContext, memo, ReactNode, useCallback, useContext } from 'react'
import { useChao } from './ChaoContext'

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
  const { chaoData, updateChao } = useChao((c) => c[path] as number)
  const setValueSelected = useCallback((value: number) => {
    if (chaoData === value) {
      return;
    }
    updateChao((c) => c[path] = value)
  }, [chaoData, updateChao])

  return (
    <Context.Provider value={{ value: chaoData, setValueSelected }}>
      {children}
    </Context.Provider>
  )
})

interface ChaoEnumValueData {
  isSelected: boolean
  setSelected: () => void
}

function useChaoEnumValue(value: number): ChaoEnumValueData {
  const providerData = useContext(Context)!
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

export { ChaoEnumProvider, useChaoEnumValue }
