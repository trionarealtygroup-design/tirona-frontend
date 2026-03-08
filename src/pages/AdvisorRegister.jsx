import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

const AdvisorRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        whatsapp: '',
        city: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/advisor/register`, formData);
            if (response.status === 201) {
                alert("Advisor registered successfully");
                navigate('/advisor/login');
            }
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response) {
                alert(error.response.data?.message || "Registration failed");
            } else if (error.request) {
                alert('Unable to connect to server. Please check if backend is running.');
            } else {
                alert('Registration failed: ' + error.message);
            }
        }
    };

    return (
        <div className="register-box">
            <h2>Advisor Registration</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                        type="tel"
                        name="mobile"
                        placeholder="Enter mobile number"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>WhatsApp Number</label>
                    <input
                        type="tel"
                        name="whatsapp"
                        placeholder="Enter WhatsApp number"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="register-btn">Register as Advisor</button>
            </form>

            <div className="login-link">
                Already registered?
                <Link to="/advisor/login">Login here</Link>
            </div>
        </div>
    );
};

export default AdvisorRegister;
