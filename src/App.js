import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login/Login';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import MonitorData from './Pages/MonitorData/MonitorData';
import Notifications from './Pages/Notifications/Notifications';
import Settings from './Pages/Settings/Settings';
import React from 'react'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/wareeyes-reactjs-frontend" element={<Login />} />
        <Route path="/wareeyes-reactjs-frontend/Login" element={<Login />} />
        <Route path="/wareeyes-reactjs-frontend/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/wareeyes-reactjs-frontend/ResetPassword" element={<ResetPassword />} />
        <Route path="/wareeyes-reactjs-frontend/Dashboard" element={<Dashboard />} />
        <Route path="/wareeyes-reactjs-frontend/MonitorData" element={<MonitorData />} />
        <Route path="/wareeyes-reactjs-frontend/Notifications" element={<Notifications />} />
        <Route path="/wareeyes-reactjs-frontend/Settings" element={<Settings />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
