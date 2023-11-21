import { memo } from "react"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
}

const Button = memo(({ className = '', children, ...props }: ButtonProps) => {
  return (
    <button
      className={`text-white cursor-pointer ${className}`}
      {...props}>
      {children}
    </button>
  )
})

import React from 'react';

type IconProps = {
  className?: string | undefined;
  'aria-label'?: string | undefined;
};

type IconButtonProps = {
  className?: string | undefined;
  Icon: React.ComponentType<IconProps>;
  iconProps?: IconProps | undefined;
  onClick: () => void;
};

const IconButton = memo(({
  className = '',
  Icon,
  iconProps = {},
  onClick
}: IconButtonProps) => {
  const baseStyles = 'bg-transparent border-none p-0 transition-transform duration-200';
  const hoverStyles = 'hover:scale-110 focus:outline-none';

  return (
    <Button
      onClick={onClick}
      className={`${baseStyles} ${hoverStyles} ${className}`}
    >
      <Icon {...iconProps} className={`${iconProps.className} fill-current text-blue-300`} />
    </Button>
  );
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
  const activeStyle = isActive ? 'bg-slate-700' : ''
  const disabledStyle = isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'

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
