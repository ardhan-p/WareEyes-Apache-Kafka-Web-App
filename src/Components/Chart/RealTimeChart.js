import React, { useRef, useState } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import "./Chart.css";
import SockJsClient from 'react-stomp'

ChartJS.register(StreamingPlugin);

function RealTimeChart({ topicTitle }) {
  // TODO: change url to point to specific topic from props
  const socketURL = 'http://localhost:8080/test-topic';

  // TODO: 
  const currentChart = useRef();
  const [myChart, setMyChart] = useState(null);
  const [number, setNumber] = useState('0');

  const onConnected = () => {
    console.log("Connected to Websocket");
  };

  const onMessageReceive = (msg) => {
    setNumber(msg);
    console.log(msg);
  };

  const onRefresh = (chart) => {
    chart.data.datasets.forEach(dataset => {
      dataset.data.push({
        x: Date.now(),
        y: number
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
          refresh: 2000,
          onRefresh: onRefresh
        }
      }
    }
  };

  return (
    <div>
      <SockJsClient 
        url={socketURL}
        topics={['/topic/test']}
        onConnect={onConnected}
        onMessage={msg => onMessageReceive(msg)}
        debug={false}
      />
      <Line
        data={data}
        options={options}
        ref={currentChart}
      />
    </div>
  );
}

export default RealTimeChart;