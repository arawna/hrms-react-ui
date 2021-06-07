import axios from "axios";

export default class EmployerService{
    getEmployers(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/employer/getall");
    }

    
}