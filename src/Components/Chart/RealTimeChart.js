import React, { useEffect, useRef, useState } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import "./Chart.css";
import SockJsClient from 'react-stomp'
import axios from 'axios';

ChartJS.register(StreamingPlugin);

function RealTimeChart({ topicTitle }) {
  // TODO: change url to point to specific topic from props
  const socketURL = 'http://localhost:8080/topic-endpoint';

  let consumerValue = 0;

  const authHeaders = {
    username: "user",
    password: "password",
  };

  const onConnected = () => {
    console.log("Connected to Websocket");
  };

  const onDisconnected = () => {
    console.log("Disconnected from Websocket");
  }

  const onMessageReceive = (msg) => {
    consumerValue = msg;
    console.log("Data received: " + msg);
  };

  const onRefresh = (chart) => {
    chart.data.datasets.forEach(dataset => {
      dataset.data.push({
        x: Date.now(),
        y: consumerValue
      });
    }); 
  };

  const data = {
    datasets: [{
      label: topicTitle,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      cubicInterpolationMode: 'monotone',
      fill: true,
      data: []
    }]
  };

  const options = {
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          duration: 30000,
          refresh: 1000,
          onRefresh: onRefresh
        }
      }
    }
  };

  return (
    <div>
      <SockJsClient 
        url={socketURL}
        headers={authHeaders}
        subscribeHeaders={authHeaders}
        topics={['/topic/test']}
        onConnect={onConnected}
        onDisconnect={onDisconnected}
        onMessage={msg => onMessageReceive(msg)}
        debug={false}
      />
      <Line
        data={data}
        options={options}
      />
    </div>
  );
}

export default RealTimeChart;