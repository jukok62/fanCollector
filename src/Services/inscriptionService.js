import axios from 'axios';
import { URL } from './config';
function postUser(user) {
    return axios.post(`http://${URL}:8080/inscription`, user, {
        headers : {
        'Content-Type': 'application/json'
    }} )
}


export default {
    postUser
}