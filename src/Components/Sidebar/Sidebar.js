import React from "react";
import "./Sidebar.css";
import { useNavigate, Link } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function Sidebar() {
  let navigate = useNavigate();

  // function IsAdmin(props) {
  //   return (
  //     console.log(props.Admin + " true"),
  //     (
  //       <Link to="/Settings">
  //         <li>
  //           <AdminPanelSettingsIcon className="icon" />
  //           <span className="title"> Admin Tools</span>
  //         </li>
  //       </Link>
  //     )
  //   );
  // }

  // function NotAdmin(props) {
  //   const isLoggedIn = window.localStorage.getItem("isAdmin");
  //   return console.log(props.Admin + " false");
  // }
  // const test = window.localStorage.getItem("isAdmin");
  // function AdminTools(props) {
  //   if (test === true) {
  //     console.log(test + " is admin");
  //     return <IsAdmin />;
  //   } else if (test === false) {
  //     console.log(test + " is not admin");
  //     return <NotAdmin />;
  //   }
  // }

  return (
    <div className="sidebar">
      <Link to="/DashBoard">
        <div className="top">
          <span className="logo"> WareEyes </span>
        </div>
      </Link>
      <div className="center">
        <ul>
          <Link to="/DashBoard">
            <li>
              <HouseIcon className="icon" />
              <span className="title"> Dashboard </span>
            </li>
          </Link>
          {/* <AdminTools /> */}
          <Link to="/MonitorData">
            <li>
              <BarChartIcon className="icon" />
              <span className="title"> Monitor Data </span>
            </li>
          </Link>
          <Link to="/Notifications">
            <li>
              <NotificationsNoneIcon className="icon" />
              <div className="counter">1</div>
              <span className="title"> Notification </span>
            </li>
          </Link>
          <Link to="/Settings">
            <li>
              <SettingsIcon className="icon" />
              <span className="title"> Settings</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <button
          className="logout-btn"
          type="button"
          onClick={() => {
            window.localStorage.removeItem("isLoggedIn");
            window.localStorage.removeItem("isAdmin");
            window.localStorage.removeItem("currentEmail");
            navigate("/");
            setTimeout(() => {
              window.location.reload();
            }, 600);
          }}
        >
          {" "}
          <LogoutIcon className="logout-icon" /> Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
