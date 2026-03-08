import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdvisorLogin from './pages/AdvisorLogin';
import AdvisorRegister from './pages/advisor/AdvisorRegister';
import AdvisorDashboard from './pages/AdvisorDashboard';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Contact from './pages/Contact';

// Policy pages
import AdvisorAgreement from './pages/policies/AdvisorAgreement';
import TermsConditions from './pages/policies/TermsConditions';
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import RefundPolicy from './pages/policies/RefundPolicy';
import AboutUs from './pages/policies/AboutUs';

// Buyer/Seller pages
import BuyerLogin from './pages/BuyerLogin';
import BuyerRegister from './pages/BuyerRegister';
import SellerLogin from './pages/SellerLogin';
import SellerRegister from './pages/SellerRegister';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAdvisors from './pages/admin/AdminAdvisors';
import AdminLeads from './pages/admin/AdminLeads';
import PendingProperties from './pages/admin/PendingProperties';
import ApprovedProperties from './pages/admin/ApprovedProperties';
import AdminEditProperty from './pages/admin/AdminEditProperty';
import LiveProperties from './pages/admin/LiveProperties';
import AdminChangePassword from './pages/admin/AdminChangePassword';
import AdminCommissions from './pages/admin/AdminCommissions';
import AdminAllProperties from './pages/admin/AdminAllProperties';
import AdminAdvisorDetails from './pages/admin/AdminAdvisorDetails';
import AdminAdvisorVerification from './pages/admin/AdminAdvisorVerification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<Contact />} />

        {/* Policy Routes */}
        <Route path="/advisor-agreement" element={<AdvisorAgreement />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Advisor Routes */}
        <Route path="/advisor/login" element={<AdvisorLogin />} />
        <Route path="/advisor/register" element={<AdvisorRegister />} />
        <Route path="/advisor/dashboard" element={<AdvisorDashboard />} />

        {/* Buyer Routes */}
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/buyer/register" element={<BuyerRegister />} />

        {/* Seller Routes */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/register" element={<SellerRegister />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="advisors" element={<AdminAdvisors />} />
          <Route path="advisor-verification" element={<AdminAdvisorVerification />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="properties" element={<AdminAllProperties />} />
          <Route path="properties/pending" element={<PendingProperties />} />
          <Route path="properties/approved" element={<ApprovedProperties />} />
          <Route path="properties/live" element={<LiveProperties />} />
          <Route path="properties/:id" element={<AdminEditProperty />} />
          <Route path="advisors/:id" element={<AdminAdvisorDetails />} />
          <Route path="change-password" element={<AdminChangePassword />} />
          <Route path="commissions" element={<AdminCommissions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
