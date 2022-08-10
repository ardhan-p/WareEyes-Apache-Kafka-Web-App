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
  const [counter, setCounter] = useState(0);

  const [topic1, setTopic1] = useState("Current-Number-Of-Employees");
  const [topic2, setTopic2] = useState("Deliveries-Sent");
  const [topic3, setTopic3] = useState("Inventory-Quantity");
  const [topic4, setTopic4] = useState("Transactions-Completed");

  const [notificationTopic1, setNotificationTopic1] = useState("");
  const [notificationTopic2, setNotificationTopic2] = useState("");

  const [notificationValue1, setNotificationValue1] = useState(0);
  const [notificationValue2, setNotificationValue2] = useState(0);

  const [topic1Data, setTopic1Data] = useState(0);
  const [topic2Data, setTopic2Data] = useState(0);
  const [topic3Data, setTopic3Data] = useState(0);
  const [topic4Data, setTopic4Data] = useState(0);

  const [threshold1, setThreshold1] = useState(500000);
  const [threshold2, setThreshold2] = useState(500000);
  const [threshold3, setThreshold3] = useState(500000);
  const [threshold4, setThreshold4] = useState(500000);

  const [chartSpeed, setChartSpeed] = useState(30000);

  // fetch topic threshold data from backend server
  useEffect(() => {

    if (localStorage.getItem("notificationCounter") === null) {
      let newCounter = 0;
      window.localStorage.setItem("notificationCounter", newCounter.toString());
    }

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

  useEffect(() => {
    let hasPassedThreshold = false;
    const date = new Date();

    const today = date.toISOString().slice(0, 10);
    const time = date.getHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();

    const data = {
      message: "",
      date: today,
      time: time,
    };

    if (topic1Data >= threshold1) {
      setNotificationTopic1(topic1);
      setNotificationValue1(topic1Data);
      data.message = topic1 + " passed threshold '" + topic1Data + "'";
      hasPassedThreshold = true;
    }

    if (topic2Data >= threshold2) {
      setNotificationTopic1(topic2);
      setNotificationValue1(topic2Data);
      data.message = topic2 + " passed threshold '" + topic2Data + "'";
      hasPassedThreshold = true;
    }

    if (topic3Data >= threshold3) {
      setNotificationTopic2(topic3);
      setNotificationValue2(topic3Data);
      data.message = topic3 + " passed threshold '" + topic3Data + "'";
      hasPassedThreshold = true;
    }

    if (topic4Data >= threshold4) {
      setNotificationTopic2(topic4);
      setNotificationValue2(topic4Data);
      data.message = topic4 + " passed threshold '" + topic4Data + "'";
      hasPassedThreshold = true;
    }

    if (hasPassedThreshold === true) {
      axios
      .post("http://localhost:8080/api/v1/notification/post", data, {
        auth: {
          username: "user",
          password: "password",
        },
      })
      .then((res) => {
        console.log("(" + data.message + ") has been added successfully to notifications!");
      })
      .catch((err) => {
        console.log(err);
      });
      const newCounter = parseInt(window.localStorage.getItem("notificationCounter")) + 1;
      window.localStorage.setItem("notificationCounter", newCounter.toString());
    }
  }, [topic1Data, topic2Data, topic3Data, topic4Data])

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
          <AlertNotifcation topic={notificationTopic1} threshold={notificationValue1}/>
          <AlertNotifcation topic={notificationTopic2} threshold={notificationValue2}/>
        </div>
        <div className="dashboarding-monitoring-div">
          <div className="charts">
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic1} chartSpeed={chartSpeed} setTopicData={setTopic1Data}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic2} chartSpeed={chartSpeed} setTopicData={setTopic2Data}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic3} chartSpeed={chartSpeed} setTopicData={setTopic3Data}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic4} chartSpeed={chartSpeed} setTopicData={setTopic4Data}/>
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
