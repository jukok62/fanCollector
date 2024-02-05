import axios from 'axios';
import { URL } from './config';
const getProduit = () => {
    return axios.get(`http://${URL}:8080/produit`)
}


const getProduitById = (id) => {
    return axios.get(`http://${URL}:8080/produit/`+id)
}

const getProduitByNom = (nom) => {
    return axios.get(`http://${URL}:8080/produit/produit`+nom)
}

const getProduitByCategorie = (id) => {
    return axios.get(`http://${URL}:8080/produit/categorie/`+id)
}

const updateProduit = (produit) => {
    return axios.patch(`http://${URL}:8080/produit`, {produit}, {
        headers : {
            'Content-Type': 'application/json'
    }})
}
const AddProduit = (produit) =>{
    return axios.post(`http://${URL}:8080/produit`,{produit}, {
        headers : {
        'Content-Type': 'application/json'
    }})
}

const deleteProduit = (id) => {
    return axios.delete(`http://${URL}:8080/produit/`+id)
}

export default {
    getProduit,
    AddProduit,
    getProduitById,
    updateProduit,
    deleteProduit,
    getProduitByNom,
    getProduitByCategorie,
}