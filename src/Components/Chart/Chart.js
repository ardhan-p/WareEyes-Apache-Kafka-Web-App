import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Chart.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
Chart.register(...registerables);

function Graph({ topicTitle, topicThreshold }) {
  let ref = useRef(null);

  // date formate
  var defaultStartDate = (new Date()).toISOString().split('T')[0];
  var tempDate = (new Date());
  tempDate.setDate(tempDate.getDate() + 7);
  var defaultEndDate = tempDate.toISOString().split('T')[0];

  // to export the graph into image
  const downloadGraph = useCallback(() => {
    const link = document.createElement("a");
    link.download = topicTitle + ".jpeg";
    link.href = ref.current.toBase64Image("image/jpeg", 1);
    link.click();
  }, [topicTitle]);

  const datapoints123 = [
          { x: "2021-06-29T01:00:00", y: 530 },
          { x: "2021-06-29T14:00:00", y: 340 },
          { x: "2021-06-29T15:30:00", y: 510 },
          { x: "2021-06-29T16:00:00", y: 610 },
          { x: "2021-06-29T19:30:00", y: 111 },
          { x: "2021-06-29T20:00:00", y: 180 },
          { x: "2021-06-29T23:00:00", y: 290 },
          { x: "2021-06-29T23:50:00", y: 100 },
  ];

  // this is the x value 
  const dataPoints = [1, 2, 3, 4, 5, 6, 7, 8];

  // this is the y value
  const dates = ['2022-08-14', '2022-08-15','2022-08-16', '2022-08-17','2022-08-18', '2022-08-19','2022-08-20', '2022-08-21',];

  const [graphXData, setGraphXData] = useState(dates);
  const [graphYData, setGraphYData] = useState(dataPoints);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const data = {
    // labels: graphXData,
    datasets: [
      {
        label: topicTitle,
        data: datapoints123,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        cubicInterpolationMode: "monotone",
        fill: true,
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
    const dates2 =[...dates];
    console.log(dates2);
    const startDate = document.getElementById("startdate");
    const endDate = document.getElementById("enddate");

    // get the index number in array
    const indexStartDate = dates2.indexOf(startDate.value);
    const indexEndDate = dates2.indexOf(endDate.value);

    setStartDate(startDate.value);
    setEndDate(endDate.value);

    // slice the array only showing the selected section
    const filterDate = dates2.slice(indexStartDate, indexEndDate + 1 );

    data.labels = filterDate;
    console.log(filterDate);
    setGraphXData(filterDate);

    // datapoints
    const dataPoints2 =[...dataPoints];
    const filterDataPoints = dataPoints2.slice(indexStartDate, indexEndDate + 1 );

    data.datasets[0].data = filterDataPoints;
    setGraphYData(filterDataPoints);
  }

  useEffect(() => {
    
  }, [])

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
              {/* <button className="monitor-button">
                      Filter Chart
                    </button> */}
              <input
                onChange={filterData}
                type="date"
                id="startdate"
                value={startDate}
              ></input>
              <input
                onChange={filterData}
                type="date"
                id="enddate"
                value={endDate}
                min={startDate}
              ></input>
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
