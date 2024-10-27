import cryptoRandomString from 'crypto-random-string';
import express from 'express';
import nodemailer from 'nodemailer';
import { hashPassword, comparePassword } from './hashPassword.js';
import jwt from 'jsonwebtoken';
import authenticateToken from './routes/authMiddleware.js';
import pkg from 'pg';
import dotenv from "dotenv";
dotenv.config();
import { env } from "process"
const { Pool } = pkg;

const router = express.Router();

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT
});

// OTP
// Setup Nodemailer transporter
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true untuk port 465, false untuk port 587
    auth: {
        user: process.env.USER,
        pass: process.env.APP_PASS
    },
});

// POST route untuk mengirim OTP
 export const forgotPass = router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Generate OTP dengan crypto-random-string
    const otp = cryptoRandomString({ length: 6, type: 'numeric' });

    try {
        // Kirim OTP melalui email
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: 'Kode OTP untuk Reset Password',
            text: `Kode OTP kamu adalah ${otp}`,
        });

        // Sementara kita return OTP ke respons (hanya untuk testing)
        res.status(200).json({ message: 'OTP berhasil dikirim', otp: otp });
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengirim OTP', error });
    }
});

// // Hash password yang diinginkan
// const password = 'lala25'; // Password asli
// const saltRounds = 10; // Jumlah salt rounds

// const hash = await bcrypt.hash(password, saltRounds); // Menghasilkan hash password

// // Daftar pengguna dengan email dan password yang di-hash
// const users = [
//     {
//         email: "naufalasidiq@gmail.com",
//         password: hash // Password yang sudah di-hash
//     }
// ];

// POST route untuk login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validasi data yang diterima
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email dan Password wajib diisi." });
    }

    try {
        // Query ke database untuk mencari user berdasarkan email
        const queryText = 'SELECT * FROM client WHERE email = $1';
        const result = await pool.query(queryText, [email]);

        // Jika user tidak ditemukan
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: "Email atau Password salah." });
        }

        const user = result.rows[0];
        console.log('ini user: ', user);
        console.log('Password dari request:', password);
        console.log('Password dari database:', user.password_client);

        // Validasi password langsung
        if (user.password_client !== password) {
            return res.status(401).json({ success: false, message: "Email atau Password salah." });
        }

        // Jika berhasil login, buat token JWT
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ success: true, message: "Login berhasil.", token });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Jalankan server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// Rute yang dilindungi untuk testing
router.post('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'Ini adalah rute yang dilindungi', user: req.user });
});

export default router;
