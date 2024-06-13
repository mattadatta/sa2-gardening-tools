import { ChaoBitflagProvider, useChaoBitflagValue } from "./context/ChaoBitflagContext"
import { Checkbox } from "../ui/buttons"

interface ChaoBitflagProps {
  label: string
  value: number
}

// const ChaoBitflag = ({ label, value }: ChaoBitflagProps) => {
//   const { isSelected, toggleSelected } = useChaoBitflagValue(value)
//   const baseStyles = 'border-[1px] rounded-md py-1'
//   const selectedStyle = isSelected ? 'border-blue-400 text-white' : 'border-gray-400/20'
//   return (
//     <Button className={`${baseStyles} ${selectedStyle} transition-all`} onClick={toggleSelected}>
//       <span>
//         {label}
//       </span>
//     </Button>
//   )
// }

const ChaoBitflag = ({ label, value }: ChaoBitflagProps) => {
  const { isSelected, setSelected } = useChaoBitflagValue(value)
  return (
    <Checkbox
      label={label}
      isSelected={isSelected}
      setSelected={setSelected} />
  )
}

interface ChaoBitflagsProps {
  path: any[]
  type: any
}

const ChaoBitflags = ({ path, type }: ChaoBitflagsProps) => {
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
              label={name as string}
              value={value as number} />
          )
        })}
      </div>
    </ChaoBitflagProvider>
  )
}

export default ChaoBitflags
