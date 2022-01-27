const express = require('express')
const db = require ('./data/db.json')
const fs = require('fs')
const app = express()
const path = require('path')
const createObjDatabase = require('./modules/push_post.js')

const PORT = process.env.PORT || 80

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())

app.get('/api/data/', (req, res) => {
  res.end(JSON.stringify(db.data))
})

app.get('/api/posts/', (req, res) => {
  res.end(JSON.stringify(db.posts))
})

app.post('/api/post/', (req, res) => {
  createObjDatabase(req.body, db.posts)
  fs.writeFileSync(__dirname + '/data/db.json', JSON.stringify(db));
  res.end(JSON.stringify(db.posts[db.posts.length - 1]))
})

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})