import { ReactNode, memo, useCallback } from "react"
import ChaoEnum from "./ChaoEnum"
import * as Types from "../../gen/types"
import ChaoCheckbox from "./ChaoCheckbox"
import { useChaoPath } from "./context/ChaoContext"

// const ColorAppearanceColumn = memo(() => {
//   return (
//     <div className={`flex flex-col space-y-2`}>
//       <span>Color</span>
//       <ChaoEnum path="color" type={Types.ChaoColor} />
//       <span>DNA</span>
//       <ChaoEnum path="dnaProps.color1" type={Types.ChaoColor} />
//       <ChaoEnum path="dnaProps.color2" type={Types.ChaoColor} />
//     </div>
//   )
// })

interface ChaoLabelledItemProps {
  label: string
  children: ReactNode
}

const ChaoLabelledItem = memo(({ label, children }: ChaoLabelledItemProps) => {
  return (
    <div className={`flex flex-col space-y-1 mb-2`}>
      <span>{label}</span>
      {children}
    </div>
  )
})

const AnimalPartsAppearanceRow = memo(() => {
  return (
    <div className="flex space-x-2">
      <ChaoLabelledItem label="Horns">
        <ChaoEnum path="bodyParts.horns" type={Types.ChaoAnimalPartHorns} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Forehead">
        <ChaoEnum path="bodyParts.forehead" type={Types.ChaoAnimalPartForehead} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Face">
        <ChaoEnum path="bodyParts.face" type={Types.ChaoAnimalPartFace} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Ears">
        <ChaoEnum path="bodyParts.ears" type={Types.ChaoAnimalPartEars} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Arms">
        <ChaoEnum path="bodyParts.arms" type={Types.ChaoAnimalPartArms} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Wings">
        <ChaoEnum path="bodyParts.wings" type={Types.ChaoAnimalPartWings} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Legs">
        <ChaoEnum path="bodyParts.legs" type={Types.ChaoAnimalPartLegs} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Tail">
        <ChaoEnum path="bodyParts.tail" type={Types.ChaoAnimalPartTail} />
      </ChaoLabelledItem>
    </div>
  )
})

const ChaoBodyItem = memo(() => {
  const chaoBodyType = useChaoPath<Types.ChaoBodyType>("bodyType")
  const chaoBodyTypeAnimal = useChaoPath<Types.ChaoAnimal>("bodyTypeAnimal")
  const onChange = useCallback((value: number) => {
    const notAnimal = ((value as Types.ChaoBodyType) !== Types.ChaoBodyType.Animal)
    if (notAnimal) {
      chaoBodyTypeAnimal.updateChao(Types.ChaoAnimal.Penguin)
    }
  }, [])
  const isBodyAnimal = chaoBodyType.chaoData === Types.ChaoBodyType.Animal
  const renderBodyAnimal = () => {
    return (
      <ChaoLabelledItem label="Animal Body">
        <ChaoEnum path="bodyTypeAnimal" type={Types.ChaoAnimal} />
      </ChaoLabelledItem>
    )
  }
  return (
    <>
      <ChaoLabelledItem label="Body Type">
        <ChaoEnum path="bodyType" type={Types.ChaoBodyType} onChange={onChange} />
      </ChaoLabelledItem>
      {isBodyAnimal && renderBodyAnimal()}
    </>
  )
})

const SecondaryAppearanceRow = memo(() => {
  return (
    <div className="flex space-x-2">
      <ChaoLabelledItem label="Emotiball">
        <ChaoEnum path="emotiball" type={Types.ChaoEmotiball} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Hat">
        <ChaoEnum className="w-48" path="hat" type={Types.ChaoHat} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Eyes">
        <ChaoEnum path="eyes" type={Types.ChaoEyes} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Mouth">
        <ChaoEnum path="mouth" type={Types.ChaoMouth} />
      </ChaoLabelledItem>
      <ChaoBodyItem />
      <ChaoLabelledItem label="Medal">
        <ChaoEnum path="medal" type={Types.ChaoMedal} />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Feet Hidden?">
        <ChaoCheckbox path="feetHidden" label="Hidden" />
      </ChaoLabelledItem>
    </div>
  )
})

const ColorAppearanceColumn = memo(() => {
  return (
    <div className={`flex flex-col space-y-2`}>
      <span>Color</span>
      <ChaoEnum path="color" type={Types.ChaoColor} />
      <span>DNA</span>
      <ChaoEnum path="dnaProps.color1" type={Types.ChaoColor} />
      <ChaoEnum path="dnaProps.color2" type={Types.ChaoColor} />
    </div>
  )
})

const EggColorAppearanceColumn = memo(() => {
  return (
    <div className={`flex flex-col space-y-2`}>
      <span>Egg Color</span>
      <ChaoEnum path="eggColor" type={Types.ChaoEggColor} />
      <span>DNA</span>
      <ChaoEnum path="dnaProps.eggColor1" type={Types.ChaoEggColor} />
      <ChaoEnum path="dnaProps.eggColor2" type={Types.ChaoEggColor} />
    </div>
  )
})

const TextureAppearanceColumn = memo(() => {
  return (
    <div className={`flex flex-col space-y-2`}>
      <span>Texture</span>
      <ChaoEnum path="texture" type={Types.ChaoTexture} />
      <span>DNA</span>
      <ChaoEnum path="dnaProps.texture1" type={Types.ChaoTexture} />
      <ChaoEnum path="dnaProps.texture2" type={Types.ChaoTexture} />
    </div>
  )
})

const ShinyAppearanceColumn = memo(() => {
  return (
    <div className={`flex flex-col space-y-2`}>
      <span>Shiny?</span>
      <ChaoCheckbox path="shiny" label="Shiny" />
      <span>DNA</span>
      <ChaoCheckbox path="dnaProps.shiny1" label="Shiny" />
      <ChaoCheckbox path="dnaProps.shiny2" label="Shiny" />
    </div>
  )
})

const MonotoAppearanceColumn = memo(() => {
  return (
    <div className={`flex flex-col space-y-2`}>
      <span>Monotone?</span>
      <ChaoCheckbox path="monotone" label="Monotone" />
      <span>DNA</span>
      <ChaoCheckbox path="dnaProps.monotone1" label="Monotone" />
      <ChaoCheckbox path="dnaProps.monotone2" label="Monotone" />
    </div>
  )
})

const PrimaryAppearanceRow = memo(() => {
  return (
    <div className="flex space-x-2">
      <ColorAppearanceColumn />
      <EggColorAppearanceColumn />
      <TextureAppearanceColumn />
      <ShinyAppearanceColumn />
      <MonotoAppearanceColumn />
    </div>
  )
})

const ChaoAppearance = memo(() => {
  return (
    <div className="flex flex-col space-y-2">
      <ChaoLabelledItem label="Breed">
        <PrimaryAppearanceRow />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Characteristics">
        <SecondaryAppearanceRow />
      </ChaoLabelledItem>
      <ChaoLabelledItem label="Animal Parts">
        <AnimalPartsAppearanceRow />
      </ChaoLabelledItem>
    </div>
  )
})

export default ChaoAppearance
