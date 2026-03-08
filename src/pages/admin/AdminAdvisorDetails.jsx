import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const AdminAdvisorDetails = () => {
    const { id } = useParams();
    const [advisor, setAdvisor] = useState(null);
    const [bankDetails, setBankDetails] = useState(null);
    const [properties, setProperties] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('adminToken');
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            // Fetch Advisor Details
            const advisorRes = await axios.get(`${API_URL}/admin/advisors/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAdvisor(advisorRes.data.advisor);
            setBankDetails(advisorRes.data.bankDetails);

            // Fetch All Properties and filter (Client-side filtering for simplicity as planned)
            const propsRes = await axios.get(`${API_URL}/admin/properties`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Filter properties created by this advisor
            // Note: In normalized response, createdBy is populated object or ID string?
            // Normalized: createdBy is populated object.
            const advisorProps = propsRes.data.filter(p =>
                p.createdBy && (p.createdBy._id === id || p.createdBy === id)
            );
            setProperties(advisorProps);

            // Fetch Referrals
            const refRes = await axios.get(`${API_URL}/admin-extra/advisors/${id}/referrals`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReferrals(refRes.data.referrals || []);

            setLoading(false);
        } catch (error) {
            console.error("Failed to load details", error);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!advisor) return <div>Advisor not found</div>;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <button onClick={() => navigate('/admin/advisors')} style={styles.backBtn}>← Back to Advisors</button>

            <div style={styles.section}>
                <h1>{advisor.fullName}</h1>
                <div style={styles.gridTwo}>
                    <div>
                        <h3>Personal Details</h3>
                        <p><strong>Email:</strong> {advisor.email}</p>
                        <p><strong>Mobile:</strong> {advisor.mobile}</p>
                        <p><strong>City:</strong> {advisor.city}</p>
                        <p><strong>Status:</strong> {advisor.status}</p>
                        <p><strong>Code:</strong> {advisor.referralCode || 'N/A'}</p>
                        <p><strong>Referred By:</strong> {advisor.referredBy || 'Direct'}</p>
                        <p><strong>Plan:</strong> {advisor.professionalPlan || 'None'}</p>
                        <p><strong>Verified:</strong> {advisor.isVerified ? 'Yes ✅' : 'No ❌'}</p>
                    </div>
                    <div>
                        <h3>Bank Details</h3>
                        {bankDetails ? (
                            <>
                                <p><strong>Account Holder:</strong> {bankDetails.accountHolderName}</p>
                                <p><strong>Bank:</strong> {bankDetails.bankName}</p>
                                <p><strong>Account No:</strong> {bankDetails.accountNumber}</p>
                                <p><strong>IFSC:</strong> {bankDetails.ifscCode}</p>
                                <p><strong>PAN:</strong> {bankDetails.panNumber}</p>
                            </>
                        ) : <p>No bank details submitted.</p>}
                    </div>
                </div>
            </div>

            <div style={styles.section}>
                <h2>Referrals ({referrals.length})</h2>
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '0.75rem' }}>Name</th>
                                <th style={{ padding: '0.75rem' }}>Mobile</th>
                                <th style={{ padding: '0.75rem' }}>Plan</th>
                                <th style={{ padding: '0.75rem' }}>Verified</th>
                                <th style={{ padding: '0.75rem' }}>Registered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {referrals.length === 0 ? (
                                <tr><td colSpan="5" style={{ padding: '1rem', textAlign: 'center' }}>No referrals yet.</td></tr>
                            ) : referrals.map(ref => (
                                <tr key={ref._id} style={{ borderBottom: '1px solid #f9f9f9', cursor: 'pointer' }} onClick={() => navigate(`/admin/advisors/${ref._id}`)}>
                                    <td style={{ padding: '0.75rem' }}>{ref.fullName}</td>
                                    <td style={{ padding: '0.75rem' }}>{ref.mobile}</td>
                                    <td style={{ padding: '0.75rem' }}>{ref.professionalPlan}</td>
                                    <td style={{ padding: '0.75rem' }}>{ref.isVerified ? '✅' : '❌'}</td>
                                    <td style={{ padding: '0.75rem' }}>{new Date(ref.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    backBtn: { background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '1rem', fontSize: '1rem' },
    section: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    gridTwo: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
    propsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' },
    card: { padding: '1rem', border: '1px solid #eee', borderRadius: '4px', position: 'relative' },
    statusBadge: { position: 'absolute', top: '5px', right: '5px', fontSize: '0.7rem', color: 'white', padding: '2px 6px', borderRadius: '4px' },
    smBtn: { marginTop: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem', cursor: 'pointer' },
    tableContainer: { overflowX: 'auto', marginTop: '1rem' },
    table: { width: '100%', borderCollapse: 'collapse' }
};

export default AdminAdvisorDetails;
