import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import AlertNotifcation from "../../Components/Widget/AlertNotifcation";
import Graph from "../../Components/Chart/Chart";
import RealTimeChart from "../../Components/Chart/RealTimeChart";
import { Topic1, Topic2, Topic3, Topic4 } from "../../Components/Data/Data";
import "./Dashboard.css";

function Dashboard() {
  const [topic1, topic2, setUserData] = useState({
    labels: Topic1.map((data) => data.month),
    datasets: [
      {
        label: "Data 1",
        data: Topic1.map((data) => data.topicGain),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "blue",
        borderWidth: 2,
      },
      {
        label: "Data 2",
        data: Topic2.map((data) => data.userGain),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "red",
        borderWidth: 2,
      },
    ],
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const [topic3] = useState({
    labels: Topic3.map((data) => data.month),
    datasets: [
      {
        label: "Data 3",
        data: Topic3.map((data) => data.Topic3),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [topic4] = useState({
    labels: Topic4.map((data) => data.year),
    datasets: [
      {
        label: "Data 4",
        data: Topic4.map((data) => data.userGain),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "yellow",
        borderWidth: 2,
      },
    ],
  });

  const [topic5] = useState({
    labels: Topic4.map((data) => data.year),
    datasets: [
      {
        label: "Data 5",
        data: Topic4.map((data) => data.userLost),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "purple",
        borderWidth: 2,
      },
    ],
  });

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
        <div className="charts">
          <div className="charts-col1">
            <Graph chartData={topic1} />
          </div>
          <div className="charts-col2">
            <Graph chartData={topic3} />
          </div>
        </div>
        <div className="charts">
          <div className="charts-col1">
            <Graph chartData={topic4} />
          </div>
          <div className="charts-col2">
            <Graph chartData={topic5} />
          </div>
          <div className="dashboard-right">
            <div className="notification">{/* <Widget /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
