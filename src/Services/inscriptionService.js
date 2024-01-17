import axios from 'axios';

function postUser(user) {
    return axios.post('http://localhost:8080/inscription', user, {
        headers : {
        'Content-Type': 'application/json'
    }} )
}

export default {
    postUser
}