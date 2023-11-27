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

use logic::LoadedFiles;
use model::save::Chao;
use model::save::ChaoSave;

#[derive(Default)]
struct State {
    loaded_files: std::sync::Mutex<Option<LoadedFiles>>,
}

#[tauri::command]
fn process_files(file_paths: Vec<String>, state: tauri::State<State>) -> String {
    let loaded_files = logic::process_files(&file_paths[..]);
    let json = serde_json::to_string(&loaded_files).unwrap();
    *state.loaded_files.lock().unwrap() = Some(loaded_files);
    json
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
    serde_json::from_str::<Chao>(&contents).map_err(|_| "ValidateFailed")?;
    Ok(contents)
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

    let mut file = std::fs::File::create(file_path).map_err(|_| "CreateFailed")?;
    std::io::Write::write_all(&mut file, json.as_bytes()).map_err(|_| "WriteFailed")?;
    Ok(())
}

#[tauri::command]
fn write_out_chao_save(json: String, _state: tauri::State<State>) {
    let chao_save = serde_json::from_str::<ChaoSave>(&json).unwrap();
    println!("");
}

fn main() {
    tauri::Builder::default()
        .manage(State::default())
        .invoke_handler(tauri::generate_handler![process_files, read_in_chao, write_out_chao, write_out_chao_save])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
