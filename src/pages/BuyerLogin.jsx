import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import Navbar from '../components/Navbar';

const BuyerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                alert('Login successful');
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <h2>Buyer Login</h2>
                <p>Access your buyer account</p>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>
                </form>

                <p>
                    Don't have an account?{' '}
                    <Link to="/buyer/register">Register</Link>
                </p>

                <p>
                    <Link to="/">Back to Home</Link>
                </p>
            </div>
        </div>
    );
};

export default BuyerLogin;
