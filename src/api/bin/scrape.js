import { format } from 'date-fns'
import { sources } from '../src/sources/index.js'
import { writeData } from '../src/storage.js'

/** @type {ScrapedData} */
const data = {
  date: format(new Date(), 'yyyy-MM-dd'),
  sausages: (await Promise.all(sources.map(source => source.scrape())))
    .flat()
    .sort((a, b) => a.price.valuePerKg - b.price.valuePerKg)
}

await writeData(data)
