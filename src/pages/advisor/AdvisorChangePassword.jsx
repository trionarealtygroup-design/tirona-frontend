import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const AdvisorChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({});
        setMessage('');
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});

        // Validation
        if (!formData.currentPassword) {
            setErrors({ currentPassword: 'Current password is required' });
            return;
        }

        if (!formData.newPassword) {
            setErrors({ newPassword: 'New password is required' });
            return;
        }

        if (!validatePassword(formData.newPassword)) {
            setErrors({
                newPassword: 'Password must be at least 8 characters with uppercase, lowercase, number and special character'
            });
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/advisor/change-password`, {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Password changed successfully!');
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Error changing password');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Change Password</h2>
            {message && <p style={message.includes('success') ? styles.successMessage : styles.errorMessage}>{message}</p>}
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
                    {errors.currentPassword && <p style={styles.error}>{errors.currentPassword}</p>}
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
                    {errors.newPassword && <p style={styles.error}>{errors.newPassword}</p>}
                    <p style={styles.hint}>
                        Must contain: 8+ characters, uppercase, lowercase, number, special character
                    </p>
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
                    {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
                </div>
                <button type="submit" style={styles.button}>Change Password</button>
            </form>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    form: { maxWidth: '500px' },
    formGroup: { marginBottom: '1.5rem' },
    label: { display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' },
    input: { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' },
    button: { padding: '0.75rem 2rem', backgroundColor: '#0b3c91', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
    successMessage: { padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', backgroundColor: '#d1fae5', color: '#065f46' },
    errorMessage: { padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', backgroundColor: '#fee2e2', color: '#991b1b' },
    error: { color: '#dc2626', fontSize: '14px', marginTop: '0.25rem' },
    hint: { fontSize: '12px', color: '#6b7280', marginTop: '0.25rem' }
};

export default AdvisorChangePassword;
