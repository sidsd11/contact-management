import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/connectDB.js'
import contactRouter from './routes/contactRoutes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors({origin: true, credentials: true}))
app.use(express.json())
await connectDB()

app.get('/', (req, res) => {
    res.send('API Working')
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})

app.use('/api/contacts', contactRouter)
