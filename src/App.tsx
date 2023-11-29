import { memo, useCallback } from "react"
import { processFiles } from "./backend"
import Dropzone from "./components/util/TauriDropzone"
import { useAppState } from "./store"
import MainContent from "./MainContent"

const EmptyContent = memo(() => {
  return (
    <div className="m-auto border border-gray-700 p-20 rounded-lg bg-gray-800 flex flex-col items-center justify-center font-pixelify">
      <p>Drop save file(s)</p>
    </div>
  )
})

const App = memo(() => {

  const setLoadedSaves = useAppState((state) => state.setLoadedSaves)
  const loadedSaves = useAppState((state) => state.loadedSaves)

  const handleTauriDrop = useCallback(async (files: string[]) => {
    const response = await processFiles(files)
    const data = JSON.parse(response)
    setLoadedSaves(data)
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 text-white/60 font-nunito">
      <Dropzone
          className="w-full h-full flex flex-col"
          onZoneDrop={handleTauriDrop}
        >
          {loadedSaves ? <MainContent /> : <EmptyContent />}
        </Dropzone>
    </div>
  )
})

export default App
