require('dotenv').config()
const express = require('express')
const cors = require('cors')
const apiRouter = require('./src/router/apiRouter')

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use('/api', apiRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`))
