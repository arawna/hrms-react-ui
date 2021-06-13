import axios from "axios";

export default class JobAdService{
    getActiveJobAds(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/jobAd/getActiveAds");
    }

    getByJobAdId(id){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/jobAd/getByJobAdId?id="+id)
    }

    getActiveAdsByCompanyId(id){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/jobAd/getActiveAndCompanyId?companyId="+id)
    }

    add(values){
        return axios.post("https://kodlamaio-hrms.herokuapp.com/api/jobAd/create",values)
    }

    
}