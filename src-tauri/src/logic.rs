use serde::{Serialize, Deserialize};
use strum_macros::EnumIter;

use crate::model::save::ChaoSave;

pub fn process_files(file_paths: &[String]) -> LoadedFiles {
    let found_files = crate::util::walker::walk_paths(file_paths);
    let loaded_files = load_relevant_files(&found_files[..]);
    let chao_save: Option<ChaoSave> = loaded_files
        .iter()
        .find(|f| f.save_type == SaveType::Chao)
        .and_then(|f| f.data[..].try_into().ok());

    // let json_path = chao_save_file_instance.file_path.clone() + ".json";
    // let _ = std::fs::write(json_path, chao_save_json);

    LoadedFiles {
        chao_save
    }
}

fn load_relevant_files(file_paths: &[String]) -> Vec<LoadedFile> {
    file_paths.iter().filter_map(|path| {
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
    }).collect()
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LoadedFiles {
    chao_save: Option<ChaoSave>
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
enum SaveType {
    Main, Chao
}

#[derive(Debug)]
struct LoadedFile {
    _file_path: String,
    save_type: SaveType,
    data: Vec<u8>,
}
