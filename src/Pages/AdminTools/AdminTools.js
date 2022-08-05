import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./AdminTools.css";

function AdminTools() {
    let navigate = useNavigate();
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
          <div className="feature"><button onClick={() => {navigate("/ManageAccount")}} className="manage-account">Manage Account</button></div>
          <div className="feature"><button onClick={() => {navigate("/AddKafkaTopic")}} className="new-kafkatopic">Add New Kafka Topic</button></div>
          <div className="feature"><button className="set-threshold">Set Threshold</button></div>
        </div>
      </div>
    </div>
  );
}

export default AdminTools;
