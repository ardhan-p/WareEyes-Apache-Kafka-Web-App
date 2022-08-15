import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Chart.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import axios from "axios";

Chart.register(...registerables, DataLabelsPlugin);

function Graph({ topicTitle, topicThreshold }) {
  let ref = useRef(null);
  const controller = new AbortController();

  const [selectedDate, setSelectedDate] = useState(currentDate());
  const [graphDate, setGraphDate] = useState("");
  const [dataPoints, setDataPoints] = useState([]);

  const data = {
    datasets: [
      {
        label: "Event Value",
        data: dataPoints,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        cubicInterpolationMode: "monotone",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      title: {
        display: true,
        text: topicTitle,
      },
      datalabels: {
        backgroundColor: (context) => context.dataset.borderColor,
        padding: 4,
        borderRadius: 4,
        clip: true,
        color: "white",
        font: {
          weight: "bold",
        },
        formatter: (value) => value.y,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
        },
        ticks: {
          major: {
            enabled: true,
          },
          font: (context) => {
            const boldedTicks =
              context.tick && context.tick.major ? "bold" : "";
            return { weight: boldedTicks };
          },
        },
        title: {
          display: true,
          text: graphDate,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Event",
        },
      },
    },
  };

  const dateInputSelect = () => {
    const selectedDate1 = document.getElementById("startdate");
    setSelectedDate(selectedDate1.value);
    console.log(selectedDate1.value);
  }

  const filterDataOnClick = () => {
    const url = "http://localhost:8080/api/v1/notification/fetchTopicData/" + topicTitle + "/" + selectedDate;

    console.log(url);
    setGraphDate(selectedDate);

    axios.get(url, {
      signal: controller.signal,
      auth: {
        username: "user",
        password: "password",
      },
    })
    .then((res) => {
      console.log(res.data);
      setDataPoints(res.data);
      controller.abort();
    })
    .catch((err) => {
      console.log(err);    
    });

  }

  // to get the current date in a formate of "YYYY-MM-DD"
  function currentDate() {
    var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  useEffect(() => {
    let status = false;
    const url = "http://localhost:8080/api/v1/notification/fetchTopicData/" + topicTitle + "/" + currentDate();

    setGraphDate(selectedDate);

    axios
    .get(url, {
      auth: {
        username: "user",
        password: "password",
      },
    })
    .then((res) => {
      if (!status) {
        console.log(res.data);
        setDataPoints(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });

    return () => {
      console.log("Cancelled!")
      status = true;
    }
  }, [topicTitle]);

  // to export the graph into image
  const downloadGraph = useCallback(() => {
    const link = document.createElement("a");
    link.download = topicTitle + ".jpeg";
    link.href = ref.current.toBase64Image("image/jpeg", 1);
    link.click();
  }, [topicTitle]);

  return (
    <div className="chart-background">
      <div className="chart" id="myChart">
        <Line data={data} options={options} ref={ref} />
        <div className="monitor-bottom">
          <div className="event-display">
            <label className="event-label">Threshold Limit (Events)</label>
            <h2 className="event-counter">{topicThreshold}</h2>
          </div>
          <div className="monitor-button-div">
            <div className="filter-div">
              <input
                onChange={dateInputSelect}
                type="date"
                id="startdate"
                value={selectedDate}
              ></input>
              <button className="monitor-button" onClick={filterDataOnClick}>Filter Chart</button>
            </div>
            <div className="export-div">
              <button className="monitor-button" onClick={downloadGraph}>
                Export Chart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
