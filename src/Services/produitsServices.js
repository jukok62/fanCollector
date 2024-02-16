import axios from 'axios'
import { URL } from './config';


const getProduit = () => {
    return axios.get(`http://${URL}:8080/produit` , )
}


const getProduitById = (id) => {
    return axios.get(`http://${URL}:8080/produit/`+id )
}

const getProduitByNom = (nom) => {
    return axios.get(`http://${URL}:8080/produit/produit`+nom)
}

const getProduitByCategorie = (id) => {
    return axios.get(`http://${URL}:8080/produit/categorie/`+id )
}

export default {
    getProduit,
    getProduitById,
    getProduitByNom,
    getProduitByCategorie,
}