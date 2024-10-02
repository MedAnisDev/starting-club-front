import { LoaderTypes } from "../types"


const initialState = {
    state : false
}
const LoaderReducer= (state = initialState , action) => {
    switch(action.type){
        case LoaderTypes.TOGGLE_LOADER :
            return {
                ...state ,
                state : action.playlaod
            }
            default:
                return state ;
    }
}

export default LoaderReducer ;