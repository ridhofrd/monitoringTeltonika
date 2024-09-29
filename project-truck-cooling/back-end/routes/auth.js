import cryptoRandomString from 'crypto-random-string';
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

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

export default router;
