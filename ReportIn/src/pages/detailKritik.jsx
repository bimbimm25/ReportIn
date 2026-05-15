import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import toast from "react-hot-toast"
import Button from "../assets/button"
import { jwtDecode } from "jwt-decode";

const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

function DetailKritik() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const token = localStorage.getItem('token')

    // 1. Ambil Role cukup dari Token saja (lebih aman)
    const [userRole, setUserRole] = useState(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded.role; // Ambil role langsung saat inisialisasi
            } catch (error) {
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`http://localhost/apireportin/api/reports/read.php?id=${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                // Cek apakah response itu array atau object
                const result = Array.isArray(res.data) ? res.data[0] : res.data;
                setData(result);
                
            } catch (err) {
                toast.error("Gagal memuat detail laporan")
            }
        }
        fetchDetail()
    }, [id, token])

    if (!data) return (
        <div className="detail-container">
            <div className="empty-state">
                <p>Memuat detail...</p>
            </div>
        </div>
    )

    return (
        <div className="kritik-container dashboard-page">
            <div className="dashboard-page-inner kritik-content">
                <div className="dashboard-page-header">
                    {userRole === 'admin' ? (
                        <Button variant="primary" onClick={() => navigate('/data-kritik')}>
                            ← Kembali
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => navigate('/')}>
                            ← Kembali
                        </Button>
                    )}

                </div>

                <div className="detail-grid">
                    <div className="detail-main">
                        <div className="detail-card">
                            <h3>Informasi Laporan</h3>
                            <div className="info-grid">
                                <div className="info-group">
                                    <label>Nama Pelapor</label>
                                    <p>{data.username || '-'}</p>
                                </div>
                                <div className="info-group">
                                    <label>Kategori</label>
                                    <p>{data.kategoriLaporan || '-'}</p>
                                </div>
                                <div className="info-group">
                                    <label>Tanggal Laporan</label>
                                    <p>{data.tanggalLaporan ? new Date(data.tanggalLaporan).toLocaleDateString('id-ID', { dateStyle: 'full' }) : '-'}</p>
                                </div>
                                <div className="info-group">
                                    <label>Alamat Kejadian</label>
                                    <p>{data.isiAlamat || '-'}</p>
                                </div>
                                <div className="info-group">
                                    <label>Status</label>
                                    <p>{data.status || 'Pending'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="detail-card">
                            <h3>Deskripsi Laporan</h3>
                            <p className="description-text">{data.deskripsi}</p>
                        </div>

                        <div className="detail-card">
                            <h3>Respon Admin</h3>
                            <p className="description-text">{data.tanggapan_admin || '-'}</p>
                            <p>{data.tanggal_tanggapan ? new Date(data.tanggal_tanggapan).toLocaleDateString('id-ID') : '-'}</p>
                        </div>

                        <div className="detail-card">
                            <h3>Foto Laporan</h3>
                            <div className="detail-image-section">
                                <img
                                    src={`http://localhost/apireportin/uploads/${data.gambarLaporan}`}
                                    alt="Bukti Laporan"
                                    className="detail-image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="detail-sidebar">
                        <div className="detail-card">
                            <h3>Lokasi</h3>
                            <div className="map-detail-wrapper">
                                {data.latitude && data.longitude ? (
                                    <MapContainer
                                        key={`${data.latitude}-${data.longitude}`}
                                        center={[data.latitude, data.longitude]}
                                        zoom={15}
                                        style={{ height: '200px', width: '100%', borderRadius: '12px', zIndex: '1' }}
                                    >
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <Marker position={[data.latitude, data.longitude]} icon={icon} />
                                    </MapContainer>
                                ) : (
                                    <div className="map-placeholder">
                                        <p>📍 Lokasi peta tidak tersedia</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. Tombol Aksi cuma muncul kalau role-nya 'admin' */}
                        {userRole === 'admin' && (
                            <div className="detail-card">
                                <h3>Aksi</h3>
                                <div className="action-buttons">
                                    <Button variant="primary" onClick={() => navigate(`/update-product?id=${id}`)}>
                                        Update Status
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailKritik;