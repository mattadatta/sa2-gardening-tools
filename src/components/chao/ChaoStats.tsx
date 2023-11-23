import { memo, useCallback, useEffect, useState } from "react"
import { useChao } from "./ChaoContext"
import { Select, Input, Spinner, Slider, NumberInput, ComboSlider } from "../ui/inputs"
import { IconButton } from "../ui/buttons"
import { Checkmark, Crossmark, Pencil, Tag } from "../ui/icons"

const sections = ['levels', 'bars', 'points', 'grades']
const stats = ['swim', 'fly', 'run', 'power', 'stamina', 'intelligence', 'luck']

interface ChaoStatProps {
  section: string
  stat: string
}

const ChaoStat = memo(({ section, stat }: ChaoStatProps) => {
  const { chaoData, updateChao, index } = useChao((c) => c[section][stat])

  const updateStat = useCallback((newValue: number) => {
    updateChao((c) => {
      c[section][stat] = newValue
    })
  }, [updateChao])

  const ringColor = (() => {
    switch (stat) {
      case 'swim':
        return 'ring-chao-swim'
      case 'fly':
        return 'ring-chao-fly'
      case 'run':
        return 'ring-chao-run'
      case 'power':
        return 'ring-chao-power'
      case 'stamina':
        return 'ring-chao-stamina'
      case 'intelligence':
        return 'ring-chao-intelligence'
      case 'luck':
        return 'ring-chao-luck'
      default:
        return ''
    }
  })()

  const renderInput = () => {
    switch (section) {
      case 'levels':
        return <Spinner
          inputClassName={`focus:${ringColor}`}
          value={chaoData}
          onChange={updateStat}
          min={0}
          max={99} />
      case 'bars':
        return <Spinner
          inputClassName={`focus:${ringColor}`}
          value={chaoData}
          onChange={updateStat}
          min={0}
          max={99} />
      case 'points':
        return <Spinner
          className="w-20"
          inputClassName={`focus:${ringColor}`}
          value={chaoData}
          onChange={updateStat}
          min={0}
          max={65535}
          step={10} />
      case 'grades':
        return <Spinner
          inputClassName={`focus:${ringColor}`}
          value={chaoData}
          onChange={updateStat}
          min={0}
          max={99} />
      default:
        return <div>Unknown state</div>;
    }
  };

  return (
    <>
      {
        renderInput()
      }
    </>
  )
})

interface ChaoStatColumnProps {
  section: string
}

const ChaoStatColumn = memo(({ section }: ChaoStatColumnProps) => {
  return (
    <div className="flex flex-col space-y-2">
      {stats.map(stat => (
        <ChaoStat
          section={section}
          stat={stat} />
      ))}
    </div>
  )
})

// const ChaoStats = memo(() => {
//   // const { chaoData, updateChao, index } = useChao((c) => c.name as number[])
//   const [nummy, setNummer] = useState(3)
//   const [sel, setSel] = useState('fd')

//   return (
//     <div className="flex flex-col items-start space-y-2">
//       <Spinner value={nummy} onChange={setNummer} />
//       <Select value={sel} onChange={setSel} options={[
//         { key: 'fd', label: 'fdslkfjsd' },
//         { key: 'fddd', label: 'eeee' }]} />
//       <ComboSlider className="w-32" value={nummy} onChange={setNummer} min={-100} max={100} step={1}/>
//     </div>
//   )
// })

// export default ChaoStats

const ChaoStats = memo(() => {

  return (
    <div className="flex flex-row space-x-2">
      {sections.map(section => (
        <ChaoStatColumn
          section={section} />
      ))}
    </div>
  )
})

export default ChaoStats
