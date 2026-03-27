import React from 'react';
import './statcard.css';

const StatsCard = ({ title, value, icon, trend, color, meta, tone = 'neutral' }) => {
    return (
        <article className="stat-card" style={{ '--card-accent': color }}>
            <div className="stat-card-header">
                <span className="stat-title">{title}</span>
                <span
                    className="stat-icon"
                    style={{ backgroundColor: `${color}18`, color }}
                    aria-hidden="true"
                >
                    {icon}
                </span>
            </div>

            <div className="stat-card-metric">
                <h2 className="stat-value">{value}</h2>
                {trend ? <span className={`stat-trend stat-trend--${tone}`}>{trend}</span> : null}
            </div>

            {meta ? <p className="stat-meta">{meta}</p> : null}
        </article>
    );
};

export default StatsCard;
