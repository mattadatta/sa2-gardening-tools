import { createContext, memo, ReactNode, useCallback, useContext } from 'react'
import { useChaoPath } from './ChaoContext'

interface ChaoBitflagProviderData {
  value: number
  setValueSelected: (value: number, selected: boolean) => void
  selectAll: (selected: boolean) => void
}

const Context = createContext<ChaoBitflagProviderData | null>(null)

interface ChaoBitflagProviderProps {
  path: any[]
  type: any
  children?: ReactNode
}

const ChaoBitflagProvider = memo(({ path, type, children }: ChaoBitflagProviderProps) => {
  const { value, setValue } = useChaoPath<number>(path)
  const setValueSelected = useCallback((newValue: number, selected: boolean) => {
    if (((value & newValue) === newValue) === selected) {
      return
    }
    setValue(value ^ newValue)
  }, [value, setValue])
  const selectAll = useCallback((selected: boolean) => {
    const newValue = selected ?
      Object.values(type).filter(x => typeof x === "number").reduce((acc: number, v: any) => { return (acc | v) }, 0) : 0
    setValue(newValue)
  }, [setValue])

  return (
    <Context.Provider value={{ value, setValueSelected, selectAll }}>
      {children}
    </Context.Provider>
  )
})

interface ChaoBitflagValueData {
  isSelected: boolean
  setSelected: (enabled: boolean) => void
  toggleSelected: () => void
}

function useChaoBitflagValue(value: number): ChaoBitflagValueData {
  const providerData = useContext(Context)!
  const isSelected = ((providerData.value & value) === value)
  const setValueSelected = providerData.setValueSelected
  const setSelected = useCallback((selected: boolean) => {
    setValueSelected(value, selected)
  }, [setValueSelected])
  const toggleSelected = useCallback(() => {
    setSelected(!isSelected)
  }, [isSelected, setSelected])
  return {
    isSelected,
    setSelected,
    toggleSelected,
  }
}

export { ChaoBitflagProvider, useChaoBitflagValue }
