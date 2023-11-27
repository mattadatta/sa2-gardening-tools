import { memo } from "react"
import ChaoAppearance from "./ChaoAppearance"
import ChaoBasics from "./ChaoBasics"
import ChaoEmotions from "./ChaoEmotions"
import ChaoEvolution from "./ChaoEvolution"
import ChaoStats from "./ChaoStats"
import ChaoItems from "./ChaoItems"
import { ChaoProvider } from "./context/ChaoContext"
import { Category, Happy, PersonDots, Stats, Tag, Toy } from "../ui/icons"
import { Section } from "../ui/layout"

const ChaoData = memo(() => {
  return (
    <>
      <Section Icon={Tag} label="Basics">
        <ChaoBasics />
      </Section>
      <Section Icon={Stats} label="Stats">
        <ChaoStats />
      </Section>
      <Section Icon={Category} label="Items">
        <ChaoItems />
      </Section>
      <Section Icon={Toy} label="Appearance">
        <ChaoAppearance />
      </Section>
      <Section Icon={PersonDots} label="Evolution">
        <ChaoEvolution />
      </Section>
      <Section Icon={Happy} label="Emotions">
        <ChaoEmotions />
      </Section>
    </>
  )
})
interface ChaoProps {
  selectedIndex: number
}

const ChaoContainer = memo(({ selectedIndex }: ChaoProps) => {
  return (
    <>
      <span className="font-comfortaa text-sm">chao {selectedIndex}</span>
      <ChaoData />
    </>
  )
})

const ChaoImpl = memo(({ selectedIndex }: ChaoProps) => {
  return (
    <div className="flex-1 p-2 flex flex-col items-stretch overflow-y-scroll dark-scrollbar space-y-2">
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
