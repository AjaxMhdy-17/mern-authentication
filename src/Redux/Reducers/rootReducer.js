import { combineReducers } from "redux";

import userAuthReducer from './userAuthReducer'

const rootReducer = combineReducers({
    userAuthReducer : userAuthReducer
})

export default rootReducer