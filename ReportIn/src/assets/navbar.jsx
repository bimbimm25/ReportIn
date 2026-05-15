import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiBox, BiGridAlt, BiDetail, BiCog, BiLogOut, BiFile} from "react-icons/bi";
import "../styles/navbar.css"

function NavbarAdmin() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        setMenuOpen(false)
        navigate('/login')
        window.location.reload()
    }

    return (
        <>
            <button
                className={`hamburger-menu ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle menu"
            >
                <span className={`hamburger-line ${menuOpen ? 'active' : ''}`} />
                <span className={`hamburger-line ${menuOpen ? 'active' : ''}`} />
                <span className={`hamburger-line ${menuOpen ? 'active' : ''}`} />
            </button>

            <div
                className={`sidebar-overlay ${menuOpen ? 'visible' : ''}`}
                onClick={() => setMenuOpen(false)}
            />

            <aside className={`navbar-sidebar ${menuOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <div className="navbar-user-logo">L</div>
                        <div>
                            <h2 className="sidebar-title">Admin Panel</h2>
                            <p className="sidebar-subtitle">dashboard kritik</p>
                        </div>
                    </div>
                    <button className="close-btn" onClick={() => setMenuOpen(false)}>
                        ×
                    </button>
                </div>

                <div className="nav-links">
                    <Link to="/admin/dashboard" className="nav-item" onClick={() => setMenuOpen(false)}>
                        <BiGridAlt className="nav-item-icon" />
                        Dashboard
                    </Link>
                    <Link to="/data-kritik" className="nav-item" onClick={() => setMenuOpen(false)}>
                        <BiFile className="nav-item-icon" />
                        Data Kritik
                    </Link>
                    <Link to="/setting" className="nav-item" onClick={() => setMenuOpen(false)}>
                        <BiCog className="nav-item-icon" />
                        Setting
                    </Link>
                </div>

                <button className="nav-item logout-btn" onClick={handleLogout}>
                    <BiLogOut className="nav-item-icon" />
                    Logout
                </button>
            </aside>
        </>
    )
}

export default NavbarAdmin;