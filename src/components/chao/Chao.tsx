import { memo } from "react"
import { ChaoProvider } from "./ChaoContext"
import ChaoName from "./ChaoName"

interface ChaoProps {
  selectedIndex: number
}

const ChaoImpl = memo(({ selectedIndex }: ChaoProps) => {
  return (
    <div className="flex-1 p-4 flex flex-col items-start overflow-y-scroll dark-scrollbar space-y-1">
      <span className="font-pixelify text-sm text-gray-400">chao {selectedIndex}</span>
      <ChaoName />
    </div>
  )
})

const Chao = memo((props: ChaoProps) => {
  return (
    <ChaoProvider index={props.selectedIndex}>
      <ChaoImpl {...props} />
    </ChaoProvider>
  )
})

export default Chao
