import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const AdminAdvisors = () => {
    const [advisors, setAdvisors] = useState([]);
    const [activeTab, setActiveTab] = useState('verified'); // Default to verified advisors as requested
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        loadAdvisors();
    }, [token, navigate]);

    const loadAdvisors = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'all' ? '/admin/advisors' : '/admin-extra/advisors/verified';
            const response = await axios.get(`${API_URL}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAdvisors(response.data);
        } catch (error) {
            console.error('Error loading advisors:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) loadAdvisors();
    }, [activeTab]);

    const handleExport = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin-extra/export-advisors`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'advisors_data.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export data');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Advisors Management</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleExport} style={styles.exportBtn}>
                        📥 Download XLSX
                    </button>
                </div>
            </div>

            <div style={styles.tabContainer}>
                <button
                    style={{
                        ...styles.tabBtn,
                        backgroundColor: activeTab === 'verified' ? '#0b3c91' : '#f3f4f6',
                        color: activeTab === 'verified' ? '#fff' : '#333'
                    }}
                    onClick={() => setActiveTab('verified')}
                >
                    Approved (Verified) Advisors
                </button>
                <button
                    style={{
                        ...styles.tabBtn,
                        backgroundColor: activeTab === 'all' ? '#0b3c91' : '#f3f4f6',
                        color: activeTab === 'all' ? '#fff' : '#333'
                    }}
                    onClick={() => setActiveTab('all')}
                >
                    All Registered Advisors
                </button>
            </div>
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>WhatsApp</th>
                            <th>City</th>
                            <th>Verified</th>
                            <th>Registered Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {advisors.map(advisor => (
                            <tr key={advisor._id} onClick={() => navigate(`/admin/advisors/${advisor._id}`)} style={{ cursor: 'pointer', ':hover': { backgroundColor: '#f9fafb' } }}>
                                <td>{advisor.fullName}</td>
                                <td>{advisor.email}</td>
                                <td>{advisor.mobile}</td>
                                <td>{advisor.whatsapp}</td>
                                <td>{advisor.city}</td>
                                <td>{advisor.isVerified ? '✅' : '❌'}</td>
                                <td>{new Date(advisor.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {advisors.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>No advisors found</p>}
            </div>
        </div >
    );
};

const styles = {
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff'
    },
    exportBtn: {
        padding: '10px 20px',
        backgroundColor: '#10b981',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    },
    tabContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
    },
    tabBtn: {
        padding: '10px 24px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    }
};

export default AdminAdvisors;
