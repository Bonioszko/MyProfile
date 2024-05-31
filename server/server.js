require('dotenv').config()
const express = require('express')
const mongo = require('./model/mongo')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(router)

app.use(function (err, req, res, next) {
  const message = err.raw?.message || err.message || err.sqlMessage || null

  console.error(err)

  return res.status(500).send({ message: message })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, async () => {
  await mongo.connect()
  console.log(`Server listening at port ${PORT}`)
})
