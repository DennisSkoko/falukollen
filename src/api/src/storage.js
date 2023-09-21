import { join, dirname } from 'path'
import { ensureDir } from 'fs-extra/esm'
import { writeFile, readFile } from 'fs/promises'
import { format } from 'date-fns'

/**
 * @param {ScrapedData} data 
 */
export async function writeData(data) {
  const path = join(process.env.APP_STORAGE_FOLDER, 'data', data.date, 'data.json')

  await ensureDir(dirname(path))
  await writeFile(path, JSON.stringify(data, null, 2), 'utf8')
}

export async function readTodaysData() {
  const date = format(new Date(), 'yyyy-MM-dd')
  const path = join(process.env.APP_STORAGE_FOLDER, 'data', date, 'data.json')

  await ensureDir(dirname(path))
  return /** @type {ScrapedData} */ (JSON.parse(await readFile(path, 'utf8')))
}
