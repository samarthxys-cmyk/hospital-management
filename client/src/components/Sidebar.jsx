import React from 'react';
import './sidebar.css';

const Sidebar = ({ activePage, onNavigate, onLogout, onClose, isSidebarOpen }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'DB' },
        { id: 'patients', label: 'Patients', icon: 'PT' },
        { id: 'appointments', label: 'Appointments', icon: 'AP' },
        { id: 'inventory', label: 'Inventory', icon: 'IV' },
        { id: 'billing', label: 'Billing', icon: 'BL' },
        { id: 'doctors', label: 'Doctors', icon: 'DR' },
        { id: 'staff', label: 'Staff', icon: 'SF' }
    ];

    return (
        <aside
            id="app-sidebar"
            className={`sidebar ${isSidebarOpen ? 'is-open' : ''}`}
        >
            <div className="sidebar-mobile-head">
                <span className="sidebar-mobile-title">Navigation</span>
                <button
                    type="button"
                    className="sidebar-close-btn"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>

            <div className="sidebar-menu">
                {menuItems.map((item) => (
                    <button
                        type="button"
                        key={item.id}
                        className={`menu-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </button>
                ))}
            </div>

            <div className="sidebar-footer">
                <button type="button" className="menu-item logout" onClick={onLogout}>
                    <span className="icon">LO</span>
                    <span className="label">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
