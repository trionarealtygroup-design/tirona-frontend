import React from 'react';
import Navbar from '../../components/Navbar';

const RefundPolicy = () => {
    return (
        <>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#111' }}>Refund & Cancellation Policy</h1>

                <div style={{ lineHeight: '1.6', color: '#444' }}>
                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>1. Registration Fee Policy </h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Registration fees are charged for onboarding, system access, training structure, and participation in the TRIONA business model.</li>
                        <li>Registration provides access to platform features, backend support, and commission structure.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>2. Refund Policy - Non-Refundable Clause</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Registration fees are generally non-refundable.</li>
                        <li>No refund will be provided for change of mind, Lack of performance, failure to submit leads, unrealistic income expectations, or policy violations.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>3. Exceptional Refund Situations</h2>

                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Duplicate Payment made accidentally.</li>
                        <li>Technical error resulting in incorrect paymet processing.</li>
                        <li>Payment deducted but registration not actiated.</li>
                        <li>Refund approval is at the sole discretion of TRIONA Realty Group Managment.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>4. Refund Request Process</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Email refund request to: trionarealtygroup@gmail.com.</li>
                        <li>Include Full Name, Registered Mobile Number, Transaction ID, and Reason for refund.</li>
                        <li>Refund request must be submitted within 7 days of pament date.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>5. Refund Processing Time</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Approved refunds will be processed within 7-14 working days.</li>
                        <li>Refund will be credited to the original payment source.</li>
                        <li>Company is not responsible for banking or gateway delays.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>6. Cancellation Policy</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Advisors may request account cancellation via email.</li>
                        <li>Cancellation does not guarantee refund.</li>
                        <li>Eligible earned commission if any will be processed as per payment schedule.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>7. Termination by Company</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Company reserves the right to suspend or terminate accounts for policy vioaltions.</li>
                        <li>Registration fee will not be refunded in such cases.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>8. Policy Modification</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>TRIONA Realty Group reserve the right to modify this policy at any time.</li>
                        <li>Updated policy will be published on www.triona.in.</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', color: '#0b3c91', marginTop: '20px' }}>9. Contact Information</h2>
                    <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                        <li>Email:trionarealtygroup@gmail.com</li>
                        <li>Website: www.triona.in</li>

                    </ul>

                </div>
            </div>
        </>
    );
};

export default RefundPolicy;
