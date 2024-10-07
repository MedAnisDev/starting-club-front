import fetch from "../../config/interceptor/interceptor"
import {BaseUrl,APIS} from "../../config/constants/URLS"

export const registerAthleteToEvent = (eventId) =>{
    const token = localStorage.getItem("token");
    return fetch({
        method : "post" ,
        url : BaseUrl+APIS.EVENTREGISTRATION.registerAthleteToEvent(eventId) ,
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const getAllParticipants = (eventId) =>{
    const token = localStorage.getItem("token");
    return fetch({
        method : "get" ,
        url : BaseUrl+APIS.EVENTREGISTRATION.getAllParticipants(eventId) ,
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const isAthleteRegistered =(eventId , athleteId) =>{
    const token = localStorage.getItem("token");
    return fetch({
        method : "get" ,
        url : BaseUrl+APIS.EVENTREGISTRATION.isAthleteRegistered(eventId,athleteId) ,
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

export const deleteAthleteFromEvent = (eventId , athleteId) =>{
    const token = localStorage.getItem("token");
    return fetch({
        method : "delete" ,
        url : BaseUrl+APIS.EVENTREGISTRATION.deleteAthleteFromEvent(eventId , athleteId) ,
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}
