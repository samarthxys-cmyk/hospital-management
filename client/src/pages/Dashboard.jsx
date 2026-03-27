import React, { useEffect, useState } from 'react';
import Statscard from '../components/Statscard';
import ActivityChart from '../components/Chart';
import './dashboard.css';

const chartDataByRange = {
    week: [
        { label: 'Mon', admissions: 28, discharges: 21, wait: 24 },
        { label: 'Tue', admissions: 32, discharges: 25, wait: 22 },
        { label: 'Wed', admissions: 27, discharges: 23, wait: 20 },
        { label: 'Thu', admissions: 35, discharges: 29, wait: 19 },
        { label: 'Fri', admissions: 38, discharges: 30, wait: 18 },
        { label: 'Sat', admissions: 31, discharges: 24, wait: 21 },
        { label: 'Sun', admissions: 26, discharges: 20, wait: 23 }
    ],
    month: [
        { label: 'Week 1', admissions: 168, discharges: 149, wait: 27 },
        { label: 'Week 2', admissions: 182, discharges: 156, wait: 24 },
        { label: 'Week 3', admissions: 176, discharges: 161, wait: 22 },
        { label: 'Week 4', admissions: 194, discharges: 171, wait: 19 }
    ],
    quarter: [
        { label: 'Jan', admissions: 642, discharges: 598, wait: 29 },
        { label: 'Feb', admissions: 611, discharges: 587, wait: 25 },
        { label: 'Mar', admissions: 688, discharges: 644, wait: 21 }
    ]
};

const statCards = [
    {
        title: 'Live Census',
        value: '1,248',
        icon: 'PT',
        trend: '+6.8%',
        meta: '86% occupancy across inpatient wards',
        color: '#0f766e',
        tone: 'positive'
    },
    {
        title: 'Open Beds',
        value: '42',
        icon: 'BD',
        trend: '7 ICU',
        meta: '2 surgical floors are nearing threshold',
        color: '#d97706',
        tone: 'warning'
    },
    {
        title: 'Scheduled Visits',
        value: '118',
        icon: 'OP',
        trend: '14 next hour',
        meta: '94% of outpatient clinics are on time',
        color: '#2563eb',
        tone: 'neutral'
    },
    {
        title: 'Critical Queue',
        value: '8 cases',
        icon: 'ER',
        trend: '2 trauma',
        meta: 'Average first-response time is 4 minutes',
        color: '#dc2626',
        tone: 'critical'
    }
];

const readinessMetrics = [
    {
        label: 'ER wait',
        value: '18 min',
        note: 'Down 6 minutes from yesterday',
        tone: 'positive'
    },
    {
        label: 'Theatre utilization',
        value: '74%',
        note: '2 operating blocks still open',
        tone: 'neutral'
    },
    {
        label: 'Staff coverage',
        value: '98%',
        note: 'Night shift is fully staffed',
        tone: 'positive'
    },
    {
        label: 'Lab turnaround',
        value: '42 min',
        note: 'Within the 45-minute target',
        tone: 'positive'
    }
];

const alerts = [
    {
        category: 'Capacity',
        title: 'ICU is approaching the escalation threshold',
        detail: 'Only 3 ventilator-ready beds remain before overflow routing begins.',
        tone: 'critical'
    },
    {
        category: 'Pharmacy',
        title: 'Antibiotic replenishment window opens at 17:30',
        detail: 'Ceftriaxone stock drops below the overnight safety target this evening.',
        tone: 'warning'
    },
    {
        category: 'Transport',
        title: 'Early discharge pickups can unlock 8 more beds',
        detail: 'If summaries are signed by 11:00, transport has capacity before lunch.',
        tone: 'positive'
    }
];

const departmentLoad = [
    {
        name: 'Cardiology',
        occupancy: 92,
        patients: 46,
        los: '4.2 days',
        color: '#0f766e'
    },
    {
        name: 'Neurology',
        occupancy: 78,
        patients: 29,
        los: '3.7 days',
        color: '#2563eb'
    },
    {
        name: 'Orthopedics',
        occupancy: 84,
        patients: 34,
        los: '2.9 days',
        color: '#d97706'
    },
    {
        name: 'General Care',
        occupancy: 68,
        patients: 57,
        los: '2.4 days',
        color: '#16a34a'
    }
];

const timeline = [
    {
        time: '09:15',
        title: 'Bed management huddle',
        detail: 'Admissions, nursing, and EVS align on noon turnover targets.'
    },
    {
        time: '11:00',
        title: 'Consultant discharge round',
        detail: '11 patients are ready for medication reconciliation and sign-off.'
    },
    {
        time: '14:30',
        title: 'Surgery block review',
        detail: 'Orthopedics and anesthesia are reallocating one underused operating slot.'
    },
    {
        time: '17:30',
        title: 'Pharmacy replenishment cut-off',
        detail: 'Requests submitted before this window land on the night delivery run.'
    }
];

const rangeLabels = {
    week: '7 days',
    month: '30 days',
    quarter: '90 days'
};

const getGreeting = (hour) => {
    if (hour < 12) {
        return 'Good morning';
    }

    if (hour < 18) {
        return 'Good afternoon';
    }

    return 'Good evening';
};

const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeRange, setActiveRange] = useState('week');

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);

        return () => clearInterval(timer);
    }, []);

    const chartData = chartDataByRange[activeRange];
    const totalAdmissions = chartData.reduce((sum, item) => sum + item.admissions, 0);
    const totalDischarges = chartData.reduce((sum, item) => sum + item.discharges, 0);
    const averageWait = Math.round(
        chartData.reduce((sum, item) => sum + item.wait, 0) / chartData.length
    );
    const formattedTime = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    const formattedDate = currentTime.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
    const greeting = getGreeting(currentTime.getHours());

    return (
        <div className="dashboard-page">
            <section className="dashboard-panel dashboard-hero">
                <div className="hero-copy">
                    <span className="hero-kicker">Hospital command center</span>
                    <h1>{greeting}, care team.</h1>
                    <p>
                        Track patient flow, unit pressure, and today&apos;s operational
                        priorities from one calmer, clearer dashboard.
                    </p>

                    <div className="hero-pill-row">
                        <div className="hero-pill">
                            <span className="hero-pill-label">Today</span>
                            <strong>{formattedDate}</strong>
                        </div>
                        <div className="hero-pill">
                            <span className="hero-pill-label">Last refresh</span>
                            <strong>{formattedTime}</strong>
                        </div>
                        <div className="hero-pill">
                            <span className="hero-pill-label">Inbound ambulances</span>
                            <strong>4 en route</strong>
                        </div>
                    </div>
                </div>

                <div className="hero-status">
                    <div className="hero-highlight">
                        <span className="hero-highlight-label">Bed occupancy</span>
                        <strong>86%</strong>
                        <p>42 staffed beds remain available across 5 wards.</p>
                    </div>

                    <div className="hero-status-grid">
                        <div className="hero-mini-card">
                            <span>Surgery utilization</span>
                            <strong>74%</strong>
                            <p>2 afternoon blocks open</p>
                        </div>
                        <div className="hero-mini-card">
                            <span>Discharge before noon</span>
                            <strong>61%</strong>
                            <p>Up 8 points this week</p>
                        </div>
                        <div className="hero-mini-card">
                            <span>Claims on hold</span>
                            <strong>18</strong>
                            <p>Billing review by 15:00</p>
                        </div>
                        <div className="hero-mini-card">
                            <span>Infection control</span>
                            <strong>All green</strong>
                            <p>No active isolation breaches</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="stats-grid">
                {statCards.map((card) => (
                    <Statscard key={card.title} {...card} />
                ))}
            </div>

            <div className="dashboard-main-grid">
                <section className="dashboard-panel admissions-panel">
                    <div className="panel-header">
                        <div>
                            <span className="panel-kicker">Patient flow</span>
                            <h2>Admissions pulse</h2>
                            <p>
                                See how intake and discharge capacity are moving throughout the
                                selected period.
                            </p>
                        </div>

                        <div className="range-switcher" aria-label="Select admissions range">
                            {Object.entries(rangeLabels).map(([range, label]) => (
                                <button
                                    key={range}
                                    type="button"
                                    className={activeRange === range ? 'active' : ''}
                                    onClick={() => setActiveRange(range)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="chart-stat-row">
                        <div className="chart-stat-card">
                            <span>Total admissions</span>
                            <strong>{totalAdmissions}</strong>
                        </div>
                        <div className="chart-stat-card">
                            <span>Total discharges</span>
                            <strong>{totalDischarges}</strong>
                        </div>
                        <div className="chart-stat-card">
                            <span>Average ER wait</span>
                            <strong>{averageWait} min</strong>
                        </div>
                    </div>

                    <ActivityChart data={chartData} />
                </section>

                <div className="dashboard-side-stack">
                    <section className="dashboard-panel readiness-panel">
                        <div className="panel-header panel-header--tight">
                            <div>
                                <span className="panel-kicker">Operational readiness</span>
                                <h2>Shift health</h2>
                            </div>
                        </div>

                        <div className="readiness-grid">
                            {readinessMetrics.map((metric) => (
                                <div
                                    key={metric.label}
                                    className={`readiness-card readiness-card--${metric.tone}`}
                                >
                                    <span>{metric.label}</span>
                                    <strong>{metric.value}</strong>
                                    <p>{metric.note}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="dashboard-panel alerts-panel">
                        <div className="panel-header panel-header--tight">
                            <div>
                                <span className="panel-kicker">Needs attention</span>
                                <h2>Priority alerts</h2>
                            </div>
                        </div>

                        <ul className="alert-list">
                            {alerts.map((alert) => (
                                <li key={alert.title} className="alert-item">
                                    <span
                                        className={`alert-tone alert-tone--${alert.tone}`}
                                        aria-hidden="true"
                                    />
                                    <div className="alert-copy">
                                        <span className="alert-category">{alert.category}</span>
                                        <strong>{alert.title}</strong>
                                        <p>{alert.detail}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>

            <div className="dashboard-bottom-grid">
                <section className="dashboard-panel capacity-panel">
                    <div className="panel-header panel-header--tight">
                        <div>
                            <span className="panel-kicker">Department load</span>
                            <h2>Where capacity is tightening</h2>
                        </div>
                    </div>

                    <ul className="capacity-list">
                        {departmentLoad.map((department) => (
                            <li key={department.name} className="capacity-item">
                                <div className="capacity-header">
                                    <strong>{department.name}</strong>
                                    <span>{department.occupancy}% occupied</span>
                                </div>
                                <p>
                                    {department.patients} patients | Avg LOS {department.los}
                                </p>
                                <div className="capacity-track" aria-hidden="true">
                                    <div
                                        className="capacity-fill"
                                        style={{
                                            width: `${department.occupancy}%`,
                                            backgroundColor: department.color
                                        }}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="dashboard-panel timeline-panel">
                    <div className="panel-header panel-header--tight">
                        <div>
                            <span className="panel-kicker">Today&apos;s rhythm</span>
                            <h2>Key coordination moments</h2>
                        </div>
                    </div>

                    <ul className="timeline-list">
                        {timeline.map((item) => (
                            <li key={item.time} className="timeline-item">
                                <span className="timeline-time">{item.time}</span>
                                <div className="timeline-copy">
                                    <strong>{item.title}</strong>
                                    <p>{item.detail}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
