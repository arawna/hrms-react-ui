import axios from "axios";

export default class FavoriteService{

    getByCandidateId(candidateId){
        return axios.get(`https://kodlamaio-hrms.herokuapp.com/jobAdFavorites/getByCandidateId?candidateId=${candidateId}`)
    }

    addFavorite(candidateId,jobAdId){
        return axios.post(`https://kodlamaio-hrms.herokuapp.com/jobAdFavorites/addFavorite?candidateId=${candidateId}&jobAdId=${jobAdId}`)
    }

    removeFavorite(favoriteId){
        return axios.delete(`https://kodlamaio-hrms.herokuapp.com/jobAdFavorites/removeFavorite?favoriteId=${favoriteId}`)
    }

}