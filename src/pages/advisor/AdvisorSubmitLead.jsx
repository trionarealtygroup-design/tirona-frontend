import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../config';

const AdvisorSubmitLead = () => {
    const [activeTab, setActiveTab] = useState('sell');
    const [message, setMessage] = useState('');

    // Sell Lead Form State
    const [sellForm, setSellForm] = useState({
        ownerName: '',
        ownerMobile: '',
        propertyType: 'Plot',
        location: '',
        expectedPrice: '',
        propertyDescription: '',
        propertyImages: [],
        // Dynamic fields
        plotAreaSize: '',
        plotFacing: '',
        plotType: '',
        flatBHK: '',
        flatFloor: '',
        totalFloors: '',
        carpetArea: '',
        houseBuiltUpArea: '',
        houseFloors: ''
    });

    // Buy Lead Form State
    const [buyForm, setBuyForm] = useState({
        buyerName: '',
        buyerEmail: '',
        buyerPhone: '',
        buyerWhatsapp: '',
        interestedPropertyType: '',
        budgetRange: '',
        preferredLocation: '',
        notes: ''
    });

    const handleSellChange = (e) => {
        setSellForm({ ...sellForm, [e.target.name]: e.target.value });
    };

    const handleBuyChange = (e) => {
        setBuyForm({ ...buyForm, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setSellForm({ ...sellForm, propertyImages: imageUrls });
    };

    const handleSellSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            const payload = {
                ownerName: sellForm.ownerName,
                ownerMobile: sellForm.ownerMobile,
                propertyType: sellForm.propertyType,
                location: sellForm.location,
                expectedPrice: parseFloat(sellForm.expectedPrice),
                propertyDescription: sellForm.propertyDescription,
                propertyImages: sellForm.propertyImages,
                ...(sellForm.propertyType === 'Plot' && {
                    plotAreaSize: sellForm.plotAreaSize,
                    plotFacing: sellForm.plotFacing,
                    plotType: sellForm.plotType
                }),
                ...(sellForm.propertyType === 'Flat' && {
                    flatBHK: sellForm.flatBHK,
                    flatFloor: sellForm.flatFloor,
                    totalFloors: sellForm.totalFloors,
                    carpetArea: sellForm.carpetArea
                }),
                ...(sellForm.propertyType === 'House' && {
                    houseBuiltUpArea: sellForm.houseBuiltUpArea,
                    houseFloors: sellForm.houseFloors
                })
            };

            await axios.post(`${API_URL}/leads/sell`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Sell lead submitted successfully!');
            setSellForm({
                ownerName: '', ownerMobile: '', propertyType: 'Plot', location: '',
                expectedPrice: '', propertyDescription: '', propertyImages: [],
                plotAreaSize: '', plotFacing: '', plotType: '',
                flatBHK: '', flatFloor: '', totalFloors: '', carpetArea: '',
                houseBuiltUpArea: '', houseFloors: ''
            });
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Error submitting sell lead');
        }
    };

    const handleBuySubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/leads/buy`, buyForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Buy lead submitted successfully!');
            setBuyForm({
                buyerName: '', buyerEmail: '', buyerPhone: '', buyerWhatsapp: '',
                interestedPropertyType: '', budgetRange: '', preferredLocation: '', notes: ''
            });
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Error submitting buy lead');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Submit New Lead</h2>
            {message && <p style={styles.message}>{message}</p>}
            
            <div style={styles.tabs}>
                <button
                    onClick={() => setActiveTab('sell')}
                    style={{ ...styles.tab, ...(activeTab === 'sell' ? styles.activeTab : {}) }}
                >
                    SELL Property
                </button>
                <button
                    onClick={() => setActiveTab('buy')}
                    style={{ ...styles.tab, ...(activeTab === 'buy' ? styles.activeTab : {}) }}
                >
                    BUY Property
                </button>
            </div>

            {activeTab === 'sell' ? (
                <form onSubmit={handleSellSubmit} style={styles.form}>
                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label>Owner Name *</label>
                            <input type="text" name="ownerName" value={sellForm.ownerName} onChange={handleSellChange} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label>Mobile Number *</label>
                            <input type="tel" name="ownerMobile" value={sellForm.ownerMobile} onChange={handleSellChange} required style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label>Property Type *</label>
                        <select name="propertyType" value={sellForm.propertyType} onChange={handleSellChange} required style={styles.input}>
                            <option value="Plot">Plot</option>
                            <option value="Flat">Flat</option>
                            <option value="House">House</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Land">Land</option>
                            <option value="Bungalow">Bungalow</option>
                            <option value="Villa">Villa</option>
                        </select>
                    </div>

                    {/* Dynamic Fields for Plot */}
                    {sellForm.propertyType === 'Plot' && (
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label>Area Size</label>
                                <input type="text" name="plotAreaSize" value={sellForm.plotAreaSize} onChange={handleSellChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Facing</label>
                                <input type="text" name="plotFacing" value={sellForm.plotFacing} onChange={handleSellChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Plot Type</label>
                                <input type="text" name="plotType" value={sellForm.plotType} onChange={handleSellChange} style={styles.input} />
                            </div>
                        </div>
                    )}

                    {/* Dynamic Fields for Flat */}
                    {sellForm.propertyType === 'Flat' && (
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label>BHK</label>
                                <input type="text" name="flatBHK" value={sellForm.flatBHK} onChange={handleSellChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Floor</label>
                                <input type="text" name="flatFloor" value={sellForm.flatFloor} onChange={handleSellChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Total Floors</label>
                                <input type="text" name="totalFloors" value={sellForm.totalFloors} onChange={handleSellChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Carpet Area</label>
                                <input type="text" name="carpetArea" value={sellForm.carpetArea} onChange={handleSellChange} style={styles.input} />
                            </div>
                        </div>
                    )}

                    {/* Dynamic Fields for House */}
                    {sellForm.propertyType === 'House' && (
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label>Built Up Area</label>
                                <input type="text" name="houseBuiltUpArea" value={sellForm.houseBuiltUpArea} onChange={handleSellChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Floors</label>
                                <input type="text" name="houseFloors" value={sellForm.houseFloors} onChange={handleSellChange} style={styles.input} />
                            </div>
                        </div>
                    )}

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label>Location *</label>
                            <input type="text" name="location" value={sellForm.location} onChange={handleSellChange} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label>Expected Selling Price *</label>
                            <input type="number" name="expectedPrice" value={sellForm.expectedPrice} onChange={handleSellChange} required style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label>Property Description *</label>
                        <textarea name="propertyDescription" value={sellForm.propertyDescription} onChange={handleSellChange} required style={{ ...styles.input, minHeight: '100px' }} />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Property Images (Max 5)</label>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} style={styles.input} />
                    </div>

                    <button type="submit" style={styles.button}>Submit Sell Lead</button>
                </form>
            ) : (
                <form onSubmit={handleBuySubmit} style={styles.form}>
                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label>Buyer Name *</label>
                            <input type="text" name="buyerName" value={buyForm.buyerName} onChange={handleBuyChange} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label>Email *</label>
                            <input type="email" name="buyerEmail" value={buyForm.buyerEmail} onChange={handleBuyChange} required style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label>Phone Number *</label>
                            <input type="tel" name="buyerPhone" value={buyForm.buyerPhone} onChange={handleBuyChange} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label>WhatsApp Number *</label>
                            <input type="tel" name="buyerWhatsapp" value={buyForm.buyerWhatsapp} onChange={handleBuyChange} required style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label>Property Type Interested In *</label>
                            <input type="text" name="interestedPropertyType" value={buyForm.interestedPropertyType} onChange={handleBuyChange} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label>Budget Range *</label>
                            <input type="text" name="budgetRange" value={buyForm.budgetRange} onChange={handleBuyChange} required style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label>Preferred Location *</label>
                        <input type="text" name="preferredLocation" value={buyForm.preferredLocation} onChange={handleBuyChange} required style={styles.input} />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Notes</label>
                        <textarea name="notes" value={buyForm.notes} onChange={handleBuyChange} style={{ ...styles.input, minHeight: '100px' }} />
                    </div>

                    <button type="submit" style={styles.button}>Submit Buy Lead</button>
                </form>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    tabs: { display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #e5e7eb' },
    tab: { padding: '0.75rem 1.5rem', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '16px', fontWeight: '600', color: '#6b7280', borderBottom: '2px solid transparent', marginBottom: '-2px' },
    activeTab: { color: '#0b3c91', borderBottomColor: '#0b3c91' },
    form: { maxWidth: '800px' },
    formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' },
    formGroup: { marginBottom: '1.5rem' },
    label: { display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' },
    input: { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' },
    button: { padding: '0.75rem 2rem', backgroundColor: '#0b3c91', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
    message: { padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', backgroundColor: '#d1fae5', color: '#065f46' }
};

export default AdvisorSubmitLead;
