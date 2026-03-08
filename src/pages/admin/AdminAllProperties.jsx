import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const AdminAllProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('adminToken');
    const navigate = useNavigate();

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/properties`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProperties(response.data);
        } catch (error) {
            console.error("Failed to load properties", error);
        } finally {
            setLoading(false);
        }
    };

    // Frontend Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 20;

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
    const totalPages = Math.ceil(properties.length / propertiesPerPage);
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return '#10b981';
            case 'live': return '#059669';
            case 'pending': return '#fbbf24';
            case 'rejected': return '#ef4444';
            case 'sold': return '#8b5cf6';
            default: return '#6b7280';
        }
    };

    return (
        <div>
            <h1>All Properties</h1>
            <div style={styles.grid}>
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={`skeleton-${index}`} style={{ ...styles.card, height: '200px', background: '#f3f4f6', animation: 'pulse 1.5s infinite' }}></div>
                    ))
                ) : currentProperties.map(p => (
                    <div key={p._id} style={styles.card}>
                        <div style={{ ...styles.statusBadge, backgroundColor: getStatusColor(p.status) }}>
                            {p.status.toUpperCase()}
                        </div>
                        <h3>{p.title}</h3>
                        <p>{p.location} - ₹{p.price}</p>
                        <p><strong>Type:</strong> {p.type === 'advisor_lead' ? 'Advisor Lead' : p.type === 'direct_seller' ? 'Direct Seller' : 'Platform Property'}</p>
                        <p><strong>Posted By:</strong> {p.createdBy?.fullName || p.createdBy?.name || 'Unknown'}</p>
                        <div style={styles.actions}>
                            <button onClick={() => navigate(`/admin/properties/${p._id}`)} style={styles.editBtn}>Edit / Details</button>
                        </div>
                    </div>
                ))}
            </div>
            {!loading && properties.length === 0 && <p>No properties found.</p>}

            {!loading && totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{ padding: '8px 16px', background: currentPage === 1 ? '#ccc' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                    >
                        Previous
                    </button>
                    <span style={{ padding: '8px 16px' }}>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        style={{ padding: '8px 16px', background: currentPage === totalPages ? '#ccc' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' },
    card: { padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white', position: 'relative' },
    statusBadge: { position: 'absolute', top: '10px', right: '10px', padding: '2px 8px', borderRadius: '4px', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' },
    actions: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
    editBtn: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', width: '100%' }
};

export default AdminAllProperties;
