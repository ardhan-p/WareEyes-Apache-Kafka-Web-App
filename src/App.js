import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login/Login';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import MonitorData from './Pages/MonitorData/MonitorData';
import Notifications from './Pages/Notifications/Notifications';
import Settings from './Pages/Settings/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/MonitorData" element={<MonitorData />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
