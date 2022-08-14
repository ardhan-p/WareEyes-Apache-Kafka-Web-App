import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import AlertNotifcation from "../../Components/Widget/AlertNotifcation";
import RealTimeChart from "../../Components/Chart/RealTimeChart";
import Popup from "../../Components/Popup/Popup";
import "./Dashboard.css";
import Widget from "../../Components/Widget/Widget";
import axios from "axios";

function Dashboard() {
  const [topicList, setTopicList] = useState([]);

  const [topicCounter, setTopicCounter] = useState(0);
  const [buttonPopup, setButtonPopup] = useState(false);

  const [topic1, setTopic1] = useState("Topic1");
  const [topic2, setTopic2] = useState("Topic2");
  const [topic3, setTopic3] = useState("Topic3");
  const [topic4, setTopic4] = useState("Topic4");

  const [notificationTopic1, setNotificationTopic1] = useState("");
  const [notificationTopic2, setNotificationTopic2] = useState("");

  const [notificationValue1, setNotificationValue1] = useState(0);
  const [notificationValue2, setNotificationValue2] = useState(0);

  const [topic1Data, setTopic1Data] = useState(0);
  const [topic2Data, setTopic2Data] = useState(0);
  const [topic3Data, setTopic3Data] = useState(0);
  const [topic4Data, setTopic4Data] = useState(0);

  const [threshold1, setThreshold1] = useState(0);
  const [threshold2, setThreshold2] = useState(0);
  const [threshold3, setThreshold3] = useState(0);
  const [threshold4, setThreshold4] = useState(0);

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
      setTopicList(res.data);
      setTopicCounter(res.data.length);

      if (localStorage.getItem("topic1Name") === null || localStorage.getItem("topic2Name") === null ||
      localStorage.getItem("topic3Name") === null || localStorage.getItem("topic4Name") === null) {

        setTopic1(res.data[0].name);
        setTopic2(res.data[1].name);
        setTopic3(res.data[2].name);
        setTopic4(res.data[3].name);

        setThreshold1(res.data[0].threshold);
        setThreshold2(res.data[1].threshold);
        setThreshold3(res.data[2].threshold);
        setThreshold4(res.data[3].threshold);

        window.localStorage.setItem("topic1Name", res.data[0].name);
        window.localStorage.setItem("topic2Name", res.data[1].name);
        window.localStorage.setItem("topic3Name", res.data[2].name);
        window.localStorage.setItem("topic4Name", res.data[3].name);

        window.localStorage.setItem("topic1Threshold", res.data[0].threshold);
        window.localStorage.setItem("topic2Threshold", res.data[1].threshold);
        window.localStorage.setItem("topic3Threshold", res.data[2].threshold);
        window.localStorage.setItem("topic4Threshold", res.data[3].threshold);

      } else {

        setTopic1(window.localStorage.getItem("topic1Name"));
        setTopic2(window.localStorage.getItem("topic2Name"));
        setTopic3(window.localStorage.getItem("topic3Name"));
        setTopic4(window.localStorage.getItem("topic4Name"));
        for (let i = 0; i < res.data.length; i++) {

          if (res.data[i].name === window.localStorage.getItem("topic1Name")) {
            setThreshold1(res.data[i].threshold);
          }
          if (res.data[i].name === window.localStorage.getItem("topic2Name")) {
            setThreshold2(res.data[i].threshold);
          }
          if (res.data[i].name === window.localStorage.getItem("topic3Name")) {
            setThreshold3(res.data[i].threshold);
          }
          if (res.data[i].name === window.localStorage.getItem("topic4Name")) {
            setThreshold4(res.data[i].threshold);
          }
        }
      }
      console.log("Topic threshold set!");
    })
    .catch((err) => {
      console.log(err);
    }); 
  }, [])

  useEffect(() => {
    const date = new Date();

    const today = date.toISOString().slice(0, 10);
    const time = date.getHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();

    const data = {
      message: "",
      date: today,
      time: time,
    };

    if (topic1Data >= threshold1 && topic1Data !== 0) {
      setNotificationTopic1(topic1);
      setNotificationValue1(topic1Data);
      data.message = topic1 + " passed threshold '" + topic1Data + "'";
      postNotification(data);
    }

  }, [topic1Data])

  useEffect(() => {
    const date = new Date();

    const today = date.toISOString().slice(0, 10);
    const time = date.getHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();

    const data = {
      message: "",
      date: today,
      time: time,
    };

    if (topic2Data >= threshold2 && topic2Data !== 0) {
      setNotificationTopic1(topic2);
      setNotificationValue1(topic2Data);
      data.message = topic2 + " passed threshold '" + topic2Data + "'";
      postNotification(data);
    }

  }, [topic2Data])

  useEffect(() => {
    const date = new Date();

    const today = date.toISOString().slice(0, 10);
    const time = date.getHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();

    const data = {
      message: "",
      date: today,
      time: time,
    };

    if (topic3Data >= threshold3 && topic3Data !== 0) {
      setNotificationTopic2(topic3);
      setNotificationValue2(topic3Data);
      data.message = topic3 + " passed threshold '" + topic3Data + "'";
      postNotification(data);
    }

  }, [topic3Data])

  useEffect(() => {
    const date = new Date();

    const today = date.toISOString().slice(0, 10);
    const time = date.getHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();

    const data = {
      message: "",
      date: today,
      time: time,
    };

    if (topic4Data >= threshold4 && topic4Data !== 0) {
      setNotificationTopic2(topic4);
      setNotificationValue2(topic4Data);
      data.message = topic4 + " passed threshold '" + topic4Data + "'";
      postNotification(data);
    }

  }, [topic4Data])

  const selectTopic1 = (event) => {
    const name = event.target[event.target.selectedIndex].id;
    const threshold = event.target.value;

    setTopic1(name);
    setThreshold1(threshold);

    window.localStorage.setItem("topic1Name", name);
    window.localStorage.setItem("topic1Threshold", threshold);
  }

  const selectTopic2 = (event) => {
    const name = event.target[event.target.selectedIndex].id;
    const threshold = event.target.value;

    setTopic2(name);
    setThreshold2(threshold);

    window.localStorage.setItem("topic2Name", name);
    window.localStorage.setItem("topic2Threshold", threshold);
  }

  const selectTopic3 = (event) => {
    const name = event.target[event.target.selectedIndex].id;
    const threshold = event.target.value;

    setTopic3(name);
    setThreshold3(threshold);

    window.localStorage.setItem("topic3Name", name);
    window.localStorage.setItem("topic3Threshold", threshold);
  }

  const selectTopic4 = (event) => {
    const name = event.target[event.target.selectedIndex].id;
    const threshold = event.target.value;

    setTopic4(name);
    setThreshold4(threshold);

    window.localStorage.setItem("topic4Name", name);
    window.localStorage.setItem("topic4Threshold", threshold);
  }

  function Greeting() {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      return <UserName />;
    }
  }

  function postNotification(data) {
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
            <button className="edit-dashboard-btn" onClick={() => setButtonPopup(true)}> Edit dashboard </button>
          </div>
        </div>
        <div className="notification-dashboard">
          <AlertNotifcation topic={notificationTopic1} threshold={notificationValue1}/>
          <AlertNotifcation topic={notificationTopic2} threshold={notificationValue2}/>
        </div>
        <div className="dashboarding-monitoring-div">
          <div className="charts">
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic1} chartSpeed={30000} setTopicData={setTopic1Data}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic2} chartSpeed={30000} setTopicData={setTopic2Data}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic3} chartSpeed={30000} setTopicData={setTopic3Data}/>
            </div>
            <div className="graph-displayed-dashboard">
              <RealTimeChart topicTitle={topic4} chartSpeed={30000} setTopicData={setTopic4Data}/>
            </div>
          </div>
          <div className="dashboard-widgets">
            <Widget topicTitle={"Total Topics"} counter={topicCounter} name={"Available"}/>
            <Widget topicTitle={topic1} counter={threshold1} name={"Threshold"}/>
            <Widget topicTitle={topic2} counter={threshold2} name={"Threshold"}/>
            <Widget topicTitle={topic3} counter={threshold3} name={"Threshold"}/>
            <Widget topicTitle={topic4} counter={threshold4} name={"Threshold"}/>
          </div>
        </div>
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2>Set Topics to Monitor</h2>
        <div className="edit-dashboard-popup">
          <select className="select-monitor-topic" defaultValue={'DEFAULT'} onChange={selectTopic1}>
            <option value="DEFAULT" disabled>Choose topic...</option>
            {topicList.map((value) => (
              <option key={value.name} id={value.name} value={value.threshold}>
                {value.name}
              </option>
            ))}
          </select> 
          <select className="select-monitor-topic" defaultValue={'DEFAULT'} onChange={selectTopic2}>
            <option value="DEFAULT" disabled>Choose topic...</option>
            {topicList.map((value) => (
              <option key={value.name} id={value.name} value={value.threshold}>
                {value.name}
              </option>
            ))}
          </select> 
          <select className="select-monitor-topic" defaultValue={'DEFAULT'} onChange={selectTopic3}>
            <option value="DEFAULT" disabled>Choose topic...</option>
            {topicList.map((value) => (
              <option key={value.name} id={value.name} value={value.threshold}>
                {value.name}
              </option>
            ))}
          </select> 
          <select className="select-monitor-topic" defaultValue={'DEFAULT'} onChange={selectTopic4}>
            <option value="DEFAULT" disabled>Choose topic...</option>
            {topicList.map((value) => (
              <option key={value.name} id={value.name} value={value.threshold}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
      </Popup>
    </div>
  );
}

export default Dashboard;