import { memo } from "react"
import { ChaoBitflagProvider, useChaoBitflagValue } from "./context/ChaoBitflagContext"
import { Button } from "../ui/buttons"

interface ChaoBitflagProps {
  name: string
  value: number
}

const ChaoBitflag = memo(({ name, value }: ChaoBitflagProps) => {
  const { isSelected, toggleSelected } = useChaoBitflagValue(value)
  const baseStyles = 'border-[1px] rounded-md py-1'
  const selectedStyle = isSelected ? 'border-blue-400 text-white' : 'border-gray-400/20'
  return (
    <Button className={`${baseStyles} ${selectedStyle} transition-all`} onClick={toggleSelected}>
      <span>
        {name}
      </span>
    </Button>
  )
})

interface ChaoBitflagsProps {
  path: string
  type: any
}

const ChaoBitflags = memo(({ path, type }: ChaoBitflagsProps) => {
  const numericValues = Object.values(type).filter(x => typeof x === "number")
  const stringValues = Object.values(type).filter(x => typeof x === "string")

  return (
    <ChaoBitflagProvider path={path} type={type}>
      <div className="grid grid-cols-2 gap-2 w-72 h-64 pr-2 shrink-0 content-start dark-scrollbar overflow-y-scroll">
        {stringValues.map((name, index) => {
          const value = numericValues[index]
          return (
            <ChaoBitflag
              key={name as string}
              name={name as string}
              value={value as number} />
          )
        })}
      </div>
    </ChaoBitflagProvider>
  )
})

export default ChaoBitflags
