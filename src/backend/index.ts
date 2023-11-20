import { invoke } from "@tauri-apps/api/tauri";

export async function processFiles(filePaths: string[]): Promise<string> {
  return await invoke("process_files", { filePaths })
}
