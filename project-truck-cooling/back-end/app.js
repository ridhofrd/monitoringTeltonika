const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Add this line
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors()); // This will allow all cross-origin requests

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'monitoring',
  password: 'faisal',
  port: 5432,
});

// Route to get clients
app.get('/clients', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_klien as id, nama as label FROM klien');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/alat', async (req, res) => {
  try {
    const result = await pool.query('SELECT imei as id, nama_alat as label FROM alat');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
