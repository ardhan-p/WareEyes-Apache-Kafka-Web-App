import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import * as Yup from "yup";
import { Field, Formik, useFormik } from "formik";
import "./SetThreshold.css";
import config from "../../Context/serverProperties.json";

function SetThreshold() {
  let navigate = useNavigate();

  const [topicList, setTopicList] = useState(["Default Topic1"]);

  const formik = useFormik({
    initialValues: {
      name: "",
      threshold: "",
      partitions: "",
      replicationFactor: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Topic is required"),
      threshold: Yup.string().required("Threshold value is required"),
      partitions: Yup.string().required("Partitions is required"),
      replicationFactor: Yup.string().required("Replication factor is required"),
    }),
    onSubmit(values, { resetForm }) {
      console.log(values);

      const data = {
        name: values.name,
        threshold: values.threshold,
        partitions: values.partitions,
        replicationFactor: values.replicationFactor,
      };

      axios
        .post(config["backend-url"] + "/api/v1/kafka/modifyTopic", data, {
          auth: {
            username: "user",
            password: "password",
          },
        })
        .then((res) => {
          console.log(res);
          alert(
            values.name +
              " - Threshold of " +
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

  useEffect(() => {
    axios
    .get(config["backend-url"] + "/api/v1/kafka/get", {
      auth: {
        username: "user",
        password: "password",
      },
    })
    .then((res) => {
      setTopicList(res.data.map((topic) => {
        return topic.name;
      }));
      console.log("Topic list set!");
    })
    .catch((err) => {
      console.log(err);
    }); 
  }, [])

  return (
    <div className="SetThreshold-page">
      <Sidebar />
      <div className="SetThreshold-container">
        <Navbar />
        <div className="SetThreshold-msg">Set Kafka Topic Threshold</div>
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
                <th className="kafka-topic-th">Topic Name</th>
                <th className="kafka-topic-th">
                  <select
                    className="kafka-text-box"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  >
                    {topicList.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <span className="error-msg">{formik.errors.name}</span>
                </th>
              </tr>
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
