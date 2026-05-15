import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '../assets/button';
import Input from '../assets/input';

const AdminSettings = () => {
  const [admins, setAdmins] = useState([]);
  const [history, setHistory] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const [resAdmin, resHis] = await Promise.all([
        axios.get('http://localhost/apireportin/api/admin/read.php', { headers }),
        axios.get('http://localhost/apireportin/api/logs/read.php', { headers })
      ]);
      setAdmins(resAdmin.data.data || resAdmin.data);
      setHistory(resHis.data.data || resHis.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) return toast.error("Isi semua data admin!");
    setLoading(true);
    try {
      await axios.post('http://localhost/apireportin/api/admin/create.php', newAdmin, { headers });
      setNewAdmin({ name: '', email: '', password: '' });
      toast.success("Admin berhasil ditambah");
      fetchData();
    } catch (err) {
      toast.error("Gagal menambah admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setting-container dashboard-page">
      <div className="dashboard-page-inner setting-content">
        <div className="dashboard-page-header">
          <div>
            <p className="dashboard-overline">Pengaturan Kritik</p>
            <h1 className="dashboard-title">Pengaturan Admin</h1>
          </div>
        </div>

        {/* ========== KELOLA ADMIN ========== */}
        <div className="settings-section">
          <h2 className="section-title">Tambah Admin Baru</h2>
          <div className="admin-form-card">
            <div className="form-grid">
              <div className="form-group">
                <Input 
                  label="Nama Admin"
                  placeholder="Masukkan nama lengkap" 
                  value={newAdmin.name} 
                  onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <Input 
                  label="Email"
                  type="email"
                  placeholder="Masukkan email" 
                  value={newAdmin.email} 
                  onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <Input 
                  label="Password"
                  type="password" 
                  placeholder="Masukkan password" 
                  value={newAdmin.password} 
                  onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} 
                />
              </div>
            </div>
            <div className="form-actions-single">
              <Button variant="secondary" onClick={handleAddAdmin} disabled={loading}>
                {loading ? "Menambah..." : "Tambah Admin"}
              </Button>
            </div>
          </div>

          <h2 className="section-title" style={{ marginTop: '40px' }}>Daftar Admin</h2>
          <div className="table-responsive">
            {admins.length === 0 ? (
              <div className="empty-state">
                <p>Belum ada admin</p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Admin</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, idx) => (
                    <tr key={admin._id || idx}>
                      <td className="col-number">{idx + 1}</td>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>
                        <span className="status-badge status-active">Aktif</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* ========== LOG AKTIVITAS ========== */}
        <div className="settings-section">
          <h2 className="section-title">Log Aktivitas Admin</h2>
          <p className="subsection-subtitle">Riwayat jawaban kritik dari admin</p>
          
          <div className="table-responsive">
            {history.length === 0 ? (
              <div className="empty-state">
                <p>Belum ada aktivitas</p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Admin</th>
                    <th>Aktivitas</th>
                    <th>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((log, idx) => (
                    <tr key={idx}>
                      <td className="col-number">{idx + 1}</td>
                      <td>{log.adminName || 'Admin'}</td>
                      <td>{log.pesan || log.message || 'Tidak ada pesan'}</td>
                      <td className="log-date">
                        {log.tanggal ? new Date(log.tanggal).toLocaleString('id-ID') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;