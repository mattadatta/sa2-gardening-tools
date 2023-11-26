import { memo } from "react"
import ChaoEnum from "./ChaoEnum"
import * as Types from "../../gen/types"

interface ChaoItemSectionProps {
  label: string
  path: string
  type: any
}

const ChaoEnumItem = memo(({ label, path, type }: ChaoItemSectionProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <span>{label}</span>
      <ChaoEnum path={path} type={type} />
    </div>
  )
})

const ChaoAppearance = memo(() => {
  return (
    <div className="flex flex-row space-x-2">
      <ChaoEnumItem label="Color" path="color" type={Types.ChaoColor} />
    </div>
  )
})

export default ChaoAppearance
