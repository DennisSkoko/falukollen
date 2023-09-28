use std::{collections::HashMap, error::Error};

use serde::{Deserialize, Serialize};

use crate::storage::StorageData;

pub fn analyze_storage_data(
    storage_data: StorageData,
) -> Result<HashMap<String, AnalyzedSausage>, Box<dyn Error>> {
    let mut analyzed_data = HashMap::<String, AnalyzedSausage>::new();

    for entry in storage_data {
        let data = entry?;

        for sausage in data.sausages {
            let price = AnalyzedSausagePrice {
                value: sausage.price.value_per_kg,
                date: data.date.clone(),
            };

            analyzed_data
                .entry(sausage.id)
                .or_default()
                .prices
                .push(price);
        }
    }

    Ok(analyzed_data)
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AnalyzedSausage {
    prices: Vec<AnalyzedSausagePrice>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AnalyzedSausagePrice {
    value: f32,
    date: String,
}

impl Default for AnalyzedSausage {
    fn default() -> Self {
        Self { prices: Vec::new() }
    }
}
