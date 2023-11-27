import { memo } from "react"
import { useChaoPath } from "./context/ChaoContext"
import { ComboSlider } from "../ui/inputs"

interface ChaoSliderInputProps {
  className?: string
  path: string
  min: number
  max: number
  step: number
}

const ChaoSliderInput = memo(({ className = '', path, min, max, step }: ChaoSliderInputProps) => {
  const { chaoData, updateChao } = useChaoPath<number>(path)
  return (
    <ComboSlider
      className={className}
      value={chaoData}
      onChange={updateChao}
      min={min}
      max={max}
      step={step} />
  )
})

export default ChaoSliderInput
