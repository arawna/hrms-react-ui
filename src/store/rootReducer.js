import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";



const rootReducer = combineReducers({
    auth : authReducer
})

export default rootReducer;