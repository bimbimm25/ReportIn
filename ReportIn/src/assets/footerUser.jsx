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
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF className="social-icon" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter className="social-icon" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
                                <li><Link to='/' />Home</li>
                                <li><Link to='/about' />tentang</li>
                                <li><Link to='/riwayat' />Riwayat Laporan</li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3>Contact Us</h3>
                            <ul>
                                <li>+62 812-3456-7890</li>
                                <li><a href="mailto:ajiarsya16@gmail.com" className="footer-link">ajiarsya16@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>© Copyright by ReportIn. All rights reserved.</p>
                    </div>
                </div>
            </footer>
    )
}
export default FooterUser;