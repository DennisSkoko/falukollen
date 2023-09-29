namespace NodeJS {
  interface ProcessEnv {
    readonly APP_STORAGE_FOLDER: string
  }
}

interface Sausage {
  id: string
  url?: string
  name: string
  brand: string
  weight: number
  price: {
    value: number
    type: 'piece' | 'per-kg' | 'unknown'
    valuePerKg: number
  }
}

interface ScrapedData {
  date: string
  sausages: Sausage[]
}

interface AnalyzedSausage {
  prices: { value: number, date: string }
}
