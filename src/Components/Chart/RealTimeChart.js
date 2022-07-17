import React, { Component } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import "./Chart.css";

ChartJS.register(StreamingPlugin);

class RealTimeChart extends Component {
  render() {
    return (
      <Line
        data={{
          datasets: [{
            label: 'Topic 1',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            cubicInterpolationMode: 'monotone',
            fill: true,
            data: []
          }]
        }}
        options={{
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                delay: 2000,
                onRefresh: chart => {
                  chart.data.datasets.forEach(dataset => {
                    dataset.data.push({
                      x: Date.now(),
                      y: Math.random() * 100
                    });
                  });
                }
              }
            }
          }
        }}
      />
    );
  }
}

export default RealTimeChart;