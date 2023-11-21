import { memo, useCallback, useState } from "react"
import ChaoCell from "./ChaoCell"
import Chao from "./Chao"

const ChaoSave = memo(() => {
  const [selectedChaoIndex, setSelectedChaoIndex] = useState<number | null>(null)

  const handleSelectChao = useCallback((index: number) => {
    setSelectedChaoIndex(index)
  }, [setSelectedChaoIndex])

  return (
    <div className="flex-1 flex overflow-y-hidden">
      <div className="w-64 self-stretch overflow-y-scroll dark-scrollbar bg-slate-700">
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
  );
})

export default ChaoSave
