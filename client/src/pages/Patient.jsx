import React, { useState, useEffect } from 'react';
import PatientTable from '../components/PatientTable';
import './patient.css';

const Patients = () => {
    const backendurl = process.env.REACT_APP_BACKEND_URL;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null); // Track if we are editing
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        contact: ''
    });

    // 1. Fetch Patients
    const fetchPatients = async () => {
        try {
            const response = await fetch(backendurl+'/api/patients');
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    // 2. Delete Patient
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            try {
                const response = await fetch(backendurl+`/api/patients/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) fetchPatients();
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    // 3. Prepare Edit (Open modal with existing data)
    const handleEdit = (patient) => {
        setEditingId(patient._id);
        setFormData({
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            contact: patient.contact
        });
        setIsModalOpen(true);
    };

    // 4. Handle Submit (Create OR Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId 
            ? backendurl+`/api/patients/${editingId}` 
            : backendurl+`/api/patients`;
        
        const method = editingId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData({ name: '', age: '', gender: 'Male', contact: '' });
                fetchPatients();
            }
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

    return (
        <div className="patients-container">
            <div className="patients-header">
                <div>
                    <h1>Patient Directory</h1>
                    <p>Search and manage all hospital records.</p>
                </div>
                <button className="add-patient-btn" onClick={() => {
                    setEditingId(null); // Ensure we're not in edit mode
                    setFormData({ name: '', age: '', gender: 'Male', contact: '' });
                    setIsModalOpen(true);
                }}>
                    + New Registration
                </button>
            </div>

            <div className="management-bar">
                <div className="search-wrapper">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search by name, ID, or phone..." />
                </div>
            </div>

            <div className="table-section">
                {/* Passing delete and edit functions to the table */}
                <PatientTable 
                    patients={patients} 
                    onDelete={handleDelete} 
                    onEdit={handleEdit} 
                />
            </div>

            {isModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-box">
                        <div className="modal-head">
                            <h2>{editingId ? "Update Patient" : "Register Patient"}</h2>
                            <button className="close-x" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                            
                            <div className="form-row">
                                <div className="input-half">
                                    <label>Age</label>
                                    <input 
                                        type="number" 
                                        value={formData.age}
                                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="input-half">
                                    <label>Gender</label>
                                    <select 
                                        value={formData.gender}
                                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                            </div>

                            <label>Contact Number</label>
                            <input 
                                type="tel" 
                                value={formData.contact}
                                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                                required
                            />

                            <button type="submit" className="submit-form-btn">
                                {editingId ? "Update Record" : "Save to Database"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Patients;