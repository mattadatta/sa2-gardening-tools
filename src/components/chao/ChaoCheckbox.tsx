import { memo } from "react"
import { Checkbox } from "../ui/buttons"
import { useChaoPath } from "./context/ChaoContext"

interface ChaoCheckboxProps {
  label: string
  path: any[]
}

const ChaoCheckbox = ({ label, path }: ChaoCheckboxProps) => {
  const { value, setValue } = useChaoPath<boolean>(path)
  return (
    <Checkbox
      label={label}
      isSelected={value}
      setSelected={setValue} />
  )
}

export default ChaoCheckbox
