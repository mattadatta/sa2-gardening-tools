import { memo } from "react"
import { Checkbox } from "../ui/buttons"
import { useChaoPath } from "./context/ChaoContext"

interface ChaoCheckboxProps {
  label: string
  path: string
}

const ChaoCheckbox = memo(({ label, path }: ChaoCheckboxProps) => {
  const { chaoData, updateChao } = useChaoPath<boolean>(path)
  return (
    <Checkbox
      label={label}
      isSelected={chaoData}
      setSelected={updateChao} />
  )
})

export default ChaoCheckbox
