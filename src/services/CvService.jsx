import axios from "axios";

export default class CvService{
    getCvs(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/cv/getall");
    }

    getByCandidateId(id){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/cv/getByCandidateId?candidateId="+id)
    }
}