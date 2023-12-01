// src/components/admin/dashboard/Dashboard.jsx

import React from 'react';
import Sidebar from '../Sidebar';
import '../styles.css'; // Import your custom styles here

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>

                <div className="col-md-10 p-4">
                    <h1>Admin Dashboard</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
