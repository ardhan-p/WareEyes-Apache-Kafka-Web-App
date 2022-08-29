import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "./Settings.css";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import config from "../../Context/serverProperties.json";

// profile settings page
function Settings() {

  // useState variables for the profile variables
  const [nameUser, setName] = useState("");
  const [emailUser, setEmail] = useState("");
  const [adminUser, setAdmin] = useState("");

  // form submission configuration
  const formik = useFormik({
    initialValues: {
      id: window.localStorage.getItem("userID"),
      name: nameUser,
      email: emailUser,
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/(?=.*[0-9])/, "Password must contain at least a number"),
    }),
    onSubmit(values, { resetForm }) {
      console.log(values);

      const data = {
        id: values.id,
        name: values.name,
        email: values.email,
        password: values.password,
      };

      console.log(data);

      // sends an HTTP POST for new profile values inputted by user
      axios
        .post(config["backend-url"] + "/api/v1/login/updateUser", data, {
          auth: {
            username: "user",
            password: "password",
          },
        })
        .then((res) => {
          if (res.data == 1) {
  
            window.localStorage.setItem("currentName", values.name);
            window.localStorage.setItem("currentEmail", values.email);
  
            setName(values.name);
            setEmail(values.email);

            alert(values.name + " has been edited successfully!");
          } else {
            alert("Unable to edit your account with details inputted!")
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Problem has occurred when editing your account!");
        });
    },
  });

  // useEffect function to initialise the profile variables from database
  useEffect(() => {
    let status = false;

    const url = config["backend-url"] + "/api/v1/login/getUser/" + window.localStorage.getItem("userID");

    console.log(url);

    // sends an HTTP GET request to fetch the user profile info
    axios
    .get(url, {
      auth: {
        username: "user",
        password: "password",
      },
    })
    .then((res) => {
      if (!status) {
        console.log(res.data);
        setEmail(res.data.email);
        setName(res.data.name);
        setAdmin(res.data.admin);
      }
    })
    .catch((err) => {
      console.log(err);
    }); 

    return () => {
      console.log("Cancelled!")
      status = true;
    }

  }, []);

  return (
    <div className="setting-page">
      <Sidebar />
      <div className="setting-container">
        <Navbar />
        <div className="setting-msg">Settings</div>
        <div className="setting-div">
          <AccountCircleIcon style={{ fontSize: 250, marginLeft: "25%", color: '#4869B2'}} />
          <Formik>
            <form onSubmit={formik.handleSubmit}>
              <table className="setting-table">
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
                <tr>
                  <th>
                    <input
                      className="setting-text-box"
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    ></input>{" "}
                    <tr></tr>
                    <span className="error-msg">{formik.errors.name}</span>
                  </th>
                  <th className="setting-admin-role">{adminUser === true ? "Admin" : "User"}</th>
                </tr>
                <tr>
                  <th>Email</th>
                </tr>
                <tr>
                  <th>
                    <input
                      className="setting-text-box"
                      name="email"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    ></input>{" "}
                    <tr></tr>
                    <span className="error-msg">{formik.errors.email}</span>
                  </th>
                </tr>
                <tr>
                  <th>Password</th>
                </tr>
                <tr>
                  <th>
                    <input
                      className="setting-text-box"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="******"
                    ></input>
                    <tr></tr>
                    <span className="error-msg">{formik.errors.password}</span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <button type="submit" className="change-button">Change Account Details</button>
                  </th>
                </tr>
              </table>
            </form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Settings;
