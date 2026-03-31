import React, { useState } from 'react';
import img from '../img/1000_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg';
import img2 from '../img/Gemini_Generated_Image_knhtgfknhtgfknht.png';
import './navbar.css';

const Navbar = ({ onLogout, onMenuToggle, isSidebarOpen }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim()) {
            
            console.log('Searching for:', searchTerm);
            alert(`Searching for: ${searchTerm}`);
        }
    };

    const handleLogout = () => {
        if (onLogout) onLogout();
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button
                    type="button"
                    className="nav-menu-btn"
                    onClick={onMenuToggle}
                    aria-controls="app-sidebar"
                    aria-expanded={isSidebarOpen}
                    aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                    Menu
                </button>
                <img src={img2} className="logo" alt="Hospital logo" />
            </div>
            
            <div className="navbar-center">
                <div className="search-container">
                    <input 
                        type="text" 
                        aria-label="Search patients and records"
                        placeholder="Search patients, records..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button type="button" className="search-btn" onClick={handleSearch}>🔍</button>
                </div>
            </div>

            <div className="navbar-right">
                <div className="notification-icon" aria-label="Notifications">
                    🔔 <span className="badgeid">3</span>
                </div>
                <div className="user-profile">
                    <img src={img} alt="Admin" className="avatar" />
                    <div className="user-info">
                        <span className="user-name">Dr. Alexander</span>
                        <span className="user-role">Administrator</span>
                    </div>
                </div>
                <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
