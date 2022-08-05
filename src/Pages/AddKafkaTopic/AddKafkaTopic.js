import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import Popup from "../../Components/Popup/Popup";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import "./AddKafkaTopic.css";

function AddKafkaTopic() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      TopicName: "",
      partitions: "",
      replication: "",
    },
    validationSchema: Yup.object().shape({
      TopicName: Yup.string().required("Topic name is required"),
      partitions: Yup.string().required("partitions is required"),
      replication: Yup.string().required("replication is required"),
    }),
    onSubmit(values, { resetForm }) {
      console.log(values);

      const data = {
        TopicName: values.TopicName,
        partitions: values.partitions,
        replication: values.replication,
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
          alert(values.name + " has been added successfully!");
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
    <div className="AddKafkaTopic-page">
      <Sidebar />
      <div className="AddKafkaTopic-container">
        <Navbar />
        <div className="AddKafkaTopic-msg">Topic creation</div>
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
        <Formik>
          <form onSubmit={formik.handleSubmit}>
            <table className="add-kafka-topic">
              <tr>
                <th className="kafka-topic-th">Topic name</th>
                <th className="kafka-topic-th">
                  <input
                    className="kafka-text-box"
                    name="TopicName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.TopicName}
                  ></input>
                  <span className="error-msg">{formik.errors.TopicName}</span>
                </th>
              </tr>
              <tr></tr>
              <tr>
                <th className="kafka-topic-th">Number of partitions</th>
                <th className="kafka-topic-th">
                  <input
                    className="kafka-text-box"
                    name="partitions"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.partitions}
                  ></input>
                  <span className="error-msg">{formik.errors.partitions}</span>
                </th>
              </tr>
              <tr></tr>
              <tr>
                <th className="kafka-topic-th">Replication factor</th>
                <th className="kafka-topic-th">
                  <input
                    className="kafka-text-box"
                    name="replication"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.replication}
                  ></input>
                  <span className="error-msg">{formik.errors.replication}</span>
                </th>
              </tr>
              <tr>
                <div className="create-topic">
                  <button
                    type="submit"
                    className="create-btn"
                    // onClick={() => {
                    //   navigate("/AdminTools");
                    // }}
                  >
                    + Create
                  </button>
                </div>
              </tr>
            </table>
          </form>
        </Formik>
      </div>
    </div>
  );
}

export default AddKafkaTopic;
