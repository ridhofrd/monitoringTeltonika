import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

//import cors from 'cors';
const { Pool } = require('pg');
const cors = require('cors'); // Add this line
const app = express();
const port = 5000;
// Middleware

dotenv.config(); // Memuat variabel lingkungan dari .env

//const app = express();
//const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());
// Middleware
app.use(bodyParser.json()); // Untuk mem-parsing request body dalam format JSON

// Routes
app.use('/auth', authRoutes);

// Jalankan server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log('USER:', process.env.USER); 
//     console.log('PASS:', process.env.APP_PASS);
// });


// Use CORS middleware
//app.use(cors()); // This will allow all cross-origin requests

// PostgreSQL connection
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'teltonika',
//   password: 'root',
//   port: 5432,
// });

// PostgreSQL connection
const pool = new Pool({
  connectionString: 'postgresql://postgres:LBMHEDlIMcnMWMzOibdwsMSkSFmbbhKN@junction.proxy.rlwy.net:21281/railway',  // Use the full connection string
});

// Route to get clients
app.get('/clients', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_client as id, namaclient as label FROM public.client');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/alat',  async (req, res) => {
  try {
    const result = await pool.query('SELECT imei as id, namaalat as label FROM public.alat');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/sewa', async (req, res) => {
  try {
    const result = await pool.query(`SELECT sewa.id_sewa, alat.imei, alat.namaalat, client.id_client, client.namaclient FROM public.sewa INNER JOIN public.alat ON sewa.imei = alat.imei INNER JOIN public.client ON client.id_client = sewa.id_client`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/sewa/:id_klien', async (req, res) => {
  try {
    const id_klien = req.params.id_klien;  // Fix this line
    const result = await pool.query(`SELECT sewa.id_sewa, alat.imei, alat.namaalat, client.id_client, client.namaclient FROM public.sewa INNER JOIN public.alat ON sewa.imei = alat.imei INNER JOIN public.client ON client.id_client = sewa.id_client WHERE sewa.id_client = $1`, [id_klien]);
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
      SELECT alat.imei as id, namaalat as label 
       FROM public.alat 
       JOIN public.sewa ON sewa.imei = alat.imei 
       WHERE sewa.id_client = $1`, 
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
      `SELECT imei, log_latitude, log_longitude, timestamplog, suhu2
       FROM public.riwayat 
       WHERE imei = $1 
       ORDER BY timestamplog ASC`, 
      [imei]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/log_track_id/:id_klien', async (req, res) => {
  const id_klien = req.params.id_klien;

  try {
    const result = await pool.query(
      `SELECT imei, log_latitude, log_longitude, timestamplog 
        FROM public.riwayat 
	      JOIN public.sewa ON sewa.imei = riwayat.imei
        WHERE sewa.id_client =  $1
        ORDER BY timestamplog ASC`, 
      [id_klien]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.get('/api/dashboardPinpoints', async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT DISTINCT ON (r.id_alat)
            c.namaclient AS "client",
            to_char(r.timestamplog, 'YYYY-MM-DD HH24:MI:SS') AS "time",
          r.log_latitude AS "latitude",
          r.log_longitude AS "longitude",
            r.suhu2 AS "temperature",
            co.namabarang AS "item",
          co.descbarang AS "detail_url",
            co.beratbarang AS "storage",
          r.timestamplog
        FROM public.riwayat r
        JOIN public.alat a ON r.id_alat = a.id_alat
        JOIN public.client c ON a.id_sewa = c.id_client
        JOIN public.perjalanan p ON r.route_id = p.route_id
        JOIN public.commodity co ON p.route_id = co.route_id
        ORDER BY r.id_alat, r.timestamplog DESC;
      `);
      
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching pinpoint data');
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('USER:', process.env.USER); 
    console.log('PASS:', process.env.APP_PASS);
});


// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


// const express = require('express');
// const { Pool } = require('pg');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// // Use CORS middleware
// app.use(cors()); // This will allow all cross-origin requests

// // PostgreSQL connection
// const pool = new Pool({
//   connectionString: 'postgresql://postgres:LBMHEDlIMcnMWMzOibdwsMSkSFmbbhKN@junction.proxy.rlwy.net:21281/railway',  // Use the full connection string
// });

// // Route to get clients
// app.get('/clients', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT id_klien as id, nama as label FROM klien');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// app.get('/alat',  async (req, res) => {
//   try {
//     const result = await pool.query('SELECT imei as id, nama_alat as label FROM alat');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// app.get('/sewa', async (req, res) => {
//   try {
//     const result = await pool.query(`SELECT sewa.id_sewa, alat.imei, alat.nama_alat, klien.id_klien, klien.nama FROM sewa INNER JOIN alat ON sewa.imei = alat.imei INNER JOIN klien ON klien.id_klien = sewa.id_klien`);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// app.get('/sewa/:id_klien', async (req, res) => {
//   try {
//     const id_klien = req.params.id_klien;
//     const result = await pool.query(`SELECT sewa.id_sewa, alat.imei, alat.nama_alat, klien.id_klien, klien.nama FROM sewa INNER JOIN alat ON sewa.imei = alat.imei INNER JOIN klien ON klien.id_klien = sewa.id_klien WHERE sewa.id_klien = $1`, [id_klien]);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// app.get('/alatklien', async (req, res) => {
//   const temp_id_klien = 2; 
  
//   try {
//     const result = await pool.query(`
//       SELECT alat.imei as id, nama_alat as label 
//        FROM alat 
//        JOIN sewa ON sewa.imei = alat.imei 
//        WHERE sewa.id_klien = $1`, 
//       [temp_id_klien]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// app.get('/log_track/:imei', async (req, res) => {
//   const imei = req.params.imei;

//   try {
//     const result = await pool.query(
//       `SELECT imei, latitude, longitude, waktu 
//        FROM log_track 
//        WHERE imei = $1 
//        ORDER BY waktu ASC`, 
//       [imei]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
