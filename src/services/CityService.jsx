import axios from "axios";

export default class CityService{

    getCitys(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/city/getAll")
    }
}