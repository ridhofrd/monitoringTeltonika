const express = require('express')
const bodyParser = require('body-parser')
const pool = require('./src/models/admin')
const routes = require("./src/routes/Routes")
const cors = require('cors');

const app = express()
const port = 3001
app.use(cors());

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
    console.log("Database is Connected");
  }
});
