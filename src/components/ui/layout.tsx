import { ReactNode, memo, useCallback, useState } from "react"
import { ArrowDown } from "./icons"
import { Button } from "./buttons"

interface IconProps {
  className?: string
  'aria-label'?: string
}

interface HeaderProps {
  className?: string
  Icon: React.ComponentType<IconProps>
  iconProps?: IconProps
  label: string
}

const Header = memo(({
  className = '',
  Icon,
  iconProps = {},
  label
}: HeaderProps) => {
  return (
    <span className={`flex flex-row items-center space-x-2 text-lg font-comfortaa ${className}`}>
      <Icon {...iconProps} className={`mb-1 fill-current ${iconProps.className ?? ''}`} />
      <span>{label}</span>
    </span>
  )
})

interface SectionProps {
  className?: string
  Icon: React.ComponentType<IconProps>
  label: string
  children?: ReactNode
}

const Section = memo(({
  className = '',
  Icon,
  label,
  children,
}: SectionProps) => {
  const [isCollapsed, setCollapsed] = useState(false)

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!isCollapsed)
  }, [isCollapsed, setCollapsed])

  return (
    <div className={`flex flex-col items-stretch space-y-2 ${className}`}>
      <Button className="flex flex-row items-center space-x-1" onClick={toggleCollapsed}>
        <ArrowDown className={`fill-current transform transition-transform w-6 h-6 ${isCollapsed ? '-rotate-90' : ''}`} />
        <Header Icon={Icon} label={label} />
      </Button>
      <div className={`flex flex-col items-start ml-7 ${isCollapsed ? '' : 'pb-4'}`}>
        {!isCollapsed && children}
      </div>
    </div>
  )
})

export { Section }
