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
import { ChaoProvider, useChaoOrganizing, useChaoPath } from "./context/ChaoContext"
import { Category, FolderOpen, Happy, Heart, MedicalBox, PersonDots, Psychology, Stats, Tag, ToFile, Toy } from "../ui/icons"
import { Section } from "../ui/layout"
import { IconButton } from "../ui/buttons"
import { chaoBytesToString } from "../../util/chao/name"

const ChaoData = memo(() => {
  return (
    <>
      <Section Icon={Tag} label="Basics">
        <ChaoBasics />
      </Section>
      <Section Icon={Stats} label="Stats">
        <ChaoStats />
      </Section>
      <Section Icon={Toy} label="Appearance">
        <ChaoAppearance />
      </Section>
      <Section Icon={Category} label="Items">
        <ChaoItems />
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

const ChaoImpl = memo(() => {
  const chaoName = chaoBytesToString(useChaoPath<number[]>("name").chaoData)
  const { index, isValid, readChao, writeChao } = useChaoOrganizing()

  return (isValid &&
    <div className="flex-1 flex flex-col items-stretch overflow-y-hidden">
      <div className="flex items-center justify-between space-x-2 p-4 bg-gray-900 border-b-[1px] border-white border-opacity-20">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="font-comfortaa text-xs">chao {index}</span>
            <span className="text-white text-lg font-bold">{chaoName}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <IconButton
            iconProps={{ className: "text-white" }}
            Icon={FolderOpen}
            onClick={readChao} />
          <IconButton
            iconProps={{ className: "text-white" }}
            Icon={ToFile}
            onClick={writeChao} />
        </div>
      </div>
      <div className="flex-1 px-2 py-4 flex flex-col items-stretch overflow-y-scroll dark-scrollbar space-y-2">
        {/* <ChaoData key={selectedIndex.toString()} /> */}
        <ChaoData />
      </div>
    </div>
  )
})

interface ChaoProps {
  selectedIndex: number
}

const Chao = memo((props: ChaoProps) => {
  return (
    <ChaoProvider index={props.selectedIndex}>
      <ChaoImpl />
    </ChaoProvider>
  )
})

export default Chao
