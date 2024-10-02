import { AuthTypes } from "../types";

const storedToken = localStorage.getItem('token');
const storedRefreshToken = localStorage.getItem('refreshToken');
const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user : storedUser || {} ,
    token :storedToken || null,
    refreshToken : storedRefreshToken || null ,
    isAuthenticated : !!storedToken , // if token exists returning bolean true else return false 
    errorMessage : "" 
}

const AuthReducer = (state = initialState ,action)=>{

    switch(action.type){
        case AuthTypes.LOGIN_SUCCESS:
            return{
                ...state ,
                user : action.playload.user ,
                token : action.playload.token ,
                refreshToken : action.playload.refreshToken ,
                isAuthenticated : true ,
                errorMessage : ""
            }
        case AuthTypes.LOGIN_ERROR :
            return {
                ...state ,
                user : {} ,
                token : null ,
                refreshToken : null ,
                isAuthenticated : false ,
                errorMessage : "error with login"
            }
        
        case AuthTypes.LOGOUT_REQUEST :
            return {
                ...state ,
                user : {} ,
                token : null ,
                refreshToken : null ,
                isAuthenticated : false ,
                errorMessage : ""

            }
        default: return state;
    }
}

export default AuthReducer ;