import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import * as Yup from "yup";
import { Field, Formik, useFormik } from "formik";
import "./SetThreshold.css";

function SetThreshold() {
  let navigate = useNavigate();

  //   const dropdownOptions = [
  //     { key: "Select an Topic", value: "" },
  //     { key: "Topic 1", value: "Topic 1" },
  //     { key: "Topic 2", value: "Topic 2" },
  //     { key: "Topic 3", value: "Topic 3" },
  //   ]
  const formik = useFormik({
    initialValues: {
      TopicName: "",
      partitions: "",
      replication: "",
      threshold: "",
    },
    validationSchema: Yup.object().shape({
      TopicName: Yup.string().required("Topic is required"),
      partitions: Yup.string().required("Partitions is required"),
      replication: Yup.string().required("Replication is required"),
      threshold: Yup.string().required("Threshold is required"),
    }),
    onSubmit(values, { resetForm }) {
      console.log(values);

      const data = {
        TopicName: values.TopicName,
        partitions: values.partitions,
        replication: values.replication,
        threshold: values.threshold,
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
          alert(
            values.TopicName +
              " Threshold of " +
              values.threshold +
              " has been set successfully!"
          );
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
    <div className="SetThreshold-page">
      <Sidebar />
      <div className="SetThreshold-container">
        <Navbar />
        <div className="SetThreshold-msg">Set Threshold</div>
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
            <table className="set-threshold-value">
              <tr>
                <th className="kafka-topic-th">Topic name</th>
                <th className="kafka-topic-th">
                  <select
                    className="kafka-text-box"
                    name="TopicName"
                    onChange={formik.handleChange}
                    value={formik.values.TopicName}
                  >
                    <option value="">Select a Topic</option>
                    <option value="Topic 1">Topic 1</option>
                    <option value="Topic 2">Topic 2</option>
                    <option value="Topic 3">Topic 3</option>
                    <option value="Topic 4">Topic 4</option>
                  </select>
                  <span className="error-msg">{formik.errors.TopicName}</span>
                </th>
              </tr>
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
                <th className="kafka-topic-th">Threshold</th>
                <th className="kafka-topic-th">
                  <input
                    className="kafka-text-box"
                    name="threshold"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.threshold}
                  ></input>
                  <span className="error-msg">{formik.errors.threshold}</span>
                </th>
              </tr>
              <tr>
                <div className="confirm-threshold">
                  <button
                    type="submit"
                    className="confirm-btn"
                    // onClick={() => {
                    //   navigate("/AdminTools");
                    // }}
                  >
                    Confirm
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

export default SetThreshold;
