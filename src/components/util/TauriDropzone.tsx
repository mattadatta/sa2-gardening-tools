import React, { useCallback, useEffect } from 'react'
import { onDragDrop } from '../../tauri/drag_drop';

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onZoneDrop: (files: string[]) => void
}

const Dropzone = ({ children, onZoneDrop, ...props }: DropzoneProps) => {
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, []);

  useEffect(() => onDragDrop(({ paths }) => onZoneDrop(paths)), [])

  return (
    <div
      onDragOver={handleDragOver}
      {...props}
    >
      {children}
    </div>
  )
}

export default Dropzone
