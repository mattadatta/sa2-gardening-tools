import { useCallback, useMemo } from "react"
import { ChaoEnumProvider, useChaoEnum } from "./context/ChaoEnumContext"
import { Select, SelectOption } from "../ui/inputs"

interface ChaoEnumOption extends SelectOption {
  key: number
}

interface ChaoEnumImplProps {
  className?: string
  options: ChaoEnumOption[]
  onChange?: (value: number) => void
}

const ChaoEnumImpl = ({ className = '', options, onChange }: ChaoEnumImplProps) => {
  const { value, setValue } = useChaoEnum()
  // const selectedValue = options.find((o) => o.key === value)?.value ?? ""
  const valuesByKey = useMemo(() => {
    return options.reduce((map, option) => {
      map[option.key] = option.value;
      return map;
    }, {} as { [key: number]: string })
  }, [options])
  const selectedValue = valuesByKey[value]
  const onValueChange = useCallback((option: SelectOption) => {
    setValue((option as ChaoEnumOption).key)
    onChange?.((option as ChaoEnumOption).key)
  }, [setValue, onChange])

  return (
    <Select
      className={className}
      options={options}
      value={selectedValue}
      onChange={onValueChange} />
  )
}

interface ChaoEnumProps {
  className?: string
  path: any[]
  type: any
  onChange?: (value: number) => void
}

const ChaoEnum = ({ className = '', path, type, onChange }: ChaoEnumProps) => {
  const numericValues = Object.values(type).filter(x => typeof x === "number")
  const stringValues = Object.values(type).filter(x => typeof x === "string")

  const options: ChaoEnumOption[] = useMemo(() => {
    return stringValues.map((name, index) => {
      const value = numericValues[index]
      return {
        key: value as number,
        value: name as string,
        label: name as string
      }
    })
  }, [type])

  return (
    <ChaoEnumProvider path={path}>
      <ChaoEnumImpl className={className} options={options} onChange={onChange} />
    </ChaoEnumProvider>
  )
}

export default ChaoEnum
