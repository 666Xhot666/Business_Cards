require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const router = require('./routes')

const app = express()
const port = process.env.PORT || 3000
app.use(cors(), express.json())
app.use('/api', router)

// app.use('/', express.static(path.join(__dirname, '../', 'client')))
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../', 'client', 'index.html'))
// })

app
  .listen(port, () => {
    console.info(`[CORE] Server started at http://localhost:${port}`)
  })
  .on('error', (error) => {
    console.error('[CORE] Server can`t start')
    console.error(error)
  })
