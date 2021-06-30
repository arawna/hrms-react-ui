export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export function userLogin(user){
    return {
        type : USER_LOGIN,
        payload : user
    }
}

export function userLogout(user){
    return {
        type : USER_LOGOUT,
        payload : user
    }
}