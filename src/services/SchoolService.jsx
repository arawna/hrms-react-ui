import axios from "axios";

export default class SchoolService{

    getByCvId(cvId){
        return axios.get(`https://kodlamaio-hrms.herokuapp.com/api/school/getByCvId?cvId=${cvId}`)
    }

    addScholl(school){
        return axios.post("https://kodlamaio-hrms.herokuapp.com/api/school/addSchool",school)
    }

    deleteSchool(schoolId){
        return axios.delete(`https://kodlamaio-hrms.herokuapp.com/api/school/deleteSchool?schoolId=${schoolId}`)
    }
}