import cryptoRandomString from 'crypto-random-string';
import express from 'express';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticateToken from './authMiddleware.js';

const router = express.Router();

// OTP
// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true untuk port 465, false untuk port 587
    auth: {
        user: process.env.USER, 
        pass: process.env.APP_PASS
    },
});

// POST route untuk mengirim OTP
router.post('/forgot-password', async (req, res) => {
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

// LOGIN
const users = [
    {
        email: "naufalasidiq150@gmail.com",
        password: "$2b$10$7mt/NB3xzk5Fsho6O0WbcOEtC7svlySFH9287vYT.QRo0J8.TPWBq"
    } // Password harus sudah di-hash
];

// POST route untuk login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Cari user di "database"
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Bandingkan password yang dimasukkan dengan hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Jika login berhasil, buat token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login berhasil', email: user.email, token });
});

// Rute yang dilindungi (contoh)
router.post('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'Ini adalah rute yang dilindungi', user: req.user });
});

export default router;
