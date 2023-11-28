// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod util {
    pub mod file;
    pub mod serde_bitflags;
    pub mod serde_try_from;
    pub mod try_from_bitflags;
    pub mod try_from_enum;
    pub mod walker;
}
mod model {
    pub mod save;
    pub mod types;
}

pub mod logic;
pub mod crc;

use logic::LoadedFiles;
use model::save::Chao;
use model::save::ChaoSave;

#[derive(Default)]
struct State {
    loaded_files: Option<LoadedFiles>,
}

#[tauri::command]
fn process_files(file_paths: Vec<String>, state: tauri::State<std::sync::Mutex<State>>) -> Result<String, String> {
    let loaded_files = logic::process_files(&file_paths[..])?;
    let json = serde_json::to_string(&loaded_files.loaded_saves).unwrap();
    let mut state = state.lock().unwrap();
    state.loaded_files = Some(loaded_files);
    Ok(json)
}

#[tauri::command]
async fn read_in_chao() -> Result<String, String> {
    let file_path = tauri::api::dialog::blocking::FileDialogBuilder::new()
        .set_title("Open Chao")
        .add_filter("Chao files", &["chao"])
        .set_directory(".")
        .pick_file()
        .ok_or("UserCancelled".to_string())?;

    let mut file = std::fs::File::open(file_path).map_err(|_| "OpenFailed")?;
    let mut contents = String::new();
    std::io::Read::read_to_string(&mut file, &mut contents).map_err(|_| "ReadFailed")?;
    let chao = serde_json::from_str::<Chao>(&contents).map_err(|_| "DeserializeFailed")?;
    let chao_json = serde_json::to_string(&chao).map_err(|_| "SerializeFailed")?;
    Ok(chao_json)
}

#[tauri::command]
async fn write_out_chao(name: String, json: String) -> Result<(), String> {
    let file_path = tauri::api::dialog::blocking::FileDialogBuilder::new()
        .set_title("Save Chao")
        .add_filter("Chao files", &["chao"])
        .set_directory(".")
        .set_file_name(&format!("{}", name))
        .save_file()
        .ok_or("UserCancelled".to_string())?;

    let chao = serde_json::from_str::<Chao>(&json).map_err(|_| "DeserializeFailed")?;
    let chao_json = serde_json::to_string(&chao).map_err(|_| "SerializeFailed")?;
    let mut file = std::fs::File::create(file_path).map_err(|_| "CreateFailed")?;
    std::io::Write::write_all(&mut file, chao_json.as_bytes()).map_err(|_| "WriteFailed")?;
    Ok(())
}

#[tauri::command]
async fn write_out_chao_save(json: String, state: tauri::State<'_, std::sync::Mutex<State>>) -> Result<(), String> {
    let file_path = tauri::api::dialog::blocking::FileDialogBuilder::new()
        .set_title("Export Chao Save")
        .set_directory(".")
        .set_file_name("SONIC2B__ALF_1")
        .save_file()
        .ok_or("UserCancelled".to_string())?;

    let chao_save = serde_json::from_str::<ChaoSave>(&json).map_err(|_| "DeserializeFailed")?;
    let mut state = state.lock().unwrap();
    let chao_bytes = &mut state.loaded_files.as_mut().unwrap().chao_file.as_mut().unwrap().data;
    cursieve::SieveDisperse::disperse(&chao_save, &mut chao_bytes[..]).map_err(|_| "PackFailed")?;
    logic::checksum(&mut chao_bytes[..]);
    
    let mut file = std::fs::File::create(file_path).map_err(|_| "CreateFailed")?;
    std::io::Write::write_all(&mut file, &chao_bytes[..]).map_err(|_| "WriteFailed")?;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .manage(std::sync::Mutex::<State>::default())
        .invoke_handler(tauri::generate_handler![
            process_files,
            read_in_chao,
            write_out_chao,
            write_out_chao_save
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
