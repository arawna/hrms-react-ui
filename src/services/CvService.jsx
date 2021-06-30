import axios from "axios";

export default class CvService{
    getCvs(){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/cv/getall");
    }

    getByCandidateId(id){
        return axios.get("https://kodlamaio-hrms.herokuapp.com/api/cv/getByCandidateId?candidateId="+id)
    }

    updateGithub(cvId,githubLink){
        return axios.put(`https://kodlamaio-hrms.herokuapp.com/api/cv/updateGithub?cvId=${cvId}&githublink=${githubLink}`)
    }

    updateLinkedin(cvId,linkedin){
        return axios.put(`https://kodlamaio-hrms.herokuapp.com/api/cv/updateLinkedin?cvId=${cvId}&linkedinlink=${linkedin}`)
    }

    updateBiography(cvId,biography){
        return axios.put(`https://kodlamaio-hrms.herokuapp.com/api/cv/updateBiography?biography=${biography}&cvId=${cvId}`)
    }

    deleteGithub(cvId){
        return axios.delete(`https://kodlamaio-hrms.herokuapp.com/api/cv/deleteGithub?cvId=${cvId}`)
    }

    deleteLinkedin(cvId){
        return axios.delete(`https://kodlamaio-hrms.herokuapp.com/api/cv/deleteLinkedin?cvId=${cvId}`)
    }
}