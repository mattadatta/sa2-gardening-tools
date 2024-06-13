import { createContext, ReactNode, useCallback, useContext } from 'react'
import { useChaoPath } from './ChaoContext'

interface ChaoEnumProviderData {
  value: number
  setValue: (value: number) => void
}

const Context = createContext<ChaoEnumProviderData | null>(null)

interface ChaoEnumProviderProps {
  path: any[]
  children?: ReactNode
}

const ChaoEnumProvider = ({ path, children }: ChaoEnumProviderProps) => {
  const { value, setValue } = useChaoPath<number>(path)

  return (
    <Context.Provider value={{ value, setValue }}>
      {children}
    </Context.Provider>
  )
}

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
  const setValue = providerData.setValue
  const setSelected = useCallback(() => {
    setValue(value)
  }, [value, setValue])
  return {
    isSelected,
    setSelected
  }
}

export { ChaoEnumProvider, useChaoEnum, useChaoEnumValue }
