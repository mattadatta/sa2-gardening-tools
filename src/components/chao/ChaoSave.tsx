import { memo, useCallback, useState } from "react"
import ChaoCell from "./ChaoCell"
import Chao from "./Chao"
import { useChaoOrganizing } from "../../store"
import { IconButton } from "../ui/buttons"
import { ToFile } from "../ui/icons"

const ChaoSave = memo(() => {
  const { chaoCount, writeChaoSave } = useChaoOrganizing()
  const [selectedChaoIndex, setSelectedChaoIndex] = useState<number | null>(null)

  const handleSelectChao = useCallback((index: number) => {
    setSelectedChaoIndex(index)
  }, [setSelectedChaoIndex])

  return (
    <div className="flex-1 flex flex-col overflow-x-hidden">
      <div className="flex items-center justify-between space-x-2 p-4 bg-gray-800 border-b-[1px] border-white border-opacity-20">
        <div className="flex items-center">
          <span>{`Count ${chaoCount}`}</span>
        </div>
        <div className="flex items-center space-x-2">
          <IconButton
            iconProps={{ className: "text-white" }}
            Icon={ToFile}
            onClick={writeChaoSave} />
        </div>
      </div>
      <div className="flex-1 flex overflow-y-hidden">
        <div className="w-48 self-stretch overflow-y-scroll dark-scrollbar">
          {Array.from({ length: 24 }, (_, index) => (
            <ChaoCell
              key={index}
              index={index}
              isSelected={index === selectedChaoIndex}
              onSelect={handleSelectChao}
            />
          ))}
        </div>
        {selectedChaoIndex !== null && <Chao selectedIndex={selectedChaoIndex} />}
      </div>
    </div>
  )
})

export default ChaoSave
