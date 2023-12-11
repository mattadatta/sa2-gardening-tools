import { memo, useCallback } from "react";
import { ChaoProvider, useChaoOrganizing, useChaoPath } from "./context/ChaoContext";
import { chaoBytesToString } from "../../util/chao/name";
import { IconButton } from "../ui/buttons";
import { ArrowDown, ArrowUp } from "../ui/icons";

interface ChaoCellProps {
  index: number
  isSelected: boolean
  onSelect: (index: number) => void
}

const ChaoCellImpl = memo(({ index, isSelected, onSelect }: ChaoCellProps) => {
  const { isValid, isLastValid, copyChao, swapChao } = useChaoOrganizing()
  const chaoName = chaoBytesToString(useChaoPath<number[]>(["name"]).value)
  const selectedStyle = isSelected ? 'bg-gray-600' : 'bg-gray-800'
  const canMoveUp = isValid && index != 0
  const canMoveDown = isValid && !isLastValid

  const copyChaoUp = useCallback(() => {
    copyChao(-1)
  }, [copyChao])
  const copyChaoDown = useCallback(() => {
    copyChao(1)
  }, [copyChao])

  const swapChaoUp = useCallback(() => {
    swapChao(-1)
  }, [swapChao])
  const swapChaoDown = useCallback(() => {
    swapChao(1)
  }, [swapChao])

  return (
    <div
      className={`flex justify-between m-2 rounded-md cursor-pointer hover:bg-gray-700 ${selectedStyle}`}
      onClick={() => onSelect(index)}
    >
      <div className="flex flex-col p-2">
        <span className="font-comfortaa text-xs">chao {index}</span>
        {isValid && <span className="text-white text-lg font-bold">{chaoName}</span>}
      </div>
      <div className="flex flex-col justify-between p-1">
        <div>
          {canMoveUp &&
            <div className="flex items-center space-x-1">
              <IconButton
                iconProps={{ className: "text-red-300" }}
                Icon={ArrowUp}
                onClick={copyChaoUp} />
              <IconButton
                iconProps={{ className: "text-blue-300" }}
                Icon={ArrowUp}
                onClick={swapChaoUp} />
            </div>}
        </div>
        <div>
          {canMoveDown &&
            <div className="flex items-center space-x-1">
              <IconButton
                iconProps={{ className: "text-red-300" }}
                Icon={ArrowDown}
                onClick={copyChaoDown} />
              <IconButton
                iconProps={{ className: "text-blue-300" }}
                Icon={ArrowDown}
                onClick={swapChaoDown} />
            </div>}
        </div>
      </div>
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
