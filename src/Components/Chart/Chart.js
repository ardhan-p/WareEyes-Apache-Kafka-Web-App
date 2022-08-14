import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Chart.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import DataLabelsPlugin from "chartjs-plugin-datalabels";
Chart.register(...registerables, DataLabelsPlugin);

function Graph({ topicTitle, topicThreshold }) {
  let ref = useRef(null);

  const [selectedDate, setSelectedDate] = useState("");

  const [dataPoints, setDataPoints] = useState([
    { x: "2022-08-14T00:00:00", y: 530 },
    { x: "2022-08-14T04:00:00", y: 340 },
    { x: "2022-08-14T15:30:00", y: 510 },
    { x: "2022-08-14T16:00:00", y: 610 },
    { x: "2022-08-14T19:30:00", y: 111 },
    { x: "2022-08-14T20:00:00", y: 180 },
    { x: "2022-08-14T23:00:00", y: 290 },
    { x: "2022-08-14T23:50:00", y: 100 },
  ]);

  const data = {
    // labels: graphXData,
    datasets: [
      {
        label: "THRESHOLD PASSED",
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
          unit: "hour",
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
          text: "Date",
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

  function filterData() {
    const selectedDate1 = document.getElementById("startdate");
    setSelectedDate(selectedDate1.value);
    console.log(selectedDate1.value);

    //TODO: AXIOS POST
    //setDataPoints()
  }

  useEffect(() => {
    // date formate
    function formatDate() {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

    setSelectedDate(formatDate);
  }, []);

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
                onChange={setSelectedDate}
                type="date"
                id="startdate"
                value={selectedDate}
              ></input>
              <button className="monitor-button" onClick={filterData}>Filter Chart</button>
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
