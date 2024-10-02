import fetch from "../../config/interceptor/interceptor"
import {BaseUrl,APIS} from "../../config/constants/URLS"


export const createPerformance = (athleteId , data) => {
    return fetch ({
        method : 'post' ,
        url : BaseUrl + APIS.PERFORMANCE.createPerformance(athleteId) ,
        data ,
        headers: { "Content-Type": "application/json" }
    });
}

export const getPerformanceByAthleteId = (athleteId) => {
    return fetch ({
        method : 'get' ,
        url : BaseUrl + APIS.PERFORMANCE.getPerformanceByAthleteId(athleteId) 
    });
}

export const updatePerformance = (performanceId , data) => {
    return fetch ({
        method : 'put' ,
        url : BaseUrl + APIS.PERFORMANCE.updatePerformance(performanceId)  ,
        data ,
        headers: { "Content-Type": "application/json" }

    });
}

export const deletePerformanceById = (performanceId) => {
    return fetch ({
        method : 'delete' ,
        url : BaseUrl + APIS.PERFORMANCE.deletePerformanceById(performanceId) 
    });
}