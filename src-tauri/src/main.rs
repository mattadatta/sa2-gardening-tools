// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod util {
    pub mod diff;
    pub mod file;
    pub mod serde_bitflags;
    pub mod serde_try_from;
    pub mod try_from_bitflags;
    pub mod try_from_enum;
    pub mod walker;
}

mod model {
    pub mod save;
    pub mod save_pack;
    pub mod types;
}

pub mod commands;
pub mod crypto;
pub mod logic;
pub mod state;

fn main() {
    tauri::Builder::default()
        .manage(std::sync::Mutex::<state::State>::default())
        .invoke_handler(tauri::generate_handler![
            commands::process_files,
            commands::create_new_chao,
            commands::create_deleted_chao,
            commands::read_in_chao,
            commands::write_out_chao,
            commands::write_out_chao_save
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
