import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const AdvisorYourLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/leads/my`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeads(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return '#10b981';
            case 'rejected': return '#ef4444';
            default: return '#fbbf24';
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <h2>Your Leads</h2>
            {leads.length === 0 ? (
                <p>No leads submitted yet.</p>
            ) : (
                <div style={styles.table}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={styles.headerRow}>
                                <th style={styles.th}>Lead Type</th>
                                <th style={styles.th}>Property Type</th>
                                <th style={styles.th}>Location</th>
                                <th style={styles.th}>Price/Budget</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map(lead => (
                                <tr key={lead._id} style={styles.row}>
                                    <td style={styles.td}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: lead.leadType === 'sell' ? '#dbeafe' : '#fef3c7',
                                            color: lead.leadType === 'sell' ? '#1e40af' : '#92400e',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            fontSize: '12px'
                                        }}>
                                            {lead.leadType}
                                        </span>
                                    </td>
                                    <td style={styles.td}>{lead.propertyType || lead.interestedPropertyType || 'N/A'}</td>
                                    <td style={styles.td}>{lead.location || lead.preferredLocation || 'N/A'}</td>
                                    <td style={styles.td}>
                                        {lead.leadType === 'sell' 
                                            ? `₹${lead.expectedPrice?.toLocaleString() || 'N/A'}`
                                            : lead.budgetRange || 'N/A'
                                        }
                                    </td>
                                    <td style={styles.td}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '12px',
                                            backgroundColor: getStatusColor(lead.status) + '20',
                                            color: getStatusColor(lead.status),
                                            fontWeight: '600',
                                            fontSize: '12px',
                                            textTransform: 'capitalize'
                                        }}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    table: { overflowX: 'auto', marginTop: '1rem' },
    headerRow: { backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' },
    th: { padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' },
    row: { borderBottom: '1px solid #e5e7eb' },
    td: { padding: '12px', fontSize: '14px', color: '#6b7280' }
};

export default AdvisorYourLeads;
