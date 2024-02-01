import axios from 'axios';
import { URL } from './config';
const getAchat = (id) => {
    return axios.get(`http://${URL}:8080/achat/` +id)
}


export default {
    getAchat
}