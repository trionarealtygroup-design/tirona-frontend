import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config';
import Navbar from '../../components/Navbar';

const AdvisorRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        mobile: '',
        whatsapp: '',
        city: '',
        pincode: '',
        address: '',
        gender: '',
        age: '',
        brokerStatus: 'fresher',
        professionalPlan: 'basic',
        referralStatus: 'not_referred',
        referredByPhone: ''
    });

    const planDetails = {
        basic: { name: 'Basic Plan', price: '₹1999', qr: '/Images/qr.png', buyComm: '0.40%', sellComm: '0.20%' },
        premium: { name: 'Premium Plan', price: '₹2999', qr: '/Images/qr.png', buyComm: '0.60%', sellComm: '0.40%' },
        premium_plus: { name: 'Premium Plus', price: '₹3999', qr: '/Images/qr.png', buyComm: '0.80%', sellComm: '0.60%' }
    };
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const submitData = { ...formData };
            // Remove frontend-only field before sending
            delete submitData.referralStatus;
            const response = await axios.post(`${API_URL}/advisor/register`, submitData);
            setMessage(response.data.message);
            // Clear form on success
            setFormData({
                fullName: '',
                email: '',
                password: '',
                mobile: '',
                whatsapp: '',
                city: '',
                pincode: '',
                address: '',
                gender: '',
                age: '',
                brokerStatus: 'fresher',
                professionalPlan: 'basic',
                referralStatus: 'not_referred',
                referredByPhone: ''
            });
        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <h2>Advisor Registration</h2>
                <p>Join TRIONA as an Advisor</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password *"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number *"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="whatsapp"
                        placeholder="WhatsApp Number"
                        value={formData.whatsapp}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        min="18"
                        max="100"
                    />

                    <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Status:</label>
                        <label style={{ marginRight: '20px', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="brokerStatus"
                                value="existing_broker"
                                checked={formData.brokerStatus === 'existing_broker'}
                                onChange={handleChange}
                                style={{ width: 'auto', marginRight: '5px' }}
                            />
                            Existing Broker
                        </label>
                        <label style={{ cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="brokerStatus"
                                value="fresher"
                                checked={formData.brokerStatus === 'fresher'}
                                onChange={handleChange}
                                style={{ width: 'auto', marginRight: '5px' }}
                            />
                            Fresher with TRIONA
                        </label>
                    </div>

                    {/* === Professional Plan Section (NEW) === */}
                    <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Select Professional Plan:</label>
                        <select
                            name="professionalPlan"
                            value={formData.professionalPlan}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' }}
                        >
                            <option value="basic">Basic Plan - ₹1999 | Buy Comm: 0.40% | Sell Comm: 0.20%</option>
                            <option value="premium">Premium - ₹2999 | Buy Comm: 0.60% | Sell Comm: 0.40%</option>
                            <option value="premium_plus">Premium Plus - ₹3999 | Buy Comm: 0.80% | Sell Comm: 0.60%</option>
                        </select>

                        {/* QR Code Display */}
                        <div style={{ textAlign: 'center', marginTop: '20px', padding: '25px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0' }}>
                            <h3 style={{ fontSize: '18px', color: '#0b3c91', marginBottom: '15px', fontWeight: 'bold' }}>Complete payment for Verification</h3>

                            <div style={{ backgroundColor: '#f0f5ff', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                                <p style={{ fontWeight: '600', color: '#2c3e50', fontSize: '16px', marginBottom: '4px' }}>
                                    Selected Plan: {planDetails[formData.professionalPlan].name}
                                </p>
                                <p style={{ color: '#0b3c91', fontWeight: 'bold', fontSize: '18px' }}>
                                    Amount: {planDetails[formData.professionalPlan].price}
                                </p>
                            </div>

                            <p style={{ fontSize: '13px', color: '#444', marginBottom: '15px' }}>
                                Buying Comm: <span style={{ fontWeight: 'bold' }}>{planDetails[formData.professionalPlan].buyComm}</span> | Selling Comm: <span style={{ fontWeight: 'bold' }}>{planDetails[formData.professionalPlan].sellComm}</span>
                            </p>

                            <div style={{ padding: '10px', background: '#fff', display: 'inline-block', borderRadius: '10px', border: '1px solid #eee', marginBottom: '10px' }}>
                                <img
                                    src={planDetails[formData.professionalPlan].qr}
                                    alt={`QR Code for ${planDetails[formData.professionalPlan].name}`}
                                    style={{ maxWidth: '200px', height: 'auto', display: 'block' }}
                                />
                            </div>

                            <p style={{ fontSize: '13px', color: '#e74c3c', marginTop: '15px', fontWeight: '600' }}>Note: Profile will be verified by admin after payment.</p>
                        </div>
                    </div>

                    {/* === Referral Section (NEW) === */}
                    <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Referral:</label>
                        <label style={{ marginRight: '20px', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="referralStatus"
                                value="not_referred"
                                checked={formData.referralStatus === 'not_referred'}
                                onChange={handleChange}
                                style={{ width: 'auto', marginRight: '5px' }}
                            />
                            Not Referred
                        </label>
                        <label style={{ cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="referralStatus"
                                value="referred"
                                checked={formData.referralStatus === 'referred'}
                                onChange={handleChange}
                                style={{ width: 'auto', marginRight: '5px' }}
                            />
                            Referred
                        </label>

                        {formData.referralStatus === 'referred' && (
                            <input
                                type="text"
                                name="referredByPhone"
                                placeholder="Enter Referrer Advisor Phone Number"
                                value={formData.referredByPhone}
                                onChange={handleChange}
                                style={{ marginTop: '10px' }}
                            />
                        )}
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                {message && <p style={{ color: 'green', marginTop: '15px' }}>{message}</p>}
                {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

                <p>
                    Already have an account? <Link to="/advisor/login">Login</Link>
                </p>
                <p>
                    <Link to="/">Back to Home</Link>
                </p>
            </div>
        </div>
    );
};

export default AdvisorRegister;
