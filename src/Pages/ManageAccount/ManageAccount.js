import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import Popup from "../../Components/Popup/Popup";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import "./ManageAccount.css";

function ManageAccount() {
  let navigate = useNavigate();

  const [buttonPopup, setButtonPopup] = useState(false);
  const [deleteUsers, setDeleteUsers] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  
  const deleteUsersOnClick = (async (event) => {
    const response = await axios
    .post("http://localhost:8080/api/v1/login/deleteUsers", selectedRows, {
      auth: {
        username: "user",
        password: "password",
      },
    })
    .then((res) => {
      console.log("Result: " + res + " - deleted sucessfully");
      alert("Deleted successfully!")
    })
    .catch((err) => {
      console.log(err);
    }); 

    setDeleteUsers(current => !current)
  });

  const columns = [
    { field: "name", headerName: "Name", width: 300},
    { field: "email", headerName: "Email", width: 400},
    { field: "admin", headerName: "Admin", width: 200},
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      admin: false,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/(?=.*[0-9])/, "Password must contain at least a number"),
    }),
    onSubmit(values, {resetForm}) {
      console.log(values);

      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        admin: values.admin, 
      };

      axios
        .post("http://localhost:8080/api/v1/login/addUser", data, {
          auth: {
            username: "user",
            password: "password",
          },
        })
        .then((res) => {
          console.log(res);
          alert(values.email + " has been added successfully!")
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong!")
          resetForm();
        });
    },
  });

  // fetch all user data from backend server
  useEffect(() => {
    console.log("Awaiting userlist data from server...");

    axios
    .get("http://localhost:8080/api/v1/login/getUser", {
      auth: {
        username: "user",
        password: "password",
      },
    })
    .then((res) => {
      console.log("Users set!");
      console.log(res.data);
      res.data.map((user) => {
        console.log(user);
        if(user.admin === true) {
          console.log("Yes");
          return (user.admin = "Yes");
        }
        if(user.admin === false) {
          console.log("no");
          return (user.admin = "No")
        }
      })
 
      setRows(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [buttonPopup, deleteUsers]);

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
            }}>
            Back
          </button>
        </div>
        <div className="add-delete">
          <button
            type="button"
            className="add-btn"
            onClick={() => {
              setButtonPopup(true);
            }}>
            Add
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => {
              deleteUsersOnClick();
            }}>
            Delete
          </button>
        </div>
        <div
          style={{ height: 476, width: "90%", marginLeft: 50, marginTop: 20 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(items) => {
              const selectedItems = new Set(items);
              const selectedRowData = rows.filter((row) => 
                selectedItems.has(row.id), 
              );
              setSelectedRows(selectedRowData);
              console.log(selectedRowData);
            }}
          />
        </div>
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2>Account Creation</h2>
        <Formik>
          <form onSubmit={formik.handleSubmit}>
            <table className="add-account">
              <tr>
                <th className="kafka-topic-th">Name</th>
                <th className="kafka-topic-th">
                  <input 
                  className= "kafka-text-box"
                    name="name" 
                    type="text" 
                    onChange={formik.handleChange}
                    value={formik.values.name}>
                  </input>
                  <span className="error-msg">{formik.errors.name}</span>
                </th>
              </tr>
              <tr>
              </tr>
              <tr>
                <th className="kafka-topic-th">Email</th>
                <th className="kafka-topic-th">
                  <input 
                  className= "kafka-text-box"
                    name="email" 
                    type="text" 
                    onChange={formik.handleChange}
                    value={formik.values.email}>
                    </input>
                    <span className="error-msg">{formik.errors.email}</span>
                </th>
              </tr>
              <tr>
              </tr>
              <tr>
                <th className="kafka-topic-th">Password</th>
                <th className="kafka-topic-th">
                  <input 
                  className= "kafka-text-box"
                    name="password" 
                    type="password" 
                    onChange={formik.handleChange}
                    value={formik.values.password}>
                  </input>
                  <span className="error-msg">{formik.errors.password}</span>
                </th>
              </tr>
              <tr>
              </tr>
              <tr>
                <th className="kafka-topic-th">Admin User</th>
                <th className="kafka-topic-th">
                  <input 
                    name="admin" 
                    type="checkbox"
                    onChange={formik.handleChange}
                    value={formik.values.admin}>
                  </input>
                </th>
              </tr>
              <tr>
                <th>
                  <button className="create-account-btn" type="submit">
                    + Create
                  </button>
                </th>
              </tr>
            </table>
          </form>
        </Formik>
      </Popup>
    </div>
  );
}

export default ManageAccount;
