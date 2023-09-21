import fetch from 'node-fetch'
import { load } from 'cheerio'

const url = 'https://www.hemkop.se'

/**
 * @param {string} link
 */
function getIdFromLink(link) {
  return link.split('/').pop()?.split('-').pop()
}

export async function scrape() {
  const response = await fetch(`${url}/sok?q=falukorv&sort=relevance&page=1`)
  const $ = load(await response.text())

  return $('[data-testid="grid-container"]')
    .find('[data-testid="product-container"]')
    .filter((_i, el) => {
      return $(el)
        .find('[data-testid="product-title"] a')
        .text()
        .toLowerCase()
        .includes('falukorv')
    })
    .map((_i, el) => {
      const link = `${url}${$(el).find('[aria-label="click-product-link"]').prop('href')}`
      const weight = parseInt($(el).find('[data-testid="display-volume"]').text().slice(0, -1))
      const price = parseFloat(
        $(el).find('[data-testid="price-container"]').text().replace(',', '.')
      )

      return /** @type {Sausage} */ ({
        id: `hemkop_${getIdFromLink(link)}`,
        url: link,
        name: $(el).find('[data-testid="product-title"] a').text(),
        brand: $(el).find('[data-testid="display-manufacturer"]').text().replace(/, $/, ''),
        weight,
        price: {
          value: price,
          type: 'piece',
          valuePerKg: Math.round(price / weight * 100000) / 100
        }
      })
    })
    .get()
}
