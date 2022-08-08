import React, { useEffect, useState } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import "./Chart.css";
import SockJsClient from 'react-stomp'

ChartJS.register(StreamingPlugin);

function RealTimeChart({ topicTitle, chartSpeed }) {
  const socketURL = 'http://localhost:8080/topic-endpoint';
  const [topicURL, setTopicURL] = useState("")
  const [chartDuration, setChartDuration] = useState(30000);

  let consumerValue = 0;

  useEffect(() => {
    setTopicURL("/topic/" + topicTitle);
    console.log("Topic selected: " + topicTitle);
  }, [topicTitle]);

  useEffect(() => {
    setChartDuration(chartSpeed);
  }, [chartSpeed]);

  const authHeaders = {
    username: "user",
    password: "password",
  };

  const onConnected = () => {
    console.log("Connected to Websocket");
    console.log("URL: " + socketURL);
    console.log("Topic: " + topicURL);
  };

  const onDisconnected = () => {
    console.log("Disconnected from Websocket");
  }

  // TODO: add function to trigger notification when data received exceeds topic threshold
  const onMessageReceive = (msg) => {
    consumerValue = msg;
    console.log("Kafka topic: " + topicTitle + " - Data received: " + msg);
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
    // maintainAspectRatio: false,
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          duration: chartDuration,
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
        topics={[topicURL]}
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

export default React.memo(RealTimeChart);