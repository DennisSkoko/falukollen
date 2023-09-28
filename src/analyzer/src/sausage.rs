use std::{fmt::Display, fs::File, io::BufReader};

use serde::{Deserialize, Serialize};
use serde_json::{from_reader, Result};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SausageData {
    pub date: String,
    pub sausages: Vec<Sausage>,
}

impl SausageData {
    pub fn from_file(file: BufReader<File>) -> Result<Self> {
        Ok(from_reader(file)?)
    }
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Sausage {
    pub id: String,
    pub url: Option<String>,
    pub name: String,
    pub brand: String,
    pub weight: i32,
    pub price: SausagePrice,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SausagePrice {
    pub value: f32,
    #[serde(rename = "type")]
    pub price_type: SausagePriceType,
    pub value_per_kg: f32,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "kebab-case")]
pub enum SausagePriceType {
    Piece,
    PerKg,
    Unknown,
}

impl Display for SausagePriceType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", match self {
            SausagePriceType::Piece => "piece",
            SausagePriceType::PerKg => "per-kg",
            SausagePriceType::Unknown => "unknown",
        })
    }
}
