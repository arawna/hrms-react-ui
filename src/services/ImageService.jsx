import axios from "axios";

export default class ImageService{

    upload(cvId,file){
        return axios.post(`https://kodlamaio-hrms.herokuapp.com/api/images/upload?cvId=${cvId}`,file)
    }

}