import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const AdminLeads = () => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [selectedAdvisor, setSelectedAdvisor] = useState(null);
    const [editingLead, setEditingLead] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        loadLeads();
    }, [token, navigate]);

    const loadLeads = async () => {
        try {
            const response = await axios.get(`${API_URL}/leads/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeads(response.data);
            setFilteredLeads(response.data);
        } catch (error) {
            console.error('Error loading leads:', error);
        }
    };

    const handleAdvisorClick = (advisorId) => {
        if (selectedAdvisor === advisorId) {
            setSelectedAdvisor(null);
            setFilteredLeads(leads);
        } else {
            setSelectedAdvisor(advisorId);
            setFilteredLeads(leads.filter(lead => lead.createdBy._id === advisorId || lead.createdBy === advisorId));
        }
    };

    const handleApprove = async (leadId) => {
        if (!window.confirm('Approve this lead? Approved sell leads will become live properties.')) return;
        try {
            await axios.post(`${API_URL}/leads/${leadId}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Lead approved successfully');
            loadLeads();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to approve lead');
        }
    };

    const handleReject = async (leadId) => {
        if (!window.confirm('Reject this lead?')) return;
        try {
            await axios.post(`${API_URL}/leads/${leadId}/reject`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Lead rejected');
            loadLeads();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to reject lead');
        }
    };

    const handleEdit = (lead) => {
        setEditingLead(lead);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const updateData = {};
            formData.forEach((value, key) => {
                if (value) updateData[key] = value;
            });
            await axios.put(`${API_URL}/leads/${editingLead._id}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Lead updated successfully');
            setEditingLead(null);
            loadLeads();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update lead');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Leads Management</h1>
                {selectedAdvisor && (
                    <button onClick={() => handleAdvisorClick(null)} style={styles.filterBtn}>
                        Show All Leads
                    </button>
                )}
            </div>

            {editingLead ? (
                <div style={styles.editForm}>
                    <h2>Edit Lead Details</h2>
                    <form onSubmit={handleSaveEdit}>
                        {editingLead.leadType === 'sell' ? (
                            <>
                                <div style={styles.formGroup}>
                                    <label>Owner Name</label>
                                    <input type="text" name="ownerName" defaultValue={editingLead.ownerName} style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Owner Mobile</label>
                                    <input type="text" name="ownerMobile" defaultValue={editingLead.ownerMobile} style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Property Type</label>
                                    <input type="text" name="propertyType" defaultValue={editingLead.propertyType} style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Location</label>
                                    <input type="text" name="location" defaultValue={editingLead.location} style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Expected Price</label>
                                    <input type="number" name="expectedPrice" defaultValue={editingLead.expectedPrice} style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Description</label>
                                    <textarea name="propertyDescription" defaultValue={editingLead.propertyDescription} style={styles.textarea} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={styles.formGroup}>
                                    <label>Buyer Name</label>
                                    <input type="text" name="buyerName" defaultValue={editingLead.buyerName} style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Buyer Email</label>
                                    <input type="email" name="buyerEmail" defaultValue={editingLead.buyerEmail} style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Phone</label>
                                    <input type="text" name="buyerPhone" defaultValue={editingLead.buyerPhone} style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Budget Range</label>
                                    <input type="text" name="budgetRange" defaultValue={editingLead.budgetRange} style={styles.input} />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Preferred Location</label>
                                    <input type="text" name="preferredLocation" defaultValue={editingLead.preferredLocation} style={styles.input} />
                                </div>
                            </>
                        )}
                        <div style={styles.formActions}>
                            <button type="submit" style={styles.saveBtn}>Save Changes</button>
                            <button type="button" onClick={() => setEditingLead(null)} style={styles.cancelBtn}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Advisor Name</th>
                                <th>Lead Type</th>
                                <th>Property Type</th>
                                <th>Location</th>
                                <th>Price/Budget</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map(lead => (
                                <tr key={lead._id}>
                                    <td>
                                        <button
                                            onClick={() => handleAdvisorClick(lead.createdBy?._id || lead.createdBy)}
                                            style={styles.advisorLink}
                                        >
                                            {lead.createdBy?.fullName || 'Unknown'}
                                        </button>
                                    </td>
                                    <td>
                                        <span style={{
                                            ...styles.badge,
                                            backgroundColor: lead.leadType === 'sell' ? '#3b82f6' : '#10b981'
                                        }}>
                                            {lead.leadType.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>{lead.propertyType || lead.interestedPropertyType || 'N/A'}</td>
                                    <td>{lead.location || lead.preferredLocation || 'N/A'}</td>
                                    <td>
                                        {lead.leadType === 'sell' 
                                            ? `₹${lead.expectedPrice?.toLocaleString() || 'N/A'}`
                                            : lead.budgetRange || 'N/A'
                                        }
                                    </td>
                                    <td>
                                        <span style={{
                                            ...styles.statusBadge,
                                            backgroundColor: lead.status === 'approved' ? '#10b981' :
                                                lead.status === 'rejected' ? '#ef4444' : '#fbbf24'
                                        }}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div style={styles.actionButtons}>
                                            <button onClick={() => handleEdit(lead)} style={styles.editBtn}>Edit</button>
                                            {lead.status !== 'approved' && (
                                                <button onClick={() => handleApprove(lead._id)} style={styles.approveBtn}>Approve</button>
                                            )}
                                            {lead.status !== 'rejected' && (
                                                <button onClick={() => handleReject(lead._id)} style={styles.rejectBtn}>Reject</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredLeads.length === 0 && <p style={{ textAlign: 'center', padding: '20px' }}>No leads found</p>}
                </div>
            )}
        </div>
    );
};

const styles = {
    filterBtn: {
        padding: '10px 20px',
        backgroundColor: '#6b7280',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
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
    advisorLink: {
        background: 'none',
        border: 'none',
        color: '#3b82f6',
        cursor: 'pointer',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    badge: {
        padding: '4px 12px',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    statusBadge: {
        padding: '4px 12px',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    actionButtons: {
        display: 'flex',
        gap: '5px'
    },
    editBtn: {
        padding: '5px 10px',
        backgroundColor: '#3b82f6',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
    },
    approveBtn: {
        padding: '5px 10px',
        backgroundColor: '#10b981',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
    },
    rejectBtn: {
        padding: '5px 10px',
        backgroundColor: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
    },
    editForm: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    formGroup: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        minHeight: '80px',
        boxSizing: 'border-box'
    },
    formActions: {
        display: 'flex',
        gap: '10px',
        marginTop: '20px'
    },
    saveBtn: {
        padding: '10px 20px',
        backgroundColor: '#10b981',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    cancelBtn: {
        padding: '10px 20px',
        backgroundColor: '#6b7280',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default AdminLeads;
