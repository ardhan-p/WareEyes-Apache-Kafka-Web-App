import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import "./MonitorData.css";
import JSONDATA from "./MockData.json";
import RealTimeChart from "../../Components/Chart/RealTimeChart";

function MonitorData() {
  let navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [graphName, setGraphName] = useState("Default Graph");
  const [topicThreshold, setTopicThreshold] = useState(0);

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
                }}>
                Back
              </button>
            </div>
            <div className="search-container">
              <div>
                <input
                  className="search-bar"
                  type="text"
                  id="myInput"
                  onkeyup="myFunction()"
                  placeholder="Search Topic..."
                  title="Type in a topic"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}></input>
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
              <div className="monitor-top">
                <label className="graph-label">{graphName}</label>
              </div>
              <div className="monitor-center">
                <div className="graph-displayed">
                  <RealTimeChart topicTitle="Topic 1" />
                </div>
              </div>
              <div className="monitor-bottom">
                <div className="event-display">
                  <label className="event-label">Threshold Limit (Events)</label>
                  <h2 className="event-counter">{topicThreshold}</h2>
                </div>
                <div className="filter-div">

                </div>
                <div className="export-div">

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
