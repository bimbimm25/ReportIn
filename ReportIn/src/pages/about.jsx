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
                    <h2 className="about-main-title">ReportIn hadir untuk memastikan suara <br></br>Anda tidak sekadar terdengar tetapi membawa dampak.</h2>
                    <p className="about-intro-desc">
                        Di era digital yang serba cepat ini, transparansi dan komunikasi dua arah adalah pondasi utama dari lingkungan yang sehat dan maju. ReportIn lahir dari sebuah visi sederhana namun ambisius memberikan setiap individu kekuatan untuk didengar.
                        Kami memahami bahwa banyak aspirasi, keluhan, dan kritik konstruktif sering kali terhenti di tengah jalan karena prosedur yang rumit atau saluran komunikasi yang tidak jelas.
                        ReportIn hadir sebagai solusi teknologi yang memangkas jarak tersebut, menjadi jembatan digital antara masyarakat dan pihak pengelola untuk menciptakan ekosistem yang lebih responsif dan akuntabel.
                    </p>
                </div>

                <div className="about-mission-vision">
                    <div className="about-mv-box">
                        <h3 className="about-sub-title">Visi</h3>
                        <p>
                            Menjadi platform digital terdepan yang menghubungkan kepedulian masyarakat
                            dengan perbaikan lingkungan, demi terciptanya infrastruktur publik yang
                            lebih layak dan merata bagi semua orang.
                        </p>
                    </div>
                    <div className="about-mv-box">
                        <h3 className="about-sub-title">Misi</h3>
                        <p>
                            Memberdayakan masyarakat melalui teknologi pelaporan yang mudah dan transparan,
                            sekaligus menyediakan data yang akurat bagi pihak terkait agar setiap
                            permasalahan fasilitas umum dapat ditindaklanjuti secara cepat dan tepat sasaran.
                        </p>
                    </div>
                </div>

                <div className="about-intro-image">
                    <img src="https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=1255&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image data" />
                </div>
            </section>

            <section className="about-second-section about-container">
                <div className="about-second-header">
                    <h2 className="about-second-title">Mengapa ReportIn Penting?</h2>
                    <p className="about-second-desc">
                        Seringkali, sebuah masalah kecil menjadi besar hanya karena terlambat dilaporkan atau diabaikan. ReportIn mencegah hal tersebut dengan mempercepat arus informasi. Dengan keterlibatan aktif dari pengguna, kami membantu menciptakan lingkungan yang lebih bersih, lebih aman, dan lebih tertata. Setiap "klik" pada tombol kirim di aplikasi kami adalah satu kontribusi nyata bagi kemajuan bersama.
                    </p>
                </div>
            </section>
            {/* SERVICES SECTION */}
            <section className="about-services-section">
                <div className="about-container">
                    <h2 className="about-text-center about-text-white">Fitur-fitur utama ReportIn</h2>
                    <div className="about-services-grid">
                        <div className="about-service-card">
                            <span className="about-icon">1</span>
                            <h3>PRIVATE IDENTITY</h3>
                            <p>Fitur pelaporan anonim ini menjamin kerahasiaan identitas pelapor, sehingga data diri Anda tidak akan dapat diakses oleh pihak yang dilaporkan ataupun masyarakat umum</p>
                        </div>
                        <div className="about-service-card">
                            <span className="about-icon">2</span>
                            <h3>FOKUS DALAM PENGALAMAN PENGGUNA</h3>
                            <p>platform ini berjalan mulus di semua perangkat, memberikan Anda efisiensi waktu tanpa kompromi.</p>
                        </div>
                        <div className="about-service-card">
                            <span className="about-icon">3</span>
                            <h3>PANTAU LAPORAN DALAM SATU KLIK</h3>
                            <p>Lihat progres dan riwayat pelaporan Anda dengan cepat. Kami menjamin transparansi penuh di setiap langkah, memastikan suara Anda tidak hanya didengar, tetapi juga ditindaklanjuti</p>
                        </div>
                        <div className="about-service-card">
                            <span className="about-icon">4</span>
                            <h3>CHATBOT AI (NOVA) </h3>
                            <p>asisten AI interaktif di ReportIn yang siap menjawab pertanyaan seputar fitur aplikasi dan memandu pengguna dalam pelaporan. Melalui percakapan, NOVA membantu menjelaskan cara pakai serta mengumpulkan detail kejadian hingga menjadi laporan lengkap bagi admin</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="cta-action-section">
    <div class="cta-wrapper">
        <div class="cta-content">
            <h2 class="cta-headline">Mari Menjadi Bagian dari <span class="highlight">Solusi</span></h2>
            <p class="cta-description">
                Kami percaya bahwa perubahan besar selalu dimulai dari keberanian untuk berbicara. <br></br>
                <strong>ReportIn</strong> bukan sekadar alat pelaporan, ini adalah perwujudan dari kepedulian Anda terhadap lingkungan sekitar. 
                Bersama-sama, kita bisa mengubah keluhan menjadi tindakan, dan tindakan menjadi perubahan yang permanen.
            </p>
            <div class="cta-signature">
                <p class="tagline">ReportIn – <span>Suaramu, Kendali di Tanganmu.</span></p>
            </div>
            <a href="/landing" class="cta-btn">Mulai Melapor Sekarang</a>
        </div>
    </div>
</section>
        </div>
    );
};

export default About;