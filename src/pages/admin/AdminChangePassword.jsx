import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config';

const AdminChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        try {
            await axios.post(`${API_URL}/admin/change-password`, {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Password change request processed. In production, this would update the admin password.');
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to change password');
        }
    };

    return (
        <div style={styles.container}>
            <h1>Change Admin Password</h1>
            <div style={styles.card}>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        <small style={styles.helpText}>
                            Must be at least 8 characters with uppercase, lowercase, number, and special character
                        </small>
                    </div>
                    <div style={styles.formGroup}>
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.submitBtn}>Change Password</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px'
    },
    card: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    form: {
        marginTop: '20px'
    },
    formGroup: {
        marginBottom: '20px'
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    helpText: {
        display: 'block',
        marginTop: '5px',
        color: '#666',
        fontSize: '12px'
    },
    submitBtn: {
        padding: '12px 30px',
        backgroundColor: '#0b3c91',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500'
    },
    error: {
        color: '#ef4444',
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#fee2e2',
        borderRadius: '5px'
    }
};

export default AdminChangePassword;
