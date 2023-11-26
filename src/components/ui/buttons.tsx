import { memo } from "react"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
}

const Button = memo(({ className = '', children, ...props }: ButtonProps) => {
  return (
    <button
      className={`${className}`}
      {...props}>
      {children}
    </button>
  )
})

interface IconProps {
  className?: string
  'aria-label'?: string
}

interface IconButtonProps {
  className?: string
  Icon: React.ComponentType<IconProps>
  iconProps?: IconProps
  onClick: () => void
}

const IconButton = memo(({
  className = '',
  Icon,
  iconProps = {},
  onClick
}: IconButtonProps) => {
  const baseStyles = 'flex flex-col justify-center items-center p-0 transition-transform duration-200 text-white'
  const hoverStyles = 'hover:scale-110'

  return (
    <Button
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      <Icon {...iconProps} className={`fill-current ${iconProps.className ?? ''}`} />
    </Button>
  )
})

interface TabButtonProps {
  label: string
  isActive: boolean
  isDisabled: boolean
  onClick: () => void
}

const TabButton = memo(({
  label,
  isActive,
  isDisabled,
  onClick
}: TabButtonProps) => {
  const activeStyle = isActive ? 'bg-gray-800' : ''
  const disabledStyle = isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'

  return (
    <Button
      className={`px-4 py-2 ${activeStyle} ${disabledStyle}`}
      onClick={isDisabled ? undefined : onClick}
    >
      {label}
    </Button>
  )
})

export { Button, IconButton, TabButton }
