import fetch from "../../config/interceptor/interceptor"
import {BaseUrl,APIS} from "../../config/constants/URLS"
import axios from "axios";

export const uploadFile = async (formData) => {
    try {
      const response = await axios.post(BaseUrl + APIS.FILE.uploadFile, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

export const uploadMultipleFiles = async(formData) => {
  try {
    const response = await axios.post(BaseUrl + APIS.FILE.uploadMultipleFiles, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading multiple file:", error);
  }
};


export const downloadFile = async(fileName) => {
  try {
    console.log("downloadFile called");
    
    const response = await axios.get(BaseUrl + APIS.FILE.downloadFile(fileName) ,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: "blob", // Important to get the binary data
    });

    // Create a local URL for the image blob
    const imageBlob = URL.createObjectURL(response.data);
    return imageBlob;
  } catch (error) {
    console.log("Error fetching image:", error);
  }
}

export const getAllDocumentFiles = () => {
  return fetch ({
      method : 'get' ,
      url : BaseUrl + APIS.FILE.getAllDocumentFiles,
  });
}

export const getAllFilesByAthlete = (athleteId) => {
  return fetch ({
      method : 'get' ,
      url : BaseUrl + APIS.FILE.getAllFilesByAthlete(athleteId) ,
  });
}

export const getAllFilesByEvent = (eventId) => {
  return fetch ({
      method : 'get' ,
      url : BaseUrl + APIS.FILE.getAllFilesByEvent(eventId) ,
  });
}

export const deleteFileById = (formData) => {
    return fetch ({
        method : 'delete' ,
        url : BaseUrl + APIS.FILE.deleteFileById(formData) 
    });
}


