import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  Form,
  DatePicker,
  Input,
  Table,
  Modal,
  Popconfirm,
  Select,
  Typography,
  notification,
} from "antd";

import {
  getAthleteById,
  ulploadFilesToAthlete,
} from "../../../service/athlete/athlete.js";
import { getAllFilesByAthlete } from "../../../service/file/file.js";
import {
  createTrainingSession,
  updateTrainingSession,
  deleteTrainingSessionById,
  deleteAllTrainingSessionById,
} from "../../../service/perfromance/trainingSession.js";
import {
  createPerformance,
  getPerformanceByAthleteId,
} from "../../../service/perfromance/performance.js";
import UploadCustomFile from "../../fileHandle/uploadCustomFile.js";
import FetchFiles from "../../fileHandle/fetchFiles.js";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import "./athleteDetailsDashboard.css";

const AthleteDetailsDashboard = () => {
  //athlete
  const { athleteId } = useParams();
  const [athlete, setAthlete] = useState({});

  //performance
  const [isAddingPerformance, setIsAddingPerformance] = useState(false);
  const [isPerformanceExists, setIsPerformanceExists] = useState(false);
  const [performance, setPerformance] = useState({
    federationNote: "",
    createdAT: null,
    updatedAT: null,
    createdBy: null,
    updatedBy: null,
    trainingSessionList :[{
      id: "",
      sessionNote: "",
      date: "",
      createdAt: "",
      updatedAt: "",
      createdBy: "",
      updatedBy: "",
    }]
  });

  //trainingSession
  const [trainingSession, setTrainingSession] = useState([]);
  const [isAddingTrainingSession, setIsAddingTrainingSession] = useState(false);
  const [isEditingSessionModal, setIsEditingSessionModal] = useState(false);
  const [currentSession, setCurrentSession] = useState({
    id: "",
    sessionNote: "",
    date: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
  });

  //Get Athlete  By Id
  const getAthleteByIdData = async (athleteId) => {
    try {
      const response = await getAthleteById(athleteId, performance);
      console.log("response get Athlete By Id Data", response);
      setAthlete(response);
    } catch (err) {
      console.log("error of get Athlete By Id Data", err);
    }
  };

  //Add performance Process
  const onOKAddPerformanceModal = () => {
    const jsonPerformance = {
      federationNote: performance.federationNote,
    };
    console.log("jsonPerformance ", jsonPerformance);
    handleCreatePerfromance(athleteId, jsonPerformance);
  };

  const handleCreatePerfromance = async (athleteId, jsonPerformance) => {
    try {
      const response = await createPerformance(athleteId, jsonPerformance);
      console.log("response of create Performance :", response);
      setPerformance(response);
      setIsAddingPerformance(false);
      setIsPerformanceExists(true);
    } catch (err) {
      console.log("error of create Performance : ", err);
    }
  };

  //Get performance By Id Process
  const getPerformanceByAthleteIdData = async (athleteId) => {
    try {
      const response = await getPerformanceByAthleteId(athleteId);
      console.log("getPerformanceByAthleteIdData response ", response);
      response ? setIsPerformanceExists(true) : setIsPerformanceExists(false);
      setPerformance({
        federationNote: response.federationNote,
        createdAT: response.createdAT,
        updatedAT: response.updatedAT,
        createdBy: response.createdBy,
        updatedBy: response.updatedBy,
        trainingSessionList : response.trainingSessionList
      });
    } catch (err) {
      console.log("getPerformanceByAthleteIdData error ", err);
    }
  };

  //training session

  const sessionTableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Session Note",
      dataIndex: "sessionNote",
      key: "sessionNote",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => formatDateTime(text),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => (text ? formatDateTime(text) : "N/A"),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (_, record) => {
        const { createdBy } = record;
        return createdBy
          ? `${createdBy.firstname} ${createdBy.lastname}`
          : "Unknown";
      },
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      render: (_, record) => {
        const { updatedBy } = record;
        return updatedBy
          ? `${updatedBy.firstname} ${updatedBy.lastname}`
          : "Not Updated Yet";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="icon-container">
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => handleEditSession(record)}
          />

          <Popconfirm
            title="Are you sure to delete this trainig session?"
            onConfirm={() => handleDeleteTrainingSession(record.id)}
            placement="left"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditSession = async (record) => {
    try {
      setCurrentSession({
        id: record.id,
        sessionNote: record.sessionNote,
        date: record.date,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        createdBy: record.createdBy,
        updatedBy: record.updatedBy,
      });
      setIsEditingSessionModal(true);
    } catch (err) {
      console.log("error handle Delete Session   : ", err);
    }
  };

  const handleDeleteTrainingSession = async (sessionId) => {
    try {
      const response = await deleteTrainingSessionById(sessionId);
      notification.success({
        message: "Success",
        description: response,
        placement: "topRight",
      });
      setTrainingSession(
        trainingSession.filter((session) => session.id !== sessionId)
      );
    } catch (err) {
      console.log("error handle Delete Session   : ", err);
    }
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };

  const onCancelPerformanceModal = () => {
    setIsAddingPerformance(false);
    setPerformance({
      federationNote: "",
      createdAT: null,
      updatedAT: null,
      createdBy: null,
      updatedBy: null,
    });
  };

  // useEffect
  useEffect(() => {
    getAthleteByIdData(athleteId);
    getPerformanceByAthleteIdData(athleteId);
  }, [athleteId , performance.trainingSessionList.length]);

  return (
    <div className="athlete-details-dashboard-container">
      {athlete ? (
        <>
          <h2>
            {athlete.firstname} {athlete.lastname}
          </h2>
          <div className="athlete-details">
            <p>
              <strong>Email:</strong> {athlete.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {athlete.phoneNumber}
            </p>
            <p>
              <strong>Licence ID:</strong> {athlete.licenceID}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(athlete.dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <strong>Branch:</strong> {athlete.branch}
            </p>
            <p>
              <strong>Joined On:</strong>{" "}
              {new Date(athlete.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Medals:</strong> {athlete.hasMedal ? "Yes" : "No"}
            </p>
          </div>
        </>
      ) : (
        <p>Athlete not found</p>
      )}
      {/** file uploading */}
      <UploadCustomFile
        uploadCustomFiles={ulploadFilesToAthlete}
        id={athleteId}
      />
      <div className="athlete-images-container">
        <FetchFiles getSpecificFiles={getAllFilesByAthlete} id={athleteId} />
      </div>
      {isPerformanceExists ? (
        <div className="performance-container">
            <div className="performance-content">
              <h2>Performance Details</h2>
              <p><strong>Federation Note:</strong> {performance.federationNote || "N/A"}</p>
              <p><strong>Created At:</strong> {performance.createdAT ? formatDateTime(performance.createdAT) : "N/A"}</p>
              <p><strong>Updated At:</strong> {performance.updatedAT ? formatDateTime(performance.updatedAT) : "N/A"}</p>

              <p><strong>Created By:</strong> {
                performance.createdBy ? (
                    `${performance.createdBy?.firstname} ${performance.createdBy?.lastname }`
                ) : (
                    "Unknown"
                )
              }</p>

              <p><strong>Updated By:</strong> {
                performance.updatedBy ? (
                    `${performance.updatedBy.firstname} ${performance.updatedBy.lastname}`
                ) : (
                    "Not Updated Yet"
                )
              }</p>
            </div>

            <div className="training-session-container">
              <Button
                type="primary"
                onClick={() => setIsAddingTrainingSession(true)}
                style={{ marginBottom: 16, maxWidth: 200 }}
              >
                Add Training Session
              </Button>

              <Table
                dataSource={performance.trainingSessionList}
                columns={sessionTableColumns}
              />
            </div>
        </div>
      ) : (
        <>
          <Button
            type="primary"
            onClick={() => setIsAddingPerformance(true)}
            style={{ marginBottom: 16, maxWidth: 200 }}
          >
            Add Performance
          </Button>

          <Modal
            open={isAddingPerformance}
            okText="Add"
            cancelText="cancel"
            onOk={() => onOKAddPerformanceModal()}
            onCancel={() => onCancelPerformanceModal()}
          >
            <Form
              initialValues={{
                federationNote: performance.federationNote || "",
              }}
              onValuesChange={(_, allValues) => {
                setPerformance((prevState) => ({ ...prevState, ...allValues }));
              }}
            >
              <Form.Item
                label="Federation Note"
                name="federationNote"
                rules={[
                  {
                    required: true,
                    message: "Please enter the federation note!",
                  },
                ]}
              >
                <Input placeholder="Enter federation note" />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AthleteDetailsDashboard;
