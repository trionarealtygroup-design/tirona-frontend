import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

const AdvisorDashboard = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('personal');
    const [advisor, setAdvisor] = useState(null);
    const [leads, setLeads] = useState([]);
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: ''
    });
    const [notifications, setNotifications] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [commissions, setCommissions] = useState([]);
    const [stats, setStats] = useState({ totalEarnings: 0, paidCommissions: 0, pendingCommissions: 0, totalReferrals: 0 });
    const [leadFilter, setLeadFilter] = useState('all');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [personalForm, setPersonalForm] = useState({
        fullName: '',
        email: '',
        mobile: '',
        whatsapp: '',
        city: '',
        address: ''
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [leadForm, setLeadForm] = useState({
        leadType: 'sell',
        // Sell fields
        ownerName: '',
        ownerMobile: '',
        propertyType: 'Plot',
        location: '',
        expectedPrice: '',
        propertyDescription: '',
        propertyImages: [],
        // Plot fields
        plotAreaSize: '',
        plotFacing: '',
        plotType: '',
        // Flat fields
        flatBHK: '',
        flatFloor: '',
        totalFloors: '',
        carpetArea: '',
        // House fields
        houseBuiltUpArea: '',
        houseFloors: '',
        // Buy fields
        buyerName: '',
        buyerEmail: '',
        buyerPhone: '',
        buyerWhatsapp: '',
        interestedPropertyType: '',
        budgetRange: '',
        preferredLocation: '',
        notes: ''
    });

    const token = localStorage.getItem('token');
    let user = {};
    try {
        user = JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
        console.error('Error parsing user from localStorage', e);
    }

    useEffect(() => {
        if (!token) {
            navigate('/advisor/login');
            return;
        }
        loadAdvisorData();
        loadLeads();
        loadBankDetails();
        loadNotifications();
        loadCommissions();
        loadReferrals();
        // Check verification status from localStorage
        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            if (storedUser && storedUser.isVerified === false) {
                setShowVerificationPopup(true);
            }
        } catch (e) {
            console.error('Error parsing stored user', e);
        }
    }, [token, navigate]);

    const loadAdvisorData = async () => {
        try {
            const response = await axios.get(`${API_URL}/advisor/personal`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data || {};
            setAdvisor(data);
            setPersonalForm({
                fullName: data.fullName || '',
                email: data.email || '',
                mobile: data.mobile || '',
                whatsapp: data.whatsapp || '',
                city: data.city || '',
                address: data.address || ''
            });
        } catch (error) {
            console.error('Error loading advisor data:', error);
            setAdvisor({});
        }
    };

    const loadLeads = async () => {
        try {
            const response = await axios.get(`${API_URL}/leads/my`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLeads(response.data || []);
        } catch (error) {
            console.error('Error loading leads:', error);
            setLeads([]);
        }
    };

    const loadBankDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/advisor/bank`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data) {
                setBankDetails(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('Bank details not found (404), using empty state.');
            } else {
                console.error('Error loading bank details:', error);
            }
            // Always ensure bankDetails is an object to prevent crashes
            setBankDetails(prev => prev || {
                bankName: '',
                accountHolderName: '',
                accountNumber: '',
                ifscCode: '',
                branchName: ''
            });
        }
    };

    const loadNotifications = async () => {
        try {
            const response = await axios.get(`${API_URL}/advisor/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(response.data || []);
        } catch (error) {
            console.error('Error loading notifications:', error);
            setNotifications([]);
        }
    };

    const loadCommissions = async () => {
        try {
            const response = await axios.get(`${API_URL}/advisor/commissions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCommissions(response.data || []);
        } catch (error) {
            console.error('Error loading commissions:', error);
            setCommissions([]);
        }
    };

    const loadReferrals = async () => {
        try {
            const response = await axios.get(`${API_URL}/advisor-extra/my-referrals`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReferrals(response.data?.referrals || []);
        } catch (error) {
            console.error('Error loading referrals:', error);
            setReferrals([]);
        }
    };

    useEffect(() => {
        // Calculate earnings summary
        const safeCommissions = commissions || [];
        const safeReferrals = referrals || [];
        const paid = safeCommissions.filter(c => c.status === 'paid').reduce((sum, c) => sum + (c.commissionAmount || 0), 0);
        const pending = safeCommissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + (c.commissionAmount || 0), 0);
        // Assuming referral bonus is 500 per verified referral (hypothetical business logic)
        const referralEarnings = safeReferrals.filter(r => r.isVerified).reduce((sum, r) => sum + ((r.planAmount || 0) * 0.5), 0);

        setStats({
            totalEarnings: paid + referralEarnings,
            paidCommissions: paid,
            pendingCommissions: pending,
            totalReferrals: safeReferrals.length,
            referralEarnings: referralEarnings
        });
    }, [commissions, referrals]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/advisor/login');
    };

    const handlePersonalUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/advisor/personal`, personalForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Personal details updated successfully');
            loadAdvisorData();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update personal details');
        }
    };

    const handleBankUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/advisor/bank`, bankDetails, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Bank details updated successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update bank details');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }
        try {
            await axios.post(`${API_URL}/advisor/change-password`, {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Password changed successfully');
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to change password');
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        const imagePromises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        });
        Promise.all(imagePromises).then(images => {
            setLeadForm({ ...leadForm, propertyImages: images });
        });
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = leadForm.leadType === 'sell' ? '/leads/sell' : '/leads/buy';
            const payload = leadForm.leadType === 'sell' ? {
                ownerName: leadForm.ownerName,
                ownerMobile: leadForm.ownerMobile,
                propertyType: leadForm.propertyType,
                location: leadForm.location,
                expectedPrice: leadForm.expectedPrice,
                propertyDescription: leadForm.propertyDescription,
                propertyImages: leadForm.propertyImages,
                ...(leadForm.propertyType === 'Plot' && {
                    plotAreaSize: leadForm.plotAreaSize,
                    plotFacing: leadForm.plotFacing,
                    plotType: leadForm.plotType
                }),
                ...(leadForm.propertyType === 'Flat' && {
                    flatBHK: leadForm.flatBHK,
                    flatFloor: leadForm.flatFloor,
                    totalFloors: leadForm.totalFloors,
                    carpetArea: leadForm.carpetArea
                }),
                ...(leadForm.propertyType === 'House' && {
                    houseBuiltUpArea: leadForm.houseBuiltUpArea,
                    houseFloors: leadForm.houseFloors
                })
            } : {
                buyerName: leadForm.buyerName,
                buyerEmail: leadForm.buyerEmail,
                buyerPhone: leadForm.buyerPhone,
                buyerWhatsapp: leadForm.buyerWhatsapp,
                interestedPropertyType: leadForm.interestedPropertyType,
                budgetRange: leadForm.budgetRange,
                preferredLocation: leadForm.preferredLocation,
                notes: leadForm.notes
            };

            await axios.post(`${API_URL}${endpoint}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Lead submitted successfully');
            setLeadForm({
                leadType: 'sell',
                ownerName: '', ownerMobile: '', propertyType: 'Plot', location: '',
                expectedPrice: '', propertyDescription: '', propertyImages: [],
                plotAreaSize: '', plotFacing: '', plotType: '',
                flatBHK: '', flatFloor: '', totalFloors: '', carpetArea: '',
                houseBuiltUpArea: '', houseFloors: '',
                buyerName: '', buyerEmail: '', buyerPhone: '', buyerWhatsapp: '',
                interestedPropertyType: '', budgetRange: '', preferredLocation: '', notes: ''
            });
            loadLeads();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to submit lead');
        }
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'personal':
                return (
                    <div style={styles.contentBox}>
                        <h2>Personal Details</h2>
                        <form onSubmit={handlePersonalUpdate} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={personalForm.fullName}
                                    onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Email (Not Editable)</label>
                                <input
                                    type="email"
                                    value={personalForm.email}
                                    disabled
                                    style={{ ...styles.input, backgroundColor: '#f3f4f6' }}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    value={personalForm.mobile}
                                    onChange={(e) => setPersonalForm({ ...personalForm, mobile: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>WhatsApp Number</label>
                                <input
                                    type="tel"
                                    value={personalForm.whatsapp}
                                    onChange={(e) => setPersonalForm({ ...personalForm, whatsapp: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    value={personalForm.city}
                                    onChange={(e) => setPersonalForm({ ...personalForm, city: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Address</label>
                                <textarea
                                    value={personalForm.address}
                                    onChange={(e) => setPersonalForm({ ...personalForm, address: e.target.value })}
                                    style={styles.textarea}
                                    rows="3"
                                />
                            </div>
                            <button type="submit" style={styles.submitBtn}>Update Personal Details</button>
                        </form>
                    </div>
                );

            case 'bank':
                return (
                    <div style={styles.contentBox}>
                        <h2>Bank Details</h2>
                        <form onSubmit={handleBankUpdate} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label>Bank Name</label>
                                <input
                                    type="text"
                                    value={bankDetails?.bankName || ''}
                                    onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Account Holder Name</label>
                                <input
                                    type="text"
                                    value={bankDetails?.accountHolderName || ''}
                                    onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Account Number</label>
                                <input
                                    type="text"
                                    value={bankDetails?.accountNumber || ''}
                                    onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>IFSC Code</label>
                                <input
                                    type="text"
                                    value={bankDetails?.ifscCode || ''}
                                    onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Branch Name</label>
                                <input
                                    type="text"
                                    value={bankDetails?.branchName || ''}
                                    onChange={(e) => setBankDetails({ ...bankDetails, branchName: e.target.value })}
                                    style={styles.input}
                                />
                            </div>
                            <button type="submit" style={styles.submitBtn}>Save Bank Details</button>
                        </form>
                    </div>
                );

            case 'password':
                return (
                    <div style={styles.contentBox}>
                        <h2>Change Password</h2>
                        <form onSubmit={handlePasswordChange} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                                <small style={{ color: '#666', fontSize: '12px' }}>
                                    Must be at least 8 characters with uppercase, lowercase, number, and special character
                                </small>
                            </div>
                            <div style={styles.formGroup}>
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <button type="submit" style={styles.submitBtn}>Change Password</button>
                        </form>
                    </div>
                );

            case 'leads':
                const filteredLeads = (leads || []).filter(l => {
                    if (leadFilter === 'all') return true;
                    return l.leadType === leadFilter;
                });
                return (
                    <div style={styles.contentBox}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2>Your Leads</h2>
                            <div style={styles.filterGroup}>
                                <button onClick={() => setLeadFilter('all')} style={{ ...styles.filterBtn, backgroundColor: leadFilter === 'all' ? '#0b3c91' : '#f3f4f6', color: leadFilter === 'all' ? '#fff' : '#333' }}>All</button>
                                <button onClick={() => setLeadFilter('buy')} style={{ ...styles.filterBtn, backgroundColor: leadFilter === 'buy' ? '#0b3c91' : '#f3f4f6', color: leadFilter === 'buy' ? '#fff' : '#333' }}>Buy</button>
                                <button onClick={() => setLeadFilter('sell')} style={{ ...styles.filterBtn, backgroundColor: leadFilter === 'sell' ? '#0b3c91' : '#f3f4f6', color: leadFilter === 'sell' ? '#fff' : '#333' }}>Sell</button>
                            </div>
                        </div>
                        <div style={styles.leadsList}>
                            {filteredLeads?.length === 0 ? (
                                <p>No {leadFilter !== 'all' ? leadFilter : ''} leads found.</p>
                            ) : (
                                filteredLeads.map(lead => (
                                    <div key={lead._id} style={styles.leadCard}>
                                        <div style={styles.leadHeader}>
                                            <span style={styles.leadType}>{lead.leadType === 'sell' ? 'SELL' : 'BUY'}</span>
                                            <span style={{
                                                ...styles.status,
                                                backgroundColor: lead.status === 'approved' ? '#10b981' :
                                                    lead.status === 'rejected' ? '#ef4444' :
                                                        lead.status === 'sold' ? '#8b5cf6' : '#fbbf24'
                                            }}>
                                                {lead.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div style={styles.leadBody}>
                                            <p><strong>Property Type:</strong> {lead.propertyType || lead.interestedPropertyType || 'N/A'}</p>
                                            <p><strong>Location:</strong> {lead.location || lead.preferredLocation || 'N/A'}</p>
                                            {lead.leadType === 'sell' ? (
                                                <p><strong>Expected Price:</strong> ₹{lead.expectedPrice?.toLocaleString() || 'N/A'}</p>
                                            ) : (
                                                <p><strong>Budget Range:</strong> {lead.budgetRange || 'N/A'}</p>
                                            )}
                                            <p><strong>Date:</strong> {new Date(lead.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div style={styles.contentBox}>
                        <h2>Notifications</h2>
                        {(!notifications || notifications.length === 0) ? <p>No notifications.</p> : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {(notifications || []).map(notif => (
                                    <li key={notif._id} style={{
                                        padding: '1rem',
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: notif.read ? 'white' : '#f0f9ff'
                                    }}>
                                        <p>{notif.message}</p>
                                        <small>{new Date(notif.createdAt).toLocaleString()}</small>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );

            case 'commissions':
                return (
                    <div style={styles.contentBox}>
                        <h2>Commissions</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f9fafb' }}>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Property</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Amount</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(!commissions || commissions.length === 0) ? (
                                        <tr><td colSpan="4" style={{ padding: '1rem', textAlign: 'center' }}>No commissions yet.</td></tr>
                                    ) : (
                                        (commissions || []).map(comm => (
                                            <tr key={comm._id} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '0.75rem' }}>{comm.property?.title || 'Unknown Property'}</td>
                                                <td style={{ padding: '0.75rem' }}>₹{comm.commissionAmount?.toLocaleString() || 0}</td>
                                                <td style={{ padding: '0.75rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold',
                                                        backgroundColor: comm.status === 'paid' ? '#d1fae5' : '#fef3c7',
                                                        color: comm.status === 'paid' ? '#065f46' : '#92400e'
                                                    }}>
                                                        {comm.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '0.75rem' }}>{new Date(comm.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'submit-lead':
                return (
                    <div style={styles.contentBox}>
                        <h2>Submit New Lead</h2>
                        <div style={styles.tabs}>
                            <button
                                style={{
                                    ...styles.tab,
                                    backgroundColor: leadForm.leadType === 'sell' ? '#0b3c91' : '#f3f4f6',
                                    color: leadForm.leadType === 'sell' ? '#fff' : '#333'
                                }}
                                onClick={() => setLeadForm({ ...leadForm, leadType: 'sell' })}
                            >
                                SELL Property
                            </button>
                            <button
                                style={{
                                    ...styles.tab,
                                    backgroundColor: leadForm.leadType === 'buy' ? '#0b3c91' : '#f3f4f6',
                                    color: leadForm.leadType === 'buy' ? '#fff' : '#333'
                                }}
                                onClick={() => setLeadForm({ ...leadForm, leadType: 'buy' })}
                            >
                                BUY Property
                            </button>
                        </div>

                        {leadForm.leadType === 'sell' ? (
                            <form onSubmit={handleLeadSubmit} style={styles.form}>
                                <div style={styles.formGroup}>
                                    <label>Owner Name</label>
                                    <input
                                        type="text"
                                        value={leadForm.ownerName}
                                        onChange={(e) => setLeadForm({ ...leadForm, ownerName: e.target.value })}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        value={leadForm.ownerMobile}
                                        onChange={(e) => setLeadForm({ ...leadForm, ownerMobile: e.target.value })}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Property Type</label>
                                    <select
                                        value={leadForm.propertyType}
                                        onChange={(e) => setLeadForm({ ...leadForm, propertyType: e.target.value })}
                                        style={styles.input}
                                        required
                                    >
                                        <option value="Plot">Plot</option>
                                        <option value="Flat">Flat</option>
                                        <option value="House">House</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Land">Land</option>
                                        <option value="Bungalow">Bungalow</option>
                                        <option value="Villa">Villa</option>
                                    </select>
                                </div>

                                {leadForm.propertyType === 'Plot' && (
                                    <>
                                        <div style={styles.formGroup}>
                                            <label>Area Size</label>
                                            <input
                                                type="text"
                                                value={leadForm.plotAreaSize}
                                                onChange={(e) => setLeadForm({ ...leadForm, plotAreaSize: e.target.value })}
                                                style={styles.input}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label>Facing</label>
                                            <input
                                                type="text"
                                                value={leadForm.plotFacing}
                                                onChange={(e) => setLeadForm({ ...leadForm, plotFacing: e.target.value })}
                                                style={styles.input}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label>Plot Type</label>
                                            <input
                                                type="text"
                                                value={leadForm.plotType}
                                                onChange={(e) => setLeadForm({ ...leadForm, plotType: e.target.value })}
                                                style={styles.input}
                                            />
                                        </div>
                                    </>
                                )}

                                {leadForm.propertyType === 'Flat' && (
                                    <>
                                        <div style={styles.formGroup}>
                                            <label>BHK</label>
                                            <input
                                                type="text"
                                                value={leadForm.flatBHK}
                                                onChange={(e) => setLeadForm({ ...leadForm, flatBHK: e.target.value })}
                                                style={styles.input}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label>Floor</label>
                                            <input
                                                type="text"
                                                value={leadForm.flatFloor}
                                                onChange={(e) => setLeadForm({ ...leadForm, flatFloor: e.target.value })}
                                                style={styles.input}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label>Total Floors</label>
                                            <input
                                                type="text"
                                                value={leadForm.totalFloors}
                                                onChange={(e) => setLeadForm({ ...leadForm, totalFloors: e.target.value })}
                                                style={styles.input}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label>Carpet Area</label>
                                            <input
                                                type="text"
                                                value={leadForm.carpetArea}
                                                onChange={(e) => setLeadForm({ ...leadForm, carpetArea: e.target.value })}
                                                style={styles.input}
                                            />
                                        </div>
                                    </>
                                )}

                                {leadForm.propertyType === 'House' && (
                                    <>
                                        <div style={styles.formGroup}>
                                            <label>Built Up Area</label>
                                            <input
                                                type="text"
                                                value={leadForm.houseBuiltUpArea}
                                                onChange={(e) => setLeadForm({ ...leadForm, houseBuiltUpArea: e.target.value })}
                                                style={styles.input}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label>Floors</label>
                                            <input
                                                type="text"
                                                value={leadForm.houseFloors}
                                                onChange={(e) => setLeadForm({ ...leadForm, houseFloors: e.target.value })}
                                                style={styles.input}
                                            />
                                        </div>
                                    </>
                                )}

                                <div style={styles.formGroup}>
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        value={leadForm.location}
                                        onChange={(e) => setLeadForm({ ...leadForm, location: e.target.value })}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Expected Selling Price</label>
                                    <input
                                        type="number"
                                        value={leadForm.expectedPrice}
                                        onChange={(e) => setLeadForm({ ...leadForm, expectedPrice: e.target.value })}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Property Description</label>
                                    <textarea
                                        value={leadForm.propertyDescription}
                                        onChange={(e) => setLeadForm({ ...leadForm, propertyDescription: e.target.value })}
                                        style={styles.textarea}
                                        rows="4"
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Property Images (Maximum 5)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        style={styles.input}
                                    />
                                    {leadForm.propertyImages.length > 0 && (
                                        <div style={styles.imagePreview}>
                                            {leadForm.propertyImages.map((img, idx) => (
                                                <img key={idx} src={img} alt={`Preview ${idx}`} style={styles.previewImg} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button type="submit" style={styles.submitBtn}>Submit Lead</button>
                            </form>
                        ) : (
                            <form onSubmit={handleLeadSubmit} style={styles.form}>
                                <div style={styles.formGroup}>
                                    <label>Buyer Name</label>
                                    <input
                                        type="text"
                                        value={leadForm.buyerName}
                                        onChange={(e) => setLeadForm({ ...leadForm, buyerName: e.target.value })}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={leadForm.buyerEmail}
                                        onChange={(e) => setLeadForm({ ...leadForm, buyerEmail: e.target.value })}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={leadForm.buyerPhone}
                                        onChange={(e) => setLeadForm({ ...leadForm, buyerPhone: e.target.value })}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>WhatsApp Number</label>
                                    <input
                                        type="tel"
                                        value={leadForm.buyerWhatsapp}
                                        onChange={(e) => setLeadForm({ ...leadForm, buyerWhatsapp: e.target.value })}
                                        required
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Property Type Interested In</label>
                                    <input
                                        type="text"
                                        value={leadForm.interestedPropertyType}
                                        onChange={(e) => setLeadForm({ ...leadForm, interestedPropertyType: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Budget Range</label>
                                    <input
                                        type="text"
                                        value={leadForm.budgetRange}
                                        onChange={(e) => setLeadForm({ ...leadForm, budgetRange: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Preferred Location</label>
                                    <input
                                        type="text"
                                        value={leadForm.preferredLocation}
                                        onChange={(e) => setLeadForm({ ...leadForm, preferredLocation: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label>Notes</label>
                                    <textarea
                                        value={leadForm.notes}
                                        onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                                        style={styles.textarea}
                                        rows="4"
                                    />
                                </div>
                                <button type="submit" style={styles.submitBtn}>Submit Lead</button>
                            </form>
                        )}
                    </div>
                );

            case 'earnings':
                return (
                    <div style={styles.contentBox}>
                        <h2>Your Earnings Summary</h2>
                        <div style={styles.statsGrid}>
                            <div style={{ ...styles.statCard, borderLeft: '5px solid #10b981' }}>
                                <h3>Total Earnings</h3>
                                <p style={styles.statValue}>₹{stats?.totalEarnings?.toLocaleString() || 0}</p>
                            </div>
                            <div style={{ ...styles.statCard, borderLeft: '5px solid #3b82f6' }}>
                                <h3>Property Commissions (Paid)</h3>
                                <p style={styles.statValue}>₹{stats?.paidCommissions?.toLocaleString() || 0}</p>
                            </div>
                            <div style={{ ...styles.statCard, borderLeft: '5px solid #fbbf24' }}>
                                <h3>Pending Commissions</h3>
                                <p style={styles.statValue}>₹{stats?.pendingCommissions?.toLocaleString() || 0}</p>
                            </div>
                            <div style={{ ...styles.statCard, borderLeft: '5px solid #8b5cf6' }}>
                                <h3>Referral Earnings</h3>
                                <p style={styles.statValue}>₹{(stats?.referralEarnings || 0).toLocaleString()}</p>
                                <small>{(referrals || []).filter(r => r.isVerified).length} Verified Referrals</small>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h3>Referral Bonus Details</h3>
                            <p>You earn <strong>50%</strong> of the selected plan amount when an advisor joins using your referral. This amount will be transferred manually.</p>
                            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ backgroundColor: '#f9fafb' }}>
                                        <tr>
                                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Referral Name</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Bonus Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(referrals || []).map(r => (
                                            <tr key={r._id} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '0.75rem' }}>{r.fullName}</td>
                                                <td style={{ padding: '0.75rem' }}>{r.isVerified ? 'Verified ✅' : 'Pending ⏳'}</td>
                                                <td style={{ padding: '0.75rem' }}>₹{r.isVerified && r.planAmount ? (r.planAmount * 0.5).toLocaleString() : (r.isVerified ? 'Pending' : '0')}</td>
                                            </tr>
                                        ))}
                                        {(!referrals || referrals.length === 0) && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>No referrals yet.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div style={styles.contentBox}><h2>Welcome to Advisor Dashboard</h2></div>;
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <div style={styles.headerLeft}>
                    <button style={styles.hamburger} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
                    <img src="/Images/TRIONA.png" alt="TRIONA Logo" style={styles.logo} />
                    <div className="desktop-logo-text">
                        <h1 style={styles.logoText}>TRIONA</h1>
                        <span style={styles.logoSub}>Realty Group</span>
                    </div>
                </div>
                <div style={styles.headerRight}>
                    {/* Verification Badge (NEW) */}
                    <span style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: user?.isVerified ? '#d1fae5' : '#fef3c7',
                        color: user?.isVerified ? '#065f46' : '#92400e'
                    }}>
                        {user?.isVerified ? '✓ Profile Verified' : '⚠ Profile Not Verified'}
                    </span>
                    <div style={styles.profileSection}>
                        <div style={styles.profilePic}>
                            {user?.fullName?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <span style={styles.profileName}>{user?.fullName || 'Advisor'}</span>
                    </div>
                    <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                </div>
            </header>

            {/* Verification Popup (NEW) */}
            {showVerificationPopup && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#fff', padding: '30px', borderRadius: '12px',
                        maxWidth: '400px', width: '90%', textAlign: 'center',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚠️</div>
                        <h2 style={{ marginBottom: '10px', color: '#92400e' }}>Profile Not Verified</h2>
                        <p style={{ color: '#666', marginBottom: '20px' }}>
                            Your profile is currently under review. You can still use the dashboard,
                            but some features may be limited until verification is complete.
                        </p>
                        <button
                            onClick={() => setShowVerificationPopup(false)}
                            style={{
                                padding: '10px 30px', backgroundColor: '#0b3c91', color: '#fff',
                                border: 'none', borderRadius: '5px', cursor: 'pointer',
                                fontSize: '14px', fontWeight: '500'
                            }}
                        >
                            OK, I Understand
                        </button>
                    </div>
                </div>
            )}

            {/* Main Layout */}
            <div style={styles.mainLayout}>
                {/* Left Sidebar Menu */}
                <aside style={{
                    ...styles.sidebar,
                    transform: 'translateX(0)',
                    zIndex: 100
                }}>
                    <ul style={styles.menuList}>
                        <li
                            style={{
                                ...styles.menuItem,
                                backgroundColor: activeMenu === 'personal' ? '#0b3c91' : 'transparent',
                                color: activeMenu === 'personal' ? '#fff' : '#333'
                            }}
                            onClick={() => { setActiveMenu('personal'); }}
                        >
                            Personal Details
                        </li>
                        <li
                            style={{
                                ...styles.menuItem,
                                backgroundColor: activeMenu === 'bank' ? '#0b3c91' : 'transparent',
                                color: activeMenu === 'bank' ? '#fff' : '#333'
                            }}
                            onClick={() => { setActiveMenu('bank'); }}
                        >
                            Bank Details
                        </li>
                        <li
                            style={{
                                ...styles.menuItem,
                                backgroundColor: activeMenu === 'password' ? '#0b3c91' : 'transparent',
                                color: activeMenu === 'password' ? '#fff' : '#333'
                            }}
                            onClick={() => { setActiveMenu('password'); }}
                        >
                            Change Password
                        </li>
                        <li
                            style={{
                                ...styles.menuItem,
                                backgroundColor: activeMenu === 'leads' ? '#0b3c91' : 'transparent',
                                color: activeMenu === 'leads' ? '#fff' : '#333'
                            }}
                            onClick={() => { setActiveMenu('leads'); }}
                        >
                            Your Leads / Properties
                        </li>
                        <li
                            style={{
                                ...styles.menuItem,
                                backgroundColor: activeMenu === 'earnings' ? '#0b3c91' : 'transparent',
                                color: activeMenu === 'earnings' ? '#fff' : '#333'
                            }}
                            onClick={() => { setActiveMenu('earnings'); }}
                        >
                            Your Earnings
                        </li>
                        <li
                            style={{
                                ...styles.menuItem,
                                backgroundColor: activeMenu === 'notifications' ? '#0b3c91' : 'transparent',
                                color: activeMenu === 'notifications' ? '#fff' : '#333'
                            }}
                            onClick={() => { setActiveMenu('notifications'); }}
                        >
                            Notifications
                        </li>
                        <li
                            style={{
                                ...styles.menuItem,
                                backgroundColor: activeMenu === 'commissions' ? '#0b3c91' : 'transparent',
                                color: activeMenu === 'commissions' ? '#fff' : '#333'
                            }}
                            onClick={() => { setActiveMenu('commissions'); }}
                        >
                            Commissions
                        </li>
                        <li
                            style={{
                                ...styles.menuItem,
                                backgroundColor: activeMenu === 'submit-lead' ? '#0b3c91' : 'transparent',
                                color: activeMenu === 'submit-lead' ? '#fff' : '#333'
                            }}
                            onClick={() => { setActiveMenu('submit-lead'); }}
                        >
                            Submit New Lead
                        </li>
                        <li
                            style={{
                                ...styles.menuItem,
                                backgroundColor: activeMenu === 'referrals' ? '#0b3c91' : 'transparent',
                                color: activeMenu === 'referrals' ? '#fff' : '#333'
                            }}
                            onClick={() => { setActiveMenu('referrals'); }}
                        >
                            My Referrals
                        </li>
                    </ul>
                </aside>

                {/* Content Area */}
                <main style={styles.contentArea}>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f4f6fa'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#0b3c91',
        color: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: '70px'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    logo: {
        width: '50px',
        height: 'auto'
    },
    logoText: {
        margin: 0,
        fontSize: '24px',
        fontWeight: 'bold'
    },
    logoSub: {
        fontSize: '12px',
        color: '#ffb400'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    profileSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    profilePic: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#ffb400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '18px'
    },
    profileName: {
        fontSize: '16px',
        fontWeight: '500'
    },
    logoutBtn: {
        padding: '10px 20px',
        backgroundColor: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    mainLayout: {
        display: 'flex',
        minHeight: 'calc(100vh - 80px)'
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#fff',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
        padding: '20px 0',
        transition: 'transform 0.3s ease',
        position: 'fixed',
        left: 0,
        top: '70px',
        bottom: 0,
        overflowY: 'auto'
    },
    menuList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    menuItem: {
        padding: '15px 25px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        borderLeft: '4px solid transparent'
    },
    contentArea: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        marginLeft: '250px', // Default for desktop
        transition: 'margin-left 0.3s ease'
    },
    contentBox: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    form: {
        marginTop: '20px'
    },
    formGroup: {
        marginBottom: '20px'
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '14px',
        fontFamily: 'inherit',
        boxSizing: 'border-box'
    },
    submitBtn: {
        padding: '12px 30px',
        backgroundColor: '#0b3c91',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500'
    },
    tabs: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
    },
    tab: {
        padding: '12px 24px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500'
    },
    leadsList: {
        marginTop: '20px'
    },
    leadCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '15px',
        backgroundColor: '#f9fafb'
    },
    leadHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
    },
    leadType: {
        padding: '5px 15px',
        backgroundColor: '#0b3c91',
        color: '#fff',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    status: {
        padding: '5px 15px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff'
    },
    leadBody: {
        color: '#333'
    },
    imagePreview: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
        flexWrap: 'wrap'
    },
    previewImg: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '5px',
        border: '1px solid #ddd'
    },
    // NEW Responsive & UI Styles
    hamburger: {
        display: 'none', // Overridden in media query (conceptual or inline)
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
        marginRight: '10px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
    },
    statCard: {
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    statValue: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#0b3c91',
        margin: '10px 0 0 0'
    },
    filterGroup: {
        display: 'flex',
        gap: '5px'
    },
    filterBtn: {
        padding: '5px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px'
    }
};

export default AdvisorDashboard;
