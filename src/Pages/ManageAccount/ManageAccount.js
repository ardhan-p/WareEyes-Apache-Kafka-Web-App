import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import "./ManageAccount.css";

function ManageAccount() {
  let navigate = useNavigate();

  const columns = [
    { field: "firstName", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "role", headerName: "Role", width: 130 },
  ];

  const rows = [
    { id: 1, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
    { id: 2, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
    { id: 3, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
    { id: 4, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
    { id: 5, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
    { id: 6, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
    { id: 7, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
    { id: 8, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
    { id: 9, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
    { id: 10, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" } ,
    { id: 11, firstName: 'Ryan', email: 'ryan@gmail.com', role: "user" },
  ];
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
        <div style={{ height: 476, width: "70%", margin:50 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
