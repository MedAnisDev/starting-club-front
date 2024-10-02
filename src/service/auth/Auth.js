import { BaseUrl, APIS } from "../../config/constants/URLS";
import fetch from "../../config/interceptor/interceptor";

export const loginService= (data) => {
    return fetch({
        method : 'post',
        url : BaseUrl + APIS.AUTH.login,
        data,
        headers : {'Content-Type':'application/json'}
    })
}

export const registerService= async (data) => {
    return fetch({
        method : 'post' ,
        url : BaseUrl + APIS.AUTH.register ,
        data ,
        headers : {'Content-Type':'application/json'}
    });
}

export const logoutService= async (token) => {
    return fetch({
        method : 'get',
        url : BaseUrl + APIS.AUTH.logout,
        headers : {'Authorization' :`Bearer ${token}`}
    })
}

export const refreshAccessToken = async  (refreshToken, expiredAccessToken) => {    
    return fetch({
        method: "get",
        url: BaseUrl + APIS.AUTH.refreshToken +`/${refreshToken}?expiredToken=${expiredAccessToken}`,
    });
};
