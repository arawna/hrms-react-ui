import axios from "axios";

export default class UserService{
    login(values){
        return axios.post("https://kodlamaio-hrms.herokuapp.com/api/users/login",values)
    }
}