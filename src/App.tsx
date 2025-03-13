import Dropzone from "./components/util/TauriDropzone"
import ErrorModal from "./components/ErrorModal"
import MainContent from "./MainContent"
import { useLoadedSave, useProcessFiles } from "./store"

const EmptyContent = () => {
  return (
    <div className="m-auto border border-gray-700 p-20 rounded-lg bg-gray-800 flex flex-col items-center justify-center font-pixelify">
      <p>Drop save file(s)</p>
    </div>
  )
}

const App = () => {
  const { processFiles } = useProcessFiles()
  const loadedSave = useLoadedSave();

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 text-white/60 font-nunito">
      <Dropzone
        className="w-full h-full flex flex-col"
        onZoneDrop={processFiles}
      >
        {loadedSave ? <MainContent /> : <EmptyContent />}
      </Dropzone>
      <ErrorModal />
    </div>
  )
}

export default App
