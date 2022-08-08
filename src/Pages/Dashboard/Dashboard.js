import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import AlertNotifcation from "../../Components/Widget/AlertNotifcation";
import Graph from "../../Components/Chart/Chart";
import RealTimeChart from "../../Components/Chart/RealTimeChart";
import { Topic1, Topic2, Topic3, Topic4 } from "../../Components/Data/Data";
import "./Dashboard.css";

function Dashboard() {

  const [topic1, setTopic1] = useState("Deliveries-Received");
  const [topic2, setTopic2] = useState("Deliveries-Sent");
  const [topic3, setTopic3] = useState("Inventory-Quantity");
  const [topic4, setTopic4] = useState("Transactions-Completed");

  function Greeting() {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      return <UserName />;
    }
  }

  function UserName() {
    const email = window.localStorage.getItem("currentEmail");

    const name = email.substring(0, email.indexOf('@'));
    return "Welcome " + name + "!";
  }


  return (
    <div className="main-dashboard">
      <Sidebar />
      <div className="dashboard-container">
        <Navbar />
        <div className="welcome-msg-dash">
          <Greeting />
          <div className="edit-dashboard">
            <button className="edit-dashboard-btn"> Edit dashboard </button>
          </div>
        </div>
        <div className="notification-dashboard">
          <AlertNotifcation />
          <AlertNotifcation />
        </div>
        <div className="dashboarding-monitoring-div">
          <div className="charts">
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic1}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic2}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic3}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic4}/>
            </div>
          </div>
          <div className="dashboard-widgets">
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
