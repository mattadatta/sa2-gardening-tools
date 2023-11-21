import { memo } from "react";
import { ChaoProvider, useChao } from "./ChaoContext";

interface ChaoCellProps {
  index: number
  isSelected: boolean
  onSelect: (index: number) => void
}

const ChaoCellImpl = memo(({ index, isSelected, onSelect }: ChaoCellProps) => {
  const { chaoData } = useChao((c) => c.levels.swim)
  const selectedStyle = isSelected ? 'bg-gray-800' : ''

  return (
    <div
      className={`p-4 cursor-pointer hover:bg-gray-700 ${selectedStyle}`}
      onClick={() => onSelect(index)}
    >
      Chao Cell {`${chaoData}`}
    </div>
  )
})

const ChaoCell = memo((props: ChaoCellProps) => {
  return (
    <ChaoProvider index={props.index}>
      <ChaoCellImpl {...props} />
    </ChaoProvider>
  )
})

export default ChaoCell
