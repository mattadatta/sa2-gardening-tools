import { ReactNode } from "react"
import ChaoSliderInput from "./ChaoSliderInput"

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

const EmotionsRow3 = () => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Joy">
        <ChaoSliderInput className="w-44" path={['joy']} min={0} max={200} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Anger">
        <ChaoSliderInput className="w-44" path={['anger']} min={0} max={200} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Urge to cry">
        <ChaoSliderInput className="w-44" path={['urgeToCry']} min={0} max={200} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Fear">
        <ChaoSliderInput className="w-44" path={['fear']} min={0} max={200} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Dizziness">
        <ChaoSliderInput className="w-44" path={['dizziness']} min={0} max={200} step={10} />
      </ChaoLabelledItem>
    </div>
  )
}

const EmotionsRow2 = () => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Desire to mate">
        <ChaoSliderInput className="w-44" path={['desireToMate']} min={0} max={10000} step={100} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Hunger">
        <ChaoSliderInput className="w-44" path={['hunger']} min={0} max={10000} step={100} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Sleepiness">
        <ChaoSliderInput className="w-44" path={['sleepiness']} min={0} max={10000} step={100} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Tiredness">
        <ChaoSliderInput className="w-44" path={['tiredness']} min={0} max={10000} step={100} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Boredom">
        <ChaoSliderInput className="w-44" path={['boredom']} min={0} max={10000} step={100} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Energy">
        <ChaoSliderInput className="w-44" path={['energy']} min={0} max={10000} step={100} />
      </ChaoLabelledItem>
    </div>
  )
}

const EmotionsRow1 = () => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Happiness">
        <ChaoSliderInput className="w-44" path={['happiness']} min={-100} max={100} step={10} />
      </ChaoLabelledItem>
    </div>
  )
}

const ChaoEmotions = () => {
  return (
    <div className="flex flex-col space-y-2">
      <EmotionsRow1 />
      <EmotionsRow2 />
      <EmotionsRow3 />
    </div>
  )
}

export default ChaoEmotions
