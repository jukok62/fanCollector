import axios from 'axios';
import { URL } from './config';

const getDossier = () => {
    return axios.get(`http://${URL}:8080/dossier`)
}

export default {
    getDossier
}