import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { ArrowDown, ArrowUp } from "./icons"
import { IconButton } from "./buttons"

interface InputProps extends Record<string, any> {
  className?: string
  type?: string
  placeholder?: string
  value: string
  onChange?: (_: string) => void
  onReturnKey?: () => void
  onEscKey?: () => void
  // nativeProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const Input = memo(({
  className = '',
  type = 'text',
  onChange,
  onReturnKey,
  onEscKey,
  ...props
}: InputProps) => {
  const inputClasses = `bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none rounded-md pt-2 pb-1 px-2 min-w-0 min-h-0 ${className}`;

  const onTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }, [onChange])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        onReturnKey?.()
        e.currentTarget.blur()
        break;
      case 'Escape':
        onEscKey?.()
        e.currentTarget.blur()
        break;
      default:
        break;
    }
  }, [onReturnKey, onEscKey])

  return (
    <input
      className={inputClasses}
      type={type}
      onChange={onTextChange}
      onKeyDown={onKeyDown}
      {...props}
    />
  )
})

interface NumberInputProps {
  className?: string
  placeholder?: string
  value: number
  onChange: (_: number) => void
  min?: number
  max?: number
  onBlur?: () => void
  parseFn?: (_: string) => number
}

const NumberInput = memo(({
  className = '',
  value,
  onChange,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  parseFn = (t) => parseInt(t, 10),
  ...props
}: NumberInputProps) => {
  const [internalText, setInternalText] = useState(value.toString())

  useEffect(() => {
    setInternalText(value.toString())
  }, [value])

  const onTextChange = useCallback((text: string) => {
    // TODO: any validation
    setInternalText(text)
  }, [onChange])

  const onCommit = useCallback(() => {
    const num = parseFn(internalText)
    if (!isNaN(num)) {
      onChange(num)
    } else {
      setInternalText(value.toString())
    }
  }, [value, internalText])

  return (
    <Input
      className={`${className}`}
      type="number"
      value={internalText}
      onChange={onTextChange}
      min={min}
      max={max}
      onBlur={onCommit}
      onReturnKey={onCommit}
      onEscKey={onCommit}
      {...props}
    />
  )
})

interface SpinnerProps {
  className?: string
  placeholder?: string
  value: number
  onChange: (_: number) => void
  onBlur?: () => void
  min?: number
  max?: number
  step?: number
  inputClassName?: string
}

const Spinner = memo(({
  className = '',
  onChange,
  value,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  inputClassName = '',
  ...props
}: SpinnerProps) => {

  const onValueChange = useCallback((newValue: number) => {
    const clampedValue = Math.min(Math.max(newValue, min), max)
    onChange(clampedValue)
  }, [onChange, min, max])

  const increment = useCallback(() => {
    onValueChange(value + step)
  }, [value, step, onValueChange])

  const decrement = useCallback(() => {
    onValueChange(value - step)
  }, [value, step, onValueChange])

  const inputClasses = `w-16 flex flex-col relative ${className}`;

  return (
    <div className={inputClasses}>
      <NumberInput
        className={`pr-6 ${inputClassName}`}
        value={value}
        onChange={onValueChange}
        {...props} />
      <div className="absolute top-0 right-0 bottom-0 w-6 p-[1px] flex flex-col items-stretch space-y-[1px]">
        <IconButton
          className="relative flex-1 bg-gray-700 rounded-t-md"
          Icon={ArrowUp}
          iconProps={{ className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-[1px] pointer-events-none" }}
          onClick={increment} />
        <IconButton
          className="relative flex-1 bg-gray-700 rounded-b-md"
          Icon={ArrowDown}
          iconProps={{ className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mb-[1px] pointer-events-none" }}
          onClick={decrement} />
      </div>
    </div>
  )
})

interface SliderProps {
  className?: string
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const Slider = memo(({
  className = '',
  value,
  onChange,
  min,
  max,
  ...props
}: SliderProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <input
      className={`slider h-2 bg-gray-600 rounded-md appearance-none cursor-pointer ${className}`}
      type="range"
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      {...props}
    />
  )
})

interface ComboSliderProps {
  className?: string
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const ComboSlider = memo(({
  className = '',
  value,
  onChange,
  min,
  max,
  ...props
}: ComboSliderProps) => {

  //style={{fontSize: 'min(0.75em, 12vw)'}}
  return (
    <div className={`flex flex-col items-stretch space-y-3 ${className}`}>
      <div className="flex items-center">
        <span className="w-[25%] text-xs text-left" >{min}</span>
        <NumberInput
          className="w-[50%] text-center"
          parseFn={Number}
          value={value}
          onChange={onChange} />
        <span className="w-[25%] text-xs text-right">{max}</span>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        {...props}
      />
    </div>
  )
})

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  className?: string
  options: SelectOption[]
  value: string
  onChange: (key: SelectOption) => void
}

const Select = memo(({
  className = '',
  options,
  value,
  onChange
}: SelectProps) => {

  const optionsByValue = useMemo(() => {
    return options.reduce((map, option) => {
      map[option.value] = option;
      return map;
    }, {} as { [key: string]: SelectOption })
  }, [options])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    // const option = options.find((o) => o.value === e.target.value)
    const option = optionsByValue[e.target.value]
    onChange(option)
  }, [options, onChange])

  const inputClasses = `flex flex-col relative ${className}`;

  return (
    <div className={inputClasses}>
      <select
        className={`appearance-none pr-8 bg-gray-800 text-white border border-gray-600 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none rounded-md py-1 px-2`}
        value={value}
        onChange={handleChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute top-0 right-0 bottom-0 w-6 mr-[1px] p-[1px] flex flex-col items-stretch pointer-events-none">
        <ArrowDown className="relative flex-1 text-white bg-gray-700 rounded-md fill-current" />
      </div>
    </div>
  )
})

export { Input, NumberInput, Spinner, Slider, ComboSlider, Select }
