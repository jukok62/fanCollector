import axios from 'axios'
import { URL } from './config';

const getToken = () => localStorage.getItem('token');

const getProduit = () => {
    return axios.get(`http://${URL}:8080/admin` , {
        headers : {
            'Authorization': `Bearer ${getToken()}`,
    }})
}


const updateProduit = (produit) => {
    return axios.patch(`http://${URL}:8080/admin`, {produit}, {
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
    }})
}
const AddProduit = (produit) =>{
    return axios.post(`http://${URL}:8080/admin`,{produit}, {
        headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    }})
}

const deleteProduit = (id) => {
    return axios.delete(`http://${URL}:8080/admin/`+id , {
        headers : {
            'Authorization': `Bearer ${getToken()}`,
    }})
}

export default {
    getProduit,
    AddProduit,
    updateProduit,
    deleteProduit,
}