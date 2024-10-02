import fetch from "../../config/interceptor/interceptor"
import {BaseUrl,APIS} from "../../config/constants/URLS"
import axios from "axios";


export const createEvent = (data) =>{
    return fetch({
        method : "post" ,
        url : BaseUrl+APIS.EVENT.createEvent ,
        data ,
        headers : {'Content-Type':'application/json'}
    });
}

export const fetchEvent = (id) =>{
    return fetch({
        method : "get" ,
        url : BaseUrl+APIS.EVENT.fetchEvent(id) ,
    });
}

export const fetchAllEvents = (pageNumber,sortedBY , type) =>{
    return fetch({
        method : "get" ,
        url : BaseUrl+APIS.EVENT.fetchAllEvents(pageNumber,sortedBY , type) ,
    });
}

export const updateEvent = (id ,data) =>{
    return fetch({
        method : "put" ,
        url : BaseUrl+APIS.EVENT.updateEvent(id) ,
        data ,
        headers: { "Content-Type": "application/json" }
    });
}

export const deleteEventById = (id) =>{
    return fetch({
        method : "delete" ,
        url : BaseUrl+APIS.EVENT.deleteEventById(id) ,
    });
}

export const ulploadFilesToEvent = async(eventId ,formData) => {
    try {
      const response = await axios.post(BaseUrl + APIS.EVENT.ulploadFilesToEvent(eventId), formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };