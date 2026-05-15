import React from "react";
import "../App.css"; // Mundur satu folder ke folder 'src=

const About = () => {
    return (
        <div className="about-wrapper">
            {/* HERO SECTION */}
            <header className="about-hero-section">
                <div className="about-hero-overlay">
                    <h1 className="about-hero-title">About Us</h1>
                </div>
            </header>

            {/* INTRO SECTION */}
            <section className="about-intro-section about-container">
                <div className="about-intro-header">
                    <h2 className="about-main-title">ReportIn hadir untuk memastikan suara Anda tidak sekadar terdengar tetapi membawa dampak.</h2>
                    <p className="about-intro-desc">
                        Jangan biarkan masalah berlalu tanpa solusi. Sebagai platform pelaporan yang aman dan transparan, kami menghubungkan keberanian Anda dengan pihak yang tepat untuk memastikan setiap tindakan perbaikan segera diwujudkan.
                    </p>
                </div>

                <div className="about-mission-vision">
                    <div className="about-mv-box">
                        <h3 className="about-sub-title">Vision</h3>
                        <p>Mewujudkan ekosistem masyarakat dan institusi yang transparan, aman, dan berintegritas melalui kekuatan suara setiap individu.</p>
                    </div>
                    <div className="about-mv-box">
                        <h3 className="about-sub-title">Mission</h3>
                        <p>Menjadi perusahaan properti terdepan yang dikenal karena integritas dan kepuasan pelanggan di seluruh Indonesia.</p>
                    </div>
                </div>

                <div className="about-intro-image">
                    <img src="https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=1255&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image data" />
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="about-services-section">
                <div className="about-container">
                    <h2 className="about-text-center about-text-white">Fitur-fitur utama ReportIn</h2>
                    <div className="about-services-grid">
                        <div className="about-service-card">
                            <span className="about-icon">1</span>
                            <h3>private identity</h3>
                            <p>Fitur pelaporan anonim ini menjamin kerahasiaan identitas pelapor, sehingga data diri Anda tidak akan dapat diakses oleh pihak yang dilaporkan ataupun masyarakat umum..</p>
                        </div>
                        <div className="about-service-card">
                            <span className="about-icon">2</span>
                            <h3>Fokus pada Pengalaman Pengguna</h3>
                            <p>platform ini berjalan mulus di semua perangkat, memberikan Anda efisiensi waktu tanpa kompromi.</p>
                        </div>
                        <div className="about-service-card">
                            <span className="about-icon">3</span>
                            <h3>Pantau Laporan dalam Satu Klik.</h3>
                            <p>Lihat progres dan riwayat pelaporan Anda dengan cepat. Kami menjamin transparansi penuh di setiap langkah, memastikan suara Anda tidak hanya didengar, tetapi juga ditindaklanjuti.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;