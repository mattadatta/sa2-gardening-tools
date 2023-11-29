import { invoke } from "@tauri-apps/api/tauri";

export async function processFiles(filePaths: string[]): Promise<string> {
  return await invoke("process_files", { filePaths })
}

export async function createNewChao(): Promise<string> {
  return await invoke("create_new_chao", { })
}

export async function createDeletedChao(): Promise<string> {
  return await invoke("create_deleted_chao", { })
}

export async function readInChao(): Promise<string> {
  return await invoke("read_in_chao", { })
}

export async function writeOutChao(name: string, json: string): Promise<void> {
  return await invoke("write_out_chao", { name, json })
}

export async function writeOutChaoSave(json: string): Promise<void> {
  return await invoke("write_out_chao_save", { json })
}
