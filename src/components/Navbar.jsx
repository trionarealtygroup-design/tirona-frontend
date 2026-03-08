import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <header className="navbar">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="brand">
                    <img src="/Images/TRIONA.png" alt="TRIONA LOGO" className="brand-logo" width="80px" />
                    <div className="brand-text">
                        <h1>TRIONA</h1>
                        <span className="brand-sub">Realty Group</span>
                    </div>
                    <div className="brand-tagline">
                        <strong>Triangle of Trust</strong>
                        <span>Buyer • Seller • Advisor</span>
                    </div>
                </div>
            </div>
            <nav className={`nav-links ${isOpen ? 'active' : ''}`} id="navLinks">
                <Link to="/">
                    <i className="fa-solid fa-house"> </i>
                    Home
                </Link>
                <Link to="/properties">
                    <i className="fa-solid fa-building"></i>Properties
                </Link>
                <Link to="/contact">
                    <i className="fa-solid fa-phone"></i>Contact
                </Link>

                {!user ? (
                    <>
                        <div className="nav-dropdown">
                            <span className="nav-dropdown-trigger"><i className="fa-solid fa-right-to-bracket"></i> Login</span>
                            <div className="nav-dropdown-content">
                                <div>
                                    <Link to="/advisor/login">Advisor Login</Link>
                                    <Link to="/seller/login">Seller Login</Link>
                                    <Link to="/buyer/login">Buyer Login</Link>
                                </div>
                            </div>
                        </div>
                        <div className="nav-dropdown">
                            <span className="nav-dropdown-trigger"><i className="fa-solid fa-user-plus"></i> Register</span>
                            <div className="nav-dropdown-content">
                                <div>
                                    <Link to="/advisor/register">Advisor Register</Link>
                                    <Link to="/seller/register">Seller Register</Link>
                                    <Link to="/buyer/register">Buyer Register</Link>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to={user.role === 'admin' ? "/admin/dashboard" : "/advisor/dashboard"}>
                            <i className="fa-solid fa-gauge"></i>Dashboard
                        </Link>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} id="logoutBtn">
                            <i className="fa-solid fa-right-from-bracket"></i>LogOut
                        </a>
                    </>
                )}
            </nav>
            <div className="menu-toggle" id="menuToggle" onClick={() => setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    );
};

export default Navbar;
