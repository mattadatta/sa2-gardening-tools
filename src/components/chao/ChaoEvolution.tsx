import { ReactNode, memo, useCallback } from "react"
import ChaoEnum from "./ChaoEnum"
import * as Types from "../../gen/types"
import ChaoSliderInput from "./ChaoSliderInput"

interface ChaoLabelledItemProps {
  label: string
  rightLabel?: string
  children: ReactNode
}

const ChaoLabelledItem = memo(({ label, rightLabel, children }: ChaoLabelledItemProps) => {
  return (
    <div className={`flex flex-col space-y-1 mb-2`}>
      <div className="flex justify-between">
        <span>{label}</span>
        {rightLabel && <span>{rightLabel}</span>}
      </div>
      {children}
    </div>
  )
})

const LifespanRow = memo(() => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Lifespan 1">
        <ChaoSliderInput className="w-44" path="lifespan1" min={0} max={9999} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Lifespan 2">
        <ChaoSliderInput className="w-44" path="lifespan2" min={0} max={9999} step={10} />
      </ChaoLabelledItem>
    </div>
  )
})

const AlignmentRow = memo(() => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Dark" rightLabel="Hero">
        <ChaoSliderInput className="w-44" path="alignment" min={-1} max={1} step={0.1} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Run" rightLabel="Power">
        <ChaoSliderInput className="w-44" path="runToPowerTransformation" min={-1} max={1} step={0.1} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Swim" rightLabel="Fly">
        <ChaoSliderInput className="w-44" path="swimToFlyTransformation" min={-1} max={1} step={0.1} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Transformation Magnitude">
        <ChaoSliderInput className="w-56" path="transformationMagnitude" min={0} max={1.2} step={0.1} />
      </ChaoLabelledItem>
    </div>
  )
})

const TypeRow = memo(() => {
  return (
    <div className="flex space-x-2">
      <ChaoLabelledItem label="Type">
        <ChaoEnum path="chaoType" type={Types.ChaoType} />
      </ChaoLabelledItem>
    </div>
  )
})

const ChaoEvolution = memo(() => {
  return (
    <div className="flex flex-col space-y-2">
      <TypeRow />
      <AlignmentRow />
      <LifespanRow />
    </div>
  )
})

export default ChaoEvolution
