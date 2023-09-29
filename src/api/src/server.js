import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { readTodaysData, readAnalyzedData } from './storage.js'

const app = express()

app.use(helmet())
app.use(cors())

app.get('/products', async (_req, res) => {
  res.json(await readTodaysData())
})

app.get('/products/:id', async (req, res) => {
  res.json(await readAnalyzedData(req.params.id))
})

app.listen(5000, () => {
  console.log('Server started')
})
