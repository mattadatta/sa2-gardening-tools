use crate::{
    logic::{self, LoadedSave},
    model::save::Chao,
    state::State,
};

#[tauri::command]
pub async fn process_files(
    file_paths: Vec<String>,
    state: tauri::State<'_, std::sync::Mutex<State>>,
) -> Result<String, String> {
    let instance_result = first_ok_or_first_err(logic::process_files(&file_paths));
    let mut state = state.lock().unwrap();
    state.instance = None;
    if let Some(result) = instance_result {
        let instance = result?;
        let json = serde_json::to_string(&instance.save).unwrap();
        state.instance = Some(instance);
        Ok(json)
    } else {
        Err("NoFilesLoaded".to_owned())
    }
}

fn first_ok_or_first_err<A, B>(results: Vec<Result<A, B>>) -> Option<Result<A, B>> {
    let mut first_err = None;

    for result in results {
        match result {
            Ok(value) => return Some(Ok(value)),
            Err(e) if first_err.is_none() => first_err = Some(e),
            _ => {}
        }
    }

    first_err.map(Err)
}

#[tauri::command]
pub fn create_new_chao() -> String {
    let new_chao = Chao::create();
    serde_json::to_string(&new_chao).unwrap()
}

#[tauri::command]
pub fn create_deleted_chao() -> String {
    let new_chao = Chao::deleted();
    serde_json::to_string(&new_chao).unwrap()
}

#[tauri::command]
pub async fn read_in_chao() -> Result<String, String> {
    let file_path = tauri::api::dialog::blocking::FileDialogBuilder::new()
        .set_title("Open Chao")
        .add_filter("Chao files", &["chao", "json"])
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
pub async fn write_out_chao(name: String, json: String) -> Result<(), String> {
    let file_path = tauri::api::dialog::blocking::FileDialogBuilder::new()
        .set_title("Save Chao")
        .add_filter("Chao files", &["chao", "json"])
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
pub async fn write_out_chao_save(
    json: String,
    state: tauri::State<'_, std::sync::Mutex<State>>,
) -> Result<(), String> {
    let new_loaded_save =
        serde_json::from_str::<LoadedSave>(&json).map_err(|_| "DeserializeFailed")?;
    let mut state = state.lock().unwrap();
    let loaded_instance = state.instance.as_mut().unwrap();
    let unpacked_save = &mut loaded_instance.unpacked;
    new_loaded_save
        .to_unpacked(unpacked_save)
        .map_err(|_| "ToUnpackedFailed")?;
    let packed_save = unpacked_save.pack()?;
    let (directory, _file_name) = split_path(&loaded_instance.file.path).unwrap();

    let file_path = tauri::api::dialog::blocking::FileDialogBuilder::new()
        .set_title("Export Chao Save")
        .set_directory(directory)
        // .set_file_name(format!("{}_1", file_name).as_str())
        .set_file_name("SONIC2B__ALF_1")
        .save_file()
        .ok_or("UserCancelled".to_string())?;

    let mut file = std::fs::File::create(file_path).map_err(|_| "CreateFailed")?;
    std::io::Write::write_all(&mut file, &packed_save).map_err(|_| "WriteFailed")?;

    Ok(())
}

fn split_path(file_path: &str) -> Option<(String, String)> {
    let path = std::path::Path::new(file_path);

    if let (Some(parent), Some(file_name)) = (path.parent(), path.file_name()) {
        let parent_str = parent.to_str()?.to_owned();
        let file_name_str = file_name.to_str()?.to_owned();
        Some((parent_str, file_name_str))
    } else {
        None
    }
}
