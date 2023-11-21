import { memo, useCallback } from "react"
import { processFiles } from "./backend"
import Dropzone from "./components/util/TauriDropzone"
import { useAppState } from "./store"
import MainContent from "./MainContent"

const App = memo(() => {

  const setLoadedSaves = useAppState((state) => state.setLoadedSaves)
  const loadedSaves = useAppState((state) => state.loadedSaves)

  const handleTauriDrop = useCallback(async (files: string[]) => {
    const response = await processFiles(files)
    const data = JSON.parse(response)
    setLoadedSaves(data)
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 text-white font-nunito">
      {!loadedSaves ? (
        <Dropzone
          className="m-auto border border-gray-700 p-20 rounded-lg bg-gray-800 flex flex-col items-center justify-center font-pixelify"
          onZoneDrop={handleTauriDrop}
        >
          <p>Drop save file(s)</p>
        </Dropzone>
      ) : (
        <MainContent />
      )}
    </div>
  )
})

export default App
