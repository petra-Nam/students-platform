require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.get('/api/health', (req, res) => res.json({ ok: true }))
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb'
const PORT = process.env.PORT || 5000
mongoose.connect(MONGO_URI).then(() => {
  console.log('Mongo connected')
  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))
}).catch(err => { console.error('Mongo error:', err.message); process.exit(1) })
