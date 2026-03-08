import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../config';
import Navbar from '../components/Navbar';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${API_URL}/property`);
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ padding: '40px 20px', backgroundColor: '#f7f8fa', minHeight: '80vh' }}>
                <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', fontWeight: '600', color: '#111' }}>All Properties</h1>

                <div className="property-grid" style={{ maxWidth: '1100px', margin: 'auto' }}>
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={`skeleton-${index}`} style={{ background: '#eee', height: '350px', borderRadius: '12px', animation: 'pulse 1.5s infinite' }}></div>
                        ))
                    ) : properties.map(p => (
                        <div key={p._id} className="property-card">
                            <img
                                src={p.images?.[0] || 'https://placehold.co/600x400?text=Triona+Property'}
                                alt={p.title}
                                loading="lazy"
                                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                            />
                            <div className="property-info">
                                <h3>{p.title}</h3>
                                <p>{p.location}</p>
                                <span>₹ {p.price.toLocaleString()}</span>
                                <Link to={`/properties/${p._id}`}>View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Properties;
