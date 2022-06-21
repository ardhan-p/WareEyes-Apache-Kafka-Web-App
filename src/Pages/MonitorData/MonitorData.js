import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import '../../Components/Sidebar/Sidebar.css'
import './MonitorData.css'

function MonitorData() {
  return (
    <div className="monitor-data">
      <Sidebar />
      <div className="monitor-container">
      <Navbar />
      <div className="welcome-msg">Welcome user!</div>
        {/* <div className="charts">
          <Chart />
        </div> */}
      </div>
    </div>
  )
}

export default MonitorData