import axios from 'axios';
import { URL } from './config';
function postUser(user, captcha) {
    return axios.post(`http://${URL}:8080/inscription`, {user, captcha}, {
        headers : {
        'Content-Type': 'application/json'
    }} )
}


export default {
    postUser
}