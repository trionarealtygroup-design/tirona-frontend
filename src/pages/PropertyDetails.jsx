import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import API_URL from '../config';
import Navbar from '../components/Navbar';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`${API_URL}/property/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error("Error fetching property", error);
            }
        };
        fetchProperty();
    }, [id]);

    if (!property) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

    return (
        <>
            <Navbar />
            <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
                {/* Header */}
                <div style={{ marginBottom: '30px' }}>
                    <Link to="/properties" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>&larr; Back to Properties</Link>
                    <h1 style={{ fontSize: '32px', margin: '15px 0 10px', color: '#111' }}>{property.title}</h1>
                    <p style={{ fontSize: '18px', color: '#666' }}>{property.location}</p>
                </div>

                {/* Images */}
                <div style={{ marginBottom: '40px' }}>
                    {property.images && property.images.length > 0 ? (
                        <img
                            src={property.images[0]}
                            alt={property.title}
                            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        />
                    ) : (
                        <div style={{ width: '100%', height: '300px', background: '#eee', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
                    )}
                </div>

                {/* Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                    {/* Left: Details */}
                    <div>
                        <div style={{ background: '#fff', padding: '30px', borderRadius: '18px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '24px', marginBottom: '15px', borderBottom: '2px solid #f4f6fa', paddingBottom: '10px' }}>Description</h2>
                            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>{property.description}</p>
                        </div>

                        <div style={{ background: '#fff', padding: '30px', borderRadius: '18px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '24px', marginBottom: '15px', borderBottom: '2px solid #f4f6fa', paddingBottom: '10px' }}>Details</h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong style={{ color: '#333' }}>Type:</strong> {property.type}</li>
                                <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong style={{ color: '#333' }}>Area:</strong> {property.area}</li>
                                <li style={{ marginBottom: '10px', fontSize: '16px' }}><strong style={{ color: '#333' }}>Price:</strong> ₹{property.price.toLocaleString()}</li>
                            </ul>

                            <h3 style={{ fontSize: '20px', margin: '20px 0 10px' }}>Amenities</h3>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {property.amenities && property.amenities.map((amenity, index) => (
                                    <span key={index} style={{ background: '#f0f4ff', color: '#007bff', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>{amenity}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Advisor/Contact */}
                    <div>
                        <div style={{ background: '#fff', padding: '30px', borderRadius: '18px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', position: 'sticky', top: '100px' }}>
                            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#111' }}>Interested in this property?</h3>
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>Listed by</p>
                                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{property.createdBy?.fullName || property.createdBy?.name || 'Triona Advisor'}</p>
                                {property.createdBy?.email && (
                                    <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>📧 {property.createdBy.email}</p>
                                )}
                                {property.createdBy?.mobile && (
                                    <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>📞 {property.createdBy.mobile}</p>
                                )}
                                {property.createdBy?.whatsapp && (
                                    <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>💬 {property.createdBy.whatsapp}</p>
                                )}
                            </div>

                            <a href={`mailto:${property.createdBy?.email || 'trionarealtygroup@gmail.com'}`} className="hero-btn" style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: '15px' }}>
                                Contact Advisor
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyDetails;
