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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
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
