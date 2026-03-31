import React, { useState, useEffect } from 'react';
import './inventory.css';

const Inventory = () => {
    const backendurl = process.env.REACT_APP_BACKEND_URL;

    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        itemName: '',
        category: 'Medicine',
        quantity: '',
        unit: 'Boxes',
        supplier: ''
    });

    const fetchInventory = async () => {
        try {
            const response = await fetch(backendurl+'/api/inventory');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error loading inventory:", error);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendurl+'/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsModalOpen(false); // Close modal
                fetchInventory(); // Refresh table
                setFormData({ itemName: '', category: 'Medicine', quantity: '', unit: 'Boxes', supplier: '' }); // Reset
            }
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

    // Stats calculation
    const totalItems = items.length;
    const lowStockCount = items.filter(i => i.status === 'Low Stock').length;
    const outOfStockCount = items.filter(i => i.status === 'Out of Stock').length;

    return (
        <div className="inventory-page">
            <div className="inventory-header">
                <div>
                    <h1>Hospital Inventory</h1>
                    <p>Track medical supplies and equipment levels.</p>
                </div>
                <button className="add-item-btn" onClick={() => setIsModalOpen(true)}>
                    + Add New Item
                </button>
            </div>

            {/* Summary Cards */}
            <div className="inventory-summary">
                <div className="summary-card total"><span>Total Types</span><h3>{totalItems}</h3></div>
                <div className="summary-card low"><span>Low Stock</span><h3>{lowStockCount}</h3></div>
                <div className="summary-card out"><span>Out of Stock</span><h3>{outOfStockCount}</h3></div>
            </div>

            {/* Table */}
            <div className="inventory-table-container">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Stock Level</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? items.map((item) => (
                            <tr key={item._id}>
                                <td className="name-cell" data-label="Item Name">{item.itemName}</td>
                                <td data-label="Category"><span className="category-tag">{item.category}</span></td>
                                <td data-label="Stock Level">{item.quantity} {item.unit}</td>
                                <td data-label="Status">
                                    <span className={`stock-status ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td data-label="Actions"><button type="button" className="stock-btn">Update</button></td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No inventory items added yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ADD ITEM MODAL */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Add Inventory Item</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Item Name</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.itemName}
                                onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                            />

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                        <option>Medicine</option>
                                        <option>PPE</option>
                                        <option>Equipment</option>
                                        <option>Surgical</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input 
                                        type="number" 
                                        required 
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                                    />
                                </div>
                            </div>

                            <label>Supplier</label>
                            <input 
                                type="text" 
                                value={formData.supplier}
                                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                            />

                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="save-btn">Save Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
