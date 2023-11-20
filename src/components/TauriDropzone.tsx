import React, { useCallback, useEffect } from 'react'
import { onFileDrop } from '../util/tauri';

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
    onZoneDrop: (files: string[]) => void
}

export default function Dropzone({ children, onZoneDrop, ...props }: DropzoneProps) {
    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
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
};
