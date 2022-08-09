import React, { useEffect, useState } from "react";
import "./Chart.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StreamingPlugin, RealTimeScale } from "chartjs-plugin-streaming";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
  
function Graph({ topicTitle, topicData }) {

  const data = {
    datasets: [{
      label: topicTitle,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      cubicInterpolationMode: 'monotone',
      fill: true,
      data: [topicData]
    }]
  };

  const options = {
    // maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Event'
        },
      }
    },
  };

  return (
    <div className="chart-background">
      <div className="chart" id="myChart">
        <Line data={data}
        options={options}
        />
      </div>
    </div>
  );
}

export default Graph;
