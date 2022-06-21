import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "./Settings.css";

function Settings() {
  return (
    <div className="setting-page">
      <Sidebar />
      <div className="setting-container">
        <Navbar />
        <div className="welcome-msg">Settings</div>
        {/* <div className="charts">
        <Chart />
      </div> */}
      </div>
    </div>
  );
}

export default Settings;
