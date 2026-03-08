import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const LiveProperties = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/properties/live`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(response.data);
        } catch (error) {
            console.error("Failed to load properties", error);
        }
    };

    const handleMarkSold = async (id) => {
        const amount = window.prompt("Enter Commission Amount (digits only):", "0");
        if (amount === null) return;
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
            loadProperties();
        } catch (error) {
            console.error(error);
            alert("Failed to mark as sold");
        }
    };

    return (
        <div>
            <h1>Live Properties (Publicly Visible)</h1>
            <div style={styles.grid}>
                {properties.map(p => (
                    <div key={p._id} style={styles.card}>
                        <div style={styles.badge}>LIVE</div>
                        <h3>{p.title}</h3>
                        <p>{p.location} - ₹{p.price}</p>
                        <div style={styles.actions}>
                            <button onClick={() => navigate(`/admin/properties/${p._id}`)} style={styles.editBtn}>Edit</button>
                            <button style={styles.viewBtn} onClick={() => window.open(`/properties/${p._id}`, '_blank')}>Public View</button>
                            <button onClick={() => handleMarkSold(p._id)} style={styles.soldBtn}>Mark Sold</button>
                        </div>
                    </div>
                ))}
            </div>
            {properties.length === 0 && <p style={{ textAlign: 'center', marginTop: '2rem' }}>No live properties found.</p>}
        </div>
    );
};

const styles = {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' },
    card: { padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white', position: 'relative' },
    badge: { position: 'absolute', top: '10px', right: '10px', backgroundColor: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' },
    actions: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
    editBtn: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' },
    viewBtn: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' },
    soldBtn: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px' }
};

export default LiveProperties;
