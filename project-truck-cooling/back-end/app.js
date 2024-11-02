// app.js
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./auth.js";
import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;
import cors from "cors";
import path from "path";
import { env } from "process"

import clientRoutes from "./src/routes/clientRoutes.js";
import addressRoutes from "./src/routes/addressRoutes.js";
import globalRoutes from "./src/routes/globalRoutes.js";

// import routes from "./src/routes/Routes.js";

// Inisialisasi dotenv untuk memuat variabel lingkungan dari .env
dotenv.config();

// Membuat instance Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Mengizinkan semua permintaan cross-origin
app.use(bodyParser.json()); // Untuk mem-parsing request body dalam format JSON

// Menyajikan file statis dari folder 'public'
app.use("/public", express.static(path.join(process.cwd(), "public")));

// Routes
app.use("/auth", authRoutes); // Route untuk autentikasi
app.use('/api', addressRoutes);
app.use('/api', globalRoutes);


const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT
});

// Menguji koneksi ke database
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    console.log("Connection successful:", res.rows);
  }
});


//route untuk melakukan insert terhadap database dari data teltonika
app.post("/api/teltonikaDB", async(req, res) => {
  const imei = req.body.imei;
  const jsonCodec = req.body.codec_data;
  const codecData = JSON.parse(jsonCodec);
  const io = req.body.io_data;
  const ioDataObject = parseIOData(io);
  
  const finalTemperature = parseFloat(ioDataObject['Dallas Temperature 1'].replace("°C", ""))
  //  console.log(codecData.data[0].lat)
  // console.log(codecData.data[0].lng, codecData.data[0].lat, finalTemperature, ioDataObject['Digital Input 2'], imei);
  // console.log(ioDataObject);
  // console.log();
  // console.log( codecData);
  console.log(
      [codecData.data[0].lng, codecData.data[0].lat, finalTemperature, ioDataObject['Digital Input 2'], imei]
    )

  try{
    const result = await pool.query(`
      UPDATE alat SET
        latitude = $1,
        longitude = $2,
        suhu = $3,
        digitalinput = $4
        where imei = $5
      RETURNING
        latitude,
        longitude,
        suhu,
        digitalinput;
        `,
      [codecData.data[0].lng,
       codecData.data[0].lat,
       finalTemperature,
       ioDataObject['Digital Input 2'],
       imei]
    )
    res.status(201).json(result.rows[0]);

  } catch(error){
    console.error("teltonika fail");
    res.status(500).send("teltonika DB fail");
  }
})

function parseIOData(ioData) {
  const ioDataObject = {};
  
  // Split the io_data string by commas to get each key-value pair
  const keyValuePairs = ioData.split(',');

  // Iterate over each key-value pair
  keyValuePairs.forEach(pair => {
      // Split by the first colon only to get key and value
      const [key, ...value] = pair.split(':');
      // Trim and store in the object
      ioDataObject[key.trim()] = value.join(':').trim();
  });

  return ioDataObject;
}

// =============================
// Menjalankan Server
// =============================
pool.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Database berhasil ditemukan");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_PORT:", process.env.DB_PORT);
  console.log("DB_NAME:", process.env.DB_NAME);
});
