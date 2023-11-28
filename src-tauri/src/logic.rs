use serde::{Deserialize, Serialize};
use strum_macros::EnumIter;

use crate::model::save::ChaoSave;

pub fn process_files(file_paths: &[String]) -> Result<LoadedFiles, String> {
    let found_files = crate::util::walker::walk_paths(file_paths);
    let loaded_files = load_relevant_files(&found_files[..]);
    let chao_file: Option<LoadedFile> = loaded_files
        .into_iter()
        .find(|f| f.save_type == SaveType::Chao);
    let chao_save: Option<ChaoSave> = chao_file.as_ref().and_then(|f| f.data[..].try_into().ok());

    Ok(LoadedFiles {
        chao_file,
        loaded_saves: LoadedSaves { chao_save },
    })
}

fn load_relevant_files(file_paths: &[String]) -> Vec<LoadedFile> {
    file_paths
        .iter()
        .filter_map(|path| {
            if path.ends_with("ALF") {
                if let Ok(data) = std::fs::read(path) {
                    Some(LoadedFile {
                        _file_path: path.clone(),
                        save_type: SaveType::Chao,
                        data,
                    })
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect()
}

pub struct LoadedFiles {
    pub chao_file: Option<LoadedFile>,
    pub loaded_saves: LoadedSaves,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LoadedSaves {
    chao_save: Option<ChaoSave>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
pub enum SaveType {
    Main,
    Chao,
}

#[derive(Debug)]
pub struct LoadedFile {
    pub _file_path: String,
    pub save_type: SaveType,
    pub data: Vec<u8>,
}

pub fn checksum(bytes: &mut [u8]) {
    crate::crc::checksum(bytes);
}
