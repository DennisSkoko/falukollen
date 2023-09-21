interface CoopResponse {
  results: {
    items: CoopProduct[]
  }
}

interface CoopProduct {
  id: string
  name: string
  manufacturerName: string
  packageSize: number
  salesPrice: number
  salesUnit: 'Styck'
  comparativePrice: number
}
