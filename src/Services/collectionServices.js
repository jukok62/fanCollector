import axios from 'axios';

const getCollections = () => {
    return axios.get('http://localhost:8080/collection')
}

export default {
    getCollections
}