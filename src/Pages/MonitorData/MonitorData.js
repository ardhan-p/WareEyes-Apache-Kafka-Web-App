import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import Chart from "../../Components/Chart/Chart";
import { Topic1, Topic2 } from "../../Components/Data/Data";
import "./MonitorData.css";
import JSONDATA from "./MockData.json";

function MonitorData() {
  let navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const [topic1, topic2, setUserData] = useState({
    labels: Topic1.map((data) => data.month),
    datasets: [
      {
        label: "Data 1",
        data: Topic1.map((data) => data.topicGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "blue",
        borderWidth: 2,
      },
      {
        label: "Data 2",
        data: Topic2.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
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

  return (
    <div className="monitor-data">
      <Sidebar />
      <div className="monitor-container">
        <Navbar />
        <div className="Monitor-msg">Monitor Data</div>
        <div className="center-container">
          <div className="left">
            <div>
              <button
                type="button"
                className="go-back"
                onClick={() => {
                  navigate("/DashBoard");
                }}
              >
                Back
              </button>
            </div>
            <div className="search-container">
              <div>
                <SearchIcon className="search-icon" fontSize="large" />
                <input
                  className="search-bar"
                  type="text"
                  id="myInput"
                  onkeyup="myFunction()"
                  placeholder="Search Topic..."
                  title="Type in a topic"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                ></input>
                {JSONDATA.filter((val) => {
                  if (searchTerm === "") {
                    return val
                  } else if (val.labels.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                  }
                }).map((val, key) => {
                  return (
                    <div className="graph_searched" key={key}>
                      {val.labels}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="monitor-graph-container">
              <div classNam="monitor-top">
                <label className="graph-label">Topic 1 graph</label>
              </div>
              <div classNam="monitor-center">
                <div className="graph-displayed">
                  <Chart chartData={topic1} />
                </div>
              </div>
              <div classNam="monitor-bottom">
                <div>
                  <label className="event-display">
                    ThresHold Limit(events)
                    <text className="event-counter"></text>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonitorData;
