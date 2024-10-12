import { useParams } from 'react-router';
import { useState , useEffect } from 'react';
import UploadCustomFile from "../../fileHandle/uploadCustomFile.js"
import FetchFiles from "../../fileHandle/fetchFiles.js";
import {getAllFilesByEvent} from "../../../service/file/file.js"
import { ulploadFilesToEvent , fetchEvent } from '../../../service/event/event.js';
import {assignNoteEventToAthlete , fetchAllAthleteNoteByEventId , updateNoteEventOfAthlete , deleteEventPerformance } from '../../../service/event/EventPerformance.js';
import {getAllParticipants , deleteAthleteFromEvent} from "../../../service/event/eventRegistration";

import {  DeleteOutlined  ,PlusCircleOutlined , EditOutlined} from "@ant-design/icons";

import { Table ,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  notification,} from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { noData } from '../../../assets/index.js';
import "./eventDetailsDashboard.css";

const EventDetailsDashboard = () => {
    const {eventId} = useParams();
    const [event, setEvent] = useState({});
    
    
    const[registeredAthletes, setRegisteredAthletes] = useState([
      {
          id: '',
          firstname: '',
          lastname: '',
          email: '',
          phoneNumber: '',
          age: '',
          Branch: '',
          hasMedal: null,
      }
    ]);
   
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [participantsEventPerformance, setParticipantsEventPerformance] = useState([
      {
        athleteDTO: {
          id: '',
          firstname: '',
          lastname: '',
          email: '',
          phoneNumber: '',
          age: '',
          Branch: '',
          hasMedal: null,
        },
        noteEvent:0
      }
    ]);
      
    const [currentParticipant, setCurrentParticipant] = useState(
      {
        athleteDTO: {
          id: '',
          firstname: '',
          lastname: '',
          email: '',
          phoneNumber: '',
          age: '',
          Branch: '',
          hasMedal: null,
        },
        noteEvent:0
      }
    );
  
    const currentDate = new dayjs();
    const [currentEventDate , setCurrentEventDate]=  useState(null) ;

    //function to get event details
    const fetchEventData = async (id) => {
      try {
        console.log("fetchEventData called");
        const data = await fetchEvent(id);
        setEvent(data);
        setCurrentEventDate(new dayjs(data.date))
      } catch (err) {
        console.log("an error here ", err);
      }
    };

    
    //fetch all athletes  with their notes
    const fetchAllAthleteNoteData = async (eventId) => {
      try {
        console.log("fetch AllAthlet eNote Data called");
        const data = await fetchAllAthleteNoteByEventId(eventId);
        console.log("all athlete notes  : ", data);
        setParticipantsEventPerformance(data);
      } catch (err) {
        console.log("an error here ", err);
      }
    };

    //Event PERFORMANCE Table
    const eventPerfromanceColumns = [
      {
        title: "First Name",
        dataIndex: "firstname", //this is for accessing firstname inside athleteDTO object
        key: "firstname",
      },
      {
        title: "Last Name",
        dataIndex: "lastname", 
        key: "lastname",
      },
      {
        title: "Email",
        dataIndex: "email", 
        key: "email",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber", 
        key: "phoneNumber",
      },
      {
        title: "Age",
        dataIndex: "age", 
        key: "age",
      },
      {
        title: "Branch",
        dataIndex: "branch", 
        key: "branch",
      },
      {
        title: "Has Medal",
        dataIndex: "hasMedal", 
        key: "hasMedal",
        render: (value) => (typeof value === "boolean" ? (value ? "Yes" : "No") : value),
      },
      ...(currentDate.isAfter(currentEventDate) ? 
        [
          {
            title: "Event Note",
            dataIndex: "noteEvent",
            key: "noteEvent",
          }
        ] 
      : []), 
      
      {
        title: "Actions",
        key: "actions",
        render: (_, participantRecord) => (
          <div className="icon-container">
            {currentDate.isAfter(currentEventDate) && (
              <>
                {currentParticipant.noteEvent === null  && (<Button 
                  icon={<PlusCircleOutlined />} 
                  onClick={() => handleAddNote(participantRecord)} 
                />)}
                <Button 
                  icon={<EditOutlined />} 
                  onClick={() => handleEditNote(participantRecord)} 
                />
              </>
            )}
          </div>
        ),
      },
    ]

    // Merge participants with their notes
    const mergedParticipantsWithNotes = registeredAthletes.map((athlete) => {
      
      const matchedNote = participantsEventPerformance.find(
        (performance) => performance.athleteDTO.id === athlete.id
      );
      return {
        ...athlete,
        noteEvent: matchedNote ? matchedNote.noteEvent : 'N/A', // set note to athlete
      };
    });


    //Add note Event 
    const handleAddNote= (participantRecord)=>{
      setCurrentParticipant({
        athleteDTO:{
          id:participantRecord.id
        }
      });
      setIsAddingNote(true);
    }
    const onOkIsAddingNote = ()=>{
      const jsonEventPerformance={
        noteEvent :currentParticipant.noteEvent
      }
      console.log("currentParticipant :",currentParticipant);
      assignNoteData(currentParticipant.athleteDTO.id , eventId , jsonEventPerformance.noteEvent)
    }

    const assignNoteData = async (participantId ,eventId , noteEvent)=>{
      try{
        console.log("noteEvent:",noteEvent);
        
        const response = await assignNoteEventToAthlete(participantId , eventId , noteEvent);
        notification.success({
          message: "Success",
          description: response,
          placement: "topRight",
        });
        setParticipantsEventPerformance(
          participantsEventPerformance.map((item)=>
            item.athleteDTO.id === participantId ?{
              athleteDTO: {
                id: participantId,
              },
              noteEvent:noteEvent
            }:item
          )
        );
        setIsAddingNote(false);

      }catch(err){
        console.log("error of add note event : ", err);

      }
    }

    // Edit Note
  const handleEditNote = (participantRecord) => {
    setCurrentParticipant({
      athleteDTO: {
         id: participantRecord.id
      },
      noteEvent: participantRecord.noteEvent,
    });
    console.log("new note :",participantRecord.noteEvent);
    
    setIsEditingNote(true);
  };

  const onOkIsEditingNote = async () => {
    const noteEvent = currentParticipant.noteEvent;
    console.log("note event",noteEvent);
    
    try {
      const response = await updateNoteEventOfAthlete(currentParticipant.athleteDTO.id, eventId, noteEvent);
      notification.success({
        message: "Success",
        description: response,
        placement: "topRight",
      });
      setIsEditingNote(false);
    } catch (err) {
      console.error("Error updating note event: ", err);
    }
  };

  const onCancelAddEditModal = () => {
    setIsAddingNote(false);
    setIsEditingNote(false);
    setCurrentParticipant({
      athleteDTO: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        age: '',
        Branch: '',
        hasMedal: null,
      },
      noteEvent: '',
    });
  };

    //registered Athletes columns
    const registeredAthletesColumns = [
      {
        title: "First Name",
        dataIndex: "firstname", //this is for accessing firstname inside athleteDTO object
        key: "firstname",
      },
      {
        title: "Last Name",
        dataIndex: "lastname", 
        key: "lastname",
      },
      {
        title: "Email",
        dataIndex: "email", 
        key: "email",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber", 
        key: "phoneNumber",
      },
      {
        title: "Age",
        dataIndex: "age", 
        key: "age",
      },
      {
        title: "Branch",
        dataIndex: "branch", 
        key: "branch",
      },
      {
        title: "Has Medal",
        dataIndex: "hasMedal", 
        key: "hasMedal",
        render: (value) => (typeof value === "boolean" ? (value ? "Yes" : "No") : value),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, registeredAthleteRecored) => (
          <div className="icon-container">
            <Popconfirm
              title="Are you sure you want to delete this athlete-registration?"
              onConfirm={() => handleDeleteAthleteFromEvent(eventId,registeredAthleteRecored.id)}
              onCancel={() =>
                notification.info({
                  message: "Cancelled",
                  description: "athlete-registration deletion cancelled.",
                  placement: "topRight",
                })
              }
              okText="Yes"
              cancelText="No"
              overlayClassName="vertical-popconfirm"
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </div>
        ),
      },
    ]

    //Delete Athlete From Event
    const handleDeleteAthleteFromEvent =async (eventId , athleteId) =>{
      try {
        const response = await deleteAthleteFromEvent(eventId , athleteId);
        console.log("response handle Delete Athlete From Event", response);
        notification.success({
          message: "Success",
          description: response,
          placement: "topRight", // or 'bottomRight'
        });
        setRegisteredAthletes(registeredAthletes.filter((registeredAthlete) => registeredAthlete.id !== athleteId));
      } catch (err) {
        console.log("error delete Athlete From Event  : ", err);
      }
    }

    //get All Participants
    const getAllParticipantsData = async (eventId) => {
      try {
        const res = await getAllParticipants(eventId);
        console.log("all participants  :", res);
        setRegisteredAthletes(res);
      } catch (err) {
        console.log(err);
      }
    };

    
  
    useEffect(() => {      
      fetchEventData(eventId);
      fetchAllAthleteNoteData(eventId);
      getAllParticipantsData(eventId);
    }, [eventId , registeredAthletes.length , participantsEventPerformance]);

  return (
    <div className="event-details-dashboard-container">

      <div className="athlete-details">
        <p> <strong>Event Title:</strong> {event.title} </p>
        <p> <strong>Date:</strong> {event.date} </p>
        <p> <strong>Location:</strong> {event.location} </p>
        <p> <strong>Type:</strong> {event.type} </p>
      </div>

      <div className="participant-container-dashboard">
        {currentDate.isAfter(currentEventDate) ? (
          <>
            <h2 className='title'>All Participant Notes of This Event</h2>
            {participantsEventPerformance.length >= 0 ? (
             <>
             <Table 
              dataSource={mergedParticipantsWithNotes}
              columns={eventPerfromanceColumns}
              pagination={{ pageSize: 5 }}
              />
                <Modal
                  title={isAddingNote ? "Add Note" : "Edit Note"}
                  open={isAddingNote || isEditingNote}
                  cancelText="cancel"
                  onOk={() => (isAddingNote ?onOkIsAddingNote() : onOkIsEditingNote())}
                  onCancel={() => onCancelAddEditModal()}
                >
                  <Form
                        initialValues={{
                          noteEvent: currentParticipant.noteEvent || "",
                        }}
                        onValuesChange={(_, allValues) => {
                          setCurrentParticipant((prevState) => ({
                            ...prevState,
                            ...allValues,
                          }));
                        }}
                      >
                        <Form.Item
                          label="Event Note"
                          name="noteEvent"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the event note!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter event note" />
                        </Form.Item>
                      </Form>
                </Modal>
              </>
            ) : (
              <div className="noData-container">
                <img src={noData} className="noData" />
              </div>

            )}
          </>
        ) : (
          <>
            <h2 className='title'>All Athlete Registrations of This Event</h2>
            {registeredAthletes.length >= 0 ? (
              <>
                 <Table 
                  dataSource={registeredAthletes}
                  columns={registeredAthletesColumns}
                  pagination={{ pageSize: 5 }}
                  rowKey={(row) => row.id}
                  />
              </>
            ) : (
              <div className="noData-container">
                <img src={noData} className="noData" />
              </div>
            )}
          </>
        )}
      </div>
      
      {/** File uploading */}
      <div className='upload-images-dashboard-container'>
        <UploadCustomFile  
          uploadCustomFiles={ulploadFilesToEvent}
          id={eventId}
        />

        <div className='images-grid'>
        <FetchFiles 
          getSpecificFiles={getAllFilesByEvent}
          id={eventId}
        />
        </div>
      </div>
      
    </div>
  )
}

export default EventDetailsDashboard
