import pkg from "pg";
const { Pool } = pkg;
import nodemailer from 'nodemailer';

const pool = new Pool({
  connectionString:
    "postgresql://postgres:LBMHEDlIMcnMWMzOibdwsMSkSFmbbhKN@junction.proxy.rlwy.net:21281/railway", // Use the full connection string
});

export const createClient = async (req, res) => {
  const {
    namaclient,
    jalan,
    provinsi,
    kabupaten,
    kecamatan,
    kode_pos,
    kontakclient,
    email,
    tgl_bergabung,
    status_akun
  } = req.body;

  try {
    const emailCheck = await pool.query(
      "SELECT * FROM Client WHERE email = $1",
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    if (namaclient.length > 50) {
      return res.status(400).json({ message: "Nama client terlalu panjang, maksimal 50 karakter" });
    }

    const randomPassword = Math.random().toString(36).slice(-8); 
    if (randomPassword.length > 20) {
      randomPassword = randomPassword.slice(0, 20);
    }

    const result = await pool.query(
      "INSERT INTO Client (namaclient, password_client, jalan, provinsi, kabupaten, kecamatan, kode_pos, kontakclient, email, tgl_bergabung, status_akun) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        namaclient,
        randomPassword, 
        jalan,
        provinsi,
        kabupaten,
        kecamatan,
        kode_pos,
        kontakclient,
        email,
        tgl_bergabung,
        status_akun
      ]
    );

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
          user: 'rasyiidraafi05@gmail.com',
          pass: 'mapm zirn oipz vlfm'
      },
      tls: {
          rejectUnauthorized: false
      }
        });

    let mailOptions = {
      from: 'rasyiidraafi05@gmail.com',
      to: email,
      subject: 'Account Created Successfully',
      text: `Hi ${namaclient},

      Your account has been created successfully. Here are your account details:
      
      Name: ${namaclient}
      Email: ${email}
      Password: ${randomPassword}
      Address: ${jalan}, ${kecamatan}, ${kabupaten}, ${provinsi}, ${kode_pos}
      Contact: ${kontakclient}
      Join Date: ${tgl_bergabung}
      Account Status: ${status_akun}
      
      Please change your password after your first login.
      
      Thank you!`
      };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Gagal mengirim email." });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(201).json(result.rows[0]); 
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

// get all client
export const getClients = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const searchTerm = req.query.search || "";

  try {
    let countQuery = "SELECT COUNT(*) FROM Client";
    let selectQuery = "SELECT * FROM Client";
    const queryParams = [];

    if (searchTerm) {
      const searchCondition = `
        WHERE 
        LOWER(namaclient) LIKE LOWER($1) OR
        LOWER(jalan) LIKE LOWER($1) OR
        LOWER(kontakclient) LIKE LOWER($1) OR
        LOWER(email) LIKE LOWER($1)
      `;
      countQuery += searchCondition;
      selectQuery += searchCondition;
      queryParams.push(`%${searchTerm}%`);
    }

    const countResult = await pool.query(countQuery, queryParams);
    const totalClients = parseInt(countResult.rows[0].count);

    selectQuery +=
      " ORDER BY id_client LIMIT $" +
      (queryParams.length + 1) +
      " OFFSET $" +
      (queryParams.length + 2);
    queryParams.push(limit, offset);

    const result = await pool.query(selectQuery, queryParams);

    const totalPages = Math.ceil(totalClients / limit);

    res.status(200).json({
      clients: result.rows,
      currentPage: page,
      totalPages: totalPages,
      totalClients: totalClients,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//get detail client
export const detailClients = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM Client WHERE id_client = $1",
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//update client
export const updateClient = async (req, res) => {
  const { id } = req.params;
  const {
    namaclient,
    jalan,
    provinsi,
    kabupaten,
    kecamatan,
    kode_pos,
    kontakclient,
    email,
    tgl_bergabung,
  } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Client SET namaclient=$1, jalan=$2, provinsi=$3, kabupaten=$4, kecamatan=$5, kode_pos=$6, kontakclient=$7, email=$8, tgl_bergabung=$9 WHERE id_client=$10 RETURNING *",
      [
        namaclient,
        jalan,
        provinsi,
        kabupaten,
        kecamatan,
        kode_pos,
        kontakclient,
        email,
        tgl_bergabung,
        id,
      ]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//delete client
export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Client WHERE id_client=$1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//suspend client
export const suspendClient = async (req, res) => {
  const { id } = req.params;
  const clientId = parseInt(id, 10);

  if (isNaN(clientId)) {
    return res.status(400).json({ message: "Invalid client ID" });
  }

  try {
    const result = await pool.query(
      "UPDATE Client SET status_akun=$1 WHERE id_client=$2 RETURNING *",
      ["Suspend", clientId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//restore client
export const restoreClient = async (req, res) => {
  const { id } = req.params;
  const clientId = parseInt(id, 10);

  if (isNaN(clientId)) {
    return res.status(400).json({ message: "Invalid client ID" });
  }

  try {
    const result = await pool.query(
      "UPDATE Client SET status_akun=$1 WHERE id_client=$2 RETURNING *",
      ["Aktif", clientId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};