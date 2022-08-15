import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import Graph from "../../Components/Chart/Chart";
import "./MonitorData.css";

function MonitorData() {
  let navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [topicList, setTopicList] = useState([]);
  const [graphName, setGraphName] = useState("");
  const [topicThreshold, setTopicThreshold] = useState(0);
  const [eachTopicThreshold, setEachTopicThreshold] = useState([]);

  useEffect(() => {
    let status = false;

    axios
    .get("http://localhost:8080/api/v1/kafka/get", {
      auth: {
        username: "user",
        password: "password",
      },
    })
    .then((res) => {
      if (!status) {
      setTopicList(res.data.map((topic) => {
        return topic.name;
      }));
      setEachTopicThreshold(res.data.map((topic) => {
        return topic.threshold;
      }));
      setGraphName(res.data[0].name);
      setTopicThreshold(res.data[0].threshold);
      console.log("Topic list set!");
    }
    })
    .catch((err) => {
      console.log(err);
    }); 

    return () => {
      console.log("Cancelled!")
      status = true;
    }

  }, []);

  const handleTopicOnClick = (val) => {
    const index = topicList.indexOf(val);
    setGraphName(val);
    setTopicThreshold(eachTopicThreshold[index]);
  };

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
                <input
                  className="search-bar"
                  type="text"
                  id="myInput"
                  placeholder="Search Topic..."
                  title="Type in a topic"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                ></input>
                {topicList
                  .filter((val) => {
                    if (
                      searchTerm === "" ||
                      val.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((val) => {
                    return (
                      <div
                        className="graph_searched"
                        onClick={() => handleTopicOnClick(val)}
                        key={val}
                      >
                        {val}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="monitor-graph-container">
              <div className="monitor-top">
                <label className="graph-label">
                  {graphName + " (Kafka Event Data Graph)"}
                </label>
              </div>
              <div className="monitor-center">
                <div className="graph-displayed">
                  {graphName && topicThreshold && (
                    <>
                      <Graph
                        topicTitle={graphName}
                        topicThreshold={topicThreshold}
                      />
                    </>
                  )}
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
