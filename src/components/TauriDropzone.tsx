import React, { useCallback, useEffect } from 'react'
import { onFileDrop } from '../util/tauri';

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
    onZoneDrop: (files: string[]) => void
}

export default function Dropzone({ children, onZoneDrop, ...props }: DropzoneProps) {
    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        console.log("drag over");
        event.preventDefault();
    }, []);

    useEffect(() => {
        return onFileDrop((files) => {
            console.log("TDROPPPP");
            onZoneDrop(files)
        })
    }, [])

    return (
        <div
            onDragOver={handleDragOver}
            {...props}
        >
            {children}
        </div>
    )
};
