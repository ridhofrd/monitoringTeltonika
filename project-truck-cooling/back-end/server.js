<<<<<<< HEAD
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
=======
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

import cors from 'cors';

// Middleware



dotenv.config(); // Memuat variabel lingkungan dari .env

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());
// Middleware
app.use(bodyParser.json()); // Untuk mem-parsing request body dalam format JSON

// Routes
app.use('/auth', authRoutes);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('USER:', process.env.USER); 
    console.log('PASS:', process.env.APP_PASS);
>>>>>>> 32cc38b7e63394b014761ab8e64ee4bf5f7a00e5
});
