import { useState } from "react";
import ChaoCell from "./ChaoCell";
import Chao from "./Chao";

export default function ChaoSave() {
  const [selectedChaoIndex, setSelectedChaoIndex] = useState<number | null>(null);

  const handleSelectChao = (index: number) => {
    setSelectedChaoIndex(index);
  };

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
}
