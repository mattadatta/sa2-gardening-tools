import { createContext, memo, ReactNode, useCallback, useContext } from 'react'
import { useChao } from './ChaoContext'

interface ChaoBitflagProviderData {
  value: number
  setValueSelected: (value: number, selected: boolean) => void
  selectAll: (selected: boolean) => void
}

const Context = createContext<ChaoBitflagProviderData | null>(null)

interface ChaoBitflagProviderProps {
  path: string
  type: any
  children?: ReactNode
}

const ChaoBitflagProvider = memo(({ path, type, children }: ChaoBitflagProviderProps) => {
  const { chaoData, updateChao } = useChao((c) => c[path] as number)
  const setValueSelected = useCallback((value: number, selected: boolean) => {
    if (((chaoData & value) === value) === selected) {
      return
    }
    updateChao((c) => c[path] ^= value)
  }, [chaoData, updateChao])
  const selectAll = useCallback((selected: boolean) => {
    updateChao((c) => {
      if (selected) {
        const numericValues = Object.values(type).filter(x => typeof x === "number");
        numericValues.forEach((v) => c[path] |= (v as number))
      } else {
        c[path] = 0
      }
    })
  }, [updateChao])

  return (
    <Context.Provider value={{ value: chaoData, setValueSelected, selectAll }}>
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
