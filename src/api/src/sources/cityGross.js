import fetch from 'node-fetch'
import { getPricePerKg } from '../util.js'

const url = 'https://www.citygross.se'

export async function scrape() {
  /** @type {Sausage[]} */
  const sausages = []
  let pageCount = 0
  let pageIndex = 0

  do {
    const response = await fetch(
      `${url}/api/v1/esales/search/?Q=falukorv&page=${pageIndex}`
    )
    
    const data = /** @type {CityGrossResponse} */ (await response.json())

    data.data
      .filter(product => (
        product.type === 'product' &&
        product.sellable &&
        product.visible &&
        product.name.toLowerCase().includes('falukorv')
      ))
      .forEach(product => {
        const scrapedPrice = product.defaultPrice.currentPrice

        /** @type {Omit<Sausage['price'], 'valuePerKg'>} */
        const price = {
          value: scrapedPrice.price,
          type: scrapedPrice.unit === 'PCE'
            ? 'piece'
            : scrapedPrice.unit === 'KGM'
              ? 'per-kg'
              : 'unknown'
        }

        sausages.push({
          id: `cityGross_${product.id}`,
          url: `${url}${product.url}`,
          name: product.name,
          brand: product.brand,
          weight: product.netContent.value,
          price: {
            ...price,
            valuePerKg: (
              scrapedPrice.comparativePrice ||
              getPricePerKg(price, product.netContent.value)
            )
          },
        })
      })

    pageCount = data.meta.pageCount
    pageIndex += 1
  } while(pageIndex < pageCount)

  return sausages
}
