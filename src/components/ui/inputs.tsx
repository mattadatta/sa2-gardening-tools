import { memo, useCallback, useState } from "react"

interface InputProps {
  id?: string
  name?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (_: string) => void
  onBlur?: () => void
  className?: string
}

const Input = memo(({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  className,
}: InputProps) => {
  const inputClasses = `w-24 bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md py-1 px-2 ${className}`;

  const onTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }, [onChange])

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onTextChange}
      onBlur={onBlur}
      className={inputClasses}
    />
  )
})

// interface SealableInputProps extends InputProps {
//   text: string
//   onTextChange: (newText: string) => void
//   isEditing: boolean
// }

// const SealableInput = memo(({ text, onTextChange, isEditing, ...props }: SealableInputProps) => {
//   const [inputValue, setInputValue] = useState(text);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value)
//   }

//   const handleBlur = () => {
//     onTextChange(inputValue)
//   }

//   if (isEditing) {
//     return (
//       <Input
//         value={inputValue}
//         onChange={handleInputChange}
//         onBlur={handleBlur}
//         placeholder={text}
//         {...props}
//       />
//     )
//   } else {
//     return <span>{text}</span>
//   }
// })

export { Input }
