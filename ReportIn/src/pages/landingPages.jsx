import axios from "axios"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import L from "leaflet"
import Button from "../assets/button"
import Input from "../assets/input"
import "leaflet/dist/leaflet.css";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})


function LandingPages() {
    const [form, setForm] = useState({
        tanggalLaporan: '',
        judulLaporan: '',
        deskripsi: '',
        kategoriLaporan: '',
        pilihLokasi: '',
        isiAlamat: ''
    });

    const [userId, setUserId] = useState(null); // State untuk menyimpan ID User
    const [position, setPosition] = useState([-7.4711, 112.7188]);
    const [file, setFile] = useState(null);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [startDate, setStartDate] = useState(null);
    const [fileKey, setFileKey] = useState(Date.now());
    const handleDateChange = (date) => {
        setStartDate(date);

        setForm({
            ...form,
            tanggalLaporan: date.toISOString().split('T')[0]
        });
    };

    function MapEvents({ setPosition, setForm, form }) {
        useMapEvents({
            async click(e) {
                const { lat, lng } = e.latlng;

                // pindahkan marker
                setPosition([lat, lng]);

                try {
                    // ambil alamat dari koordinat
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                    );

                    const data = await response.json();

                    // alamat lengkap
                    const alamatLengkap = data.display_name || "";

                    // simpan ke form
                    setForm({
                        ...form,
                        pilihLokasi: `${lat}, ${lng}`,
                        isiAlamat: alamatLengkap
                    });

                } catch (error) {
                    console.error("Gagal mengambil alamat:", error);

                    setForm({
                        ...form,
                        pilihLokasi: `${lat}, ${lng}`
                    });
                }
            }
        });

        return null;
    }

    // Ambil User ID dari Token saat komponen dimuat
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Pastikan key 'id' sesuai dengan payload di PHP kamu ($payload['id'])
                setUserId(decoded.id);
            } catch (error) {
                console.error("Gagal decode token:", error);
            }
        }
        fetchNum();
    }, [token]);

    const handleSubmit = async () => {
        if (!form.tanggalLaporan || !form.judulLaporan || !form.kategoriLaporan || !form.isiAlamat || !form.deskripsi || !file) {
            return toast.error("Semua kolom harus diisi ya, jangan ada yang kosong!");
        }

        try {
            if (!token) {
                toast.error('Anda harus login terlebih dahulu');
                return navigate('/login');
            }

            const formData = new FormData();
            formData.append('user_id', userId); // KIRIM USER ID KE DATABASE
            formData.append('tanggalLaporan', form.tanggalLaporan);
            formData.append('judulLaporan', form.judulLaporan);
            formData.append('deskripsi', form.deskripsi);
            formData.append('kategoriLaporan', form.kategoriLaporan);
            formData.append('pilihLokasi', form.pilihLokasi);
            formData.append('isiAlamat', form.isiAlamat);
            formData.append('latitude', position[0]);
            formData.append('longitude', position[1]);
            if (file) formData.append('gambarLaporan', file);

            await axios.post('http://localhost/apireportin/api/reports/create.php', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Kritik berhasil dikirim');

            // Reset Form
            setForm({
                tanggalLaporan: '',
                judulLaporan: '',
                deskripsi: '',
                kategoriLaporan: '',
                pilihLokasi: '',
                isiAlamat: ''
            });
            setStartDate(null);
            setFile(null);
            setFileKey(Date.now());
            setPosition([-7.4711, 112.7188]);
            fetchNum();
        } catch (err) {
            toast.error('Ada kesalahan pada saat mengirim kritik');
        }
    };

    const fetchNum = async () => {
        try {
            const res = await axios.get('http://localhost/apireportin/api/reports/read.php')
            const count = Array.isArray(res.data) ? res.data.length : 0
            setTotal(count)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchNum()
    }, [])

    return (
        <div className="landing-page">
            <section className="hero-section">
                <div className="hero-copy">
                    <p className="hero-label">Selamat Datang di ReportIn</p>
                    <h1 className="hero-title">Suara Anda Adalah Awal Dari Perubahan Besar</h1>
                    <p className="hero-subtitle">Tulis laporan, pantau proses, dan bantu menciptakan lingkungan yang lebih baik.</p>
                    <p className="hero-stat-line">Total Laporan: <strong>{total}</strong></p>
                </div>
            </section>

            <section className="form-section">
                <div className="form-card">
                    <div className="form-heading">
                        <h2>Sampaikan Laporan Anda</h2>
                        <p>Lengkapi laporan dengan detail lengkap agar tim kami dapat segera menindaklanjuti.</p>
                    </div>

                    <Input
                        label="Judul Laporan"
                        type="text"
                        placeholder="Ketik judul laporan Anda"
                        value={form.judulLaporan}
                        onChange={(e) => setForm({ ...form, judulLaporan: e.target.value })}
                    />

                    <div className="form-grid">
                        <div className="input-wrapper">
                            <label className="input-label">Tanggal Laporan</label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                dateFormat="dd-MM-yyyy"
                                className="input-field"
                                placeholderText="Pilih Tanggal Kejadian"
                            />
                        </div>

                        <Input
                            label="Deskripsi"
                            type="textarea"
                            placeholder="Jelaskan detail laporan Anda"
                            value={form.deskripsi}
                            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                        />

                        <Input
                            label="Kategori"
                            type="text"
                            placeholder="Pilih kategori laporan"
                            value={form.kategoriLaporan}
                            onChange={(e) => setForm({ ...form, kategoriLaporan: e.target.value })}
                        />

                        <Input
                            label="Alamat Lengkap Kejadian"
                            type="text"
                            placeholder="Tulis manual atau pilih dari peta"
                            value={form.isiAlamat}
                            onChange={(e) => setForm({ ...form, isiAlamat: e.target.value })}
                        />

                        <div className="map-card">
                            <label className="form-label">Pilih Lokasi di Peta</label>
                            <div className="map-wrapper">
                                <MapContainer center={position} zoom={13} className="map-inner">
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={position} icon={icon} />
                                    <MapEvents
                                        setPosition={setPosition}
                                        setForm={setForm}
                                        form={form}
                                    />
                                </MapContainer>
                            </div>
                        </div>

                        <Input
                        key={fileKey}
                            label="Foto Laporan"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />


                    </div>

                    <div className="form-actions">
                        <Button variant="primary" onClick={handleSubmit}>LAPOR SEKARANG</Button>
                    </div>
                </div>
            </section>

            <div className="steps-list-horizontal">

                {/* STEP 1 (Completed) */}
                <div className="step-item-h completed">
                    <div className="step-node">
                        <span className="icon-check">1</span> {/* Pakai icon check */}
                    </div>
                    <div className="step-content-h">
                        <p className="step-label-h">STEP 1</p>
                        <h3 className="step-title-h">Buat Laporan</h3>
                        <span className="badge-h badge-completed-h">Completed</span>
                    </div>
                </div>

                <div className="step-connector"></div> {/* Garis penghubung */}

                {/* STEP 2 (Completed) */}
                <div className="step-item-h active">
                    <div className="step-node node-active">
                        <span className="icon-number">2</span> {/* Pakai Angka */}
                    </div>
                    <div className="step-content-h">
                        <p className="step-label-h">STEP 2</p>
                        <h3 className="step-title-h">Admin merespon</h3>
                        <span className="badge-h badge-progress-h">In Progress</span>
                    </div>
                </div>

                <div className="step-connector"></div> {/* Garis penghubung */}

                {/* STEP 3 (Active) */}
                <div className="step-item-h active">
                    <div className="step-node node-active">
                        <span className="icon-number">3</span> {/* Pakai Angka */}
                    </div>
                    <div className="step-content-h">
                        <p className="step-label-h">STEP 3</p>
                        <h3 className="step-title-h">Menindak Lanjut</h3>
                        <span className="badge-h badge-progress-h">In Progress</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LandingPages