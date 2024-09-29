const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const response = require('./src/res/response')

const pool = require('./src/models/admin')

app.use(bodyParser.json())

app.get('/',(req,res) =>{
  const sql = "SELECT * from alat"
  pool.query(sql , (error, result) => {
      response(200, result, "get all data from alat", res)
  })
  // console.log({urlparams : req.query})
})

app.get('/find', (req, res) => {
  // console.log('find id: ', req.query.id)
  const sql = `SELECT status FROM alat WHERE id = ${req.query.id}`
  pool.query(sql, (error, result)=> {
    response(200, result, "Find Name of alat", res)
  })
})

app.post('/login',(req,res) =>{
    console.log({RequestFroOutside: req.body})
    res.send("berhasil login")
})

app.put('/username', (req, res) => {
  console.log({UpdateData : req.body})
  res.send("Update berhasil!!!")
})

app.listen(port, () => {
    console.log(`anda masuk kedalam port ${port}`)
})