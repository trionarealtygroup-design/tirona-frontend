import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const loadFeatured = async () => {
            try {
                const response = await axios.get(`${API_URL}/property`);
                setFeatured(response.data.slice(0, 3));
            } catch (error) {
                console.error("Failed to load featured properties");
            }
        };
        loadFeatured();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/advisor/login`, {
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                alert('Login successful');
                navigate('/advisor/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                alert(error.response.data?.message || 'Login failed');
            } else {
                alert('Login failed: ' + error.message);
            }
        }
    };

    // Handle Quick Service active state
    const handleServiceClick = (e) => {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
    };

    return (
        <div>
            <Navbar />

            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <div className="hero-left">
                        {/* <section className="search-bar hero-search">
                            <input type="text" placeholder="Entry city or location" />
                            <button>search</button>
                        </section> */}
                        <h2>Why TRIONA?</h2>
                        <ul>
                            <li>Verified properties only</li>
                            <li>Transparent advisor commission</li>
                            <li>Smart investment opportunities</li>
                            <li>Trusted Indian real estate platform</li>
                        </ul>
                        <Link to="/properties" className="hero-btn">Explore Properties</Link>
                    </div>
                    <div className="hero-right">
                        <div className="login-card">
                            <h3>Login to Your Account</h3>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={handleLogin}>Login</button>
                            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                <Link to="/advisor/register" style={{ color: '#0b3c91', textDecoration: 'none', fontSize: '14px' }}>
                                    Register as Advisor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Services */}
            <section className="quick-services">
                <div className="service-card" onClick={handleServiceClick}>
                    <img src="/Images/buying-a-home.jpg" alt="Buy a Home" />
                    <h4>Buy a House</h4>
                    <Link to="/properties">Explore</Link>
                </div>

                <div className="service-card" onClick={handleServiceClick}>
                    <img src="/Images/rent a home.jpg" alt="Buy a Flat" />
                    <h4>Buy a Flat</h4>
                    <Link to="/properties">Explore</Link>
                </div>

                <div className="service-card" onClick={handleServiceClick}>
                    <img src="/Images/buy sell property.jpg" alt="Property" />
                    <h4> Property</h4>
                    <Link to="/properties">Post Property</Link>
                </div>

                <div className="service-card" onClick={handleServiceClick}>
                    <img src="/Images/plots.jpg" alt="Plots" />
                    <h4>Plots & Land</h4>
                    <Link to="/properties">Explore</Link>
                </div>

                <div className="service-card" onClick={handleServiceClick}>
                    <img src="/Images/Farm House.jpg" alt="Farm House" />
                    <h4>Buy a Farm House</h4>
                    <Link to="/properties">Explore</Link>
                </div>

                <div className="service-card" onClick={handleServiceClick}>
                    <img src="/Images/Agriculture Land.jpg" alt="Agricultur Land" />
                    <h4>Buy Agricultural Land</h4>
                    <Link to="/properties">Explore</Link>
                </div>

                <div className="service-card" onClick={handleServiceClick}>
                    <img src="/Images/Commercial property.jpg" alt="Commercial Property" />
                    <h4>Buy Commercial Property</h4>
                    <Link to="/properties">Explore</Link>
                </div>

                <div className="service-card" onClick={handleServiceClick}>
                    <img src="/Images/Buy Shop.jpg" alt="Shop" />
                    <h4>Buy a Shop</h4>
                    <Link to="/properties">Explore</Link>
                </div>
            </section>

            {/* Properties */}
            <section className="home-properties">
                <h2>Featured Properties</h2>
                <div className="property-grid">
                    {featured.map(p => (
                        <div key={p._id} className="property-card">
                            <img
                                src={p.images?.[0] || 'https://placehold.co/600x400?text=Triona+Property'}
                                alt={p.title}
                            />
                            <div className="property-info">
                                <h3>{p.title}</h3>
                                <p>{p.location}</p>
                                <span>₹ {p.price.toLocaleString()}</span>
                                <Link to={`/properties/${p._id}`}>Explore Property</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Become a part of TRIONA - above footer */}
            <section className="become-triona-section">
                <h2 className="become-triona-heading">Become a part of TRIONA</h2>
                <br></br>
                <div className="become-triona-cards">
                    <div className="hero-card">
                        <h3>Become a Seller</h3>
                        <p>List your property and reach genuine buyers.</p>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKu8OaVo_Nj1eFulzP1XJEt6CzjuhcK7w4dvvzB-U1WNubyw/viewform?usp=header">
                            Post Property →
                        </a>
                    </div>
                    <div className="hero-card">
                        <h3>Become a Buyer</h3>
                        <p>Find verified properties with expert guidance.</p>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfTvg6XQTaNb8rMW00rNY9w7jBE92jn87_7vycMNx0sTnNzNA/viewform?usp=publish-editor">
                            Get Started →
                        </a>
                    </div>
                    <div className="hero-card">
                        <h3>Become an Advisor</h3>
                        <p>Grow your real estate career with TRIONA.</p>
                        <Link to="/advisor/register">
                            Join Now →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <h2>Why Choose Us?</h2>
                <div className="features-box">
                    <h3>Secure and verified deals.</h3>
                    <p>Evry listing is verfie to ensure safe transactions.</p>
                </div>
                <div className="features-box">
                    <h3>Experienced Advisors.</h3>
                    <p>Experts guide you throughout the buying and sellig process.</p>
                </div>
                <div className="features-box">
                    <h3>Easy listing for sellers.</h3>
                    <p>Sell your property with inimal effort and maximum visibility.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    {/* Brand */}
                    <div className="footer-box">
                        <h2>TRIONA</h2>
                        <p>
                            TRIONA Realty Group is a trusted property marketplace
                            connecting buyers, sellers and advisors with transparency.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-box">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/properties">Properties</Link></li>
                            <li><Link to="/advisor/login">Advisors</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/about-us">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="footer-box">
                        <h3>Policies</h3>
                        <ul>
                            <li><Link to="/advisor-agreement">Advisor Agreement</Link></li>
                            <li><Link to="/terms-conditions">Full Term & Conditions</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/refund-policy">Refund & Cancellation Policy</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-box">
                        <h3>Services</h3>
                        <ul>
                            <li>Buy Property</li>
                            <li>Sell Property</li>
                            <li>Advisor Support</li>
                            <li>Verified Listings</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-box">
                        <h3>Contact</h3>
                        <p>📞 +91 9755365517 </p>
                        <p>📍 Bhopal, Madhya Pradesh</p>
                        <p>✉️ trionarealtygroup@gmail.com</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 TRIONA Realty Group. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
