import React from 'react';
import Navbar from '../../components/Navbar';

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#111' }}>About Us</h1>
                <div style={{ lineHeight: '1.6', color: '#444' }}>
                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>Short Introduction</h2>
                    <p>TRIONA Realty Group is a professonal Property Lead Advisor Network designed to help individual earn through real estate Opportunities using their existig connections. Our Goals is to make property buying and selling more organized, tranparent, and accessible. your bring the lead, we handle the deal - and you earn from successful transactions.</p>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>Who We Are</h2>
                    <p>Triona Realty Group is a structred real estate referral network focused on coverting personal and professional networks into earning opportunities. Many people know buyers, sellers, and investors, but do not have the system or time to close property deals. TRIONA bridges that gap with a professional process and support system.</p>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>What We Do </h2>
                    <p>We professionally manage buyer and seller leads, coordinate ngotiations, and ensure a transpaent transaction process. Our advisors earn commission-based income without the stress of property visits, negotations, or deal closures.</p>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Professional lead management</li>
                        <li>Tranparent commission model</li>
                        <li>Negotiation coordination handled by TRIONA</li>
                        <li>performance-based opportunity</li>
                    </ul>
                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>Our Mission</h2>
                    <p>To simplify real estate earning opporunites and make them accissible through a structured, network-driven model built on trust and transparency.</p>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>Our Vision</h2>
                    <p>To build a trusted property advisor network that grows from city-level operations to a scalablenational platfor, empoweringindividuals to create value from their connections. </p>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>Our Core Values</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Transparency</li>
                        <li>Trust</li>
                        <li>Professionalism</li>
                        <li>Long-Term Growth</li>
                        <li>Ethical Dealing</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>Disclaimer</h2>
                    <p>Earnings depend on performance, Genuine lead submissions, and successfull transaction closures. TRIONA Realty Group Follows a transparent and ethical buisness model.</p>

                </div>
            </div>
        </>
    );
};

export default AboutUs;
