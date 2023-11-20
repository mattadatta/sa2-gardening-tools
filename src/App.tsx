import { useCallback } from "react";
import { processFiles } from "./backend";
import Dropzone from "./components/TauriDropzone";
import { useAppStore } from "./store";

export default function App() {

  const setLoadedSaves = useAppStore((state) => state.setLoadedSaves)
  const loadedSaves = useAppStore((state) => state.loadedSaves)

  const handleDrop = useCallback(async (files: string[]) => {
    const response = await processFiles(files)
    const data = JSON.parse(response)
    setLoadedSaves(data)
  }, [])

  return (
    <Dropzone className="bg-slate-900 flex flex-col items-center justify-center"
      onZoneDrop={handleDrop}>
      Hello
    </Dropzone>
  );
}
