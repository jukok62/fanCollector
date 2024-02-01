import axios from 'axios';
import { URL } from './config';


function Connect(connection) {
    return axios.post(`http://${URL}:8080/connexion`, connection, {
        headers : {
        'Content-Type': 'application/json'
    }} )
}


export default {
    Connect
}