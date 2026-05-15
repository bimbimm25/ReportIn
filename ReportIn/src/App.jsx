import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarAdmin from './assets/navbar';
import NavbarUser from './assets/navbarUser';
import Dashboard from './pages/dashboard';
import DataKritik from './pages/dataKritik';
import Setting from './pages/setting';
import UpdateProduct from './pages/updateProduct';
import Login from './pages/login';
import Register from './pages/register';
import LandingPages from './pages/landingPages';
import RiwayatKritik from './pages/riwayatKritik';
import DetailKritik from './pages/detailKritik';
import FooterAdmin from './assets/footerAdmin';
import FooterUser from './assets/footerUser';
import About from './pages/about';
import ScrollToTop from './assets/scrollTop';
import ChatWidget from './pages/chatWidget'; // Sesuaikan path-nya
import './App.css';

function App() {
  const role = localStorage.getItem('role');
  console.log("DEBUG ROLE:", role);
  console.log("TIPE DATA:", typeof role);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman utama dengan chatbot */}
        <Route path="/" element={
          <>
            <NavbarUser />
            <LandingPages />
            <ChatWidget />
            <FooterUser />
          </>
        } />

        <Route path="/riwayat" element={
          <>
            <NavbarUser />
            <RiwayatKritik />
            <FooterUser />
          </>
        } />

        <Route path="/admin/dashboard" element={
          <>
            <NavbarAdmin />
            <Dashboard />
            <FooterAdmin />
          </>
        } />

        <Route path="/about" element={
          <>
            <NavbarUser />
            <About />
            <FooterUser />
          </>
        } />

        <Route path="/data-kritik" element={
          <>
            <NavbarAdmin />
            <DataKritik />
            <FooterAdmin />
          </>
        } />

        <Route path="/setting" element={
          <>
            <NavbarAdmin />
            <Setting />
            <FooterAdmin />
          </>
        } />

        <Route path="/update-product" element={
          <>
            <NavbarAdmin />
            <UpdateProduct />
            <FooterAdmin />
          </>
        } />

        <Route path="/detail/:id" element={
          <>
            {role === 'admin' ? <NavbarAdmin /> : <NavbarUser />}
            <DetailKritik />
            {role === 'admin' ? <FooterAdmin /> : <FooterUser />}
          </>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;