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
import moment from "moment";

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
  updatePerformance
} from "../../../service/perfromance/performance.js";
import UploadCustomFile from "../../fileHandle/uploadCustomFile.js";
import FetchFiles from "../../fileHandle/fetchFiles.js";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import "./athleteDetailsDashboard.css";

const AthleteDetailsDashboard = () => {
  const [reloadFlag , setReloadFlag] = useState(false);
  //athlete
  const { athleteId } = useParams();
  const [athlete, setAthlete] = useState({});

  //performance
  const [isAddingPerformance, setIsAddingPerformance] = useState(false);
  const[isEditingPerformance,setIsEditinPerformance] = useState(false);
  const [isPerformanceExists, setIsPerformanceExists] = useState(false);
  const [performance, setPerformance] = useState({
    id: "",
    federationNote: "",
    createdAT: null,
    updatedAT: null,
    createdBy: null,
    updatedBy: null,
    trainingSessionList: [
      {
        id: "",
        sessionNote: "",
        date: "",
        createdAt: "",
        updatedAt: "",
        createdBy: "",
        updatedBy: "",
      },
    ],
  });

  //trainingSession
  const [currentSession, setCurrentSession] = useState({
    id: "",
    sessionNote: "",
    date: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
  });
  const [isAddingTrainingSession, setIsAddingTrainingSession] = useState(false);
  const [isEditingSessionModal, setIsEditingSessionModal] = useState(false);

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

  const onCancelPerformanceModal = () => {
    setIsAddingPerformance(false);
    setIsEditinPerformance(false);
    setPerformance({
      federationNote: "",
      createdAT: null,
      updatedAT: null,
      createdBy: null,
      updatedBy: null,
    });
  };

  const handleCreatePerfromance = async (athleteId, jsonPerformance) => {
    try {
      const response = await createPerformance(athleteId, jsonPerformance);
      console.log("response of create Performance :", response);
      setPerformance(response);
      setIsAddingPerformance(false);
      setIsPerformanceExists(true);
      setReloadFlag(!reloadFlag);
    } catch (err) {
      console.log("error of create Performance : ", err);
    }
  };

  //EDit Performance
  const onOKEditingPerformance= ()=> {
    const jsonPerformance = {
      federationNote: performance.federationNote,
    };
    handleEditPerformance(performance.id,jsonPerformance)
  }

  const handleEditPerformance = (performance , jsonPerformance)=>{
    try {
      const response = updatePerformance(performance, jsonPerformance);
      console.log("response of edit Performance :", response);
      setPerformance(response);
      setIsAddingPerformance(false);
      setIsEditinPerformance(false)
      setIsPerformanceExists(true);
      setReloadFlag(!reloadFlag);
    } catch (err) {
      console.log("error of edit Performance : ", err);
    }

  }
  //Get performance By Id Process
  const getPerformanceByAthleteIdData = async (athleteId) => {
    try {
      const response = await getPerformanceByAthleteId(athleteId);
      console.log("getPerformanceByAthleteIdData response ", response);
      response ? setIsPerformanceExists(true) : setIsPerformanceExists(false);
      setPerformance({
        id: response.id,
        federationNote: response.federationNote,
        createdAT: response.createdAT,
        updatedAT: response.updatedAT,
        createdBy: response.createdBy,
        updatedBy: response.updatedBy,
        trainingSessionList: response.trainingSessionList,
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

  //CREATE training Session
  const onOKAddTrainingSessionModal = () => {
    const jsonTrainingSession = {
      sessionNote: currentSession.sessionNote,
      date: currentSession.date,
    };
    handleCreateTrainingSession(jsonTrainingSession);
  };

  const handleCreateTrainingSession = (jsonTrainingSession) => {
    try {
      const response = createTrainingSession(
        performance.id,
        jsonTrainingSession
      );
      console.log("response of create TrainingSession :", response);
      setCurrentSession(response);
      setIsAddingTrainingSession(false);
      setReloadFlag(!reloadFlag);

    } catch (err) {
      console.log("error of create Performance : ", err);
    }
  };

  const onCancelTrainingSessionModal = () => {
    setIsAddingTrainingSession(false);
    setIsEditingSessionModal(false);
    setCurrentSession({
      id: null,
      sessionNote: "",
      date: null,
      createdAt: null,
      updatedAt: null,
      createdBy: null,
      updatedBy: null,
    });
  };

  //EDIT SESSION
  const handleEditSession = async (record) => {
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
  };

  const onOkEditTrainingSessionModal = () => {
    const jsonTrainingSession = {
      sessionNote: currentSession.sessionNote,
      date: currentSession.date,
    };
    handleEditTrainingSession(jsonTrainingSession);
  };

  const handleEditTrainingSession = (jsonTrainingSession) => {
    try {
      const response = updateTrainingSession(
        currentSession.id,
        jsonTrainingSession
      );
      console.log("response of edit Training Session :", response);
      setCurrentSession(response);
      setIsEditingSessionModal(false);
      setReloadFlag(!reloadFlag);

    } catch (err) {
      console.log("error of edit Training Session : ", err);
    }
  };

  //DELETE SESSION
  const handleDeleteTrainingSession = async (sessionId) => {
    try {
      const response = await deleteTrainingSessionById(sessionId);
      notification.success({
        message: "Success",
        description: response,
        placement: "topRight",
      });
      setReloadFlag(!reloadFlag);

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
      day: "2-digit",
    });
  };

  // useEffect
  useEffect(() => {
    getAthleteByIdData(athleteId);
    getPerformanceByAthleteIdData(athleteId);
  }, [athleteId, reloadFlag]);

  return (
    <>
      {athlete ? (
        <div className="athlete-details-dashboard-container">
          <>
            <Typography.Title>
              {athlete.firstname} {athlete.lastname}
            </Typography.Title>

            <div className="dashboard-details-container">
              <>
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
              {isPerformanceExists ? (
                <div className="performance-container">
                  <Button
                    type="primary"
                    onClick={() => setIsEditinPerformance(true)}
                    style={{maxWidth: 200 }}
                  >
                    Edit Performance
                  </Button>
                  <div className="athlete-details">
                    <h2>Performance Details :</h2>
                    <p>
                      <strong>Federation Note:</strong>{" "} {performance.federationNote || "N/A"}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "} {performance.createdAT? formatDateTime(performance.createdAT): "N/A"}
                    </p>
                    <p>
                      <strong>Updated At:</strong>{" "} {performance.updatedAT ? formatDateTime(performance.updatedAT): "N/A"}
                    </p>

                    <p>
                      <strong>Created By:</strong>{" "}
                      {performance.createdBy
                        ? `${performance.createdBy?.firstname} ${performance.createdBy?.lastname}`
                        : "Unknown"}
                    </p>

                    <p>
                      <strong>Updated By:</strong>{" "}
                      {performance.updatedBy
                        ? `${performance.updatedBy.firstname} ${performance.updatedBy.lastname}`
                        : "Not Updated Yet"}
                    </p>
                    
                    <Modal
                      open={isEditingPerformance}
                      okText="Add"
                      cancelText="cancel"
                      onOk={() => onOKEditingPerformance()}
                      onCancel={() => onCancelPerformanceModal()}
                    >
                      <Form
                        initialValues={{
                          federationNote: performance.federationNote || "",
                        }}
                        onValuesChange={(_, allValues) => {
                          setPerformance((prevState) => ({
                            ...prevState,
                            ...allValues,
                          }));
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
                        setPerformance((prevState) => ({
                          ...prevState,
                          ...allValues,
                        }));
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

            {/** TRAINING Session */}
            <div className="training-session-container">
              <Button
                type="primary"
                onClick={() => setIsAddingTrainingSession(true)}
                style={{ marginBottom: 16, maxWidth: 200 }}
              >
                Add Training Session
              </Button>

              <Modal
                open={isAddingTrainingSession || isEditingSessionModal}
                okText="Add"
                cancelText="cancel"
                onOk={() => {
                  isAddingTrainingSession
                    ? onOKAddTrainingSessionModal()
                    : onOkEditTrainingSessionModal();
                }}
                onCancel={() => onCancelTrainingSessionModal()}
              >
                <Form
                  initialValues={{
                    sessionNote: currentSession.sessionNote || "",
                    date: currentSession.date
                      ? moment(currentSession.date)
                      : null,
                  }}
                  onValuesChange={(_, allValues) => {
                    setCurrentSession((prevState) => ({
                      ...prevState,
                      ...allValues,
                    }));
                  }}
                >
                  <Form.Item
                    label="Session Note"
                    name="sessionNote"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Training Session Note!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Training Session Note" />
                  </Form.Item>

                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                      { required: true, message: "Please select the date!" },
                    ]}
                  >
                    <DatePicker
                      showTime
                      placeholder="Select event date and time"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                </Form>
              </Modal>

              <Table
                dataSource={performance.trainingSessionList}
                columns={sessionTableColumns}
              />
            </div>

            {/** File uploading */}
            <div className="athlete-upload-images-container">
              <UploadCustomFile
                uploadCustomFiles={ulploadFilesToAthlete}
                id={athleteId}
              />
              <div className="images-grid">
                <FetchFiles
                  getSpecificFiles={getAllFilesByAthlete}
                  id={athleteId}
                />
              </div>
            </div>
          </>
        </div>
      ) : (
        <Typography.Text>No athlete data found</Typography.Text>
      )}
    </>
  );
};

export default AthleteDetailsDashboard;
