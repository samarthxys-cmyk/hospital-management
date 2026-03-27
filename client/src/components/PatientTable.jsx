import React from 'react';
import './patienttable.css';

// 1. Accept 'patients' as a prop
const PatientTable = ({ patients = [], onDelete }) => { // 1. Add onDelete prop
    
    return (
        <div className="table-wrapper">
            {/* ... title area stays same ... */}
            <table className="patient-table">
                {/* ... thead stays same ... */}
                <tbody>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <tr key={patient._id}>
                                <td className="id-col">#{patient._id.slice(-4).toUpperCase()}</td>
                                <td className="name-col">{patient.name}</td>
                                <td>{patient.age} / {patient.gender}</td>
                                <td>{patient.contact}</td>
                                <td className="status-col">
                                    <span className={`badge admitted`}>Admitted</span>
                                </td>
                                <td>
                                    {/* 2. Call onDelete when clicked */}
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => onDelete(patient._id)}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#e74c3c' }}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="6">No patients found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PatientTable;