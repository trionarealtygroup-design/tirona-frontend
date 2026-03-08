import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const AdminCommissions = () => {
    const [commissions, setCommissions] = useState([]);
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        loadCommissions();
    }, []);

    const loadCommissions = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/commissions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCommissions(response.data);
        } catch (error) {
            console.error("Failed to load commissions", error);
        }
    };

    const handleMarkPaid = async (id) => {
        if (!window.confirm("Mark this commission as PAID?")) return;
        try {
            await axios.post(`${API_URL}/admin/commissions/${id}/mark-paid`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Commission marked as PAID");
            loadCommissions();
        } catch (error) {
            console.error(error);
            alert("Failed to mark paid");
        }
    };

    return (
        <div>
            <h1>Commissions Management</h1>
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Advisor</th>
                            <th>Property ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissions.length === 0 ? <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No commissions found</td></tr> : commissions.map(comm => (
                            <tr key={comm._id}>
                                <td>{comm.advisor?.fullName || 'Unknown'}</td>
                                <td>{comm.property?.title || comm.property || 'N/A'}</td>
                                <td>₹{comm.commissionAmount.toLocaleString()}</td>
                                <td>
                                    <span style={{
                                        ...styles.badge,
                                        backgroundColor: comm.status === 'paid' ? '#10b981' : '#fbbf24'
                                    }}>
                                        {comm.status.toUpperCase()}
                                    </span>
                                </td>
                                <td>{new Date(comm.createdAt).toLocaleDateString()}</td>
                                <td>
                                    {comm.status === 'pending' && (
                                        <button onClick={() => handleMarkPaid(comm._id)} style={styles.payBtn}>Mark Paid</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        marginTop: '1rem'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    badge: {
        padding: '4px 12px',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    payBtn: {
        padding: '5px 10px',
        backgroundColor: '#10b981',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
    }
};

export default AdminCommissions;
