import axios from 'axios';
import { URL } from './config';
const getCategories = () => {
    return axios.get(`http://${URL}:8080/categorie/`)
}

const getCategoriesByType = (id) => {
    return axios.get(`http://${URL}:8080/categorie/`+id)
}


const getCategorieVehicule = () => {
    return axios.get(`http://${URL}:8080/categorie/vehicule`)
}
const getCategorieVoiture = () => {
    return axios.get(`http://${URL}:8080/categorie/voiture`)
}
const getCategorieTracteur = () => {
    return axios.get(`http://${URL}:8080/categorie/tracteur`)
}
const getCategorieMoto = () => {
    return axios.get(`http://${URL}:8080/categorie/moto`)
}

const getCategorieFigurine = () => {
    return axios.get(`http://${URL}:8080/categorie/figurine`)
}

const getCategoriePiece = () => {
    return axios.get(`http://${URL}:8080/categorie/piece`)
}
export default {
    getCategories,
    getCategoriesByType,
    getCategorieVehicule,
    getCategorieFigurine,
    getCategoriePiece,
    getCategorieMoto,
    getCategorieTracteur,
    getCategorieVoiture
}