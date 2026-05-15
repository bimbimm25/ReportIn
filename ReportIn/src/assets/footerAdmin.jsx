import React from 'react';
import { FaGlobe, FaEnvelope, FaHeart } from "react-icons/fa";
import '../styles/footerAdmin.css';

const FooterAdmin = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="admin-footer-enhanced">
            <div className="footer-enhanced-container">
                {/* Bagian Kiri - Brand & Copyright */}
                <div className="footer-brand-section">
                    <p className="footer-copyright">
                        © {currentYear} Management System. All rights reserved.
                    </p>
                </div>  
            </div>
        </footer>
    );
};

export default FooterAdmin;