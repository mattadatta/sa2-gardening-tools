import { memo } from "react"
import ChaoBitflags from "./ChaoBitflags"
import * as Types from "../../gen/types"

interface ChaoItemSectionProps {
  label: string
  path: any[]
  type: any
}

const ChaoItemSection = ({ label, path, type }: ChaoItemSectionProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <span>{label}</span>
      <ChaoBitflags path={path} type={type} />
    </div>
  )
}

const ChaoItems = () => {
  return (
    <div className="flex space-x-2">
      <ChaoItemSection label="Toys" path={['toys']} type={Types.ChaoToys} />
      <ChaoItemSection label="Skills" path={['classroomSkills']} type={Types.ChaoClassroomSkills} />
      <ChaoItemSection label="SA2 Behaviors" path={['sa2AnimalBehaviors']} type={Types.ChaoSa2AnimalBehaviors} />
      <ChaoItemSection label="SA Behaviors" path={['saAnimalBehaviors']} type={Types.ChaoSaAnimalBehaviors} />
    </div>
  )
}

export default ChaoItems
