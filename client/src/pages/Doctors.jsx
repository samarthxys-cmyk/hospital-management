import React, { useState, useEffect } from 'react';
import './doctor.css';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    // Change this line
    const backendurl = process.env.REACT_APP_BACKEND_URL;

    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        specialization: 'General',
        email: '',
        phone: '',
        status: 'Available',
        workingHours: '',
        workingDate: ''
    });

    // 1. Fetch Doctors from MongoDB
    const fetchDoctors = async () => {
        try {
            const response = await fetch(backendurl+'/api/doctors');
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error("Error loading doctors:", error);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchDoctors(); }, [fetchDoctors]);

    // 2. Handle Add Doctor Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendurl+'/api/doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsModalOpen(false); // Close Modal
                fetchDoctors(); // Refresh table
                // Reset form
                setFormData({ name: '', specialization: 'General', email: '', phone: '', status: 'Available' });
            }
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    // 3. Handle View Details
    const handleViewDetails = (doctor) => {
        setSelectedDoctor(doctor);
        setIsDetailsModalOpen(true);
    };

    return (
        <div className="doctors-page">
            <div className="doctors-header">
                <div>
                    <h1>Doctor Directory</h1>
                    <p>View medical specialists and current availability.</p>
                </div>
                <button className="add-doc-btn" onClick={() => setIsModalOpen(true)}>
                    + Register Doctor
                </button>
            </div>

            <div className="doc-table-container">
                <table className="doc-table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Specialization</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.length > 0 ? doctors.map((doc) => (
                            <tr key={doc._id}>
                                <td className="doc-name-cell" data-label="Doctor">
                                    {/* Using first letter of name for the icon */}
                                    <div className="doc-img">{doc.name.split(' ').pop().charAt(0)}</div>
                                    {doc.name}
                                </td>
                                <td data-label="Specialization"><span className="spec-tag">{doc.specialization}</span></td>
                                <td data-label="Contact">{doc.phone}</td>
                                <td data-label="Status">
                                    <span className={`status-pill ${doc.status.toLowerCase().replace(/\s+/g, '')}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td data-label="Action"><button type="button" className="view-sch" onClick={() => handleViewDetails(doc)}>View Details</button></td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No doctors registered yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* REGISTER DOCTOR MODAL */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Register New Doctor</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Full Name</label>
                            <input 
                                type="text" placeholder="e.g. Dr. James Smith" required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Specialization</label>
                                    <input 
                                        type="text" required placeholder="e.g. Cardiology"
                                        value={formData.specialization}
                                        onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                                        <option>Available</option>
                                        <option>In Surgery</option>
                                        <option>Off-Duty</option>
                                    </select>
                                </div>
                            </div>

                            <label>Email Address</label>
                            <input 
                                type="email" required 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />

                            <label>Phone Number</label>
                            <input 
                                type="text" required 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Working Hours</label>
                                    <input 
                                        type="text" placeholder="e.g. 9:00 AM - 5:00 PM"
                                        value={formData.workingHours}
                                        onChange={(e) => setFormData({...formData, workingHours: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Working Date</label>
                                    <input 
                                        type="date"
                                        value={formData.workingDate}
                                        onChange={(e) => setFormData({...formData, workingDate: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="save-btn">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DOCTOR DETAILS MODAL */}
            {isDetailsModalOpen && selectedDoctor && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Doctor Details</h2>
                        <div className="doctor-details">
                            <div className="detail-row">
                                <strong>Name:</strong> {selectedDoctor.name}
                            </div>
                            <div className="detail-row">
                                <strong>Specialization:</strong> {selectedDoctor.specialization}
                            </div>
                            <div className="detail-row">
                                <strong>Email:</strong> {selectedDoctor.email}
                            </div>
                            <div className="detail-row">
                                <strong>Phone:</strong> {selectedDoctor.phone}
                            </div>
                            <div className="detail-row">
                                <strong>Working Hours:</strong> {selectedDoctor.workingHours || 'Not specified'}
                            </div>
                            <div className="detail-row">
                                <strong>Working Date:</strong> {selectedDoctor.workingDate || 'Not specified'}
                            </div>
                            <div className="detail-row">
                                <strong>Status:</strong> 
                                <span className={`status-pill ${selectedDoctor.status.toLowerCase().replace(/\s+/g, '')}`}>
                                    {selectedDoctor.status}
                                </span>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="cancel-btn" onClick={() => setIsDetailsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doctors;
