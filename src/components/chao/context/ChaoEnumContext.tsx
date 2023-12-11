import { createContext, memo, ReactNode, useCallback, useContext } from 'react'
import { useChaoPath } from './ChaoContext'

interface ChaoEnumProviderData {
  value: number
  setValueSelected: (value: number) => void
}

const Context = createContext<ChaoEnumProviderData | null>(null)

interface ChaoEnumProviderProps {
  path: any[]
  children?: ReactNode
}

const ChaoEnumProvider = memo(({ path, children }: ChaoEnumProviderProps) => {
  const { value, setValue } = useChaoPath<number>(path)
  const setValueSelected = useCallback((newValue: number) => {
    if (value === newValue) {
      return;
    }
    setValue(newValue)
  }, [value, setValue])

  return (
    <Context.Provider value={{ value, setValueSelected }}>
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
