import React from 'react';
import './Topbar.css';
import { getCustomFullDateAndTimeWithAmPm} from "@hirishu10/simple-date-time";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

function Topbar() {
    const timestampLower = getCustomFullDateAndTimeWithAmPm();
    let navigate = useNavigate();

    return (
        <div id='dashboard-topbar-div'>
            <label id="title">WareEyes</label>
            <p id="time">{timestampLower}</p>
            <p id="date"></p>
            <p id="profile"><FaUserCircle /></p>
            <p id="user">user</p>
        </div>
    )
}
  
export default Topbar;