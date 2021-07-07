import axios from "axios";

export default class EmployerService{
    getEmployers(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/employer/getall");
    }

    getEmployerById(id){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/employer/getById?id="+id)
    }

    registerEmployer(values){
        return axios.post("https://kodlamaio-hrms.herokuapp.com/api/employer/add",values)
    }

    update(values){
        return axios.put("https://kodlamaio-hrms.herokuapp.com/api/employer/update",values)
    }
    
}