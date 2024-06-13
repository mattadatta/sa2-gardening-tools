import { memo, useCallback, useState } from "react"
import ChaoCell from "./ChaoCell"
import Chao from "./Chao"
import { useChaoOrganizing, useChaoSavePath } from "../../store"
import Bitflags from "../Bitflags"
import { IconButton } from "../ui/buttons"
import { Addmark, ToFile } from "../ui/icons"
import * as Types from "../../gen/types"

const ChaoSave = () => {
  const portalData = useChaoSavePath<number>(["portals"])
  const { chaoCount, createChao, writeChaoSave } = useChaoOrganizing()
  const [selectedChaoIndex, setSelectedChaoIndex] = useState<number | null>(null)

  const handleSelectChao = useCallback((index: number) => {
    setSelectedChaoIndex(index)
  }, [setSelectedChaoIndex])

  return (
    <div className="flex-1 flex flex-col overflow-x-hidden">
      <div className="flex items-center justify-between space-x-2 p-2 bg-gray-800 border-b-[1px] border-white border-opacity-20">
        <div className="flex items-center px-2 space-x-2">
          <span>{`${chaoCount} / 24`}</span>
          <Bitflags value={portalData.value} setValue={portalData.setValue} type={Types.ChaoPortals} />
        </div>
        <div className="flex items-center space-x-4">
          <IconButton
            iconProps={{ className: "text-blue-300" }}
            Icon={Addmark}
            onClick={createChao} />
          <IconButton
            iconProps={{ className: "text-yellow-200" }}
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
}

export default ChaoSave
