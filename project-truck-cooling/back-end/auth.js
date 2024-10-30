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

// POST route untuk login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validasi data yang diterima
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email dan Password wajib diisi." });
    }

    try {
        // Identifikasi jenis user berdasarkan ada/tidaknya karakter "@"
        const isClient = email.includes('@');

        // Tentukan query berdasarkan peran
        const queryText = isClient ? "SELECT * FROM client WHERE email = $1" // untuk client
            : "SELECT * FROM admin WHERE namaadmin = $1"; // untuk admin
        const result = await pool.query(queryText, [email]);

        // Jika user tidak ditemukan
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: "Email salah." });
        }

        const user = result.rows[0];
        console.log('ini user: ', user);
        console.log('Password dari request:', password);

        if (isClient) {
            if (user.password_client !== password) {
                console.log('pass database:', user.password_client);
                return res.status(401).json({ success: false, message: "Password salah." });
            }
        } else {
            if (user.passwordadmin !== password) {
                console.log('pass database:', user.passwordadmin)
                return res.status(401).json({ success: false, message: "Password salah."})
            }
        }

        // Jika berhasil login, buat token JWT
        const tokenPayload = isClient ? { email: user.email } : { namaadmin: user.namaadmin };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // route untuk client dan admin
        const dashboardURL = isClient ? '/dashboard/client' : '/dashboard/admin';
        return res.status(200).json({
            success: true,
            message: "Login berhasil.", token,
            redirectURL: dashboardURL
        })

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Rute yang dilindungi untuk testing
router.post('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'Ini adalah rute yang dilindungi', user: req.user });
});

export default router;