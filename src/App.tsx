import { useCallback } from "react";
import { processFiles } from "./backend";
import Dropzone from "./components/TauriDropzone";
import { useAppState } from "./store";
import PauseMenu from "./PauseMenu";
import MainContent from "./MainContent";

export default function App() {

  const setLoadedSaves = useAppState((state) => state.setLoadedSaves)
  const loadedSaves = useAppState((state) => state.loadedSaves)

  const handleTauriDrop = useCallback(async (files: string[]) => {
    const response = await processFiles(files)
    const data = JSON.parse(response)
    setLoadedSaves(data)
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-800 text-white">
      {!loadedSaves ? (
        <Dropzone
          className="m-auto border border-gray-700 p-20 rounded-lg bg-slate-900 flex flex-col items-center justify-center"
          onZoneDrop={handleTauriDrop}
        >
          <p>Drop save file(s)</p>
        </Dropzone>
      ) : (
        <MainContent />
      )}
    </div>
  );
}
