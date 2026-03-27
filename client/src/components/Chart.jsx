import React from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const labelMap = {
    admissions: 'Admissions',
    discharges: 'Discharges'
};

const ActivityChart = ({ data = [] }) => {
    return (
        <div className="admissions-chart">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 16, left: -14, bottom: 0 }}>
                    <defs>
                        <linearGradient id="admissionsFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0f766e" stopOpacity={0.32} />
                            <stop offset="95%" stopColor="#0f766e" stopOpacity={0.03} />
                        </linearGradient>
                        <linearGradient id="dischargesFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.03} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        vertical={false}
                        stroke="#d8e3de"
                        strokeDasharray="4 4"
                    />
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#5f6f69', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#5f6f69', fontSize: 12 }}
                        width={38}
                    />
                    <Tooltip
                        contentStyle={{
                            border: '1px solid #dbe7e1',
                            borderRadius: '16px',
                            boxShadow: '0 14px 35px rgba(16, 24, 40, 0.12)',
                            backgroundColor: '#ffffff'
                        }}
                        labelStyle={{
                            color: '#102019',
                            fontWeight: 700,
                            marginBottom: 8
                        }}
                        formatter={(value, name) => [value, labelMap[name] || name]}
                    />
                    <Area
                        type="monotone"
                        dataKey="discharges"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        fill="url(#dischargesFill)"
                        fillOpacity={1}
                    />
                    <Area
                        type="monotone"
                        dataKey="admissions"
                        stroke="#0f766e"
                        strokeWidth={3}
                        fill="url(#admissionsFill)"
                        fillOpacity={1}
                        activeDot={{ r: 5, strokeWidth: 0, fill: '#0f766e' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActivityChart;
