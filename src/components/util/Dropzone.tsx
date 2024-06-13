import React, { memo, useCallback } from 'react'

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onZoneDrop: (files: FileList) => void
}

const Dropzone = ({ children, onZoneDrop, ...props }: DropzoneProps) => {
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    onZoneDrop(droppedFiles)
  }, [onZoneDrop])

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      {...props}
    >
      {children}
    </div>
  )
}

export default Dropzone
