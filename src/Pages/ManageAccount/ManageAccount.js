import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import Popup from "../../Components/Popup/Popup";
import { DataGrid } from "@mui/x-data-grid";
import "./ManageAccount.css";

function ManageAccount() {
  let navigate = useNavigate();

  const columns = [
    { field: "firstName", headerName: "Name", width: 230 },
    { field: "email", headerName: "Email", width: 330 },
    { field: "role", headerName: "Role", width: 130 },
    { field: "dateCreated", headerName: "Date created", width: 230 },
    { field: "permission", headerName: "Permission", width: 130 },
    { field: "remark", headerName: "Remark", width: 380 },
  ];

  const rows = [
    {
      id: 1,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
      remark: "This account is created recently",
    },
    {
      id: 2,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
      remark: "This account is not admin and only got a limite feature",
    },
    {
      id: 3,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
    },
    {
      id: 4,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
    },
    {
      id: 5,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
    },
    {
      id: 6,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
    },
    {
      id: 7,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
    },
    {
      id: 8,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
    },
    {
      id: 9,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
    },
    {
      id: 10,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
    },
    {
      id: 11,
      firstName: "Ryan",
      email: "ryan@gmail.com",
      role: "user",
      dateCreated: "May 21, 2022",
    },
  ];

  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div className="manageAcc-page">
      <Sidebar />
      <div className="manageAcc-container">
        <Navbar />
        <div className="welcome-msg">Account Logs</div>
        <div>
          <button
            type="button"
            className="go-back"
            onClick={() => {
              navigate("/AdminTools");
            }}
          >
            Back
          </button>
        </div>
        <div className="add-delete">
          <button
            type="button"
            className="add-btn"
            onClick={() => {
              setButtonPopup(true);
            }}
          >
            Add
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => {
              navigate("/AdminTools");
            }}
          >
            Delete
          </button>
        </div>
        <div
          style={{ height: 476, width: "90%", marginLeft: 50, marginTop: 20 }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2>Account Creation</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>
              <input type="text"></input>
            </th>
          </tr>
          <tr>
            <th>Username</th>
            <th>
              <input type="text"></input>
            </th>
          </tr>
          <tr>
            <th>Password</th>
            <th>
              <input type="text"></input>
            </th>
          </tr>
          <tr>
            <th>Role</th>
            <th>
              <input type="text"></input>
            </th>
          </tr>
        </table>
      </Popup>
    </div>
  );
}

export default ManageAccount;
