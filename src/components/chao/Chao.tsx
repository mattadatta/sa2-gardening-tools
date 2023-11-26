import { memo } from "react"
import { ChaoProvider } from "./context/ChaoContext"
import ChaoName from "./ChaoName"
import ChaoStats from "./ChaoStats"
import ChaoBitflags from "./ChaoBitflags"
import * as Types from "../../gen/types"

interface ChaoProps {
  selectedIndex: number
}

const ChaoContainer = memo(({ selectedIndex }: ChaoProps) => {
  return (
    <>
      <span className="font-comfortaa text-sm text-gray-400">chao {selectedIndex}</span>
      <ChaoName />
      <ChaoStats />
      <ChaoBitflags path="toys" type={Types.ChaoToys} />
    </>
  )
})

const ChaoImpl = memo(({ selectedIndex }: ChaoProps) => {
  return (
    <div className="flex-1 p-4 flex flex-col items-start overflow-y-scroll dark-scrollbar space-y-1">
      <ChaoContainer
        // key={selectedIndex.toString()} // Unplesasnt experience if uncommented
        selectedIndex={selectedIndex} />
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
