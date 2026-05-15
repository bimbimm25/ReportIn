import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Button from "../assets/button";
import Input from "../assets/input";

function Register(){
    const [form, setForm] = useState({
        username : '',
        email : '',
        password : ''
    })

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = async () => {
        try {
            await axios.post('http://localhost/apireportin/api/auth/register.php', form)
            toast.success('Berhasil Register! Silahkan Login')
            navigate('/login')  
        }
        catch(err) {
            console.log(err)
            toast.error('Register gagal, Silahkan coba lagi')
        }
    }

    return (
        <div className="register-page">
            <div className="register-shell">
                <button className="btn-back" onClick={() => navigate('/')}>
                    ← Kembali
                </button>
                <aside className="register-panel register-side">
                    <div className="register-side-body">
                        <span className="register-side-badge">New here?</span>
                        <h2>Buat akun baru dengan mudah</h2>
                        <p>Mulai laporkan kritik dan saran dengan cepat. Tidak perlu kursi, cukup masuk dan mulai sekarang.</p>
                    </div>
                </aside>

                <section className="register-panel register-form">
                    <div className="register-header">
                        <h1>Create Account</h1>
                        <p>Isi data di bawah untuk membuat akun baru dan masuk ke dashboard.</p>
                    </div>

                    <div className="register-form-group">
                        <Input
                            type="text"
                            placeholder="Username"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                        />

                        <Input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <div style={{
                            position: 'relative',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    style={{
                                        width: '100%', 
                                        paddingRight: '45px',    
                                        boxSizing: 'border-box', 
                                        display: 'block'         
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-90%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#64748b',
                                        zIndex: 10
                                    }}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>

                    <Button 
    onClick={handleRegister} 
    variant="primary" 
    className="register-submit-btn"
    style={{ width: '100%' }}
>
    Sign Up
</Button>

                    <p className="register-helper">
                        Sudah punya akun? <Link to="/login" className="register-link">Sign In</Link>
                    </p>
                </section>
            </div>
        </div>
    )
}
export default Register