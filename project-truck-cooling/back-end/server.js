import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

dotenv.config(); // Memuat variabel lingkungan dari .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Untuk mem-parsing request body dalam format JSON

// Routes
app.use('/auth', authRoutes);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('USER:', process.env.USER); 
    console.log('PASS:', process.env.APP_PASS);
});
