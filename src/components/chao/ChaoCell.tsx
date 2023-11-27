import { memo } from "react";
import { ChaoProvider, useChaoPath } from "./context/ChaoContext";
import { chaoBytesToString } from "../../util/chao/name";

interface ChaoCellProps {
  index: number
  isSelected: boolean
  onSelect: (index: number) => void
}

const ChaoCellImpl = memo(({ index, isSelected, onSelect }: ChaoCellProps) => {
  const chaoName = chaoBytesToString(useChaoPath<number[]>("name").chaoData)
  const selectedStyle = isSelected ? 'bg-gray-800' : ''

  return (
    <div
      className={`flex flex-col m-2 p-2 rounded-md cursor-pointer hover:bg-gray-700 ${selectedStyle}`}
      onClick={() => onSelect(index)}
    >
      <span className="font-comfortaa text-xs">chao {index}</span>
      <span className="text-white text-lg font-bold">{chaoName}</span>
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
