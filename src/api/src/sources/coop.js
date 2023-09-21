import fetch from 'node-fetch'

export async function scrape() {
  const response = await fetch('https://external.api.coop.se/personalization/search/products?api-version=v1&store=105910&groups=CUSTOMER_PRIVATE&device=desktop&direct=true', {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': '3becf0ce306f41a1ae94077c16798187',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "query": "falukorv",
      "resultsOptions": {
        "skip": 0,
        "take": 5_000,
      },
    })
  })

  const data = /** @type {CoopResponse} */ (await response.json())

  return data.results.items
    .filter(a => a.name.toLowerCase().includes('falukorv'))
    .map(product => {
      return /** @type {Sausage} */ ({
        id: `coop_${product.id}`,
        name: product.name,
        brand: product.manufacturerName,
        weight: product.packageSize,
        price: {
          value: product.salesPrice,
          type: product.salesUnit === 'Styck' ? 'piece' : 'unknown',
          valuePerKg: product.comparativePrice
        }
      })
    })
}
