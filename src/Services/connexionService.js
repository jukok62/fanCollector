import axios from 'axios';

function Connect(connection) {
    return axios.post('http://localhost:8080/connexion', connection, {
        headers : {
        'Content-Type': 'application/json'
    }} )
}

export default {
    Connect
}