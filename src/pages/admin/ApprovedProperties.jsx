import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const ApprovedProperties = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/properties/approved`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(response.data);
        } catch (error) {
            console.error("Failed to load properties", error);
        }
    };

    const handleMakeLive = async (id) => {
        if (!window.confirm("Make this property LIVE on the public website?")) return;
        try {
            await axios.post(`${API_URL}/admin/properties/${id}/make-live`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Property is now LIVE!");
            loadProperties();
        } catch (error) {
            console.error(error);
            alert("Failed to make live");
        }
    };

    const handleMarkSold = async (id) => {
        const amount = window.prompt("Enter Commission Amount (digits only):", "0");
        if (amount === null) return; // Cancelled
        const commissionAmount = parseFloat(amount);
        if (isNaN(commissionAmount)) {
            alert("Invalid amount");
            return;
        }

        try {
            await axios.put(`${API_URL}/admin/properties/${id}/mark-sold`,
                { commissionAmount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Property marked as SOLD!");
            // Refresh logic - if using public API, it might take a moment or need admin endpoint
            // But since 'sold' status removes it from 'approved' list, refreshing is good.
            loadProperties();
        } catch (error) {
            console.error(error);
            alert("Failed to mark as sold");
        }
    };

    return (
        <div>
            <h1>Approved / Live Properties</h1>
            <div style={styles.grid}>
                {properties.map(p => (
                    <div key={p._id} style={styles.card}>
                        <h3>{p.title}</h3>
                        <p>{p.location} - ₹{p.price}</p>
                        <div style={styles.actions}>
                            <button onClick={() => navigate(`/admin/properties/${p._id}`)} style={styles.editBtn}>Edit</button>
                            {p.status !== 'live' && (
                                <button onClick={() => handleMakeLive(p._id)} style={styles.liveBtn}>Make Live</button>
                            )}
                            <button style={styles.viewBtn} onClick={() => window.open(`/properties/${p._id}`, '_blank')}>View Live</button>
                            <button onClick={() => handleMarkSold(p._id)} style={styles.soldBtn}>Mark Sold</button>
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
    editBtn: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' },
    viewBtn: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' },
    liveBtn: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '4px' },
    soldBtn: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px' }
};

export default ApprovedProperties;
