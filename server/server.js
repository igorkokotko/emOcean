const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const errorHandler = require('./middleware/errorHandler')

dotenv.config({ path: './config/config.env' })

const auth = require('./routes/auth')

// Run server
const app = express()

app.use(bodyParser.json())

// Authentication route
app.use('/api/auth', auth)

app.use(errorHandler)

const PORT = process.env.port || 5000

app.listen(
  PORT,
  console.log(`Port is running on ${process.env.NODE_ENV} mode on port ${PORT}`)
)
