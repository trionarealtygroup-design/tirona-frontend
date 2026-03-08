import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const PendingProperties = () => {
    const [properties, setProperties] = useState([]);
    const token = localStorage.getItem('adminToken');
    const navigate = useNavigate();

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/properties/pending`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(response.data);
        } catch (error) {
            console.error("Failed to load pending properties", error);
        }
    };

    const handleApprove = async (id) => {
        if (!window.confirm("Approve this property?")) return;
        try {
            await axios.post(`${API_URL}/admin/properties/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Property Approved!");
            loadProperties();
        } catch (error) {
            alert("Failed to approve");
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm("Reject this property?")) return;
        try {
            await axios.post(`${API_URL}/admin/properties/${id}/reject`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Property Rejected");
            loadProperties();
        } catch (error) {
            alert("Failed to reject");
        }
    };

    return (
        <div>
            <h1>Pending Approvals</h1>
            <div style={styles.grid}>
                {properties.length === 0 ? <p>No pending properties.</p> : properties.map(p => (
                    <div key={p._id} style={styles.card}>
                        <h3>{p.title}</h3>
                        <p>{p.location} - ₹{p.price}</p>
                        <p><strong>Advisor:</strong> {p.createdBy?.fullName || p.createdBy?.name || 'Unknown'}</p>
                        <div style={styles.actions}>
                            <button onClick={() => navigate(`/admin/properties/${p._id}`)} style={styles.editBtn}>Edit / Review</button>
                            <button onClick={() => handleApprove(p._id)} style={styles.approveBtn}>Approve</button>
                            <button onClick={() => handleReject(p._id)} style={styles.rejectBtn}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' },
    card: { padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white' },
    actions: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
    editBtn: { padding: '0.5rem', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' },
    approveBtn: { padding: '0.5rem', cursor: 'pointer', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px' },
    rejectBtn: { padding: '0.5rem', cursor: 'pointer', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px' }
};

export default PendingProperties;
