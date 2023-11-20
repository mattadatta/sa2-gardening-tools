use serde::{Serialize, Deserialize};
use strum_macros::EnumIter;

use crate::model::save::ChaoSave;

pub fn process_files(file_paths: &[String]) -> String {
    let found_files = crate::util::walker::walk_paths(file_paths);
    let loaded_files = load_relevant_files(&found_files[..]);
    let chao_save: Option<ChaoSave> = loaded_files
        .iter()
        .find(|f| f.save_type == SaveType::Chao)
        .and_then(|f| f.data[..].try_into().ok());

    // let json_path = chao_save_file_instance.file_path.clone() + ".json";
    // let _ = std::fs::write(json_path, chao_save_json);

    let loaded_files = LoadedFiles {
        chao_save
    };
    serde_json::to_string(&loaded_files).unwrap()
}

fn load_relevant_files(file_paths: &[String]) -> Vec<LoadedFile> {
    file_paths.iter().filter_map(|path| {
        if path.ends_with("ALF") {
            if let Ok(data) = std::fs::read(path) {
                Some(LoadedFile {
                    file_path: path.clone(),
                    save_type: SaveType::Chao,
                    data,
                })
            } else {
                None
            }            
        } else {
            None
        }
    }).collect()
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct LoadedFiles {
    chao_save: Option<ChaoSave>
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
enum SaveType {
    Main, Chao
}

#[derive(Debug)]
struct LoadedFile {
    file_path: String,
    save_type: SaveType,
    data: Vec<u8>,
}
