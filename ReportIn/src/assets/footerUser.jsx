import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "../styles/footerUser.css";

function FooterUser() {
    return (
        <footer className="landing-footer">
            <div className="footer-container">
                <div className="footer-brand-section">
                    <h2 className="footer-brand-title">ReportIn</h2>
                    <p className="footer-description">
                        Lihat dampak laporanmu secara visual. Dari data menuju aksi nyata bersama ReportIn.
                    </p>
                    <div className="footer-social-icons">
                        <a href="https://www.facebook.com/bimm.218781" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebookF className="social-icon" />
                        </a>
                        
                        <a href="https://www.instagram.com/bimm.zhr?igsh=MTkwcGhjaXVoOTZzdw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram className="social-icon" />
                        </a>
                        <a href="https://wa.me/6285161823587" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <FaWhatsapp className="social-icon" />
                        </a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h3>Links</h3>
                        <ul>
                            <li><Link to='/landing' >Home</Link></li>
                            <li><Link to='/about' >Tentang</Link></li>
                            <li><Link to='/riwayat' >Laporan Saya</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>
                                <a
                                    href="https://wa.me/6282232668881?text=Halo%20saya%20ingin%20bertanya%20tentang%20ReportIn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    +62 822-3266-8881
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=bimaardiansyah2509@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    bimaardiansyah2509@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>© Copyright by ReactNexus. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default FooterUser;