import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const AdvisorPersonalDetails = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        whatsapp: '',
        city: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/advisor/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFormData({
                fullName: response.data.fullName || '',
                email: response.data.email || '',
                mobile: response.data.mobile || '',
                whatsapp: response.data.whatsapp || '',
                city: response.data.city || ''
            });
            setLoading(false);
        } catch (error) {
            console.error(error);
            setMessage('Error loading profile');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/advisor/profile`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Error updating profile');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <h2>Personal Details</h2>
            {message && <p style={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Email (Not Editable)</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        style={{ ...styles.input, backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Mobile Number</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>WhatsApp Number</label>
                    <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Update Profile</button>
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
    message: { padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', backgroundColor: '#d1fae5', color: '#065f46' }
};

export default AdvisorPersonalDetails;
