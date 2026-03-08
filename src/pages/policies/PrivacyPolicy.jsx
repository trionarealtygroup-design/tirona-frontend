import React from 'react';
import Navbar from '../../components/Navbar';

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#111' }}>Privacy Policy</h1>

                <div style={{ lineHeight: '1.6', color: '#444' }}>
                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>1. Introducton</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>TRINA Realty Group respects your privacy and is committed to protecting your personal infromation.</li>
                        <li>This Privacy Policy explains how we collect, use, and safeguard your information.</li>
                    </ul>


                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>2. Information We collect </h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Personal Infromation: Name, Mobile Number, Email Address, Address, Bank Details.</li>
                        <li>Business Information: Buyer/Seller Lead Details, Property Information.</li>
                        <li>Technical Information: IP Address, browser Type, Device information, Cookies.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>3. How We Use Information</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Process advisor registration.</li>
                        <li>Verify buyer/seller leads.</li>
                        <li>Process Commission payments.</li>
                        <li>Improve website services.</li>
                        <li>Comply with legal obligations.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>4. Sharing of Information</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>We do not sell personal data.</li>
                        <li>Information may be shared for business operattions, legal compilance, or payment processing.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>5. Data Security</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>We implement reasonable safeguards to protect your information.</li>
                        <li>However, no system is completely secure.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>6. Data Retention</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Data is retained as long as the account is active or required for compliance.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>7. Advisor Responsibility</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Advisors must submit genuine information and obtain proper consent before sharing client data.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>8. Cookies Policy</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Our website may use cookies to enhance user experience and analyze traffic.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>9. User Rights</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>You may request access, correction, or deletion of your data by contactin us.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>10. Policy Updates</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>TRIONA reserves the right to update this policy at anytime</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>11. Contact Information</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Email: trionarealtygroup@gmail.com</li>
                        <li>Website: www.triona.in</li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
