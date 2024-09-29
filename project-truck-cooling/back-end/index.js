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
