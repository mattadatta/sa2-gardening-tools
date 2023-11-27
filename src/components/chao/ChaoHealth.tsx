import { ReactNode, memo } from "react"
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

const HealthRow = memo(() => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Cough">
        <ChaoSliderInput className="w-44" path="cough" min={-100} max={100} step={1} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Cold">
        <ChaoSliderInput className="w-44" path="cold" min={-100} max={100} step={1} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Rash">
        <ChaoSliderInput className="w-44" path="rash" min={-100} max={100} step={1} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Runny Nose">
        <ChaoSliderInput className="w-44" path="runnyNose" min={-100} max={100} step={1} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Hiccups">
        <ChaoSliderInput className="w-44" path="hiccups" min={-100} max={100} step={1} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Stomach ache">
        <ChaoSliderInput className="w-44" path="stomachAche" min={-100} max={100} step={1} />
      </ChaoLabelledItem>
    </div>
  )
})

const ChaoHealth = memo(() => {
  return (
    <div className="flex flex-col space-y-2">
      <HealthRow />
    </div>
  )
})

export default ChaoHealth
