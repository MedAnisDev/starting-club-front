import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAthleteById } from "../../service/athlete/athlete.js";
import { getAllFilesByAthlete } from "../../service/file/file.js";
import FetchFiles from "../fileHandle/fetchFiles.js";

import { Typography } from "antd";
import "./athleteProfile.css";

const AthleteProfile = () => {
  const { athleteId } = useParams();
  const [athlete, setAthlete] = useState({});

  const getAthleteByIdData = async (athleteId) => {
    try {
      const response = await getAthleteById(athleteId);
      console.log("getAthleteById repsonse : ", response);
      setAthlete(response);
    } catch (err) {
      console.log("error from getAthleteByIdData", err);
    }
  };

  useEffect(() => {
    getAthleteByIdData(athleteId);
  }, [athleteId]);

  return (
    <div className="public-details-container">
      {athlete ? (
        <>
          <h1 className="title">
            {athlete.firstname} {athlete.lastname}
          </h1>
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

          <div className="images-grid">
            <FetchFiles 
                  getSpecificFiles={getAllFilesByAthlete}
                  id={athleteId}
            />
          </div>
        </>
      ) : (
        <p>Athlete not found</p>
      )}
    </div>
  );
};
export default AthleteProfile;
