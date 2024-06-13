import { ReactNode } from "react"
import ChaoName from "./ChaoName"
import ChaoEnum from "./ChaoEnum"
import * as Types from "../../gen/types"
// import ChaoCheckbox from "./ChaoCheckbox"

interface ChaoLabelledItemProps {
  label: string
  rightLabel?: string
  children: ReactNode
}

const ChaoLabelledItem = ({ label, rightLabel, children }: ChaoLabelledItemProps) => {
  return (
    <div className={`flex flex-col space-y-1 mb-2`}>
      <div className="flex justify-between">
        <span>{label}</span>
        {rightLabel && <span>{rightLabel}</span>}
      </div>
      {children}
    </div>
  )
}

// const Row2 = () => {
//   return (
//     <div className="flex space-x-8">
//       <ChaoLabelledItem label="Reset?">
//         <ChaoCheckbox path="resetTrigger" label="Reset" />
//       </ChaoLabelledItem>
//     </div>
//   )
// }

const Row1 = () => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Garden">
        <ChaoEnum path={["garden"]} type={Types.ChaoGarden} />
      </ChaoLabelledItem>
    </div>
  )
}

const ChaoBasics = () => {
  return (
    <div className="flex flex-col space-y-2">
      <ChaoLabelledItem label="Name">
        <ChaoName />
      </ChaoLabelledItem>
      <Row1 />
      {/* <Row2 /> */}
    </div>
  )
}

export default ChaoBasics
