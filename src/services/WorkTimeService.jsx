import axios from "axios";

export default class WorkTimeService{
    getWorkTimes(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/workTime/getAll")
    }
}