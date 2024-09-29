const pool = require('../models/db');

// Create client
const createClient = async (req, res) => {
  const { nama_client, alamat_client, provinsi, kabupaten_kota, kecamatan, kode_pos, no_hp, email, tgl_bergabung } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Client (nama_client, alamat_client, provinsi, kabupaten_kota, kecamatan, kode_pos, no_hp, email, tgl_bergabung) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [nama_client, alamat_client, provinsi, kabupaten_kota, kecamatan, kode_pos, no_hp, email, tgl_bergabung]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get clients
const getClients = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Client');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update client
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nama_client, alamat_client, provinsi, kabupaten_kota, kecamatan, kode_pos, no_hp, email, tgl_bergabung } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Client SET nama_client=$1, alamat_client=$2, provinsi=$3, kabupaten_kota=$4, kecamatan=$5, kode_pos=$6, no_hp=$7, email=$8, tgl_bergabung=$9 WHERE id_client=$10 RETURNING *',
      [nama_client, alamat_client, provinsi, kabupaten_kota, kecamatan, kode_pos, no_hp, email, tgl_bergabung, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete client
const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Client WHERE id_client=$1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createClient,
  getClients,
  updateClient,
  deleteClient,
};