import React, { memo, useCallback, useEffect } from 'react'
import { onFileDrop } from '../../util/tauri'

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onZoneDrop: (files: string[]) => void
}

const Dropzone = memo(({ children, onZoneDrop, ...props }: DropzoneProps) => {
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, []);

  useEffect(() => onFileDrop(onZoneDrop), [])

  return (
    <div
      onDragOver={handleDragOver}
      {...props}
    >
      {children}
    </div>
  )
})

export default Dropzone
