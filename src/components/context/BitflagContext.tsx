import { createContext, ReactNode, useCallback, useContext } from 'react'

interface BitflagProviderData {
  value: number
  setValueSelected: (value: number, selected: boolean) => void
  selectAll: (selected: boolean) => void
}

const Context = createContext<BitflagProviderData | null>(null)

interface BitflagProviderProps {
  value: number,
  setValue: (value: number) => void
  type: any
  children?: ReactNode
}

const BitflagProvider = ({ value, setValue, type, children }: BitflagProviderProps) => {
  const setValueSelected = useCallback((v: number, selected: boolean) => {
    if (((value & v) === v) === selected) {
      return
    }
    setValue((value ^ v) >>> 0)
  }, [value, setValue])
  const selectAll = useCallback((selected: boolean) => {
    if (selected) {
      let newValue = 0
      const numericValues = Object.values(type).filter(x => typeof x === "number");
      numericValues.forEach((v) => value |= (v as number))
      setValue(newValue >>> 0)
    } else {
      setValue(0)
    }
  }, [setValue])

  return (
    <Context.Provider value={{ value, setValueSelected, selectAll }}>
      {children}
    </Context.Provider>
  )
}

interface BitflagValueData {
  isSelected: boolean
  setSelected: (enabled: boolean) => void
  toggleSelected: () => void
}

function useBitflagValue(value: number): BitflagValueData {
  const providerData = useContext(Context)!
  const isSelected = ((providerData.value & value) === value)
  const setValueSelected = providerData.setValueSelected
  const setSelected = useCallback((selected: boolean) => {
    setValueSelected(value, selected)
  }, [value, setValueSelected])
  const toggleSelected = useCallback(() => {
    setSelected(!isSelected)
  }, [isSelected, setSelected])
  return {
    isSelected,
    setSelected,
    toggleSelected,
  }
}

export { BitflagProvider, useBitflagValue }
