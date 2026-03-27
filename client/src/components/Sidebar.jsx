import React from 'react';
import './sidebar.css';

const Sidebar = ({ activePage, setActivePage, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'patients', label: 'Patients', icon: '👥' },
        { id: 'appointments', label: 'Appointments', icon: '📅' },
        { id: 'inventory', label: 'Inventory', icon: '💊' },
        { id: 'billing', label: 'Billing', icon: '💰' },
         { id: 'doctors', label: 'Doctors', icon: '💊' },
        { id: 'staff', label: 'Staff ', icon: '💰' }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-menu">
                {menuItems.map((item) => (
                    <div 
                        key={item.id}
                        className={`menu-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => setActivePage(item.id)}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </div>
                ))}
            </div>
            
            <div className="sidebar-footer">
                <div className="menu-item logout" onClick={onLogout}>
                    <span className="icon">🚪</span>
                    <span className="label">Logout</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;