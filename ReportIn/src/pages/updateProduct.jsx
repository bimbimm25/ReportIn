import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Button from "../assets/button";
import toast from "react-hot-toast";

function UpdateProduct() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const [response, setResponse] = useState("");
  // SESUAIKAN: Default status ganti ke "belum selesai" agar sinkron dengan ENUM DB
  const [status, setStatus] = useState("belum selesai");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    // Pastikan ID ada di URL, jika tidak ada jangan kirim request
    if (!id) {
      toast.error("ID Laporan tidak ditemukan di URL");
      return;
    }

    if (!response.trim()) {
      toast.error("Balasan tidak boleh kosong");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `http://localhost/apireportin/api/admin/respond.php`,
        {
          id_laporan: id,
          tanggapan: response, 
          status: status
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success("Berhasil membalas dan update status");
      navigate('/detail/' + id);
    } catch (err) {
      console.log(err);
      toast.error("Gagal mengupdate status");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="update-container">
      <div className="update-content">
        <div className="update-header">
          <h1 className="update-title">Update Status Laporan</h1>
        </div>

        <div className="update-form">
          <div className="form-group">
            <label className="form-label">Status Baru</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {/* SESUAIKAN: Value harus sama persis dengan ENUM di Database */}
              <option value="belum selesai">Belum Selesai</option>
              <option value="diproses">Diproses</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Balasan/Tanggapan</label>
            <textarea
              className="form-textarea"
              placeholder="Tulis balasan atau catatan perkembangan..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={6}
            />
          </div>

          <div className="form-actions">
            <Button variant="danger" onClick={handleBack} disabled={loading}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;