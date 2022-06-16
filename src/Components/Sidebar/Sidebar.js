import React from 'react';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";
import { MdHouse } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { GoGraph } from 'react-icons/go';
import { BsBell } from 'react-icons/bs';
import { VscGear } from 'react-icons/vsc';

function Sidebar() {
    let navigate = useNavigate();

    return (
        <nav>
            <ul>
                <li><a class="hover" href="DashBoard"><MdHouse /> &nbsp;&nbsp;&nbsp;&nbsp; Dashboard</a></li>
                <li><a class="hover" href="MonitorData"><GoGraph /> &nbsp;&nbsp;&nbsp;&nbsp; Monitor data</a></li>
                <li><a class="hover" href="Notifications"><BsBell /> &nbsp;&nbsp;&nbsp;&nbsp; Notifications</a></li>
                <li><a class="hover" href="Settings"><VscGear /> &nbsp;&nbsp;&nbsp;&nbsp; Settings</a></li>
            </ul>
            <button id= 'logout-btn' onClick = {() => {navigate("/Login")}}><FiLogOut />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Logout</button>
        </nav>
    )
}

export default Sidebar;