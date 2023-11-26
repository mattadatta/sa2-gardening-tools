import { memo } from "react"
import ChaoBitflags from "./ChaoBitflags"
import * as Types from "../../gen/types"

interface ChaoItemSectionProps {
  label: string
  path: string
  type: any
}

const ChaoItemSection = memo(({ label, path, type }: ChaoItemSectionProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <span>{label}</span>
      <ChaoBitflags path={path} type={type} />
    </div>
  )
})

const ChaoItems = memo(() => {
  return (
    <div className="flex flex-row space-x-2">
      <ChaoItemSection label="Toys" path="toys" type={Types.ChaoToys} />
      <ChaoItemSection label="Skills" path="classroomSkills" type={Types.ChaoClassroomSkills} />
      <ChaoItemSection label="SA2 Behaviors" path="sa2AnimalBehaviors" type={Types.ChaoSa2AnimalBehaviors} />
      <ChaoItemSection label="SA Behaviors" path="saAnimalBehaviors" type={Types.ChaoSaAnimalBehaviors} />
    </div>
  )
})

export default ChaoItems
