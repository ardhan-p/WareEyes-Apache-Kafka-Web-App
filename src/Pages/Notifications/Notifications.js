import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "./Notifications.css";

function Notifications() {
  return (
    <div className="notification-log">
      <Sidebar />
      <div className="notification-container">
        <Navbar />
        <div className="welcome-msg">Notifications</div>
        {/* <div className="charts">
        <Chart />
      </div> */}
      </div>
    </div>
  );
}

export default Notifications;
