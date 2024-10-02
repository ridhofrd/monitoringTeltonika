import bcrypt from 'bcrypt';

const password = 'lala25'; // Ganti dengan password asli yang ingin kamu hash
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Password Hashed:', hash); // Hasil hash akan ditampilkan di sini
    }
});
