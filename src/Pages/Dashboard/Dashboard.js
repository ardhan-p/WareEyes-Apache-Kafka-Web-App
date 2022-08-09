import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import AlertNotifcation from "../../Components/Widget/AlertNotifcation";
import Graph from "../../Components/Chart/Chart";
import RealTimeChart from "../../Components/Chart/RealTimeChart";
import { Topic1, Topic2, Topic3, Topic4 } from "../../Components/Data/Data";
import "./Dashboard.css";
import Widget from "../../Components/Widget/Widget";
import axios from "axios";

function Dashboard() {

  const [topic1, setTopic1] = useState("Current-Number-Of-Employees");
  const [topic2, setTopic2] = useState("Deliveries-Sent");
  const [topic3, setTopic3] = useState("Inventory-Quantity");
  const [topic4, setTopic4] = useState("Transactions-Completed");
  const [counter, setCounter] = useState(0);
  const [threshold1, setThreshold1] = useState(0);
  const [threshold2, setThreshold2] = useState(0);
  const [threshold3, setThreshold3] = useState(0);
  const [threshold4, setThreshold4] = useState(0);
  const [chartSpeed, setChartSpeed] = useState(30000);

  //  // fetch topic threshold data from backend server
  useEffect(() => {
    axios
    .get("http://localhost:8080/api/v1/kafka/get", {
      auth: {
        username: "user",
        password: "password",
      },
    })
    .then((res) => {
      setCounter(res.data.length);
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].name === topic1) {
          setThreshold1(res.data[i].threshold);
        }
        if(res.data[i].name === topic2) {
          setThreshold2(res.data[i].threshold);
        }
        if(res.data[i].name === topic3) {
          setThreshold3(res.data[i].threshold);
        }
        if(res.data[i].name === topic4) {
          setThreshold4(res.data[i].threshold);
        }
      }
      console.log("Topic threshold set!");
    })
    .catch((err) => {
      console.log(err);
    }); 

  }, []);

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
              <RealTimeChart topicTitle={topic1} chartSpeed={chartSpeed}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic2} chartSpeed={chartSpeed} />
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic3} chartSpeed={chartSpeed} />
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic4} chartSpeed={chartSpeed} />
            </div>
          </div>
          <div className="dashboard-widgets">
          <Widget topicTitle={"Total Topics"} counter={counter} name={"Available"}/>
            <Widget topicTitle={topic1} counter={threshold1} name={"Threshold"}/>
            <Widget topicTitle={topic2} counter={threshold2} name={"Threshold"}/>
            <Widget topicTitle={topic3} counter={threshold3} name={"Threshold"}/>
            <Widget topicTitle={topic4} counter={threshold4} name={"Threshold"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
