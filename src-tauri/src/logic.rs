use sieve::SieveSift;
use strum_macros::EnumIter;

use crate::model::save::ChaoSave;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, EnumIter)]
enum SaveType {
    Main, Chao
}

#[derive(Debug)]
struct FileInstance {
    _file_path: String,
    save_type: SaveType,
    data: Vec<u8>,
}

fn create_file_instances(file_paths: &Vec<String>) -> Vec<FileInstance> {
    file_paths.iter().filter_map(|path| {
        let file_name = std::path::Path::new(path)
            .file_name()
            .and_then(|name| name.to_str())
            .unwrap_or("");

        if file_name.ends_with("ALF") {
            if let Ok(data) = std::fs::read(path) {
                Some(FileInstance {
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

pub fn accept_files(file_paths: &Vec<String>) {
    let found_files = crate::util::walker::walk_paths(&file_paths);
    let file_instances = create_file_instances(&found_files);
    let chao_save_file_instance = file_instances.iter().find(|i| i.save_type == SaveType::Chao).unwrap();
    match ChaoSave::sift(&chao_save_file_instance.data) {
        Ok(_chao_save) => {
            println!("Got chao save");
        },
        Err(error) => {
            println!("Got error: {:?}", error);
        },
    }
    // println!("File paths: {:?}", file_instances);
}
