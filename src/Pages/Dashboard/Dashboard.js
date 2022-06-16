import React from 'react'
import "./Dashboard.css"
import { getCustomDayNameFull, getCustomDayNameShort, getCustomMonthNameFull, getCustomMonthNameShort,
  getCustomDate, getCustomHour, getCustomMinute, getCustomSecond, getCustomAmPm,
  getCustomFullDateAndTimeWithAmPm, getCustomFullDateAndTimeWithAmPmIncludingSeconds
} from "@hirishu10/simple-date-time";
import { useNavigate } from "react-router-dom";
import { MdHouse } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { GoGraph } from 'react-icons/go';
import { BsBell } from 'react-icons/bs';
import { VscGear } from 'react-icons/vsc';
import { FaUserCircle } from 'react-icons/fa';

function Dashboard() {
  const timestampLower = getCustomFullDateAndTimeWithAmPm();

  let navigate = useNavigate();
  return (
    <div className='main-dashboard'>
      <div id='topbar'>
        <label className="logo">WareEyes</label>
        <p id="time">{timestampLower}</p>
        <p id="date"></p>
        <p id="profile"><FaUserCircle /></p>
        <p id="user">user</p>
      </div>
      <nav id='sidebar'>
          <ul>
            <li><a class="hover" href="DashBoard"><MdHouse /> &nbsp;&nbsp;&nbsp;&nbsp; Dashboard</a></li>
            <li><a class="hover" href="MonitorData"><GoGraph /> &nbsp;&nbsp;&nbsp;&nbsp; Monitor data</a></li>
            <li><a class="hover" href="Notifications"><BsBell /> &nbsp;&nbsp;&nbsp;&nbsp; Notifications</a></li>
            <li><a class="hover" href="Settings"><VscGear /> &nbsp;&nbsp;&nbsp;&nbsp; Settings</a></li>
          </ul>
          <button id= 'logout-btn' onClick = {() => {navigate("/Login")}}><FiLogOut />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout</button>
        </nav>
        {/* <div className='dashboard'> */}
          {/* <p id="welcome-user"> Welcome user!</p> */}
          {/* <button id= 'edit-dashboard' onClick = {() => {navigate("/dashboard")}}>Edit dashboard</button> */}
        {/* </div> */}
    </div>
  )
}

export default Dashboard