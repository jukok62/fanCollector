import axios from 'axios';

const getAchat = (id) => {
    return axios.get('http://localhost:8080/achat/' +id)
}

export default {
    getAchat
}