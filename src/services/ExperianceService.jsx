import axios from "axios";

export default class ExperianceService{

    add(experiance){
        return axios.post("https://kodlamaio-hrms.herokuapp.com/api/experiances/add",experiance)
    }

    delete(experianceId){
        return axios.delete(`https://kodlamaio-hrms.herokuapp.com/api/experiances/delete?experianceId=${experianceId}`)
    }

    getByCvId(cvId){
        return axios.get(`https://kodlamaio-hrms.herokuapp.com/api/experiances/getByCvId?id=${cvId}`)
    }
}