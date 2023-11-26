import { memo, useCallback } from "react"
import { useChao } from "./context/ChaoContext"
import { Spinner } from "../ui/inputs"

const sections = ['levels', 'bars', 'points', 'grades']
const stats = ['swim', 'fly', 'run', 'power', 'stamina', 'intelligence', 'luck']

interface ChaoStatProps {
  section: string
  stat: string
}

const ChaoStat = memo(({ section, stat }: ChaoStatProps) => {
  const { chaoData, updateChao } = useChao((c) => c[section][stat])

  const updateStat = useCallback((newValue: number) => {
    updateChao((c) => {
      c[section][stat] = newValue
    })
  }, [updateChao])

  const ringColor = (() => {
    switch (stat) {
      case 'swim':
        return 'focus:ring-chao-swim'
      case 'fly':
        return 'focus:ring-chao-fly'
      case 'run':
        return 'focus:ring-chao-run'
      case 'power':
        return 'focus:ring-chao-power'
      case 'stamina':
        return 'focus:ring-chao-stamina'
      case 'intelligence':
        return 'focus:ring-chao-intelligence'
      case 'luck':
        return 'focus:ring-chao-luck'
      default:
        return ''
    }
  })()

  const renderInput = () => {
    switch (section) {
      case 'levels':
        return <Spinner
          inputClassName={`${ringColor}`}
          value={chaoData}
          onChange={updateStat}
          min={0}
          max={99} />
      case 'bars':
        return <Spinner
          inputClassName={`${ringColor}`}
          value={chaoData}
          onChange={updateStat}
          min={0}
          max={99} />
      case 'points':
        return <Spinner
          className="w-20"
          inputClassName={`${ringColor}`}
          value={chaoData}
          onChange={updateStat}
          min={0}
          max={65535}
          step={10} />
      case 'grades':
        return <Spinner
          inputClassName={`${ringColor}`}
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
          key={stat}
          section={section}
          stat={stat} />
      ))}
    </div>
  )
})

const textColorForStat = (stat: string) => {
  switch (stat) {
    case 'swim':
      return 'text-chao-swim'
    case 'fly':
      return 'text-chao-fly'
    case 'run':
      return 'text-chao-run'
    case 'power':
      return 'text-chao-power'
    case 'stamina':
      return 'text-chao-stamina'
    case 'intelligence':
      return 'text-chao-intelligence'
    case 'luck':
      return 'text-chao-luck'
    default:
      return ''
  }
}

const ChaoStats = memo(() => {

  return (
    <div className="flex flex-row space-x-4">
      <div className="flex flex-col self-stretch space-y-2">
        {stats.map(stat => (
          <span
            key={stat}
            className={`flex-1 flex pt-1 justify-start items-center font-comfortaa ${textColorForStat(stat)}`}>
            {stat}
          </span>
        ))}
      </div>
      {sections.map(section => (
        <ChaoStatColumn
          key={section}
          section={section} />
      ))}
    </div>
  )
})

export default ChaoStats
