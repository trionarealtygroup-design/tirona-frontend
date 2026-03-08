import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

const AdvisorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

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
            } else if (error.request) {
                alert('Unable to connect to server. Please check if backend is running.');
            } else {
                alert('Login failed: ' + error.message);
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Advisor Login</h2>
            <p>Access your advisor dashboard</p>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Advisor Email"
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
                <Link to="/advisor/register">Register</Link>
            </p>

            <p>
                <Link to="/">Back to Home</Link>
            </p>
        </div>
    );
};

export default AdvisorLogin;
