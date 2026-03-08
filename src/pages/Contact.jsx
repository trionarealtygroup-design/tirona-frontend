import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
    return (
        <>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: '50px auto', padding: '0 20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#0a1d3a' }}>Contact Us</h1>

                <div style={{ background: 'white', padding: '40px', borderRadius: '18px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#111' }}>Get in Touch</h2>
                    <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '30px' }}>
                        We are here to help you with all your real estate needs. Reach out to us for any queries or support.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', color: '#333' }}>
                            <i className="fa-solid fa-phone" style={{ color: '#007bff' }}></i>
                            <span>+91 83193 76372</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', color: '#333' }}>
                            <i className="fa-solid fa-location-dot" style={{ color: '#007bff' }}></i>
                            <span>Bhopal, Madhya Pradesh</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', color: '#333' }}>
                            <i className="fa-solid fa-envelope" style={{ color: '#007bff' }}></i>
                            <span>support@triona.com</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '20px', color: '#111', marginBottom: '15px' }}>Join our whatsapp community</h3>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Scan the QR code below to stay updated with exclusive property deals and community discussions.</p>
                        <div style={{ padding: '15px', background: '#fff', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://qrfy.io/r/okl07Ax8PL" alt="WhatsApp Community QR" style={{ width: '150px', height: '150px', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
