import fetch from 'node-fetch'
import { load } from 'cheerio'

const url = 'https://handlaprivatkund.ica.se'

export async function scrape() {
  const response = await fetch(`${url}/stores/1003569/search?q=Falukorv`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/117.0'
    }
  })

  if (!response.ok) {
    console.error('Failed to scrape from ICA, got non 2XX status code')
    return []
  }

  const $ = load(await response.text())

  return $('[data-synthetics="product-list"]')
    .children()
    .filter((_id, el) => (
      $(el).find('h3 a[data-test="fop-product-link"]').text().toLowerCase().includes('falukorv'))
    )
    .map((_i, el) => {
      const weightKg = parseFloat(
        $(el).find('[data-test="fop-size"] span:first-child').text().replace('kg', '')
      )

      const link = `${url}${$(el).find('[data-test="fop-product-link"]').attr('href')}`
      const id = link.split('/').pop()
      const desc = $(el).find('h3 a[data-test="fop-product-link"]').text()
      const name = /(.*) [\d][,.]?[\d].*k?g/.exec(desc)?.[1]
      const brand = /[\d][k]?g (.*)/.exec(desc)?.[1]

      return /** @type {Sausage} */ ({
        id: `ica_${id}`,
        name,
        brand,
        url: link,
        weight: weightKg * 1_000,
        price: {
          value: parseFloat(
            $(el).find('[data-test="fop-price"]').text().replace('kr', '').trim().replace(',', '.')
          ),
          type: 'piece',
          valuePerKg: parseFloat(
            $(el)
              .find('[data-test="fop-size"] span:last-child')
              .text()
              .replace('(', '')
              .replace('kr/kg)', '')
              .replace(',', '.')
              .trim()
          )
        }
      })
    })
    .get()
}
