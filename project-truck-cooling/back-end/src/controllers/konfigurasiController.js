// konfigurasiController.js

import { response } from '../res/response.js';
import pkg from 'pg';
const { Pool } = pkg;

import qrcode from 'qrcode-terminal';
import whatsappWeb from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsappWeb;

const pool = new Pool({
  connectionString:
    "postgresql://postgres:LBMHEDlIMcnMWMzOibdwsMSkSFmbbhKN@junction.proxy.rlwy.net:21281/railway", // Ganti dengan connection string yang benar
});

const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
});

whatsappClient.on('qr', (qr) => {
  // Tampilkan QR code di terminal untuk dipindai
  qrcode.generate(qr, { small: true });
  console.log('Silakan scan QR code di atas dengan WhatsApp Anda.');
});

whatsappClient.on('ready', () => {
  console.log('Client WhatsApp siap digunakan!');
});

// Inisialisasi client WhatsApp
whatsappClient.initialize();

function sendWhatsAppMessage(phoneNumber, message) {
  // Normalisasi nomor telepon
  const normalizedNumber = normalizePhoneNumber(phoneNumber);

  // Format nomor telepon untuk WhatsApp (tambahkan '@c.us')
  const whatsappNumber = normalizedNumber + '@c.us';

  whatsappClient.sendMessage(whatsappNumber, message)
    .then((response) => {
      console.log(`Pesan berhasil dikirim ke ${phoneNumber}`);
    })
    .catch((err) => {
      console.error(`Gagal mengirim pesan ke ${phoneNumber}:`, err);
    });
}

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
    response(500, "invalid", "error", err, res);
  }
}

export const konfigurasiAlatid = async (req, res) => {
  try {
    const id_sewa = req.params.id_sewa;
    const sql = `SELECT * FROM konfigurasi WHERE id_sewa = $1`;
    const result = await pool.query(sql, [id_sewa]);
    if (result.rows.length > 0) {
      response(200, result.rows[0], `Alat dengan id_sewa = '${id_sewa}'`, res);
    } else {
      response(404, null, `Alat dengan id_sewa = '${id_sewa}' tidak ditemukan`, res);
    }
  } catch (err) {
    console.error("Error di GET /alat/:id_sewa:", err);
    response(500, "invalid", "error", err, res);
  }
}

export const updateKonfigurasi = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id_sewa } = req.params;
    let { 
      labelalat, 
      suhubawah, 
      suhuatas, 
      targetpemasangan, 
      tanggalpemasangan, 
      urlgambar, 
      status_alarm, 
      namapenerima, 
      nomorwa, 
      nomorkendaraan, 
      jenis_kendaraan, 
      namaPemilik, 
      latitude, 
      longitude, 
      alamat, 
      kapasitas 
    } = req.body;

    // Validasi input
    if (!labelalat || !targetpemasangan || !tanggalpemasangan || !suhubawah || !suhuatas) {
      return response(400, null, "Data konfigurasi tidak lengkap", res);
    }

    if (parseFloat(suhuatas) <= parseFloat(suhubawah)) {
      return response(400, null, "Suhu atas harus lebih besar dari suhu bawah", res);
    }

    if (status_alarm === "aktif") {
      if (!namapenerima || !nomorwa) {
        return response(400, null, "Nama penerima dan nomor WA harus diisi jika alarm aktif", res);
      }
    } else {
      // Jika alarm tidak aktif, set namapenerima dan nomorwa ke null
      namapenerima = null;
      nomorwa = null;
    }

    let gambarURL = urlgambar;

    if (urlgambar && !urlgambar.startsWith("http")) {
      gambarURL = `${req.protocol}://${req.get("host")}/public/images/${urlgambar}`;
    }

    // Mulai transaksi
    await client.query('BEGIN');

    // Update konfigurasi
    const sqlUpdate = `UPDATE konfigurasi 
                       SET labelalat = $1, 
                           suhubawah = $2, 
                           suhuatas = $3, 
                           targetpemasangan = $4, 
                           tanggalpemasangan = $5, 
                           urlgambar = $6, 
                           status_alarm = $7, 
                           namapenerima = $8, 
                           nomorwa = $9 
                       WHERE id_sewa = $10 
                       RETURNING *`;
    const resultUpdate = await client.query(sqlUpdate, [
      labelalat, 
      suhubawah, 
      suhuatas, 
      targetpemasangan, 
      tanggalpemasangan, 
      gambarURL, 
      status_alarm, 
      namapenerima, 
      nomorwa, 
      id_sewa
    ]);

    if (resultUpdate.rowCount === 0) {
      await client.query('ROLLBACK');
      return response(404, null, `Konfigurasi dengan id_sewa = ${id_sewa} tidak ditemukan`, res);
    }

    const konfigurasiBaru = resultUpdate.rows[0];

    // Cek apakah target_pemasangan berubah
    const targetPemasanganLama = konfigurasiBaru.targetpemasangan; // Jika ada data konfigurasi lama, gunakan itu

    // Karena kita sudah melakukan update, kita perlu mengambil target_pemasangan lama sebelum diupdate
    // Untuk simplicity, kita asumsikan bahwa perubahan target_pemasangan terjadi hanya jika frontend mengirim perubahan
    // Jika ada data konfigurasi lama, gunakan data tersebut
    // Misalnya, frontend mengirimkan target_pemasanganLama jika diperlukan

    // Untuk saat ini, kita akan mengasumsikan bahwa kita hanya perlu menangani target_pemasangan baru
    // dan menghapus data lama jika diperlukan

    // Untuk mendapatkan target_pemasangan lama, kita perlu mengambilnya sebelum update
    // Sebelumnya, kita belum mengambilnya, sehingga kita perlu memperbaikinya

    // Ubah urutan untuk mendapatkan konfigurasi lama terlebih dahulu

    // Ambil konfigurasi lama sebelum diupdate
    const sqlGetLama = `SELECT * FROM konfigurasi WHERE id_sewa = $1`;
    const resultLama = await client.query(sqlGetLama, [id_sewa]);

    if (resultLama.rows.length === 0) {
      await client.query('ROLLBACK');
      return response(404, null, `Konfigurasi dengan id_sewa = ${id_sewa} tidak ditemukan`, res);
    }

    const konfigurasiLama = resultLama.rows[0];
    const targetPemasanganLamaData = konfigurasiLama.targetpemasangan;

    // Jika target_pemasangan berubah, hapus data dari tabel yang lama
    if (targetPemasanganLamaData !== targetpemasangan) {
      if (targetPemasanganLamaData === 'Truck Cooling') {
        // Hapus data di perjalanan
        await client.query('DELETE FROM perjalanan WHERE id_sewa = $1', [id_sewa]);
      } else if (targetPemasanganLamaData === 'Cold Storage') {
        // Hapus data di cold_storage
        await client.query('DELETE FROM cold_storage WHERE id_sewa = $1', [id_sewa]);
      }
    }

    // Insert ke tabel sesuai target pemasangan baru
    if (targetpemasangan === 'Truck Cooling') {
      if (!nomorKendaraan || !jenis_kendaraan) {
        await client.query('ROLLBACK');
        return response(400, null, "Harap lengkapi data untuk Truck Cooling", res);
      }
      const sqlInsertPerjalanan = `INSERT INTO perjalanan (id_sewa, id_konfigurasi, nomorkendaraan, jenis_kendaraan) 
                                     VALUES ($1, $2, $3, $4) 
                                     RETURNING *`;
      await client.query(sqlInsertPerjalanan, [
        id_sewa, 
        konfigurasiBaru.id_konfigurasi, 
        nomorkendaraan, 
        jenis_kendaraan
      ]);
    } else if (targetpemasangan === 'Cold Storage') {
      if (!namaPemilik || !latitude || !longitude || !alamat || !kapasitas) {
        await client.query('ROLLBACK');
        return response(400, null, "Harap lengkapi data untuk Cold Storage", res);
      }
      const sqlInsertColdStorage = `INSERT INTO cold_storage (id_sewa, id_konfigurasi, namapemilik, latitude, longitude, alamat, kapasitas) 
                                      VALUES ($1, $2, $3, $4, $5, $6, $7) 
                                      RETURNING *`;
      await client.query(sqlInsertColdStorage, [
        id_sewa, 
        konfigurasiBaru.id_konfigurasi, 
        namaPemilik, 
        parseFloat(latitude), 
        parseFloat(longitude), 
        alamat, 
        parseFloat(kapasitas)
      ]);
    }

    // Commit transaksi
    await client.query('COMMIT');

    // Kirim response
    const data = {
      isSuccess: resultUpdate.rowCount,
      message: "Update Data Successfully",
      data: konfigurasiBaru
    };
    response(200, data, "Update Data is Successfully", res);

    // Jika alarm aktif, kirim pesan WhatsApp kepada penerima
    if (status_alarm === "aktif" && nomorwa) {
      const message = `Halo ${namapenerima}, alarm telah diaktifkan untuk alat ${labelalat} dengan ID Sewa ${id_sewa}.`;
      sendWhatsAppMessage(nomorwa, message);
    }

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Error updating konfigurasi:", err);
    response(500, null, `Error updating konfigurasi: ${err.message}`, res);
  } finally {
    client.release();
  }
};
