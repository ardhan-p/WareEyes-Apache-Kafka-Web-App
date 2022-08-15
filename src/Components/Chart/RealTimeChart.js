import React, { useEffect, useState } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS , registerables} from 'chart.js';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import "./Chart.css";
import SockJsClient from 'react-stomp'

ChartJS.register(...registerables, DataLabelsPlugin, StreamingPlugin);

function RealTimeChart({ topicTitle, chartSpeed, setTopicData }) {
  const socketURL = 'http://localhost:8080/topic-endpoint';
  const [topicURL, setTopicURL] = useState("")
  const [chartDuration, setChartDuration] = useState(10000);

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

  const onMessageReceive = (msg) => {
    consumerValue = msg;
    setTopicData(consumerValue);
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
          onRefresh: onRefresh,
        },
      },
      y: {
        beginAtZero: true,
      }
    },
    plugins :{
      streaming: {
        duration: chartDuration,
        refresh: 5000,
        delay: 2000,
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