import { invoke } from "@tauri-apps/api/tauri";

export async function processFiles(filePaths: string[]) {
    try {
      await invoke("process_files", { filePaths });
    } catch (error) {
      console.error("processFiles: error", error);
    }
}
