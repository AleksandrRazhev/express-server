import path from 'path'
import fs from 'fs'
import express from 'express'
import createObjDatabase from './modules/create_obj_database.js'

const __dirname = path.resolve()
const app = express()
const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data', 'db.json')))
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
  fs.writeFileSync(path.resolve(__dirname, 'data', 'db.json'), JSON.stringify(db));
  res.end(JSON.stringify(db.posts[db.posts.length - 1]))
})

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})

export default db