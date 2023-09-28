use serde_json::to_writer;

use crate::{analyzer::AnalyzedSausage, sausage::SausageData};
use std::{
    collections::HashMap,
    error::Error,
    fs::File,
    io::{self, BufReader, BufWriter},
    path::PathBuf, vec::IntoIter,
};

pub struct Storage {
    pub path: PathBuf,
}

impl Storage {
    pub fn new(path: PathBuf) -> Self {
        Self { path }
    }

    pub fn get_data(&self) -> io::Result<StorageData> {
        let mut dir_paths = self
            .path
            .join("data")
            .read_dir()?
            .into_iter()
            .map(|entry| entry.map(|entry| entry.path()))
            .collect::<Result<Vec<_>, _>>()?;

        dir_paths.sort();

        Ok(StorageData { paths: dir_paths.into_iter() })
    }

    pub fn write_analyzed_data(
        &self,
        analyzed_data: &HashMap<String, AnalyzedSausage>,
    ) -> io::Result<()> {
        let base_path = self.path.join("analyzed");

        for (id, data) in analyzed_data {
            let file = File::create(base_path.join(id.to_owned() + ".json"))?;
            let writer = BufWriter::new(file);

            to_writer(writer, data)?;
        }

        Ok(())
    }
}

pub struct StorageData {
    paths: IntoIter<PathBuf>,
}

impl StorageData {
    fn get_data_contents(path: PathBuf) -> Result<SausageData, Box<dyn Error>> {
        let file = File::open(path.join("data.json"))?;
        let reader = BufReader::new(file);

        Ok(SausageData::from_file(reader)?)
    }
}

impl Iterator for StorageData {
    type Item = Result<SausageData, Box<dyn Error>>;

    fn next(&mut self) -> Option<Self::Item> {
        let data = match Self::get_data_contents(self.paths.next()?) {
            Ok(data) => data,
            Err(error) => return Some(Err(error)),
        };

        Some(Ok(data))
    }
}
