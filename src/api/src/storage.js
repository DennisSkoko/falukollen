import { join, dirname } from 'path'
import { ensureDir } from 'fs-extra/esm'
import { writeFile } from 'fs/promises'

/**
 * @param {ScrapedData} data 
 */
export async function writeData(data) {
  const path = join(process.env.APP_STORAGE_FOLDER, 'data', data.date, 'data.json')

  await ensureDir(dirname(path))
  await writeFile(path, JSON.stringify(data, null, 2), 'utf-8')
}
