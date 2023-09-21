interface CityGrossProduct {
  id: string
  url: string
  name: string
  brand: string
  sellable: boolean
  visible: boolean
  type: 'product'
  netContent: {
    unitOfMeasure: 0
    value: number
  }
  defaultPrice: {
    currentPrice: {
      price: number
      unit: 'PCE' | 'KGM'
      comparativePrice: number
      comparativePriceUnit: 'KGM'
    }
  }
}

interface CityGrossResponse {
  data: CityGrossProduct[]
  meta: {
    pageCount: number
    pageIndex: number
    pageSize: number
    totalCount: number
  }
}
