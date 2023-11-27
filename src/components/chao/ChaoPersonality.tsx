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

const AlignmentRow = memo(() => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Normal" rightLabel="Curious">
        <ChaoSliderInput className="w-44" path="normalToCurious" min={-100} max={100} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Cry baby" rightLabel="Energetic">
        <ChaoSliderInput className="w-44" path="cryBabyToEnergetic" min={-100} max={100} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Naive" rightLabel="Normal">
        <ChaoSliderInput className="w-44" path="naiveToNormal" min={-100} max={100} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Normal" rightLabel="Big Eater">
        <ChaoSliderInput className="w-44" path="normalToBigEater" min={-100} max={100} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Normal" rightLabel="Carefree">
        <ChaoSliderInput className="w-44" path="normalToCarefree" min={-100} max={100} step={10} />
      </ChaoLabelledItem>
    </div>
  )
})

const TypeRow = memo(() => {
  return (
    <div className="flex space-x-2">
      <div className={`flex flex-col space-y-2`}>
        <span>Favorite Fruit</span>
        <ChaoEnum path="favoriteFruit" type={Types.ChaoFavoriteFruit} />
        <span>DNA</span>
        <ChaoEnum path="dnaProps.favoriteFruit1" type={Types.ChaoFavoriteFruit} />
        <ChaoEnum path="dnaProps.favoriteFruit2" type={Types.ChaoFavoriteFruit} />
      </div>
    </div>
  )
})

const ChaoPersonality = memo(() => {
  return (
    <div className="flex flex-col space-y-2">
      <TypeRow />
      <AlignmentRow />
    </div>
  )
})

export default ChaoPersonality
