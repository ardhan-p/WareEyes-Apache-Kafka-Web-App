import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import Popup from "../../Components/Popup/Popup";
import axios from "axios";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { DataGrid, gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import "./ManageKafkatopic.css";
import config from "../../Context/serverProperties.json";

// kafka topic management page
function ManageKafkaTopic() {
  let navigate = useNavigate();

  // useState variables to manage the state of current page
  const [buttonAddPopup, setButtonAddPopup] = useState(false);
  const [buttonEditPopup, setButtonEditPopup] = useState(false);
  const [popupSelect, setPopupSelect] = useState(false);
  const [deleteUsers, setDeleteUsers] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [topicList, setTopicList] = useState([]);

  // fetch all topic data from backend server using an HTTP GET request
  useEffect(() => {
    let status = false;
    console.log("Awaiting Kafka Topic data from server...");

    axios
      .get(config["backend-url"] + "/api/v1/kafka/get", {
        auth: {
          username: "user",
          password: "password",
        },
      })
      .then((res) => {
        if (!status) {
          console.log(res.data);
          console.log("Topic set!");
          setRows(res.data);
          setTopicList(res.data.map((topic) => {
            return topic.name;
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      status = true;
    };
  }, [popupSelect, deleteUsers]);

  // deletes the selected Kafka topic data using an HTTP POST request
  const deleteKafkaTopicOnClick = async (event) => {
    try {
      if (selectedRows.length === 0) {
        alert("No Topic selected, please select Topic to delete!");
      } else {
        await axios
          .post(
            config["backend-url"] + "/api/v1/kafka/deleteTopic",
            selectedRows,
            {
              auth: {
                username: "user",
                password: "password",
              },
            }
          )
          .then((res) => {
            console.log("Result: " + res.data + " - deleted sucessfully");
            alert("Deleted successfully!");
          })
          .catch((err) => {
            console.log(err);
          });

        setDeleteUsers((current) => !current);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // kafka topic table columns
  const columns = [
    { field: "name", headerName: "Topic", width: 400 },
    { field: "threshold", headerName: "Threshold", width: 400 },
    { field: "partitions", headerName: "Partitions", width: 200 },
    { field: "replicationFactor", headerName: "Replication Factor", width: 200, },
  ];

  // form submission configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      threshold: "",
      partitions: "",
      replicationFactor: "",
    },

    // checks if the kafka topic variables are allowed
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Topic name is required").matches(/^[a-zA-Z-]*$/, "Topic needs to be one word with no numbers! (Dashes are allowed)"),
      threshold: Yup.string().required("Threshold value is required"),
      partitions: Yup.string().required("Partitions is required"),
      replicationFactor: Yup.string().required(
        "Replication factor is required"
      ),
    }),
    onSubmit(values, { resetForm }) {
      console.log(values);

      const data = {
        name: values.name,
        threshold: values.threshold,
        partitions: values.partitions,
        replicationFactor: values.replicationFactor,
      };
      
      // sends an HTTP POST request to create a new topic in the Kafka server and database
      if (buttonAddPopup === true) {
        axios
          .post(config["backend-url"] + "/api/v1/kafka/createTopic", data, {
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
      }

      // sends an HTTP POST request to edit existing topic from the Kafka server and database
      if (buttonEditPopup === true) {
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
      }
    },
  });

  return (
    <div className="managetopic-page">
      <Sidebar />
      <div className="managetopic-container">
        <Navbar />
        <div className="managetopic-msg">Manage Kafka Topics</div>
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
        <div className="add-delete-edit">
          <button
            type="button"
            className="add-btn"
            onClick={() => {
              setButtonAddPopup(true);
            }}
          >
            Add
          </button>
          <button
            type="button"
            className="edit-btn"
            onClick={() => {
              setButtonEditPopup(true);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => {
              deleteKafkaTopicOnClick();
            }}
          >
            Delete
          </button>
        </div>
        <div
          style={{ height: 476, width: "90%", marginLeft: 50, marginTop: 20 }}
        >
          <DataGrid
            className="manage-kafka-topic-table"
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            checkboxSelection
            onSelectionModelChange={(items) => {
              const selectedItems = new Set(items);
              const selectedRowData = rows.filter((row) =>
                selectedItems.has(row.id)
              );
              setSelectedRows(selectedRowData);
              console.log(selectedRowData);
            }}
          />
        </div>
      </div>
      <Popup trigger={buttonAddPopup} setTrigger={setButtonAddPopup}>
        <h2>Kafka Topic Creation</h2>
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
                    maxlength="27"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  ></input>
                  <span className="error-msg">{formik.errors.name}</span>
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
                  <span className="error-msg">
                    {formik.errors.replicationFactor}
                  </span>
                </th>
              </tr>
              <tr>
                <div className="create-topic">
                  <button
                    type="submit"
                    className="create-btn"
                    onClick={() => {
                      setPopupSelect((current) => !current);
                    }}
                  >
                    + Create
                  </button>
                </div>
              </tr>
            </table>
          </form>
        </Formik>
      </Popup>
      <Popup trigger={buttonEditPopup} setTrigger={setButtonEditPopup}>
      <h2>Edit Kafka Topic</h2>
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
                  <span className="error-msg">
                    {formik.errors.replicationFactor}
                  </span>
                </th>
              </tr>
              <tr>
                <div className="confirm-threshold">
                  <button
                    type="submit"
                    className="create-btn"
                    onClick={() => {
                        setPopupSelect((current) => !current);
                      }}
                   >
                    Confirm
                  </button>
                </div>
              </tr>
            </table>
          </form>
        </Formik>
      </Popup>
    </div>
  );
}

export default ManageKafkaTopic;
