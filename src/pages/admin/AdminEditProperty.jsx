import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const AdminEditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                // Determine which endpoint to use. 
                // For editing, we ideally want an admin-specific endpoint or just GET the public detail 
                // BUT public detail might only show approved. If this is pending, we might need a specific get.
                // However, our public /api/property/:id endpoint doesn't filter by status, just ID. 
                // Re-checking property.js: router.get("/:id", ...) just findsById without status check. Good.
                // Use admin-specific endpoint that searches all collections
                const response = await axios.get(`${API_URL}/admin/properties/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Ensure array fields are initialised
                const data = response.data;
                if (!data.images) data.images = [];
                if (!data.amenities) data.amenities = [];

                setProperty(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching property", error);
                alert("Could not load property");
                navigate('/admin/dashboard');
            }
        };
        fetchProperty();
    }, [id, navigate]);

    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (e, field) => {
        // Simple comma separated string for easier MVP editing
        const value = e.target.value;
        const array = value.split(',').map(item => item.trim());
        setProperty({ ...property, [field]: array });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/admin/properties/${id}`, property, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Changes saved!");
        } catch (error) {
            console.error(error);
            alert("Failed to save changes");
        }
    };

    const handleApprove = async () => {
        if (!window.confirm("Mark as Approved?")) return;
        try {
            await axios.post(`${API_URL}/admin/properties/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Property marked as Approved!");
            setProperty({ ...property, status: 'approved' });
        } catch (error) {
            alert("Failed to approve");
        }
    };

    const handleMakeLive = async () => {
        if (!window.confirm("Make this property Live on the website?")) return;
        try {
            await axios.post(`${API_URL}/admin/properties/${id}/make-live`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Property is now LIVE!");
            setProperty({ ...property, status: 'live' });
        } catch (error) {
            alert("Failed to make live");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1>Edit Property</h1>
            <div style={styles.statusBadge}>Status: {property.status}</div>

            <form onSubmit={handleSave} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Title</label>
                    <input name="title" value={property.title} onChange={handleChange} style={styles.input} />
                </div>

                <div style={styles.row}>
                    <div style={styles.formGroup}>
                        <label>Price</label>
                        <input name="price" type="number" value={property.price} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Location</label>
                        <input name="location" value={property.location} onChange={handleChange} style={styles.input} />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label>Description</label>
                    <textarea name="description" value={property.description} onChange={handleChange} style={styles.textarea} />
                </div>

                <div style={styles.row}>
                    <div style={styles.formGroup}>
                        <label>Area (e.g. 1200 sqft)</label>
                        <input name="area" value={property.area || ''} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label>Type (e.g. Apartment)</label>
                        <input name="type" value={property.type || ''} onChange={handleChange} style={styles.input} />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label>Amenities (comma separated)</label>
                    {/* Joining for display, assuming it's an array */}
                    <input
                        name="amenities"
                        defaultValue={property.amenities.join(', ')}
                        onChange={(e) => handleArrayChange(e, 'amenities')}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label>Images (URL per line or comma separated - simplified)</label>
                    {/* Simplified to comma separated for this MVP editor */}
                    <input
                        name="images"
                        defaultValue={property.images.join(', ')}
                        onChange={(e) => handleArrayChange(e, 'images')}
                        style={styles.input}
                    />
                    <small>Enter image URLs separated by commas</small>
                </div>

                <div style={styles.actions}>
                    <button type="submit" style={styles.saveBtn}>Save Changes</button>
                    {property.status === 'pending' && (
                        <button type="button" onClick={handleApprove} style={styles.approveBtn}>Approve</button>
                    )}
                    {property.status === 'approved' && (
                        <button type="button" onClick={handleMakeLive} style={styles.liveBtn}>Make Live</button>
                    )}
                </div>
            </form>
        </div>
    );
};

const styles = {
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    input: { padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db' },
    textarea: { padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db', minHeight: '150px' },
    statusBadge: { display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#e5e7eb', borderRadius: '999px', fontSize: '0.875rem', marginBottom: '1rem' },
    actions: { marginTop: '1rem', display: 'flex', gap: '1rem' },
    saveBtn: { padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    appro1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111veBtn: { padding: '0.75rem 1.5rem', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    liveBtn: { padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default AdminEditProperty;
