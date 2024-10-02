import { combineReducers } from 'redux'

import AuthReducer from './auth.reducer';
import LoaderReducer from './loader.reducer';

export const allReducers = {
    auth: AuthReducer ,
    loader : LoaderReducer
}
const rootReducer = combineReducers(allReducers);

export default rootReducer;