import {response} from '../res/response.js'
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    "postgresql://postgres:LBMHEDlIMcnMWMzOibdwsMSkSFmbbhKN@junction.proxy.rlwy.net:21281/railway", // Use the full connection string
});

export const konfigurasiAlat = async (req, res) => {
    try {
        console.log("Menerima permintaan GET /alat");
        const result = await pool.query(
          "SELECT * FROM konfigurasi"
        );
        console.log("Data alat berhasil diambil:", result.rows);
        res.json(result.rows);
      } catch (err) {
        console.error("Error di GET /alat:", err);
        response(500, "invalid", "error", err);
      }
}

export const konfigurasiAlatid = async (req, res)=> {
    try{
        const id_sewa = req.params.id_sewa
        const sql = `SELECT * FROM konfigurasi WHERE id_sewa = $1`
        const result = await pool.query(sql, [id_sewa])
        if(result.rows.length > 0){
            response(200, result.rows, `alat by id_sewa = '${id_sewa}'`, res)
        }else{
            response(404, null, `alat with id_sewa = '${id_sewa}' not found`, res)
        }
    }catch(err){
        response(500, "invalid", "error", res);
    }
}

export const updateKonfigurasi = async (req, res) => {
    try {
        const { id_sewa } = req.params; // Ambil dari route parameter
        const { labelalat, suhubawah, suhuatas, targetpemasangan, tanggalpemasangan, urlgambar, status_alarm, namapenerima, nomorwa } = req.body;
        let gambarURL = urlgambar;
        if (!urlgambar.startsWith("http")) {
            // Asumsikan ada field 'gambar' di req.body yang berisi nama file gambar
            const { urlgambar } = req.body;
            if (urlgambar) {
                gambarURL = `${req.protocol}://${req.get("host")}/public/images/${urlgambar}`;
            } else {
                return response(400, "Missing 'gambar' field for URL construction", "error", res);
            }
        }

        const sql = `UPDATE konfigurasi SET labelalat = $1, suhubawah = $2, suhuatas = $3, targetpemasangan = $4, tanggalpemasangan = $5, urlgambar = $6, status_alarm = $7, namapenerima = $8, nomorwa = $9 WHERE id_sewa = $10 RETURNING *`;
        const result = await pool.query(sql, [labelalat, suhubawah, suhuatas, targetpemasangan, tanggalpemasangan, urlgambar, status_alarm, namapenerima, nomorwa, id_sewa]);

        if (result.rowCount) {
            const data = {
                isSuccess: result.rowCount, // Perbaiki typo di sini
                message: "Update Data Successfully"
            };
            response(200, data, "Update Data is Successfully", res);
        } else {
            response(404, `Konfigurasi dengan id_sewa = ${id_sewa} tidak ditemukan`, "error", res);
        }
    } catch (err) {
        console.error("Error updating konfigurasi:", err); // Tambahkan logging untuk debugging
        response(500, "invalid", "error", res);
    }
}

export const postPerjalanan = async (req, res) => {
    try {
        const id_sewa = req.params.id_sewa;
        const { nomorkendaraan, jenis_kendaraan } = req.body;

        if (!id_sewa || !nomorkendaraan || !jenis_kendaraan) {
            return response(400, null, 'Data tidak lengkap', res);
        }

        const sql = `
            INSERT INTO perjalanan (id_sewa, id_konfigurasi, nomorkendaraan, jenis_kendaraan)
            SELECT k.id_sewa, k.id_konfigurasi, $1, $2
            FROM konfigurasi k
            WHERE k.id_sewa = $3
            RETURNING *;
        `;

        const result = await pool.query(sql, [nomorkendaraan, jenis_kendaraan, id_sewa]);

        if (result.rows.length > 0) {
            response(201, result.rows[0], 'Data berhasil ditambahkan ke tabel perjalanan', res);
        } else {
            response(404, null, `Tidak ditemukan konfigurasi dengan id_sewa = '${id_sewa}'`, res);
        }
    } catch (err) {
        console.error(err);
        response(500, null, 'Terjadi kesalahan pada server', res);
    }
};

export const postColdStorage = async (req, res) => {
    try {
        const id_sewa = req.params.id_sewa;

        const { namapemilik, latitude, longitude, alamat, kapasitas } = req.body;

        if (!id_sewa || !namapemilik || !latitude || !longitude || !alamat || !kapasitas) {
            return response(400, null, 'Data tidak lengkap', res);
        }

        if (isNaN(latitude) || isNaN(longitude) || isNaN(kapasitas)) {
            return response(400, null, 'Latitude, longitude, dan kapasitas harus berupa angka', res);
        }

        const sql = `
            INSERT INTO cold_storage (id_sewa, id_konfigurasi, namapemilik, latitude, longitude, alamat, kapasitas)
            SELECT k.id_sewa, k.id_konfigurasi, $1, $2, $3, $4, $5
            FROM konfigurasi k
            WHERE k.id_sewa = $6
            RETURNING *;
        `;

        const result = await pool.query(sql, [namapemilik, latitude, longitude, alamat, kapasitas, id_sewa]);

        if (result.rows.length > 0) {
            response(201, result.rows[0], 'Data berhasil ditambahkan ke tabel cold_storage', res);
        } else {
            response(404, null, `Tidak ditemukan konfigurasi dengan id_sewa = '${id_sewa}'`, res);
        }
    } catch (err) {
        console.error(err);
        response(500, null, 'Terjadi kesalahan pada server', res);
    }
};
