import fetch from "../../config/interceptor/interceptor"
import {BaseUrl,APIS} from "../../config/constants/URLS"

export const createTrainingSession = (performanceId , data) => {
    return fetch ({
        method : 'post' ,
        url : BaseUrl + APIS.TRAININGSession.createTrainingSession(performanceId) ,
        data ,
        headers: { "Content-Type": "application/json" }
    });
}

export const getPerformanceByAthleteId = (athleteId) => {
    return fetch ({
        method : 'get' ,
        url : BaseUrl + APIS.TRAININGSession.getPerformanceByAthleteId(athleteId) 
    });
}

export const updateTrainingSession = (trainigSessionId , data) => {
    return fetch ({
        method : 'put' ,
        url : BaseUrl + APIS.TRAININGSession.updateTrainingSession(trainigSessionId)  ,
        data ,
        headers: { "Content-Type": "application/json" }

    });
}

export const deleteTrainingSessionById = (trainigSessionId) => {
    return fetch ({
        method : 'delete' ,
        url : BaseUrl + APIS.TRAININGSession.deleteTrainingSessionById(trainigSessionId) 
    });
}

export const deleteAllTrainingSessionById = (performanceId) => {
    return fetch ({
        method : 'delete' ,
        url : BaseUrl + APIS.TRAININGSession.deleteAllTrainingSessions(performanceId) 
    });
}