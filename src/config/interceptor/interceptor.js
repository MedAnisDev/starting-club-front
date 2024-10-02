
import axios from "axios";
import { refreshAccessToken } from "../../service/auth/Auth";
import { BaseUrl } from "../constants/URLS";
import { notification } from "antd";
import store from '../../redux/store';
import { LoaderAction } from "../../redux/actions";

const Interceptor = axios.create({
  baseURL: BaseUrl,
  timeout: 60000, //1 minute
});


const statusMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  405: "Method Not Allowed",
  403: "Token expired",
  408: "Request Timeout",
  409: "Conflict",
  415: "Unsupported Media Type",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required",
  499: "Client Closed Request",
};

const TOKEN_PAYLOAD_KEY = "Authorization";
const tokenlessPaths = ["login", "register", "refresh"];


Interceptor.interceptors.request.use(
  (config) => {
    console.log('Request config:', config);
    
    store.dispatch(LoaderAction.toggleLoader(true)) ;
    const AUTH_TOKEN = localStorage.getItem("token");
    const isTokenRequest = tokenlessPaths.some((path) =>config.url.includes(path));

    if (!isTokenRequest) {
      const jwtToken = AUTH_TOKEN || null;
      
      if (jwtToken) {
        config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
        
      }
    }
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    console.log("intercepter error : ",error);
    
    notification.error({
      message: "Error",
    });
    Promise.reject(error);
  }
);


Interceptor.interceptors.response.use(
  (response) => {
    store.dispatch(LoaderAction.toggleLoader(false));
    return response.data;
  },
  (error) => {
    store.dispatch(LoaderAction.toggleLoader(false));
    let notif = {
      message: "",
      description:""
    };

    const status = error.response ? error.response.status : "500";
    notif.message = statusMessages[status] || "unknown error";
    //notif.description = error.response.errors;
    console.log("status error :",status);
  
    //if token is expired
    if (status === 403) {
      const expiredAccessToken = localStorage.getItem("token");
      console.log("expired token :",expiredAccessToken);
      
      const refreshToken = localStorage.getItem("refreshToken");

      notification.info({
        message: "Session Expired",
        description: "Refreshing your session, please wait...",
        duration: 2,
      });

      refreshAccessToken(refreshToken, expiredAccessToken)
        .then((resp) => {
          localStorage.setItem("token", resp.accessToken);
          localStorage.setItem("refreshToken", resp.refreshToken);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    notification.error(notif);

    return Promise.reject(error);
  }
);

export default Interceptor;