import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../assets/button";

function Complaints() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost/apireportin/api/reports/read.php");
      setData(res.data);
    } catch (err) {
      console.log("Gagal ambil data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="kritik-container dashboard-page">
      <div className="dashboard-page-inner kritik-content">
        <div className="dashboard-page-header">
          <div>
            <p className="dashboard-overline">Data Kritik</p>
            <h1 className="dashboard-title">Data Kritik & Laporan Warga</h1>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th className="col-number">No</th>
                <th>Foto</th>
                <th>Nama Pelapor</th>
                <th>Kategori</th>
                <th>Isi Laporan</th>
                <th>Alamat Kejadian</th>
                <th>Vote</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '28px 0' }}>
                    Belum ada laporan masuk
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td className="col-number">{index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost/apireportin/uploads/${item.gambarLaporan}`}
                        alt="laporan"
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    </td>
                    <td>{item.username}</td>
                    <td>{item.kategoriLaporan}</td>
                    <td>{item.judulLaporan}</td>
                    <td>{item.isiAlamat}</td>
                    <td>{item.votes?.count || 0}</td> 
                    <td className="status-column">
                      <div className="status-wrapper">
                        <span className={`status-badge status-${item.status?.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/detail/${item.id}`}>
                          <Button variant="secondary">Detail</Button>
                        </Link>
                        <Link to={`/update-product?id=${item.id}`}>
                          <Button variant="primary">Update</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Complaints;