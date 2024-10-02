import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  Form,
  Input,
  Table,
  Modal,
  Popconfirm,
  Select,
  Typography,
  notification,
} from "antd";
import {
  createPerformance,
  getPerformanceByAthleteId,
} from "../../../service/perfromance/performance.js";
import { getAthleteById  , ulploadFilesToAthlete} from "../../../service/athlete/athlete.js";
import { getAllFilesByAthlete } from "../../../service/file/file.js";
import UploadCustomFile from "../../fileHandle/uploadCustomFile.js"
import FetchFiles from "../../fileHandle/fetchFiles.js";

import "./athleteDetailsDashboard.css";

const AthleteDetailsDashboard = () => {
  const { athleteId } = useParams();

  const [athlete, setAthlete] = useState({});
  const [isAddingPerformance, setIsAddingPerformance] = useState(false);
  const [isPerformanceExists, setIsPerformanceExists] = useState(false);
  
  const [performance, setPerformance] = useState({
    federationNote: "",
    createdAT: null,
    updatedAT: null,
    createdBy: null,
    updatedBy: null,
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
  const onOKAddModal = () => {
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
      });
    } catch (err) {
      console.log("getPerformanceByAthleteIdData error ", err);
    }
  };

  const onCancelModal = () => {
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
  }, [athleteId]);

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
      {isPerformanceExists ? (
        <>
          <p> there is already performances</p>
        </>
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
            onOk={() => onOKAddModal()}
            onCancel={() => onCancelModal()}
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
      <div className="athlete-images-container">
        <FetchFiles 
          getSpecificFiles={getAllFilesByAthlete}
          id={athleteId}
        />
      </div>    
    </div>
  );
};

export default AthleteDetailsDashboard;