import { memo, useCallback } from "react"
import { useChao, useChaoPath } from "./context/ChaoContext"
import { Spinner } from "../ui/inputs"

interface GradeSpinnerProps {
  inputClassName?: string
  stat: string
  value: number
  onChange: (value: number) => void
}

const GradeSpinner = memo(({ inputClassName, stat, value, onChange }: GradeSpinnerProps) => {
  const maxValue = (() => {
    switch (stat) {
      case 'swim':
      case 'fly':
      case 'run':
      case 'power':
      case 'stamina':
        return 6
      default:
        return 99
    }
  })()

  const [label, labelColor] = (() => {
    switch (value) {
      case 0:
        return ['E', 'text-blue-500']
      case 1:
        return ['D', 'text-green-500']
      case 2:
        return ['C', 'text-yellow-300']
      case 3:
        return ['B', 'text-orange-500']
      case 4:
        return ['A', 'text-red-500']
      case 5:
        return ['S', 'text-yellow-500']
      case 6:
        return ['X', 'text-white']
      default:
        return ['', '']
    }
  })()

  return (
    <div className="flex items-center space-x-2">
      <Spinner
        inputClassName={inputClassName}
        value={value}
        onChange={onChange}
        min={0}
        max={maxValue} />
      {(maxValue <= 6) && <span className={`${labelColor} w-4 font-black`}>{label}</span>}
    </div>
  )
})

interface ChaoDnaStatProps {
  stat: string
  path: any[]
}

const ChaoDnaStat = memo(({ stat, path }: ChaoDnaStatProps) => {
  const { value, setValue } = useChaoPath<number>(path)

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

  return (
    <GradeSpinner
      inputClassName={`${ringColor}`}
      stat={stat}
      value={value}
      onChange={setValue} />
  )
})

interface ChaoStatProps {
  section: string
  stat: string
}

const ChaoStat = memo(({ section, stat }: ChaoStatProps) => {
  const { value, setValue } = useChaoPath<number>([section, stat])

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
            value={value}
            onChange={setValue}
            min={0}
            max={99} />
        )
      case 'bars':
        return (
          <Spinner
            inputClassName={`${ringColor}`}
            value={value}
            onChange={setValue}
            min={0}
            max={99} />
        )
      case 'points':
        return (
          <Spinner
            className="w-20"
            inputClassName={`${ringColor}`}
            value={value}
            onChange={setValue}
            min={0}
            max={65535}
            step={10} />
        )
      case 'grades':
        return (
          <GradeSpinner
            inputClassName={`${ringColor}`}
            stat={stat}
            value={value}
            onChange={setValue} />
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
  // const textColorForStat = (stat: string) => {
  //   switch (stat) {
  //     case 'swim':
  //       return 'text-chao-swim'
  //     case 'fly':
  //       return 'text-chao-fly'
  //     case 'run':
  //       return 'text-chao-run'
  //     case 'power':
  //       return 'text-chao-power'
  //     case 'stamina':
  //       return 'text-chao-stamina'
  //     case 'intelligence':
  //       return 'text-chao-intelligence'
  //     case 'luck':
  //       return 'text-chao-luck'
  //     default:
  //       return ''
  //   }
  // }

  return (
    <tr className="">
      <th scope="row" className="text-sm text-start">{stat}</th>
      <td><ChaoStat section="levels" stat={stat} /></td>
      <td><ChaoStat section="bars" stat={stat} /></td>
      <td><ChaoStat section="points" stat={stat} /></td>
      <td><ChaoStat section="grades" stat={stat} /></td>
      <td><ChaoDnaStat path={['dnaStatGrades', `${stat}1`]} stat={stat} /></td>
      <td><ChaoDnaStat path={['dnaStatGrades', `${stat}2`]} stat={stat} /></td>
    </tr>
  )
})

const ChaoStatsHeaderRow = memo(() => {
  const headerStyles = `text-start pl-1`
  return (
    <tr className="text-sm">
      <td />
      <th className={`${headerStyles}`}>Level</th>
      <th className={`${headerStyles}`}>EXP</th>
      <th className={`${headerStyles}`}>Points</th>
      <th className={`${headerStyles}`}>Grade</th>
      <th className={`${headerStyles}`}>DNA 1</th>
      <th className={`${headerStyles}`}>DNA 2</th>
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
