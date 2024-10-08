import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchEvent } from "../../service/event/event";
import {
  registerAthleteToEvent,
  getAllParticipants,
  isAthleteRegistered,
} from "../../service/event/eventRegistration";
import { fetchAllAthleteNoteByEventId } from "../../service/event/EventPerformance";
import { notification, Button } from "antd";
import { useSelector } from "react-redux";
import FetchFiles from "../fileHandle/fetchFiles";
import { getAllFilesByEvent } from "../../service/file/file.js";

import "./eventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [isRegistered, setRegistered] = useState(false);
  const [participantsNotes, setParticipantsNotes] = useState([]);
  const [participants, setParticipants] = useState([]);

  const userRole = useSelector((state) => state.auth.user?.role?.name);
  const currentAthlete = useSelector((state) => state.auth.user);
  const currentDate = new Date();
  const eventDate = new Date(event.date);

  //function to get event details
  const fetchEventData = async (id) => {
    try {
      console.log("fetchEventData called");
      const data = await fetchEvent(id);
      setEvent(data);
    } catch (err) {
      console.log("an error here ", err);
    }
  };

  const registerToEvent = async (eventId) => {
    try {
      const res = await registerAthleteToEvent(eventId);
      setRegistered(true);
      notification.info({
        message: "Registration Successful",
        description: res,
      });
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Registration Failed",
        description: err.message,
      });
    }
  };

  const fetchAllAthleteNoteData = async (eventId) => {
    try {
      console.log("getAllParticipantsData called");
      const data = await fetchAllAthleteNoteByEventId(eventId);
      console.log("all athlete notes  : ", data);
      setParticipantsNotes(data);
    } catch (err) {
      console.log("an error here ", err);
    }
  };

  const isAthleteRegisteredToEvent = async (eventId, athleteId) => {
    try {
      const res = await isAthleteRegistered(eventId, athleteId);
      console.log("isathleteRegistered :", res);
      setRegistered(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllParticipantsData = async (eventId) => {
    try {
      const res = await getAllParticipants(eventId);
      console.log("all participants  :", res);
      setParticipants(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEventData(eventId);
    fetchAllAthleteNoteData(eventId);
    isAthleteRegisteredToEvent(eventId, currentAthlete.id);
    getAllParticipantsData(eventId);
  }, [eventId]);

  return (
    <div className="public-details-container">
      <div className="event-header">
        <h3>{event.title}</h3>
        <h3>
          {event.date} - {event.location}
        </h3>
        <p>{event.type}</p>
      </div>
      {userRole === "ROLE_ATHLETE" &&
        currentDate < eventDate &&
        (!isRegistered ? (
          <Button
            type="primary"
            onClick={() => registerToEvent(eventId)}
            className="register-button"
          >
            Participate
          </Button>
        ) : (
          <p>You are already registered for this event.</p>
        ))}

      <div className="participant-section">
        {currentDate > eventDate ? (
          <>
            <h2>All Participant Notes of This Event</h2>
            {participantsNotes.length > 0 ? (
              <table className="participant-table">
                <thead>
                  <tr>
                    <th>Athlete Name</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {participantsNotes.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.athleteDTO.firstname} {item.athleteDTO.lastname}
                      </td>
                      <td>
                        {item.noteEvent
                          ? item.noteEvent
                          : "There is no note yet"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-participants">No participant notes found.</p>
            )}
          </>
        ) : (
          <>
            <h2>All Athlete Registrations of This Event</h2>
            {participants.length > 0 ? (
              <>
                <table className="participant-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>lastname</th>
                      <th>branch</th>
                      <th>hasMedal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((registration, index) => (
                      <tr key={index}>
                        <td>{registration.firstname}</td>
                        <td>{registration.lastname}</td>
                        <td>{registration.branch}</td>
                        <td>{registration.hasMedal ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <p className="no-participants">
                  there is no registrations yet.
                </p>
              </>
            )}
          </>
        )}
      </div>

      <div className="images-grid">
        <FetchFiles getSpecificFiles={getAllFilesByEvent} id={eventId} />
      </div>
    </div>
  );
};

export default EventDetails;
