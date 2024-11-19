import {response} from '../res/response.js'
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    "postgresql://postgres:LBMHEDlIMcnMWMzOibdwsMSkSFmbbhKN@junction.proxy.rlwy.net:21281/railway", // Use the full connection string
});

export const getCommodity = async(req, res) => {
    try {
      console.log("Menerima permintaan GET /commodity");
      const result = await pool.query(
        "SELECT id_konfigurasi, id_commodity, namabarang, descbarang, satuan, stokbarang, gambarbarang FROM public.commodity"
      );
      console.log("Data barang berhasil diambil:", result.rows);
      res.json(result.rows);
    } catch (err) {
      console.error("Error di GET /commodity:", err);
      res.status(500).send("Server Error");
    }
  };

export const getCommodityByID = async (req, res) => {
    const { imei } = req.params;
    try {
      const result = await pool.query(
        "SELECT id_konfigurasi, id_commodity, namabarang, descbarang, satuan, stokbarang, gambarbarang FROM public.commodity WHERE id_commodity = $1",
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
  };

  export const postCommodity = async (req, res) => {
    try {
        const { id_konfigurasi, namabarang, descbarang, satuan, stokbarang, gambarbarang } = req.body;

        console.log("Menerima permintaan POST /commodity:", req.body);

        let gambarURL = gambarbarang;
        if (gambarbarang && !gambarbarang.startsWith("http")) {
            gambarURL = `${req.protocol}://${req.get("host")}/public/images/${gambarbarang}`;
        }

        const query = `
            INSERT INTO public.commodity (id_konfigurasi, namabarang, descbarang, satuan, stokbarang, gambarbarang)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id_konfigurasi, namabarang, descbarang, satuan, stokbarang, gambarbarang;
        `;
        const values = [id_konfigurasi, namabarang, descbarang, satuan, stokbarang, gambarURL];

        const result = await pool.query(query, values);

        console.log("Commodity berhasil ditambahkan:", result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error di POST /commodity:", err);
        res.status(500).send("Server Error");
    }
};


export const putCommodity = async (req, res) => {
  try {
      const { id_commodity, id_konfigurasi, namabarang, descbarang, satuan, stokbarang } = req.body;

      console.log("Menerima permintaan PUT /commodity:", req.body);

      const query = `
          UPDATE public.commodity
          SET id_konfigurasi = $1,
              namabarang = $2,
              descbarang = $3,
              satuan = $4,
              stokbarang = $5
          WHERE id_commodity = $6
          RETURNING id_commodity, id_konfigurasi, namabarang, descbarang, satuan, stokbarang;
      `;
      const values = [id_konfigurasi, namabarang, descbarang, satuan, stokbarang, id_commodity];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
          return res.status(404).send("Commodity dengan id_commodity tersebut tidak ditemukan.");
      }

      console.log("Commodity berhasil diperbarui:", result.rows[0]);
      res.status(200).json(result.rows[0]);
  } catch (err) {
      console.error("Error di PUT /commodity:", err);
      res.status(500).send("Server Error");
  }
};

export const deleteCommodity = async (req, res) => {
  try {
      const { id_commodity } = req.body;

      console.log("Menerima permintaan DELETE /commodity:", req.body);
      
      const query = `
          DELETE FROM public.commodity
          WHERE id_commodity = $1
          RETURNING id_commodity, namabarang, descbarang, satuan, stokbarang, gambarbarang;
      `;
      const values = [id_commodity];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
          return res.status(404).send("Commodity dengan id_commodity tersebut tidak ditemukan.");
      }

      console.log("Commodity berhasil dihapus:", result.rows[0]);
      res.status(200).json({
          message: "Commodity berhasil dihapus.",
          deletedCommodity: result.rows[0],
      });
  } catch (err) {
      console.error("Error di DELETE /commodity:", err);
      res.status(500).send("Server Error");
  }
};