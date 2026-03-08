import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProperties: 0,
        pendingProperties: 0,
        approvedProperties: 0,
        liveProperties: 0,
        totalAdvisors: 0,
        pendingAdvisors: 0,
        approvedAdvisors: 0
    });
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        // Check authentication
        if (!token) {
            navigate('/admin/login');
            return;
        }

        // Fetch stats
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/dashboard-stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(response.data);
            } catch (error) {
                console.error("Failed to load stats", error);
                // Set default stats if API fails
                setStats({
                    totalProperties: 0,
                    pendingProperties: 0,
                    approvedProperties: 0,
                    liveProperties: 0,
                    totalAdvisors: 0,
                    pendingAdvisors: 0,
                    approvedAdvisors: 0
                });
            }
        };
        fetchStats();
    }, [token, navigate]);

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            <h1 style={{ marginBottom: '1.5rem' }}>Admin Dashboard</h1>
            <div style={styles.grid}>
                <div onClick={() => handleCardClick('/admin/properties')} style={{ cursor: 'pointer' }}>
                    <StatCard title="Total Properties" value={stats.totalProperties} color="#3b82f6" />
                </div>
                <div onClick={() => handleCardClick('/admin/properties/pending')} style={{ cursor: 'pointer' }}>
                    <StatCard title="Pending Properties" value={stats.pendingProperties} color="#fbbf24" />
                </div>
                <div onClick={() => handleCardClick('/admin/properties/approved')} style={{ cursor: 'pointer' }}>
                    <StatCard title="Approved Properties" value={stats.approvedProperties} color="#10b981" />
                </div>
                <div onClick={() => handleCardClick('/admin/properties/live')} style={{ cursor: 'pointer' }}>
                    <StatCard title="Live Properties" value={stats.liveProperties} color="#059669" />
                </div>

                <div onClick={() => handleCardClick('/admin/advisors')} style={{ cursor: 'pointer' }}>
                    <StatCard title="Total Advisors" value={stats.totalAdvisors} color="#8b5cf6" />
                </div>
                {/* Pending Advisors removed as they are auto-approved now */}
                <div onClick={() => handleCardClick('/admin/advisors')} style={{ cursor: 'pointer' }}>
                    <StatCard title="Approved Advisors" value={stats.approvedAdvisors || 0} color="#059669" />
                </div>
                <div onClick={() => handleCardClick('/admin/commissions')} style={{ cursor: 'pointer' }}>
                    <StatCard title="Commissions" value={stats.pendingCommissions || 0} color="#f59e0b" />
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => (
    <div style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardValue}>{value}</p>
    </div>
);

const styles = {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' },
    card: { padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    cardTitle: { fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' },
    cardValue: { fontSize: '2rem', fontWeight: 'bold', color: '#111827' }
};

export default AdminDashboard;
