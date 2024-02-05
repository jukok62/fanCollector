import axios from 'axios';
import { URL } from './config';
const getCollections = () => {
    return axios.get(`http://${URL}:8080/collection`)   
}


export default {
    getCollections
}