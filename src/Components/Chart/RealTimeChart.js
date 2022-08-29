import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS , registerables} from 'chart.js';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import "./Chart.css";
import SockJsClient from 'react-stomp';
import config from "../../Context/serverProperties.json";

ChartJS.register(...registerables, DataLabelsPlugin, StreamingPlugin);

// dynamic chart component, receives constant stream of Kafka events through a web socket
function RealTimeChart({ topicTitle, chartSpeed, setTopicData }) {
  const socketURL = config["backend-url"] + '/topic-endpoint';
  const [topicURL, setTopicURL] = useState("")
  const [chartDuration, setChartDuration] = useState(10000);

  // consumer value is constantly updated via the data from the web socket
  let consumerValue = 0;

  // chart component will re-render and reconnect to a new web socket 
  // whenever the topic value changes in the arguments
  useEffect(() => {
    let status = false;

    if (!status) {
      setTopicURL("/topic/" + topicTitle);
      console.log("Topic selected: " + topicTitle);
    }

    return () => {
      console.log("Cancelled!");
      status = true;
    };
  }, [topicTitle]);

  // chart component will re-render and change the speed of the graph 
  // whenever the chart speed value changes in the arguments
  useEffect(() => {
    let status = false;

    if (!status) {
      setChartDuration(chartSpeed);
    }

    return () => {
      console.log("Cancelled!");
      status = true;
    };
  }, [chartSpeed]);

  // authentication info to connect to web socket
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

  // updates the consumer value everytime a new value from the web socket is received
  const onMessageReceive = (msg) => {
    consumerValue = msg;
    setTopicData(consumerValue);
  };

  // real-time chart properties, defines the x-axis with current time and y-axis with the consumer value
  const onRefresh = (chart) => {
    chart.data.datasets.forEach(dataset => {
      dataset.data.push({
        x: Date.now(),
        y: consumerValue
      });
    }); 
  };

  // chart data properties
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

  // chart visual options (i.e. scales, chart titles, data labels)
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