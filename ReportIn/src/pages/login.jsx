import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Input from "../assets/input";
import Button from "../assets/button";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Validasi sederhana
        if (!form.email.trim() || !form.password.trim()) {
            toast.error("Email dan password harus diisi!");
            return;
        }

        // Validasi format email (opsional)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email.trim())) {
            toast.error("Format email tidak valid!");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost/apireportin/api/auth/login.php",
                {
                    email: form.email.trim(),
                    password: form.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 10000, // timeout 10 detik
                }
            );

            // Pastikan status 2xx dan data token ada
            if (res.data && res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                toast.success("Login Berhasil!");

                if (res.data.role === "admin") {
                    navigate("/admin/dashboard");
                    window.location.reload();
                } else {
                    navigate("/");
                    window.location.reload();
                }
            } else {
                // Respon sukses tapi tidak ada token (kemungkinan back-end error)
                toast.error(res.data?.message || "Login gagal, coba lagi.");
            }
        } catch (err) {
            // Tangani error jaringan, timeout, atau HTTP status 4xx/5xx
            let errorMessage = "Terjadi kesalahan, coba lagi nanti.";

            if (err.code === "ECONNABORTED") {
                errorMessage = "Koneksi timeout, periksa jaringan Anda.";
            } else if (err.response) {
                // Server merespon dengan status di luar 2xx
                errorMessage = err.response.data?.message || "Email atau password salah";
                // Jika status 401, bisa tambahkan pesan spesifik
                if (err.response.status === 401) {
                    errorMessage = "Email atau password salah";
                } else if (err.response.status === 400) {
                    errorMessage = err.response.data?.message || "Permintaan tidak valid";
                } else if (err.response.status === 500) {
                    errorMessage = "Kesalahan server, coba lagi nanti";
                }
            } else if (err.request) {
                // Request dikirim tapi tidak ada respon (server mati / jaringan bermasalah)
                errorMessage = "Tidak dapat terhubung ke server.";
            } else {
                // Error lain saat menyiapkan request
                errorMessage = err.message || "Login gagal";
            }

            toast.error(errorMessage);
            // Optional: log untuk debugging (bisa dihapus di production)
            console.error("Login error detail:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-shell">
                <section className="login-panel login-panel-form">
                    <div className="login-headline">
                        <div className="dashboard-page-header">
                            <Button variant="ghost" onClick={() => navigate("/")}>
                                ← Kembali
                            </Button>
                        </div>
                        <h1>Selamat Datang</h1>
                        <p>
                            Masuk untuk mengelola laporan dan melihat semua kritik secara
                            cepat.
                        </p>
                    </div>

                    <div className="login-form-group">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            disabled={loading}
                        />

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div style={{ position: "relative", width: "100%" }}>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                    style={{
                                        width: "100%",
                                        paddingRight: "45px",
                                        boxSizing: "border-box",
                                        display: "block",
                                    }}
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "12px",
                                        top: "50%",
                                        transform: "translateY(-90%)",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#64748b",
                                        zIndex: 10,
                                    }}
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                            <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                            <line x1="2" y1="2" x2="22" y2="22" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            onClick={handleLogin}
                            variant="primary"
                            className="login-submit"
                            disabled={loading}
                        >
                            {loading ? "Memproses..." : "Login"}
                        </Button>

                        <p className="register-text">
                            Belum punya akun?{" "}
                            <Link to="/register" className="register-link">
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Login;