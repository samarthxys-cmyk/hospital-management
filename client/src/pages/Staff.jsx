import React, { useState, useEffect } from 'react';
import './staff.css';

const Staff = () => {
    const backendurl = process.env.REACT_APP_BACKEND_URL;

    const [staffList, setStaffList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        role: 'Nurse',
        dept: 'Emergency',
        shift: 'Day',
        phone: ''
    });

    // 1. Fetch Staff from Backend
    const fetchStaff = async () => {
        try {
            const response = await fetch(backendurl+'/api/staff');
            const data = await response.json();
            setStaffList(data);
        } catch (error) {
            console.error("Error loading staff:", error);
        }
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchStaff(); }, [fetchStaff]);

    // 2. Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendurl+'/api/staff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchStaff(); // Refresh the grid
                setFormData({ name: '', role: 'Nurse', dept: 'Emergency', shift: 'Day', phone: '' });
            }
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    return (
        <div className="staff-page">
            <div className="staff-header">
                <div>
                    <h1>Staff Management</h1>
                    <p>Manage hospital employees, roles, and shifts.</p>
                </div>
                <button className="add-staff-btn" onClick={() => setIsModalOpen(true)}>
                    + Add Staff Member
                </button>
            </div>

            <div className="staff-grid">
                {staffList.map((member) => (
                    <div className="staff-card" key={member._id}>
                        <div className="staff-avatar">{member.name.charAt(0)}</div>
                        <div className="staff-info">
                            <h3>{member.name}</h3>
                            <span className="staff-role">{member.role}</span>
                            <p><strong>Dept:</strong> {member.dept}</p>
                            <p><strong>Shift:</strong> {member.shift}</p>
                        </div>
                        <div className="staff-actions">
                            <button className="msg-btn">💬</button>
                            <button className="edit-btn">✏️</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ADD STAFF MODAL */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Register New Staff</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Full Name</label>
                            <input 
                                type="text" placeholder="Employee Name" required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Role</label>
                                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                                        <option>Nurse</option>
                                        <option>Technician</option>
                                        <option>Receptionist</option>
                                        <option>Pharmacist</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Shift</label>
                                    <select value={formData.shift} onChange={(e) => setFormData({...formData, shift: e.target.value})}>
                                        <option>Day</option>
                                        <option>Night</option>
                                        <option>Rotational</option>
                                    </select>
                                </div>
                            </div>

                            <label>Department</label>
                            <input 
                                type="text" placeholder="e.g. Radiology" required 
                                value={formData.dept}
                                onChange={(e) => setFormData({...formData, dept: e.target.value})}
                            />

                            <label>Phone Number</label>
                            <input 
                                type="text" placeholder="555-0100" required 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />

                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="save-btn">Add Staff</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Staff;