import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function Dashboard (){

    const [number, setNumber] = useState({
        totalSebulan : 0,
        belumSelesai : 0,
        diproses : 0,
        selesai : 0
    })
    const [tabel, setTabel] = useState([])
    const [grafik, setGrafik] = useState([])

    const token = localStorage.getItem('token')

    useEffect(()=> {
        const fetchDashboard = async () => {
            try {
                const resNum = await axios.get('http://localhost/apireportin/api/admin/dashboard.php', {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                setNumber(resNum.data)

                const resRecent = await axios.get('http://localhost/apireportin/api/reports/read.php', {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                setTabel(resRecent.data)

                const resChart = await axios.get(`http://localhost/apireportin/api/admin/grafik.php`, { headers: {
                    Authorization : `Bearer ${token}`
                } });
                setGrafik(resChart.data);
                
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchDashboard()
    }, [token])
    
    return (
        <div className="dashboard-container dashboard-page">
            <div className="dashboard-page-inner">
                <div className="dashboard-page-header">
                    <div>
                        <p className="dashboard-overline">Ringkasan Kritik</p>
                        <h1 className="dashboard-title">Dashboard</h1>
                    </div>
                </div>

                <div className="dashboard-metrics">
                    <div className="metric-card">
                        <div className="metric-card-title">Total Kritik</div>
                        <div className="metric-card-value">{number.total_kritik}</div>
                        
                    </div>
                    <div className="metric-card">
                        <div className="metric-card-title">Belum selesai</div>
                        <div className="metric-card-value">{number.belum_selesai}</div>
                        
                    </div>
                    <div className="metric-card">
                        <div className="metric-card-title">Diproses</div>
                        <div className="metric-card-value">{number.diproses}</div>
                        
                    </div>
                    <div className="metric-card">
                        <div className="metric-card-title">Selesai</div>
                        <div className="metric-card-value">{number.selesai}</div>
                        
                    </div>
                </div>

                <div className="dashboard-grid">
                    <section className="chart-panel">
                        <div className="panel-heading">
                            <div>
                                <p>Grafik Kritik Mingguan</p>
                                <h2>Tren laporan terbaru</h2>
                            </div>
                            <div className="panel-tabs">
                                <button className="panel-tab active">Mingguan</button>
                                
                            </div>
                        </div>
                        <div className="chart-body">
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={grafik} margin={{ top: 12, right: 0, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                    <XAxis dataKey="hari" tickLine={false} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} allowDecimals={false}/>
                                    <Tooltip separator=": " contentStyle={{ borderRadius: '16px', borderColor: '#d1d5db' }} />
                                    <Bar dataKey="total" fill="#406AAF" radius={[12, 12, 0, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    
                </div>
                <section className="table-panel">
                    <div className="panel-heading">
                        <div>
                            <p>10 Kritik Terbaru</p>
                            <h2>Riwayat kritik</h2>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="data-table dashboard-table">
                            <thead>
                                <tr>
                                    <th className="col-number">No</th>
                                    <th>Nama</th>
                                    <th>Isi Kritik</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabel.slice(0, 10).map((item, index)=> (
                                    <tr key={index}>
                                        <td className="col-number">{index + 1}</td>
                                        <td>{item.username || item.user || '-'}</td>
                                        <td>{item.judulLaporan || item.judulLaporan || '-'}</td>
                                        <td>{item.status || 'belum selesai'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default Dashboard