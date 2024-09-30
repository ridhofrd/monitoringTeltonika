import { useContext, useState } from "react";
import AuthContext from "app/contexts/JWTAuthContext";
import axios from 'axios';

const useAuth = () => {
    const { user, setUser } = useContext(AuthContext); // Ambil user dari konteks
    const [loading, setLoading] = useState(false);

    // Status autentikasi
    const isAuthenticated = !!user; // Jika ada user, berarti sudah login

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { email, password });
            console.log("Login response:", response.data); // Tambahkan log ini untuk debugging
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token); // Simpan token di local storage
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message); // Tangani kesalahan
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return { user, isAuthenticated, login, loading };
};

export default useAuth;
