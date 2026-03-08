import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import Navbar from '../components/Navbar';

const BuyerRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        whatsapp: '',
        city: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`${API_URL}/auth/register/buyer`, formData);
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <h2>Buyer Registration</h2>
                <p>Create your buyer account</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
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
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>

                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <p>
                    Already have an account? <Link to="/buyer/login">Login</Link>
                </p>
                <p>
                    <Link to="/">Back to Home</Link>
                </p>
            </div>
        </div>
    );
};

export default BuyerRegister;
