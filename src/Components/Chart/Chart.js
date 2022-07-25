import React, { useState } from "react";
import "./Chart.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StreamingPlugin, RealTimeScale } from "chartjs-plugin-streaming";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
  
function Graph({ chartData }) {

  return (
    <div className="chart-background">
      <div className="chart" id="myChart">
        <Line data={chartData}/>
      </div>
    </div>
  );
}

export default Graph;
