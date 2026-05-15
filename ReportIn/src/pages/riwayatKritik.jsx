import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Button from "../assets/button"

function RiwayatLaporan() {
    const [laporanSaya, setLaporanSaya] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const fetchLaporanUser = async () => {
        try {
            const res = await axios.get('http://localhost/apireportin/api/reports/read.php', {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log("Data laporan:", laporanSaya);
            setLaporanSaya(res.data)
            setLoading(false)
        } catch (err) {
            toast.error("Gagal mengambil riwayat laporan")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLaporanUser()
    }, [])

    if (loading) return (
        <div className="loading-state">
            <div className="spinner"></div>
            <p>memuat...</p>
        </div>
    )

    return (
        <div className="riwayat-container">
            <div className="riwayat-header">
                <h2 className="riwayat-title">Riwayat Laporan Saya</h2>
                <p className="riwayat-subtitle">Pantau terus perkembangan laporan yang sudah kamu kirimkan.</p>
            </div>

            {laporanSaya?.length === 0 ? (
                <div className="empty-state-card">
                    <p>Kamu belum pernah buat laporan nih. Yuk, lapor sekarang!</p>
                </div>
            ) : (
                <div className="card-grid">
                    {laporanSaya?.map((item) => (
                        <div key={item.id} className="laporan-card">
                            <div className="image-container">
                                <img
                                    src={`http://localhost/apireportin/uploads/${item.gambarLaporan}`}
                                    alt="bukti"
                                    className="card-image"
                                />

                            </div>

                            <div className="card-content">
                                <h3 className="card-judul">{item.judulLaporan}</h3>
                                <div className="card-info">
                                    <p className="alamat-text">📍 {item.isiAlamat}</p>
                                    <p className="deskripsi-text">{item.deskripsi}</p>
                                    <span className={`status-badge status-${item.status?.toLowerCase()}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="card-footer">
                                    <small className="tanggal-text">
                                        📅 {new Date(item.tanggalLaporan).toLocaleDateString('id-ID')}
                                    </small>
                                    <Button
                                        variant="primary"
                                        className="btn-detail"
                                        onClick={() => navigate(`/detail/${item.id}`)}
                                    >
                                        Lihat Detail
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RiwayatLaporan