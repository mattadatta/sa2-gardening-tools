import { memo } from "react"
import { useChaoPath } from "./context/ChaoContext"
import { ComboSlider } from "../ui/inputs"

interface ChaoSliderInputProps {
  className?: string
  path: any[]
  min: number
  max: number
  step: number
}

const ChaoSliderInput = ({ className = '', path, min, max, step }: ChaoSliderInputProps) => {
  const { value, setValue } = useChaoPath<number>(path)
  return (
    <ComboSlider
      className={className}
      value={value}
      onChange={setValue}
      min={min}
      max={max}
      step={step} />
  )
}

export default ChaoSliderInput
