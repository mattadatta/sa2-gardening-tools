import { useCallback } from "react";
import { processFiles } from "./backend";
import Dropzone from "./components/Dropzone";

function App() {

  const handleDrop = useCallback(async (files: string[]) => {
    console.log(`what is wrong with you: ${files}`)
    await processFiles(files);
  }, [])

  return (
    <Dropzone className="bg-slate-900 flex flex-col items-center justify-center"
      onZoneDrop={handleDrop}>
      Hello
    </Dropzone>
  );
}

export default App;
