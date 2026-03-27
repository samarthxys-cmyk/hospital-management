import React, { useState, useEffect } from 'react';
import './appoiment.css';

const Appointments = () => {
    const backendurl = process.env.REACT_APP_BACKEND_URL;

    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [formData, setFormData] = useState({
        patientName: '', // Matches Backend Schema
        doctorName: 'Dr. Smith',
        date: '',
        time: '',
        reason: 'Checkup'
    });

    // 1. Fetch Appointments from Backend
    const fetchAppointments = async () => {
        try {
            const response = await fetch(backendurl+'/api/appointments');
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // 2. Handle Save to MongoDB
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendurl+'/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowModal(false);
                fetchAppointments(); // Refresh list
                setFormData({ patientName: '', doctorName: 'Dr. Smith', date: '', time: '', reason: 'Checkup' });
            }
        } catch (error) {
            console.error("Save error:", error);
        }
    };

    // 3. Delete Appointment
    const handleDelete = async (id) => {
        if(window.confirm("Cancel this appointment?")) {
            await fetch(backendurl+`/api/appointments/${id}`, { method: 'DELETE' });
            fetchAppointments();
        }
    }

    return (
        <div className="appt-page">
            <div className="appt-header">
                <div>
                    <h1>Doctor Appointments</h1>
                    <p>Manage and track patient schedules.</p>
                </div>
                <button className="book-btn" onClick={() => setShowModal(true)}>+ Book Appointment</button>
            </div>

            <div className="appt-table-container">
                <table className="appt-table">
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? appointments.map((appt) => (
                            <tr key={appt._id}>
                                <td className="time-cell">
                                    <strong>{appt.date}</strong> <br />
                                    <small>{appt.time}</small>
                                </td>
                                <td>{appt.patientName}</td>
                                <td>{appt.doctorName}</td>
                                <td>
                                    <span className={`status-dot ${appt.status.toLowerCase()}`}>
                                        {appt.status}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(appt._id)} className="delete-icon">🗑️</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No appointments scheduled.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Book New Appointment</h2>
                        <form onSubmit={handleSave}>
                            <label>Patient Name</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.patientName}
                                onChange={(e) => setFormData({...formData, patientName: e.target.value})} 
                            />
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="date" required onChange={(e) => setFormData({...formData, date: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label>Time</label>
                                    <input type="time" required onChange={(e) => setFormData({...formData, time: e.target.value})} />
                                </div>
                            </div>

                            <label>Doctor</label>
                            <select value={formData.doctorName} onChange={(e) => setFormData({...formData, doctorName: e.target.value})}>
                                <option>Dr. Smith</option>
                                <option>Dr. Adams</option>
                                <option>Dr. Taylor</option>
                            </select>

                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="save-btn">Confirm Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;