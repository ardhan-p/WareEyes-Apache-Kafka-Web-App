import { HashRouter, Routes, Route, } from "react-router-dom";
import Login from './Pages/Login/Login';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import MonitorData from './Pages/MonitorData/MonitorData';
import Notifications from './Pages/Notifications/Notifications';
import Settings from './Pages/Settings/Settings';
import AdminTools from './Pages/AdminTools/AdminTools';
import React, { useContext } from 'react'
import "./Style/dark.scss"
import { DarkModeContext } from './Context/darkModeContext';
import ManageAccount from "./Pages/ManageAccount/ManageAccount";
import ManageKafkaTopic from "./Pages/ManageKafkaTopic/ManageKafkaTopic";
import SetThreshold from "./Pages/SetThreshold/SetThreshold";

function App() {
  const{darkMode} = useContext(DarkModeContext);
  const loggedIn = window.localStorage.getItem("isLoggedIn");

  return (
    <div className={darkMode ? "app dark" : "app"}>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={loggedIn ? <Dashboard /> : <Login />} />
        <Route path="/Login" element={loggedIn ? <Dashboard /> : <Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/AdminTools" element={<AdminTools />} />
        <Route path="/ManageAccount" element={<ManageAccount />} />
        <Route path="/ManageKafkaTopic" element={<ManageKafkaTopic />} />
        <Route path="/SetThreshold" element={<SetThreshold />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/MonitorData" element={<MonitorData />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
   </div>
  );
}

export default App;
