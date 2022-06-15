import React from 'react'
import "../Dashboard.css"
import { useNavigate } from "react-router-dom";
import { MdLogout } from 'react-icons/md';
var timeDisplay = document.getElementById("time");
var dateDisplay = document.getElementById("date");

function refreshTime() { 
  var dateString = new Date().toLocaleString("en-US", {timeZone: "Singapore"});
  var formattedString = dateString.replace(", ", " - ");
  var dt=dateString.toDateString();
  timeDisplay.innerHTML = formattedString;
  dateDisplay.innerHTML = dt;
}

setInterval(refreshTime, 1000);

function DashBoard() {
  let navigate = useNavigate();
  return (
    <div id='main-dashboard'>
      <h3>WareEyes</h3> <br></br>
      <p id="time"></p>
      <p id="date"></p>
      <div>
      <ul>
        <li><a href="DashBoard">Dashboard</a></li>
        <li><a href="DashBoard">Monitor data</a></li>
        <li><a href="DashBoard">Notifications</a></li>
        <li><a href="DashBoard">Settings</a></li>
      </ul>
        <button id= 'logout-btn' onClick = {() => {navigate("/Login")}}><MdLogout /> Logout</button>
      </div>
    </div>
  )
}

export default DashBoard