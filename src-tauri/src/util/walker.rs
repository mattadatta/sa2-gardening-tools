use std::{fs, path::Path};

fn add_files_recursively(directory: &Path, all_files: &mut Vec<String>) -> Result<(), Box<dyn std::error::Error>> {
    for entry in fs::read_dir(directory)? {
        let path = entry?.path();
        if path.is_dir() {
            add_files_recursively(&path, all_files)?;
        } else if path.is_file() {
            all_files.push(path.to_string_lossy().into_owned());
        }
    }
    Ok(())
}

pub fn walk_paths(file_paths: &Vec<String>) -> Vec<String> {
    let mut all_files: Vec<String> = Vec::new();

    for path in file_paths {
        let path = Path::new(&path);
        if path.is_dir() {
            if let Err(err) = add_files_recursively(&path, &mut all_files) {
                eprintln!("Error while processing directory: {}", err);
            }
        } else if path.is_file() {
            all_files.push(path.to_string_lossy().into_owned());
        } else {
            eprintln!("Ignoring invalid path: {}", path.to_string_lossy());
        }
    }
    
    all_files
}
