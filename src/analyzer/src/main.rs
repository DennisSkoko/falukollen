extern crate dotenv;
extern crate serde;
extern crate serde_json;

mod analyzer;
mod sausage;
mod storage;

use analyzer::analyze_storage_data;
use dotenv::dotenv;
use std::{env, error::Error, path::PathBuf};
use storage::Storage;

fn analyze() -> Result<(), Box<dyn Error>> {
    dotenv()?;

    let storage_folder_path = PathBuf::from(env::var("APP_STORAGE_FOLDER")?);
    let storage = Storage::new(storage_folder_path);

    let analyzed_data = analyze_storage_data(storage.get_data()?)?;

    storage.write_analyzed_data(&analyzed_data)?;

    Ok(())
}

fn main() {
    if let Err(error) = analyze() {
        eprintln!("Error occurred: {}", error);
    }
}
