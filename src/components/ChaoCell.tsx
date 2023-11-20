import { useChaoAtIndex } from "../store";

interface ChaoCellProps {
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

export default function ChaoCell({ index, isSelected, onSelect }: ChaoCellProps) {
  const [chao] = useChaoAtIndex(index)
  const selectedStyle = isSelected ? 'bg-slate-600' : ''

  return (
    <div
      className={`p-4 cursor-pointer hover:bg-slate-500 ${selectedStyle}`}
      onClick={() => onSelect(index)}
    >
      Chao Cell {chao["bars.swim"]}
    </div>
  )
}
