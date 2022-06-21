import React from 'react'
import './Chart.css'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";

function Chart({ chartData }) {

  return (
    <div className="chart-background">
    <div className="chart" id="myChart">
      <Line data={chartData} />
    </div>
    </div>
  )
}

export default Chart