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

const DarkRow = () => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Shadow">
        <ChaoSliderInput className="w-44" path={['shadowBond', 'bond']} min={-100} max={100} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Eggman">
        <ChaoSliderInput className="w-44" path={['eggmanBond', 'bond']} min={-100} max={100} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Rouge">
        <ChaoSliderInput className="w-44" path={['rougeBond', 'bond']} min={-100} max={100} step={10} />
      </ChaoLabelledItem>
    </div>
  )
}

const HeroRow = () => {
  return (
    <div className="flex space-x-8">
      <ChaoLabelledItem label="Sonic">
        <ChaoSliderInput className="w-44" path={['sonicBond', 'bond']} min={-100} max={100} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Tails">
        <ChaoSliderInput className="w-44" path={['tailsBond', 'bond']} min={-100} max={100} step={10} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Knuckles">
        <ChaoSliderInput className="w-44" path={['knucklesBond', 'bond']} min={-100} max={100} step={10} />
      </ChaoLabelledItem>
    </div>
  )
}

const ChaoBonds = () => {
  return (
    <div className="flex flex-col space-y-2">
      <HeroRow />
      <DarkRow />
    </div>
  )
}

export default ChaoBonds
