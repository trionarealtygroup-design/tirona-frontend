import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config';
import Navbar from '../../components/Navbar';

const AdvisorRegister = () => {

    const inputStyle = {
        padding: "12px",
        borderRadius: "8px",
        border: "1.5px solid #ccc",
        outline: "none",
        fontSize: "14px",
        fontFamily: "Segoe UI, sans-serif"
    };

    const focusStyle = (e, color) => {
        e.target.style.border = `1.5px solid ${color}`;
    };

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
        basic: { name: 'Basic Plan', price: 'Free Joining', qr: '/Images/TRIONA.png', buyComm: '0.40%', sellComm: '0.20%' },
        premium: { name: 'Premium Plan', price: 'Paid', qr: '/Images/TRIONA.png', buyComm: '0.60%', sellComm: '0.40%' },
        premium_plus: { name: 'Premium Plus', price: 'Paid', qr: '/Images/TRIONA.png', buyComm: '0.80%', sellComm: '0.60%' }
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
            delete submitData.referralStatus;

            const response = await axios.post(`${API_URL}/advisor/register`, submitData);

            setMessage(response.data.message);

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
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg,#4b2cbf,#8f5cff)",
                padding: "40px 20px",
                display: "flex",
                justifyContent: "center"
            }}>

                <div style={{
                    width: "100%",
                    maxWidth: "900px",
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "40px",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.15)"
                }}>

                    <h2 style={{ textAlign: "center" }}>Advisor Registration</h2>

                    <form onSubmit={handleSubmit} style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px"
                    }}>

                        {[ 
                            { name: "fullName", placeholder: "Full Name *" },
                            { name: "email", placeholder: "Email *", type: "email" },
                            { name: "password", placeholder: "Password *", type: "password" },
                            { name: "mobile", placeholder: "Mobile Number *" },
                            { name: "whatsapp", placeholder: "WhatsApp Number" },
                            { name: "city", placeholder: "City *" },
                            { name: "pincode", placeholder: "Pincode" },
                            { name: "address", placeholder: "Address" }
                        ].map((field, i) => (
                            <input
                                key={i}
                                name={field.name}
                                type={field.type || "text"}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required={field.placeholder.includes("*")}
                                style={inputStyle}
                                onFocus={(e) => focusStyle(e, "#6c63ff")}
                                onBlur={(e) => focusStyle(e, "#ccc")}
                            />
                        ))}

                        <select name="gender" value={formData.gender} onChange={handleChange}
                            style={inputStyle}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>

                        <input name="age" type="number" placeholder="Age"
                            value={formData.age} onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => focusStyle(e, "#6c63ff")}
                            onBlur={(e) => focusStyle(e, "#ccc")}
                        />

                        {/* Status */}
<div style={{ gridColumn: "1 / -1" }}>
    <h4>Status</h4>

    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

        <label style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            width: "auto"
        }}>
            <input
                type="radio"
                name="brokerStatus"
                value="existing_broker"
                checked={formData.brokerStatus === 'existing_broker'}
                onChange={handleChange}
            />
            <span style={{ whiteSpace: "nowrap" }}>Existing Broker</span>
        </label>

        <label style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            width: "auto"
        }}>
            <input
                type="radio"
                name="brokerStatus"
                value="fresher"
                checked={formData.brokerStatus === 'fresher'}
                onChange={handleChange}
            />
            <span style={{ whiteSpace: "nowrap" }}>Fresher with TRIONA</span>
        </label>

    </div>
</div>
                        {/* Plan */}
                        <div style={{ gridColumn: "1 / -1" }}>
                            <h4>Select Professional Plan</h4>

                            <select name="professionalPlan"
                                value={formData.professionalPlan}
                                onChange={handleChange}
                                style={inputStyle}>
                                <option value="basic">Basic Plan - Free Joining</option>
                                <option value="premium">Premium - Paid</option>
                                <option value="premium_plus">Premium Plus - Paid</option>
                            </select>

                            <div style={{
                                marginTop: "20px",
                                padding: "25px",
                                borderRadius: "12px",
                                background: "#f7f9ff",
                                textAlign: "center"
                            }}>
                                <h3>{planDetails[formData.professionalPlan].name}</h3>
                                <p style={{ fontWeight: "bold" }}>
                                    {planDetails[formData.professionalPlan].price}
                                </p>
                                <p>
                                    Buy: {planDetails[formData.professionalPlan].buyComm} |
                                    Sell: {planDetails[formData.professionalPlan].sellComm}
                                </p>
                                <img src={planDetails[formData.professionalPlan].qr}
                                    alt="QR" style={{ width: "200px" }} />
                            </div>

                        
                        </div>

                        {/* Referral */}
                        <div style={{ gridColumn: "1 / -1" }}>
    <h4>Referral</h4>

    <div style={{ display: "flex", flexDirection: "column", alignItems:"flex-start", gap: "12px" }}>

        <div style={{ display: "flex", alignItems: "center", gap:"8px", width:"auto" }}>
            <input
                type="radio"
                name="referralStatus"
                value="not_referred"
                checked={formData.referralStatus === 'not_referred'}
                onChange={handleChange}
                style={{ marginRight: "10px" }}
            />
            <span style={{ whiteSpace: "nowrap" }}>Not Referred</span>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
            <input
                type="radio"
                name="referralStatus"
                value="referred"
                checked={formData.referralStatus === 'referred'}
                onChange={handleChange}
                style={{ marginRight: "10px" }}
            />
            <span>Referred</span>
        </div>

    </div>

    {formData.referralStatus === 'referred' && (
        <input
            name="referredByPhone"
            placeholder="Enter Referrer Advisor Phone"
            value={formData.referredByPhone}
            onChange={handleChange}
            style={{ marginTop: "10px", width: "100%" }}
        />
    )}
</div>

                        {/* Button */}
                        <button type="submit" disabled={loading}
                            style={{
                                gridColumn: "1 / -1",
                                padding: "14px",
                                background: "linear-gradient(135deg,#6c63ff,#8f5cff)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                cursor: "pointer"
                            }}>
                            {loading ? "Registering..." : "Register"}
                        </button>

                    </form>

                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                        Already have an account? <Link to="/advisor/login">Login</Link>
                    </p>

                    <p style={{ textAlign: "center" }}>
                        <Link to="/">Back to Home</Link>
                    </p>

                    <p style={{ textAlign: "center" }}>
                        <Link to="/pages/policies/AdvisorAgreement.jsx">Advisor Term & condition</Link>
                    </p>

                </div>
            </div>
        </>
    );
};

export default AdvisorRegister;