import axios from "axios";

export default class WorkPlaceService{
    getWorkPlaces(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/workPlace/getAll")
    }
}