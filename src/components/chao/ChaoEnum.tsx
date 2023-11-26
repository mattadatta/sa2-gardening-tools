import { memo, useCallback } from "react"
import { ChaoEnumProvider, useChaoEnum } from "./context/ChaoEnumContext"
import { Select, SelectOption } from "../ui/inputs"

interface ChaoEnumOption extends SelectOption {
  key: number
}

interface ChaoEnumImplProps {
  options: ChaoEnumOption[]
}

const ChaoEnumImpl = memo(({ options }: ChaoEnumImplProps) => {
  const { value, setValueSelected } = useChaoEnum()
  const selectedValue = options.find((o) => o.key === value)?.value ?? ""
  const onChange = useCallback((option: SelectOption) => {
    setValueSelected((option as ChaoEnumOption).key)
  }, [setValueSelected])

  return (
    <Select options={options} value={selectedValue} onChange={onChange} />
  )
})

interface ChaoEnumProps {
  path: string
  type: any
}

const ChaoEnum = memo(({ path, type }: ChaoEnumProps) => {
  const numericValues = Object.values(type).filter(x => typeof x === "number")
  const stringValues = Object.values(type).filter(x => typeof x === "string")

  const options: ChaoEnumOption[] = stringValues.map((name, index) => {
    const value = numericValues[index]
    return {
      key: value as number,
      value: name as string,
      label: name as string
    }
  })

  return (
    <ChaoEnumProvider path={path}>
      <ChaoEnumImpl options={options} />
    </ChaoEnumProvider>
  )
})

export default ChaoEnum
