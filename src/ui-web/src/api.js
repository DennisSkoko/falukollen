async function getConfig() {
  const response = await fetch('/config.json')
  return await response.json()
}

export async function getProducts() {
  const config = await getConfig()
  const response = await fetch(`${config.apiEndpoint}/products`)
  return response.json()
}
