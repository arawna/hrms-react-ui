import axios from "axios";

export default class LanguageService{

    getByCvId(cvId){
        return axios.get(`https://kodlamaio-hrms.herokuapp.com/api/language/getByCvId?cvId=${cvId}`)
    }

    deleteLanguage(languageId){
        return axios.delete(`https://kodlamaio-hrms.herokuapp.com/api/language/deleteLanguage?languageId=${languageId}`)
    }

    addLanguage(language){
        return axios.post("https://kodlamaio-hrms.herokuapp.com/api/language/addLanguage",language)
    }
}