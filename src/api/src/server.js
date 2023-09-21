import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { readTodaysData } from './storage.js'

const app = express()

app.use(helmet())
app.use(cors())

app.get('/products', async (_req, res) => {
  res.json(await readTodaysData())
})

app.listen(5000, () => {
  console.log('Server started')
})
