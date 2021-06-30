import axios from "axios";

export default class TechnologyService{

    getByCvId(cvId){
        return axios.get(`https://kodlamaio-hrms.herokuapp.com/api/technology/getByCvId?cvId=${cvId}`)
    }

    addScholl(technology){
        return axios.post("https://kodlamaio-hrms.herokuapp.com/api/technology/addTechnology",technology)
    }

    deleteSchool(technologyId){
        return axios.delete(`https://kodlamaio-hrms.herokuapp.com/api/technology/deleteTechnology?technologyId=${technologyId}`)
    }
}