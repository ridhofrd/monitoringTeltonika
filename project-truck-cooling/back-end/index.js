const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const response = require('./src/res/response')
const pool = require('./src/models/admin')
const routes = require("./src/routes/Routes")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes)

// app.get("/", (req, res)=> {
//   response(200, "data", "Tampilan Alat data", res)
// })

// app.get("/alat", (req, res)=> {
//   const sql = "SELECT * FROM alat"
//   pool.query(sql, (err, fields) => {
//     if (err) throw err
//     response(200, fields, "alat show", res)
//   })
// })

// app.get("/alat/:id", (req, res)=> {
//   const id = req.params.id
//   const sql = `SELECT name, status FROM alat WHERE id = ${id}`
//   pool.query(sql, (err, fields) => {
//     if(err) throw err
//     response(200, fields, `alat by id = ${id}`, res)
//   })
// })

// app.post("/alat",(req,res)=>{
//   const {id, name, status } = req.body
//   const sql = `INSERT INTO alat (id,name,status) VALUES ('${id}', '${name}', '${status}')`
  
//   pool.query(sql, (err, fields) => {
//     if(err) response(500, "invalid", "error", res)
//     if(fields?.rowCount){
//        const data = {
//         isSucces: fields.rowCount,
//         id: fields.insertId
//        }
//        response(200, data, "post data", res)
//     }
//   })
// })

// app.put("/alat",(req,res)=>{
//   const { id, name, status } = req.body
//   const sql = `UPDATE alat SET name = '${name}', status = '${status}' WHERE id = '${id}'`
//   pool.query(sql, (err, fields) => {
//     if(err) response(500, "invalid", "error", res)
//     if(fields?.rowCount){
//       const data = {
//         isSucces: fields.rowCount,
//         message: fields.message,
//        }
//       response(200, data, "Update Data Succesfuly", res)
//     }else{
//       response(404, "user not found", "error", res)
//     }
//   })
// })

// app.delete("/alat",(req,res)=>{
//   const { id,name,status } = req.body
//   const sql = `DELETE FROM alat WHERE id = '${id}' `

//   pool.query(sql, (err, fields) => {
//     if(err) response(500, "invalid", "error", res)
//     if(fields?.rowCount){
//       const data = {
//         isDeleted : fields.rowCount,
//         message : fields.message
//       }
//       response(200, data, "Delete Data Succesfuly", res)
//     }else{
//       response(404, "id not found", "error", res)
//     }
//   })
// })

app.listen(port, () => {
  console.log(`anda masuk kedalam port ${port}`);
});

pool.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database berhasil ditemukan");
  }
});
