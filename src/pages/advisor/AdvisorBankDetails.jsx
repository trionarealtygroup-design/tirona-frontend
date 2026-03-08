import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const AdvisorBankDetails = () => {
    const [formData, setFormData] = useState({
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadBankDetails();
    }, []);

    const loadBankDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/advisor/bank-details`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFormData({
                bankName: response.data.bankName || '',
                accountHolderName: response.data.accountHolderName || '',
                accountNumber: response.data.accountNumber || '',
                ifscCode: response.data.ifscCode || '',
                branchName: response.data.branchName || ''
            });
            setLoading(false);
        } catch (error) {
            console.error(error);
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
            await axios.put(`${API_URL}/advisor/bank-details`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Bank details saved successfully!');
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Error saving bank details');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <h2>Bank Details</h2>
            {message && <p style={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Bank Name</label>
                    <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Account Holder Name</label>
                    <input
                        type="text"
                        name="accountHolderName"
                        value={formData.accountHolderName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Account Number</label>
                    <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>IFSC Code</label>
                    <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="e.g., SBIN0001234"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Branch Name</label>
                    <input
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Save Bank Details</button>
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

export default AdvisorBankDetails;
