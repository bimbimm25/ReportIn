import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Tambahkan ini
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import "../styles/navbarUser.css";
import { HiMenuAlt2, HiX } from "react-icons/hi";

function NavbarUser() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); // State untuk simpan nama
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk toggle menu mobile
    useEffect(() => {
        if (token) {
            try {
                // Decode token untuk ambil data payload
                const decoded = jwtDecode(token);
                // decoded.username sesuai dengan key yang kamu buat di PHP tadi
                setUsername(decoded.username);
            } catch (error) {
                console.error("Token tidak valid", error);
                localStorage.clear();
            }
        }
    }, [token]);

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    toast.success("Logout berhasil");

    navigate("/login");
};

    return (
        <header className="navbar-user-bar">
            {/* 1. Hamburger Menu (Hanya muncul di Mobile, posisi Kiri) */}
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <HiX /> : <HiMenuAlt2 />}
            </button>

            {/* 2. Brand Section (Posisi Kanan di Mobile) */}
            <div className="navbar-user-brand">
                <div className="navbar-user-logo">
                    {token ? username.charAt(0).toUpperCase() : "R"}
                </div>
                <h2 className="navbar-user-title">
                    {token ? username : "ReportIn"}
                </h2>
            </div>

            {/* 3. Navigation & Auth Group (Container yang bisa slide) */}
            <div className={`navbar-main-controls ${isMenuOpen ? "open" : ""}`}>
                <nav className="navbar-user-nav">
                    <Link to='/' className="navbar-user-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to='/about' className="navbar-user-link" onClick={() => setIsMenuOpen(false)}>Tentang</Link>
                    {token && (
                        <Link to='/riwayat' className="navbar-user-link" onClick={() => setIsMenuOpen(false)}>
                            Laporan Saya
                        </Link>
                    )}
                </nav>

                <div className="user-auth-group">
                    {token ? (
                        <button className="user-auth-button primary" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to='/login' className="user-auth-button secondary" onClick={() => setIsMenuOpen(false)}>
                                Masuk
                            </Link>
                            <Link to='/register' className="user-auth-button primary" onClick={() => setIsMenuOpen(false)}>
                                Daftar
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default NavbarUser;