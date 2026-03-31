import React from 'react';
import './patienttable.css';

// 1. Accept 'patients' as a prop
const PatientTable = ({ patients = [], onDelete }) => { // 1. Add onDelete prop
    
    return (
        <div className="table-wrapper">
            <table className="patient-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age / Gender</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <tr key={patient._id}>
                                <td className="id-col" data-label="ID">#{patient._id.slice(-4).toUpperCase()}</td>
                                <td className="name-col" data-label="Name">{patient.name}</td>
                                <td data-label="Age / Gender">{patient.age} / {patient.gender}</td>
                                <td data-label="Contact">{patient.contact}</td>
                                <td className="status-col" data-label="Status">
                                    <span className={`badge admitted`}>Admitted</span>
                                </td>
                                <td data-label="Actions">
                                    {/* 2. Call onDelete when clicked */}
                                    <button 
                                        type="button"
                                        className="delete-btn" 
                                        onClick={() => onDelete(patient._id)}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : <tr><td colSpan="6">No patients found.</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default PatientTable;
