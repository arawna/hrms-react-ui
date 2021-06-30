import { USER_LOGIN, USER_LOGOUT } from "../actions/authActions";
import { authItem } from "../initialValues/authItem";

const initialState = {
    authItem:authItem
}

export default function authReducer(state=initialState,{type,payload}){
    switch (type) {
        case USER_LOGIN:
            return{
                ...state,
                authItem:[...[{loggedIn:true,user:payload}]]
            }
            // let user = state.authItem.find(u=>u.user.id===payload.id)
            // if(user){
            //     return{
            //         ...state
            //     };
            // }else {
            //     return{
            //         ...state,
            //         authItem:[{loggedIn:true,user:{payload}}]
            //     };
            // }
        case USER_LOGOUT:
            return{
                ...state,
                authItem:[{loggedIn:false}]
            };
    
        default:
            return state;
    }
}