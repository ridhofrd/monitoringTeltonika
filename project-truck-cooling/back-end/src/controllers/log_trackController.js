import {response} from '../res/response.js'
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    "postgresql://postgres:LBMHEDlIMcnMWMzOibdwsMSkSFmbbhKN@junction.proxy.rlwy.net:21281/railway", // Use the full connection string
});

    export const getLog_track =  async (req, res) => {
        try {
        const result = await pool.query(
            `SELECT * from riwayat
            ORDER BY timestamplog ASC`,
        );
        res.json(result.rows);
        } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
        }
    };

    export const getLog_trackByIDClient =  async (req, res) => {
        const id_klien = req.params.id_klien;
    
        try {
        const result = await pool.query(
            `SELECT *
            FROM public.riwayat 
            JOIN public.sewa ON sewa.imei = riwayat.imei
            WHERE sewa.id_client = $1
            ORDER BY timestamplog ASC`,
            [id_klien]
        );
        res.json(result.rows);
        } catch (err) {
        console.error(err);
        res.status(500).send(id_klien);
        }
    };
    
    export const getLog_trackByIMEI = async (req, res) => {
      const { imei } = req.params;
      let { date, startTime, endTime, interval } = req.query;
    
      // Konversi format tanggal dari MM-DD-YYYY ke YYYY-MM-DD
      if (date) {
        const [year, day, month] = date.split('-');
        date = `${month}-${day}-${year}`;
      }
    
      let query = `
        SELECT * FROM (
          SELECT *, ROW_NUMBER() OVER (ORDER BY timestamplog) AS row_num
          FROM public.riwayat
          WHERE imei = $1
      `;
      const params = [imei];
    
      // Tambahkan filter berdasarkan tanggal yang sudah dikonversi
      if (date) {
        query += ` AND timestamplog::date = $${params.length + 1}`;
        params.push(date);
      }
    
      if (startTime && endTime) {
        query += ` AND timestamplog::time BETWEEN $${params.length + 1} AND $${params.length + 2}`;
        params.push(startTime, endTime);
      }
    
      query += `
        ) AS filtered_logs
      `;
    
      // Tambahkan kondisi untuk interval
      if (interval) {
        const intervalValue = parseInt(interval, 10);
        if (intervalValue > 0) {
          query += ` WHERE row_num % ${intervalValue} = 1`;
        }
      }
    
      query += ` ORDER BY timestamplog ASC`;
    
      try {
        const result = await pool.query(query, params);
        res.json(result.rows);
      } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Internal Server Error');
      }
    };
    
