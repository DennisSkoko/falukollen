/**
 * @param {{ value: number, type: Sausage['price']['type'] }} price
 * @param {Sausage['weight'] | null} weight
 */
export function getPricePerKg(price, weight) {
  if (price.type === 'per-kg') {
    return price.value
  }

  if (price.type === 'piece' && weight !== null) {
    return Math.round(price.value / weight * 100000) / 100
  }

  return -1
}
