import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

const app = express()

app.use(helmet())
app.use(cors())

app.listen(5000, () => {
  console.log('Server started')
})
