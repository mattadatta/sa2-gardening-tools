import { memo } from "react"
import { BitflagProvider, useBitflagValue } from "./context/BitflagContext"
import { Checkbox } from "./ui/buttons"

interface BitflagProps {
  label: string
  value: number
}

// const Bitflag = memo(({ label, value }: BitflagProps) => {
//   const { isSelected, toggleSelected } = useBitflagValue(value)
//   const baseStyles = 'border-[1px] rounded-md py-1'
//   const selectedStyle = isSelected ? 'border-blue-400 text-white' : 'border-gray-400/20'
//   return (
//     <Button className={`${baseStyles} ${selectedStyle} transition-all`} onClick={toggleSelected}>
//       <span>
//         {label}
//       </span>
//     </Button>
//   )
// })

const Bitflag = memo(({ label, value }: BitflagProps) => {
  const { isSelected, setSelected } = useBitflagValue(value)
  return (
    <Checkbox
      label={label}
      isSelected={isSelected}
      setSelected={setSelected} />
  )
})

interface BitflagsProps {
  value: number
  setValue: (value: number) => void
  type: any
}

const Bitflags = memo(({ value, setValue, type }: BitflagsProps) => {
  const numericValues = Object.values(type).filter(x => typeof x === "number")
  const stringValues = Object.values(type).filter(x => typeof x === "string")

  return (
    <BitflagProvider value={value} setValue={setValue} type={type}>
      {stringValues.map((name, index) => {
        const value = numericValues[index]
        return (
          <Bitflag
            key={name as string}
            label={name as string}
            value={value as number} />
        )
      })}
    </BitflagProvider>
  )
})

export default Bitflags
