use serde::{Deserialize, Serialize};

use crate::model::{
    save::ChaoSave,
    save_pack::{UnpackError, UnpackedSave},
};

pub fn process_files(file_paths: &[String]) -> Vec<Result<LoadedInstance, LoadError>> {
    crate::util::walker::walk_paths(file_paths)
        .into_iter()
        .map(LoadedInstance::from_path)
        .collect()
}

#[derive(Debug)]
pub struct LoadedFile {
    pub path: String,
    pub data: Vec<u8>,
}

// For JS
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LoadedSave {
    pub chao_save: ChaoSave,
}

impl LoadedSave {
    pub fn from_unpacked(save: &UnpackedSave) -> Result<Self, cursieve::Error> {
        Ok(Self {
            chao_save: ChaoSave::from_unpacked(save)?,
        })
    }

    pub fn to_unpacked(&self, save: &mut UnpackedSave) -> Result<(), cursieve::Error> {
        self.chao_save.to_unpacked(save)?;
        Ok(())
    }
}

pub struct LoadedInstance {
    pub file: LoadedFile,
    pub unpacked: UnpackedSave,
    pub save: LoadedSave, // For sending to JS
}

impl LoadedInstance {
    fn from_file(file: LoadedFile) -> Result<Self, LoadError> {
        let unpacked = UnpackedSave::unpack(&file.data)?;
        let save = LoadedSave::from_unpacked(&unpacked)?;
        Ok(LoadedInstance {
            file,
            unpacked,
            save,
        })
    }

    fn from_path(path: String) -> Result<Self, LoadError> {
        let data = std::fs::read(&path)?;
        let loaded_file = LoadedFile { path, data };
        Self::from_file(loaded_file)
    }
}

#[derive(thiserror::Error, Debug)]
pub enum LoadError {
    #[error("i/o error: `{0}`")]
    IoError(#[from] std::io::Error),
    #[error("unpack error: `{0}`")]
    UnpackError(#[from] UnpackError),
    #[error("cursieve error: `{0}`")]
    CursieveError(#[from] cursieve::Error),
}

impl From<LoadError> for String {
    fn from(value: LoadError) -> Self {
        format!("{}", value)
    }
}
