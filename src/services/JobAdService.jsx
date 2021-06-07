import axios from "axios";

export default class JobAdService{
    getActiveJobAds(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/jobAd/getActiveAds");
    }

    
}