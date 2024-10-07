import fetch from "../../config/interceptor/interceptor"
import {BaseUrl,APIS} from "../../config/constants/URLS"


export const assignNoteEventToAthlete = (athleteId , eventId, note) =>{
    return fetch({
        method : "post" ,
        url : BaseUrl+APIS.EVENTPERFORMANCE.assignNoteEventToAthlete(athleteId , eventId, note) ,
        headers : {'Content-Type':'application/json'}
    });
}

export const fetchAllAthleteNoteByEventId = (eventId) =>{
    return fetch({
        method : "get" ,
        url : BaseUrl+APIS.EVENTPERFORMANCE.fetchAllAthleteNoteByEventId(eventId) ,
    });
}

export const fetchAllNotesByAthleteId = (athleteId) =>{
    return fetch({
        method : "get" ,
        url : BaseUrl+APIS.EVENTPERFORMANCE.fetchAllNotesByAthleteId(athleteId) ,
    });
}

export const updateNoteEventOfAthlete = (athleteId , eventId  ,note) =>{
    return fetch({
        method : "put" ,
        url : BaseUrl+APIS.EVENTPERFORMANCE.updateNoteEventOfAthlete(athleteId , eventId , note) ,
        
    });
}

export const deleteEventPerformance = (athleteId , eventId) =>{
    return fetch({
        method : "delete" ,
        url : BaseUrl+APIS.EVENTPERFORMANCE.deleteEventPerformance(athleteId , eventId) ,
    });
}