// app.js

import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import { Pool } from "pg";
import cors from "cors";

// Inisialisasi dotenv untuk memuat variabel lingkungan dari .env
dotenv.config();

// Membuat instance Express
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Mengizinkan semua permintaan cross-origin
app.use(bodyParser.json()); // Untuk mem-parsing request body dalam format JSON

// Routes
app.use("/auth", authRoutes); // Route untuk autentikasi

// PostgreSQL connection
const pool = new Pool({
  connectionString:
    "postgresql://postgres:LBMHEDlIMcnMWMzOibdwsMSkSFmbbhKN@junction.proxy.rlwy.net:21281/railway", // Ganti dengan connection string Anda
});

// =============================
// Endpoint yang Sudah Ada
// =============================

// Route untuk mendapatkan semua clients
app.get("/clients", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_client as id, namaclient as label FROM public.client"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk mendapatkan semua alat
app.get("/alat", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT imei as id, namaalat as label, statusalat, gambar, tanggal_produksi FROM public.alat"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk mendapatkan semua sewa
app.get("/sewa", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT sewa.id_sewa, alat.imei, alat.namaalat, client.id_client, client.namaclient 
       FROM public.sewa 
       INNER JOIN public.alat ON sewa.imei = alat.imei 
       INNER JOIN public.client ON client.id_client = sewa.id_client`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk mendapatkan sewa berdasarkan id_klien
app.get("/sewa/:id_klien", async (req, res) => {
  try {
    const id_klien = req.params.id_klien;
    const result = await pool.query(
      `SELECT sewa.id_sewa, alat.imei, alat.namaalat, client.id_client, client.namaclient 
       FROM public.sewa 
       INNER JOIN public.alat ON sewa.imei = alat.imei 
       INNER JOIN public.client ON client.id_client = sewa.id_client 
       WHERE sewa.id_client = $1`,
      [id_klien]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk mendapatkan alat berdasarkan id_klien
app.get("/alatklien", async (req, res) => {
  const temp_id_klien = 2; // Ganti sesuai kebutuhan

  try {
    const result = await pool.query(
      `
      SELECT alat.imei as id, namaalat as label 
      FROM public.alat 
      JOIN public.sewa ON sewa.imei = alat.imei 
      WHERE sewa.id_client = $1`,
      [temp_id_klien]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk mendapatkan log track berdasarkan IMEI
app.get("/log_track/:imei", async (req, res) => {
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
    res.status(500).send("Server Error");
  }
});

// Route untuk mendapatkan log track berdasarkan id_klien
app.get("/log_track_id/:id_klien", async (req, res) => {
  const id_klien = req.params.id_klien;

  try {
    const result = await pool.query(
      `SELECT imei, log_latitude, log_longitude, timestamplog 
       FROM public.riwayat 
       JOIN public.sewa ON sewa.imei = riwayat.imei
       WHERE sewa.id_client = $1
       ORDER BY timestamplog ASC`,
      [id_klien]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk mendapatkan dashboard pinpoints
app.get("/api/dashboardPinpoints", async (req, res) => {
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
    res.status(500).send("Error fetching pinpoint data");
  }
});

// =============================
// Endpoint CRUD untuk Alat
// =============================

// Route untuk mendapatkan semua alat dengan detail lengkap
app.get("/api/alat", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT imei, namaalat, seri, tanggal_produksi AS tanggal, statusalat AS status, gambar FROM public.alat"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk mendapatkan detail alat berdasarkan IMEI
app.get("/api/alat/:imei", async (req, res) => {
  const { imei } = req.params;
  try {
    const result = await pool.query(
      "SELECT imei, namaalat, seri, tanggal_produksi AS tanggal, statusalat AS status, gambar FROM public.alat WHERE imei = $1",
      [imei]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Alat tidak ditemukan");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk menambah alat baru
app.post("/api/alat", async (req, res) => {
  const { namaalat, imei, seri, tanggal, status, gambar } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO public.alat (namaalat, imei, seri, tanggal_produksi, statusalat, gambar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [namaalat, imei, seri, tanggal, status, gambar]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk mengupdate alat berdasarkan IMEI
app.put("/api/alat/:imei", async (req, res) => {
  const { imei } = req.params;
  const { namaalat, seri, tanggal, status, gambar } = req.body;
  try {
    const result = await pool.query(
      "UPDATE public.alat SET namaalat = $1, seri = $2, tanggal_produksi = $3, statusalat = $4, gambar = $5 WHERE imei = $6 RETURNING *",
      [namaalat, seri, tanggal, status, gambar, imei]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Alat tidak ditemukan");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route untuk menghapus alat berdasarkan IMEI
app.delete("/api/alat/:imei", async (req, res) => {
  const { imei } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM public.alat WHERE imei = $1 RETURNING *",
      [imei]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Alat tidak ditemukan");
    }
    res.json({ message: "Alat berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// =============================
// Menjalankan Server
// =============================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("USER:", process.env.USER);
  console.log("PASS:", process.env.APP_PASS);
});
