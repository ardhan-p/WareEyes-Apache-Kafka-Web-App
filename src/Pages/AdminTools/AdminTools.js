import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./AdminTools.css";

function AdminTools() {
  return (
    <div className="admin-page">
      <Sidebar />
      <div className="admin-container">
        <Navbar />
        <div className="welcome-msg">
          AdminTools{" "}
          <AdminPanelSettingsIcon fontSize="large" className="admin-icon" />
        </div>
        <div className="feature-container">
          <div className="feature">Manage Accounts</div>
          <div className="feature">Add New Kafka Topic</div>
          <div className="feature">Set Threshold</div>
        </div>
      </div>
    </div>
  );
}

export default AdminTools;
