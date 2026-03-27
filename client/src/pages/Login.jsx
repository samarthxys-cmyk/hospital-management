import React, { useState } from 'react';
import './login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, we simulate a successful login
        // Later, we will connect this to a Node.js/JWT backend
        onLogin();
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="hospital-logo">➕</div>
                    <h2>HMS Portal</h2>
                    <p>Please enter your credentials to continue.</p>
                </div>
                
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="admin@hospital.com" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-options">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#forgot">Forgot Password?</a>
                    </div>
                    
                    <button
                        type="submit"
                        className="login-btn"
                        disabled={!email.trim() || !password.trim()}
                    >
                        Login to Dashboard
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>Security Notice: Authorized Access Only</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
