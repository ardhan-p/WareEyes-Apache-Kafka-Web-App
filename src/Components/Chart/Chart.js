import React, { useState } from "react";
import "./Chart.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { StreamingPlugin, RealTimeScale } from "chartjs-plugin-streaming";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
  
function Graph({ chartData }) {

  // const data = {
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       lineTension: 0,
  //       borderDash: [8, 4],
  //       data: [],
  //     },
  //   ],
  // };

  // const options = {
  //   scales: {
  //     x:
  //       {
  //         type: "realtime",
  //         realtime: {
  //           onRefresh: function(chart) {
  //             chart.data.datasets[0].data.push({
  //               x: Date.now(),
  //               y: Math.random() * 100,
  //             });
  //           },
  //         delay: 2000,
  //       },
  //     },
  //   },
  // };

  // var url = "http://localhost:8080/test-topic"
  // var socket = new SockJS(url);

  // let stompClient = Stomp.over(socket);

  // socket.onopen = function() {
  //   console.log("Chart websocket open");
  // }

  // stompClient.connect({}, function(frame) {
  //   stompClient.subscribe('/topic/test', function (greeting) {
  //     console.log(greeting);
  //   });
  // });

  // const [chart, setChart] = useState([]);

  return (
    <div className="chart-background">
      <div className="chart" id="myChart">
        <Line data={chartData}/>
      </div>
    </div>
  );
}

export default Graph;
