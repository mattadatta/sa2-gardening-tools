import { memo } from "react";
import { ChaoProvider, useChao, useChaoPath } from "./context/ChaoContext";
import { chaoBytesToString } from "../../util/chao/name";

interface ChaoCellProps {
  index: number
  isSelected: boolean
  onSelect: (index: number) => void
}

const ChaoCellImpl = memo(({ index, isSelected, onSelect }: ChaoCellProps) => {
  const { chaoData } = useChaoPath<number[]>("name")
  const chaoName = chaoBytesToString(chaoData)
  const selectedStyle = isSelected ? 'bg-gray-800' : ''

  return (
    <div
      className={`flex flex-col p-4 cursor-pointer hover:bg-gray-700 ${selectedStyle}`}
      onClick={() => onSelect(index)}
    >
      <span className="font-comfortaa text-sm">chao {index}</span>
      <span className="font-comfortaa">{chaoName}</span>
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
