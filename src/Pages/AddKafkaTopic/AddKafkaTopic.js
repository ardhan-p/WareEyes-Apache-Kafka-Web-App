import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import "./AddKafkaTopic.css";

function AddKafkaTopic() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      partitions: "",
      replicationFactor: "",
      threshold: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Topic name is required"),
      partitions: Yup.string().required("Partitions is required"),
      replicationFactor: Yup.string().required("Replication factor is required"),
      threshold: Yup.string().required("Threshold value is required"),
    }),
    onSubmit(values, { resetForm }) {
      console.log(values);

      const data = {
        name: values.name,
        partitions: values.partitions,
        replicationFactor: values.replicationFactor,
        threshold: values.threshold,
      };

      axios
        .post("http://localhost:8080/api/v1/kafka/createTopic", data, {
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
        <div className="AddKafkaTopic-msg">Topic Creation</div>
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
                <th className="kafka-topic-th">Topic Name</th>
                <th className="kafka-topic-th">
                  <input
                    className="kafka-text-box"
                    name="name"
                    type="text"
                    maxlength = "27"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  ></input>
                  <span className="error-msg">{formik.errors.name}</span>
                </th>
              </tr>
              <tr></tr>
              <tr>
                <th className="kafka-topic-th">Number of Partitions</th>
                <th className="kafka-topic-th">
                  <input
                    className="kafka-text-box"
                    name="partitions"
                    type="number"
                    min="1"
                    onChange={formik.handleChange}
                    value={formik.values.partitions}
                  ></input>
                  <span className="error-msg">{formik.errors.partitions}</span>
                </th>
              </tr>
              <tr></tr>
              <tr>
                <th className="kafka-topic-th">Replication Factor</th>
                <th className="kafka-topic-th">
                  <input
                    className="kafka-text-box"
                    name="replicationFactor"
                    type="number"
                    min="1"
                    onChange={formik.handleChange}
                    value={formik.values.replicationFactor}
                  ></input>
                  <span className="error-msg">{formik.errors.replicationFactor}</span>
                </th>
              </tr>
              <tr></tr>
              <tr>
                <th className="kafka-topic-th">Threshold Value</th>
                <th className="kafka-topic-th">
                  <input
                    className="kafka-text-box"
                    name="threshold"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    value={formik.values.threshold}
                  ></input>
                  <span className="error-msg">{formik.errors.threshold}</span>
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
