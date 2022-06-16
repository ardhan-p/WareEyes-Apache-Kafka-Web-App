import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import ForgetPassword from './Pages/ForgetPassword';
import ErrorPage from './Pages/ErrorPage';
import DashBoard from './Pages/DashBoard';
import MonitorData from './Pages/MonitorData';
import Notifications from './Pages/Notifications';
import Settings from './Pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/MonitorData" element={<MonitorData />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
