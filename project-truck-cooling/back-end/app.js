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

app.get('/alat',  async (req, res) => {
  try {
    const result = await pool.query('SELECT imei as id, nama_alat as label FROM alat');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/sewa', async (req, res) => {
  try {
    const result = await pool.query(`SELECT sewa.id_sewa, alat.imei, alat.nama_alat, klien.id_klien, klien.nama FROM sewa INNER JOIN alat ON sewa.imei = alat.imei INNER JOIN klien ON klien.id_klien = sewa.id_klien`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/sewa/:id_klien', async (req, res) => {
  try {
    const id_klien = req.params.id_klien;  // Fix this line
    const result = await pool.query(`SELECT sewa.id_sewa, alat.imei, alat.nama_alat, klien.id_klien, klien.nama FROM sewa INNER JOIN alat ON sewa.imei = alat.imei INNER JOIN klien ON klien.id_klien = sewa.id_klien WHERE sewa.id_klien =  $1`, [id_klien]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.get('/alatklien', async (req, res) => {
  const temp_id_klien = 2; 
  
  try {
    const result = await pool.query(`
      SELECT alat.imei as id, nama_alat as label 
       FROM alat 
       JOIN sewa ON sewa.imei = alat.imei 
       WHERE sewa.id_klien = $1`, 
      [temp_id_klien]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/log_track/:imei', async (req, res) => {
  const imei = req.params.imei;

  try {
    const result = await pool.query(
      `SELECT imei, latitude, longitude, waktu 
       FROM log_track 
       WHERE imei = $1 
       ORDER BY waktu ASC`, 
      [imei]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
