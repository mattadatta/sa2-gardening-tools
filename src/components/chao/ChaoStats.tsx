import { memo, useCallback } from "react"
import { useChao } from "./context/ChaoContext"
import { Spinner } from "../ui/inputs"

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

  const content = (() => {
    switch (section) {
      case 'levels':
        return (
          <Spinner
            inputClassName={`${ringColor}`}
            value={chaoData}
            onChange={updateStat}
            min={0}
            max={99} />
        )
      case 'bars':
        return (
          <Spinner
            inputClassName={`${ringColor}`}
            value={chaoData}
            onChange={updateStat}
            min={0}
            max={99} />
        )
      case 'points':
        return (
          <Spinner
            className="w-20"
            inputClassName={`${ringColor}`}
            value={chaoData}
            onChange={updateStat}
            min={0}
            max={65535}
            step={10} />
        )
      case 'grades':
        return (
          <Spinner
            inputClassName={`${ringColor}`}
            value={chaoData}
            onChange={updateStat}
            min={0}
            max={99} />
        )
      default:
        return (<div>Unknown state</div>)
    }
  })()

  return (<>{content}</>)
})

interface ChaoStatRowProps {
  stat: string
}

const ChaoStatRow = memo(({ stat }: ChaoStatRowProps) => {
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

  return (
    <tr className="">
      <th scope="row" className="text-sm font-comfortaa text-start">{stat}</th>
      <td><ChaoStat section="levels" stat={stat} /></td>
      <td><ChaoStat section="bars" stat={stat} /></td>
      <td><ChaoStat section="points" stat={stat} /></td>
      <td><ChaoStat section="grades" stat={stat} /></td>
    </tr>
  )
})

const ChaoStatsHeaderRow = memo(() => {
  const headerStyles = `text-start pl-1`
  return (
    <tr className="text-sm font-comfortaa">
      <td />
      <th className={`${headerStyles}`}>Level</th>
      <th className={`${headerStyles}`}>EXP</th>
      <th className={`${headerStyles}`}>Points</th>
      <th className={`${headerStyles}`}>Grade</th>
    </tr>
  )
})

const stats = ['swim', 'fly', 'run', 'power', 'stamina', 'intelligence', 'luck']

const ChaoStats = memo(() => {
  return (
    <table className="border-separate border-spacing-2">
      <tbody>
        <ChaoStatsHeaderRow />
        {stats.map(stat => (
          <ChaoStatRow
            key={stat}
            stat={stat} />
        ))}
      </tbody>
    </table>
  )
})

export default ChaoStats
