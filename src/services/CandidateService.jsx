import axios from "axios";

export default class CandidateService{
    getCandidates(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/candidates/getall");
    }

    
}