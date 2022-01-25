const express = require('express')
const app = express()
const data = require ('./data/data.json')

const PORT = process.env.PORT || 80

app.get('/', (req, res) => {
  res.end('<h1>Home Page</h1>')
})

app.get('/data/', (req, res) => {
  res.end(JSON.stringify(data.data))
})

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})