// import express from 'express'

const express = require('express')
const app = express()
const db = require ('./data/db.json')
const path = require('path')

const PORT = process.env.PORT || 80

app.use(express.static(path.resolve(__dirname, 'static')))

// app.get('/', (req, res) => {
//   // res.end('<h1>Home Page</h1>')
//   // res.sendFile(__dirname + "/static/index.html")
//   res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
// })

app.get('/data/', (req, res) => {
  res.end(JSON.stringify(db.data))
})

app.get('/posts/', (req, res) => {
  res.end(JSON.stringify(db.posts))
})

app.post('/post/', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})