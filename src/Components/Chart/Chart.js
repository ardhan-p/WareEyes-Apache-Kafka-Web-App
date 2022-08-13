import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Chart.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
Chart.register(...registerables);

function Graph({ topicTitle, topicThreshold }) {
  let ref = useRef(null);

  const downloadGraph = useCallback(() => {
    const link = document.createElement("a");
    link.download = topicTitle + ".jpeg";
    link.href = ref.current.toBase64Image("image/jpeg", 1);
    link.click();
  }, []);

  const data = {
    datasets: [
      {
        label: topicTitle,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        cubicInterpolationMode: "monotone",
        fill: true,
        data: [
          { x: "2021-06-24T13:30:00", y: 530 },
          { x: "2021-06-24T14:00:00", y: 340 },
          { x: "2021-06-24T15:30:00", y: 510 },
          { x: "2021-06-24T16:00:00", y: 610 },
          { x: "2021-06-24T16:30:00", y: 111 },
          { x: "2021-06-24T18:00:00", y: 180 },
          { x: "2021-06-24T19:00:00", y: 290 },
          { x: "2021-06-24T20:00:00", y: 100 },
        ],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
        },
        title: {
          display: true,
          text: "Time",
        },
        distribution: "series",
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
                    <button className="monitor-button">
                      Filter Chart
                    </button>
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
