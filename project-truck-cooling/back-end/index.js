const express = require('express')
const app = express()
const port = 3000


app.get('/main', (req, res) => {
  res.send('Utama')
})

app.get('/hllo', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})