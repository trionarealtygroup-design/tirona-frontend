import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication on mount
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear all admin auth state
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <h2 style={styles.logo}>TRIONA Admin</h2>
                <nav>
                    <ul style={styles.navList}>
                        <li><NavLink to="/admin/dashboard" style={styles.link}>Dashboard</NavLink></li>
                        <li><NavLink to="/admin/advisors" style={styles.link}>Advisors</NavLink></li>
                        <li><NavLink to="/admin/advisor-verification" style={styles.link}>Advisor Verification</NavLink></li>
                        <li><NavLink to="/admin/leads" style={styles.link}>Leads</NavLink></li>
                        <li><NavLink to="/admin/properties" style={styles.link}>Properties</NavLink></li>
                        <li><NavLink to="/admin/change-password" style={styles.link}>Change Password</NavLink></li>
                    </ul>
                </nav>
                <div style={styles.footer}>
                    <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                </div>
            </aside>
            <main style={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};

const styles = {
    container: { display: 'flex', height: '100vh' },
    sidebar: { width: '250px', backgroundColor: '#1f2937', color: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column' },
    logo: { marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' },
    navList: { listStyle: 'none', padding: 0 },
    link: {
        display: 'block',
        padding: '0.75rem',
        color: '#d1d5db',
        textDecoration: 'none',
        marginBottom: '0.5rem',
        borderRadius: '4px',
        transition: 'all 0.3s'
    },
    footer: { marginTop: 'auto' },
    logoutBtn: { width: '100%', padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    main: { flex: 1, padding: '2rem', backgroundColor: '#f9fafb', overflowY: 'auto' },
};

export default AdminLayout;
