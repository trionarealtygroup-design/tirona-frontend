import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const AdminAdvisorVerification = () => {
    const [pendingAdvisors, setPendingAdvisors] = useState([]);
    const [verifiedAdvisors, setVerifiedAdvisors] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        loadData();
    }, [token, navigate]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [pendingRes, verifiedRes] = await Promise.all([
                axios.get(`${API_URL}/admin-extra/advisors/pending-verification`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${API_URL}/admin-extra/advisors/verified`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);
            setPendingAdvisors(pendingRes.data);
            setVerifiedAdvisors(verifiedRes.data);
        } catch (error) {
            console.error('Error loading verification data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (advisorId) => {
        if (!window.confirm('Are you sure you want to mark this advisor as verified?')) return;
        try {
            await axios.post(`${API_URL}/admin-extra/advisors/${advisorId}/verify`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Advisor marked as verified successfully');
            loadData();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to verify advisor');
        }
    };

    const currentList = activeTab === 'pending' ? pendingAdvisors : verifiedAdvisors;

    return (
        <div>
            <h1 style={{ marginBottom: '20px' }}>Advisor Verification</h1>

            {/* Tabs */}
            <div style={styles.tabContainer}>
                <button
                    style={{
                        ...styles.tabBtn,
                        backgroundColor: activeTab === 'pending' ? '#0b3c91' : '#f3f4f6',
                        color: activeTab === 'pending' ? '#fff' : '#333'
                    }}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending Advisors ({pendingAdvisors.length})
                </button>
                <button
                    style={{
                        ...styles.tabBtn,
                        backgroundColor: activeTab === 'verified' ? '#0b3c91' : '#f3f4f6',
                        color: activeTab === 'verified' ? '#fff' : '#333'
                    }}
                    onClick={() => setActiveTab('verified')}
                >
                    Verified Advisors ({verifiedAdvisors.length})
                </button>
            </div>

            {/* Table */}
            {loading ? (
                <p style={{ textAlign: 'center', padding: '20px' }}>Loading...</p>
            ) : (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>Plan</th>
                                <th>Referred By</th>
                                <th>Registered</th>
                                {activeTab === 'pending' && <th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {currentList.length === 0 ? (
                                <tr>
                                    <td colSpan={activeTab === 'pending' ? 8 : 7} style={{ textAlign: 'center', padding: '20px' }}>
                                        No {activeTab} advisors found
                                    </td>
                                </tr>
                            ) : (
                                currentList.map(advisor => (
                                    <tr key={advisor._id}>
                                        <td>{advisor.fullName}</td>
                                        <td>{advisor.email}</td>
                                        <td>{advisor.mobile}</td>
                                        <td>{advisor.city}</td>
                                        <td>
                                            <span style={{
                                                padding: '3px 10px',
                                                borderRadius: '12px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                backgroundColor: advisor.professionalPlan === 'premium_plus' ? '#ede9fe' :
                                                    advisor.professionalPlan === 'premium' ? '#dbeafe' : '#f3f4f6',
                                                color: advisor.professionalPlan === 'premium_plus' ? '#5b21b6' :
                                                    advisor.professionalPlan === 'premium' ? '#1e40af' : '#374151'
                                            }}>
                                                {(advisor.professionalPlan || 'basic').replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td>{advisor.referredBy || 'N/A'}</td>
                                        <td>{new Date(advisor.createdAt).toLocaleDateString()}</td>
                                        {activeTab === 'pending' && (
                                            <td>
                                                <button
                                                    onClick={() => handleVerify(advisor._id)}
                                                    style={styles.verifyBtn}
                                                >
                                                    ✓ Mark as Verified
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const styles = {
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
    },
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
    verifyBtn: {
        padding: '6px 14px',
        backgroundColor: '#10b981',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold'
    }
};

export default AdminAdvisorVerification;
