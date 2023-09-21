import { load } from 'cheerio'
import { getPricePerKg } from '../util.js'

const url = 'https://www.willys.se'

/**
 * @param {string} text
 */
function getBrandAndWeight(text) {
  const parts = text.split(' ')
  const weight = parts.pop()

  if (!weight || parts.length === 0) {
    return { brand: null, weight: null }
  }

  return {
    brand: parts.join(' '),
    weight: parseInt(weight.slice(0, -1))
  }
}

/**
 * @param {import('cheerio').CheerioAPI} $
 * @param {import('cheerio').Element} el
 * @returns {Omit<Sausage['price'], 'valuePerKg'>}
 */ 
function getPrice($, el) {
  const parts = $(el)
    .find('[data-testid="product-price"]')
    .find('span')
    .map((_i, el) => $(el).text())
    .get()
    .filter(part => part.trim() !== '')

  const priceType = parts.pop()
  
  return {
    value: parseFloat(parts.join('.')),
    type: priceType === '/st' ? 'piece' : priceType === '/kg' ? 'per-kg' : 'unknown'
  }
}

/**
 * @param {string} link
 */
function getIdFromLink(link) {
  return link.split('/').pop()?.split('-').pop()
}

export async function scrape() {
  const response = await fetch(`${url}/sok?q=falukorv`)
  const $ = load(await response.text())

  return $('[data-id="grid"]')
    .find('[itemtype="https://schema.org/Product"]')
    .filter((_id, el) => $(el).find('[itemprop="name"]').text().toLowerCase().includes('falukorv'))
    .map((_i, el) => {
      const { brand, weight } = getBrandAndWeight($(el).find('[itemprop="brand"]').text())
      const price = getPrice($, el)
      const link = `${url}${$(el).find('a').prop('href')}`

      return /** @type {Sausage} */ ({
        id: `willys_${getIdFromLink(link)}`,
        url: link,
        name: $(el).find('[itemprop="name"]').text(),
        brand,
        weight,
        price: {
          ...price,
          valuePerKg: getPricePerKg(price, weight)
        },
      })
    })
    .get()
}
