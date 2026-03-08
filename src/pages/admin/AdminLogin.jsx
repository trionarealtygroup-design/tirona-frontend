import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Real login using backend API
            const response = await axios.post(`${API_URL}/auth/login`, {
                email: credentials.email,
                password: credentials.password
            });

            const { token, user } = response.data;

            // Ensure the user is actually an admin
            if (user.role !== 'admin') {
                setError('Unauthorized access');
                return;
            }

            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminUser', JSON.stringify(user));
            navigate('/admin/dashboard');
        } catch (err) {
            console.error("Login failed", err);
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Admin Login</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Admin Email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' },
    card: { padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' },
    title: { textAlign: 'center', marginBottom: '1.5rem', color: '#1f2937' },
    input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #d1d5db' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    error: { color: 'red', marginBottom: '1rem', textAlign: 'center' }
};

export default AdminLogin;
