import React from 'react';
import { useParams } from 'react-router';
import UploadCustomFile from "../../fileHandle/uploadCustomFile.js"
import FetchFiles from "../../fileHandle/fetchFiles.js";
import {getAllFilesByEvent} from "../../../service/file/file.js"
import { ulploadFilesToEvent } from '../../../service/event/event.js';

import "./eventDetailsDashboard.css";


const EventDetailsDashboard = () => {
    const {eventId} = useParams();

  return (
    <div className="event-details-dashboard-container">
      
      
      <UploadCustomFile 
        uploadCustomFiles={ulploadFilesToEvent}
        id={eventId}
      />

      <div className='event-images-container'>
      <FetchFiles 
        getSpecificFiles={getAllFilesByEvent}
        id={eventId}
      />
      </div>
    </div>
  )
}

export default EventDetailsDashboard
