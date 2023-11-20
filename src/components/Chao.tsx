import { useChaoAtIndex } from "../store";

interface ChaoProps {
  selectedIndex: number;
}

export default function Chao({ selectedIndex }: ChaoProps) {
  const [chao] = useChaoAtIndex(selectedIndex)

  return (
    <div className="flex-1 p-4">
      {JSON.stringify(chao.name)}
    </div>
  )
}
