// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod util {
    pub mod file;
    pub mod walker;
    pub mod try_from_enum;
    pub mod try_from_bitflags;
}
mod model {
    pub mod types;
    pub mod save;
}

mod logic;

#[tauri::command]
fn process_files(file_paths: Vec<String>) {
    logic::accept_files(&file_paths);
    println!("Found paths!!! {:?}", file_paths);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![process_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
