import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "./Settings.css";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Settings() {
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
    onSubmit(values, { resetForm }) {
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
          alert(values.name + " has been edited successfully!");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong!");
          resetForm();
        });
    },
  });

  return (
    <div className="setting-page">
      <Sidebar />
      <div className="setting-container">
        <Navbar />
        <div className="setting-msg">Settings</div>
        <AccountCircleIcon style={{ fontSize: 250, marginLeft: 250 }} />
        <button className="edit-photo"> edit photo</button>
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
                    placeholder="name"
                  ></input>{" "}
                  <tr></tr>
                  <span className="error-msg">{formik.errors.name}</span>
                </th>
                <th>Display if is admin</th>
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
                    placeholder="email"
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
                  <button type="submit" className="change-button">Change Password</button>
                </th>
              </tr>
            </table>
          </form>
        </Formik>
      </div>
    </div>
  );
}

export default Settings;
