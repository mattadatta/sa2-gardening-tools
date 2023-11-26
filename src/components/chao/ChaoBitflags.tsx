import { memo } from "react"
import { ChaoBitflagProvider, useChaoBitflagValue } from "./context/ChaoBitflagContext"
import { Button } from "../ui/buttons"

interface ChaoBitflagProps {
  name: string
  value: number
}

const ChaoBitflag = memo(({ name, value }: ChaoBitflagProps) => {
  const { isSelected, toggleSelected } = useChaoBitflagValue(value)
  const baseStyles = 'flex min-h-0'
  const selectedStyle = isSelected ? 'bg-yellow-400' : ''
  return (
    <Button className="bg-red-300 h-8" onClick={toggleSelected}>
      <div className={`${baseStyles} ${selectedStyle}`}>
        <span>
          {name}
        </span>
      </div>
    </Button>
  )
})

interface ChaoBitflagsProps {
  path: string
  type: any
}

const ChaoBitflags = memo(({ path, type }: ChaoBitflagsProps) => {
  const numericValues = Object.values(type).filter(x => typeof x === "number");
  const stringValues = Object.values(type).filter(x => typeof x === "string");

  return (
    <ChaoBitflagProvider path={path} type={type}>
      <div className="flex flex-wrap w-64 h-64 shrink-0 dark-scrollbar overflow-y-scroll">
        {stringValues.map((name, index) => {
          const value = numericValues[index]
          return (
            <div
              className="w-1/2"
              key={name as string}>
              <ChaoBitflag
                name={name as string}
                value={value as number} />
            </div>
          )
        })}
      </div>
    </ChaoBitflagProvider>
  )
})

export default ChaoBitflags
