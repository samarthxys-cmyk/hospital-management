import React, { useState, useEffect } from 'react';
import './billing.css';

const Billing = () => {
    const backendurl = process.env.REACT_APP_BACKEND_URL;

    const [invoices, setInvoices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        invoiceNumber: '',
        patientName: '',
        serviceType: 'Consultation',
        amount: '',
        method: 'Cash',
        status: 'Unpaid'
    });

    const fetchInvoices = async () => {
        try {
            const response = await fetch(backendurl+'/api/billing');
            const data = await response.json();
            setInvoices(data);
        } catch (error) {
            console.error("Error fetching billing:", error);
        }
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

    // Handle Invoice Creation
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendurl+'/api/billing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchInvoices(); // Refresh the table
                // Reset Form
                setFormData({ 
                    invoiceNumber: '', 
                    patientName: '', 
                    serviceType: 'Consultation', 
                    amount: '', 
                    method: 'Cash', 
                    status: 'Unpaid' 
                });
            }
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

    // Dynamic Calculations
    const totalIncome = invoices
        .filter(i => i.status === 'Paid')
        .reduce((sum, i) => sum + Number(i.amount), 0);
        
    const outstanding = invoices
        .filter(i => i.status !== 'Paid')
        .reduce((sum, i) => sum + Number(i.amount), 0);

    return (
        <div className="billing-page">
            <div className="billing-header">
                <div>
                    <h1>Billing & Invoices</h1>
                    <p>Track payments and hospital revenue.</p>
                </div>
                <button className="generate-btn" onClick={() => setIsModalOpen(true)}>
                    📄 Generate New Invoice
                </button>
            </div>

            <div className="billing-stats">
                <div className="stat-box income">
                    <span>Total Income</span>
                    <h3>${totalIncome.toLocaleString()}</h3>
                </div>
                <div className="stat-box pending">
                    <span>Outstanding</span>
                    <h3>${outstanding.toLocaleString()}</h3>
                </div>
            </div>

            <div className="invoice-table-container">
                <table className="billing-table">
                    <thead>
                        <tr>
                            <th>Invoice id</th>
                            <th>Patient</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv._id}>
                                <td>#{inv.invoiceNumber}</td>
                                <td>{inv.patientName}</td>
                                <td>${inv.amount}</td>
                                <td>{inv.method}</td>
                                <td><span className={`pay-status ${inv.status.toLowerCase()}`}>{inv.status}</span></td>
                                <td><button className="print-btn" onClick={() => window.print()}>Print</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* GENERATE INVOICE MODAL */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Create New Invoice</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Invoice Number</label>
                            <input 
                                type="text" placeholder="e.g. 9905" required 
                                value={formData.invoiceNumber}
                                onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                            />

                            <label>Patient Name</label>
                            <input 
                                type="text" placeholder="Full Name" required 
                                value={formData.patientName}
                                onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                            />

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Amount ($)</label>
                                    <input 
                                        type="number" required 
                                        value={formData.amount}
                                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Method</label>
                                    <select value={formData.method} onChange={(e) => setFormData({...formData, method: e.target.value})}>
                                        <option>Cash</option>
                                        <option>Credit Card</option>
                                        <option>Insurance</option>
                                    </select>
                                </div>
                            </div>

                            <label>Status</label>
                            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                                <option>Unpaid</option>
                                <option>Pending</option>
                                <option>Paid</option>
                            </select>

                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="save-btn">Generate Bill</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Billing;