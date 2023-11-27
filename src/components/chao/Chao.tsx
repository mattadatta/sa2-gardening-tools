import { memo } from "react"
import ChaoAppearance from "./ChaoAppearance"
import ChaoBasics from "./ChaoBasics"
import ChaoBonds from "./ChaoBonds"
import ChaoEmotions from "./ChaoEmotions"
import ChaoEvolution from "./ChaoEvolution"
import ChaoHealth from "./ChaoHealth"
import ChaoItems from "./ChaoItems"
import ChaoPersonality from "./ChaoPersonality"
import ChaoStats from "./ChaoStats"
import { ChaoProvider } from "./context/ChaoContext"
import { Category, Happy, Heart, MedicalBox, PersonDots, Psychology, Stats, Tag, Toy } from "../ui/icons"
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
      <Section Icon={Psychology} label="Personality">
        <ChaoPersonality />
      </Section>
      <Section Icon={Happy} label="Emotions">
        <ChaoEmotions />
      </Section>
      <Section Icon={Heart} label="Bonds">
        <ChaoBonds />
      </Section>
      <Section Icon={MedicalBox} label="Health">
        <ChaoHealth />
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
