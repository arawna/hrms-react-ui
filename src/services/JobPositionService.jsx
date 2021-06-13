import axios from "axios";

export default class JobPositionService{

    getJobPositions(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/jobpositions/getall")
    }
}