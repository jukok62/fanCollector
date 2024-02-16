import axios from 'axios';
import { URL } from './config';

const getToken = () => localStorage.getItem('token');


const getAchat = (id) => {
    return axios.get(`http://${URL}:8080/achat/` +id, {
        headers : {
        'Authorization': `Bearer ${getToken()}`,
    }} )
}
const fetchAchatByUser = (id, limit, offset) => {
    return axios.get(`http://${URL}:8080/achat/limit/${id}?limit=${limit}&offset=${offset}`, {
        headers : {
        'Authorization': `Bearer ${getToken()}`,
    }})
}

const postCommande = (commande) => {
    return axios.post(`http://${URL}:8080/achat`, commande, {
        headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    }} )
}
export default {
    getAchat,
    postCommande,
    fetchAchatByUser
}